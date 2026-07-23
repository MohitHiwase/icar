/**
 * Express Application Factory
 *
 * Assembles all global middleware in the correct order:
 *   1. Security (Helmet, CORS)
 *   2. Parsing (JSON, URL-encoded)
 *   3. Compression
 *   4. Request Logging
 *   5. API Routes (mounted later)
 *   6. 404 Catch-all
 *   7. Global Error Handler (must be last)
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from './config';
import { logger, NotFoundError } from './lib';
import { errorHandler } from './middleware';
import { authRouter } from './modules/auth';
import { dataSourceRouter } from './modules/data-sources';
import { datasetRouter } from './modules/datasets';

export function createApp(): express.Application {
  const app = express();

  // ── Security ──────────────────────────
  app.use(helmet());
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
  }));

  // ── Parsing ───────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ── Compression ───────────────────────
  app.use(compression());

  // ── Request Logging ───────────────────
  const morganStream = {
    write: (message: string) => logger.http(message.trim()),
  };
  app.use(morgan('short', { stream: morganStream }));

  // ── Health Check ──────────────────────
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'geovision-api',
      timestamp: new Date().toISOString(),
    });
  });

  // ── API Routes ────────────────────────
  app.use('/api/auth', authRouter);
  app.use('/api/data-sources', dataSourceRouter);
  app.use('/api/datasets', datasetRouter);

  // Future routes:
  //   app.use('/api/datasets',   datasetRouter);
  //   app.use('/api/sources',    dataSourceRouter);
  //   app.use('/api/pipelines',  pipelineRouter);
  //   app.use('/api/results',    analysisResultRouter);
  //   app.use('/api/layers',     mapLayerRouter);
  //   app.use('/api/reports',    reportRouter);

  // ── 404 Catch-All ─────────────────────
  app.use((_req, _res, next) => {
    next(new NotFoundError('Route'));
  });

  // ── Global Error Handler (must be last) ──
  app.use(errorHandler);

  return app;
}
