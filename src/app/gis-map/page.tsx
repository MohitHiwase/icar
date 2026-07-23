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

  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(true);
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
      {loading && <LoadingOverlay message="Loading Map Layers..." />}

      {/* Error Toast / Alert */}
      {error && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-error/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-2 font-bold hover:opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* Floating Layer Panel */}
      <LayerPanel
        layers={layers}
        visibleLayerIds={visibleLayerIds}
        onToggleVisibility={handleToggleVisibility}
        onZoomToLayer={handleZoomToLayer}
        onDeleteLayer={handleDeleteLayer}
        isOpen={isLayerPanelOpen}
        onClose={() => setIsLayerPanelOpen(false)}
      />

      {/* Toolbar Controls */}
      <MapToolbar
        onHome={() => mapRef.current?.home()}
        onZoomIn={() => mapRef.current?.zoomIn()}
        onZoomOut={() => mapRef.current?.zoomOut()}
        onResetCamera={() => mapRef.current?.resetCamera()}
        onLocateDataset={() => mapRef.current?.zoomToActiveLayers()}
        onToggleLayerPanel={() => setIsLayerPanelOpen((prev) => !prev)}
        isLayerPanelOpen={isLayerPanelOpen}
      />

      {/* Feature Inspector Drawer (GeoJSON features) */}
      <FeatureInspector feature={selectedFeature} onClose={() => setSelectedFeature(null)} />

      {/* Live Mouse Coordinates Ticker */}
      <CoordinateDisplay
        latitude={mouseCoords.lat}
        longitude={mouseCoords.lng}
        altitude={mouseCoords.alt}
      />
    </div>
  );
}
