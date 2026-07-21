/**
 * Prisma Client Singleton
 * 
 * Prisma 7 requires explicit driver adapters.
 * Uses PrismaPg adapter with the pg driver for PostgreSQL connectivity.
 * Singleton pattern prevents connection pool exhaustion during hot-reload.
 */

import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from '../config';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: config.databaseUrl });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (config.isDev) {
  globalForPrisma.prisma = prisma;
}
