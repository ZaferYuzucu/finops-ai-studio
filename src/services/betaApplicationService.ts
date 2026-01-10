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

/**
 * Yeni başvuru oluştur (kullanıcı başvurusu)
 */
export async function createUserApplication(data: BetaApplicationFormData): Promise<string> {
  try {
    const application = {
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
  try {
    const application = {
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
  try {
    const application = {
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

