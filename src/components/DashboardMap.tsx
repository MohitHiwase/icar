'use client';

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Viewer,
  Cartesian3,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Math as CesiumMath,
  Cartographic,
  defined,
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { MapDatasetItem } from '@/lib/api';
import { LayerManager } from './map/LayerManager';
import { GeoJsonFeatureData } from './map/FeatureInspector';

if (typeof window !== 'undefined') {
  (window as any).CESIUM_BASE_URL = '/cesium';
}

export interface DashboardMapRef {
  home: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetCamera: () => void;
  zoomToLayer: (id: string) => Promise<void>;
  zoomToActiveLayers: () => void;
}

interface DashboardMapProps {
  layers?: MapDatasetItem[];
  visibleLayerIds?: Set<string>;
  onFeatureSelect?: (feature: GeoJsonFeatureData | null) => void;
  onMouseMoveCoords?: (lat: number | null, lng: number | null, alt: number | null) => void;
}

const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629, height: 4500000 };

const DashboardMap = forwardRef<DashboardMapRef, DashboardMapProps>(({
  layers = [],
  visibleLayerIds = new Set(),
  onFeatureSelect,
  onMouseMoveCoords,
}, ref) => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const layerManagerRef = useRef<LayerManager | null>(null);

  useImperativeHandle(ref, () => ({
    home: () => {
      if (viewerRef.current) {
        viewerRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(DEFAULT_CENTER.lng, DEFAULT_CENTER.lat, DEFAULT_CENTER.height),
          duration: 1.5,
        });
      }
    },
    zoomIn: () => {
      if (viewerRef.current) {
        viewerRef.current.camera.zoomIn(viewerRef.current.camera.positionCartographic.height * 0.4);
      }
    },
    zoomOut: () => {
      if (viewerRef.current) {
        viewerRef.current.camera.zoomOut(viewerRef.current.camera.positionCartographic.height * 0.4);
      }
    },
    resetCamera: () => {
      if (viewerRef.current) {
        viewerRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(DEFAULT_CENTER.lng, DEFAULT_CENTER.lat, DEFAULT_CENTER.height),
          duration: 1.0,
        });
      }
    },
    zoomToLayer: async (id: string) => {
      if (layerManagerRef.current) {
        await layerManagerRef.current.zoomToLayer(id);
      }
    },
    zoomToActiveLayers: () => {
      if (viewerRef.current && viewerRef.current.dataSources.length > 0) {
        const firstDs = viewerRef.current.dataSources.get(0);
        if (firstDs) {
          viewerRef.current.zoomTo(firstDs);
        }
      }
    },
  }));

  useEffect(() => {
    if (!cesiumContainer.current) return;

    // Initialize Cesium Viewer
    const viewer = new Viewer(cesiumContainer.current, {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      vrButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      scene3DOnly: true,
    });

    viewerRef.current = viewer;
    layerManagerRef.current = new LayerManager(viewer);

    // Initial camera position over India overview
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(DEFAULT_CENTER.lng, DEFAULT_CENTER.lat, DEFAULT_CENTER.height),
      duration: 0.0,
    });

    // Screen space event handler for pointer move (Coordinates) and click (Feature Inspector)
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    // Live mouse movement coordinates handler
    handler.setInputAction((movement: any) => {
      if (!onMouseMoveCoords) return;
      const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
      if (cartesian) {
        const cartographic = Cartographic.fromCartesian(cartesian);
        const lng = CesiumMath.toDegrees(cartographic.longitude);
        const lat = CesiumMath.toDegrees(cartographic.latitude);
        const alt = viewer.camera.positionCartographic.height;
        onMouseMoveCoords(lat, lng, alt);
      } else {
        onMouseMoveCoords(null, null, null);
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    // Click handler for picking GeoJSON features
    handler.setInputAction((click: any) => {
      if (!onFeatureSelect) return;
      const pickedObject = viewer.scene.pick(click.position);
      if (defined(pickedObject) && pickedObject.id) {
        const entity = pickedObject.id;
        const properties: Record<string, any> = {};

        if (entity.properties) {
          const propertyNames = entity.properties.propertyNames || [];
          propertyNames.forEach((name: string) => {
            properties[name] = entity.properties[name]?.getValue();
          });
        }

        let geometryType = "Feature";
        if (entity.polygon) geometryType = "Polygon";
        else if (entity.polyline) geometryType = "Polyline";
        else if (entity.point || entity.billboard) geometryType = "Point";

        let coordsStr = "";
        if (entity.position) {
          const cartesian = entity.position.getValue(viewer.clock.currentTime);
          if (cartesian) {
            const cartographic = Cartographic.fromCartesian(cartesian);
            const lng = CesiumMath.toDegrees(cartographic.longitude).toFixed(4);
            const lat = CesiumMath.toDegrees(cartographic.latitude).toFixed(4);
            coordsStr = `${lat}°, ${lng}°`;
          }
        }

        const parentDataSourceName = entity.entityCollection?.owner?.name || "GeoJSON Layer";

        onFeatureSelect({
          datasetName: parentDataSourceName,
          geometryType,
          properties,
          coordinates: coordsStr,
        });
      } else {
        onFeatureSelect(null);
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
      if (layerManagerRef.current) {
        layerManagerRef.current.removeAllLayers();
      }
      viewer.destroy();
      viewerRef.current = null;
      layerManagerRef.current = null;
    };
  }, []);

  // Synchronize visualizable GeoJSON layers when layers prop or visibleLayerIds state updates
  useEffect(() => {
    if (!layerManagerRef.current || !viewerRef.current) return;
    const lm = layerManagerRef.current;

    layers.forEach((layer) => {
      if (layer.fileUrl && (layer.dataType.toLowerCase().includes('geojson') || layer.fileFormat.toLowerCase() === 'geojson')) {
        const isVisible = visibleLayerIds.has(layer.id);
        lm.loadGeoJsonLayer({
          id: layer.id,
          name: layer.name,
          dataType: layer.dataType,
          fileUrl: layer.fileUrl,
          visible: isVisible,
        }).catch((err) => {
          console.warn(`[DashboardMap] Could not render layer ${layer.name}:`, err);
        });
      }
    });

    // Handle removal of deleted layers
    const layerIdSet = new Set(layers.map((l) => l.id));
    visibleLayerIds.forEach((id) => {
      if (!layerIdSet.has(id)) {
        lm.removeLayer(id);
      }
    });
  }, [layers, visibleLayerIds]);

  return (
    <div
      ref={cesiumContainer}
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
});

DashboardMap.displayName = 'DashboardMap';

export default DashboardMap;
