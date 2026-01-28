import { db, storage } from '../firebase';
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, orderBy, Timestamp, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { runAntiChaosPipeline } from '../utils/antiChaos';
import { fileStorage } from '../utils/fileStorage';

const MAX_FIRESTORE_SIZE = 700 * 1024; // 700KB

export interface PersistedFileMetadata {
  id: string;
  userId: string;
  name: string;
  size: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  delimiter?: string;
  encoding?: string;
  schema?: {
    headers: string[];
    columnTypes: Record<string, string>;
  };
  sampleRows?: any[][];
  status: 'pending' | 'ready' | 'error';
  storagePath?: string;
  downloadURL?: string;
  checksum?: string;
  contentInFirestore?: boolean; // true if content stored in Firestore doc
}

export interface PersistedDashboard {
  id: string;
  userId: string;
  name: string;
  config: any; // JSON only, no React components
  fileId?: string;
  diagnosis?: {
    confidenceScore: number;
    riskFlags: Array<{ code: string; severity: string; message: string }>;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  previousConfig?: any[]; // max 3
}

export async function persistFile(
  userId: string,
  file: File,
  content: string
): Promise<string> {
  const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Run anti-chaos to get schema
  let schema: any = {};
  let sampleRows: any[][] = [];
  let delimiter = ',';
  
  try {
    const antiChaosResult = await runAntiChaosPipeline(file);
    if (antiChaosResult.success && antiChaosResult.data) {
      schema = {
        headers: antiChaosResult.data.headers,
        columnTypes: Object.fromEntries(
          (antiChaosResult.columnProfiles || []).map(p => [p.columnName, p.detectedType])
        ),
      };
      sampleRows = antiChaosResult.data.rows.slice(0, 10).map(row =>
        antiChaosResult.data.headers.map(h => row[h] || '')
      );
      delimiter = antiChaosResult.data.metadata.delimiter || ',';
    }
  } catch (e) {
    console.warn('Anti-chaos failed during persist, using basic schema', e);
    schema = { headers: [], columnTypes: {} };
  }
  
  // Determine storage location
  const contentSize = new Blob([content]).size;
  let storagePath: string | undefined;
  let downloadURL: string | undefined;
  let contentInFirestore = false;
  
  if (contentSize > MAX_FIRESTORE_SIZE) {
    // Store in Firebase Storage
    const storageRef = ref(storage, `users/${userId}/files/${fileId}.csv`);
    const blob = new Blob([content], { type: 'text/csv' });
    await uploadBytes(storageRef, blob);
    downloadURL = await getDownloadURL(storageRef);
    storagePath = `users/${userId}/files/${fileId}.csv`;
  } else {
    // Store in Firestore doc
    contentInFirestore = true;
  }
  
  // Save metadata to Firestore
  const fileRef = doc(db, 'users', userId, 'files', fileId);
  const metadata: Omit<PersistedFileMetadata, 'id' | 'userId'> = {
    name: file.name,
    size: file.size,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
    delimiter,
    encoding: 'UTF-8',
    schema,
    sampleRows,
    status: 'ready',
    storagePath,
    downloadURL,
    contentInFirestore,
  };
  
  if (contentInFirestore) {
    // Store content in the same doc
    await setDoc(fileRef, {
      ...metadata,
      content,
    });
  } else {
    await setDoc(fileRef, metadata);
  }
  
  // Cache in IndexedDB
  await fileStorage.saveFile(fileId, content, file.name, userId);
  
  return fileId;
}

export async function getFileContent(userId: string, fileId: string): Promise<string | null> {
  try {
    // Try IndexedDB first (cache)
    const cached = await fileStorage.getFile(fileId);
    if (cached) {
      // Sync from Firestore in background
      syncFileFromFirestore(userId, fileId).catch(() => {});
      return cached;
    }
    
    // Load from Firestore
    return await syncFileFromFirestore(userId, fileId);
  } catch (e) {
    console.warn('getFileContent error:', e);
    // Fallback to IndexedDB only
    return await fileStorage.getFile(fileId);
  }
}

async function syncFileFromFirestore(userId: string, fileId: string): Promise<string | null> {
  try {
    const fileRef = doc(db, 'users', userId, 'files', fileId);
    const fileDoc = await getDoc(fileRef);
    
    if (!fileDoc.exists()) return null;
    
    const data = fileDoc.data() as any;
    
    let content: string;
    
    if (data.contentInFirestore && data.content) {
      // Content is in Firestore doc
      content = data.content as string;
    } else if (data.downloadURL) {
      // Content is in Storage
      const response = await fetch(data.downloadURL);
      if (!response.ok) return null;
      content = await response.text();
    } else {
      return null;
    }
    
    // Cache in IndexedDB
    await fileStorage.saveFile(fileId, content, data.name || 'file.csv', userId);
    
    return content;
  } catch (e) {
    console.warn('syncFileFromFirestore error:', e);
    return null;
  }
}

export async function getUserFiles(userId: string): Promise<PersistedFileMetadata[]> {
  try {
    const filesRef = collection(db, 'users', userId, 'files');
    const q = query(filesRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId,
        name: data.name || '',
        size: data.size || 0,
        createdAt: data.createdAt || Timestamp.now(),
        updatedAt: data.updatedAt || Timestamp.now(),
        delimiter: data.delimiter,
        encoding: data.encoding,
        schema: data.schema,
        sampleRows: data.sampleRows,
        status: data.status || 'ready',
        storagePath: data.storagePath,
        downloadURL: data.downloadURL,
        checksum: data.checksum,
        contentInFirestore: data.contentInFirestore,
        columnCount: data.schema?.headers?.length || 0,
      } as PersistedFileMetadata;
    });
  } catch (e) {
    console.warn('getUserFiles error:', e);
    return [];
  }
}

