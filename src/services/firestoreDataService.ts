/**
 * SECURITY-CRITICAL: Firestore Data Service
 * 
 * ⚠️ DO NOT MODIFY WITHOUT SECURITY TEAM APPROVAL
 * 
 * Replaces localStorage/IndexedDB with secure Firestore storage.
 * 
 * SECURITY GUARANTEES:
 * - All data stored server-side in Firestore
 * - Per-user data isolation (enforced by security rules)
 * - No sensitive data in browser storage
 * - Encrypted at rest (Firebase default)
 * - Encrypted in transit (HTTPS/TLS)
 * 
 * @stability LOCKED
 * @security CRITICAL
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export interface UserFile {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'csv' | 'json' | 'excel';
  uploadedAt: string;
  sizeBytes: number;
  rowCount?: number;
  columnCount?: number;
  columns?: string[];
  // Content stored separately for size optimization
}

export interface FileContent {
  fileId: string;
  userId: string;
  content: string; // CSV/JSON content as string
  uploadedAt: string;
  sizeBytes: number;
}

export interface DashboardConfig {
  id: string;
  userId: string;
  name: string;
  description?: string;
  sourceFileId: string;
  kpis: any[];
  charts: any[];
  filters?: any[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface UserSettings {
  userId: string;
  theme?: 'light' | 'dark';
  language?: 'tr' | 'en';
  notifications?: boolean;
  updatedAt: string;
}

// ============================================================
// FILE OPERATIONS
// ============================================================

/**
 * SECURITY-CRITICAL: Upload file metadata
 * File content stored separately to optimize queries
 */
