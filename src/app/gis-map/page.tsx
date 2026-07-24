'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { mapApi, datasetsApi, MapDatasetItem, ApiError } from '@/lib/api';
import { DashboardMapRef } from '@/components/DashboardMap';
import { LayerPanel } from '@/components/map/LayerPanel';
import { MapToolbar } from '@/components/map/MapToolbar';
import { CoordinateDisplay } from '@/components/map/CoordinateDisplay';
import { FeatureInspector, GeoJsonFeatureData } from '@/components/map/FeatureInspector';
import { LoadingOverlay } from '@/components/map/LoadingOverlay';
import { BasemapSelector, BasemapType } from '@/components/map/BasemapSelector';
import { DrawingToolbar, DrawingToolType } from '@/components/map/DrawingToolbar';
import { MeasurementTools, MeasureToolType } from '@/components/map/MeasurementTools';
import { CompareView } from '@/components/map/CompareView';
import { TimeTimeline } from '@/components/map/TimeTimeline';
import { MapLegend } from '@/components/map/MapLegend';

// Dynamically import DashboardMap with ssr: false as Cesium requires window
const DashboardMap = dynamic(() => import('@/components/DashboardMap'), {
  ssr: false,
  loading: () => <LoadingOverlay message="Initializing Cesium 3D Globe..." />,
});

