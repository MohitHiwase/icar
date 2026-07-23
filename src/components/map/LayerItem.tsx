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
      <span className="px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-bold rounded uppercase">
        {fmt}
      </span>
    );
  };

  return (
    <div
      className={`p-3 rounded-xl border transition-all ${
        isVisible
          ? "bg-primary/10 border-primary/30 shadow-xs"
          : "bg-surface-container-low border-outline-variant/30 hover:bg-surface-container"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            onClick={() => onToggleVisibility(layer.id)}
            className={`p-1.5 rounded-lg transition ${
              isVisible ? "text-primary bg-primary/15" : "text-on-surface-variant hover:text-on-surface"
            }`}
            title={isVisible ? "Hide Layer" : "Show Layer"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isVisible ? "visibility" : "visibility_off"}
            </span>
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-on-surface truncate">{layer.name}</span>
              {getFormatBadge(layer.fileFormat)}
            </div>
            <p className="text-[10px] text-on-surface-variant truncate">
              {layer.uploader?.name || "System"} • {new Date(layer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onZoomTo(layer.id)}
            className="p-1 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition"
            title="Zoom to Extent"
          >
            <span className="material-symbols-outlined text-[16px]">my_location</span>
          </button>
          <button
            onClick={() => onDelete(layer.id)}
            className="p-1 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition"
            title="Delete Layer Dataset"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
