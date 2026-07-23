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
    <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-white/70">
      {/* Layer Panel Toggle */}
      <button
        onClick={onToggleLayerPanel}
        className={`w-10 h-10 flex items-center justify-center rounded-xl transition ${
          isLayerPanelOpen
            ? "bg-primary text-white shadow-xs"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
        }`}
        title="Toggle Layer Panel"
      >
        <span className="material-symbols-outlined text-[20px]">layers</span>
      </button>

      <div className="h-px bg-outline-variant/30 my-0.5" />

      {/* Home */}
      <button
        onClick={onHome}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition"
        title="Home View"
      >
        <span className="material-symbols-outlined text-[20px]">home</span>
      </button>

      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition"
        title="Zoom In"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
      </button>

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition"
        title="Zoom Out"
      >
        <span className="material-symbols-outlined text-[20px]">remove</span>
      </button>

      {/* Reset Camera */}
      <button
        onClick={onResetCamera}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition"
        title="Reset Camera"
      >
        <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
      </button>

      {/* Locate Dataset */}
      <button
        onClick={onLocateDataset}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition"
        title="Locate Visualized Layer"
      >
        <span className="material-symbols-outlined text-[20px]">my_location</span>
      </button>

      <div className="h-px bg-outline-variant/30 my-0.5" />

      {/* Future Tool Placeholders (Disabled) */}
      <button
        disabled
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant/40 cursor-not-allowed"
        title="Measure Distance (Future Tool)"
      >
        <span className="material-symbols-outlined text-[20px]">square_foot</span>
      </button>

      <button
        disabled
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant/40 cursor-not-allowed"
        title="Draw AOI (Future Tool)"
      >
        <span className="material-symbols-outlined text-[20px]">draw</span>
      </button>

      <button
        disabled
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant/40 cursor-not-allowed"
        title="Feature Selection (Future Tool)"
      >
        <span className="material-symbols-outlined text-[20px]">gesture</span>
      </button>

      <button
        disabled
        className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant/40 cursor-not-allowed"
        title="AI Spatial Analysis (Future Tool)"
      >
        <span className="material-symbols-outlined text-[20px]">analytics</span>
      </button>
    </div>
  );
}
