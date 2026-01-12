// Kullanıcı verilerini localStorage'a kaydetme sistemi
// TODO: İleride Firestore'a migrate edilecek

// 📚 VERİ KÜTÜPHANESİ KATEGORİLERİ
export type DataCategory = 
  | 'financial'           // Finansal Veriler
  | 'cost-inventory'      // Maliyet ve Stok Verileri
  | 'cashflow'           // Nakit Akışı Verileri
  | 'budget-reporting'   // Bütçe ve Raporlama Verileri
  | 'hr-performance'     // İK/Çalışan Performans Verileri
  | 'branch'             // Şube Bazlı Veriler
  | 'other';             // Diğer

export const DATA_CATEGORIES = {
  financial: {
    id: 'financial',
    name: 'Finansal Veriler',
    icon: '💰',
    description: 'Gelir, gider, kar-zarar gibi finansal veriler',
    color: 'blue',
  },
  'cost-inventory': {
    id: 'cost-inventory',
    name: 'Maliyet ve Stok Verileri',
    icon: '📦',
    description: 'Ürün maliyetleri, stok takibi, envanter verileri',
    color: 'orange',
  },
  cashflow: {
    id: 'cashflow',
    name: 'Nakit Akışı Verileri',
    icon: '💵',
    description: 'Nakit giriş-çıkış, likidite analizi',
    color: 'green',
  },
  'budget-reporting': {
    id: 'budget-reporting',
    name: 'Bütçe ve Raporlama Verileri',
    icon: '📊',
    description: 'Bütçe planları, periyodik raporlar',
    color: 'purple',
  },
  'hr-performance': {
    id: 'hr-performance',
    name: 'İK/Çalışan Performans Verileri',
    icon: '👥',
    description: 'Personel verileri, performans metrikleri',
    color: 'pink',
  },
  branch: {
    id: 'branch',
    name: 'Şube Bazlı Veriler',
    icon: '🏢',
    description: 'Şube bazlı operasyonel veriler',
    color: 'indigo',
  },
  other: {
    id: 'other',
    name: 'Diğer',
    icon: '📁',
    description: 'Kategorize edilmemiş veriler',
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
  
  // Saklama ve arşiv
  expiresAt?: string;     // Otomatik silme tarihi (opsiyonel)
  isArchived?: boolean;   // Arşivlenmiş mi?
  archivedAt?: string;    // Arşivlenme tarihi
}

const USER_DATA_KEY = 'finops_user_uploaded_files';

// Dosya kaydet (geliştirilmiş)
export function saveUploadedFile(
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
  }
): UploadedFile {
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
    expiresAt: options?.expiresAt,
    isArchived: false,
  };

  try {
    const allFiles = getAllUploadedFiles();
    allFiles.push(uploadedFile);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(allFiles));
    
    console.log('✅ Veri kaydedildi:', uploadedFile.fileName, `[${uploadedFile.category}]`);
    return uploadedFile;
  } catch (error) {
    console.error('❌ Veri kaydedilemedi:', error);
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
    
    console.log('✅ Veri güncellendi:', fileId);
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
    console.log(file.isArchived ? '📦 Arşivlendi:' : '📂 Arşivden çıkarıldı:', file.fileName);
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
    console.log('✅ Veri silindi:', fileId);
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
    console.log('✅ Kullanıcının tüm verileri silindi:', userEmail);
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
      console.log(`✅ ${deleted} arşiv dosyası temizlendi (>${olderThanDays} gün)`);
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
      console.log(`✅ ${deleted} süresi dolmuş dosya temizlendi`);
    }
    
    return deleted;
  } catch (error) {
    console.error('❌ Süresi dolmuş dosyalar temizlenemedi:', error);
    return 0;
  }
}
