"use client";

import { useState, useEffect, useRef } from "react";
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

  // Import Modal State
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Edit / Delete / Details Modals
  const [editingDataset, setEditingDataset] = useState<DatasetItem | null>(null);
  const [deletingDataset, setDeletingDataset] = useState<DatasetItem | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Import Form Inputs
  const [importForm, setImportForm] = useState({
    name: "",
    description: "",
    sourceId: "",
  });

  // Edit Form Inputs
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    dataType: "GeoJSON",
    fileFormat: "geojson",
    qualityStatus: "raw",
    sourceId: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleOpenImport = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploading(false);
    setModalError(null);
    setImportSuccess(null);
    setImportForm({
      name: "",
      description: "",
      sourceId: dataSources.length > 0 ? dataSources[0].id : "",
    });
    setIsImportOpen(true);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    setImportForm((prev) => ({
      ...prev,
      name: prev.name || cleanName,
    }));
    setModalError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setModalError("Please select or drop a geospatial file to import.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setModalError(null);
    setImportSuccess(null);

    try {
      const res = await datasetsApi.uploadDataset(
        selectedFile,
        {
          name: importForm.name,
          description: importForm.description || undefined,
          sourceId: importForm.sourceId || undefined,
        },
        (percent) => {
          setUploadProgress(percent);
        }
      );

      setImportSuccess(`Dataset "${res.dataset.name}" imported successfully!`);
      setTimeout(() => {
        setIsImportOpen(false);
        fetchDatasets();
      }, 1200);
    } catch (err: any) {
      setModalError(err?.message || "File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleOpenEdit = (dataset: DatasetItem) => {
    setEditingDataset(dataset);
    setEditForm({
      name: dataset.name,
      description: dataset.description || "",
      dataType: dataset.dataType,
      fileFormat: dataset.fileFormat,
      qualityStatus: dataset.qualityStatus || "raw",
      sourceId: dataset.sourceId || "",
    });
    setModalError(null);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDataset) return;
    setSubmitting(true);
    setModalError(null);
    try {
      await datasetsApi.update(editingDataset.id, {
        name: editForm.name,
        description: editForm.description || undefined,
        dataType: editForm.dataType,
        fileFormat: editForm.fileFormat || editForm.dataType.toLowerCase(),
        qualityStatus: editForm.qualityStatus,
        sourceId: editForm.sourceId || undefined,
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

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getQualityBadge = (status: string) => {
    switch (status) {
      case "cleaned":
      case "standardized":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {status}
          </span>
        );
      case "merged":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            merged
          </span>
        );
      case "raw":
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
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
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 text-[var(--text-main)] transition-colors duration-200">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--bg-surface)] p-5 rounded-xl border border-[var(--border-subtle)] shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-500 text-[26px]">dataset</span>
            Dataset Management Workspace
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Central repository for geospatial layers, satellite imagery metadata, climate assays, and vector datasets.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchDatasets}
            className="p-2 border border-[var(--border-subtle)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition flex items-center justify-center"
            title="Refresh Datasets"
          >
            <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>refresh</span>
          </button>
          <button
            onClick={handleOpenImport}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition flex items-center gap-1.5 shadow-xs text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            Import Dataset
          </button>
        </div>
      </div>

      {/* Main Error Alert */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between text-red-600 dark:text-red-400 text-sm">
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
        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">folder_open</span>
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Total Datasets</p>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mt-0.5">{datasets.length}</h3>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Raster & Imagery</p>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mt-0.5">
              {datasets.filter((d) => ["geotiff", "cog", "jp2", "satellite", "png", "jpg", "jpeg"].includes(d.dataType.toLowerCase())).length}
            </h3>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">map</span>
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Vector Layers</p>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mt-0.5">
              {datasets.filter((d) => ["geojson", "shapefile", "vector"].includes(d.dataType.toLowerCase())).length}
            </h3>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] font-medium">Standardized / Cleaned</p>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mt-0.5">
              {datasets.filter((d) => d.qualityStatus === "cleaned" || d.qualityStatus === "standardized").length}
            </h3>
          </div>
        </div>
      </div>

      {/* Supported Dataset Types Banner */}
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-subtle)] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
          <span className="material-symbols-outlined text-[20px]">layers</span>
          <span>Supported File Formats & Dataset Pipeline</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Upload geospatial datasets directly into GeoVision. Our automated pipeline validates formats, organizes storage into categorized subfolders, and generates dataset records:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {["CSV", "Excel (.xlsx)", "GeoJSON", "Shapefile (.shp / .zip)", "GeoTIFF (.tif)", "Cloud Optimized GeoTIFF (.cog)", "JP2", "PNG", "JPG", "JPEG"].map((fmt) => (
            <span key={fmt} className="px-3 py-1 bg-[var(--bg-surface-hover)] text-emerald-600 dark:text-emerald-400 font-medium text-xs rounded-lg border border-[var(--border-subtle)]">
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[var(--bg-surface)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-xs">
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
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]"
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
            className="px-3 py-2 border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-main)] bg-[var(--bg-surface)]"
          >
            <option value="ALL">All Quality Statuses</option>
            <option value="raw">Raw</option>
            <option value="cleaned">Cleaned</option>
            <option value="standardized">Standardized</option>
            <option value="merged">Merged</option>
          </select>

          <div className="relative flex-1 lg:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or type..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-main)] bg-[var(--bg-surface)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="flex items-center bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition ${viewMode === "grid" ? "bg-[var(--bg-surface)] text-emerald-600 dark:text-emerald-400 shadow-xs" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs transition ${viewMode === "list" ? "bg-[var(--bg-surface)] text-emerald-600 dark:text-emerald-400 shadow-xs" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
              title="List View"
            >
              <span className="material-symbols-outlined text-[18px]">reorder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] p-16 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-[var(--text-muted)]">Loading Datasets...</p>
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[var(--bg-surface-hover)] rounded-full flex items-center justify-center text-[var(--text-muted)] mb-4">
            <span className="material-symbols-outlined text-[32px]">folder_open</span>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">No datasets imported yet.</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mb-6">
            {datasets.length === 0
              ? "Upload a geospatial file (GeoJSON, GeoTIFF, Shapefile, CSV) to import your first dataset."
              : "No datasets match your current filter or search criteria."}
          </p>
          {datasets.length === 0 ? (
            <button
              onClick={handleOpenImport}
              className="px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              Import Dataset
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveTab("ALL");
                setActiveQuality("ALL");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-[var(--bg-surface-hover)] text-[var(--text-main)] border border-[var(--border-subtle)] font-semibold rounded-lg text-xs hover:bg-[var(--border-subtle)] transition"
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
              className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden flex flex-col hover:border-[var(--border-medium)] transition-all duration-200 shadow-xs"
            >
              <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">{getTypeIcon(dataset.dataType)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getQualityBadge(dataset.qualityStatus)}
                  <span className="px-2 py-0.5 bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] text-[10px] font-bold rounded-md uppercase">
                    {dataset.fileFormat}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-[var(--text-main)] text-base leading-snug line-clamp-1 mb-1">
                    {dataset.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                    {dataset.description || "No description provided."}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs">
                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span className="font-medium">File Size:</span>
                    <span className="font-mono text-[var(--text-main)]">{formatFileSize(dataset.fileSizeBytes)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span className="font-medium">Data Source:</span>
                    <span className="font-semibold text-[var(--text-main)]">
                      {dataset.source?.name || "Direct Import"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span className="font-medium">Owner:</span>
                    <span className="font-semibold text-[var(--text-main)]">
                      {dataset.uploader?.name || "System Admin"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span className="font-medium">Upload Date:</span>
                    <span className="text-[var(--text-main)]">
                      {new Date(dataset.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => setSelectedDataset(dataset)}
                    className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    View Details
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(dataset)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
                      title="Edit Dataset Metadata"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingDataset(dataset)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition"
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
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-surface-hover)] border-b border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-muted)]">
                  <th className="px-6 py-4">Dataset Name</th>
                  <th className="px-6 py-4">Data Type</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">File Size</th>
                  <th className="px-6 py-4">Linked Data Source</th>
                  <th className="px-6 py-4">Quality Status</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Upload Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-sm">
                {filteredDatasets.map((dataset) => (
                  <tr key={dataset.id} className="hover:bg-[var(--bg-surface-hover)] transition">
                    <td className="px-6 py-4 font-semibold text-[var(--text-main)]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">{getTypeIcon(dataset.dataType)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--text-main)]">{dataset.name}</div>
                          {dataset.description && (
                            <div className="text-[11px] text-[var(--text-muted)] font-normal line-clamp-1">
                              {dataset.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-xs text-[var(--text-main)]">{dataset.dataType}</td>
                    <td className="px-6 py-4 font-mono text-xs uppercase text-[var(--text-muted)]">{dataset.fileFormat}</td>
                    <td className="px-6 py-4 font-mono text-xs text-[var(--text-main)]">{formatFileSize(dataset.fileSizeBytes)}</td>
                    <td className="px-6 py-4 text-xs font-medium text-[var(--text-muted)]">
                      {dataset.source?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">{getQualityBadge(dataset.qualityStatus)}</td>
                    <td className="px-6 py-4 text-xs text-[var(--text-muted)]">
                      {dataset.uploader?.name || "System Admin"}
                    </td>
                    <td className="px-6 py-4 text-xs text-[var(--text-muted)]">
                      {new Date(dataset.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedDataset(dataset)}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(dataset)}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition"
                        title="Edit Dataset"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingDataset(dataset)}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[var(--bg-surface)] rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[var(--border-subtle)] text-[var(--text-main)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">info</span>
                Dataset Details
              </h3>
              <button onClick={() => setSelectedDataset(null)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[var(--text-muted)] font-medium">Dataset Name:</span>
                <p className="text-sm font-bold text-[var(--text-main)] mt-0.5">{selectedDataset.name}</p>
              </div>

              <div>
                <span className="text-[var(--text-muted)] font-medium">Description:</span>
                <p className="text-[var(--text-main)] mt-0.5">{selectedDataset.description || "No description provided."}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border-subtle)]">
                <div>
                  <span className="text-[var(--text-muted)] font-medium">Data Type:</span>
                  <p className="font-semibold text-[var(--text-main)]">{selectedDataset.dataType}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] font-medium">File Format:</span>
                  <p className="font-semibold text-[var(--text-main)] uppercase">{selectedDataset.fileFormat}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] font-medium">File Size:</span>
                  <p className="font-mono font-semibold text-[var(--text-main)]">{formatFileSize(selectedDataset.fileSizeBytes)}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] font-medium">Quality Status:</span>
                  <div className="mt-1">{getQualityBadge(selectedDataset.qualityStatus)}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] font-medium">Storage Path:</span>
                <p className="font-mono text-[11px] text-[var(--text-main)] bg-[var(--bg-surface-hover)] p-2 rounded-lg mt-0.5 truncate border border-[var(--border-subtle)]">
                  {selectedDataset.filePath || "N/A"}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] font-medium">Linked Data Source:</span>
                <p className="font-semibold text-[var(--text-main)]">
                  {selectedDataset.source?.name ? `${selectedDataset.source.name} (${selectedDataset.source.provider})` : "Direct Import / None"}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[var(--text-muted)]">
                <span>Upload Date: {new Date(selectedDataset.createdAt).toLocaleString()}</span>
                <span>Owner: {selectedDataset.uploader?.name || "Admin"}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                onClick={() => setSelectedDataset(null)}
                className="px-4 py-2 bg-[var(--bg-surface-hover)] text-[var(--text-main)] font-semibold rounded-lg text-xs hover:bg-[var(--border-subtle)] transition border border-[var(--border-subtle)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Dataset Modal (Drag & Drop + Progress Bar) */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[var(--bg-surface)] rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[var(--border-subtle)] text-[var(--text-main)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">upload_file</span>
                Import Geospatial Dataset
              </h3>
              <button
                onClick={() => setIsImportOpen(false)}
                disabled={uploading}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Error Notification */}
            {modalError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{modalError}</span>
              </div>
            )}

            {/* Success Notification */}
            {importSuccess && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2.5 font-semibold">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>{importSuccess}</span>
              </div>
            )}

            <form onSubmit={handleImportSubmit} className="space-y-4 text-xs">
              {/* Drag & Drop Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-500/10"
                    : selectedFile
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-[var(--border-subtle)] hover:border-emerald-500/50 bg-[var(--bg-surface-hover)]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  accept=".csv,.xlsx,.xls,.json,.geojson,.shp,.shx,.dbf,.prj,.cpg,.zip,.tif,.tiff,.cog,.jp2,.png,.jpg,.jpeg"
                />

                {selectedFile ? (
                  <div className="space-y-1">
                    <span className="material-symbols-outlined text-emerald-500 text-[36px]">description</span>
                    <p className="font-bold text-[var(--text-main)] text-sm">{selectedFile.name}</p>
                    <p className="text-[var(--text-muted)] font-mono text-[11px]">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type || "Geospatial File"}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="mt-2 text-xs text-red-500 font-semibold hover:underline"
                    >
                      Change File
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1">
                      <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
                    </div>
                    <p className="font-semibold text-[var(--text-main)] text-sm">
                      Drag & Drop your geospatial dataset here
                    </p>
                    <p className="text-[var(--text-muted)] text-[11px]">
                      or click to <span className="text-emerald-500 font-bold">Browse Files</span>
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1 max-w-xs">
                      Supported: CSV, Excel, GeoJSON, Shapefile (.shp/.zip), GeoTIFF (.tif/.cog), JP2, PNG, JPG, JPEG (Max 100MB)
                    </p>
                  </>
                )}
              </div>

              {/* Upload Progress Bar */}
              {uploading && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-main)]">
                    <span>Uploading file...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg-surface-hover)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Form Inputs */}
              <div>
                <label className="block font-medium text-[var(--text-main)] mb-1">Dataset Name</label>
                <input
                  type="text"
                  value={importForm.name}
                  onChange={(e) => setImportForm({ ...importForm, name: e.target.value })}
                  placeholder="Auto-generated from filename if empty..."
                  className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30 placeholder:text-[var(--text-muted)]"
                />
              </div>

              <div>
                <label className="block font-medium text-[var(--text-main)] mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={importForm.description}
                  onChange={(e) => setImportForm({ ...importForm, description: e.target.value })}
                  placeholder="Describe dataset coverage, parameters, or bounds..."
                  className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30 placeholder:text-[var(--text-muted)]"
                />
              </div>

              <div>
                <label className="block font-medium text-[var(--text-main)] mb-1">Link Data Source (Optional)</label>
                <select
                  value={importForm.sourceId}
                  onChange={(e) => setImportForm({ ...importForm, sourceId: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="">None (Direct File Import)</option>
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
                  onClick={() => setIsImportOpen(false)}
                  disabled={uploading}
                  className="px-4 py-2 border border-[var(--border-subtle)] rounded-lg font-semibold text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      <span>Import Dataset</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dataset Metadata Modal */}
      {editingDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[var(--bg-surface)] rounded-2xl max-w-md w-full p-6 shadow-xl border border-[var(--border-subtle)] text-[var(--text-main)] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">edit</span>
                Edit Dataset Metadata
              </h3>
              <button onClick={() => setEditingDataset(null)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-xs rounded-lg flex items-center gap-2 border border-red-500/30">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[var(--text-main)] mb-1">Dataset Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block font-medium text-[var(--text-main)] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[var(--text-main)] mb-1">Data Type *</label>
                  <select
                    value={editForm.dataType}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        dataType: e.target.value,
                        fileFormat: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="GeoJSON">GeoJSON</option>
                    <option value="GeoTIFF">GeoTIFF</option>
                    <option value="Shapefile">Shapefile</option>
                    <option value="CSV">CSV</option>
                    <option value="Excel">Excel (.xlsx)</option>
                    <option value="COG">Cloud Optimized GeoTIFF (COG)</option>
                    <option value="JP2">JP2</option>
                    <option value="Satellite Image">Satellite Image</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[var(--text-main)] mb-1">Quality Status</label>
                  <select
                    value={editForm.qualityStatus}
                    onChange={(e) => setEditForm({ ...editForm, qualityStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="raw">Raw</option>
                    <option value="cleaned">Cleaned</option>
                    <option value="standardized">Standardized</option>
                    <option value="merged">Merged</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[var(--text-main)] mb-1">Link Data Source</label>
                <select
                  value={editForm.sourceId}
                  onChange={(e) => setEditForm({ ...editForm, sourceId: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="">None (Direct File Import)</option>
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
                  className="px-4 py-2 border border-[var(--border-subtle)] rounded-lg font-semibold text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center gap-1.5"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[var(--bg-surface)] rounded-2xl max-w-sm w-full p-6 shadow-xl border border-[var(--border-subtle)] text-center animate-in fade-in zoom-in-95 text-[var(--text-main)]">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">Delete Dataset?</h3>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Are you sure you want to delete <span className="font-semibold text-[var(--text-main)]">{deletingDataset.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingDataset(null)}
                className="px-4 py-2 border border-[var(--border-subtle)] rounded-lg font-semibold text-xs text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-xs hover:bg-red-700 transition"
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
