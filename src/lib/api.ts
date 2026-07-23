"use client";

/**
 * API Client
 *
 * Centralized HTTP client for communicating with the GeoVision backend.
 * Handles token injection, automatic refresh on 401, and consistent error extraction.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ── Token Storage (in-memory + localStorage for persistence) ──

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("geovision_access_token");
    if (token && token !== "null" && token !== "undefined") {
      return token;
    }
  }
  return accessToken;
}

export function setTokens(access: string, refresh: string) {
  accessToken = access;
  if (typeof window !== "undefined") {
    localStorage.setItem("geovision_access_token", access);
    localStorage.setItem("geovision_refresh_token", refresh);
  }
}

export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("geovision_refresh_token");
    if (token && token !== "null" && token !== "undefined") {
      return token;
    }
  }
  return null;
}

export function clearTokens() {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("geovision_access_token");
    localStorage.removeItem("geovision_refresh_token");
  }
}

// ── Core Fetch Wrapper ──

interface ApiResponse<T = any> {
  status: string;
  data?: T;
  message?: string;
  details?: any;
}

class ApiError extends Error {
  status: number;
  details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Try to parse JSON response
  let body: ApiResponse<T>;
  try {
    body = await res.json();
  } catch {
    throw new ApiError("Network error", res.status);
  }

  if (!res.ok) {
    // If 401 and not an auth endpoint, try to refresh
    if (
      res.status === 401 &&
      !endpoint.includes("/auth/refresh") &&
      !endpoint.includes("/auth/login") &&
      !endpoint.includes("/auth/register")
    ) {
      const refreshed = await tryRefresh();
      if (refreshed) {
        // Retry original request with new token
        return request<T>(endpoint, options);
      } else {
        clearTokens();
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/login") &&
          !window.location.pathname.startsWith("/register")
        ) {
          window.location.href = "/login";
        }
      }
    }
    throw new ApiError(
      body.message || "Something went wrong",
      res.status,
      body.details
    );
  }

  return body.data as T;
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      return false;
    }

    const body = await res.json();
    setTokens(body.data.accessToken, body.data.refreshToken);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

// ── Auth API ──

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export const authApi = {
  register: (data: { email: string; password: string; name: string }) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () => request<AuthUser>("/auth/me"),

  logout: async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await request("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        });
      } catch {
        // Best-effort logout
      }
    }
    clearTokens();
  },
};

// ── Data Sources API ──

export interface DataSourceItem {
  id: string;
  name: string;
  type: "API" | "MANUAL" | "DATABASE" | "CLOUD_STORAGE";
  provider: string;
  baseUrl?: string | null;
  authConfig?: string | null;
  status: "active" | "offline" | "error";
  lastSyncAt?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    datasets: number;
    importJobs: number;
  };
}

export const dataSourcesApi = {
  getAll: (params?: { type?: string; status?: string; search?: string }) => {
    const cleanParams: Record<string, string> = {};
    if (params?.type) cleanParams.type = params.type;
    if (params?.status) cleanParams.status = params.status;
    if (params?.search) cleanParams.search = params.search;
    const query = new URLSearchParams(cleanParams).toString();
    return request<{ dataSources: DataSourceItem[]; count: number }>(
      `/data-sources${query ? `?${query}` : ""}`
    );
  },

  getById: (id: string) =>
    request<{ dataSource: DataSourceItem }>(`/data-sources/${id}`),

  create: (data: {
    name: string;
    type: "API" | "MANUAL" | "DATABASE" | "CLOUD_STORAGE";
    provider: string;
    baseUrl?: string;
    authConfig?: any;
    status?: "active" | "offline" | "error";
  }) =>
    request<{ dataSource: DataSourceItem }>("/data-sources", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: Partial<{
      name: string;
      type: "API" | "MANUAL" | "DATABASE" | "CLOUD_STORAGE";
      provider: string;
      baseUrl?: string;
      authConfig?: any;
      status?: "active" | "offline" | "error";
    }>
  ) =>
    request<{ dataSource: DataSourceItem }>(`/data-sources/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/data-sources/${id}`, {
      method: "DELETE",
    }),
};

export interface DatasetItem {
  id: string;
  name: string;
  description?: string | null;
  dataType: string;
  fileFormat: string;
  filePath: string;
  fileSizeBytes: number;
  origin: string;
  qualityStatus: string;
  parentDatasetIds?: string | null;
  metadata?: string | null;
  sourceId?: string | null;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  uploader?: {
    id: string;
    name: string;
    email: string;
  };
  source?: {
    id: string;
    name: string;
    type: string;
    provider: string;
  } | null;
  _count?: {
    pipelineNodes: number;
    mapLayers: number;
    reports: number;
  };
}

export const datasetsApi = {
  getAll: (params?: {
    dataType?: string;
    qualityStatus?: string;
    origin?: string;
    sourceId?: string;
    search?: string;
  }) => {
    const cleanParams: Record<string, string> = {};
    if (params?.dataType) cleanParams.dataType = params.dataType;
    if (params?.qualityStatus) cleanParams.qualityStatus = params.qualityStatus;
    if (params?.origin) cleanParams.origin = params.origin;
    if (params?.sourceId) cleanParams.sourceId = params.sourceId;
    if (params?.search) cleanParams.search = params.search;
    const query = new URLSearchParams(cleanParams).toString();
    return request<{ datasets: DatasetItem[]; count: number }>(
      `/datasets${query ? `?${query}` : ""}`
    );
  },

  getById: (id: string) =>
    request<{ dataset: DatasetItem }>(`/datasets/${id}`),

  create: (data: {
    name: string;
    description?: string;
    dataType: string;
    fileFormat?: string;
    filePath?: string;
    fileSizeBytes?: number;
    origin?: string;
    qualityStatus?: string;
    sourceId?: string;
    metadata?: any;
  }) =>
    request<{ dataset: DatasetItem }>("/datasets", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: Partial<{
      name: string;
      description?: string;
      dataType: string;
      fileFormat?: string;
      filePath?: string;
      fileSizeBytes?: number;
      origin?: string;
      qualityStatus?: string;
      sourceId?: string;
      metadata?: any;
    }>
  ) =>
    request<{ dataset: DatasetItem }>(`/datasets/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/datasets/${id}`, {
      method: "DELETE",
    }),

  uploadDataset: (
    file: File,
    options?: { name?: string; description?: string; sourceId?: string },
    onProgress?: (percent: number) => void
  ): Promise<{ dataset: DatasetItem }> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);
      if (options?.name) formData.append("name", options.name);
      if (options?.description) formData.append("description", options.description);
      if (options?.sourceId) formData.append("sourceId", options.sourceId);

      xhr.open("POST", `${API_BASE}/upload/dataset`);

      // Authentication Token
      const token = getAccessToken();
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response.data);
          } catch (err) {
            reject(new ApiError("Invalid response from server", xhr.status));
          }
        } else {
          try {
            const errorRes = JSON.parse(xhr.responseText);
            reject(new ApiError(errorRes.error?.message || "File upload failed", xhr.status));
          } catch {
            reject(new ApiError(`Upload failed with status ${xhr.status}`, xhr.status));
          }
        }
      };

      xhr.onerror = () => {
        reject(new ApiError("Network error during file upload", 0));
      };

      xhr.send(formData);
    });
  },
};

export interface MapDatasetItem extends DatasetItem {
  fileUrl?: string;
}

export const mapApi = {
  getDatasets: () =>
    request<{ datasets: MapDatasetItem[]; count: number }>("/map/datasets"),
};

export { ApiError };
