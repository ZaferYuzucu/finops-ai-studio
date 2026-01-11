/**
 * Beta Partner Başvuru Yönetim Servisi (Firestore)
 * localStorage → Firestore migration completed
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
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  BetaApplication, 
  BetaApplicationFormData, 
  ApplicationStatus,
  BETA_APPLICATIONS_COLLECTION
} from '../types/betaApplication';

// ---------------------------------------------------------------------------
// Demo / local fallback
// ---------------------------------------------------------------------------
const LS_KEY = 'finops_beta_applications';

function isPermissionError(error: any) {
  const code = error?.code;
  const msg = String(error?.message || '');
  return code === 'permission-denied' || msg.includes('Missing or insufficient permissions');
}

function safeParseJson<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readLocalApplications(): BetaApplication[] {
  if (typeof window === 'undefined') return [];
  return safeParseJson<BetaApplication[]>(window.localStorage.getItem(LS_KEY), []);
}

function writeLocalApplications(apps: BetaApplication[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LS_KEY, JSON.stringify(apps));
}

function upsertLocalApplication(app: BetaApplication) {
  const list = readLocalApplications();
  const idx = list.findIndex((a) => a.id === app.id);
  if (idx >= 0) list[idx] = app;
  else list.push(app);
  writeLocalApplications(list);
}

function updateLocalApplication(applicationId: string, patch: Partial<BetaApplication>) {
  const list = readLocalApplications();
  const idx = list.findIndex((a) => a.id === applicationId);
  if (idx < 0) return;
  list[idx] = { ...list[idx], ...patch } as BetaApplication;
  writeLocalApplications(list);
}

function makeLocalId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Yeni başvuru oluştur (kullanıcı başvurusu)
 */
export async function createUserApplication(data: BetaApplicationFormData): Promise<string> {
  let application: Record<string, unknown> | null = null;
  try {
    application = {
      ...data,
      status: 'pending' as ApplicationStatus,
      source: 'user' as const,
      appliedAt: new Date().toISOString(),
      approvalEmailSent: false
    };

    const docRef = await addDoc(
      collection(db, BETA_APPLICATIONS_COLLECTION),
      application
    );

    console.log('✅ User application created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating user application:', error);
    if (isPermissionError(error)) {
      const id = makeLocalId('user_app');
      upsertLocalApplication({ id, ...((application ?? data) as any) } as BetaApplication);
      console.warn('⚠️ Firestore permission denied. Stored user application in localStorage:', id);
      return id;
    }
    throw error;
  }
}

/**
 * Admin tarafından teklif oluştur (outbound)
 */
export async function createAdminOffer(
  data: BetaApplicationFormData,
  adminId: string
): Promise<string> {
  let application: Record<string, unknown> | null = null;
  try {
    application = {
      ...data,
      status: 'pending' as ApplicationStatus,
      source: 'admin' as const,
      appliedAt: new Date().toISOString(),
      reviewedBy: adminId,
      adminNotes: 'Admin tarafından teklif edildi',
      approvalEmailSent: false
    };

    const docRef = await addDoc(
      collection(db, BETA_APPLICATIONS_COLLECTION),
      application
    );

    console.log('✅ Admin offer created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating admin offer:', error);
    if (isPermissionError(error)) {
      const id = makeLocalId('admin_offer');
      upsertLocalApplication({ id, ...((application ?? { ...data, reviewedBy: adminId }) as any) } as BetaApplication);
      console.warn('⚠️ Firestore permission denied. Stored admin offer in localStorage:', id);
      return id;
    }
    throw error;
  }
}

/**
 * Beta Form başvurusu oluştur (public form)
 */
export interface BetaFormApplicationData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sector: string;
  surveyAnswers: {
    companySize: string;
    mainChallenge: string;
  };
}

export async function createBetaFormApplication(data: BetaFormApplicationData): Promise<string> {
  let application: Record<string, unknown> | null = null;
  try {
    application = {
      ...data,
      employeeCount: data.surveyAnswers.companySize === 'micro' ? '1-10' : 
                     data.surveyAnswers.companySize === 'small' ? '11-50' : '50+',
      status: 'pending' as ApplicationStatus,
      source: 'beta_form' as const,
      appliedAt: new Date().toISOString(),
      approvalEmailSent: false,
      description: 'Beta Başvuru Formu'
    };

    const docRef = await addDoc(
      collection(db, BETA_APPLICATIONS_COLLECTION),
      application
    );

    console.log('✅ Beta form application created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating beta form application:', error);
    if (isPermissionError(error)) {
      const id = makeLocalId('beta_form');
      upsertLocalApplication({ id, ...((application ?? data) as any) } as BetaApplication);
      console.warn('⚠️ Firestore permission denied. Stored beta form application in localStorage:', id);
      return id;
    }
    throw error;
  }
}

/**
 * Tüm başvuruları getir
 */
export async function getAllApplications(): Promise<BetaApplication[]> {
  try {
    const q = query(
      collection(db, BETA_APPLICATIONS_COLLECTION),
      orderBy('appliedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const applications: BetaApplication[] = [];

    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      } as BetaApplication);
    });

    console.log(`✅ Fetched ${applications.length} beta applications`);
    return applications;
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    if (isPermissionError(error)) {
      const apps = readLocalApplications().sort(
        (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      );
      console.warn('⚠️ Firestore permission denied. Loaded applications from localStorage:', apps.length);
      return apps;
    }
    throw error;
  }
}

