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
      <div className="bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-xl border border-white/70 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
          <span className="font-semibold text-on-surface-variant">Cursor Coords:</span>
        </div>
        <div className="flex items-center gap-4 font-mono font-bold text-on-surface">
          <div>
            <span className="text-[10px] text-on-surface-variant font-normal mr-1">LAT:</span>
            <span>{formatCoord(latitude)}°</span>
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-normal mr-1">LNG:</span>
            <span>{formatCoord(longitude)}°</span>
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-normal mr-1">ALT:</span>
            <span>{altitude !== null ? `${Math.round(altitude)} m` : "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
