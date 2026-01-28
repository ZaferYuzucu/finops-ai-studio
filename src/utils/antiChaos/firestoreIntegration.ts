/**
 * 🔄 FIRESTORE INTEGRATION - Anti-Chaos Katmanı 7
 * 
 * Firestore = TEK SOURCE OF TRUTH
 * IndexedDB = SADECE CLIENT CACHE
 * LocalStorage = SADECE UI state (geçici)
 * 
 * Büyük dosyalar Firebase Storage'a kaydedilir.
 * Firestore'da sadece metadata + checksum.
 */

import { db, storage } from '../../firebase';
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { ShieldedCSVData } from './inputShield';
import { FinalDashboard } from './failSoftDashboard';
import { DashboardDiagnosis } from './selfDiagnosis';

// Storage initialization moved to try-catch above

export interface FileMetadata {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'csv' | 'xlsx';
  fileSize: number;
  uploadedAt: string;
  updatedAt: string;
  checksum: string; // MD5 hash
  storagePath?: string; // Firebase Storage path (büyük dosyalar için)
  rowCount: number;
  columnCount: number;
  columnProfiles: Array<{
    columnName: string;
    detectedType: string;
    confidenceScore: number;
  }>;
  metadata: {
    delimiter: string;
    locale: string;
    decimalSeparator: string;
    confidenceScore: number;
  };
}

export interface DashboardMetadata {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  fileId: string; // Reference to FileMetadata
  config: any; // DashboardConfig JSON
  diagnosis?: DashboardDiagnosis;
  isPublic: boolean;
}

/**
 * Dosya içeriğini Firebase Storage'a kaydet (büyük dosyalar için)
 */
export async function uploadFileToStorage(
  userId: string,
  fileId: string,
  content: string
): Promise<string> {
  const storageRef = ref(storage, `users/${userId}/files/${fileId}.csv`);
  const blob = new Blob([content], { type: 'text/csv' });
  
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
}

/**
 * Dosya metadata'sını Firestore'a kaydet
 */
export async function saveFileMetadata(
  userId: string,
  fileMetadata: Omit<FileMetadata, 'id' | 'userId' | 'uploadedAt' | 'updatedAt'>
): Promise<string> {
  const filesRef = collection(db, 'users', userId, 'files');
  const fileDocRef = doc(filesRef);
  const fileId = fileDocRef.id;
  
  const now = new Date().toISOString();
  const metadata: FileMetadata = {
    ...fileMetadata,
    id: fileId,
    userId,
    uploadedAt: now,
    updatedAt: now,
  };
  
  await setDoc(fileDocRef, {
    ...metadata,
    uploadedAt: Timestamp.fromDate(new Date(metadata.uploadedAt)),
    updatedAt: Timestamp.fromDate(new Date(metadata.updatedAt)),
  });
  
  return fileId;
}

/**
 * Dosya içeriğini Firestore'a kaydet (küçük dosyalar için) veya Storage'a (büyük dosyalar için)
 */
export async function saveFileContent(
  userId: string,
  fileId: string,
  content: string,
  data: ShieldedCSVData
): Promise<void> {
  const MAX_FIRESTORE_SIZE = 1 * 1024 * 1024; // 1MB
  
  if (content.length > MAX_FIRESTORE_SIZE) {
    // Büyük dosya → Firebase Storage
    const storagePath = await uploadFileToStorage(userId, fileId, content);
    
    // Storage path'i metadata'ya ekle
    const fileRef = doc(db, 'users', userId, 'files', fileId);
    await updateDoc(fileRef, {
      storagePath,
      updatedAt: Timestamp.now(),
    });
  } else {
    // Küçük dosya → Firestore subcollection
    const contentRef = doc(db, 'users', userId, 'files', fileId, 'content', 'data');
    await setDoc(contentRef, {
      content,
      updatedAt: Timestamp.now(),
    });
  }
}

/**
 * Dosya içeriğini Firestore'dan oku
 */