export async function persistDashboard(
  userId: string,
  dashboardId: string | null,
  name: string,
  config: any,
  fileId?: string,
  diagnosis?: any
): Promise<string> {
  const dashboardsRef = collection(db, 'users', userId, 'dashboards');
  
  if (dashboardId) {
    // Update existing
    const dashRef = doc(db, 'users', userId, 'dashboards', dashboardId);
    const existingDoc = await getDoc(dashRef);
    
    let previousConfig: any[] = [];
    if (existingDoc.exists()) {
      const existing = existingDoc.data() as PersistedDashboard;
      previousConfig = existing.previousConfig || [];
      if (previousConfig.length >= 3) {
        previousConfig = previousConfig.slice(-2); // Keep last 2
      }
      previousConfig.push(existing.config);
    }
    
    await updateDoc(dashRef, {
      name,
      config,
      fileId: fileId || null,
      diagnosis: diagnosis || null,
      updatedAt: serverTimestamp(),
      previousConfig: previousConfig.length > 0 ? previousConfig : null,
    });
    
    return dashboardId;
  } else {
    // Create new
    const dashRef = doc(dashboardsRef);
    const newId = dashRef.id;
    
    await setDoc(dashRef, {
      id: newId,
      userId,
      name,
      config,
      fileId: fileId || null,
      diagnosis: diagnosis || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return newId;
  }
}

export async function getUserDashboards(userId: string): Promise<PersistedDashboard[]> {
  const dashboardsRef = collection(db, 'users', userId, 'dashboards');
  const q = query(dashboardsRef, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    userId,
    ...doc.data(),
  } as PersistedDashboard));
}

export async function getDashboard(userId: string, dashboardId: string): Promise<PersistedDashboard | null> {
  const dashRef = doc(db, 'users', userId, 'dashboards', dashboardId);
  const dashDoc = await getDoc(dashRef);
  
  if (!dashDoc.exists()) return null;
  
  return {
    id: dashDoc.id,
    userId,
    ...dashDoc.data(),
  } as PersistedDashboard;
}

