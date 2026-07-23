/**
 * Layer Manager Abstraction
 *
 * Manages layer data sources, visibility toggles, and cleanup on the Cesium Viewer instance.
 * Designed to cleanly accommodate future layer types (Raster, AI Results, NDVI, Cloud Detection/Removal)
 * without requiring refactoring.
 */

import { Viewer, GeoJsonDataSource, Color } from 'cesium';

export interface MapLayerConfig {
  id: string;
  name: string;
  dataType: string;
  fileUrl: string;
  visible?: boolean;
  colorHex?: string;
}

export class LayerManager {
  private viewer: Viewer;
  private dataSources: Map<string, GeoJsonDataSource> = new Map();

  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  /**
   * Load or toggle a GeoJSON layer on the Cesium viewer
   */
  async loadGeoJsonLayer(config: MapLayerConfig): Promise<GeoJsonDataSource> {
    if (this.dataSources.has(config.id)) {
      const existing = this.dataSources.get(config.id)!;
      existing.show = config.visible !== false;
      return existing;
    }

    try {
      const dataSource = await GeoJsonDataSource.load(config.fileUrl, {
        stroke: Color.fromCssColorString(config.colorHex || '#10B981'),
        fill: Color.fromCssColorString(config.colorHex || '#10B981').withAlpha(0.3),
        strokeWidth: 3,
        clampToGround: true,
      });

      dataSource.name = config.name;
      dataSource.show = config.visible !== false;

      await this.viewer.dataSources.add(dataSource);
      this.dataSources.set(config.id, dataSource);

      return dataSource;
    } catch (error) {
      console.error(`[LayerManager] Failed to load GeoJSON layer ${config.id}:`, error);
      throw error;
    }
  }

  /**
   * Toggle visibility of a loaded layer
   */
  setLayerVisibility(id: string, visible: boolean): void {
    const ds = this.dataSources.get(id);
    if (ds) {
      ds.show = visible;
    }
  }

  /**
   * Fly camera to zoom to a specific layer's extent
   */
  async zoomToLayer(id: string): Promise<void> {
    const ds = this.dataSources.get(id);
    if (ds) {
      await this.viewer.zoomTo(ds);
    }
  }

  /**
   * Remove a layer from the Cesium map
   */
  removeLayer(id: string): void {
    const ds = this.dataSources.get(id);
    if (ds) {
      this.viewer.dataSources.remove(ds, true);
      this.dataSources.delete(id);
    }
  }

  /**
   * Clean up all loaded layers
   */
  removeAllLayers(): void {
    this.dataSources.forEach((ds) => {
      this.viewer.dataSources.remove(ds, true);
    });
    this.dataSources.clear();
  }
}
