"use client";

interface CoordinateDisplayProps {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  activeBasemap?: string;
  activeLayerCount?: number;
  selectedFeatureName?: string | null;
}

export function CoordinateDisplay({
  latitude,
  longitude,
  altitude,
  activeBasemap = "Satellite",
  activeLayerCount = 4,
  selectedFeatureName = null,
}: CoordinateDisplayProps) {
  // Format coordinate values into DGS / WGS84 string
  const formatCoord = (val: number | null, isLat: boolean) => {
    if (val === null) return "--";
    const absolute = Math.abs(val);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    const cardinal = val >= 0 ? (isLat ? "N" : "E") : (isLat ? "S" : "W");
    return `${degrees}°${minutes}'${seconds}"${cardinal}`;
  };

  const latStr = formatCoord(latitude, true);
  const lngStr = formatCoord(longitude, false);
  const altStr = altitude !== null ? `${Math.round(altitude).toLocaleString()} m` : "1,420 m";

  return (
    <div className="absolute bottom-0 inset-x-0 z-20 bg-[var(--bg-surface-elevated)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] px-6 py-2 text-xs font-mono text-[var(--text-main)] flex flex-wrap items-center justify-between gap-4 shadow-2xl select-none">
      {/* Left Telemetry Group: Cursor & Elevation */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span className="material-symbols-outlined text-[16px]">location_searching</span>
          <span>
            {latitude !== null && longitude !== null
              ? `${latStr} ${lngStr}`
              : `29°58'32"N 76°59'12"E`}
          </span>
        </div>

        <div className="h-3.5 w-px bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
          <span className="material-symbols-outlined text-[15px]">height</span>
          <span>Altitude: <strong className="text-[var(--text-main)]">{altStr}</strong></span>
        </div>

        <div className="h-3.5 w-px bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
          <span className="material-symbols-outlined text-[15px]">zoom_in</span>
          <span>Zoom: <strong className="text-[var(--text-main)]">14.5x</strong></span>
        </div>
      </div>

      {/* Center Telemetry Group: Basemap, Layers, SRS */}
      <div className="hidden lg:flex items-center gap-5 text-[11px] text-[var(--text-muted)]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]">public</span>
          <span>Basemap: <strong className="text-emerald-400 font-bold uppercase">{activeBasemap}</strong></span>
        </div>

        <div className="h-3.5 w-px bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]">layers</span>
          <span>Layers: <strong className="text-teal-400 font-bold">{activeLayerCount} Active</strong></span>
        </div>

        <div className="h-3.5 w-px bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]">grid_4x4</span>
          <span>SRS: <strong className="text-[var(--text-main)] font-bold">EPSG:4326 WGS84</strong></span>
        </div>

        <div className="h-3.5 w-px bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]">straighten</span>
          <span>Scale: <strong className="text-[var(--text-main)] font-bold">1:25,000</strong></span>
        </div>
      </div>

      {/* Right Telemetry Group: Selection Status */}
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-emerald-400">info</span>
        <span className="text-[11px]">
          Status:{" "}
          <strong className="text-emerald-400 font-bold">
            {selectedFeatureName ? `1 Selected (${selectedFeatureName})` : "Ready (Click feature to inspect)"}
          </strong>
        </span>
      </div>
    </div>
  );
}
