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
  Timestamp,
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

/**
 * Yeni e-posta kaydı oluştur (PENDING durumunda)
 */
export async function createEmailRecord(
  data: EmailRecordFormData
): Promise<string> {
  try {
    const emailRecord = {
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
