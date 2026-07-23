import { prisma, NotFoundError } from '../../lib';
import { CreateDatasetInput, UpdateDatasetInput, DatasetQueryInput } from './dataset.schema';

/**
 * Dataset Service
 *
 * Handles Prisma database operations for datasets.
 * Safely converts BigInt fileSizeBytes to numbers for clean JSON serialization.
 */

function formatDataset(dataset: any) {
  if (!dataset) return null;
  return {
    ...dataset,
    fileSizeBytes: Number(dataset.fileSizeBytes || 0),
  };
}

export async function createDataset(userId: string, input: CreateDatasetInput) {
  const metadataStr = input.metadata
    ? typeof input.metadata === 'string'
      ? input.metadata
      : JSON.stringify(input.metadata)
    : null;

  const parentIdsStr = input.parentDatasetIds
    ? typeof input.parentDatasetIds === 'string'
      ? input.parentDatasetIds
      : JSON.stringify(input.parentDatasetIds)
    : null;

  const dataset = await prisma.dataset.create({
    data: {
      name: input.name,
      description: input.description || null,
      dataType: input.dataType,
      fileFormat: input.fileFormat || input.dataType.toLowerCase(),
      filePath: input.filePath || '',
      fileSizeBytes: BigInt(input.fileSizeBytes || 0),
      origin: input.origin || 'manual_upload',
      qualityStatus: input.qualityStatus || 'raw',
      sourceId: input.sourceId || null,
      parentDatasetIds: parentIdsStr,
      metadata: metadataStr,
      uploadedBy: userId,
    },
    include: {
      uploader: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      source: {
        select: {
          id: true,
          name: true,
          type: true,
          provider: true,
        },
      },
    },
  });

  return formatDataset(dataset);
}

export async function listDatasets(userId: string, query?: DatasetQueryInput) {
  const where: any = {};

  if (query?.dataType) {
    where.dataType = query.dataType;
  }

  if (query?.qualityStatus) {
    where.qualityStatus = query.qualityStatus;
  }

  if (query?.origin) {
    where.origin = query.origin;
  }

  if (query?.sourceId) {
    where.sourceId = query.sourceId;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search } },
      { description: { contains: query.search } },
      { dataType: { contains: query.search } },
    ];
  }

  const datasets = await prisma.dataset.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      uploader: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      source: {
        select: {
          id: true,
          name: true,
          type: true,
          provider: true,
        },
      },
      _count: {
        select: {
          pipelineNodes: true,
          mapLayers: true,
          reports: true,
        },
      },
    },
  });

  return datasets.map(formatDataset);
}

export async function getDatasetById(id: string) {
  const dataset = await prisma.dataset.findUnique({
    where: { id },
    include: {
      uploader: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      source: {
        select: {
          id: true,
          name: true,
          type: true,
          provider: true,
        },
      },
      _count: {
        select: {
          pipelineNodes: true,
          mapLayers: true,
          reports: true,
        },
      },
    },
  });

  if (!dataset) {
    throw new NotFoundError('Dataset');
  }

  return formatDataset(dataset);
}

export async function updateDataset(id: string, input: UpdateDatasetInput) {
  // Check existence
  await getDatasetById(id);

  const dataToUpdate: any = {};

  if (input.name !== undefined) dataToUpdate.name = input.name;
  if (input.description !== undefined) dataToUpdate.description = input.description || null;
  if (input.dataType !== undefined) dataToUpdate.dataType = input.dataType;
  if (input.fileFormat !== undefined) dataToUpdate.fileFormat = input.fileFormat;
  if (input.filePath !== undefined) dataToUpdate.filePath = input.filePath;
  if (input.fileSizeBytes !== undefined) dataToUpdate.fileSizeBytes = BigInt(input.fileSizeBytes);
  if (input.origin !== undefined) dataToUpdate.origin = input.origin;
  if (input.qualityStatus !== undefined) dataToUpdate.qualityStatus = input.qualityStatus;
  if (input.sourceId !== undefined) dataToUpdate.sourceId = input.sourceId || null;

  if (input.metadata !== undefined) {
    dataToUpdate.metadata = input.metadata
      ? typeof input.metadata === 'string'
        ? input.metadata
        : JSON.stringify(input.metadata)
      : null;
  }

  if (input.parentDatasetIds !== undefined) {
    dataToUpdate.parentDatasetIds = input.parentDatasetIds
      ? typeof input.parentDatasetIds === 'string'
        ? input.parentDatasetIds
        : JSON.stringify(input.parentDatasetIds)
      : null;
  }

  const updated = await prisma.dataset.update({
    where: { id },
    data: dataToUpdate,
    include: {
      uploader: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      source: {
        select: {
          id: true,
          name: true,
          type: true,
          provider: true,
        },
      },
    },
  });

  return formatDataset(updated);
}

export async function deleteDataset(id: string) {
  // Check existence
  await getDatasetById(id);

  return prisma.dataset.delete({
    where: { id },
  });
}
