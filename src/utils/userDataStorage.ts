// Kullanıcı verilerini localStorage'a kaydetme sistemi
// TODO: İleride Firestore'a migrate edilecek

// 📚 VERİ KÜTÜPHANESİ KATEGORİLERİ
export type DataCategory = 
  | 'financial'           // Finansal Veriler
  | 'operational'         // Operasyonel Veriler
  | 'sales'              // Satış Verileri
  | 'inventory'          // Stok & Envanter
  | 'hr'                 // İnsan Kaynakları
  | 'agriculture'        // Tarım & Hayvancılık
  | 'branch'             // Şube Verileri
  | 'other';             // Diğer

export const DATA_CATEGORIES = {
  financial: {
    id: 'financial',
    name: 'Finansal Veriler',
    icon: '💰',
    description: 'Gelir, gider, kar-zarar, bütçe ve raporlama verileri',
    color: 'blue',
  },
  operational: {
    id: 'operational',
    name: 'Operasyonel Veriler',
    icon: '⚙️',
    description: 'İş süreçleri, üretim, kalite kontrol verileri',
    color: 'purple',
  },
  sales: {
    id: 'sales',
    name: 'Satış Verileri',
    icon: '📈',
    description: 'Satış rakamları, müşteri verileri, sipariş takibi',
    color: 'green',
  },
  inventory: {
    id: 'inventory',
    name: 'Stok & Envanter',
    icon: '📦',
    description: 'Stok seviyeleri, envanter takibi, tedarik zinciri',
    color: 'orange',
  },
  hr: {
    id: 'hr',
    name: 'İnsan Kaynakları',
    icon: '👥',
    description: 'Personel, performans, bordro verileri',
    color: 'pink',
  },
  agriculture: {
    id: 'agriculture',
    name: 'Tarım & Hayvancılık',
    icon: '🌾',
    description: 'Tarımsal üretim, tohum, hasat, hayvancılık verileri',
    color: 'lime',
  },
  branch: {
    id: 'branch',
    name: 'Şube Verileri',
    icon: '🏢',
    description: 'Şubeye özgü operasyonel ve finansal veriler',
    color: 'indigo',
  },
  other: {
    id: 'other',
    name: 'Diğer',
    icon: '📁',
    description: 'Kategori dışı veriler',
    color: 'gray',
  },
} as const;

export interface UploadedFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  userEmail: string;
  
  // 🆕 Kütüphane Özellikleri
  category: DataCategory;
  branchId?: string;      // Şube ID (eğer şubeye özgüyse)
  branchName?: string;    // Şube adı
  description?: string;   // Kullanıcı açıklaması
  tags?: string[];        // Arama için etiketler
  
  // Veri özellikleri
  rowCount?: number;
  columnCount?: number;
  preview?: string[];     // İlk 5 satır
  fileContent?: string;   // 🔥 YENİ: CSV/JSON dosya içeriği (Base64 veya text)
  
  // Saklama ve arşiv
  expiresAt?: string;     // Otomatik silme tarihi (opsiyonel)
  isArchived?: boolean;   // Arşivlenmiş mi?
  archivedAt?: string;    // Arşivlenme tarihi
}

const USER_DATA_KEY = 'finops_user_uploaded_files';

