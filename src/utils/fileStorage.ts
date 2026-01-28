/**
 * 🔒 PRODUCTION-GRADE FILE STORAGE
 * 
 * IndexedDB kullanarak dosya içeriklerini KALICI olarak saklar.
 * Sayfa yenilense bile veri kaybolmaz.
 * 
 * Özellikler:
 * - ✅ Kalıcı depolama (IndexedDB)
 * - ✅ UTF-8 Türkçe karakter desteği
 * - ✅ 50MB+ dosya desteği
 * - ✅ Async/performanslı
 * - ✅ Error handling
 */

const DB_NAME = 'finops_file_storage';
const DB_VERSION = 1;
const STORE_NAME = 'file_contents';

interface StoredFile {
  id: string;
  content: string;
  fileName: string;
  uploadedAt: string;
  userId: string;
}

class FileStorageDB {
  private db: IDBDatabase | null = null;

  /**
   * Database'i başlat
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB açılamadı:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('✅ FileStorage IndexedDB hazır');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Store oluştur (yoksa)
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          objectStore.createIndex('userId', 'userId', { unique: false });
          objectStore.createIndex('fileName', 'fileName', { unique: false });
          console.log('✅ FileStorage object store oluşturuldu');
        }
      };
    });
  }

  /**
   * Dosya içeriğini kaydet
   */
  async saveFile(
    id: string, 
    content: string, 
    fileName: string, 
    userId: string
  ): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const fileData: StoredFile = {
        id,
        content,
        fileName,
        uploadedAt: new Date().toISOString(),
        userId,
      };

      const request = store.put(fileData);

      request.onsuccess = () => {
        console.log(`✅ Dosya kaydedildi: ${fileName} (${(content.length / 1024).toFixed(2)} KB)`);
        resolve();
      };

      request.onerror = () => {
        console.error('❌ Dosya kaydetme hatası:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Dosya içeriğini getir
   */
  async getFile(id: string): Promise<string | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        const result = request.result as StoredFile | undefined;
        if (result) {
          console.log(`✅ Dosya bulundu: ${result.fileName}`);
          resolve(result.content);
        } else {
          console.warn(`⚠️ Dosya bulunamadı: ${id}`);
          resolve(null);
        }
      };

      request.onerror = () => {
        console.error('❌ Dosya okuma hatası:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Dosya var mı kontrol et
   */
  async hasFile(id: string): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result !== undefined);
      };

      request.onerror = () => {
        console.error('❌ Dosya kontrol hatası:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Dosyayı sil
   */
  async deleteFile(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`✅ Dosya silindi: ${id}`);
        resolve();
      };

      request.onerror = () => {
        console.error('❌ Dosya silme hatası:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Kullanıcının tüm dosyalarını getir
   */
  async getUserFiles(userId: string): Promise<StoredFile[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('userId');
      const request = index.getAll(userId);

      request.onsuccess = () => {
        console.log(`✅ ${request.result.length} dosya bulundu (user: ${userId})`);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('❌ Dosya listesi hatası:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Tüm dosyaları sil (kullanıcı bazlı)
   */
  async clearUserFiles(userId: string): Promise<void> {
    if (!this.db) await this.init();

    const files = await this.getUserFiles(userId);
    
    for (const file of files) {
      await this.deleteFile(file.id);
    }

    console.log(`✅ ${files.length} dosya silindi (user: ${userId})`);
  }
}

// Singleton instance
export const fileStorage = new FileStorageDB();

// Export tipler
export type { StoredFile };
