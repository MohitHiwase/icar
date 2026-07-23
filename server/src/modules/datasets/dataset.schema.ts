import { z } from 'zod';

export const datasetTypes = [
  'CSV',
  'Excel',
  'GeoJSON',
  'Shapefile',
  'GeoTIFF',
  'COG',
  'JP2',
  'PNG',
  'JPG',
  'JPEG',
  'satellite',
  'climate',
  'soil',
  'vector',
  'raster',
] as const;

export const qualityStatuses = ['raw', 'cleaned', 'standardized', 'merged'] as const;
export const datasetOrigins = ['manual_upload', 'api_import', 'merged', 'analysis_output'] as const;

export const createDatasetSchema = z.object({
  name: z
    .string()
    .min(2, 'Dataset name must be at least 2 characters')
    .max(120, 'Dataset name cannot exceed 120 characters'),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().nullable(),
  dataType: z.string().min(1, 'Data type is required'),
  fileFormat: z.string().optional().default('geojson'),
  filePath: z.string().optional().default(''),
  fileSizeBytes: z.number().int().nonnegative().optional().default(0),
  origin: z.enum(datasetOrigins).optional().default('manual_upload'),
  qualityStatus: z.enum(qualityStatuses).optional().default('raw'),
  sourceId: z.string().uuid('Invalid source ID format').optional().nullable(),
  parentDatasetIds: z.union([z.array(z.string()), z.string()]).optional().nullable(),
  metadata: z.union([z.record(z.string(), z.any()), z.string()]).optional().nullable(),
});

export const updateDatasetSchema = createDatasetSchema.partial();

export const datasetQuerySchema = z.object({
  dataType: z.string().optional(),
  qualityStatus: z.enum(qualityStatuses).optional(),
  origin: z.enum(datasetOrigins).optional(),
  sourceId: z.string().optional(),
  search: z.string().optional(),
});

export type CreateDatasetInput = z.infer<typeof createDatasetSchema>;
export type UpdateDatasetInput = z.infer<typeof updateDatasetSchema>;
export type DatasetQueryInput = z.infer<typeof datasetQuerySchema>;