// Dosya kaydet (geliştirilmiş)
export async function saveUploadedFile(
  file: File,
  userEmail: string,
  rowCount?: number,
  columnCount?: number,
  preview?: string[],
  options?: {
    category?: DataCategory;
    branchId?: string;
    branchName?: string;
    description?: string;
    tags?: string[];
    expiresAt?: string;
    fileContent?: string;  // DEPRECATED: Use runtimeFileStore instead
  }
): Promise<UploadedFile> {
  // DO NOT store file content in localStorage
  // Content should be stored in runtimeFileStore by the caller

  const uploadedFile: UploadedFile = {
    id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    uploadedAt: new Date().toISOString(),
    userEmail,
    category: options?.category || 'other',
    branchId: options?.branchId,
    branchName: options?.branchName,
    description: options?.description,
    tags: options?.tags || [],
    rowCount,
    columnCount,
    preview,
    // fileContent is intentionally excluded from localStorage
    expiresAt: options?.expiresAt,
    isArchived: false,
  };

  try {
    const allFiles = getAllUploadedFiles();
    
    // ✅ ESKİ DOSYAYI GÜNCELLEREven dosya yeniden yükleniyorsa (özellikle fileContent eklemek için)
    const existingIndex = allFiles.findIndex(f => 
      f.fileName === uploadedFile.fileName && 
      f.userEmail === uploadedFile.userEmail
    );
    
    if (existingIndex !== -1) {
      // Eğer yeni dosyada fileContent varsa ve eskide yoksa, ESKİYİ SİL YENİYİ EKLE
      if (uploadedFile.fileContent && !allFiles[existingIndex].fileContent) {
        console.log('✅ Eski dosya güncelleniyor (fileContent ekleniyor):', uploadedFile.fileName);
        allFiles[existingIndex] = uploadedFile; // Eskiyi güncelle
      } else {
        console.warn('⚠️ Aynı dosya zaten var:', uploadedFile.fileName);
        return allFiles[existingIndex]; // Mevcut dosyayı döndür
      }
    } else {
      allFiles.push(uploadedFile); // Yeni dosya ekle
    }
    
    // ✅ BOYUT KONTROLÜ - localStorage sınırı ~5-10MB
    const dataStr = JSON.stringify(allFiles);
    const sizeInMB = new Blob([dataStr]).size / (1024 * 1024);
    
    if (sizeInMB > 8) {
      console.error('❌ localStorage sınırı aşıldı:', sizeInMB.toFixed(2), 'MB');
      throw new Error(
        `Dosya çok büyük! Toplam veri boyutu: ${sizeInMB.toFixed(2)}MB\n\n` +
        `localStorage maksimum 8MB destekler.\n\n` +
        `Çözüm:\n` +
        `1. Eski dosyaları silin\n` +
        `2. Daha küçük dosya yükleyin\n` +
        `3. Veya geliştiriciyle iletişime geçin (IndexedDB gerekli)`
      );
    }
    
    localStorage.setItem(USER_DATA_KEY, dataStr);
    
    console.log('✅ Veri kaydedildi:', uploadedFile.fileName, `[${uploadedFile.category}]`, `(${sizeInMB.toFixed(2)}MB)`);
    return uploadedFile;
  } catch (error) {
    console.error('❌ Veri kaydedilemedi:', error);
    
    // localStorage quota exceeded hatası
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new Error('Depolama alanı dolu! Lütfen eski dosyaları silin.');
    }
    
    throw error;
  }
}

// Dosya güncelle
export function updateUploadedFile(
  fileId: string,
  updates: Partial<UploadedFile>
): boolean {
  try {
    const allFiles = getAllUploadedFiles();
    const fileIndex = allFiles.findIndex(f => f.id === fileId);
    
    if (fileIndex === -1) {
      console.error('❌ Dosya bulunamadı:', fileId);
      return false;
    }
    
    allFiles[fileIndex] = { ...allFiles[fileIndex], ...updates };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(allFiles));
    
    console.log('Veri guncellendi:', fileId);
    return true;
  } catch (error) {
    console.error('❌ Veri güncellenemedi:', error);
    return false;
  }
}

