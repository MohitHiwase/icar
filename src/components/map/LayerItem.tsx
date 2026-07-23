"use client";

import { MapDatasetItem } from "@/lib/api";

interface LayerItemProps {
  layer: MapDatasetItem;
  isVisible: boolean;
  onToggleVisibility: (id: string) => void;
  onZoomTo: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LayerItem({
  layer,
  isVisible,
  onToggleVisibility,
  onZoomTo,
  onDelete,
}: LayerItemProps) {
  const getFormatBadge = (fmt: string) => {
    return (
      <span className="px-1.5 py-0.5 bg-[var(--bg-surface-hover)] text-[var(--text-muted)] text-[10px] font-mono font-bold rounded uppercase border border-[var(--border-subtle)]">
        {fmt}
      </span>
    );
  };

  return (
    <div
      className={`p-3 rounded-lg border transition-all ${
        isVisible
          ? "bg-emerald-500/10 border-emerald-500/30 text-[var(--text-main)] shadow-xs"
          : "bg-[var(--bg-app)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            onClick={() => onToggleVisibility(layer.id)}
            className={`p-1.5 rounded-md transition ${
              isVisible ? "text-emerald-500 bg-emerald-500/15" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
            title={isVisible ? "Hide Layer" : "Show Layer"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isVisible ? "visibility" : "visibility_off"}
            </span>
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-[var(--text-main)] truncate">{layer.name}</span>
              {getFormatBadge(layer.fileFormat)}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] truncate">
              {layer.uploader?.name || "System"} • {new Date(layer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onZoomTo(layer.id)}
            className="p-1 rounded text-[var(--text-muted)] hover:text-emerald-500 hover:bg-emerald-500/10 transition"
            title="Zoom to Extent"
          >
            <span className="material-symbols-outlined text-[16px]">my_location</span>
          </button>
          <button
            onClick={() => onDelete(layer.id)}
            className="p-1 rounded text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition"
            title="Delete Layer Dataset"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
