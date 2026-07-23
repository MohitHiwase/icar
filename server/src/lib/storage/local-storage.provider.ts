/**
 * Local Storage Provider
 *
 * Implementation of StorageProvider interface for local disk storage.
 * Organizes files into clean subdirectories (csv, geojson, geotiff, shapefile, raster, images).
 * Generates unique UUID filenames to eliminate path traversal and collisions.
 */

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { StorageProvider, SavedFileResult } from './storage.interface';
import { config } from '../../config';

export class LocalStorageProvider implements StorageProvider {
  private baseUploadDir: string;

  constructor(baseUploadDir?: string) {
    this.baseUploadDir = baseUploadDir || config.uploadDir || path.join(process.cwd(), 'uploads');
    this.ensureDirExists(this.baseUploadDir);
  }

  private ensureDirExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  async saveFile(
    file: {
      buffer: Buffer;
      originalname: string;
      mimetype: string;
      size: number;
    },
    subfolder: string
  ): Promise<SavedFileResult> {
    const ext = path.extname(file.originalname).toLowerCase();
    const storedFilename = `${uuidv4()}${ext}`;

    const targetSubfolderDir = path.join(this.baseUploadDir, subfolder);
    this.ensureDirExists(targetSubfolderDir);

    const fullFilePath = path.join(targetSubfolderDir, storedFilename);

    // Save buffer asynchronously
    await fs.promises.writeFile(fullFilePath, file.buffer);

    const relativePath = path.join('uploads', subfolder, storedFilename).replace(/\\/g, '/');

    return {
      filePath: relativePath,
      storedFilename,
      fileSizeBytes: file.size,
      subfolder,
    };
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);

    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }
  }

  getFileUrl(filePath: string): string {
    return `/${filePath.replace(/\\/g, '/')}`;
  }
}
