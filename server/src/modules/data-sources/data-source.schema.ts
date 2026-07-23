import { z } from 'zod';

export const dataSourceTypes = ['API', 'MANUAL', 'DATABASE', 'CLOUD_STORAGE'] as const;
export const dataSourceStatuses = ['active', 'offline', 'error'] as const;

export const createDataSourceSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  type: z.enum(dataSourceTypes),
  provider: z
    .string()
    .min(1, 'Provider is required')
    .max(100, 'Provider cannot exceed 100 characters'),
  baseUrl: z
    .string()
    .url('Invalid Base URL format')
    .optional()
    .nullable()
    .or(z.literal('')),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional().nullable(),
  authConfig: z.union([z.record(z.string(), z.any()), z.string()]).optional().nullable(),
  status: z.enum(dataSourceStatuses).optional().default('active'),
});

export const updateDataSourceSchema = createDataSourceSchema.partial();

export const dataSourceQuerySchema = z.object({
  type: z.enum(dataSourceTypes).optional(),
  status: z.enum(dataSourceStatuses).optional(),
  search: z.string().optional(),
});

export type CreateDataSourceInput = z.infer<typeof createDataSourceSchema>;
export type UpdateDataSourceInput = z.infer<typeof updateDataSourceSchema>;
export type DataSourceQueryInput = z.infer<typeof dataSourceQuerySchema>;
