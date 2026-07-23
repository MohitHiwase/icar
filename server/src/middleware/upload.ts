/**
 * File Upload Ingestion Middleware (Multer)
 *
 * Multer handles HTTP multipart form parsing and memory buffering.
 * Isolates file receiving from storage & business logic.
 * Validates maximum file size and supported extensions.
 */

import multer from 'multer';
import path from 'path';
import { config } from '../config';

// Memory storage keeps file buffers in memory for processing by StorageProvider
const storage = multer.memoryStorage();

// Supported extensions mapping
export const ALLOWED_EXTENSIONS = new Set([
  '.csv', '.xlsx', '.xls',
  '.json', '.geojson',
  '.shp', '.shx', '.dbf', '.prj', '.cpg', '.zip',
  '.tif', '.tiff', '.cog',
  '.jp2',
  '.png', '.jpg', '.jpeg',
]);

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.has(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `File extension '${ext}' is not supported. Supported extensions: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}`
      )
    );
  }
}

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSizeBytes, // Configured upload limit (default 100MB)
  },
});
