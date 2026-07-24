"use client";

import { useState } from "react";

interface TimeTimelineProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIMELINE_MONTHS = [
  { month: "Jan 2026", label: "Baseline Ingest", cloudCover: "2.1%" },
  { month: "Feb 2026", label: "Sowing Stage", cloudCover: "4.8%" },
  { month: "Mar 2026", label: "Vegetative Growth", cloudCover: "1.2%" },
  { month: "Apr 2026", label: "Peak Canopy NDVI", cloudCover: "0.5%" },
  { month: "May 2026", label: "Maturation Phase", cloudCover: "3.4%" },
  { month: "Jun 2026", label: "Harvest Telemetry", cloudCover: "5.1%" },
];

export function TimeTimeline({ isOpen, onClose }: TimeTimelineProps) {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const current = TIMELINE_MONTHS[selectedIndex];

  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 bg-[var(--bg-surface-elevated)] backdrop-blur-xl border border-[var(--border-subtle)] p-4 rounded-2xl shadow-2xl w-[640px] text-[var(--text-main)] space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
          <span className="material-symbols-outlined text-[18px]">schedule</span>
          <span>Temporal Imagery Timeline</span>
          <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20 font-semibold">
            Sentinel-2 L2A Time Series
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
            {isPlaying ? "Pause" : "Play Sequence"}
          </button>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded-lg hover:bg-[var(--bg-surface-hover)]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {/* Timeline Slider Track */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300">
          <span>{current.month}</span>
          <span className="text-[11px] text-[var(--text-muted)] font-sans">{current.label} • Cloud Cover: {current.cloudCover}</span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {TIMELINE_MONTHS.map((item, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={item.month}
                onClick={() => setSelectedIndex(idx)}
                className={`p-2 rounded-xl border text-center transition-all duration-150 flex flex-col items-center gap-1 ${
                  isActive
                    ? "bg-purple-500/20 border-purple-500/60 text-purple-300 font-bold shadow-md scale-105"
                    : "bg-[var(--bg-surface)]/60 border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
                }`}
              >
                <span className="text-[11px] font-mono font-semibold">{item.month.split(" ")[0]}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-60" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
