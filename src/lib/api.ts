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
  if (!accessToken && typeof window !== "undefined") {
    accessToken = localStorage.getItem("geovision_access_token");
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
    return localStorage.getItem("geovision_refresh_token");
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
    // If 401 and we have a refresh token, try to refresh
    if (res.status === 401 && getRefreshToken() && !endpoint.includes("/refresh")) {
      const refreshed = await tryRefresh();
      if (refreshed) {
        // Retry original request with new token
        return request<T>(endpoint, options);
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

export { ApiError };
