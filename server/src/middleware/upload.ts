/**
 * File Upload Middleware (Multer)
 *
 * Configures disk storage for geospatial file uploads.
 * Generates unique filenames to prevent collisions.
 * Validates file size against config limits.
 * Reusable across any route that needs file ingestion.
 */

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

// Ensure upload directory exists at startup
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

// Allowed geospatial file extensions
const ALLOWED_EXTENSIONS = new Set([
  '.csv', '.xlsx', '.xls',
  '.json', '.geojson',
  '.shp', '.shx', '.dbf', '.prj', '.cpg',  // Shapefile components
  '.tif', '.tiff',                            // GeoTIFF
  '.zip',                                     // Bundled shapefiles
]);

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.has(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`File type '${ext}' is not supported. Allowed: ${[...ALLOWED_EXTENSIONS].join(', ')}`));
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSizeBytes,
  },
});
