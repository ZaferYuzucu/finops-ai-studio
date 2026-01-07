/**
 * Usage Limits Panel - Kullanım Limitleri Göstergesi
 * FINOPS AI Studio
 * Dashboard'da kullanıcıya limit durumunu gösterir
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, LayoutDashboard, Clock, Crown, TrendingUp } from 'lucide-react';
import { useUsageLimits } from '../hooks/useUsageLimits';
import { useNavigate } from 'react-router-dom';

const UsageLimitsPanel: React.FC = () => {
  const { usageTracking, loading, checkAllLimits } = useUsageLimits();
  const [warnings, setWarnings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWarnings = async () => {
      const { warnings: w } = await checkAllLimits();
      setWarnings(w);
    };
    if (usageTracking) {
      loadWarnings();
    }
  }, [usageTracking]);

  if (loading || !usageTracking) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const getProgressColor = (current: number, max: number) => {
    if (max === 999999 || max === -1) return 'bg-green-500';
    const percentage = (current / max) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (current: number, max: number) => {
    if (max === 999999 || max === -1) {
      return <span className="text-xs font-semibold text-green-600">Sınırsız</span>;
    }
    const percentage = (current / max) * 100;
    if (percentage >= 100) {
      return <span className="text-xs font-semibold text-red-600">Limit Doldu</span>;
    }
    if (percentage >= 80) {
      return <span className="text-xs font-semibold text-orange-600">Limit Yaklaşıyor</span>;
    }
    return <span className="text-xs font-semibold text-green-600">Normal</span>;
  };

  const limitItems = [
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Kullanıcılar',
      current: usageTracking.currentUsers,
      max: usageTracking.maxUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: 'İşletmeler',
      current: usageTracking.currentBusinesses,
      max: usageTracking.maxBusinesses,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard\'lar',
      current: usageTracking.currentDashboards,
      max: usageTracking.maxDashboards,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Kalan Süre',
      current: usageTracking.daysRemaining,
      max: usageTracking.daysRemaining,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      isDuration: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Kullanım Limitleri</h3>
        <button
          onClick={() => navigate('/pricing')}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          <TrendingUp className="w-4 h-4" />
          Yükselt
        </button>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mb-4 space-y-2">
          {warnings.map((warning, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-orange-50 border border-orange-200 rounded-lg p-3"
            >
              <p className="text-xs text-orange-800 font-medium">
                {warning.message}
              </p>
              {warning.upgradeRequired && (
                <button
                  onClick={() => navigate('/pricing')}
                  className="text-xs text-orange-600 hover:text-orange-700 underline mt-1"
                >
                  Paketinizi Yükseltin
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Limit Items */}
      <div className="space-y-4">
        {limitItems.map((item, index) => {
          const isUnlimited = item.max === 999999 || item.max === -1;
          const percentage = isUnlimited ? 0 : (item.current / item.max) * 100;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-2"
            >
              {/* Label */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`${item.bgColor} p-2 rounded-lg ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {item.isDuration ? (
                      `${item.current} gün`
                    ) : (
                      `${item.current} / ${isUnlimited ? '∞' : item.max}`
                    )}
                  </span>
                  {!item.isDuration && getStatusBadge(item.current, item.max)}
                </div>
              </div>

              {/* Progress Bar */}
              {!item.isDuration && (
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isUnlimited ? '100%' : `${Math.min(100, percentage)}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`h-full rounded-full ${getProgressColor(item.current, item.max)}`}
                  />
                </div>
              )}

              {/* Duration Warning */}
              {item.isDuration && item.current <= 7 && item.current > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                  <p className="text-xs text-orange-800">
                    ⚠️ Aboneliğiniz yakında sona eriyor!
                  </p>
                </div>
              )}

              {item.isDuration && item.current <= 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <p className="text-xs text-red-800">
                    ❌ Aboneliğinizin süresi doldu!
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade CTA */}
      {(usageTracking.userLimitReached ||
        usageTracking.businessLimitReached ||
        usageTracking.dashboardLimitReached ||
        usageTracking.daysRemaining <= 7) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-indigo-900">
                Premium'a Geçin!
              </p>
              <p className="text-xs text-indigo-700">
                Sınırsız kullanım ve tüm özellikler
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
          >
            Paketleri İncele
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UsageLimitsPanel;



















