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
      <div className="bg-[var(--bg-surface)]/90 backdrop-blur-md rounded-xl shadow-lg border border-[var(--border-subtle)] p-4 space-y-4 text-[var(--text-main)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">layers</span>
            <span>Map Layers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold rounded border border-emerald-500/20">
              {visibleLayerIds.size} / {layers.length} Active
            </span>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded-lg hover:bg-[var(--bg-surface-hover)]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Layers List */}
        {layers.length === 0 ? (
          <div className="py-6 px-4 text-center space-y-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-subtle)]">
            <span className="material-symbols-outlined text-[var(--text-muted)] text-[32px]">
              layers_clear
            </span>
            <div>
              <p className="text-xs font-bold text-[var(--text-main)]">No map layers available.</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                Import a GeoJSON or geospatial dataset to visualize.
              </p>
            </div>
            <Link
              href="/datasets"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition shadow-xs"
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
