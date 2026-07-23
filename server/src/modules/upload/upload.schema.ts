import { z } from 'zod';
import path from 'path';

/**
 * Extension to Data Type Mapping
 */
export function getDataTypeFromExtension(ext: string): string {
  const e = ext.toLowerCase();
  if (['.csv', '.xlsx', '.xls'].includes(e)) return 'CSV';
  if (['.json', '.geojson'].includes(e)) return 'GeoJSON';
  if (['.tif', '.tiff'].includes(e)) return 'GeoTIFF';
  if (['.cog'].includes(e)) return 'COG';
  if (['.shp', '.shx', '.dbf', '.prj', '.cpg', '.zip'].includes(e)) return 'Shapefile';
  if (['.jp2'].includes(e)) return 'JP2';
  if (['.png', '.jpg', '.jpeg'].includes(e)) return 'Satellite Image';
  return 'GeoDataset';
}

/**
 * Extension to Storage Subfolder Mapping
 */
export function getSubfolderFromExtension(ext: string): string {
  const e = ext.toLowerCase();
  if (['.csv', '.xlsx', '.xls'].includes(e)) return 'csv';
  if (['.json', '.geojson'].includes(e)) return 'geojson';
  if (['.tif', '.tiff', '.cog'].includes(e)) return 'geotiff';
  if (['.shp', '.shx', '.dbf', '.prj', '.cpg', '.zip'].includes(e)) return 'shapefile';
  if (['.jp2'].includes(e)) return 'raster';
  if (['.png', '.jpg', '.jpeg'].includes(e)) return 'images';
  return 'misc';
}

/**
 * Upload Body Schema Validation
 */
export const uploadDatasetInputSchema = z.object({
  name: z.string().trim().optional(),
  description: z.string().trim().optional(),
  sourceId: z.string().trim().optional(),
});

export type UploadDatasetInput = z.infer<typeof uploadDatasetInputSchema>;
