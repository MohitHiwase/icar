import { StorageProvider } from './storage.interface';
import { LocalStorageProvider } from './local-storage.provider';

export * from './storage.interface';
export * from './local-storage.provider';

/**
 * Singleton instance of StorageProvider.
 * Swapping LocalStorageProvider with S3StorageProvider or AzureBlobStorageProvider
 * in the future will only require updating this factory export.
 */
export const storageProvider: StorageProvider = new LocalStorageProvider();