export async function getFileContent(
  userId: string,
  fileId: string
): Promise<string | null> {
  const fileRef = doc(db, 'users', userId, 'files', fileId);
  const fileDoc = await getDoc(fileRef);
  
  if (!fileDoc.exists()) {
    return null;
  }
  
  const fileData = fileDoc.data() as FileMetadata;
  
  // Storage'dan mı yoksa Firestore'dan mı?
  if (fileData.storagePath) {
    // Storage'dan oku
    const response = await fetch(fileData.storagePath);
    return await response.text();
  } else {
    // Firestore'dan oku
    const contentRef = doc(db, 'users', userId, 'files', fileId, 'content', 'data');
    const contentDoc = await getDoc(contentRef);
    
    if (!contentDoc.exists()) {
      return null;
    }
    
    return contentDoc.data().content as string;
  }
}

/**
 * Dashboard'ı Firestore'a kaydet
 */
export async function saveDashboard(
  userId: string,
  dashboard: FinalDashboard,
  fileId: string,
  diagnosis?: DashboardDiagnosis
): Promise<string> {
  const dashboardsRef = collection(db, 'users', userId, 'dashboards');
  const dashboardDocRef = doc(dashboardsRef);
  const dashboardId = dashboardDocRef.id;
  
  const now = new Date().toISOString();
  const dashboardMetadata: DashboardMetadata = {
    id: dashboardId,
    userId,
    title: dashboard.config.title,
    subtitle: dashboard.config.subtitle,
    icon: dashboard.config.icon,
    createdAt: now,
    updatedAt: now,
    fileId,
    config: dashboard.config,
    diagnosis,
    isPublic: false,
  };
  
  await setDoc(dashboardDocRef, {
    ...dashboardMetadata,
    createdAt: Timestamp.fromDate(new Date(dashboardMetadata.createdAt)),
    updatedAt: Timestamp.fromDate(new Date(dashboardMetadata.updatedAt)),
  });
  
  return dashboardId;
}

/**
 * Kullanıcının tüm dosyalarını getir
 */
export async function getUserFiles(userId: string): Promise<FileMetadata[]> {
  const filesRef = collection(db, 'users', userId, 'files');
  const filesQuery = query(filesRef, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(filesQuery);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      uploadedAt: data.uploadedAt?.toDate().toISOString() || '',
      updatedAt: data.updatedAt?.toDate().toISOString() || '',
    } as FileMetadata;
  });
}

/**
 * Kullanıcının tüm dashboard'larını getir
 */
export async function getUserDashboards(userId: string): Promise<DashboardMetadata[]> {
  const dashboardsRef = collection(db, 'users', userId, 'dashboards');
  const dashboardsQuery = query(dashboardsRef, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(dashboardsQuery);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() || '',
      updatedAt: data.updatedAt?.toDate().toISOString() || '',
    } as DashboardMetadata;
  });
}

/**
 * Dosyayı sil (metadata + content + storage)
 */
export async function deleteFile(userId: string, fileId: string): Promise<void> {
  // Metadata'yı oku
  const fileRef = doc(db, 'users', userId, 'files', fileId);
  const fileDoc = await getDoc(fileRef);
  
  if (!fileDoc.exists()) {
    throw new Error('Dosya bulunamadı');
  }
  
  const fileData = fileDoc.data() as FileMetadata;
  
  // Storage'dan sil (eğer varsa)
  if (fileData.storagePath) {
    const storageRef = ref(storage, fileData.storagePath);
    await deleteObject(storageRef);
  }
  
  // Firestore'dan sil
  await deleteDoc(fileRef);
  
  // Content subcollection'ı sil
  const contentRef = doc(db, 'users', userId, 'files', fileId, 'content', 'data');
  const contentDoc = await getDoc(contentRef);
  if (contentDoc.exists()) {
    await deleteDoc(contentRef);
  }
}

/**
 * Checksum hesapla (basit MD5 benzeri)
 */
export function calculateChecksum(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}
