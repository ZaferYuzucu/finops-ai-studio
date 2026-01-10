/**
 * E-posta Kayıt Sistemi - Type Definitions
 * Gönderilen tüm e-postaların takibi için
 */

export type EmailStatus = 'PENDING' | 'SENT' | 'FAILED';
export type EmailType = 'offer' | 'approval' | 'rejection' | 'newsletter' | 'general';

/**
 * E-posta kayıt interface
 */
export interface EmailRecord {
  id: string;
  
  // E-posta Detayları
  type: EmailType;
  to: string;
  subject: string;
  bodyPreview: string; // İlk 200 karakter
  fullBody?: string; // Opsiyonel - tam içerik
  
  // Durum Bilgisi
  status: EmailStatus;
  error?: string; // Hata mesajı (eğer FAILED ise)
  
  // Zaman Damgaları
  createdAt: string; // ISO timestamp
  sentAt?: string; // ISO timestamp (başarıyla gönderildiyse)
  
  // İlişki ve Metadata
  relatedId?: string; // İlişkili kayıt ID (beta_application, user, vb.)
  messageId?: string; // SMTP response message ID
  
  // İstatistik (opsiyonel gelecek feature)
  opened?: boolean;
  openedAt?: string;
  clicked?: boolean;
  clickedAt?: string;
}

/**
 * Yeni e-posta kaydı oluşturmak için form data
 */
export interface EmailRecordFormData {
  type: EmailType;
  to: string;
  subject: string;
  bodyPreview: string;
  fullBody?: string;
  relatedId?: string;
}

/**
 * Firestore collection adı
 */
export const OUTBOUND_EMAILS_COLLECTION = 'outbound_emails';

/**
 * E-posta tipi labels (UI için)
 */
export const EMAIL_TYPE_LABELS: Record<EmailType, string> = {
  offer: 'Teklif',
  approval: 'Onay',
  rejection: 'Red',
  newsletter: 'Bülten',
  general: 'Genel',
};

/**
 * E-posta durum labels (UI için)
 */
export const EMAIL_STATUS_LABELS: Record<EmailStatus, string> = {
  PENDING: 'Beklemede',
  SENT: 'Gönderildi',
  FAILED: 'Başarısız',
};

/**
 * E-posta durum renkleri (Tailwind classes)
 */
export const EMAIL_STATUS_COLORS: Record<EmailStatus, { bg: string; text: string }> = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  SENT: { bg: 'bg-green-100', text: 'text-green-800' },
  FAILED: { bg: 'bg-red-100', text: 'text-red-800' },
};
