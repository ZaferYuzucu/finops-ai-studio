/**
 * Payment Checkout Page - Ödeme Yöntemi Seçimi ve İşlem
 * FINOPS AI Studio
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Building2, 
  Check, 
  ArrowLeft,
  Shield,
  Lock,
  Info,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { PlanType, PLAN_DEFINITIONS } from '../types/subscription';

// Payment Method Components
import IyzicoPayment from '../components/payment/IyzicoPayment';
import StripePayment from '../components/payment/StripePayment';
import CreditCardPayment from '../components/payment/CreditCardPayment';
import BankTransferPayment from '../components/payment/BankTransferPayment';

type PaymentMethod = 'iyzico' | 'stripe' | 'creditcard' | 'banktransfer';

const PaymentCheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { subscription } = useSubscription();
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [planType, setPlanType] = useState<PlanType | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    // URL'den plan bilgisini al
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan') as PlanType;
    const period = params.get('period') as 'monthly' | 'yearly' || 'monthly';

    if (plan && PLAN_DEFINITIONS[plan]) {
      setPlanType(plan);
      setBillingPeriod(period);
      
      const planDef = PLAN_DEFINITIONS[plan];
      let price = planDef.price;
      
      // Yıllık fiyat hesaplama (%20 indirim)
      if (period === 'yearly' && price > 0) {
        price = price * 12 * 0.8; // 12 ay, %20 indirim
      }
      
      setAmount(price);
    } else {
      // Plan bilgisi yoksa pricing'e geri dön
      navigate('/pricing');
    }
  }, [location, navigate]);

  // Giriş kontrolü
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { returnTo: location.pathname + location.search } });
    }
  }, [currentUser, navigate, location]);

  if (!planType || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const planDef = PLAN_DEFINITIONS[planType];

  const paymentMethods = [
    {
      id: 'iyzico' as PaymentMethod,
      name: 'iyzico',
      description: 'Türkiye\'nin güvenli ödeme altyapısı',
      icon: (
        <div className="text-2xl font-bold text-indigo-600">
          iyzico
        </div>
      ),
      badge: 'Popüler',
      badgeColor: 'bg-green-100 text-green-700',
      recommended: true,
    },
    {
      id: 'stripe' as PaymentMethod,
      name: 'Stripe',
      description: 'Uluslararası güvenli ödeme',
      icon: (
        <div className="text-2xl font-bold text-purple-600">
          Stripe
        </div>
      ),
      badge: 'Güvenli',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'creditcard' as PaymentMethod,
      name: 'Kredi Kartı',
      description: 'Direkt kredi kartı ile ödeme',
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 'banktransfer' as PaymentMethod,
      name: 'Banka Transferi',
      description: 'EFT / Havale ile ödeme',
      icon: <Building2 className="w-8 h-8 text-orange-600" />,
      badge: 'Manuel Onay',
      badgeColor: 'bg-orange-100 text-orange-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Paketlere Dön</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Ödeme Yöntemi Seçin
            </h1>
            <p className="text-lg text-gray-600">
              Güvenli ve hızlı ödeme seçenekleriyle işleminizi tamamlayın
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Sipariş Özeti
              </h2>

              {/* Plan Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 mb-4 border border-indigo-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Paket:</span>
                  <span className="text-sm font-bold text-indigo-900">
                    {planDef.displayName}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Dönem:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {billingPeriod === 'yearly' ? 'Yıllık (12 Ay)' : 'Aylık'}
                  </span>
                </div>
                {billingPeriod === 'yearly' && (
                  <div className="flex items-center justify-between text-green-600">
                    <span className="text-xs font-medium">İndirim:</span>
                    <span className="text-xs font-bold">%20 Kazanç!</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Paket Fiyatı:</span>
                  <span className="font-semibold">
                    {planDef.price === 0 ? 'Ücretsiz' : `${planDef.price.toLocaleString('tr-TR')} TL`}
                  </span>
                </div>

                {billingPeriod === 'yearly' && planDef.price > 0 && (
                  <>
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-sm">12 Aylık Toplam:</span>
                      <span className="font-semibold line-through text-gray-400">
                        {(planDef.price * 12).toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-green-600">
                      <span className="text-sm">Yıllık İndirim (-20%):</span>
                      <span className="font-bold">
                        -{(planDef.price * 12 * 0.2).toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Toplam:</span>
                  <span className="text-2xl text-indigo-600">
                    {amount === 0 ? 'Ücretsiz' : `${amount.toLocaleString('tr-TR')} TL`}
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    Güvenli Ödeme
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-gray-400" />
                    256-bit SSL Şifreleme
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-gray-400" />
                    PCI DSS Uyumlu
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-gray-400" />
                    3D Secure Doğrulama
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right: Payment Method Selection & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            {!selectedMethod && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ödeme Yöntemi Seçin
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`relative bg-white rounded-xl p-6 border-2 transition-all ${
                        method.recommended
                          ? 'border-indigo-300 shadow-lg'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      {/* Badge */}
                      {method.badge && (
                        <div className="absolute -top-3 -right-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${method.badgeColor} shadow-md`}>
                            {method.badge}
                          </span>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="flex items-center justify-center mb-4">
                        {method.icon}
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                        {method.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 text-center">
                        {method.description}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Ödeme Hakkında</p>
                      <ul className="space-y-1 text-blue-800">
                        <li>• Tüm ödemeler güvenli ve şifreli kanallardan yapılır</li>
                        <li>• Kredi kartı bilgileriniz sistemimizde saklanmaz</li>
                        <li>• Banka transferi 1-2 iş günü içinde onaylanır</li>
                        <li>• İstediğiniz zaman paketinizi değiştirebilirsiniz</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Form (After Method Selection) */}
            <AnimatePresence mode="wait">
              {selectedMethod && (
                <motion.div
                  key={selectedMethod}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedMethod(null)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Yöntemi Değiştir</span>
                  </button>

                  {/* Render Selected Payment Method Component */}
                  {selectedMethod === 'iyzico' && (
                    <IyzicoPayment
                      planType={planType}
                      amount={amount}
                      billingPeriod={billingPeriod}
                    />
                  )}
                  {selectedMethod === 'stripe' && (
                    <StripePayment
                      planType={planType}
                      amount={amount}
                      billingPeriod={billingPeriod}
                    />
                  )}
                  {selectedMethod === 'creditcard' && (
                    <CreditCardPayment
                      planType={planType}
                      amount={amount}
                      billingPeriod={billingPeriod}
                    />
                  )}
                  {selectedMethod === 'banktransfer' && (
                    <BankTransferPayment
                      planType={planType}
                      amount={amount}
                      billingPeriod={billingPeriod}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckoutPage;



















