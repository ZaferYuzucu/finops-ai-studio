/**
 * E-posta Outbox Yönetim Servisi
 * Gönderilen tüm e-postaların Firestore'da takibi
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
  EmailRecord,
  EmailRecordFormData,
  EmailStatus,
  EmailType,
  OUTBOUND_EMAILS_COLLECTION,
} from '../types/emailRecord';

// ---------------------------------------------------------------------------
// Demo / local fallback (when Firestore is locked by admin rules)
// ---------------------------------------------------------------------------
const LS_KEY = 'finops_outbound_emails';

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

function readLocalEmails(): EmailRecord[] {
  if (typeof window === 'undefined') return [];
  return safeParseJson<EmailRecord[]>(window.localStorage.getItem(LS_KEY), []);
}

function writeLocalEmails(emails: EmailRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LS_KEY, JSON.stringify(emails));
}

function updateLocalEmail(emailId: string, patch: Partial<EmailRecord>) {
  const list = readLocalEmails();
  const idx = list.findIndex((e) => e.id === emailId);
  if (idx < 0) return;
  list[idx] = { ...list[idx], ...patch } as EmailRecord;
  writeLocalEmails(list);
}

function makeLocalId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Yeni e-posta kaydı oluştur (PENDING durumunda)
 */
export async function createEmailRecord(
  data: EmailRecordFormData
): Promise<string> {
  let emailRecord: Record<string, unknown> | null = null;
  try {
    emailRecord = {
      type: data.type,
      to: data.to,
      subject: data.subject,
      bodyPreview: data.bodyPreview.substring(0, 200), // İlk 200 karakter
      fullBody: data.fullBody || data.bodyPreview,
      status: 'PENDING' as EmailStatus,
      createdAt: new Date().toISOString(),
      relatedId: data.relatedId || null,
    };

    const docRef = await addDoc(
      collection(db, OUTBOUND_EMAILS_COLLECTION),
      emailRecord
    );

    console.log('✅ Email record created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating email record:', error);
    if (isPermissionError(error)) {
      const id = makeLocalId('email');
      const list = readLocalEmails();
      list.push({ id, ...((emailRecord ?? data) as any) } as EmailRecord);
      writeLocalEmails(list);
      console.warn('⚠️ Firestore permission denied. Stored email record in localStorage:', id);
      return id;
    }
    throw error;
  }
}

/**
 * E-postayı başarıyla gönderildi olarak işaretle
 */
export async function markEmailSent(
  emailId: string,
  messageId: string
): Promise<void> {
  try {
    const emailRef = doc(db, OUTBOUND_EMAILS_COLLECTION, emailId);
    await updateDoc(emailRef, {
      status: 'SENT' as EmailStatus,
      sentAt: new Date().toISOString(),
      messageId: messageId,
    });

    console.log('✅ Email marked as SENT:', emailId);
  } catch (error) {
    console.error('❌ Error marking email as sent:', error);
    if (isPermissionError(error)) {
      updateLocalEmail(emailId, {
        status: 'SENT',
        sentAt: new Date().toISOString(),
        messageId,
      });
      console.warn('⚠️ Firestore permission denied. Marked email as SENT in localStorage:', emailId);
      return;
    }
    throw error;
  }
}

/**
 * E-postayı başarısız olarak işaretle
 */
export async function markEmailFailed(
  emailId: string,
  errorMessage: string
): Promise<void> {
  try {
    const emailRef = doc(db, OUTBOUND_EMAILS_COLLECTION, emailId);
    await updateDoc(emailRef, {
      status: 'FAILED' as EmailStatus,
      error: errorMessage,
      sentAt: new Date().toISOString(), // Deneme zamanı
    });

    console.log('✅ Email marked as FAILED:', emailId);
  } catch (error) {
    console.error('❌ Error marking email as failed:', error);
    if (isPermissionError(error)) {
      updateLocalEmail(emailId, {
        status: 'FAILED',
        error: errorMessage,
        sentAt: new Date().toISOString(),
      });
      console.warn('⚠️ Firestore permission denied. Marked email as FAILED in localStorage:', emailId);
      return;
    }
    throw error;
  }
}

/**
 * Tüm e-postaları getir (en yeni önce)
 */
