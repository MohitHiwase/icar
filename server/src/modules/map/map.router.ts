import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { getMapDatasetsHandler } from './map.controller';

const router = Router();

// Protect all map endpoints with JWT authentication
router.use(authenticate);

/**
 * GET /api/map/datasets
 * Returns visualizable GIS map datasets for the authenticated user
 */
router.get('/datasets', getMapDatasetsHandler);

export default router;
