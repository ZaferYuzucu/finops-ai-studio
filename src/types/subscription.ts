/**
 * Abonelik Yönetim Sistemi - TypeScript Tipleri ve Interface'ler
 * Finops AI Studio
 */

// Plan Tipleri
export type PlanType = 'Girisimci' | 'IsletmeDostu' | 'Premium' | 'BetaPartner' | 'Enterprise';

// Abonelik Durumları
export type SubscriptionStatus = 
  | 'Active'          // Aktif abonelik
  | 'Trial'           // Deneme sürümü
  | 'Expired'         // Süresi dolmuş
  | 'Discounted'      // İndirimli (Girişimci -> İşletme Dostu geçişinde)
  | 'Pending'         // Ödeme bekliyor
  | 'Cancelled';      // İptal edilmiş

// Ödeme Durumu
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

// Otomatik Geçiş Tipi
export type TransitionType = 
  | 'None'                    // Otomatik geçiş yok
  | 'TrialToExpired'         // Deneme -> Süresi doldu
  | 'GirisimciToDiscount'    // Girişimci -> İşletme Dostu (%50 indirimli)
  | 'BetaToExpired';         // Beta -> Süresi doldu

/**
 * Ana Abonelik Interface'i
 */
export interface Subscription {
  // Temel Bilgiler
  id: string;                           // Abonelik ID (unique)
  userId: string;                       // Kullanıcı ID
  
  // Plan Detayları
  planType: PlanType;                   // Mevcut plan tipi
  previousPlanType?: PlanType;          // Önceki plan (geçiş takibi için)
  status: SubscriptionStatus;           // Abonelik durumu
  
  // Tarih Bilgileri
  startDate: Date;                      // Abonelik başlangıç tarihi
  endDate: Date;                        // Abonelik bitiş tarihi
  transitionDate: Date | null;          // Otomatik geçiş tarihi (null = geçiş yok)
  lastRenewalDate?: Date;               // Son yenileme tarihi
  nextBillingDate?: Date;               // Sonraki fatura tarihi
  
  // İndirim ve Özel Durumlar
  isDiscountEligible: boolean;          // %50 indirim hakkı var mı?
  discountStartDate?: Date;             // İndirim başlangıç tarihi
  discountEndDate?: Date;               // İndirim bitiş tarihi (6 ay sonra)
  discountPercentage?: number;          // İndirim yüzdesi (örn: 50)
  
  // Beta Partner Özel
  isBeta: boolean;                      // Beta partner mı?
  betaExpiryDate?: Date;                // Beta bitiş tarihi (1 yıl)
  lifetimePriceLock?: boolean;          // Ömür boyu sabit fiyat garantisi
  
  // Otomatik Geçiş
  autoRenewal: boolean;                 // Otomatik yenileme açık mı?
  transitionType: TransitionType;       // Otomatik geçiş tipi
  transitionTargetPlan?: PlanType;      // Geçilecek plan
  
  // Ödeme Bilgileri
  currentPrice: number;                 // Güncel ödenen fiyat (TL)
  originalPrice: number;                // Orijinal fiyat (TL)
  currency: string;                     // Para birimi (TRY, USD)
  paymentStatus: PaymentStatus;         // Ödeme durumu
  
  // Kullanım Limitleri
  maxUsers: number;                     // Maksimum kullanıcı sayısı
  maxBusinesses: number;                // Maksimum işletme sayısı
  maxDashboards: number;                // Maksimum dashboard sayısı
  
  // Meta Bilgiler
  createdAt: Date;                      // Oluşturulma tarihi
  updatedAt: Date;                      // Son güncelleme tarihi
  metadata?: Record<string, any>;       // Ek bilgiler (JSON)
  notes?: string;                       // Yönetici notları
}

/**
 * Plan Özellikleri ve Limitleri
 */
export interface PlanFeatures {
  planType: PlanType;
  displayName: string;
  price: number;                        // TL/Ay
  duration: number;                     // Ay cinsinden süre (6, 12, vb)
  maxUsers: number;
  maxBusinesses: number;
  maxDashboards: number;
  features: string[];                   // Özellik listesi
  hasAutoTransition: boolean;           // Otomatik geçiş var mı?
  transitionPlan?: PlanType;            // Geçilecek plan
  transitionDiscount?: number;          // Geçiş indirimi (%)
}

/**
 * Abonelik Geçişi (Transaction Log)
 */
export interface SubscriptionTransition {
  id: string;
  subscriptionId: string;
  userId: string;
  fromPlan: PlanType;
  toPlan: PlanType;
  fromStatus: SubscriptionStatus;
  toStatus: SubscriptionStatus;
  transitionDate: Date;
  reason: string;                       // Geçiş nedeni
  isAutomatic: boolean;                 // Otomatik mi manuel mi?
  discountApplied?: number;             // Uygulanan indirim (%)
  priceChange: number;                  // Fiyat değişimi (TL)
  notes?: string;
}

/**
 * Ödeme Geçmişi
 */
export interface PaymentHistory {
  id: string;
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentDate: Date;
  paymentMethod: string;                // Kredi Kartı, Havale, vb.
  transactionId?: string;               // Ödeme sağlayıcı transaction ID
  invoiceUrl?: string;                  // Fatura URL
  metadata?: Record<string, any>;
}

/**
 * Kullanıcı Abonelik Özeti (Frontend için)
 */