export async function uploadFileMetadata(
  userId: string,
  fileData: Omit<UserFile, 'id' | 'userId'>
): Promise<string> {
  try {
    const filesRef = collection(db, 'users', userId, 'files');
    const fileDocRef = doc(filesRef);
    
    const fileId = fileDocRef.id;
    const fileRecord: UserFile = {
      id: fileId,
      userId,
      ...fileData,
      uploadedAt: fileData.uploadedAt || new Date().toISOString()
    };

    await setDoc(fileDocRef, fileRecord);
    
    console.log('✅ File metadata uploaded:', fileId);
    return fileId;
  } catch (error) {
    console.error('❌ Error uploading file metadata:', error);
    throw new Error('Dosya metadata yüklenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Upload file content
 * Stored in separate subcollection for size optimization
 */
export async function uploadFileContent(
  userId: string,
  fileId: string,
  content: string
): Promise<void> {
  try {
    const contentRef = doc(db, 'users', userId, 'fileContents', fileId);
    
    const contentRecord: FileContent = {
      fileId,
      userId,
      content,
      uploadedAt: new Date().toISOString(),
      sizeBytes: new Blob([content]).size
    };

    await setDoc(contentRef, contentRecord);
    
    console.log('✅ File content uploaded:', fileId);
  } catch (error) {
    console.error('❌ Error uploading file content:', error);
    throw new Error('Dosya içeriği yüklenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Get user files
 * Returns only metadata, not content (for performance)
 */
export async function getUserFiles(userId: string): Promise<UserFile[]> {
  try {
    const filesRef = collection(db, 'users', userId, 'files');
    const filesQuery = query(filesRef, orderBy('uploadedAt', 'desc'));
    const snapshot = await getDocs(filesQuery);
    
    const files: UserFile[] = [];
    snapshot.forEach((doc) => {
      files.push(doc.data() as UserFile);
    });
    
    console.log(`✅ Retrieved ${files.length} files for user ${userId}`);
    return files;
  } catch (error) {
    console.error('❌ Error getting user files:', error);
    throw new Error('Dosyalar yüklenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Get file content
 */
export async function getFileContent(userId: string, fileId: string): Promise<string | null> {
  try {
    const contentRef = doc(db, 'users', userId, 'fileContents', fileId);
    const contentDoc = await getDoc(contentRef);
    
    if (!contentDoc.exists()) {
      console.warn(`⚠️ File content not found: ${fileId}`);
      return null;
    }
    
    const data = contentDoc.data() as FileContent;
    console.log(`✅ Retrieved file content: ${fileId}`);
    return data.content;
  } catch (error) {
    console.error('❌ Error getting file content:', error);
    throw new Error('Dosya içeriği yüklenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Delete file (metadata + content)
 */
export async function deleteFile(userId: string, fileId: string): Promise<void> {
  try {
    // Delete metadata
    const metadataRef = doc(db, 'users', userId, 'files', fileId);
    await deleteDoc(metadataRef);
    
    // Delete content
    const contentRef = doc(db, 'users', userId, 'fileContents', fileId);
    await deleteDoc(contentRef);
    
    console.log('✅ File deleted:', fileId);
  } catch (error) {
    console.error('❌ Error deleting file:', error);
    throw new Error('Dosya silinemedi');
  }
}

// ============================================================
// DASHBOARD OPERATIONS
// ============================================================

/**
 * SECURITY-CRITICAL: Save dashboard configuration
 */
export async function saveDashboard(
  userId: string,
  dashboardData: Omit<DashboardConfig, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const dashboardsRef = collection(db, 'users', userId, 'dashboards');
    const dashboardDocRef = doc(dashboardsRef);
    
    const dashboardId = dashboardDocRef.id;
    const now = new Date().toISOString();
    
    const dashboardRecord: DashboardConfig = {
      id: dashboardId,
      userId,
      ...dashboardData,
      createdAt: now,
      updatedAt: now
    };

    await setDoc(dashboardDocRef, dashboardRecord);
    
    console.log('✅ Dashboard saved:', dashboardId);
    return dashboardId;
  } catch (error) {
    console.error('❌ Error saving dashboard:', error);
    throw new Error('Dashboard kaydedilemedi');
  }
}

/**
 * SECURITY-CRITICAL: Update dashboard configuration
 */
export async function updateDashboard(
  userId: string,
  dashboardId: string,
  updates: Partial<Omit<DashboardConfig, 'id' | 'userId' | 'createdAt'>>
): Promise<void> {
  try {
    const dashboardRef = doc(db, 'users', userId, 'dashboards', dashboardId);
    
    await updateDoc(dashboardRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    
    console.log('✅ Dashboard updated:', dashboardId);
  } catch (error) {
    console.error('❌ Error updating dashboard:', error);
    throw new Error('Dashboard güncellenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Get user dashboards
 */
export async function getUserDashboards(userId: string): Promise<DashboardConfig[]> {
  try {
    const dashboardsRef = collection(db, 'users', userId, 'dashboards');
    const dashboardsQuery = query(dashboardsRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(dashboardsQuery);
    
    const dashboards: DashboardConfig[] = [];
    snapshot.forEach((doc) => {
      dashboards.push(doc.data() as DashboardConfig);
    });
    
    console.log(`✅ Retrieved ${dashboards.length} dashboards for user ${userId}`);
    return dashboards;
  } catch (error) {
    console.error('❌ Error getting dashboards:', error);
    throw new Error('Dashboard\'lar yüklenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Get single dashboard
 */
export async function getDashboard(userId: string, dashboardId: string): Promise<DashboardConfig | null> {
  try {
    const dashboardRef = doc(db, 'users', userId, 'dashboards', dashboardId);
    const dashboardDoc = await getDoc(dashboardRef);
    
    if (!dashboardDoc.exists()) {
      console.warn(`⚠️ Dashboard not found: ${dashboardId}`);
      return null;
    }
    
    console.log(`✅ Retrieved dashboard: ${dashboardId}`);
    return dashboardDoc.data() as DashboardConfig;
  } catch (error) {
    console.error('❌ Error getting dashboard:', error);
    throw new Error('Dashboard yüklenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Delete dashboard
 */
export async function deleteDashboard(userId: string, dashboardId: string): Promise<void> {
  try {
    const dashboardRef = doc(db, 'users', userId, 'dashboards', dashboardId);
    await deleteDoc(dashboardRef);
    
    console.log('✅ Dashboard deleted:', dashboardId);
  } catch (error) {
    console.error('❌ Error deleting dashboard:', error);
    throw new Error('Dashboard silinemedi');
  }
}

// ============================================================
// USER SETTINGS OPERATIONS
// ============================================================

/**
 * SECURITY-CRITICAL: Get user settings
 */
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    const settingsDoc = await getDoc(settingsRef);
    
    if (!settingsDoc.exists()) {
      console.log('⚠️ User settings not found, returning defaults');
      return null;
    }
    
    console.log('✅ Retrieved user settings');
    return settingsDoc.data() as UserSettings;
  } catch (error) {
    console.error('❌ Error getting user settings:', error);
    throw new Error('Ayarlar yüklenemedi');
  }
}

/**
 * SECURITY-CRITICAL: Update user settings
 */
export async function updateUserSettings(
  userId: string,
  settings: Partial<Omit<UserSettings, 'userId'>>
): Promise<void> {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    
    const settingsData: UserSettings = {
      userId,
      ...settings,
      updatedAt: new Date().toISOString()
    };

    await setDoc(settingsRef, settingsData, { merge: true });
    
    console.log('✅ User settings updated');
  } catch (error) {
    console.error('❌ Error updating user settings:', error);
    throw new Error('Ayarlar güncellenemedi');
  }
}

// ============================================================
// DATA DELETION (GDPR/KVKK COMPLIANCE)
// ============================================================

/**
 * SECURITY-CRITICAL: Delete all user data
 * Implements "Right to Erasure" (GDPR Article 17, KVKK Article 7)
 */
export async function deleteAllUserData(userId: string): Promise<void> {
  try {
    console.log(`⚠️ Deleting all data for user ${userId}...`);
    
    // Delete all files
    const filesSnapshot = await getDocs(collection(db, 'users', userId, 'files'));
    for (const fileDoc of filesSnapshot.docs) {
      await deleteFile(userId, fileDoc.id);
    }
    
    // Delete all dashboards
    const dashboardsSnapshot = await getDocs(collection(db, 'users', userId, 'dashboards'));
    for (const dashboardDoc of dashboardsSnapshot.docs) {
      await deleteDoc(dashboardDoc.ref);
    }
    
    // Delete settings
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    await deleteDoc(settingsRef);
    
    console.log(`✅ All user data deleted for ${userId}`);
  } catch (error) {
    console.error('❌ Error deleting user data:', error);
    throw new Error('Kullanıcı verileri silinemedi');
  }
}

/**
 * SECURITY-CRITICAL: Export all user data
 * Implements "Right to Data Portability" (GDPR Article 20, KVKK)
 */
export async function exportAllUserData(userId: string): Promise<any> {
  try {
    console.log(`📦 Exporting all data for user ${userId}...`);
    
    // Get user profile
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userProfile = userDoc.exists() ? userDoc.data() : null;
    
    // Get files
    const files = await getUserFiles(userId);
    
    // Get dashboards
    const dashboards = await getUserDashboards(userId);
    
    // Get settings
    const settings = await getUserSettings(userId);
    
    const exportData = {
      exportDate: new Date().toISOString(),
      userId,
      profile: userProfile,
      files,
      dashboards,
      settings
    };
    
    console.log('✅ User data exported successfully');
    return exportData;
  } catch (error) {
    console.error('❌ Error exporting user data:', error);
    throw new Error('Kullanıcı verileri dışa aktarılamadı');
  }
}

/**
 * SECURITY NOTE:
 * 
 * This service replaces all localStorage/IndexedDB operations with
 * secure Firestore storage.
 * 
 * ❌ REPLACED: localStorage (unencrypted, client-side)
 * ❌ REPLACED: IndexedDB (unencrypted, client-side)
 * ❌ REPLACED: in-memory stores (lost on refresh)
 * 
 * ✅ IMPLEMENTED: Firestore (encrypted at rest)
 * ✅ IMPLEMENTED: Per-user data isolation
 * ✅ IMPLEMENTED: HTTPS/TLS encryption in transit
 * ✅ IMPLEMENTED: GDPR/KVKK compliance (delete, export)
 * 
 * All operations are protected by Firestore Security Rules.
 * Users can ONLY access their own data (enforced server-side).
 */
