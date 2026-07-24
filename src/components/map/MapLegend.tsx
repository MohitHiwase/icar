"use client";

import { useState } from "react";

interface LegendItem {
  label: string;
  color: string;
  desc: string;
}

const LEGEND_ITEMS: LegendItem[] = [
  { label: "Vegetation (High NDVI)", color: "bg-emerald-500", desc: "Healthy dense canopy" },
  { label: "Water Bodies", color: "bg-blue-500", desc: "Lakes, rivers & irrigation" },
  { label: "Agricultural Plots", color: "bg-amber-400", desc: "Active cultivated crops" },
  { label: "Bare Soil & Fallow", color: "bg-amber-800", desc: "Unplanted cropland" },
  { label: "Cloud Detection", color: "bg-red-500", desc: "Atmospheric cloud mask" },
  { label: "Administrative Boundary", color: "bg-slate-300", desc: "District & state borders" },
];

export function MapLegend() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="absolute bottom-16 right-6 z-20 bg-[var(--bg-surface-elevated)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-xl shadow-2xl text-[var(--text-main)] transition-all duration-200 w-64">
      <div
        onClick={() => setIsCollapsed((p) => !p)}
        className="flex items-center justify-between p-3 cursor-pointer select-none hover:bg-[var(--bg-surface-hover)] rounded-xl"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <span className="material-symbols-outlined text-[16px]">palette</span>
          <span>Spatial Symbology Legend</span>
        </div>
        <span className="material-symbols-outlined text-[16px] text-[var(--text-muted)] transition-transform duration-200">
          {isCollapsed ? "expand_less" : "expand_more"}
        </span>
      </div>

      {!isCollapsed && (
        <div className="px-3 pb-3 space-y-2 border-t border-[var(--border-subtle)] pt-2 animate-in fade-in duration-150">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-xs">
              <span className={`w-3.5 h-3.5 rounded-sm ${item.color} shrink-0 border border-black/20 shadow-xs`} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[11.5px] truncate text-[var(--text-main)]">{item.label}</p>
                <p className="text-[9.5px] text-[var(--text-muted)] truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
