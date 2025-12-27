import React, { useState, useEffect, FC, useCallback } from 'react';
import { 
  Users, TrendingUp, DollarSign, AlertCircle, 
  ArrowUpRight, ArrowDownRight, Download, RefreshCw,
  Upload, Mail, Settings, BarChart3, PieChart, Activity,
  Target, Zap, Clock, Database, FileIcon, Globe, LinkIcon, 
  Loader, CheckCircle, UploadCloud, File as FileIconLucide
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  mockUsers, mockRevenue, mockDashboardUsage, mockSessionData, 
  summaryStats, PlatformUser 
} from '../../data/platformAnalyticsMockData';
import { getCombinedAnalytics } from '../../utils/platformAnalytics';
import { useNavigate } from 'react-router-dom';
import DemoDashboardPreview from '../DemoDashboardPreview';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

const PlatformAnalyticsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);
  const [realData, setRealData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'dashboard'>('summary'); // YENİ: Görünüm modu
  
  // Gerçek Firebase verilerini yükle
  useEffect(() => {
    const loadRealData = async () => {
      setLoading(true);
      try {
        const data = await getCombinedAnalytics();
        setRealData(data);
        console.log('✅ Gerçek Firebase verileri yüklendi:', data);
      } catch (error) {
        console.error('❌ Veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRealData();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Sort users by various criteria
  const getRecentSignups = () => {
    if (realData && realData.recentSignups && realData.recentSignups.length > 0) {
      // Gerçek Firebase verisi varsa onu göster
      return realData.recentSignups.slice(0, 10).map((user: any) => ({
        id: user.id,
        email: user.email,
        plan: user.plan,
        registrationDate: user.createdAt.toISOString ? user.createdAt.toISOString().split('T')[0] : new Date(user.createdAt).toISOString().split('T')[0],
        lastLogin: user.lastLoginAt ? (user.lastLoginAt.toISOString ? user.lastLoginAt.toISOString().split('T')[0] : new Date(user.lastLoginAt).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        sessionCount: 0,
        totalUsageMinutes: 0,
        status: user.subscriptionStatus || 'active',
      }));
    }
    // Gerçek veri yoksa mock göster
    return [...mockUsers]
      .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
      .slice(0, 10);
  };

  const getMostActiveUsers = () => {
    if (realData && realData.realUsers && realData.realUsers.length > 0) {
      // Gerçek Firebase verisi varsa onu göster
      return realData.realUsers.slice(0, 10).map((user: any) => ({
        id: user.id,
        email: user.email,
        plan: user.plan,
        registrationDate: user.createdAt.toISOString ? user.createdAt.toISOString().split('T')[0] : new Date(user.createdAt).toISOString().split('T')[0],
        lastLogin: user.lastLoginAt ? (user.lastLoginAt.toISOString ? user.lastLoginAt.toISOString().split('T')[0] : new Date(user.lastLoginAt).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        sessionCount: 0,
        totalUsageMinutes: 0,
        status: user.subscriptionStatus || 'active',
      }));
    }
    // Gerçek veri yoksa mock göster
    return [...mockUsers]
      .filter(u => u.status === 'active')
      .sort((a, b) => b.sessionCount - a.sessionCount)
      .slice(0, 10);
  };

  // Calculate growth
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const mrrGrowth = calculateGrowth(
    mockRevenue[mockRevenue.length - 1].mrr,
    mockRevenue[mockRevenue.length - 2].mrr
  );

  // Gerçek veya mock veriyi kullan
  const stats = realData || {
    totalUsers: summaryStats.totalUsers,
    activeUsers: summaryStats.activeUsers,
    mrr: summaryStats.currentMRR,
    arr: summaryStats.currentARR,
    churnRate: parseFloat(summaryStats.churnRate),
    planDistribution: summaryStats.planDistribution,
    realUsers: [],
    recentSignups: [],
    newsletterCount: 0,
  };
  
  const userGrowth = 12; // Mock data - bu ay yeni kullanıcı artışı %
  const activeUserGrowth = 8; // Mock data
  const churnImprovement = -0.5; // Negative = improvement

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-indigo-600" size={48} />
          <p className="text-lg text-gray-600">Firebase'den gerçek veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🏨 {t('platformAnalytics.pageTitle')}
                <span className="ml-3 text-sm font-normal px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
                  {t('platformAnalytics.backstage')}
                </span>
              </h1>
              <p className="text-gray-600">{t('platformAnalytics.pageSubtitle')}</p>
              
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* Time Range Selector */}
              <div className="flex bg-white border border-gray-300 rounded-lg p-1">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {t(`platformAnalytics.timeRanges.${range}`)}
                  </button>
                ))}
              </div>

              <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw size={20} className="text-gray-600" />
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download size={20} />
                <span className="hidden sm:inline">{t('platformAnalytics.downloadReport')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 🔀 BÖLÜM SEÇİCİ - TAB MENÜ */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl border-2 border-gray-200 p-1.5 bg-white shadow-md">
            <button
              onClick={() => setViewMode('summary')}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'summary' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Database size={20} />
              <span>{t('platformAnalytics.tabs.admin')}</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'dashboard' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Zap size={20} />
              <span>{t('platformAnalytics.tabs.demo')}</span>
            </button>
          </div>
        </div>

        {/* ÖZET GÖRÜNÜM */}
        {viewMode === 'summary' && (
          <>
        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                userGrowth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {userGrowth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(userGrowth)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.totalUsers')}</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              {realData ? t('platformAnalytics.kpis.realFirebaseData') : `+12% ${t('platformAnalytics.kpis.thisMonth')} (Mock)`}
            </p>
          </motion.div>

          {/* Active Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="text-green-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                activeUserGrowth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {activeUserGrowth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(activeUserGrowth)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.activeUsers')}</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              {realData ? t('platformAnalytics.kpis.last30Days') : `+8% ${t('platformAnalytics.kpis.thisWeek')} (Mock)`}
            </p>
          </motion.div>

          {/* Monthly Revenue (MRR) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <DollarSign className="text-emerald-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                mrrGrowth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {mrrGrowth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(mrrGrowth).toFixed(1)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.monthlyRevenue')}</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.mrr)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {t('platformAnalytics.kpis.arrLabel')}: {formatCurrency(stats.arr)} {realData && '🔥'}
            </p>
          </motion.div>

          {/* Churn Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                churnImprovement < 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {churnImprovement < 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                {Math.abs(churnImprovement)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.churnRate')}</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.churnRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-2">
              {realData ? t('platformAnalytics.kpis.realData') : t('platformAnalytics.kpis.mockData')}
            </p>
          </motion.div>
        </div>

        {/* 🆕 YENİ KPI KARTLARI - İKİNCİ SATIR */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Conversion Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="text-purple-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                2.3%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.conversionRate')}</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.conversionRate || 0}%</p>
            <p className="text-xs text-gray-500 mt-2">
              {t('platformAnalytics.kpis.freeToPaid')}
            </p>
          </motion.div>

          {/* Avg Revenue Per User */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <DollarSign className="text-cyan-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                5.8%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.arpu')}</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.avgRevenuePerUser || 0)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {t('platformAnalytics.kpis.avgPerUser')}
            </p>
          </motion.div>

          {/* Customer Lifetime Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                8.1%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.customerLtv')}</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.customerLifetimeValue || 0)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {t('platformAnalytics.kpis.lifetimeValue')}
            </p>
          </motion.div>

          {/* Avg Session Duration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Clock className="text-pink-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                3.2%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.avgSession')}</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.avgSessionDuration || 0} dk</p>
            <p className="text-xs text-gray-500 mt-2">
              {t('platformAnalytics.kpis.avgDuration')}
            </p>
          </motion.div>
        </div>

        {/* 🆕 ÜÇÜNCÜ KPI SATIRI - EK METRIKLER */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <DollarSign className="text-teal-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                12.5%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.totalRevenue')}</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue || 0)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {t('platformAnalytics.kpis.totalEarnings')}
            </p>
          </motion.div>

          {/* Dashboard Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <BarChart3 className="text-indigo-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                18
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.dashboardCount')}</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.dashboardCount || 0}</p>
            <p className="text-xs text-gray-500 mt-2">
              +18 {t('platformAnalytics.kpis.thisMonth')}
            </p>
          </motion.div>

          {/* Total Data Uploads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Database className="text-yellow-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                234
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{t('platformAnalytics.kpis.dataUploads')}</h3>
            <p className="text-3xl font-bold text-gray-900">{(stats.totalDataUploads || 0).toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              CSV/Excel dosyaları
            </p>
          </motion.div>

          {/* System Uptime */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="text-green-600" size={24} />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600">
                ✓ Stabil
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Sistem Uptime</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.systemUptime || 0}%</p>
            <p className="text-xs text-gray-500 mt-2">
              Son 30 günde
            </p>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Revenue Growth Chart Placeholder */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{t('platformAnalytics.revenueGrowth')}</h2>
              <BarChart3 className="text-gray-400" size={20} />
            </div>
            <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-2 text-indigo-400" size={48} />
                <p className="text-sm text-gray-600">Line Chart: Son 12 Ay MRR/ARR</p>
                <p className="text-xs text-gray-500 mt-1">(Recharts ile entegre edilecek)</p>
              </div>
            </div>
          </div>

          {/* Plan Distribution Chart Placeholder */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{t('platformAnalytics.planDistribution')}</h2>
              <PieChart className="text-gray-400" size={20} />
            </div>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="mx-auto mb-2 text-blue-400" size={48} />
                <p className="text-sm text-gray-600">Donut Chart</p>
                <div className="mt-4 space-y-2">
                  {Object.entries(stats.planDistribution).map(([plan, count]) => (
                    <div key={plan} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{plan}:</span>
                      <span className="font-semibold">{count} ({stats.totalUsers > 0 ? ((count / stats.totalUsers) * 100).toFixed(0) : 0}%)</span>
                    </div>
                  ))}
                  {realData && (
                    <p className="text-xs text-green-600 font-semibold pt-2 border-t">🔥 Gerçek Firebase Verisi</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Recent Signups Table */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('platformAnalytics.recentSignups')}</h2>
              {realData && realData.recentSignups && realData.recentSignups.length > 0 && (
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  🔥 Gerçek Veri
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Email</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Plan</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Tarih</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {getRecentSignups().map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-900">{user.email}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                          user.plan === 'Business' ? 'bg-blue-100 text-blue-800' :
                          user.plan === 'Pro' ? 'bg-green-100 text-green-800' :
                          user.plan === 'BetaPartner' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{formatDate(user.registrationDate)}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? 'Aktif' : user.status === 'inactive' ? 'Pasif' : 'Ayrıldı'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Most Active Users Table */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('platformAnalytics.mostActiveUsers')}</h2>
              {realData && realData.realUsers && realData.realUsers.length > 0 && (
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  🔥 Gerçek Veri
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Email</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Session</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Son Giriş</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Toplam Süre</th>
                  </tr>
                </thead>
                <tbody>
                  {getMostActiveUsers().map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-900">{user.email}</td>
                      <td className="py-3 text-sm font-semibold text-indigo-600">{user.sessionCount}</td>
                      <td className="py-3 text-sm text-gray-600">{formatDate(user.lastLogin)}</td>
                      <td className="py-3 text-sm text-gray-600">{Math.floor(user.totalUsageMinutes / 60)}h {user.totalUsageMinutes % 60}m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dashboard Usage Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('platformAnalytics.popularDashboards')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Dashboard Adı</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Kategori</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Görüntülenme</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Kullanıcı</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Ort. Süre</th>
                </tr>
              </thead>
              <tbody>
                {mockDashboardUsage.map((dashboard, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium text-gray-900">{dashboard.dashboardName}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {dashboard.category}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 text-right">{dashboard.viewCount.toLocaleString()}</td>
                    <td className="py-3 text-sm text-gray-600 text-right">{dashboard.uniqueUsers}</td>
                    <td className="py-3 text-sm text-gray-600 text-right">{dashboard.avgTimeMinutes} dk</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <button
            onClick={() => {
              // Admin yetkisini tekrar kaydet
              localStorage.setItem('isAdminAuthenticated', 'true');
              sessionStorage.setItem('isAdminAuthenticated', 'true');
              navigate('/veri-girisi');
            }}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
              <Upload className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Veri Yükle</h3>
            <p className="text-sm text-gray-600 text-center">CSV/Excel verilerini sisteme aktar</p>
          </button>

          <button
            onClick={() => {
              // Admin yetkisini tekrar kaydet
              localStorage.setItem('isAdminAuthenticated', 'true');
              sessionStorage.setItem('isAdminAuthenticated', 'true');
              navigate('/admin/newsletter');
            }}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
              <Mail className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Newsletter Gönder</h3>
            <p className="text-sm text-gray-600 text-center">Kullanıcılara toplu bildirim</p>
          </button>

          <button
            onClick={() => {
              // Admin yetkisini tekrar kaydet
              localStorage.setItem('isAdminAuthenticated', 'true');
              sessionStorage.setItem('isAdminAuthenticated', 'true');
              navigate('/admin/panel');
            }}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
              <Settings className="text-purple-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Sistem Ayarları</h3>
            <p className="text-sm text-gray-600 text-center">Platform konfigürasyonu</p>
          </button>

          <button
            onClick={() => {
              // Admin yetkisini tekrar kaydet (güvenlik için)
              localStorage.setItem('isAdminAuthenticated', 'true');
              sessionStorage.setItem('isAdminAuthenticated', 'true');
              navigate('/dashboard/create');
            }}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
              <BarChart3 className="text-orange-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Dashboard Oluştur</h3>
            <p className="text-sm text-gray-600 text-center">Kendi KPI dashboard'unuzu hazırlayın</p>
          </button>
        </div>
          </>
        )}

        {/* 📈 B2B DEMO GÖRÜNÜMÜ */}
        {viewMode === 'dashboard' && (
          <B2BDemoFlow navigate={navigate} />
        )}
      </div>
    </div>
  );
};

// 🎯 B2B DEMO FLOW KOMPONENTI
const B2BDemoFlow: FC<{ navigate: any }> = ({ navigate }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [importMethod, setImportMethod] = useState<'file' | 'url'>('file');
  const [files, setFiles] = useState<File[]>([]);
  const [dataUrl, setDataUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    }
  });

  const handleDemoMode = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
    
    setTimeout(() => {
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
      setShowDashboard(true);
    }, 1500);
  };

  const handleFileUpload = () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    setTimeout(() => {
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
      setShowDashboard(true);
    }, 2500);
  };

  const handleUrlConnect = () => {
    if (!dataUrl.trim()) return;
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 12;
      });
    }, 180);
    
    setTimeout(() => {
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
      setShowDashboard(true);
    }, 2000);
  };

  if (showDashboard) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
        <DemoDashboardPreview />
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowDashboard(false)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Veri Girişine Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-3">
          <Zap className="text-purple-600" size={32} />
          🎯 B2B Demo - Müşteri Sunumu
        </h2>
        <p className="text-gray-700 mb-4">
          Bu bölüm <strong>potansiyel müşterilere</strong> platformun gücünü göstermek için tasarlanmıştır. 
          Aşağıdaki adımları takip ederek canlı demo yapabilirsiniz.
        </p>
        <div className="bg-white rounded-lg p-4 border-2 border-purple-300 mb-4">
          <h3 className="font-bold text-purple-900 mb-2">🎬 Demo Akışı:</h3>
          <ol className="text-sm text-gray-700 space-y-1">
            <li><strong>1.</strong> Müşteriye veri yükleme seçeneklerini gösterin (Dosya veya URL)</li>
            <li><strong>2.</strong> Demo Modu ile tek tıkla örnek veri yükleyin</li>
            <li><strong>3.</strong> AI analiz sürecini izletin</li>
            <li><strong>4.</strong> Grafikli dashboard ve AI önerilerini sunun</li>
          </ol>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Database size={18} />
            📖 Detaylı Veri Hazırlama Rehberi
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Müşterileriniz veri yükleme konusunda daha fazla bilgiye ihtiyaç duyabilir. 
            Detaylı rehberimiz veri temizleme, birleştirme ve KPI oluşturma konularında 
            adım adım yönergeler sunar.
          </p>
          <a 
            href="/veri-hazirlama" 
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            <Database size={16} />
            <span>Detaylı Rehberi Görüntüle</span>
          </a>
        </div>
      </div>

      {/* Demo Modu Butonu */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200">
        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Zap className="text-yellow-600" size={24} />
          ⚡ Hızlı Demo Modu
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Müşteriye hızlı gösterim yapmak için tek tıkla örnek restoran verileriyle dashboard oluşturun.
        </p>
        <button
          onClick={handleDemoMode}
          disabled={isProcessing}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 font-bold text-lg"
        >
          <Zap size={24} className="animate-pulse" />
          <span>🚀 Demo Modu - Tek Tıkla Dashboard Oluştur</span>
        </button>
      </div>

      {/* Ayırıcı */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gray-50 text-gray-600 font-semibold">VEYA MANUEL VERİ GİRİŞİ</span>
        </div>
      </div>

      {/* Veri Girişi Bölümü */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📤 Veri Yükleme Seçenekleri</h3>
        
        {/* Tab Menü */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border-2 border-gray-200 p-1 bg-gray-50">
            <button
              onClick={() => setImportMethod('file')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                importMethod === 'file' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UploadCloud size={18} />
              <span>📁 Dosya Yükle</span>
            </button>
            <button
              onClick={() => setImportMethod('url')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                importMethod === 'url' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe size={18} />
              <span>🌐 URL Bağlantısı</span>
            </button>
          </div>
        </div>

        {/* Dosya Yükleme */}
        {importMethod === 'file' && (
          <div className="space-y-4">
            <div {...getRootProps()} className={`flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}>
              <input {...getInputProps()} />
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">Dosya yükleyin</span> veya sürükleyip bırakın
                </p>
                <p className="text-xs text-gray-500 mt-2">CSV veya XLSX formatında</p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Seçilen Dosya:</p>
                <div className="flex items-center gap-2">
                  <FileIconLucide className="text-blue-600" size={20} />
                  <span className="text-sm font-medium">{files[0].name}</span>
                </div>
                <button
                  onClick={handleFileUpload}
                  className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Yükle ve Dashboard Oluştur
                </button>
              </div>
            )}

            {/* Rehber */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                <FileIconLucide className="text-blue-600" size={16} />
                📖 Dosya Yükleme Rehberi
              </h4>
              <div className="space-y-2 text-xs text-blue-900">
                <p><strong>1.</strong> CSV/Excel hazırlayın (ilk satır başlıklar)</p>
                <p><strong>2.</strong> Farklı Kaydet → CSV veya .xlsx</p>
                <p><strong>3.</strong> Dosyayı buraya sürükleyin</p>
                <p><strong>4.</strong> AI otomatik analiz yapar</p>
              </div>
            </div>
          </div>
        )}

        {/* URL Bağlantısı */}
        {importMethod === 'url' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-4">
              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="text-green-600" size={20} />
                Veri Kaynağına Bağlan
              </h4>
              <input
                type="url"
                value={dataUrl}
                onChange={(e) => setDataUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-3"
              />
              <button
                onClick={handleUrlConnect}
                disabled={!dataUrl.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-semibold"
              >
                <LinkIcon size={20} />
                <span>Veri Kaynağına Bağlan</span>
              </button>
            </div>

            {/* Rehber */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                <Globe className="text-green-600" size={16} />
                📖 URL Bağlantısı Rehberi
              </h4>
              <div className="space-y-2 text-xs text-green-900">
                <p><strong>Google Sheets:</strong> Dosya → Paylaş → "Linki olan herkes görüntüleyebilir"</p>
                <p><strong>Airtable:</strong> API Key oluşturun ve Base ID'yi alın</p>
                <p><strong>Avantaj:</strong> Gerçek zamanlı senkronizasyon!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isProcessing && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">🤖 AI Veri Analizi Yapılıyor...</span>
              <span className="text-sm font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                {progress > 20 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 20 ? "text-green-600 font-medium" : ""}>Dosya okunuyor...</span>
              </p>
              <p className="flex items-center gap-2">
                {progress > 50 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 50 ? "text-green-600 font-medium" : ""}>Veri yapısı analiz ediliyor...</span>
              </p>
              <p className="flex items-center gap-2">
                {progress > 80 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 80 ? "text-green-600 font-medium" : ""}>Dashboard oluşturuluyor...</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformAnalyticsPage;

