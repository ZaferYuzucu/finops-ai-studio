import { Check, ChevronDown, Crown, Zap, Users, Star, Sparkles, TrendingUp, Building2, AlertCircle, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSubscription } from '../hooks/useSubscription';
import { PlanType } from '../types/subscription';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { BetaApplicationFormData, SECTOR_OPTIONS, EMPLOYEE_COUNT_OPTIONS } from '../types/betaApplication';
import { createUserApplication } from '../services/betaApplicationService';
import { BETA_LIMIT, getLocalBetaCount } from '../utils/betaQuota';

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  badge?: string;
  badgeColor?: string;
  priceNote?: string;
  features: string[];
  excludedTitle?: string;
  excludedFeatures?: string[];
  addonTitle?: string;
  addonPrice?: string;
  addonPeriod?: string;
  addonSubtitle?: string;
  addonFeatures?: string[];
  buttonText: string;
  buttonLink: string;
  isPremium?: boolean;
  isSpecialOffer?: boolean;
  isEnterprise?: boolean;
  specialNote?: string;
  icon?: React.ReactNode;
  planType: PlanType;
  onSelectPlan?: (planType: PlanType) => void;
  isCurrentPlan?: boolean;
  isDisabled?: boolean;
  disabledMessage?: string;
  limitWarning?: string;
}

