/**
 * Abonelik Yönetimi - React Hooks
 * Frontend Entegrasyonu
 */

import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '../context/AuthContext';
import type { 
  Subscription, 
  PlanType, 
  UserSubscriptionSummary,
  PLAN_DEFINITIONS
} from '../types/subscription';

const functions = getFunctions();

/**
 * Ana Abonelik Hook'u
 */
export function useSubscription() {
  const { currentUser } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [summary, setSummary] = useState<UserSubscriptionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Abonelik bilgilerini yükle
  const fetchSubscription = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const getCurrentSubscription = httpsCallable(functions, 'getCurrentSubscription');
      const result = await getCurrentSubscription();
      const data = result.data as any;

      if (data.success) {
        setSubscription(data.subscription);
        setSummary(data.summary);
      } else {
        setSubscription(null);
        setSummary(null);
      }
    } catch (err: any) {
      console.error('Error fetching subscription:', err);
      setError(err.message || 'Abonelik bilgileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  // Yeni abonelik oluştur
  const createSubscription = async (planType: PlanType, paymentStatus: 'Paid' | 'Trial' = 'Paid') => {
    if (!currentUser) {
      throw new Error('Kullanıcı girişi gerekli');
    }

    setLoading(true);
    setError(null);

    try {
      const createSub = httpsCallable(functions, 'createSubscription');
      const result = await createSub({ planType, paymentStatus });
      const data = result.data as any;

      if (data.success) {
        setSubscription(data.subscription);
        return data.subscription;
      } else {
        throw new Error(data.message || 'Abonelik oluşturulamadı');
      }
    } catch (err: any) {
      console.error('Error creating subscription:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Plan değiştir
  const changePlan = async (newPlanType: PlanType, reason?: string) => {
    if (!currentUser) {
      throw new Error('Kullanıcı girişi gerekli');
    }

    setLoading(true);
    setError(null);

    try {
      const changePlanFunc = httpsCallable(functions, 'changePlan');
      const result = await changePlanFunc({ newPlanType, reason });
      const data = result.data as any;

      if (data.success) {
        setSubscription(data.subscription);
        return data.subscription;
      } else {
        throw new Error(data.message || 'Plan değiştirilemedi');
      }
    } catch (err: any) {
      console.error('Error changing plan:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // İndirim aktivasyonu
  const activateDiscount = async () => {
    if (!currentUser) {
      throw new Error('Kullanıcı girişi gerekli');
    }

    setLoading(true);
    setError(null);

    try {
      const activateDiscountFunc = httpsCallable(functions, 'activateDiscount');
      const result = await activateDiscountFunc();
      const data = result.data as any;

      if (data.success) {
        setSubscription(data.subscription);
        return data.subscription;
      } else {
        throw new Error(data.message || 'İndirim aktive edilemedi');
      }
    } catch (err: any) {
      console.error('Error activating discount:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Aboneliği iptal et
  const cancelSubscription = async (reason?: string) => {
    if (!currentUser) {
      throw new Error('Kullanıcı girişi gerekli');
    }

    setLoading(true);
    setError(null);

    try {
      const cancelFunc = httpsCallable(functions, 'cancelSubscription');
      const result = await cancelFunc({ reason });
      const data = result.data as any;

      if (data.success) {
        setSubscription(null);
        setSummary(null);
        return true;
      } else {
        throw new Error(data.message || 'Abonelik iptal edilemedi');
      }
    } catch (err: any) {
      console.error('Error cancelling subscription:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde abonelik bilgilerini getir
  useEffect(() => {
    fetchSubscription();
  }, [currentUser]);

  return {
    subscription,
    summary,
    loading,
    error,
    createSubscription,
    changePlan,
    activateDiscount,
    cancelSubscription,
    refresh: fetchSubscription
  };
}

/**
 * Plan özelliklerini getiren hook
 */
export function usePlanFeatures() {
  // PLAN_DEFINITIONS'ı TypeScript'ten import ediyoruz
  // Gerçek uygulamada Firestore'dan da çekebilirsiniz
  return {
    plans: typeof window !== 'undefined' 
      ? import('../types/subscription').then(m => m.PLAN_DEFINITIONS)
      : null
  };
}

/**
 * Abonelik durumu kontrolü için yardımcı fonksiyonlar
 */
export const subscriptionHelpers = {
  // Abonelik aktif mi?
  isActive: (subscription: Subscription | null): boolean => {
    if (!subscription) return false;
    return ['Active', 'Trial', 'Discounted'].includes(subscription.status);
  },

  // İndirim hakkı var mı?
  hasDiscountRight: (subscription: Subscription | null): boolean => {
    if (!subscription) return false;
    return subscription.isDiscountEligible && subscription.planType === 'Girisimci';
  },

  // Premium kullanıcı mı?
  isPremium: (subscription: Subscription | null): boolean => {
    if (!subscription) return false;
    return subscription.planType === 'Premium';
  },

  // Beta partner mı?
  isBetaPartner: (subscription: Subscription | null): boolean => {
    if (!subscription) return false;
    return subscription.isBeta && subscription.planType === 'BetaPartner';
  },

  // Kalan gün sayısı
  getDaysRemaining: (subscription: Subscription | null): number => {
    if (!subscription) return 0;
    const now = new Date();
    const end = new Date(subscription.endDate);
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  // Yakında mı bitiyor?
  isExpiringSoon: (subscription: Subscription | null, days: number = 7): boolean => {
    if (!subscription) return false;
    const remaining = subscriptionHelpers.getDaysRemaining(subscription);
    return remaining > 0 && remaining <= days;
  },

  // Upgrade yapılabilir mi?
  canUpgrade: (subscription: Subscription | null): boolean => {
    if (!subscription) return false;
    const hierarchy: Record<PlanType, number> = {
      'Girisimci': 1,
      'IsletmeDostu': 2,
      'Premium': 3,
      'BetaPartner': 3,
      'Enterprise': 4
    };
    return hierarchy[subscription.planType] < 4;
  },

  // Format edilmiş tarih
  formatDate: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  },

  // Format edilmiş fiyat
  formatPrice: (price: number, currency: string = 'TRY'): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency
    }).format(price);
  }
};

/**
 * Örnek Kullanım:
 * 
 * function MyComponent() {
 *   const { subscription, summary, loading, createSubscription, changePlan } = useSubscription();
 * 
 *   if (loading) return <div>Yükleniyor...</div>;
 *   if (!subscription) return <div>Aktif abonelik yok</div>;
 * 
 *   return (
 *     <div>
 *       <h1>{subscription.planType}</h1>
 *       <p>Kalan: {summary?.daysRemaining} gün</p>
 *       <button onClick={() => changePlan('Premium')}>Premium'a Geç</button>
 *     </div>
 *   );
 * }
 */

