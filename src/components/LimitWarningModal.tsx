/**
 * Limit Warning Modal - Kullanım Limiti Aşımı Uyarısı
 * FINOPS AI Studio
 */

import React from 'react';
import { X, AlertTriangle, TrendingUp, Crown, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LimitCheckResult, UsageLimitType } from '../types/subscription';

interface LimitWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: UsageLimitType;
  limitResult: LimitCheckResult;
  actionName?: string; // "yeni kullanıcı ekleme", "dashboard oluşturma", vb.
}

const LimitWarningModal: React.FC<LimitWarningModalProps> = ({
  isOpen,
  onClose,
  limitType,
  limitResult,
  actionName,
}) => {
  const navigate = useNavigate();

  const getLimitInfo = () => {
    switch (limitType) {
      case 'users':
        return {
          icon: <Zap className="w-12 h-12 text-orange-600" />,
          title: 'Kullanıcı Limiti Doldu',
          description: 'Maksimum kullanıcı sayısına ulaştınız.',
          feature: 'Daha fazla kullanıcı eklemek',
        };
      case 'businesses':
        return {
          icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
          title: 'İşletme Limiti Doldu',
          description: 'Maksimum işletme sayısına ulaştınız.',
          feature: 'Daha fazla işletme tanımlamak',
        };
      case 'dashboards':
        return {
          icon: <Crown className="w-12 h-12 text-purple-600" />,
          title: 'Dashboard Limiti Doldu',
          description: 'Maksimum dashboard sayısına ulaştınız.',
          feature: 'Daha fazla dashboard oluşturmak',
        };
      case 'duration':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-600" />,
          title: 'Abonelik Süresi Doldu',
          description: 'Aboneliğinizin süresi sona ermiş.',
          feature: 'Platformu kullanmaya devam etmek',
        };
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-gray-600" />,
          title: 'Limit Aşıldı',
          description: 'Bir limit aşıldı.',
          feature: 'Bu özelliği kullanmak',
        };
    }
  };

  const limitInfo = getLimitInfo();

  const handleUpgrade = () => {
    onClose();
    navigate('/pricing');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                {limitInfo.icon}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              {limitInfo.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-center mb-6">
              {limitInfo.description}
            </p>

            {/* Limit Info Box */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Mevcut Kullanım:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {limitResult.currentUsage} / {limitResult.limit === -1 ? '∞' : limitResult.limit}
                </span>
              </div>
              
              {/* Progress Bar */}
              {limitResult.limit !== -1 && (
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.min(100, (limitResult.currentUsage / limitResult.limit) * 100)}%` 
                    }}
                    className={`h-full rounded-full ${
                      limitResult.currentUsage >= limitResult.limit
                        ? 'bg-red-500'
                        : limitResult.currentUsage >= limitResult.limit * 0.8
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                  />
                </div>
              )}

              {/* Action Name */}
              {actionName && (
                <p className="text-xs text-gray-500 mt-3">
                  <strong>İşlem:</strong> {actionName}
                </p>
              )}
            </div>

            {/* Warning Message */}
            {limitResult.reason && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-orange-800 text-center font-medium">
                  {limitResult.reason}
                </p>
              </div>
            )}

            {/* Upgrade Message */}
            {limitResult.upgradeRequired && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border border-indigo-200">
                <p className="text-sm text-indigo-900 text-center mb-2">
                  <strong>{limitInfo.feature}</strong> için paketinizi yükseltmeniz gerekiyor.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-indigo-700">
                  <Crown className="w-4 h-4" />
                  <span>Premium ve Kurumsal paketlerde sınırsız!</span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              {limitResult.upgradeRequired ? (
                <>
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  >
                    Kapat
                  </button>
                  <button
                    onClick={handleUpgrade}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-medium"
                  >
                    Paketleri Gör
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                >
                  Tamam
                </button>
              )}
            </div>

            {/* Support Link */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Sorularınız mı var?{' '}
              <a href="mailto:info@finops.ist" className="text-indigo-600 hover:underline">
                Bize Ulaşın
              </a>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LimitWarningModal;










