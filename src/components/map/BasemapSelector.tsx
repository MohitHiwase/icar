"use client";

import { useState } from "react";

export type BasemapType = "satellite" | "terrain" | "streets" | "hybrid" | "light" | "dark";

interface BasemapSelectorProps {
  currentBasemap: BasemapType;
  onSelectBasemap: (basemap: BasemapType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const BASEMAP_OPTIONS: { id: BasemapType; label: string; icon: string; desc: string }[] = [
  { id: "satellite", label: "Satellite", icon: "satellite_alt", desc: "High-resolution optical satellite imagery" },
  { id: "terrain", label: "Terrain", icon: "terrain", desc: "3D topographic elevation & hillshade" },
  { id: "streets", label: "Streets", icon: "map", desc: "Vector road networks & transportation" },
  { id: "hybrid", label: "Hybrid", icon: "layers", desc: "Satellite with road & administrative overlays" },
  { id: "light", label: "Light", icon: "light_mode", desc: "Minimal high-contrast light cartography" },
  { id: "dark", label: "Dark", icon: "dark_mode", desc: "Enterprise dark theme spatial background" },
];

export function BasemapSelector({
  currentBasemap,
  onSelectBasemap,
  isOpen,
  onClose,
}: BasemapSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[100px] left-4 z-30 w-72 bg-[var(--bg-surface-elevated)] backdrop-blur-xl rounded-xl shadow-2xl border border-[var(--border-subtle)] p-3 text-[var(--text-main)] space-y-2 animate-in fade-in duration-150">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
          <span className="material-symbols-outlined text-[16px]">public</span>
          <span>Select Basemap</span>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-0.5 rounded hover:bg-[var(--bg-surface-hover)]"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-0.5">
        {BASEMAP_OPTIONS.map((option) => {
          const isActive = currentBasemap === option.id;
          return (
            <button
              key={option.id}
              onClick={() => {
                onSelectBasemap(option.id);
                onClose();
              }}
              className={`flex flex-col items-start gap-1 p-2.5 rounded-lg border text-left transition-all duration-150 group ${
                isActive
                  ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400 shadow-xs"
                  : "bg-[var(--bg-surface)]/60 border-[var(--border-subtle)] hover:border-emerald-500/30 hover:bg-[var(--bg-surface-hover)]"
              }`}
            >
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                  {option.icon}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>
              <span className="text-xs font-bold text-[var(--text-main)]">{option.label}</span>
              <span className="text-[10px] text-[var(--text-muted)] leading-tight line-clamp-2">
                {option.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
