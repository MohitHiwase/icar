"use client";

import { useState, useEffect } from "react";
import { datasetsApi, dataSourcesApi, DatasetItem, DataSourceItem } from "@/lib/api";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<DatasetItem[]>([]);
  const [dataSources, setDataSources] = useState<DataSourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [activeQuality, setActiveQuality] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingDataset, setEditingDataset] = useState<DatasetItem | null>(null);
  const [deletingDataset, setDeletingDataset] = useState<DatasetItem | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dataType: "GeoJSON",
    fileFormat: "geojson",
    origin: "manual_upload",
    qualityStatus: "raw",
    sourceId: "",
  });

  const fetchDatasets = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dsRes, sourcesRes] = await Promise.all([
        datasetsApi.getAll(),
        dataSourcesApi.getAll().catch(() => ({ dataSources: [] })),
      ]);
      setDatasets(dsRes.datasets || []);
      setDataSources(sourcesRes.dataSources || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load datasets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  // Filter logic
  const filteredDatasets = datasets.filter((ds) => {
    const matchesTab =
      activeTab === "ALL" ||
      ds.dataType.toLowerCase() === activeTab.toLowerCase() ||
      ds.fileFormat.toLowerCase() === activeTab.toLowerCase();

    const matchesQuality =
      activeQuality === "ALL" || ds.qualityStatus === activeQuality;

    const matchesSearch =
      ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ds.description && ds.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ds.dataType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesQuality && matchesSearch;
  });

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      description: "",
      dataType: "GeoJSON",
      fileFormat: "geojson",
      origin: "manual_upload",
      qualityStatus: "raw",
      sourceId: dataSources.length > 0 ? dataSources[0].id : "",
    });
    setModalError(null);
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (dataset: DatasetItem) => {
    setEditingDataset(dataset);
    setFormData({
      name: dataset.name,
      description: dataset.description || "",
      dataType: dataset.dataType,
      fileFormat: dataset.fileFormat,
      origin: dataset.origin || "manual_upload",
      qualityStatus: dataset.qualityStatus || "raw",
      sourceId: dataset.sourceId || "",
    });
    setModalError(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);
    try {
      await datasetsApi.create({
        name: formData.name,
        description: formData.description || undefined,
        dataType: formData.dataType,
        fileFormat: formData.fileFormat || formData.dataType.toLowerCase(),
        origin: formData.origin,
        qualityStatus: formData.qualityStatus,
        sourceId: formData.sourceId || undefined,
      });
      setIsCreateOpen(false);
      fetchDatasets();
    } catch (err: any) {
      setModalError(err?.message || "Failed to create dataset");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDataset) return;
    setSubmitting(true);
    setModalError(null);
    try {
      await datasetsApi.update(editingDataset.id, {
        name: formData.name,
        description: formData.description || undefined,
        dataType: formData.dataType,
        fileFormat: formData.fileFormat || formData.dataType.toLowerCase(),
        origin: formData.origin,
        qualityStatus: formData.qualityStatus,
        sourceId: formData.sourceId || undefined,
      });
      setEditingDataset(null);
      fetchDatasets();
    } catch (err: any) {
      setModalError(err?.message || "Failed to update dataset");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingDataset) return;
    setSubmitting(true);
    try {
      await datasetsApi.delete(deletingDataset.id);
      setDeletingDataset(null);
      fetchDatasets();
    } catch (err: any) {
      setError(err?.message || "Failed to delete dataset");
    } finally {
      setSubmitting(false);
    }
  };

  const getQualityBadge = (status: string) => {
    switch (status) {
      case "cleaned":
      case "standardized":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            {status}
          </span>
        );
      case "merged":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary/10 text-tertiary border border-tertiary/20">
            merged
          </span>
        );
      case "raw":
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container text-secondary border border-secondary/20">
            raw
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("satellite") || t.includes("geotiff") || t.includes("cog") || t.includes("jp2")) return "satellite_alt";
    if (t.includes("geojson") || t.includes("shapefile") || t.includes("vector")) return "map";
    if (t.includes("climate") || t.includes("weather")) return "cloud";
    if (t.includes("soil") || t.includes("assay")) return "science";
    return "dataset";
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">dataset</span>
            Dataset Management
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Central repository for geospatial layers, satellite imagery metadata, climate assays, and vector datasets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDatasets}
            className="p-2.5 border border-outline/30 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition flex items-center justify-center"
            title="Refresh Datasets"
          >
            <span className={`material-symbols-outlined ${loading ? "animate-spin" : ""}`}>refresh</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition flex items-center gap-2 shadow-sm text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create Dataset
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

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">folder_open</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Total Datasets</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">{datasets.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Raster & Imagery</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
              {datasets.filter((d) => ["geotiff", "cog", "jp2", "satellite", "png", "jpg"].includes(d.dataType.toLowerCase())).length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">map</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Vector Layers</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
              {datasets.filter((d) => ["geojson", "shapefile", "vector"].includes(d.dataType.toLowerCase())).length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Standardized / Cleaned</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
              {datasets.filter((d) => d.qualityStatus === "cleaned" || d.qualityStatus === "standardized").length}
            </h3>
          </div>
        </div>
      </div>

      {/* Supported Dataset Types Banner */}
      <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 elevation-1 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <span className="material-symbols-outlined text-[20px]">layers</span>
          <span>Supported Geospatial Data Formats</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          GeoVision dataset metadata architecture supports tabular, vector, and high-resolution satellite raster formats ready for AI analysis & GIS overlay:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {["CSV", "Excel (.xlsx)", "GeoJSON", "Shapefile (.shp)", "GeoTIFF", "Cloud Optimized GeoTIFF (COG)", "JP2", "PNG", "JPG", "JPEG"].map((fmt) => (
            <span key={fmt} className="px-3 py-1 bg-[#f0f7f5] text-primary font-medium text-xs rounded-lg border border-primary/15">
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-outline-variant/30 elevation-1">
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
          {[
            { id: "ALL", label: "All Datasets" },
            { id: "GeoJSON", label: "GeoJSON" },
            { id: "GeoTIFF", label: "GeoTIFF" },
            { id: "Shapefile", label: "Shapefile" },
            { id: "CSV", label: "CSV / Tabular" },
            { id: "satellite", label: "Satellite" },
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

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <select
            value={activeQuality}
            onChange={(e) => setActiveQuality(e.target.value)}
            className="px-3 py-2 border border-outline/30 rounded-xl text-xs text-on-surface bg-white"
          >
            <option value="ALL">All Quality Statuses</option>
            <option value="raw">Raw</option>
            <option value="cleaned">Cleaned</option>
            <option value="standardized">Standardized</option>
            <option value="merged">Merged</option>
          </select>

          <div className="relative flex-1 lg:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or type..."
              className="w-full pl-10 pr-4 py-2 border border-outline/30 rounded-xl text-xs text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex items-center bg-surface-container-high rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs ${viewMode === "grid" ? "bg-white text-primary shadow-xs" : "text-on-surface-variant"}`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs ${viewMode === "list" ? "bg-white text-primary shadow-xs" : "text-on-surface-variant"}`}
              title="List View"
            >
              <span className="material-symbols-outlined text-[18px]">reorder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-outline-variant/30 p-16 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-on-surface-variant">Loading Datasets...</p>
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-outline-variant/30 p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant mb-4">
            <span className="material-symbols-outlined text-[32px]">folder_open</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-1">No datasets configured yet</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mb-6">
            {datasets.length === 0
              ? "Create your first dataset metadata entry linked to a data source."
              : "No datasets match your current filter or search criteria."}
          </p>
          {datasets.length === 0 ? (
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Your First Dataset
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveTab("ALL");
                setActiveQuality("ALL");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded-lg text-xs hover:bg-surface-container-highest transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDatasets.map((dataset) => (
            <div
              key={dataset.id}
              className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden flex flex-col hover:shadow-md transition-all duration-200"
            >
              <div className="p-5 border-b border-outline-variant/20 bg-surface-container-low flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">{getTypeIcon(dataset.dataType)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getQualityBadge(dataset.qualityStatus)}
                  <span className="px-2 py-0.5 bg-white text-on-surface-variant border border-outline/20 text-[10px] font-bold rounded-md uppercase">
                    {dataset.fileFormat}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-on-surface text-base leading-snug line-clamp-1 mb-1">
                    {dataset.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2">
                    {dataset.description || "No description provided."}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-outline-variant/20 text-xs">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-medium">Data Source:</span>
                    <span className="font-semibold text-on-surface">
                      {dataset.source?.name || "Direct Metadata"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-medium">Owner:</span>
                    <span className="font-semibold text-on-surface">
                      {dataset.uploader?.name || "System Admin"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-medium">Created:</span>
                    <span>
                      {new Date(dataset.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                  <button
                    onClick={() => setSelectedDataset(dataset)}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    View Details
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(dataset)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition"
                      title="Edit Dataset"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingDataset(dataset)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition"
                      title="Delete Dataset"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden elevation-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/40 text-xs font-semibold text-on-surface-variant">
                  <th className="px-6 py-4">Dataset Name</th>
                  <th className="px-6 py-4">Data Type</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Linked Data Source</th>
                  <th className="px-6 py-4">Quality Status</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-sm">
                {filteredDatasets.map((dataset) => (
                  <tr key={dataset.id} className="hover:bg-surface-container-low/40 transition">
                    <td className="px-6 py-4 font-semibold text-on-surface">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">{getTypeIcon(dataset.dataType)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-on-surface">{dataset.name}</div>
                          {dataset.description && (
                            <div className="text-[11px] text-on-surface-variant font-normal line-clamp-1">
                              {dataset.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-xs text-on-surface">{dataset.dataType}</td>
                    <td className="px-6 py-4 font-mono text-xs uppercase text-on-surface-variant">{dataset.fileFormat}</td>
                    <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
                      {dataset.source?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">{getQualityBadge(dataset.qualityStatus)}</td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">
                      {dataset.uploader?.name || "System Admin"}
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">
                      {new Date(dataset.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedDataset(dataset)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(dataset)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition"
                        title="Edit Dataset"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingDataset(dataset)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition"
                        title="Delete Dataset"
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

      {/* Details Slide-over / Modal */}
      {selectedDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Dataset Details
              </h3>
              <button onClick={() => setSelectedDataset(null)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-on-surface-variant font-medium">Dataset Name:</span>
                <p className="text-sm font-bold text-on-surface mt-0.5">{selectedDataset.name}</p>
              </div>

              <div>
                <span className="text-on-surface-variant font-medium">Description:</span>
                <p className="text-on-surface mt-0.5">{selectedDataset.description || "No description provided."}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-outline-variant/20">
                <div>
                  <span className="text-on-surface-variant font-medium">Data Type:</span>
                  <p className="font-semibold text-on-surface">{selectedDataset.dataType}</p>
                </div>
                <div>
                  <span className="text-on-surface-variant font-medium">File Format:</span>
                  <p className="font-semibold text-on-surface uppercase">{selectedDataset.fileFormat}</p>
                </div>
                <div>
                  <span className="text-on-surface-variant font-medium">Quality Status:</span>
                  <div className="mt-1">{getQualityBadge(selectedDataset.qualityStatus)}</div>
                </div>
                <div>
                  <span className="text-on-surface-variant font-medium">Origin:</span>
                  <p className="font-semibold text-on-surface">{selectedDataset.origin}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/20">
                <span className="text-on-surface-variant font-medium">Linked Data Source:</span>
                <p className="font-semibold text-on-surface">
                  {selectedDataset.source?.name ? `${selectedDataset.source.name} (${selectedDataset.source.provider})` : "Direct Entry / None"}
                </p>
              </div>

              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-on-surface-variant">
                <span>Created: {new Date(selectedDataset.createdAt).toLocaleString()}</span>
                <span>Updated: {new Date(selectedDataset.updatedAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                onClick={() => setSelectedDataset(null)}
                className="px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded-lg text-xs hover:bg-surface-container-highest transition"
              >
                Close
              </button>
            </div>
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
                Create Dataset Metadata
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
                <label className="block font-medium text-on-surface mb-1">Dataset Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Midwest Corn Vegetation Index"
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe dataset coverage, resolution, or parameters..."
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-on-surface mb-1">Data Type *</label>
                  <select
                    value={formData.dataType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dataType: e.target.value,
                        fileFormat: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="GeoJSON">GeoJSON</option>
                    <option value="GeoTIFF">GeoTIFF</option>
                    <option value="Shapefile">Shapefile</option>
                    <option value="CSV">CSV</option>
                    <option value="Excel">Excel (.xlsx)</option>
                    <option value="COG">Cloud Optimized GeoTIFF (COG)</option>
                    <option value="JP2">JP2</option>
                    <option value="satellite">Satellite Imagery</option>
                    <option value="climate">Climate Data</option>
                    <option value="soil">Soil Assay</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-on-surface mb-1">Quality Status</label>
                  <select
                    value={formData.qualityStatus}
                    onChange={(e) => setFormData({ ...formData, qualityStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="raw">Raw</option>
                    <option value="cleaned">Cleaned</option>
                    <option value="standardized">Standardized</option>
                    <option value="merged">Merged</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Link Data Source</label>
                <select
                  value={formData.sourceId}
                  onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">None (Direct Creation)</option>
                  {dataSources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name} ({source.provider})
                    </option>
                  ))}
                </select>
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
                  {submitting ? "Creating..." : "Save Dataset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit</span>
                Edit Dataset
              </h3>
              <button onClick={() => setEditingDataset(null)} className="text-on-surface-variant hover:text-on-surface">
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
                <label className="block font-medium text-on-surface mb-1">Dataset Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-on-surface mb-1">Data Type *</label>
                  <select
                    value={formData.dataType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dataType: e.target.value,
                        fileFormat: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="GeoJSON">GeoJSON</option>
                    <option value="GeoTIFF">GeoTIFF</option>
                    <option value="Shapefile">Shapefile</option>
                    <option value="CSV">CSV</option>
                    <option value="Excel">Excel (.xlsx)</option>
                    <option value="COG">Cloud Optimized GeoTIFF (COG)</option>
                    <option value="JP2">JP2</option>
                    <option value="satellite">Satellite Imagery</option>
                    <option value="climate">Climate Data</option>
                    <option value="soil">Soil Assay</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-on-surface mb-1">Quality Status</label>
                  <select
                    value={formData.qualityStatus}
                    onChange={(e) => setFormData({ ...formData, qualityStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="raw">Raw</option>
                    <option value="cleaned">Cleaned</option>
                    <option value="standardized">Standardized</option>
                    <option value="merged">Merged</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-1">Link Data Source</label>
                <select
                  value={formData.sourceId}
                  onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/30 rounded-lg text-xs text-on-surface focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">None (Direct Creation)</option>
                  {dataSources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name} ({source.provider})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDataset(null)}
                  className="px-4 py-2 border border-outline/30 rounded-lg font-semibold text-on-surface hover:bg-surface-container-low transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-1.5"
                >
                  {submitting ? "Updating..." : "Update Dataset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1">Delete Dataset?</h3>
            <p className="text-xs text-on-surface-variant mb-6">
              Are you sure you want to delete <span className="font-semibold text-on-surface">{deletingDataset.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingDataset(null)}
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
