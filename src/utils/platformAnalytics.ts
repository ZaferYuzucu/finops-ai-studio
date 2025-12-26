// Platform Analytics - Real Firebase Data Integration

import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface RealUser {
  id: string;
  email: string;
  plan: string;
  createdAt: Date;
  lastLoginAt?: Date;
  subscriptionStatus?: 'active' | 'inactive' | 'cancelled';
}

export interface RealSubscription {
  userId: string;
  planType: string;
  amount: number;
  currency: string;
  status: 'active' | 'cancelled' | 'past_due';
  createdAt: Date;
  currentPeriodEnd?: Date;
}

/**
 * Firebase'den gerçek kullanıcı sayısını çek
 */
export const getRealUserCount = async (): Promise<number> => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.size;
  } catch (error) {
    console.error('Error fetching user count:', error);
    return 0;
  }
};

/**
 * Firebase'den aktif kullanıcı sayısını çek
 * Aktif = Son 30 gün içinde giriş yapmış
 */
export const getActiveUserCount = async (): Promise<number> => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const usersSnapshot = await getDocs(collection(db, 'users'));
    
    let activeCount = 0;
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.lastLoginAt) {
        const lastLogin = data.lastLoginAt.toDate ? data.lastLoginAt.toDate() : new Date(data.lastLoginAt);
        if (lastLogin > thirtyDaysAgo) {
          activeCount++;
        }
      }
    });
    
    return activeCount;
  } catch (error) {
    console.error('Error fetching active user count:', error);
    return 0;
  }
};

/**
 * Firebase'den tüm kullanıcıları çek
 */
export const getRealUsers = async (): Promise<RealUser[]> => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users: RealUser[] = [];
    
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        email: data.email || 'No email',
        plan: data.plan || 'Free',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        lastLoginAt: data.lastLoginAt?.toDate ? data.lastLoginAt.toDate() : undefined,
        subscriptionStatus: data.subscriptionStatus || 'active',
      });
    });
    
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

/**
 * Firebase'den subscription verilerini çek
 */
export const getRealSubscriptions = async (): Promise<RealSubscription[]> => {
  try {
    const subscriptionsSnapshot = await getDocs(collection(db, 'subscriptions'));
    const subscriptions: RealSubscription[] = [];
    
    subscriptionsSnapshot.forEach((doc) => {
      const data = doc.data();
      subscriptions.push({
        userId: data.userId || doc.id,
        planType: data.planType || 'Free',
        amount: data.amount || 0,
        currency: data.currency || 'TRY',
        status: data.status || 'active',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        currentPeriodEnd: data.currentPeriodEnd?.toDate ? data.currentPeriodEnd.toDate() : undefined,
      });
    });
    
    return subscriptions;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
};

/**
 * MRR (Monthly Recurring Revenue) hesapla
 */
export const calculateMRR = async (): Promise<number> => {
  try {
    const subscriptions = await getRealSubscriptions();
    
    let totalMRR = 0;
    subscriptions.forEach((sub) => {
      if (sub.status === 'active') {
        totalMRR += sub.amount;
      }
    });
    
    return totalMRR;
  } catch (error) {
    console.error('Error calculating MRR:', error);
    return 0;
  }
};

/**
 * ARR (Annual Recurring Revenue) hesapla
 */
export const calculateARR = async (): Promise<number> => {
  const mrr = await calculateMRR();
  return mrr * 12;
};

/**
 * Plan dağılımını hesapla
 */
export const getPlanDistribution = async (): Promise<Record<string, number>> => {
  try {
    const users = await getRealUsers();
    const distribution: Record<string, number> = {
      Free: 0,
      Pro: 0,
      Business: 0,
      BetaPartner: 0,
      Enterprise: 0,
    };
    
    users.forEach((user) => {
      const plan = user.plan || 'Free';
      if (distribution[plan] !== undefined) {
        distribution[plan]++;
      } else {
        distribution['Free']++;
      }
    });
    
    return distribution;
  } catch (error) {
    console.error('Error calculating plan distribution:', error);
    return { Free: 0, Pro: 0, Business: 0, BetaPartner: 0, Enterprise: 0 };
  }
};

/**
 * Churn rate hesapla
 * Churn = (Son 30 günde ayrılan kullanıcı / Toplam kullanıcı) * 100
 */
export const calculateChurnRate = async (): Promise<number> => {
  try {
    const users = await getRealUsers();
    const totalUsers = users.length;
    
    if (totalUsers === 0) return 0;
    
    const cancelledUsers = users.filter(
      (user) => user.subscriptionStatus === 'cancelled'
    ).length;
    
    return (cancelledUsers / totalUsers) * 100;
  } catch (error) {
    console.error('Error calculating churn rate:', error);
    return 0;
  }
};

/**
 * Yeni kayıtları çek (Son 30 gün)
 */
export const getRecentSignups = async (days: number = 30): Promise<RealUser[]> => {
  try {
    const users = await getRealUsers();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return users
      .filter((user) => user.createdAt > cutoffDate)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('Error fetching recent signups:', error);
    return [];
  }
};

/**
 * Newsletter abonelerini çek
 */
export const getNewsletterSubscribers = async (): Promise<number> => {
  try {
    const subscribersSnapshot = await getDocs(collection(db, 'aboneler'));
    return subscribersSnapshot.size;
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return 0;
  }
};

/**
 * Gerçek ve mock verileri birleştir
 */
export const getCombinedAnalytics = async () => {
  const [
    totalUsers,
    activeUsers,
    mrr,
    arr,
    planDistribution,
    churnRate,
    realUsers,
    recentSignups,
    newsletterCount,
  ] = await Promise.all([
    getRealUserCount(),
    getActiveUserCount(),
    calculateMRR(),
    calculateARR(),
    getPlanDistribution(),
    calculateChurnRate(),
    getRealUsers(),
    getRecentSignups(),
    getNewsletterSubscribers(),
  ]);

  return {
    totalUsers,
    activeUsers,
    mrr,
    arr,
    planDistribution,
    churnRate,
    realUsers,
    recentSignups,
    newsletterCount,
  };
};

