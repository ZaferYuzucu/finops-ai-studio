/**
 * Beta Partner Başvuru Sistemi
 * Hem inbound (kullanıcı başvurusu) hem outbound (admin teklifi) için
 */

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';
export type ApplicationSource = 'user' | 'admin' | 'beta_form'; // Kullanıcı mı başvurdu, admin mi teklif etti, beta form mu

export interface BetaApplication {
  id: string;
  
  // Başvuru Bilgileri
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  employeeCount: string; // "1-10", "11-50", "50+"
  sector: string;
  description?: string; // Neden partner olmak istiyor / Admin notu
  
  // Süreç Bilgileri
  status: ApplicationStatus;
  source: ApplicationSource; // 'user' = başvurdu, 'admin' = admin teklif etti, 'beta_form' = beta başvuru formu
  appliedAt: string; // ISO timestamp
  reviewedAt?: string; // ISO timestamp
  reviewedBy?: string; // Admin user ID
  
  // Anket Cevapları (Beta Form için)
  surveyAnswers?: {
    companySize?: string; // 'micro' | 'small' | 'medium'
    mainChallenge?: string; // 'cash_flow' | 'profitability' | 'cost_control' | 'reporting' | 'all'
  };
  
  // Onay Sonrası
  userId?: string; // Onaylandıktan sonra oluşturulan Firebase user ID
  approvalEmailSent?: boolean;
  approvalEmailSentAt?: string;
  
  // Notlar
  adminNotes?: string;
}

export interface BetaApplicationFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  employeeCount: string;
  sector: string;
  description?: string;
}

// Firebase collection adı
export const BETA_APPLICATIONS_COLLECTION = 'beta_applications';

// Sektör seçenekleri
export const SECTOR_OPTIONS = [
  { value: 'restaurant_cafe', label: 'Restoran / Cafe' },
  { value: 'hotel_tourism', label: 'Otel / Turizm' },
  { value: 'manufacturing', label: 'Üretim / Endüstri' },
  { value: 'agriculture', label: 'Tarım' },
  { value: 'retail', label: 'Perakende' },
  { value: 'automotive', label: 'Otomotiv' },
  { value: 'healthcare', label: 'Sağlık' },
  { value: 'education', label: 'Eğitim' },
  { value: 'other', label: 'Diğer' }
];

// Çalışan sayısı seçenekleri
export const EMPLOYEE_COUNT_OPTIONS = [
  { value: '1-10', label: '1-10 kişi (Mikro)' },
  { value: '11-50', label: '11-50 kişi (Küçük)' },
  { value: '50+', label: '50+ kişi (Orta/Büyük)' }
];

// Firma büyüklüğü seçenekleri (Beta Form için)
export const COMPANY_SIZE_OPTIONS = [
  { value: 'micro', label: 'Mikro (1-9 çalışan)', icon: '👤' },
  { value: 'small', label: 'Küçük (10-49 çalışan)', icon: '👥' },
  { value: 'medium', label: 'Orta (50-249 çalışan)', icon: '👨‍👩‍👧‍👦' }
];

// Ana zorluk seçenekleri (Beta Form için)
export const MAIN_CHALLENGE_OPTIONS = [
  { value: 'cash_flow', label: 'Nakit akışı', icon: '💰' },
  { value: 'profitability', label: 'Kârlılık', icon: '📈' },
  { value: 'cost_control', label: 'Maliyet kontrolü', icon: '🎯' },
  { value: 'reporting', label: 'Raporlama / görünürlük', icon: '📊' },
  { value: 'all', label: 'Hepsi', icon: '🔥' }
];

