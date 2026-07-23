"use client";

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = "Loading GIS Map Layer..." }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 z-40 bg-black/20 backdrop-blur-xs flex items-center justify-center pointer-events-none">
      <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/70 flex items-center gap-3 animate-in fade-in zoom-in-95">
        <div className="w-6 h-6 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="text-xs font-semibold text-on-surface">{message}</span>
      </div>
    </div>
  );
}
