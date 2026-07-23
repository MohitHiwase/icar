/**
 * Map Service
 *
 * Reuses DatasetService to fetch visualizable datasets for GIS map visualization.
 * Maps stored filePaths to publicly accessible static URL endpoints.
 */

import { listDatasets } from '../datasets/dataset.service';

export async function getMapDatasets(userId: string) {
  const allDatasets = await listDatasets(userId);

  // Filter datasets that are suitable for map visualization
  // (e.g. GeoJSON, Shapefile, GeoTIFF, COG, CSV, Raster, Image)
  const visualizable = allDatasets.filter((ds: any) => {
    if (!ds.filePath) return false;
    const format = (ds.fileFormat || '').toLowerCase();
    const type = (ds.dataType || '').toLowerCase();
    return (
      format === 'geojson' ||
      format === 'json' ||
      format === 'shp' ||
      format === 'zip' ||
      format === 'tif' ||
      format === 'tiff' ||
      format === 'cog' ||
      format === 'csv' ||
      type.includes('geojson') ||
      type.includes('shapefile') ||
      type.includes('geotiff') ||
      type.includes('raster') ||
      type.includes('satellite')
    );
  });

  return visualizable.map((ds: any) => {
    // Format relative filePath for static serving via /uploads route
    let fileUrl = ds.filePath;
    if (fileUrl && !fileUrl.startsWith('http') && !fileUrl.startsWith('/uploads')) {
      // Normalize slashes
      const cleanPath = fileUrl.replace(/\\/g, '/').replace(/^uploads\//, '');
      fileUrl = `/uploads/${cleanPath}`;
    }

    return {
      id: ds.id,
      name: ds.name,
      description: ds.description,
      dataType: ds.dataType,
      fileFormat: ds.fileFormat,
      filePath: ds.filePath,
      fileUrl,
      fileSizeBytes: ds.fileSizeBytes,
      origin: ds.origin,
      qualityStatus: ds.qualityStatus,
      uploadedBy: ds.uploadedBy,
      createdAt: ds.createdAt,
      updatedAt: ds.updatedAt,
      metadata: ds.metadata,
      uploader: ds.uploader,
      source: ds.source,
    };
  });
}
