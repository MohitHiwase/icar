"use client";

import { useState } from "react";
import Link from "next/link";
import { MapDatasetItem } from "@/lib/api";
import { LayerItem } from "./LayerItem";

interface LayerPanelProps {
  layers: MapDatasetItem[];
  visibleLayerIds: Set<string>;
  onToggleVisibility: (id: string) => void;
  onZoomToLayer: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PLACEHOLDER_CATALOG = [
  { id: "pl-1", name: "Satellite Imagery (Sentinel-2 L2A)", fileFormat: "GeoTIFF", uploader: { name: "ESA Copernicus" }, createdAt: "2026-07-20T00:00:00Z", defaultActive: true },
  { id: "pl-2", name: "District Boundaries (Karnal HR)", fileFormat: "GeoJSON", uploader: { name: "Survey of India" }, createdAt: "2026-07-15T00:00:00Z", defaultActive: true },
  { id: "pl-3", name: "Roads & Transit Infrastructure", fileFormat: "SHP", uploader: { name: "GIS Portal" }, createdAt: "2026-07-10T00:00:00Z", defaultActive: true },
  { id: "pl-4", name: "Administrative Boundaries (Taluk)", fileFormat: "GeoJSON", uploader: { name: "National Spatial Data" }, createdAt: "2026-07-05T00:00:00Z", defaultActive: true },
  { id: "pl-5", name: "Soil Health Index Layer", fileFormat: "TIFF", uploader: { name: "ICAR Soil Bureau" }, createdAt: "2026-06-28T00:00:00Z", defaultActive: false },
  { id: "pl-6", name: "NDVI Vegetation Density", fileFormat: "GeoTIFF", uploader: { name: "GeoVision Engine" }, createdAt: "2026-06-25T00:00:00Z", defaultActive: false },
  { id: "pl-7", name: "Rainfall Telemetry Heatmap", fileFormat: "KML", uploader: { name: "IMD Weather Stream" }, createdAt: "2026-06-20T00:00:00Z", defaultActive: false },
  { id: "pl-8", name: "Crop Health Stress Assessment", fileFormat: "GeoJSON", uploader: { name: "AI Analytics Node" }, createdAt: "2026-06-18T00:00:00Z", defaultActive: false },
  { id: "pl-9", name: "Field Boundaries (Delineated)", fileFormat: "SHP", uploader: { name: "Precise Agri Engine" }, createdAt: "2026-06-12T00:00:00Z", defaultActive: false },
  { id: "pl-10", name: "Cloud Masking & Removal Layer", fileFormat: "GeoTIFF", uploader: { name: "Atmosphere Engine" }, createdAt: "2026-06-05T00:00:00Z", defaultActive: false },
];

export function LayerPanel({
  layers,
  visibleLayerIds,
  onToggleVisibility,
  onZoomToLayer,
  onDeleteLayer,
  isOpen,
  onClose,
}: LayerPanelProps) {
  const [activeTab, setActiveTab] = useState<"loaded" | "catalog">("loaded");
  const [catalogState, setCatalogState] = useState(
    PLACEHOLDER_CATALOG.reduce((acc, item) => {
      acc[item.id] = item.defaultActive;
      return acc;
    }, {} as Record<string, boolean>)
  );

  if (!isOpen) return null;

  const displayLayers = layers.length > 0 ? layers : (PLACEHOLDER_CATALOG as unknown as MapDatasetItem[]);

  return (
    <div className="absolute left-4 top-[100px] w-88 z-20 space-y-3 animate-in fade-in slide-in-from-left-4 duration-200">
      <div className="bg-[var(--bg-surface-elevated)] backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--border-subtle)] p-4 space-y-3.5 text-[var(--text-main)]">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">layers</span>
            <span>Spatial Layer Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold rounded-md border border-emerald-500/20">
              {visibleLayerIds.size || Object.values(catalogState).filter(Boolean).length} / {displayLayers.length} Active
            </span>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded-lg hover:bg-[var(--bg-surface-hover)]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Informative Guidance Banner */}
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-[var(--text-muted)] leading-relaxed flex items-start gap-2">
          <span className="material-symbols-outlined text-[16px] text-emerald-400 shrink-0 mt-0.5">info</span>
          <p>
            Toggle visibility, adjust raster opacity, or import custom GeoJSON, GeoTIFF, and Shapefiles for multi-layer spatial analysis.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)] text-xs">
          <button
            onClick={() => setActiveTab("loaded")}
            className={`flex-1 py-1.5 rounded-lg font-bold text-center transition ${
              activeTab === "loaded"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            Active Map Layers ({displayLayers.length})
          </button>
        </div>

        {/* Layers List */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {displayLayers.map((layer) => {
            const isVis = layers.length > 0 ? visibleLayerIds.has(layer.id) : !!catalogState[layer.id];
            return (
              <LayerItem
                key={layer.id}
                layer={layer}
                isVisible={isVis}
                onToggleVisibility={(id) => {
                  if (layers.length > 0) {
                    onToggleVisibility(id);
                  } else {
                    setCatalogState((prev) => ({ ...prev, [id]: !prev[id] }));
                  }
                }}
                onZoomTo={onZoomToLayer}
                onDelete={onDeleteLayer}
              />
            );
          })}
        </div>

        {/* Panel Footer */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <Link
            href="/datasets"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">upload_file</span>
            Import Dataset
          </Link>
          <span className="text-[10px] font-mono text-[var(--text-faint)]">Spatial Engine v2.4</span>
        </div>

      </div>
    </div>
  );
}
