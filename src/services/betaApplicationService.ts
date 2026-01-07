/**
 * Beta Partner Başvuru Yönetim Servisi
 */

import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  BetaApplication, 
  BetaApplicationFormData, 
  BETA_APPLICATIONS_COLLECTION,
  ApplicationSource,
  ApplicationStatus
} from '../types/betaApplication';

/**
 * Yeni başvuru oluştur (kullanıcı başvurusu)
 */
export async function createUserApplication(data: BetaApplicationFormData): Promise<string> {
  const application: Omit<BetaApplication, 'id'> = {
    ...data,
    status: 'pending',
    source: 'user',
    appliedAt: new Date().toISOString(),
    approvalEmailSent: false
  };

  const docRef = await addDoc(collection(db, BETA_APPLICATIONS_COLLECTION), application);
  return docRef.id;
}

/**
 * Admin tarafından teklif oluştur (outbound)
 */
export async function createAdminOffer(
  data: BetaApplicationFormData,
  adminId: string
): Promise<string> {
  const application: Omit<BetaApplication, 'id'> = {
    ...data,
    status: 'pending',
    source: 'admin',
    appliedAt: new Date().toISOString(),
    reviewedBy: adminId,
    adminNotes: 'Admin tarafından teklif edildi',
    approvalEmailSent: false
  };

  const docRef = await addDoc(collection(db, BETA_APPLICATIONS_COLLECTION), application);
  return docRef.id;
}

/**
 * Tüm başvuruları getir
 */
export async function getAllApplications(): Promise<BetaApplication[]> {
  const q = query(
    collection(db, BETA_APPLICATIONS_COLLECTION),
    orderBy('appliedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as BetaApplication));
}

/**
 * Belirli bir duruma göre başvuruları getir
 */
export async function getApplicationsByStatus(status: ApplicationStatus): Promise<BetaApplication[]> {
  const q = query(
    collection(db, BETA_APPLICATIONS_COLLECTION),
    where('status', '==', status),
    orderBy('appliedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as BetaApplication));
}

/**
 * Başvuruyu onayla
 */
export async function approveApplication(
  applicationId: string,
  adminId: string,
  userId?: string
): Promise<void> {
  const docRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
  
  await updateDoc(docRef, {
    status: 'approved',
    reviewedAt: new Date().toISOString(),
    reviewedBy: adminId,
    userId: userId || null
  });
}

/**
 * Başvuruyu reddet
 */
export async function rejectApplication(
  applicationId: string,
  adminId: string,
  reason?: string
): Promise<void> {
  const docRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
  
  await updateDoc(docRef, {
    status: 'rejected',
    reviewedAt: new Date().toISOString(),
    reviewedBy: adminId,
    adminNotes: reason || 'Reddedildi'
  });
}

/**
 * Onay e-postası gönderildi olarak işaretle
 */
export async function markApprovalEmailSent(applicationId: string): Promise<void> {
  const docRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
  
  await updateDoc(docRef, {
    approvalEmailSent: true,
    approvalEmailSentAt: new Date().toISOString()
  });
}

/**
 * Başvuru güncelle (admin notları vb.)
 */
export async function updateApplication(
  applicationId: string,
  updates: Partial<BetaApplication>
): Promise<void> {
  const docRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
  await updateDoc(docRef, updates);
}

/**
 * Tek bir başvuruyu getir
 */
export async function getApplication(applicationId: string): Promise<BetaApplication | null> {
  const docRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as BetaApplication;
  }
  
  return null;
}

/**
 * Bekleyen başvuru sayısını getir
 */
export async function getPendingApplicationsCount(): Promise<number> {
  const q = query(
    collection(db, BETA_APPLICATIONS_COLLECTION),
    where('status', '==', 'pending')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
}

