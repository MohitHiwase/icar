"use client";

import { useState } from "react";
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
  const [opacity, setOpacity] = useState(100);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      className={`p-3 rounded-xl border transition-all ${
        isVisible
          ? "bg-emerald-500/10 border-emerald-500/35 text-[var(--text-main)] shadow-xs"
          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            onClick={() => onToggleVisibility(layer.id)}
            className={`p-1.5 rounded-lg transition ${
              isVisible ? "text-emerald-400 bg-emerald-500/20" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
            title={isVisible ? "Hide Layer" : "Show Layer"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isVisible ? "visibility" : "visibility_off"}
            </span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-xs text-[var(--text-main)] truncate">{layer.name}</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/15 text-emerald-400 text-[9.5px] font-mono font-bold rounded uppercase border border-emerald-500/20">
                {layer.fileFormat}
              </span>
              <span className="px-1.5 py-0.2 bg-blue-500/15 text-blue-400 text-[9.5px] font-mono font-bold rounded border border-blue-500/20">
                Raster / Vector
              </span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
              {layer.uploader?.name || "GeoVision Intelligence Node"} • {new Date(layer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setShowSettings((p) => !p)}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
            title="Layer Settings & Opacity"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
          <button
            onClick={() => onZoomTo(layer.id)}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-emerald-400 hover:bg-emerald-500/10 transition"
            title="Zoom to Extent"
          >
            <span className="material-symbols-outlined text-[16px]">my_location</span>
          </button>
          <button
            onClick={() => onDelete(layer.id)}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-rose-400 hover:bg-rose-500/10 transition"
            title="Delete Layer Dataset"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>

      {/* Layer Opacity & Settings Controls */}
      {showSettings && (
        <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-[10.5px] font-mono">
            <span className="text-[var(--text-muted)]">Layer Opacity</span>
            <span className="font-bold text-emerald-400">{opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1 bg-[var(--border-subtle)] rounded-lg cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
