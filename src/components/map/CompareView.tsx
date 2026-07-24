"use client";

import { useState } from "react";

interface CompareViewProps {
  isActive: boolean;
  onClose: () => void;
}

export function CompareView({ isActive, onClose }: CompareViewProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [comparePreset, setComparePreset] = useState<"cloud" | "crop" | "seasonal" | "flood">("crop");

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-15 pointer-events-none flex flex-col justify-between p-6">
      {/* Compare Mode Header Badge */}
      <div className="pointer-events-auto self-center bg-[var(--bg-surface-elevated)] backdrop-blur-xl border border-[var(--border-subtle)] px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span className="material-symbols-outlined text-[18px]">compare</span>
          <span>Spatial Compare Mode</span>
        </div>

        <div className="h-4 w-px bg-[var(--border-subtle)]" />

        {/* Preset Selector */}
        <div className="flex items-center gap-1">
          {(
            [
              { id: "crop", label: "Crop Growth" },
              { id: "cloud", label: "Cloud Removal" },
              { id: "seasonal", label: "Seasonal Shift" },
              { id: "flood", label: "Flood Inundation" },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              onClick={() => setComparePreset(p.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                comparePreset === p.id
                  ? "bg-emerald-500 text-white font-bold shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition"
          title="Exit Compare Mode"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Split Overlay Screen Divider */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none flex items-center justify-between">
        {/* Left Label */}
        <div className="pointer-events-auto ml-8 bg-[var(--bg-surface-elevated)]/90 backdrop-blur-md border border-[var(--border-subtle)] px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-emerald-400 shadow-lg">
          BEFORE • Sentinel-2 (May 2026)
        </div>

        {/* Vertical Split Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] pointer-events-auto flex items-center justify-center cursor-ew-resize group"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl border-2 border-white text-xs font-bold group-hover:scale-110 transition-transform">
            ↔
          </div>
        </div>

        {/* Right Label */}
        <div className="pointer-events-auto mr-8 bg-[var(--bg-surface-elevated)]/90 backdrop-blur-md border border-[var(--border-subtle)] px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-cyan-400 shadow-lg">
          AFTER • Sentinel-2 (July 2026)
        </div>
      </div>

      {/* Interactive Range Slider (Hidden Overlay for Dragging) */}
      <input
        type="range"
        min="5"
        max="95"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="pointer-events-auto absolute inset-x-12 bottom-20 opacity-0 cursor-ew-resize h-12"
      />
    </div>
  );
}