const PricingCard = ({
  title,
  subtitle,
  price,
  period,
  badge,
  badgeColor = "bg-blue-100 text-blue-700",
  priceNote,
  features,
  excludedTitle,
  excludedFeatures,
  addonTitle,
  addonPrice,
  addonPeriod,
  addonSubtitle,
  addonFeatures,
  buttonText,
  buttonLink,
  isPremium = false,
  isSpecialOffer = false,
  isEnterprise = false,
  specialNote,
  icon,
  planType,
  onSelectPlan,
  isCurrentPlan = false,
  isDisabled = false,
  disabledMessage,
  limitWarning
}: PricingCardProps) => {
  const { t } = useTranslation();
  const getCardStyle = () => {
    if (isDisabled) {
      return 'bg-gray-100 text-gray-500 shadow-lg border-2 border-gray-300 opacity-60';
    }
    if (isPremium) {
      return 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl border-4 border-indigo-400 ring-4 ring-indigo-200 z-10';
    }
    if (isSpecialOffer) {
      return 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 text-white shadow-2xl border-4 border-yellow-300 ring-4 ring-yellow-100 z-10';
    }
    if (isEnterprise) {
      return 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white shadow-2xl border-4 border-slate-600 ring-4 ring-slate-200 z-10';
    }
    return 'bg-white text-gray-900 shadow-xl border-2 border-gray-200 hover:border-indigo-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isDisabled ? {} : { y: -8, scale: isPremium || isSpecialOffer || isEnterprise ? 1.02 : 1.01 }}
      transition={{ duration: 0.3 }}
      className={`relative flex flex-col h-full rounded-2xl p-8 ${getCardStyle()} transition-all duration-300`}
    >
      {/* Badge (Süre Sınırı) */}
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${badgeColor} shadow-lg border-2 border-white`}>
            {badge}
          </span>
        </div>
      )}

      {/* Disabled Message */}
      {isDisabled && disabledMessage && (
        <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center z-20">
          <div className="text-center p-6">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-white font-bold text-lg">{disabledMessage}</p>
          </div>
        </div>
      )}

      {/* Limit Warning */}
      {limitWarning && !isDisabled && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full px-4">
          <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-xs font-semibold text-center shadow-lg">
            {limitWarning}
          </div>
        </div>
      )}

      {/* Premium Crown */}
      {isPremium && !isDisabled && (
        <div className="absolute -top-5 -right-5 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-pulse">
          <Crown className="w-8 h-8 text-yellow-800" />
        </div>
      )}

      {/* Special Offer Badge */}
      {isSpecialOffer && !isDisabled && (
        <div className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-bounce">
          <Sparkles className="w-8 h-8 text-amber-800" />
        </div>
      )}

      {/* Enterprise Badge */}
      {isEnterprise && !isDisabled && (
        <div className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
          <Building2 className="w-8 h-8 text-white" />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className={`mb-4 w-14 h-14 rounded-xl flex items-center justify-center ${
          isPremium || isSpecialOffer || isEnterprise ? 'bg-white/20' : 'bg-indigo-100'
        }`}>
          {icon}
        </div>
      )}

      {/* Başlık */}
      <h3 className={`text-2xl font-bold mb-1 ${
        isPremium || isSpecialOffer || isEnterprise ? 'text-white' : isDisabled ? 'text-gray-500' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <p className={`text-sm mb-6 ${
        isPremium || isSpecialOffer || isEnterprise ? 'text-white/90' : isDisabled ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {subtitle}
      </p>

      {/* Fiyat */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-extrabold ${
            isPremium || isSpecialOffer || isEnterprise ? 'text-white' : isDisabled ? 'text-gray-400' : 'text-indigo-600'
          }`}>
            {price}
          </span>
          {price !== 'Teklif Alın' && (
            <span className={`text-xl ${
              isPremium || isSpecialOffer || isEnterprise ? 'text-white/80' : isDisabled ? 'text-gray-400' : 'text-gray-600'
            }`}>
              TL
            </span>
          )}
        </div>
        <p className={`text-sm mt-1 ${
          isPremium || isSpecialOffer || isEnterprise ? 'text-white/80' : isDisabled ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {period}
        </p>
        {priceNote && (
          <p className={`text-xs mt-2 font-medium ${
            isPremium ? 'text-yellow-200' : isSpecialOffer ? 'text-yellow-100' : isEnterprise ? 'text-slate-200' : 'text-indigo-600'
          }`}>
            {priceNote}
          </p>
        )}
      </div>

      {/* Özellikler */}
      {isPremium ? (
        <details
          className="mb-6 rounded-xl p-4 bg-white/15 border border-white/20 flex-grow"
        >
          <summary className="cursor-pointer select-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-extrabold text-white">
              {t('pricing.includes')}
            </span>
            <ChevronDown className="w-4 h-4 text-white/80" />
          </summary>
          <ul className="mt-4 space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-start gap-3"
              >
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span className="text-sm leading-relaxed text-white">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </details>
      ) : (
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isPremium ? 'text-yellow-300' :
                isSpecialOffer ? 'text-yellow-200' :
                isEnterprise ? 'text-slate-300' :
                isDisabled ? 'text-gray-400' : 'text-green-600'
              }`} />
              <span className={`text-sm leading-relaxed ${
                isPremium || isSpecialOffer || isEnterprise ? 'text-white' :
                isDisabled ? 'text-gray-500' : 'text-gray-700'
              }`}>
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Dahil Değil (Premium upsell context) */}
      {!isPremium && excludedFeatures && excludedFeatures.length > 0 && (
        <div className={`mb-6 rounded-xl p-4 ${
          isPremium ? 'bg-white/15 border border-white/20' : 'bg-gray-50 border border-gray-200'
        }`}>
          {excludedTitle && (
            <div className={`text-xs font-bold mb-3 ${
              isPremium ? 'text-white/90' : 'text-gray-700'
            }`}>
              {excludedTitle}
            </div>
          )}
          <ul className="space-y-2">
            {excludedFeatures.map((f, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Lock className={`w-4 h-4 mt-0.5 ${
                  isPremium ? 'text-white/80' : 'text-gray-500'
                }`} />
                <span className={`text-xs ${
                  isPremium ? 'text-white/85' : 'text-gray-600'
                }`}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CFO Add-on (Premium upsell) */}
      {addonTitle && addonPrice && (
        isPremium ? (
          <div className="mb-6 flex items-baseline justify-between gap-3">
            <span className="font-extrabold text-white">{addonTitle}</span>{' '}
            <span className="text-base font-extrabold text-white">
              +{addonPrice} TL{addonPeriod ? `/${addonPeriod}` : ''}
            </span>
          </div>
        ) : (
          <div className={`mb-6 rounded-xl p-4 ${
            isPremium ? 'bg-white/15 border border-white/20' : 'bg-indigo-50 border border-indigo-200'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className={`text-sm font-extrabold ${
                  isPremium ? 'text-white' : 'text-indigo-900'
                }`}>
                  {addonTitle}
                </div>
                {addonSubtitle && (
                  <div className={`mt-1 text-xs ${
                    isPremium ? 'text-white/85' : 'text-indigo-700'
                  }`}>
                    {addonSubtitle}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className={`text-xl font-extrabold ${
                  isPremium ? 'text-white' : 'text-indigo-900'
                }`}>
                  +{addonPrice} TL
                </div>
                {addonPeriod && (
                  <div className={`text-xs ${
                    isPremium ? 'text-white/75' : 'text-indigo-700'
                  }`}>
                    {addonPeriod}
                  </div>
                )}
              </div>
            </div>
            {addonFeatures && addonFeatures.length > 0 && (
              <ul className="mt-3 space-y-2">
                {addonFeatures.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 ${
                      isPremium ? 'text-yellow-300' : 'text-green-600'
                    }`} />
                    <span className={`text-xs ${
                      isPremium ? 'text-white/90' : 'text-gray-700'
                    }`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className={`mt-3 text-[11px] ${
              isPremium ? 'text-yellow-100' : 'text-indigo-700'
            }`}>
              {t('pricing.cfoAddon.note')}
            </div>
          </div>
        )
      )}

      {/* Özel Not */}
      {specialNote && (
        <div className={`mb-4 p-3 rounded-lg text-xs ${
          isPremium 
            ? 'bg-white/20 text-indigo-100' 
            : isSpecialOffer 
            ? 'bg-white/20 text-yellow-50'
            : isEnterprise
            ? 'bg-white/20 text-slate-100'
            : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}>
          {specialNote}
        </div>
      )}

      {/* Buton */}
      <button
        onClick={() => onSelectPlan && onSelectPlan(planType)}
        disabled={isCurrentPlan || isDisabled}
        className={`w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 ${
          isCurrentPlan || isDisabled
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : isPremium
            ? 'bg-white text-indigo-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl'
            : isSpecialOffer
            ? 'bg-white text-amber-600 hover:bg-amber-50 shadow-xl hover:shadow-2xl'
            : isEnterprise
            ? 'bg-white text-slate-800 hover:bg-slate-50 shadow-xl hover:shadow-2xl'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {isCurrentPlan ? t('pricing.currentPlan') : buttonText}
      </button>
    </motion.div>
  );
};

export default function PricingSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser } = useAuth(); // ✅ Kullanıcı kontrolü için
  const { subscription, createSubscription, changePlan, loading } = useSubscription();
  const [processingPlan, setProcessingPlan] = useState<PlanType | null>(null);
  const [betaLimitReached, setBetaLimitReached] = useState(false);
  const [betaCount, setBetaCount] = useState(0);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [showBetaModal, setShowBetaModal] = useState(false);
  const YEARLY_DISCOUNT = 0.20;

  // Beta limit kontrolü
  useEffect(() => {
    const checkBetaLimit = async () => {
      try {
        const betaLimitDoc = doc(db, 'system', 'beta_limit');
        const docSnap = await getDoc(betaLimitDoc);
        
        if (docSnap.exists()) {
          const count = docSnap.data().count || 0;
          setBetaCount(count);
          setBetaLimitReached(count >= BETA_LIMIT);
        } else {
          // İlk defa oluştur
          await setDoc(betaLimitDoc, { count: 0, createdAt: new Date() });
          setBetaCount(0);
          setBetaLimitReached(false);
        }
      } catch (error) {
        // Public/beta users may not have Firestore permissions for /system.
        // Fallback to localStorage-based demo counter.
        const localCount = getLocalBetaCount();
        setBetaCount(localCount);
        setBetaLimitReached(localCount >= BETA_LIMIT);
        console.warn('Beta limit check fallback (localStorage):', { localCount, error });
      }
    };

    checkBetaLimit();

    // Keep in sync when beta applications are created in the same session
    const onLocalUpdate = () => {
      const localCount = getLocalBetaCount();
      setBetaCount(localCount);
      setBetaLimitReached(localCount >= BETA_LIMIT);
    };
    window.addEventListener('storage', onLocalUpdate);
    window.addEventListener('finops-beta-applications-updated', onLocalUpdate as any);
    return () => {
      window.removeEventListener('storage', onLocalUpdate);
      window.removeEventListener('finops-beta-applications-updated', onLocalUpdate as any);
    };
  }, []);

  const handleSelectPlan = async (planType: PlanType) => {
    setProcessingPlan(planType);

    try {
      // ✅ 1. Beta Partner için online başvuru formu
      if (planType === 'BetaPartner') {
        setProcessingPlan(null);
        
        if (betaLimitReached) {
          alert('❌ Üzgünüz, Lansman Partneri kontenjanı dolmuştur.');
          return;
        }
        
        // Beta başvuru modalını aç
        setShowBetaModal(true);
        return;
      }

      // ✅ 2. Enterprise planı için e-posta yönlendirmesi
      if (planType === 'Enterprise') {
        setProcessingPlan(null);
        
        const emailSubject = encodeURIComponent('FINOPS AI Studio - Kurumsal Paket Talebi');
        const emailBody = encodeURIComponent(
          `Merhaba FINOPS AI Studio Ekibi,\n\n` +
          `Kurumsal paket hakkında detaylı bilgi almak istiyorum.\n\n` +
          `Lütfen benimle iletişime geçebilir misiniz?\n\n` +
          `Teşekkürler.`
        );
        
        // Email client'ı aç
        window.location.href = `mailto:info@finops.ist?subject=${emailSubject}&body=${emailBody}`;
        
        alert(
          '📧 E-posta programınız açılıyor!\n\n' +
          '✅ Kurumsal paket talebinizi info@finops.ist adresine gönderin.\n' +
          '✅ Özel fiyatlandırma ve özellikler için size geri dönüş yapacağız.'
        );
        return;
      }

      // ✅ 3. DİĞER PLANLAR İÇİN GİRİŞ KONTROLÜ
      if (!currentUser) {
        setProcessingPlan(null);
        alert(
          '🔐 Giriş Gerekli\n\n' +
          'Bu paketi seçmek için önce giriş yapmanız gerekiyor.\n\n' +
          '✅ Giriş sayfasına yönlendiriliyorsunuz...'
        );
        // Seçilen planı state'e kaydet (giriş sonrası kullanmak için)
        sessionStorage.setItem('selectedPlan', planType);
        navigate('/login');
        return;
      }

      // ✅ 4. GİRİŞ YAPILMIŞSA NORMAL AKIŞ
      if (!subscription) {
        // Yeni abonelik oluştur
        await createSubscription(planType, 'Trial');
        alert(`🎉 ${planType} paketine başarıyla kaydoldunuz!`);
        navigate('/dashboard');
      } else {
        // Mevcut paketi değiştir
        await changePlan(planType, 'User upgraded from pricing page');
        alert(`✅ Paketiniz ${planType} olarak güncellendi!`);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Plan selection error:', error);
      alert(`❌ Hata: ${error.message}`);
    } finally {
      setProcessingPlan(null);
    }
  };

  // Fiyat hesaplama fonksiyonu
  const calculatePrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return '0';
    if (billingPeriod === 'yearly') {
      const yearlyTotal = monthlyPrice * 12 * (1 - YEARLY_DISCOUNT);
      const monthlyEquivalent = yearlyTotal / 12;
      return Math.round(monthlyEquivalent).toString();
    }
    return monthlyPrice.toString();
  };

  const getPeriodText = (isSpecial: boolean = false) => {
    if (isSpecial) return '/ 1 Yıl Ücretsiz';
    return billingPeriod === 'yearly' ? '/ Ay (Yıllık Ödeme)' : '/ Ay';
  };

  const pricingPlans = [
    {
      planType: 'BetaPartner' as PlanType,
      title: t('pricing.launchPartner.title'),
      subtitle: t('pricing.launchPartner.subtitle'),
      price: t('pricing.launchPartner.price'),
      period: t('pricing.launchPartner.period'),
      badge: betaLimitReached ? `❌ ${t('pricing.launchPartner.quotaFull')}` : `🎯 ${BETA_LIMIT - betaCount}/${BETA_LIMIT} ${t('pricing.launchPartner.badge')}`,
      badgeColor: betaLimitReached ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700',
      limitWarning: !betaLimitReached && betaCount >= BETA_LIMIT - 5 ? `⚠️ ${t('pricing.launchPartner.quotaWarning').replace('X', (BETA_LIMIT - betaCount).toString())}` : undefined,
      priceNote: t('pricing.launchPartner.priceNote'),
      specialNote: t('pricing.launchPartner.specialNote'),
      features: [
        t('pricing.launchPartner.features.1'),
        t('pricing.launchPartner.features.2'),
        t('pricing.launchPartner.features.3'),
        t('pricing.launchPartner.features.4')
      ],
      buttonText: betaLimitReached ? t('pricing.launchPartner.buttonFull') : t('pricing.launchPartner.button'),
      buttonLink: '/contact',
      isSpecialOffer: true,
      isDisabled: betaLimitReached,
      disabledMessage: betaLimitReached ? t('pricing.launchPartner.buttonFull') : undefined,
      icon: <Sparkles className="w-7 h-7 text-white" />
    },
    {
      planType: 'Girisimci' as PlanType,
      title: t('pricing.entrepreneur.title'),
      subtitle: t('pricing.entrepreneur.subtitle'),
      price: t('pricing.entrepreneur.price'),
      period: t('pricing.entrepreneur.period'),
      badge: `⏱️ ${t('pricing.entrepreneur.badge')}`,
      badgeColor: 'bg-emerald-100 text-emerald-700',
      specialNote: t('pricing.entrepreneur.specialNote'),
      features: [
        t('pricing.entrepreneur.features.1'),
        t('pricing.entrepreneur.features.2'),
        t('pricing.entrepreneur.features.3'),
        t('pricing.entrepreneur.features.4')
      ],
      buttonText: t('pricing.entrepreneur.button'),
      buttonLink: '/signup',
      icon: <Zap className="w-7 h-7 text-indigo-600" />
    },
    {
      planType: 'IsletmeDostu' as PlanType,
      title: t('pricing.business.title'),
      subtitle: t('pricing.business.subtitle'),
      price: calculatePrice(599),
      period: getPeriodText(),
      priceNote: billingPeriod === 'yearly' 
        ? t('pricing.business.priceNote')
        : t('pricing.business.priceNoteMonthly'),
      features: [
        t('pricing.business.features.1'),
        t('pricing.business.features.2'),
        t('pricing.business.features.3'),
        t('pricing.business.features.4')
      ],
      buttonText: t('pricing.business.button'),
      buttonLink: '/signup',
      icon: <Users className="w-7 h-7 text-indigo-600" />
    },
    {
      planType: 'Premium' as PlanType,
      title: t('pricing.premium.title'),
      subtitle: t('pricing.premium.subtitle'),
      price: calculatePrice(1799),
      period: getPeriodText(),
      badge: t('pricing.premium.badge'),
      badgeColor: 'bg-white/20 text-white',
      priceNote: billingPeriod === 'yearly' ? t('pricing.premium.priceNote') : undefined,
      features: [
        t('pricing.premium.includes.1'),
        t('pricing.premium.includes.2'),
        t('pricing.premium.includes.3'),
        t('pricing.premium.includes.4'),
        t('pricing.premium.includes.5')
      ],
      excludedTitle: t('pricing.premium.excludesTitle'),
      excludedFeatures: [
        t('pricing.premium.excludes.1'),
        t('pricing.premium.excludes.2'),
        t('pricing.premium.excludes.3')
      ],
      addonTitle: t('pricing.cfoAddon.title'),
      addonSubtitle: t('pricing.cfoAddon.subtitle'),
      addonPrice: t('pricing.cfoAddon.price'),
      addonPeriod: t('pricing.cfoAddon.period'),
      addonFeatures: [
        t('pricing.cfoAddon.features.1'),
        t('pricing.cfoAddon.features.2'),
        t('pricing.cfoAddon.features.3'),
        t('pricing.cfoAddon.features.4')
      ],
      buttonText: t('pricing.premium.button'),
      buttonLink: '/signup',
      isPremium: true,
      icon: <Star className="w-7 h-7 text-white" />
    },
    {
      planType: 'Enterprise' as PlanType,
      title: t('pricing.enterprise.title'),
      subtitle: t('pricing.enterprise.subtitle'),
      price: t('pricing.enterprise.price'),
      period: t('pricing.enterprise.period'),
      priceNote: t('pricing.enterprise.priceNote'),
      features: [
        t('pricing.enterprise.features.1'),
        t('pricing.enterprise.features.2'),
        t('pricing.enterprise.features.3'),
        t('pricing.enterprise.features.4')
      ],
      buttonText: t('pricing.enterprise.button'),
      buttonLink: '/contact',
      isEnterprise: true,
      icon: <Building2 className="w-7 h-7 text-white" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>{t('pricing.transparentPricing')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('pricing.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              {t('pricing.titleHighlight')}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {t('pricing.subtitle')}
          </p>

          {/* Aylık/Yıllık Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 shadow-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                billingPeriod === 'yearly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('pricing.yearly')}
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                {t('pricing.yearlyDiscount')}
              </span>
            </button>
          </div>

          {/* Yıllık Seçili İse Bilgi Notu */}
          {billingPeriod === 'yearly' && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-green-600 font-medium"
            >
              ✨ {t('pricing.yearlyNote')}
            </motion.p>
          )}
        </motion.div>

        {/* Fiyatlandırma Kartları */}
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingCard 
                key={index} 
                {...plan} 
                onSelectPlan={handleSelectPlan}
                isCurrentPlan={subscription?.planType === plan.planType}
              />
            ))}
          </div>
        </div>
        
        {/* Loading Indicator */}
        {processingPlan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm text-center">
              <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-900">
                {processingPlan} paketi hazırlanıyor...
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Lütfen bekleyin
              </p>
            </div>
          </div>
        )}

        {/* Ödeme Yöntemleri */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                🔒
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t('pricing.payment.title')}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              {t('pricing.payment.description')}
            </p>

            {/* Ödeme Logoları */}
            <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
              <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
                <span className="text-2xl font-bold text-indigo-600">iyzico</span>
              </div>
              <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
                <span className="text-2xl font-bold text-purple-600">Stripe</span>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-700">💳 {t('pricing.payment.creditCard')}</span>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-700">🏦 {t('pricing.payment.bankTransfer')}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 flex-wrap text-xs text-gray-500 pt-4 border-t border-gray-200">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                {t('pricing.payment.features.ssl')}
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                {t('pricing.payment.features.support')}
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                {t('pricing.payment.features.updates')}
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                {t('pricing.payment.features.guarantee')}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            {t('pricing.payment.disclaimer')}
          </p>
        </motion.div>

      </div>

      {/* Beta Başvuru Modal */}
      {showBetaModal && (
        <BetaApplicationModal
          onClose={() => setShowBetaModal(false)}
          remainingQuota={BETA_LIMIT - betaCount}
          totalQuota={BETA_LIMIT}
        />
      )}
    </section>
  );
}

// Beta Başvuru Modal Component
interface BetaApplicationModalProps {
  onClose: () => void;
  remainingQuota: number;
  totalQuota: number;
}

const BetaApplicationModal: React.FC<BetaApplicationModalProps> = ({ onClose, remainingQuota, totalQuota }) => {
  const [formData, setFormData] = useState<BetaApplicationFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employeeCount: '1-10',
    sector: 'restaurant_cafe',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await createUserApplication(formData);
      
      alert(
        '✅ Başvurunuz Alındı!\n\n' +
        'Beta Partner başvurunuz başarıyla kaydedildi.\n' +
        'En kısa sürede size geri dönüş yapacağız.\n\n' +
        `📧 ${formData.email} adresine onay e-postası göndereceğiz.`
      );
      
      onClose();
    } catch (error) {
      console.error('Başvuru hatası:', error);
      alert('❌ Başvuru gönderilirken hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-8 my-8 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Lansman Partneri Başvurusu
          </h2>
          <p className="text-gray-600">
            1 yıl boyunca tamamen ücretsiz, tüm premium özelliklere erişim
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-bold">
            <AlertCircle className="w-4 h-4" />
            Kalan Kontenjan: {remainingQuota}/{totalQuota}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Firma Adı */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Firma Adı *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Örn: ABC Restaurant"
              />
            </div>

            {/* İletişim Kişisi */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Adınız Soyadınız *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Örn: Ahmet Yılmaz"
              />
            </div>

            {/* E-posta */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                İş E-postanız *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="ornek@firma.com"
              />
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="0555 555 55 55"
              />
            </div>

            {/* Sektör */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sektörünüz *
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 appearance-none bg-white transition-all"
              >
                {SECTOR_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Çalışan Sayısı */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Çalışan Sayınız *
              </label>
              <select
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 appearance-none bg-white transition-all"
              >
                {EMPLOYEE_COUNT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Neden Lansman Partneri Olmak İstiyorsunuz? (Opsiyonel)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
              placeholder="Platformu nasıl kullanmayı planlıyorsunuz? Ne tür dashboardlar oluşturacaksınız?"
            />
          </div>

          {/* Bilgi Kutusu */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
            <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Check className="w-5 h-5" />
              Başvuru Sonrası Ne Olacak?
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>✅ Başvurunuz 24 saat içinde değerlendirilecek</li>
              <li>✅ Onay e-postası {formData.email || 'e-posta adresinize'} gönderilecek</li>
              <li>✅ Kayıt olduğunuzda Beta Partner planı otomatik aktif olacak</li>
              <li>✅ 1 yıl boyunca tüm premium özellikler ücretsiz</li>
            </ul>
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '📤 Gönderiliyor...' : '🚀 Başvurumu Gönder'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all font-semibold disabled:opacity-50"
            >
              İptal
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};