// Tüm dosyaları getir
export function getAllUploadedFiles(): UploadedFile[] {
  try {
    const stored = localStorage.getItem(USER_DATA_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Kullanıcıya ait dosyaları getir
export function getUserUploadedFiles(userEmail: string, includeArchived = false): UploadedFile[] {
  const allFiles = getAllUploadedFiles();
  const userFiles = allFiles.filter(f => f.userEmail.toLowerCase() === userEmail.toLowerCase());
  
  if (!includeArchived) {
    return userFiles.filter(f => !f.isArchived);
  }
  
  return userFiles;
}

// Kategoriye göre dosyaları getir
export function getFilesByCategory(
  userEmail: string,
  category: DataCategory,
  includeArchived = false
): UploadedFile[] {
  const userFiles = getUserUploadedFiles(userEmail, includeArchived);
  return userFiles.filter(f => f.category === category);
}

// Şubeye göre dosyaları getir
export function getFilesByBranch(
  userEmail: string,
  branchId: string,
  includeArchived = false
): UploadedFile[] {
  const userFiles = getUserUploadedFiles(userEmail, includeArchived);
  return userFiles.filter(f => f.branchId === branchId);
}

// Kullanıcının şubelerini listele
export function getUserBranches(userEmail: string): Array<{ id: string; name: string; count: number }> {
  const userFiles = getUserUploadedFiles(userEmail, false);
  const branches = new Map<string, { id: string; name: string; count: number }>();
  
  userFiles.forEach(file => {
    if (file.branchId && file.branchName) {
      const existing = branches.get(file.branchId);
      if (existing) {
        existing.count++;
      } else {
        branches.set(file.branchId, {
          id: file.branchId,
          name: file.branchName,
          count: 1,
        });
      }
    }
  });
  
  return Array.from(branches.values());
}

// Kategori istatistikleri
export function getCategoryStats(userEmail: string): Record<DataCategory, number> {
  const userFiles = getUserUploadedFiles(userEmail, false);
  const stats: Record<string, number> = {};
  
  Object.keys(DATA_CATEGORIES).forEach(cat => {
    stats[cat] = 0;
  });
  
  userFiles.forEach(file => {
    stats[file.category] = (stats[file.category] || 0) + 1;
  });
  
  return stats as Record<DataCategory, number>;
}

// Dosyayı arşivle/arşivden çıkar
export function toggleArchiveFile(fileId: string): boolean {
  try {
    const allFiles = getAllUploadedFiles();
    const file = allFiles.find(f => f.id === fileId);
    
    if (!file) return false;
    
    file.isArchived = !file.isArchived;
    file.archivedAt = file.isArchived ? new Date().toISOString() : undefined;
    
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(allFiles));
    console.log(file.isArchived ? 'Arsivlendi:' : 'Arsivden cikarildi:', file.fileName);
    return true;
  } catch (error) {
    console.error('❌ Arşiv durumu değiştirilemedi:', error);
    return false;
  }
}

// Dosya sil
export function deleteUploadedFile(fileId: string): boolean {
  try {
    const allFiles = getAllUploadedFiles();
    const filtered = allFiles.filter(f => f.id !== fileId);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(filtered));
    console.log('Veri silindi:', fileId);
    return true;
  } catch (error) {
    console.error('❌ Veri silinemedi:', error);
    return false;
  }
}

// Kullanıcının tüm verilerini sil
export function deleteAllUserFiles(userEmail: string): boolean {
  try {
    const allFiles = getAllUploadedFiles();
    const filtered = allFiles.filter(f => f.userEmail.toLowerCase() !== userEmail.toLowerCase());
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(filtered));
    console.log('Kullanicinin tum verileri silindi:', userEmail);
    return true;
  } catch (error) {
    console.error('❌ Veriler silinemedi:', error);
    return false;
  }
}

// Arşivlenmiş dosyaları temizle
export function cleanupArchivedFiles(userEmail: string, olderThanDays = 30): number {
  try {
    const allFiles = getAllUploadedFiles();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    
    const before = allFiles.length;
    const filtered = allFiles.filter(f => {
      if (f.userEmail.toLowerCase() !== userEmail.toLowerCase()) return true;
      if (!f.isArchived) return true;
      if (!f.archivedAt) return true;
      
      const archivedDate = new Date(f.archivedAt);
      return archivedDate > cutoffDate;
    });
    
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(filtered));
    const deleted = before - filtered.length;
    
    if (deleted > 0) {
      console.log(`${deleted} arsiv dosyasi temizlendi (>${olderThanDays} gun)`);
    }
    
    return deleted;
  } catch (error) {
    console.error('❌ Arşiv temizlenemedi:', error);
    return 0;
  }
}

// Süresi dolmuş dosyaları temizle
export function cleanupExpiredFiles(): number {
  try {
    const allFiles = getAllUploadedFiles();
    const now = new Date();
    
    const before = allFiles.length;
    const filtered = allFiles.filter(f => {
      if (!f.expiresAt) return true;
      const expiryDate = new Date(f.expiresAt);
      return expiryDate > now;
    });
    
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(filtered));
    const deleted = before - filtered.length;
    
    if (deleted > 0) {
      console.log(`${deleted} suresi dolmus dosya temizlendi`);
    }
    
    return deleted;
  } catch (error) {
    console.error('❌ Süresi dolmuş dosyalar temizlenemedi:', error);
    return 0;
  }
}
