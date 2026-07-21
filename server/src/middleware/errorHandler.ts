/**
 * Global Error Handler Middleware
 *
 * Catches all errors thrown by route handlers and services.
 * Returns structured JSON error responses.
 * Logs non-operational (unexpected) errors as critical.
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../lib/errors';
import { logger } from '../lib/logger';
import { config } from '../config';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Known operational errors (thrown intentionally by service layer)
  if (err instanceof AppError) {
    const response: Record<string, unknown> = {
      status: 'error',
      message: err.message,
    };
    if (err.details) {
      response.details = err.details;
    }
    res.status(err.statusCode).json(response);
    return;
  }

  // Unexpected errors — log full stack, return generic message
  logger.error('Unhandled error:', err);

  res.status(500).json({
    status: 'error',
    message: config.isProd
      ? 'An unexpected error occurred'
      : err.message,
    ...(config.isDev && { stack: err.stack }),
  });
}
