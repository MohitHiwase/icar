'use client';
import { useEffect, useRef } from 'react';
import { Viewer, Cartesian3 } from 'cesium';
// Standard Cesium styles
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Crucial config to let Cesium find its web workers and assets in the Next.js public directory
if (typeof window !== 'undefined') {
  (window as any).CESIUM_BASE_URL = '/cesium';
}

export default function DashboardMap() {
  const cesiumContainer = useRef<HTMLDivElement>(null);

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
      scene3DOnly: true, // Optimizes performance for 3D only
    });

    // Handle initial camera position: center on India (Lat: 20.5937, Lon: 78.9629)
    // Altitude is set around 4.5 million meters for a good country-wide overview.
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(78.9629, 20.5937, 4500000),
      duration: 0.0 // Fly instantly to avoid jarring animation on load
    });

    // Cleanup when component unmounts to prevent memory leaks with hot-reloading
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div 
      ref={cesiumContainer} 
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
