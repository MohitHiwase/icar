import { Router } from 'express';
import { authenticate, validate } from '../../middleware';
import { createDataSourceSchema, updateDataSourceSchema } from './data-source.schema';
import * as dataSourceController from './data-source.controller';

/**
 * Data Source Router
 *
 * All routes are protected by authentication middleware.
 * Request bodies are validated using Zod.
 *
 * Routes:
 *   POST   /          — Create a new data source
 *   GET    /          — List all data sources (with optional type/status filters)
 *   GET    /:id       — Get details for a specific data source
 *   PUT    /:id       — Update a data source
 *   DELETE /:id       — Delete a data source
 */

const router = Router();

// Protect all routes
router.use(authenticate);

router.post('/', validate(createDataSourceSchema), dataSourceController.create);
router.get('/', dataSourceController.list);
router.get('/:id', dataSourceController.getById);
router.put('/:id', validate(updateDataSourceSchema), dataSourceController.update);
router.delete('/:id', dataSourceController.remove);

export { router as dataSourceRouter };