export interface UserSubscriptionSummary {
  subscription: Subscription;
  daysRemaining: number;                // Kalan gün sayısı
  isExpiringSoon: boolean;              // 7 gün içinde mi bitiyor?
  canUpgrade: boolean;                  // Yükseltme yapılabilir mi?
  canDowngrade: boolean;                // Düşürme yapılabilir mi?
  hasDiscount: boolean;                 // İndirim hakkı var mı?
  nextAction: string;                   // Kullanıcıya önerilen aksiyon
  warnings: string[];                   // Uyarılar
}

/**
 * Cron Job için Kontrol Sonucu
 */
export interface SubscriptionCheckResult {
  subscriptionId: string;
  userId: string;
  currentPlan: PlanType;
  status: SubscriptionStatus;
  action: 'NoAction' | 'SendReminder' | 'ApplyDiscount' | 'Expire' | 'Transition';
  daysUntilExpiry: number;
  message: string;
  timestamp: Date;
}

/**
 * Kullanım Takibi - Gerçek Zamanlı Limit Kontrolü
 */
export interface UsageTracking {
  id: string;
  userId: string;
  subscriptionId: string;
  
  // Gerçek Kullanım
  currentUsers: number;          // Şu an tanımlı kullanıcı sayısı
  currentBusinesses: number;     // Şu an tanımlı işletme sayısı
  currentDashboards: number;     // Şu an oluşturulmuş dashboard sayısı
  
  // Limit Bilgileri (Subscription'dan kopyalanır)
  maxUsers: number;
  maxBusinesses: number;
  maxDashboards: number;
  
  // Süre Bilgisi
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  daysRemaining: number;
  
  // Güncelleme
  lastUpdated: Date;
  
  // Uyarı Flags
  userLimitReached: boolean;
  businessLimitReached: boolean;
  dashboardLimitReached: boolean;
  subscriptionExpiringSoon: boolean;  // 7 gün kala
}

/**
 * Limit Kontrol Sonucu
 */
export interface LimitCheckResult {
  allowed: boolean;
  reason?: string;
  currentUsage: number;
  limit: number;
  warningMessage?: string;
  upgradeRequired: boolean;
}

/**
 * Kullanım Limiti Tipi
 */
export type UsageLimitType = 'users' | 'businesses' | 'dashboards' | 'duration';

/**
 * Plan Tanımları (Sabit Değerler)
 */
export const PLAN_DEFINITIONS: Record<PlanType, PlanFeatures> = {
  Girisimci: {
    planType: 'Girisimci',
    displayName: 'Girişimci (Lansman Özel)',
    price: 0,
    duration: 6,                        // 6 ay
    maxUsers: 1,
    maxBusinesses: 1,
    maxDashboards: 5,
    features: [
      '1 İşletme Tanımlama',
      'Gelir/Gider Takibi',
      'e-Fatura Görüntüleme',
      'Temel Finansal Raporlama'
    ],
    hasAutoTransition: true,
    transitionPlan: 'IsletmeDostu',
    transitionDiscount: 50              // %50 indirim
  },
  IsletmeDostu: {
    planType: 'IsletmeDostu',
    displayName: 'İşletme Dostu (Verimli Büyüme)',
    price: 599,
    duration: 1,                        // Aylık
    maxUsers: 3,
    maxBusinesses: 3,
    maxDashboards: 15,
    features: [
      '3 Kullanıcı Erişimi',
      'Banka ve POS Entegrasyonu',
      'Haftalık Maliyet Artış Raporu',
      'Otomatik Kategori Sınıflandırma'
    ],
    hasAutoTransition: false
  },
  Premium: {
    planType: 'Premium',
    displayName: 'Premium (Profesyonel Yönetim)',
    price: 1799,
    duration: 1,                        // Aylık
    maxUsers: 10,
    maxBusinesses: 10,
    maxDashboards: -1,                  // Sınırsız
    features: [
      'Sektörel Stok ve Regalo Analizi',
      'Personel Verimlilik Karnesi',
      '10 Özel Dashboard Panel Kurulumu',
      'Gelişmiş Nakit Akış Tahminleme'
    ],
    hasAutoTransition: false
  },
  BetaPartner: {
    planType: 'BetaPartner',
    displayName: 'Lansman Partneri (Beta)',
    price: 0,
    duration: 12,                       // 1 yıl
    maxUsers: -1,                       // Sınırsız
    maxBusinesses: -1,                  // Sınırsız
    maxDashboards: -1,                  // Sınırsız
    features: [
      'Tüm Premium Özellikler Dahil',
      'Ürün Yol Haritasında Söz Hakkı',
      '7/24 VIP Destek Hattı',
      '1 Yıl sonunda %75 indirimli sabit fiyat garantisi'
    ],
    hasAutoTransition: true,
    transitionPlan: 'Premium'
  },
  Enterprise: {
    planType: 'Enterprise',
    displayName: 'Kurumsal (Enterprise)',
    price: -1,                          // Özel fiyatlandırma
    duration: 12,                       // 1 yıl
    maxUsers: -1,                       // Sınırsız
    maxBusinesses: -1,                  // Sınırsız
    maxDashboards: -1,                  // Sınırsız
    features: [
      'Çoklu Şube / Otel Yönetimi',
      'Özel AI Danışmanlık',
      '7/24 Öncelikli Destek & Yerinde Eğitim',
      'Sınırsız Kullanıcı Tanımlama'
    ],
    hasAutoTransition: false
  }
};

