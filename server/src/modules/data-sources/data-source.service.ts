import { prisma, NotFoundError } from '../../lib';
import { CreateDataSourceInput, UpdateDataSourceInput, DataSourceQueryInput } from './data-source.schema';

/**
 * Data Source Service
 *
 * Encapsulates all database operations for Data Sources using Prisma.
 */

export async function createDataSource(userId: string, input: CreateDataSourceInput) {
  const authConfigStr = input.authConfig
    ? typeof input.authConfig === 'string'
      ? input.authConfig
      : JSON.stringify(input.authConfig)
    : null;

  return prisma.dataSource.create({
    data: {
      name: input.name,
      type: input.type,
      provider: input.provider,
      baseUrl: input.baseUrl || null,
      authConfig: authConfigStr,
      status: input.status || 'active',
      createdBy: userId,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function listDataSources(userId: string, query?: DataSourceQueryInput) {
  const where: any = {};

  if (query?.type) {
    where.type = query.type;
  }

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search } },
      { provider: { contains: query.search } },
    ];
  }

  return prisma.dataSource.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          datasets: true,
          importJobs: true,
        },
      },
    },
  });
}

export async function getDataSourceById(id: string) {
  const dataSource = await prisma.dataSource.findUnique({
    where: { id },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          datasets: true,
          importJobs: true,
        },
      },
    },
  });

  if (!dataSource) {
    throw new NotFoundError('Data Source');
  }

  return dataSource;
}

export async function updateDataSource(id: string, input: UpdateDataSourceInput) {
  // Check existence
  await getDataSourceById(id);

  const dataToUpdate: any = {};

  if (input.name !== undefined) dataToUpdate.name = input.name;
  if (input.type !== undefined) dataToUpdate.type = input.type;
  if (input.provider !== undefined) dataToUpdate.provider = input.provider;
  if (input.baseUrl !== undefined) dataToUpdate.baseUrl = input.baseUrl || null;
  if (input.status !== undefined) dataToUpdate.status = input.status;

  if (input.authConfig !== undefined) {
    dataToUpdate.authConfig = input.authConfig
      ? typeof input.authConfig === 'string'
        ? input.authConfig
        : JSON.stringify(input.authConfig)
      : null;
  }

  return prisma.dataSource.update({
    where: { id },
    data: dataToUpdate,
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function deleteDataSource(id: string) {
  // Check existence
  await getDataSourceById(id);

  return prisma.dataSource.delete({
    where: { id },
  });
}
