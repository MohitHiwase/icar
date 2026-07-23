"use client";

interface MapToolbarProps {
  onHome: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCamera: () => void;
  onLocateDataset: () => void;
  onToggleLayerPanel: () => void;
  isLayerPanelOpen: boolean;
}

export function MapToolbar({
  onHome,
  onZoomIn,
  onZoomOut,
  onResetCamera,
  onLocateDataset,
  onToggleLayerPanel,
  isLayerPanelOpen,
}: MapToolbarProps) {
  return (
    <div className="absolute top-6 right-6 z-20 flex flex-col gap-1.5 bg-[var(--bg-surface)]/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-[var(--border-subtle)] text-[var(--text-main)]">
      {/* Layer Panel Toggle */}
      <button
        onClick={onToggleLayerPanel}
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition ${
          isLayerPanelOpen
            ? "bg-emerald-600 text-white shadow-xs"
            : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
        }`}
        title="Toggle Layer Panel"
      >
        <span className="material-symbols-outlined text-[18px]">layers</span>
      </button>

      <div className="h-px bg-[var(--border-subtle)] my-0.5" />

      {/* Home */}
      <button
        onClick={onHome}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
        title="Home View"
      >
        <span className="material-symbols-outlined text-[18px]">home</span>
      </button>

      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
        title="Zoom In"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
      </button>

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
        title="Zoom Out"
      >
        <span className="material-symbols-outlined text-[18px]">remove</span>
      </button>

      {/* Reset Camera */}
      <button
        onClick={onResetCamera}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
        title="Reset Camera"
      >
        <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
      </button>

      {/* Locate Dataset */}
      <button
        onClick={onLocateDataset}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition"
        title="Locate Visualized Layer"
      >
        <span className="material-symbols-outlined text-[18px]">my_location</span>
      </button>

      <div className="h-px bg-[var(--border-subtle)] my-0.5" />

      {/* Future Tool Placeholders (Disabled) */}
      <button
        disabled
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)]/40 cursor-not-allowed"
        title="Measure Distance (Future Tool)"
      >
        <span className="material-symbols-outlined text-[18px]">square_foot</span>
      </button>

      <button
        disabled
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)]/40 cursor-not-allowed"
        title="Draw AOI (Future Tool)"
      >
        <span className="material-symbols-outlined text-[18px]">draw</span>
      </button>

      <button
        disabled
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)]/40 cursor-not-allowed"
        title="Feature Selection (Future Tool)"
      >
        <span className="material-symbols-outlined text-[18px]">gesture</span>
      </button>

      <button
        disabled
        className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)]/40 cursor-not-allowed"
        title="AI Spatial Analysis (Future Tool)"
      >
        <span className="material-symbols-outlined text-[18px]">analytics</span>
      </button>
    </div>
  );
}
