import { Request, Response, NextFunction } from 'express';
import * as dataSourceService from './data-source.service';

/**
 * Data Source Controller
 *
 * Express handlers for data sources endpoints.
 * Thin layer that extracts params/body and delegates to service.
 */

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const dataSource = await dataSourceService.createDataSource(userId, req.body);
    res.status(201).json({
      status: 'success',
      data: { dataSource },
    });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const query = req.query as any;
    const dataSources = await dataSourceService.listDataSources(userId, query);
    res.status(200).json({
      status: 'success',
      data: { dataSources, count: dataSources.length },
    });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const dataSource = await dataSourceService.getDataSourceById(id);
    res.status(200).json({
      status: 'success',
      data: { dataSource },
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const dataSource = await dataSourceService.updateDataSource(id, req.body);
    res.status(200).json({
      status: 'success',
      data: { dataSource },
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    await dataSourceService.deleteDataSource(id);
    res.status(200).json({
      status: 'success',
      message: 'Data source deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
