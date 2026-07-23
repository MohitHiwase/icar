"use client";

export interface GeoJsonFeatureData {
  datasetName: string;
  geometryType: string;
  properties: Record<string, any>;
  coordinates?: string;
}

interface FeatureInspectorProps {
  feature: GeoJsonFeatureData | null;
  onClose: () => void;
}

export function FeatureInspector({ feature, onClose }: FeatureInspectorProps) {
  if (!feature) return null;

  return (
    <div className="absolute right-20 top-6 w-96 z-30 animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/70 overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-5 py-3.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">info</span>
            <span>Feature Inspector (GeoJSON)</span>
          </div>
          <button onClick={onClose} className="hover:opacity-80 transition">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[450px] overflow-y-auto text-xs">
          <div>
            <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
              Layer Dataset
            </span>
            <p className="font-bold text-on-surface text-sm mt-0.5">{feature.datasetName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-outline-variant/30">
            <div>
              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                Geometry Type
              </span>
              <p className="font-semibold text-primary mt-0.5">{feature.geometryType || "Feature"}</p>
            </div>
            {feature.coordinates && (
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                  Coordinates
                </span>
                <p className="font-mono text-[11px] text-on-surface mt-0.5 truncate">{feature.coordinates}</p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-outline-variant/30">
            <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
              Properties Metadata
            </span>
            {Object.keys(feature.properties || {}).length === 0 ? (
              <p className="text-on-surface-variant italic mt-1">No feature properties present.</p>
            ) : (
              <div className="mt-2 space-y-1.5 bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                {Object.entries(feature.properties).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-2 text-xs">
                    <span className="font-medium text-on-surface-variant truncate">{key}:</span>
                    <span className="font-mono font-semibold text-on-surface truncate max-w-[180px]">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
