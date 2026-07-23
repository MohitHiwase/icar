/**
 * Upload Service
 *
 * Handles file storage via StorageProvider, basic metadata extraction,
 * and automatic Dataset record creation via DatasetService.
 */

import path from 'path';
import { storageProvider } from '../../lib/storage';
import { createDataset } from '../datasets/dataset.service';
import { getDataTypeFromExtension, getSubfolderFromExtension, UploadDatasetInput } from './upload.schema';
import { AppError, BadRequestError } from '../../lib';

export class UploadService {
  async processUpload(
    file: Express.Multer.File | undefined,
    userId: string,
    input: UploadDatasetInput
  ) {
    if (!file) {
      throw new BadRequestError('No file provided for upload');
    }

    const ext = path.extname(file.originalname).toLowerCase();
    if (!ext) {
      throw new BadRequestError('Uploaded file must have a valid file extension');
    }

    const dataType = getDataTypeFromExtension(ext);
    const fileFormat = ext.replace('.', '');
    const subfolder = getSubfolderFromExtension(ext);

    // 1. Store file using StorageProvider abstraction
    const fileResult = await storageProvider.saveFile(
      {
        buffer: file.buffer,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
      subfolder
    );

    // 2. Build Basic Metadata payload
    const metadataObj = {
      originalFilename: file.originalname,
      storedFilename: fileResult.storedFilename,
      extension: ext,
      fileSizeBytes: file.size,
      mimeType: file.mimetype,
      uploadedAt: new Date().toISOString(),
    };

    const datasetName =
      input.name && input.name.trim().length > 0
        ? input.name.trim()
        : path.basename(file.originalname, path.extname(file.originalname));

    // 3. Automatically create Dataset record in DB via datasetService
    const dataset = await createDataset(userId, {
      name: datasetName,
      description: input.description,
      dataType,
      fileFormat,
      filePath: fileResult.filePath,
      fileSizeBytes: file.size,
      origin: 'manual_upload',
      qualityStatus: 'raw',
      sourceId: input.sourceId,
      metadata: JSON.stringify(metadataObj),
    });

    return {
      dataset,
      fileResult,
      metadata: metadataObj,
    };
  }
}

export const uploadService = new UploadService();
