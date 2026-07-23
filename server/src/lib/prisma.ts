/**
 * Prisma Client Singleton
 * 
 * Standard PrismaClient singleton for backend database connectivity.
 */

import { PrismaClient } from '../generated/prisma';
import { config } from '../config';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (config.isDev) {
  globalForPrisma.prisma = prisma;
}
