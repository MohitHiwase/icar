"use client";

import { useState } from "react";

export interface GeoJsonFeatureData {
  datasetName: string;
  geometryType: string;
  properties: Record<string, any>;
  coordinates?: string;
}

interface FeatureInspectorProps {
  feature: GeoJsonFeatureData | null;
  onClose: () => void;
  isOpen?: boolean;
  onToggleOpen?: () => void;
}

export function FeatureInspector({
  feature,
  onClose,
  isOpen = true,
  onToggleOpen,
}: FeatureInspectorProps) {
  const [showDemoFeature, setShowDemoFeature] = useState(false);

  if (!isOpen) return null;

  const current = feature || (showDemoFeature ? {
    datasetName: "Karnal Research Plot #AR-9022",
    geometryType: "Polygon (450 Acres)",
    coordinates: "29.9832° N, 76.9912° E",
    properties: {
      "District": "Karnal",
      "State": "Haryana",
      "Soil Type": "Alluvial Loam",
      "Target Crop": "Wheat (PBW-550)",
      "Elevation": "252 m MSL",
      "Mean NDVI": "0.78 (Healthy)",
      "Soil Moisture": "32% Volumetric",
      "Associated Dataset": "Sentinel-2 L2A Tile IN-HR-12",
      "Analysis Status": "Yield Stress Model Executed",
    }
  } : null);

  return (
    <div className="absolute right-4 top-[100px] w-88 z-20 space-y-3 animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="bg-[var(--bg-surface-elevated)] backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden text-[var(--text-main)]">
        
        {/* Drawer Header */}
        <div className="bg-emerald-600/90 backdrop-blur-md px-4 py-3 flex items-center justify-between text-white border-b border-emerald-500/30">
          <div className="flex items-center gap-2 font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">readiness_score</span>
            <span>Feature Inspector</span>
          </div>
          <div className="flex items-center gap-1.5">
            {!feature && (
              <button
                onClick={() => setShowDemoFeature((p) => !p)}
                className="text-[10px] font-mono bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded font-semibold transition"
                title="Preview Sample Feature"
              >
                {showDemoFeature ? "Clear Preview" : "Sample Feature"}
              </button>
            )}
            <button onClick={onClose} className="hover:opacity-80 transition p-1">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        {!current ? (
          /* Empty State Guidance */
          <div className="p-5 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">touch_app</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-[var(--text-main)]">No geographic feature selected.</p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Click a district, field, polygon, or spatial feature on the globe to inspect its attributes, area, elevation, and metadata.
              </p>
            </div>
          </div>
        ) : (
          /* Detailed Attribute Metadata */
          <div className="p-4 space-y-3 max-h-[460px] overflow-y-auto text-xs">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-mono font-bold tracking-wider">
                Feature Name
              </span>
              <p className="font-bold text-[var(--text-main)] text-sm mt-0.5">{current.datasetName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border-subtle)]">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-mono font-bold tracking-wider">
                  Geometry
                </span>
                <p className="font-semibold text-emerald-400 mt-0.5">{current.geometryType || "Polygon"}</p>
              </div>
              {current.coordinates && (
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-mono font-bold tracking-wider">
                    Coordinates
                  </span>
                  <p className="font-mono text-[11px] text-[var(--text-main)] mt-0.5 truncate">{current.coordinates}</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-mono font-bold tracking-wider">
                Attribute & Metadata Inspection
              </span>
              
              <div className="space-y-1.5 bg-[var(--bg-surface)] p-3 rounded-xl border border-[var(--border-subtle)] font-mono text-[11px]">
                {Object.entries(current.properties || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)]/50 pb-1 last:border-none last:pb-0">
                    <span className="text-[var(--text-muted)]">{key}:</span>
                    <span className="font-bold text-emerald-400 truncate max-w-[160px]">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
