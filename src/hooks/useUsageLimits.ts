/**
 * Usage Limits Hook - Kullanım Kısıtlaması Kontrolü
 * FINOPS AI Studio
 * 
 * Bu hook, kullanıcının abonelik limitlerini kontrol eder ve
 * limit aşımı durumunda uyarı verir.
 */

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from './useSubscription';
import { 
  UsageTracking, 
  LimitCheckResult, 
  UsageLimitType,
  PLAN_DEFINITIONS 
} from '../types/subscription';

export const useUsageLimits = () => {
  const { currentUser } = useAuth();
  const { subscription } = useSubscription();
  const [usageTracking, setUsageTracking] = useState<UsageTracking | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 1. Kullanım verilerini yükle
  useEffect(() => {
    if (!currentUser || !subscription) {
      setLoading(false);
      return;
    }

    const loadUsageTracking = async () => {
      try {
        const usageRef = doc(db, 'usageTracking', currentUser.uid);
        const usageSnap = await getDoc(usageRef);

        if (usageSnap.exists()) {
          const data = usageSnap.data();
          setUsageTracking({
            ...data,
            subscriptionStartDate: data.subscriptionStartDate?.toDate(),
            subscriptionEndDate: data.subscriptionEndDate?.toDate(),
            lastUpdated: data.lastUpdated?.toDate(),
          } as UsageTracking);
        } else {
          // İlk defa oluştur
          await initializeUsageTracking();
        }
      } catch (error) {
        console.error('Usage tracking load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsageTracking();
  }, [currentUser, subscription]);

  // ✅ 2. İlk Kullanım Tracking'i Oluştur
  const initializeUsageTracking = async () => {
    if (!currentUser || !subscription) return;

    const planDef = PLAN_DEFINITIONS[subscription.planType];
    const daysRemaining = Math.ceil(
      (subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    const newUsage: UsageTracking = {
      id: currentUser.uid,
      userId: currentUser.uid,
      subscriptionId: subscription.id,
      currentUsers: 1, // Kendisi
      currentBusinesses: 0,
      currentDashboards: 0,
      maxUsers: planDef.maxUsers === -1 ? 999999 : planDef.maxUsers,
      maxBusinesses: planDef.maxBusinesses === -1 ? 999999 : planDef.maxBusinesses,
      maxDashboards: planDef.maxDashboards === -1 ? 999999 : planDef.maxDashboards,
      subscriptionStartDate: subscription.startDate,
      subscriptionEndDate: subscription.endDate,
      daysRemaining,
      lastUpdated: new Date(),
      userLimitReached: false,
      businessLimitReached: false,
      dashboardLimitReached: false,
      subscriptionExpiringSoon: daysRemaining <= 7,
    };

    const usageRef = doc(db, 'usageTracking', currentUser.uid);
    await setDoc(usageRef, {
      ...newUsage,
      subscriptionStartDate: subscription.startDate,
      subscriptionEndDate: subscription.endDate,
      lastUpdated: new Date(),
    });

    setUsageTracking(newUsage);
  };

  // ✅ 3. Limit Kontrolü Yap
  const checkLimit = async (
    limitType: UsageLimitType,
    action: 'check' | 'increment' = 'check'
  ): Promise<LimitCheckResult> => {
    if (!usageTracking) {
      return {
        allowed: false,
        reason: 'Kullanım bilgileri yüklenemedi.',
        currentUsage: 0,
        limit: 0,
        upgradeRequired: true,
      };
    }

    let currentUsage: number;
    let limit: number;
    let limitName: string;

    switch (limitType) {
      case 'users':
        currentUsage = usageTracking.currentUsers;
        limit = usageTracking.maxUsers;
        limitName = 'Kullanıcı';
        break;
      case 'businesses':
        currentUsage = usageTracking.currentBusinesses;
        limit = usageTracking.maxBusinesses;
        limitName = 'İşletme';
        break;
      case 'dashboards':
        currentUsage = usageTracking.currentDashboards;
        limit = usageTracking.maxDashboards;
        limitName = 'Dashboard';
        break;
      case 'duration':
        currentUsage = usageTracking.daysRemaining;
        limit = 0;
        limitName = 'Abonelik Süresi';
        if (currentUsage <= 0) {
          return {
            allowed: false,
            reason: '❌ Aboneliğinizin süresi dolmuş!',
            currentUsage: 0,
            limit: 0,
            warningMessage: 'Aboneliğinizi yenilemek için lütfen bir paket seçin.',
            upgradeRequired: true,
          };
        }
        if (currentUsage <= 7) {
          return {
            allowed: true,
            currentUsage,
            limit,
            warningMessage: `⚠️ Aboneliğinizin süresinin dolmasına ${currentUsage} gün kaldı!`,
            upgradeRequired: false,
          };
        }
        return {
          allowed: true,
          currentUsage,
          limit,
          upgradeRequired: false,
        };
      default:
        return {
          allowed: false,
          reason: 'Geçersiz limit tipi.',
          currentUsage: 0,
          limit: 0,
          upgradeRequired: false,
        };
    }

    // Sınırsız limit kontrolü
    if (limit >= 999999) {
      return {
        allowed: true,
        currentUsage,
        limit: -1,
        upgradeRequired: false,
      };
    }

    // Limit kontrolü
    if (action === 'increment') {
      if (currentUsage + 1 > limit) {
        return {
          allowed: false,
          reason: `❌ ${limitName} limiti aşıldı!`,
          currentUsage,
          limit,
          warningMessage: `Maksimum ${limit} ${limitName.toLowerCase()} tanımlayabilirsiniz. Şu an: ${currentUsage}/${limit}`,
          upgradeRequired: true,
        };
      }
    } else {
      if (currentUsage >= limit) {
        return {
          allowed: false,
          reason: `❌ ${limitName} limiti doldu!`,
          currentUsage,
          limit,
          warningMessage: `Maksimum ${limit} ${limitName.toLowerCase()} tanımlayabilirsiniz. Limit: ${currentUsage}/${limit}`,
          upgradeRequired: true,
        };
      }
    }

    // Uyarı mesajı (limit yaklaşıyor)
    let warningMessage: string | undefined;
    if (currentUsage >= limit * 0.8) {
      warningMessage = `⚠️ ${limitName} limitinizin %80'ine ulaştınız! (${currentUsage}/${limit})`;
    }

    return {
      allowed: true,
      currentUsage,
      limit,
      warningMessage,
      upgradeRequired: false,
    };
  };

  // ✅ 4. Kullanımı Artır
  const incrementUsage = async (
    limitType: UsageLimitType
  ): Promise<LimitCheckResult> => {
    if (!currentUser) {
      return {
        allowed: false,
        reason: 'Kullanıcı girişi gerekli.',
        currentUsage: 0,
        limit: 0,
        upgradeRequired: false,
      };
    }

    // Önce kontrol et
    const checkResult = await checkLimit(limitType, 'increment');
    if (!checkResult.allowed) {
      return checkResult;
    }

    // Firestore'da artır
    try {
      const usageRef = doc(db, 'usageTracking', currentUser.uid);
      const fieldMap = {
        users: 'currentUsers',
        businesses: 'currentBusinesses',
        dashboards: 'currentDashboards',
      };

      if (limitType !== 'duration') {
        await updateDoc(usageRef, {
          [fieldMap[limitType]]: increment(1),
          lastUpdated: new Date(),
          [`${limitType}LimitReached`]: checkResult.currentUsage + 1 >= checkResult.limit,
        });

        // Local state'i güncelle
        setUsageTracking((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            [fieldMap[limitType]]: prev[fieldMap[limitType] as keyof UsageTracking] as number + 1,
            lastUpdated: new Date(),
          };
        });
      }

      return {
        ...checkResult,
        currentUsage: checkResult.currentUsage + 1,
      };
    } catch (error) {
      console.error('Increment usage error:', error);
      return {
        allowed: false,
        reason: 'Kullanım güncellenemedi.',
        currentUsage: checkResult.currentUsage,
        limit: checkResult.limit,
        upgradeRequired: false,
      };
    }
  };

  // ✅ 5. Kullanımı Azalt (silme işlemi için)
  const decrementUsage = async (limitType: UsageLimitType): Promise<void> => {
    if (!currentUser || limitType === 'duration') return;

    try {
      const usageRef = doc(db, 'usageTracking', currentUser.uid);
      const fieldMap = {
        users: 'currentUsers',
        businesses: 'currentBusinesses',
        dashboards: 'currentDashboards',
      };

      await updateDoc(usageRef, {
        [fieldMap[limitType]]: increment(-1),
        lastUpdated: new Date(),
        [`${limitType}LimitReached`]: false,
      });

      // Local state'i güncelle
      setUsageTracking((prev) => {
        if (!prev) return prev;
        const currentValue = prev[fieldMap[limitType] as keyof UsageTracking] as number;
        return {
          ...prev,
          [fieldMap[limitType]]: Math.max(0, currentValue - 1),
          lastUpdated: new Date(),
        };
      });
    } catch (error) {
      console.error('Decrement usage error:', error);
    }
  };

  // ✅ 6. Tüm Limitleri Kontrol Et
  const checkAllLimits = async () => {
    const results = {
      users: await checkLimit('users'),
      businesses: await checkLimit('businesses'),
      dashboards: await checkLimit('dashboards'),
      duration: await checkLimit('duration'),
    };

    const warnings = Object.entries(results)
      .filter(([_, result]) => result.warningMessage)
      .map(([type, result]) => ({
        type: type as UsageLimitType,
        message: result.warningMessage!,
        upgradeRequired: result.upgradeRequired,
      }));

    return { results, warnings };
  };

  return {
    usageTracking,
    loading,
    checkLimit,
    incrementUsage,
    decrementUsage,
    checkAllLimits,
    initializeUsageTracking,
  };
};












