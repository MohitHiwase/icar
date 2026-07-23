/**
 * Storage Abstraction Layer Interface
 *
 * Defines the contract for saving and deleting files.
 * Allows seamless switching between LocalStorageProvider, S3StorageProvider, GCSStorageProvider, etc.
 */

export interface SavedFileResult {
  filePath: string;
  storedFilename: string;
  fileSizeBytes: number;
  subfolder: string;
}

export interface StorageProvider {
  /**
   * Saves a file buffer or stream to the destination storage system.
   */
  saveFile(
    file: {
      buffer: Buffer;
      originalname: string;
      mimetype: string;
      size: number;
    },
    subfolder: string
  ): Promise<SavedFileResult>;

  /**
   * Deletes a file from the destination storage system.
   */
  deleteFile(filePath: string): Promise<void>;

  /**
   * Returns a URL or relative path for accessing the stored file.
   */
  getFileUrl(filePath: string): string;
}