export async function deleteDashboard(userId: string, dashboardId: string): Promise<boolean> {
  try {
    const dashRef = doc(db, 'users', userId, 'dashboards', dashboardId);
    await deleteDoc(dashRef);
    return true;
  } catch (e) {
    console.warn('deleteDashboard error:', e);
    return false;
  }
}

export async function migrateIndexedDBToFirestore(userId: string): Promise<void> {
  try {
    const indexedFiles = await fileStorage.getUserFiles(userId);
    
    for (const file of indexedFiles) {
      // Check if already in Firestore
      const fileRef = doc(db, 'users', userId, 'files', file.id);
      const exists = await getDoc(fileRef);
      
      if (!exists.exists() && file.content) {
        // Migrate
        const blob = new File([file.content], file.fileName, { type: 'text/csv' });
        await persistFile(userId, blob, file.content);
        console.log(`Migrated file: ${file.fileName}`);
      }
    }
  } catch (e) {
    console.warn('Migration failed:', e);
  }
}

/**
 * Yetim dosyaları temizle (admin-only)
 * Kullanıcı silindiğinde veya dosya hiçbir dashboard tarafından referans edilmediğinde
 */
export async function cleanupOrphanedFiles(userId: string): Promise<{ deleted: number; errors: number }> {
  let deleted = 0;
  let errors = 0;
  
  try {
    // Kullanıcının tüm dosyalarını getir
    const files = await getUserFiles(userId);
    
    // Kullanıcının tüm dashboard'larını getir
    const dashboards = await getUserDashboards(userId);
    const referencedFileIds = new Set<string>();
    
    dashboards.forEach(d => {
      if (d.fileId) {
        referencedFileIds.add(d.fileId);
      }
    });
    
    // Referans edilmeyen dosyaları sil
    for (const file of files) {
      if (!referencedFileIds.has(file.id)) {
        try {
          // Firestore metadata'yı sil
          const fileRef = doc(db, 'users', userId, 'files', file.id);
          await deleteDoc(fileRef);
          
          // Storage'dan dosyayı sil (varsa)
          if (file.storagePath) {
            const storageRef = ref(storage, file.storagePath);
            await deleteObject(storageRef).catch(() => {
              // Storage silme hatası kritik değil
            });
          }
          
          deleted++;
        } catch (e) {
          console.warn(`Failed to delete file ${file.id}:`, e);
          errors++;
        }
      }
    }
    
    return { deleted, errors };
  } catch (e) {
    console.error('cleanupOrphanedFiles error:', e);
    return { deleted, errors: errors + 1 };
  }
}

/**
 * Kullanıcı silindiğinde tüm verilerini temizle (admin-only)
 */
export async function cleanupUserData(userId: string): Promise<{ filesDeleted: number; dashboardsDeleted: number; errors: number }> {
  let filesDeleted = 0;
  let dashboardsDeleted = 0;
  let errors = 0;
  
  try {
    // Tüm dosyaları sil
    const files = await getUserFiles(userId);
    for (const file of files) {
      try {
        const fileRef = doc(db, 'users', userId, 'files', file.id);
        await deleteDoc(fileRef);
        
        if (file.storagePath) {
          const storageRef = ref(storage, file.storagePath);
          await deleteObject(storageRef).catch(() => {});
        }
        
        filesDeleted++;
      } catch (e) {
        console.warn(`Failed to delete file ${file.id}:`, e);
        errors++;
      }
    }
    
    // Tüm dashboard'ları sil
    const dashboards = await getUserDashboards(userId);
    for (const dash of dashboards) {
      try {
        await deleteDashboard(userId, dash.id);
        dashboardsDeleted++;
      } catch (e) {
        console.warn(`Failed to delete dashboard ${dash.id}:`, e);
        errors++;
      }
    }
    
    return { filesDeleted, dashboardsDeleted, errors };
  } catch (e) {
    console.error('cleanupUserData error:', e);
    return { filesDeleted, dashboardsDeleted, errors: errors + 1 };
  }
}
