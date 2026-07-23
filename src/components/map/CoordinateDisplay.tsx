"use client";

interface CoordinateDisplayProps {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
}

export function CoordinateDisplay({
  latitude,
  longitude,
  altitude,
}: CoordinateDisplayProps) {
  const formatCoord = (val: number | null) => (val !== null ? val.toFixed(5) : "—");

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
      <div className="bg-[var(--bg-surface)]/90 backdrop-blur-md px-5 py-2 rounded-xl shadow-lg border border-[var(--border-subtle)] flex items-center gap-5 text-xs text-[var(--text-main)]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-emerald-500 text-[16px]">location_on</span>
          <span className="font-semibold text-[var(--text-muted)] text-[11px]">Cursor Coords:</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold">
          <div>
            <span className="text-[10px] text-[var(--text-muted)] font-normal mr-1">LAT:</span>
            <span>{formatCoord(latitude)}°</span>
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] font-normal mr-1">LNG:</span>
            <span>{formatCoord(longitude)}°</span>
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] font-normal mr-1">ALT:</span>
            <span>{altitude !== null ? `${Math.round(altitude)} m` : "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
