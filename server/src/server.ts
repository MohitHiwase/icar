/**
 * Server Entry Point
 *
 * Boots the Express application:
 *   1. Validates environment config (fail-fast)
 *   2. Tests database connectivity
 *   3. Starts HTTP listener
 *   4. Handles graceful shutdown (SIGTERM/SIGINT)
 */

import { createApp } from './app';
import { config } from './config';
import { logger, prisma } from './lib';

async function main() {
  // Config validation happens on import (requireEnv throws if missing)
  logger.info(`Starting GeoVision API in ${config.nodeEnv} mode...`);

  // Verify database connectivity before accepting requests
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    process.exit(1);
  }

  const app = createApp();

  const server = app.listen(config.port, () => {
    logger.info(`GeoVision API listening on http://localhost:${config.port}`);
    logger.info(`Health check: http://localhost:${config.port}/api/health`);
  });

  // ── Graceful Shutdown ─────────────────
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      logger.info('Database disconnected. Process exiting.');
      process.exit(0);
    });

    // Force kill after 10s if graceful shutdown hangs
    setTimeout(() => {
      logger.error('Forcefully shutting down after timeout');
      process.exit(1);
    }, 10_000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Catch unhandled rejections / exceptions
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
  });
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
  });
}

main();