export async function getAllEmails(): Promise<EmailRecord[]> {
  try {
    const q = query(
      collection(db, OUTBOUND_EMAILS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const emails: EmailRecord[] = [];

    querySnapshot.forEach((doc) => {
      emails.push({
        id: doc.id,
        ...doc.data(),
      } as EmailRecord);
    });

    console.log(`✅ Fetched ${emails.length} email records`);
    return emails;
  } catch (error) {
    console.error('❌ Error fetching emails:', error);
    if (isPermissionError(error)) {
      const emails = readLocalEmails().sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      console.warn('⚠️ Firestore permission denied. Loaded email records from localStorage:', emails.length);
      return emails;
    }
    throw error;
  }
}

/**
 * Duruma göre e-postaları getir
 */
export async function getEmailsByStatus(
  status: EmailStatus
): Promise<EmailRecord[]> {
  try {
    const q = query(
      collection(db, OUTBOUND_EMAILS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const emails: EmailRecord[] = [];

    querySnapshot.forEach((doc) => {
      emails.push({
        id: doc.id,
        ...doc.data(),
      } as EmailRecord);
    });

    console.log(`✅ Fetched ${emails.length} emails with status: ${status}`);
    return emails;
  } catch (error) {
    console.error('❌ Error fetching emails by status:', error);
    if (isPermissionError(error)) {
      const emails = readLocalEmails()
        .filter((e) => e.status === status)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.warn('⚠️ Firestore permission denied. Loaded emails by status from localStorage:', emails.length);
      return emails;
    }
    throw error;
  }
}

/**
 * Tipe göre e-postaları getir
 */
export async function getEmailsByType(type: EmailType): Promise<EmailRecord[]> {
  try {
    const q = query(
      collection(db, OUTBOUND_EMAILS_COLLECTION),
      where('type', '==', type),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const emails: EmailRecord[] = [];

    querySnapshot.forEach((doc) => {
      emails.push({
        id: doc.id,
        ...doc.data(),
      } as EmailRecord);
    });

    console.log(`✅ Fetched ${emails.length} emails with type: ${type}`);
    return emails;
  } catch (error) {
    console.error('❌ Error fetching emails by type:', error);
    if (isPermissionError(error)) {
      const emails = readLocalEmails()
        .filter((e) => e.type === type)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.warn('⚠️ Firestore permission denied. Loaded emails by type from localStorage:', emails.length);
      return emails;
    }
    throw error;
  }
}

/**
 * Tek bir e-posta kaydını getir
 */
export async function getEmailById(emailId: string): Promise<EmailRecord | null> {
  try {
    const docRef = doc(db, OUTBOUND_EMAILS_COLLECTION, emailId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as EmailRecord;
    }

    return null;
  } catch (error) {
    console.error('❌ Error fetching email by ID:', error);
    if (isPermissionError(error)) {
      const email = readLocalEmails().find((e) => e.id === emailId) || null;
      console.warn('⚠️ Firestore permission denied. Loaded email by ID from localStorage:', emailId);
      return email;
    }
    throw error;
  }
}

/**
 * İlişkili kayda göre e-postaları getir (örn: beta_application ID)
 */
export async function getEmailsByRelatedId(
  relatedId: string
): Promise<EmailRecord[]> {
  try {
    const q = query(
      collection(db, OUTBOUND_EMAILS_COLLECTION),
      where('relatedId', '==', relatedId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const emails: EmailRecord[] = [];

    querySnapshot.forEach((doc) => {
      emails.push({
        id: doc.id,
        ...doc.data(),
      } as EmailRecord);
    });

    console.log(`✅ Fetched ${emails.length} emails for relatedId: ${relatedId}`);
    return emails;
  } catch (error) {
    console.error('❌ Error fetching emails by relatedId:', error);
    if (isPermissionError(error)) {
      const emails = readLocalEmails()
        .filter((e) => e.relatedId === relatedId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.warn('⚠️ Firestore permission denied. Loaded emails by relatedId from localStorage:', emails.length);
      return emails;
    }
    throw error;
  }
}

/**
 * E-posta istatistiklerini getir
 */
export async function getEmailStats(): Promise<{
  total: number;
  sent: number;
  failed: number;
  pending: number;
}> {
  try {
    const allEmails = await getAllEmails();

    const stats = {
      total: allEmails.length,
      sent: allEmails.filter((e) => e.status === 'SENT').length,
      failed: allEmails.filter((e) => e.status === 'FAILED').length,
      pending: allEmails.filter((e) => e.status === 'PENDING').length,
    };

    console.log('✅ Email stats:', stats);
    return stats;
  } catch (error) {
    console.error('❌ Error fetching email stats:', error);
    throw error;
  }
}
