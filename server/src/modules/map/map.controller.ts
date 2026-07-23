/**
 * Map Controller
 *
 * Exposes API endpoints for retrieving visualizable GIS datasets.
 */

import { Request, Response, NextFunction } from 'express';
import * as mapService from './map.service';

export async function getMapDatasetsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.userId;
    const datasets = await mapService.getMapDatasets(userId);
    res.json({
      success: true,
      datasets,
      count: datasets.length,
    });
  } catch (error) {
    next(error);
  }
}
