import { Router } from 'express';
import { authenticate, validate } from '../../middleware';
import { createDatasetSchema, updateDatasetSchema } from './dataset.schema';
import * as datasetController from './dataset.controller';

/**
 * Dataset Router
 *
 * All routes are protected by authentication middleware.
 * Request bodies are validated using Zod.
 *
 * Routes:
 *   POST   /          — Create a dataset metadata record
 *   GET    /          — List all datasets (with optional filters)
 *   GET    /:id       — Get dataset details by ID
 *   PUT    /:id       — Update dataset metadata by ID
 *   DELETE /:id       — Delete dataset by ID
 */

const router = Router();

// Protect all dataset routes
router.use(authenticate);

router.post('/', validate(createDatasetSchema), datasetController.create);
router.get('/', datasetController.list);
router.get('/:id', datasetController.getById);
router.put('/:id', validate(updateDatasetSchema), datasetController.update);
router.delete('/:id', datasetController.remove);

export { router as datasetRouter };
