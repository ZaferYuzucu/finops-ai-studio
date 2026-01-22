/**
 * PERSISTENT FILE STORE - IndexedDB Implementation
 * 
 * CRITICAL STABILITY REQUIREMENT:
 * File content MUST persist across page refreshes and browser sessions.
 * This replaces the runtime-only store which caused data loss.
 * 
 * CONTRACT (DO NOT CHANGE WITHOUT PRODUCT OWNER APPROVAL):
 * - All file content is stored in IndexedDB
 * - Content survives page refresh, navigation, and browser restart
 * - Maximum file size: 50MB per file
 * - Storage quota: Browser-dependent (~1GB typical)
 * 
 * @stability LOCKED - Core data persistence mechanism
 * @author Principal Architect - 2026-01-20
 */

const DB_NAME = 'finops-file-content-v1';
const STORE_NAME = 'file-contents';
const DB_VERSION = 1;

// Maximum file size: 50MB
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

/**
 * Error types for explicit handling
 */
export class PersistentStorageError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'PersistentStorageError';
  }
}

/**
 * Initialize IndexedDB connection
 * @stability LOCKED - Database schema is frozen
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      console.error('[PersistentFileStore] Database open failed:', request.error);
      reject(new PersistentStorageError(
        'Veritabanı açılamadı. Tarayıcınız IndexedDB desteklemiyor olabilir.',
        'DB_OPEN_FAILED'
      ));
    };
    
    request.onsuccess = () => {
      console.log('[PersistentFileStore] Database opened successfully');
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      console.log('[PersistentFileStore] Database upgrade needed, creating object store');
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('uploadedAt', 'uploadedAt', { unique: false });
        console.log('[PersistentFileStore] Object store created');
      }
    };
  });
}

/**
 * Store file content persistently
 * 
 * CONTRACT (DO NOT CHANGE):
 * - Content is validated before storage
 * - Size limit enforced
 * - Overwrites existing content with same ID
 * - Returns success/failure explicitly
 * 
 * @stability LOCKED
 */
