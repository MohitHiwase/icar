"use client";

export type MeasureToolType = "distance" | "area" | "elevation" | "picker" | null;

interface MeasurementToolsProps {
  activeTool: MeasureToolType;
  onSelectTool: (tool: MeasureToolType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MEASURE_TOOLS: { id: MeasureToolType; label: string; icon: string; desc: string }[] = [
  { id: "distance", label: "Measure Distance", icon: "square_foot", desc: "Polyline geodesic length calculation" },
  { id: "area", label: "Measure Area", icon: "straighten", desc: "Enclosed polygon area & perimeter" },
  { id: "elevation", label: "Elevation Profile", icon: "show_chart", desc: "Terrain cross-section elevation sampling" },
  { id: "picker", label: "Coordinate Picker", icon: "pin_drop", desc: "Inspect WGS84 & UTM coordinates" },
];

export function MeasurementTools({
  activeTool,
  onSelectTool,
  isOpen,
  onClose,
}: MeasurementToolsProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[100px] left-4 z-30 bg-[var(--bg-surface-elevated)] backdrop-blur-xl rounded-xl shadow-2xl border border-[var(--border-subtle)] p-3 text-[var(--text-main)] space-y-2 animate-in fade-in duration-150 w-72">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
          <span className="material-symbols-outlined text-[16px]">ruler</span>
          <span>Spatial Measurement Tools</span>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-0.5 rounded hover:bg-[var(--bg-surface-hover)]"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      <div className="space-y-1.5">
        {MEASURE_TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(isActive ? null : tool.id)}
              className={`flex items-start gap-2.5 p-2 rounded-lg border text-left w-full transition-all duration-150 ${
                isActive
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-xs"
                  : "bg-[var(--bg-surface)]/60 border-[var(--border-subtle)] text-[var(--text-main)] hover:border-cyan-500/30 hover:bg-[var(--bg-surface-hover)]"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-cyan-400 shrink-0 mt-0.5">{tool.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold">{tool.label}</p>
                <p className="text-[10px] text-[var(--text-muted)] leading-tight">{tool.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10.5px] font-mono text-[var(--text-faint)]">
        <span>Units: Meters / Hectares</span>
        <span className="text-cyan-400">EPSG:4326</span>
      </div>
    </div>
  );
}
