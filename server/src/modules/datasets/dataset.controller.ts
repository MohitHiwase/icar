import { Request, Response, NextFunction } from 'express';
import * as datasetService from './dataset.service';

/**
 * Dataset Controller
 *
 * Express handlers for datasets endpoints.
 * Thin layer that extracts params/body and delegates to service.
 */

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const dataset = await datasetService.createDataset(userId, req.body);
    res.status(201).json({
      status: 'success',
      data: { dataset },
    });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const query = {
      dataType: req.query.dataType as string | undefined,
      qualityStatus: req.query.qualityStatus as any,
      origin: req.query.origin as any,
      sourceId: req.query.sourceId as string | undefined,
      search: req.query.search as string | undefined,
    };

    const datasets = await datasetService.listDatasets(userId, query);
    res.status(200).json({
      status: 'success',
      data: { datasets, count: datasets.length },
    });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const dataset = await datasetService.getDatasetById(id);
    res.status(200).json({
      status: 'success',
      data: { dataset },
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const dataset = await datasetService.updateDataset(id, req.body);
    res.status(200).json({
      status: 'success',
      data: { dataset },
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    await datasetService.deleteDataset(id);
    res.status(200).json({
      status: 'success',
      message: 'Dataset deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