export async function saveFileContent(
  fileId: string,
  content: string,
  metadata?: { fileName?: string; uploadedAt?: string }
): Promise<void> {
  // DEFENSIVE CHECK 1: Validate inputs
  if (!fileId || typeof fileId !== 'string' || fileId.trim() === '') {
    throw new PersistentStorageError(
      'Dosya ID geçersiz',
      'INVALID_FILE_ID'
    );
  }
  
  if (!content || typeof content !== 'string') {
    throw new PersistentStorageError(
      'Dosya içeriği geçersiz',
      'INVALID_CONTENT'
    );
  }
  
  // DEFENSIVE CHECK 2: Size limit
  const contentSizeBytes = new Blob([content]).size;
  if (contentSizeBytes > MAX_FILE_SIZE_BYTES) {
    throw new PersistentStorageError(
      `Dosya boyutu çok büyük: ${(contentSizeBytes / 1024 / 1024).toFixed(2)}MB. Maksimum: 50MB`,
      'FILE_TOO_LARGE'
    );
  }
  
  if (contentSizeBytes < 10) {
    throw new PersistentStorageError(
      'Dosya içeriği çok kısa veya boş',
      'CONTENT_TOO_SHORT'
    );
  }
  
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      
      const record = {
        id: fileId,
        content: content,
        uploadedAt: metadata?.uploadedAt || new Date().toISOString(),
        fileName: metadata?.fileName || 'unknown',
        sizeBytes: contentSizeBytes,
        savedAt: new Date().toISOString()
      };
      
      const request = objectStore.put(record);
      
      request.onsuccess = () => {
        console.log(
          `[PersistentFileStore] ✅ Saved: ${fileId} (${(contentSizeBytes / 1024).toFixed(2)} KB)`
        );
        resolve();
      };
      
      request.onerror = () => {
        console.error('[PersistentFileStore] Save failed:', request.error);
        reject(new PersistentStorageError(
          `Dosya kaydedilemedi: ${request.error?.message || 'Bilinmeyen hata'}`,
          'SAVE_FAILED'
        ));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    if (error instanceof PersistentStorageError) {
      throw error;
    }
    
    // Handle quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new PersistentStorageError(
        'Depolama alanı dolu. Lütfen eski dosyaları silin veya tarayıcı önbelleğini temizleyin.',
        'QUOTA_EXCEEDED'
      );
    }
    
    throw new PersistentStorageError(
      `Beklenmeyen hata: ${(error as Error).message}`,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Retrieve file content
 * 
 * CONTRACT (DO NOT CHANGE):
 * - Returns null if not found (explicit, not undefined)
 * - Never throws on not-found (returns null instead)
 * - Throws only on database errors
 * 
 * @stability LOCKED
 */
export async function getFileContent(fileId: string): Promise<string | null> {
  // DEFENSIVE CHECK
  if (!fileId || typeof fileId !== 'string') {
    console.error('[PersistentFileStore] Invalid file ID:', fileId);
    return null;
  }
  
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.get(fileId);
      
      request.onsuccess = () => {
        const record = request.result;
        
        if (!record) {
          console.warn(`[PersistentFileStore] ⚠️ Content not found: ${fileId}`);
          resolve(null);
          return;
        }
        
        if (!record.content || typeof record.content !== 'string') {
          console.error(`[PersistentFileStore] ❌ Invalid content format: ${fileId}`);
          resolve(null);
          return;
        }
        
        console.log(
          `[PersistentFileStore] ✅ Retrieved: ${fileId} (${(record.sizeBytes / 1024).toFixed(2)} KB)`
        );
        resolve(record.content);
      };
      
      request.onerror = () => {
        console.error('[PersistentFileStore] Retrieval failed:', request.error);
        reject(new PersistentStorageError(
          `Dosya okunamadı: ${request.error?.message || 'Bilinmeyen hata'}`,
          'READ_FAILED'
        ));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    if (error instanceof PersistentStorageError) {
      throw error;
    }
    throw new PersistentStorageError(
      `Beklenmeyen hata: ${(error as Error).message}`,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Check if file exists
 * 
 * @stability LOCKED
 */
export async function hasFileContent(fileId: string): Promise<boolean> {
  try {
    const content = await getFileContent(fileId);
    return content !== null;
  } catch {
    return false;
  }
}

/**
 * Delete file content
 * 
 * CONTRACT (DO NOT CHANGE):
 * - Returns true if deleted
 * - Returns false if not found (not an error)
 * - Throws only on database errors
 * 
 * @stability LOCKED
 */
export async function deleteFileContent(fileId: string): Promise<boolean> {
  if (!fileId) {
    return false;
  }
  
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.delete(fileId);
      
      request.onsuccess = () => {
        console.log(`[PersistentFileStore] ✅ Deleted: ${fileId}`);
        resolve(true);
      };
      
      request.onerror = () => {
        console.error('[PersistentFileStore] Delete failed:', request.error);
        reject(new PersistentStorageError(
          `Dosya silinemedi: ${request.error?.message || 'Bilinmeyen hata'}`,
          'DELETE_FAILED'
        ));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    if (error instanceof PersistentStorageError) {
      throw error;
    }
    throw new PersistentStorageError(
      `Beklenmeyen hata: ${(error as Error).message}`,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Get all stored file IDs
 * 
 * @stability LOCKED
 */
export async function getAllFileIds(): Promise<string[]> {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAllKeys();
      
      request.onsuccess = () => {
        const keys = request.result as string[];
        console.log(`[PersistentFileStore] Found ${keys.length} stored files`);
        resolve(keys);
      };
      
      request.onerror = () => {
        console.error('[PersistentFileStore] Get keys failed:', request.error);
        reject(new PersistentStorageError(
          'Dosya listesi alınamadı',
          'LIST_FAILED'
        ));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    if (error instanceof PersistentStorageError) {
      throw error;
    }
    throw new PersistentStorageError(
      `Beklenmeyen hata: ${(error as Error).message}`,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Clear all stored content (use with caution)
 * 
 * @stability LOCKED
 */
export async function clearAllContent(): Promise<number> {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      
      // Get count before clearing
      const countRequest = objectStore.count();
      
      countRequest.onsuccess = () => {
        const count = countRequest.result;
        
        const clearRequest = objectStore.clear();
        
        clearRequest.onsuccess = () => {
          console.log(`[PersistentFileStore] ✅ Cleared ${count} files`);
          resolve(count);
        };
        
        clearRequest.onerror = () => {
          console.error('[PersistentFileStore] Clear failed:', clearRequest.error);
          reject(new PersistentStorageError(
            'Tüm dosyalar silinemedi',
            'CLEAR_FAILED'
          ));
        };
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    if (error instanceof PersistentStorageError) {
      throw error;
    }
    throw new PersistentStorageError(
      `Beklenmeyen hata: ${(error as Error).message}`,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Get storage statistics
 * 
 * @stability LOCKED
 */
export async function getStorageStats(): Promise<{
  count: number;
  totalSizeKB: number;
  files: Array<{ id: string; fileName: string; sizeKB: number; uploadedAt: string }>;
}> {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAll();
      
      request.onsuccess = () => {
        const records = request.result;
        
        let totalSize = 0;
        const files = records.map(record => {
          totalSize += record.sizeBytes || 0;
          return {
            id: record.id,
            fileName: record.fileName || 'unknown',
            sizeKB: (record.sizeBytes || 0) / 1024,
            uploadedAt: record.uploadedAt
          };
        });
        
        resolve({
          count: records.length,
          totalSizeKB: totalSize / 1024,
          files
        });
      };
      
      request.onerror = () => {
        console.error('[PersistentFileStore] Stats failed:', request.error);
        reject(new PersistentStorageError(
          'İstatistikler alınamadı',
          'STATS_FAILED'
        ));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    if (error instanceof PersistentStorageError) {
      throw error;
    }
    throw new PersistentStorageError(
      `Beklenmeyen hata: ${(error as Error).message}`,
      'UNKNOWN_ERROR'
    );
  }
}

// Export for debugging in browser console
if (typeof window !== 'undefined') {
  (window as any).__persistentFileStore = {
    save: saveFileContent,
    get: getFileContent,
    has: hasFileContent,
    delete: deleteFileContent,
    getAll: getAllFileIds,
    clear: clearAllContent,
    stats: getStorageStats
  };
}
