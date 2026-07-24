"use client";

import { useState } from "react";

export type DrawingToolType = "point" | "line" | "rectangle" | "circle" | "polygon" | "freehand" | null;

interface DrawingToolbarProps {
  activeTool: DrawingToolType;
  onSelectTool: (tool: DrawingToolType) => void;
  onClearDrawings: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const DRAWING_TOOLS: { id: DrawingToolType; label: string; icon: string; tooltip: string }[] = [
  { id: "point", label: "Point", icon: "location_on", tooltip: "Place point coordinate landmark" },
  { id: "line", label: "Line", icon: "polyline", tooltip: "Draw linear distance path" },
  { id: "rectangle", label: "Rectangle", icon: "rectangle", tooltip: "Draw bounding box AOI" },
  { id: "circle", label: "Circle", icon: "radio_button_unchecked", tooltip: "Draw radial buffer circle" },
  { id: "polygon", label: "Polygon", icon: "pentagon", tooltip: "Draw custom multi-vertex boundary" },
  { id: "freehand", label: "Freehand", icon: "draw", tooltip: "Sketch freehand perimeter" },
];

export function DrawingToolbar({
  activeTool,
  onSelectTool,
  onClearDrawings,
  isOpen,
  onClose,
}: DrawingToolbarProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[100px] left-4 z-30 bg-[var(--bg-surface-elevated)] backdrop-blur-xl rounded-xl shadow-2xl border border-[var(--border-subtle)] p-3 text-[var(--text-main)] space-y-2 animate-in fade-in duration-150 w-72">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
          <span className="material-symbols-outlined text-[16px]">edit_location</span>
          <span>Vector Drawing Tools</span>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-0.5 rounded hover:bg-[var(--bg-surface-hover)]"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {DRAWING_TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(isActive ? null : tool.id)}
              className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all duration-150 ${
                isActive
                  ? "bg-teal-500/20 border-teal-500/50 text-teal-300 font-bold shadow-xs"
                  : "bg-[var(--bg-surface)]/60 border-[var(--border-subtle)] text-[var(--text-main)] hover:border-teal-500/30 hover:bg-[var(--bg-surface-hover)]"
              }`}
              title={tool.tooltip}
            >
              <span className="material-symbols-outlined text-[18px] shrink-0">{tool.icon}</span>
              <span className="text-xs font-semibold truncate">{tool.label}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-1 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <span className="text-[10px] text-[var(--text-muted)] font-mono">
          {activeTool ? `Active: ${activeTool.toUpperCase()}` : "Select a tool to digitize"}
        </span>
        <button
          onClick={onClearDrawings}
          className="flex items-center gap-1 px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-md text-[11px] font-bold transition"
        >
          <span className="material-symbols-outlined text-[14px]">delete</span>
          Clear
        </button>
      </div>
    </div>
  );
}
