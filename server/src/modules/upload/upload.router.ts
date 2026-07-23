import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { uploadMiddleware } from '../../middleware/upload';
import { uploadDatasetHandler } from './upload.controller';

const router = Router();

// Protect all upload endpoints with JWT authentication middleware
router.use(authenticate);

/**
 * POST /api/upload/dataset
 * Uploads a geospatial file and automatically creates a Dataset record
 */
router.post('/dataset', uploadMiddleware.single('file'), uploadDatasetHandler);

export default router;
