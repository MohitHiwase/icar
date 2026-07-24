/**
 * Express Application Factory
 *
 * Assembles all global middleware in the correct order:
 *   1. Security (CORS, Helmet)
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
import path from 'path';
import { authRouter } from './modules/auth';
import { dataSourceRouter } from './modules/data-sources';
import { datasetRouter } from './modules/datasets';
import { uploadRouter } from './modules/upload';
import { mapRouter } from './modules/map';

export function createApp(): express.Application {
  const app = express();

  // ── CORS Configuration ──────────────────
  const envCorsOrigins = config.corsOrigin
    ? config.corsOrigin.split(',').map((o) => o.trim())
    : [];

  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://localhost:4000',
    'http://127.0.0.1:4000',
    ...envCorsOrigins,
  ];

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      // Check explicit allowed origins or wildcard or localhost pattern in dev
      const isAllowed =
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error(`CORS policy error: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Authorization'],
    optionsSuccessStatus: 200,
  };

  // Enable CORS middleware for all routes & HTTP methods (including preflight OPTIONS)
  app.use(cors(corsOptions));

  // ── Helmet Security Headers ─────────────
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginOpenerPolicy: { policy: 'unsafe-none' },
    })
  );

  // ── Parsing ───────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ── Compression ───────────────────────
  app.use(compression());

  // ── Static Files ──────────────────────
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

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
  app.use('/api/upload', uploadRouter);
  app.use('/api/map', mapRouter);

  // ── 404 Catch-All ─────────────────────
  app.use((_req, _res, next) => {
    next(new NotFoundError('Route'));
  });

  // ── Global Error Handler (must be last) ──
  app.use(errorHandler);

  return app;
}