/**
 * Belirli bir duruma göre başvuruları getir
 */
export async function getApplicationsByStatus(status: ApplicationStatus): Promise<BetaApplication[]> {
  try {
    const q = query(
      collection(db, BETA_APPLICATIONS_COLLECTION),
      where('status', '==', status),
      orderBy('appliedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const applications: BetaApplication[] = [];

    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      } as BetaApplication);
    });

    console.log(`✅ Fetched ${applications.length} applications with status: ${status}`);
    return applications;
  } catch (error) {
    console.error('❌ Error fetching applications by status:', error);
    if (isPermissionError(error)) {
      const apps = readLocalApplications()
        .filter((a) => a.status === status)
        .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
      console.warn('⚠️ Firestore permission denied. Loaded applications by status from localStorage:', apps.length);
      return apps;
    }
    throw error;
  }
}

/**
 * Başvuruyu onayla
 */
export async function approveApplication(
  applicationId: string,
  adminId: string,
  userId?: string
): Promise<void> {
  try {
    const appRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
    await updateDoc(appRef, {
      status: 'approved' as ApplicationStatus,
      reviewedAt: new Date().toISOString(),
      reviewedBy: adminId,
      userId: userId || null
    });

    console.log('✅ Application approved:', applicationId);
  } catch (error) {
    console.error('❌ Error approving application:', error);
    if (isPermissionError(error)) {
      updateLocalApplication(applicationId, {
        status: 'approved',
        reviewedAt: new Date().toISOString(),
        reviewedBy: adminId,
        userId: userId || null,
      });
      console.warn('⚠️ Firestore permission denied. Approved application in localStorage:', applicationId);
      return;
    }
    throw error;
  }
}

/**
 * Başvuruyu reddet
 */
export async function rejectApplication(
  applicationId: string,
  adminId: string,
  reason?: string
): Promise<void> {
  try {
    const appRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
    await updateDoc(appRef, {
      status: 'rejected' as ApplicationStatus,
      reviewedAt: new Date().toISOString(),
      reviewedBy: adminId,
      adminNotes: reason || 'Reddedildi'
    });

    console.log('✅ Application rejected:', applicationId);
  } catch (error) {
    console.error('❌ Error rejecting application:', error);
    if (isPermissionError(error)) {
      updateLocalApplication(applicationId, {
        status: 'rejected',
        reviewedAt: new Date().toISOString(),
        reviewedBy: adminId,
        adminNotes: reason || 'Reddedildi',
      });
      console.warn('⚠️ Firestore permission denied. Rejected application in localStorage:', applicationId);
      return;
    }
    throw error;
  }
}

/**
 * Onay e-postası gönderildi olarak işaretle
 */
export async function markApprovalEmailSent(applicationId: string): Promise<void> {
  try {
    const appRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
    await updateDoc(appRef, {
      approvalEmailSent: true,
      approvalEmailSentAt: new Date().toISOString()
    });

    console.log('✅ Approval email marked as sent:', applicationId);
  } catch (error) {
    console.error('❌ Error marking approval email as sent:', error);
    if (isPermissionError(error)) {
      updateLocalApplication(applicationId, {
        approvalEmailSent: true,
        approvalEmailSentAt: new Date().toISOString(),
      });
      console.warn('⚠️ Firestore permission denied. Marked approval email sent in localStorage:', applicationId);
      return;
    }
    throw error;
  }
}

/**
 * Başvuru güncelle (admin notları vb.)
 */
export async function updateApplication(
  applicationId: string,
  updates: Partial<BetaApplication>
): Promise<void> {
  try {
    const appRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
    // Remove 'id' from updates if it exists
    const { id, ...updateData } = updates as any;
    await updateDoc(appRef, updateData);

    console.log('✅ Application updated:', applicationId);
  } catch (error) {
    console.error('❌ Error updating application:', error);
    if (isPermissionError(error)) {
      const { id, ...updateData } = updates as any;
      updateLocalApplication(applicationId, updateData);
      console.warn('⚠️ Firestore permission denied. Updated application in localStorage:', applicationId);
      return;
    }
    throw error;
  }
}

/**
 * Tek bir başvuruyu getir
 */
export async function getApplication(applicationId: string): Promise<BetaApplication | null> {
  try {
    const docRef = doc(db, BETA_APPLICATIONS_COLLECTION, applicationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as BetaApplication;
    }

    return null;
  } catch (error) {
    console.error('❌ Error fetching application:', error);
    if (isPermissionError(error)) {
      const app = readLocalApplications().find((a) => a.id === applicationId) || null;
      console.warn('⚠️ Firestore permission denied. Loaded application from localStorage:', applicationId);
      return app;
    }
    throw error;
  }
}

/**
 * Bekleyen başvuru sayısını getir
 */
export async function getPendingApplicationsCount(): Promise<number> {
  try {
    const applications = await getApplicationsByStatus('pending');
    return applications.length;
  } catch (error) {
    console.error('❌ Error fetching pending applications count:', error);
    throw error;
  }
}