export default function GisMapPage() {
  const mapRef = useRef<DashboardMapRef>(null);

  const [layers, setLayers] = useState<MapDatasetItem[]>([]);
  const [visibleLayerIds, setVisibleLayerIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modular Overlay Panel States
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);
  const [isBasemapOpen, setIsBasemapOpen] = useState(false);
  const [currentBasemap, setCurrentBasemap] = useState<BasemapType>('satellite');
  
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const [activeDrawTool, setActiveDrawTool] = useState<DrawingToolType>(null);
  
  const [isMeasureOpen, setIsMeasureOpen] = useState(false);
  const [activeMeasureTool, setActiveMeasureTool] = useState<MeasureToolType>(null);

  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<GeoJsonFeatureData | null>(null);
  const [mouseCoords, setMouseCoords] = useState<{
    lat: number | null;
    lng: number | null;
    alt: number | null;
  }>({ lat: null, lng: null, alt: null });

  // Fetch visualizable map datasets from Map API
  const fetchMapDatasets = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await mapApi.getDatasets();
      setLayers(res.datasets);
      // Default all loaded map layers to visible
      const initialVisible = new Set(res.datasets.map((d) => d.id));
      setVisibleLayerIds(initialVisible);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load map datasets');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapDatasets();
  }, []);

  // Layer visibility toggle
  const handleToggleVisibility = (id: string) => {
    setVisibleLayerIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Zoom to layer
  const handleZoomToLayer = (id: string) => {
    if (mapRef.current) {
      mapRef.current.zoomToLayer(id);
    }
  };

  // Delete layer dataset using existing Dataset delete API
  const handleDeleteLayer = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this dataset?')) return;
    try {
      await datasetsApi.delete(id);
      setLayers((prev) => prev.filter((l) => l.id !== id));
      setVisibleLayerIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      if (selectedFeature?.datasetName === layers.find((l) => l.id === id)?.name) {
        setSelectedFeature(null);
      }
    } catch (err) {
      alert(err instanceof ApiError ? err.message : 'Failed to delete dataset');
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-72px)] bg-surface-dim overflow-hidden select-none">
      
      {/* 3D Cesium Map Viewer */}
      <DashboardMap
        ref={mapRef}
        layers={layers}
        visibleLayerIds={visibleLayerIds}
        onFeatureSelect={setSelectedFeature}
        onMouseMoveCoords={(lat, lng, alt) => setMouseCoords({ lat, lng, alt })}
      />

      {/* Loading Overlay */}
      {loading && <LoadingOverlay message="Initializing Cesium 3D Globe & Map Layers..." />}

      {/* Error Toast / Alert */}
      {error && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-error/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-2 font-bold hover:opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* Operational Header Workspace Sub-bar */}
      <div className="absolute top-0 left-0 right-0 z-25 bg-[var(--bg-surface-elevated)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] px-6 py-2 flex items-center justify-between text-xs text-[var(--text-main)]">
        <div className="flex items-center gap-2 font-mono font-bold">
          <span className="text-emerald-400">GIS Workspace</span>
          <span className="text-[var(--text-faint)]">•</span>
          <span className="text-[var(--text-muted)] font-sans">Cesium 3D Spatial Intelligence Engine</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10.5px]">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
            🟢 Live Session
          </span>
        </div>
      </div>

      {/* Clean Grouped GIS Workspace Toolbar & Search */}
      <MapToolbar
        onHome={() => mapRef.current?.home()}
        onZoomIn={() => mapRef.current?.zoomIn()}
        onZoomOut={() => mapRef.current?.zoomOut()}
        onResetCamera={() => mapRef.current?.resetCamera()}
        onLocateDataset={() => mapRef.current?.zoomToActiveLayers()}
        onToggleLayerPanel={() => {
          setIsLayerPanelOpen((prev) => !prev);
          setIsBasemapOpen(false);
          setIsDrawOpen(false);
          setIsMeasureOpen(false);
        }}
        isLayerPanelOpen={isLayerPanelOpen}
        onToggleBasemap={() => {
          setIsBasemapOpen((prev) => !prev);
          setIsLayerPanelOpen(false);
          setIsDrawOpen(false);
          setIsMeasureOpen(false);
        }}
        isBasemapOpen={isBasemapOpen}
        onToggleDraw={() => {
          setIsDrawOpen((prev) => !prev);
          setIsLayerPanelOpen(false);
          setIsBasemapOpen(false);
          setIsMeasureOpen(false);
        }}
        isDrawOpen={isDrawOpen}
        onToggleMeasure={() => {
          setIsMeasureOpen((prev) => !prev);
          setIsLayerPanelOpen(false);
          setIsBasemapOpen(false);
          setIsDrawOpen(false);
        }}
        isMeasureOpen={isMeasureOpen}
        onToggleCompare={() => setIsCompareOpen((prev) => !prev)}
        isCompareOpen={isCompareOpen}
        onToggleTime={() => setIsTimeOpen((prev) => !prev)}
        isTimeOpen={isTimeOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Basemap Selector Dropdown Overlay */}
      <BasemapSelector
        currentBasemap={currentBasemap}
        onSelectBasemap={setCurrentBasemap}
        isOpen={isBasemapOpen}
        onClose={() => setIsBasemapOpen(false)}
      />

      {/* Drawing Tools Palette */}
      <DrawingToolbar
        activeTool={activeDrawTool}
        onSelectTool={setActiveDrawTool}
        onClearDrawings={() => setActiveDrawTool(null)}
        isOpen={isDrawOpen}
        onClose={() => setIsDrawOpen(false)}
      />

      {/* Spatial Measurement Tools Palette */}
      <MeasurementTools
        activeTool={activeMeasureTool}
        onSelectTool={setActiveMeasureTool}
        isOpen={isMeasureOpen}
        onClose={() => setIsMeasureOpen(false)}
      />

      {/* Split-View Spatial Comparison Overlay */}
      <CompareView
        isActive={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Temporal Timeline Control Slider */}
      <TimeTimeline
        isOpen={isTimeOpen}
        onClose={() => setIsTimeOpen(false)}
      />

      {/* Floating Layer Manager Panel */}
      <LayerPanel
        layers={layers}
        visibleLayerIds={visibleLayerIds}
        onToggleVisibility={handleToggleVisibility}
        onZoomToLayer={handleZoomToLayer}
        onDeleteLayer={handleDeleteLayer}
        isOpen={isLayerPanelOpen}
        onClose={() => setIsLayerPanelOpen(false)}
      />

      {/* Collapsible Symbology Legend */}
      <MapLegend />

      {/* Right Side Feature Inspector Panel */}
      <FeatureInspector
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />

      {/* Enterprise GIS Status Bar Telemetry */}
      <CoordinateDisplay
        latitude={mouseCoords.lat}
        longitude={mouseCoords.lng}
        altitude={mouseCoords.alt}
        activeBasemap={currentBasemap}
        activeLayerCount={visibleLayerIds.size || 4}
        selectedFeatureName={selectedFeature?.datasetName}
      />

    </div>
  );
}
