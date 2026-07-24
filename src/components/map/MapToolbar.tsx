"use client";

import { useState } from "react";

interface MapToolbarProps {
  onHome: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCamera: () => void;
  onLocateDataset: () => void;
  onToggleLayerPanel: () => void;
  isLayerPanelOpen: boolean;
  onToggleBasemap: () => void;
  isBasemapOpen: boolean;
  onToggleDraw: () => void;
  isDrawOpen: boolean;
  onToggleMeasure: () => void;
  isMeasureOpen: boolean;
  onToggleCompare: () => void;
  isCompareOpen: boolean;
  onToggleTime: () => void;
  isTimeOpen: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function MapToolbar({
  onHome,
  onZoomIn,
  onZoomOut,
  onResetCamera,
  onLocateDataset,
  onToggleLayerPanel,
  isLayerPanelOpen,
  onToggleBasemap,
  isBasemapOpen,
  onToggleDraw,
  isDrawOpen,
  onToggleMeasure,
  isMeasureOpen,
  onToggleCompare,
  isCompareOpen,
  onToggleTime,
  isTimeOpen,
  searchQuery,
  onSearchChange,
}: MapToolbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="absolute top-[42px] left-0 right-0 z-20 px-4 pointer-events-none">
      {/* Single Cohesive Enterprise Control Strip */}
      <div className="pointer-events-auto bg-[var(--bg-surface-elevated)]/95 backdrop-blur-xl border border-[var(--border-subtle)] p-1.5 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-main)]">
        
        {/* Left Section: Integrated Search Bar */}
        <div className="relative min-w-[240px] max-w-sm flex-1">
          <div className="flex items-center gap-2 bg-[var(--bg-surface)]/80 focus-within:bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus-within:border-emerald-500/60 rounded-xl px-3 py-1.5 text-xs text-[var(--text-main)] transition-all">
            <span className="material-symbols-outlined text-[17px] text-emerald-400 shrink-0">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search districts, datasets, coordinates..."
              className="bg-transparent border-none outline-none w-full text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-0.5"
              >
                <span className="material-symbols-outlined text-[15px]">close</span>
              </button>
            )}
          </div>

          {/* Search Quick Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-surface-elevated)]/98 backdrop-blur-xl border border-[var(--border-subtle)] rounded-xl shadow-2xl p-2 text-xs space-y-1 z-40 animate-in fade-in duration-150">
              <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold text-[var(--text-faint)] uppercase">
                Spatial Search Suggestions
              </div>
              <div className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-hover)] cursor-pointer flex items-center justify-between">
                <span className="font-semibold text-emerald-400">Karnal District Boundary</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">District</span>
              </div>
              <div className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-hover)] cursor-pointer flex items-center justify-between">
                <span className="font-semibold text-teal-400">Iowa River Farm Field #12</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Boundary</span>
              </div>
              <div className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-hover)] cursor-pointer flex items-center justify-between">
                <span className="font-semibold text-cyan-400">29.9832° N, 76.9912° E</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Coordinates</span>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-5 w-px bg-[var(--border-subtle)] hidden md:block" />

        {/* Right Section: GIS Workspace Tools */}
        <div className="flex flex-wrap items-center gap-1.5">
          
          {/* Visualization Group */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleBasemap}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold ${
                isBasemapOpen
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
              }`}
              title="Basemap Selector"
            >
              <span className="material-symbols-outlined text-[18px]">public</span>
              <span className="hidden sm:inline">Basemap</span>
            </button>

            <button
              onClick={onToggleLayerPanel}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold ${
                isLayerPanelOpen
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
              }`}
              title="Layers Manager"
            >
              <span className="material-symbols-outlined text-[18px]">layers</span>
              <span className="hidden sm:inline">Layers</span>
            </button>
          </div>

          <div className="h-4 w-px bg-[var(--border-subtle)]" />

          {/* Digitizing & Analysis Group */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleDraw}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold ${
                isDrawOpen
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
              }`}
              title="Drawing Tools"
            >
              <span className="material-symbols-outlined text-[18px]">draw</span>
              <span className="hidden sm:inline">Draw</span>
            </button>

            <button
              onClick={onToggleMeasure}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold ${
                isMeasureOpen
                  ? "bg-cyan-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
              }`}
              title="Measurement Tools"
            >
              <span className="material-symbols-outlined text-[18px]">ruler</span>
              <span className="hidden sm:inline">Measure</span>
            </button>

            <button
              onClick={onToggleCompare}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold ${
                isCompareOpen
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
              }`}
              title="Split-View Spatial Comparison"
            >
              <span className="material-symbols-outlined text-[18px]">compare</span>
              <span className="hidden sm:inline">Compare</span>
            </button>

            <button
              onClick={onToggleTime}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold ${
                isTimeOpen
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
              }`}
              title="Temporal Timeline Control"
            >
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span className="hidden sm:inline">Time</span>
            </button>
          </div>

          <div className="h-4 w-px bg-[var(--border-subtle)]" />

          {/* Navigation & Camera Group */}
          <div className="flex items-center gap-1">
            <button
              onClick={onZoomIn}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>

            <button
              onClick={onZoomOut}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>

            <button
              onClick={onResetCamera}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
              title="Reset Camera Orientation"
            >
              <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
            </button>

            <button
              onClick={onHome}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
              title="Home Globe View"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
            </button>
          </div>

          <div className="h-4 w-px bg-[var(--border-subtle)]" />

          {/* Export Action */}
          <button
            onClick={() => alert("Spatial data export queued (GeoJSON / GeoTIFF)")}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition shadow-xs"
            title="Export Spatial Data"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="hidden xl:inline">Export</span>
          </button>

        </div>
      </div>
    </div>
  );
}
