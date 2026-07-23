"use client";

import { useState, useEffect } from "react";
import { dataSourcesApi, DataSourceItem } from "@/lib/api";

export default function DataSourcesPage() {
  const [sources, setSources] = useState<DataSourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<DataSourceItem | null>(null);
  const [deletingSource, setDeletingSource] = useState<DataSourceItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    name: "",
    type: "API" as "API" | "MANUAL" | "DATABASE" | "CLOUD_STORAGE",
    provider: "",
    baseUrl: "",
    status: "active" as "active" | "offline" | "error",
  });

  const fetchSources = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dataSourcesApi.getAll();
      setSources(res.dataSources || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load data sources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  // Filter sources
  const filteredSources = sources.filter((s) => {
    const matchesTab = activeTab === "ALL" || s.type === activeTab;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      type: "API",
      provider: "",
      baseUrl: "",
      status: "active",
    });
    setModalError(null);
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (source: DataSourceItem) => {
    setEditingSource(source);
    setFormData({
      name: source.name,
      type: source.type,
      provider: source.provider,
      baseUrl: source.baseUrl || "",
      status: source.status,
    });
    setModalError(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);
    try {
      await dataSourcesApi.create({
        name: formData.name,
        type: formData.type,
        provider: formData.provider,
        baseUrl: formData.baseUrl || undefined,
        status: formData.status,
      });
      setIsCreateOpen(false);
      fetchSources();
    } catch (err: any) {
      setModalError(err?.message || "Failed to create data source");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSource) return;
    setSubmitting(true);
    setModalError(null);
    try {
      await dataSourcesApi.update(editingSource.id, {
        name: formData.name,
        type: formData.type,
        provider: formData.provider,
        baseUrl: formData.baseUrl || undefined,
        status: formData.status,
      });
      setEditingSource(null);
      fetchSources();
    } catch (err: any) {
      setModalError(err?.message || "Failed to update data source");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingSource) return;
    setSubmitting(true);
    try {
      await dataSourcesApi.delete(deletingSource.id);
      setDeletingSource(null);
      fetchSources();
    } catch (err: any) {
      setError(err?.message || "Failed to delete data source");
    } finally {
      setSubmitting(false);
    }
  };

  const getSourceTypeBadge = (type: string) => {
    switch (type) {
      case "API":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">API Portal</span>;
      case "MANUAL":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container text-secondary border border-secondary/20">Manual Upload</span>;
      case "DATABASE":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary/10 text-tertiary border border-tertiary/20">Database</span>;
      case "CLOUD_STORAGE":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant border border-outline/20">Cloud Storage</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{type}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Active
          </div>
        );
      case "offline":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-error/10 text-error border border-error/20">
            <span className="w-1.5 h-1.5 rounded-full bg-error" />
            Offline
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            Error
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">hub</span>
            Data Sources Management
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Configure external portals and manual upload channels for geospatial data ingestion.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSources}
            className="p-2.5 border border-outline/30 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition flex items-center justify-center"
            title="Refresh Data Sources"
          >
            <span className={`material-symbols-outlined ${loading ? "animate-spin" : ""}`}>refresh</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition flex items-center gap-2 shadow-sm text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Connect Data Source
          </button>
        </div>
      </div>

      {/* Main Error Alert */}
      {error && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-xl flex items-center justify-between text-error text-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[22px]">error</span>
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="hover:opacity-80">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Overview Metric Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">hub</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Total Configured</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">{sources.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">api</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">API Portals</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
              {sources.filter((s) => s.type === "API").length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">upload_file</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Manual Uploads</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
              {sources.filter((s) => s.type === "MANUAL").length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Active Channels</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
              {sources.filter((s) => s.status === "active").length}
            </h3>
          </div>
        </div>
      </div>

      {/* Format Capabilities Info Banner */}
      <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 elevation-1 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <span className="material-symbols-outlined text-[20px]">dataset</span>
          <span>Supported Format Ingestion Channels</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          GeoVision Data Sources handle automated API integrations and manual uploads. Supported file formats for manual ingestion include:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {["CSV", "Excel (.xlsx)", "GeoJSON", "Shapefile (.shp)", "GeoTIFF", "COG", "JP2", "PNG", "JPG", "JPEG"].map((fmt) => (
            <span key={fmt} className="px-3 py-1 bg-[#f0f7f5] text-primary font-medium text-xs rounded-lg border border-primary/15">
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-outline-variant/30 elevation-1">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "ALL", label: "All Types" },
            { id: "API", label: "APIs" },
            { id: "MANUAL", label: "Manual Uploads" },
            { id: "DATABASE", label: "Databases" },
            { id: "CLOUD_STORAGE", label: "Cloud Storage" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search data sources..."
            className="w-full pl-10 pr-4 py-2 border border-outline/30 rounded-xl text-xs text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Main Data Sources Table / Loading / Empty State */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-outline-variant/30 p-16 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-on-surface-variant">Loading Data Sources...</p>
        </div>
      ) : filteredSources.length === 0 ? (
        <div className="bg-white rounded-2xl border border-outline-variant/30 p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant mb-4">
            <span className="material-symbols-outlined text-[32px]">hub</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-1">No data sources configured yet</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mb-6">
            {sources.length === 0
              ? "Connect your first external API portal, manual upload channel, or database."
              : "No data sources match your current filter or search criteria."}
          </p>
          {sources.length === 0 ? (
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Connect Your First Data Source
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveTab("ALL");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded-lg text-xs hover:bg-surface-container-highest transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden elevation-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/40 text-xs font-semibold text-on-surface-variant">
                  <th className="px-6 py-4">Data Source Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Provider / Channel</th>
                  <th className="px-6 py-4">Base URL / Endpoint</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-sm">
                {filteredSources.map((source) => (
                  <tr key={source.id} className="hover:bg-surface-container-low/40 transition">
                    <td className="px-6 py-4 font-semibold text-on-surface">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[20px]">
                            {source.type === "API"
                              ? "api"
                              : source.type === "MANUAL"
                              ? "upload_file"
                              : source.type === "DATABASE"
                              ? "database"
                              : "cloud"}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-on-surface">{source.name}</div>
                          {source.creator && (
                            <div className="text-[11px] text-on-surface-variant font-normal">
                              By {source.creator.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getSourceTypeBadge(source.type)}</td>
                    <td className="px-6 py-4 font-medium text-on-surface-variant">{source.provider}</td>
                    <td className="px-6 py-4 font-mono text-xs text-on-surface-variant max-w-xs truncate">
                      {source.baseUrl || "N/A (Local / Internal)"}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(source.status)}</td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">
                      {new Date(source.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(source)}
                        className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition"
                        title="Edit Data Source"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingSource(source)}
                        className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition"
                        title="Delete Data Source"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                Connect New Data Source
              </h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 bg-error/10 text-error text-xs rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-on-surface mb-1">Data Source Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sentinel-2 Imagery Feed"
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-on-surface mb-1">Source Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="API">API Portal</option>
                    <option value="MANUAL">Manual Upload</option>
                    <option value="DATABASE">Database</option>
                    <option value="CLOUD_STORAGE">Cloud Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-on-surface mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="active">Active</option>
                    <option value="offline">Offline</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Provider / Portal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  placeholder="e.g. Bhuvan, Sentinel Hub, IMD, Custom Upload"
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Base URL / Endpoint (Optional)</label>
                <input
                  type="url"
                  value={formData.baseUrl}
                  onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                  placeholder="https://services.sentinel-hub.com/api/v1"
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-outline/30 rounded-lg font-semibold text-on-surface hover:bg-surface-container-low transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-1.5"
                >
                  {submitting ? "Saving..." : "Save Data Source"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit</span>
                Edit Data Source
              </h3>
              <button onClick={() => setEditingSource(null)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 bg-error/10 text-error text-xs rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-on-surface mb-1">Data Source Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-on-surface mb-1">Source Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="API">API Portal</option>
                    <option value="MANUAL">Manual Upload</option>
                    <option value="DATABASE">Database</option>
                    <option value="CLOUD_STORAGE">Cloud Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-on-surface mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="active">Active</option>
                    <option value="offline">Offline</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Provider / Portal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Base URL / Endpoint</label>
                <input
                  type="url"
                  value={formData.baseUrl}
                  onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSource(null)}
                  className="px-4 py-2 border border-outline/30 rounded-lg font-semibold text-on-surface hover:bg-surface-container-low transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-1.5"
                >
                  {submitting ? "Updating..." : "Update Data Source"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1">Delete Data Source?</h3>
            <p className="text-xs text-on-surface-variant mb-6">
              Are you sure you want to delete <span className="font-semibold text-on-surface">{deletingSource.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingSource(null)}
                className="px-4 py-2 border border-outline/30 rounded-lg font-semibold text-xs text-on-surface hover:bg-surface-container-low transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="px-4 py-2 bg-error text-white rounded-lg font-semibold text-xs hover:bg-error/90 transition"
              >
                {submitting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
