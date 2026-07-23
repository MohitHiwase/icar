"use client";

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

export function LayerPanel({
  layers,
  visibleLayerIds,
  onToggleVisibility,
  onZoomToLayer,
  onDeleteLayer,
  isOpen,
  onClose,
}: LayerPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-6 top-6 w-80 z-20 space-y-3 animate-in fade-in slide-in-from-left-4 duration-200">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/70 p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">layers</span>
            <span>Map Layers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
              {visibleLayerIds.size} / {layers.length} Active
            </span>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Layers List */}
        {layers.length === 0 ? (
          <div className="py-6 px-4 text-center space-y-3 bg-surface-container-low/60 rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-on-surface-variant text-[32px]">
              layers_clear
            </span>
            <div>
              <p className="text-xs font-bold text-on-surface">No map layers available.</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Import a GeoJSON or geospatial dataset to visualize.
              </p>
            </div>
            <Link
              href="/datasets"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              Import Dataset
            </Link>
          </div>
        ) : (
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {layers.map((layer) => (
              <LayerItem
                key={layer.id}
                layer={layer}
                isVisible={visibleLayerIds.has(layer.id)}
                onToggleVisibility={onToggleVisibility}
                onZoomTo={onZoomToLayer}
                onDelete={onDeleteLayer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
