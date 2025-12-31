/**
 * Stripe Payment Component
 * FINOPS AI Studio
 * 
 * Stripe API Entegrasyonu
 * 
 * GEREKLİ:
 * 1. Stripe hesabı oluşturun: https://dashboard.stripe.com/register
 * 2. Publishable Key ve Secret Key alın
 * 3. .env dosyasına ekleyin:
 *    VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
 *    VITE_STRIPE_SECRET_KEY=sk_test_...
 * 4. NPM paketi yükleyin: npm install @stripe/stripe-js @stripe/react-stripe-js
 * 
 * ÜCRETLENDİRME:
 * - Kurulum ücreti: 0
 * - İşlem komisyonu: 2.9% + $0.30 (Türkiye için ~%3.4 + 2 TL)
 * - Aylık üyelik: Yok
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CreditCard, Check, AlertCircle, Globe } from 'lucide-react';
import { PlanType } from '../../types/subscription';

interface StripePaymentProps {
  planType: PlanType;
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
}

const StripePayment: React.FC<StripePaymentProps> = ({
  planType,
  amount,
  billingPeriod,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Stripe API keys
  const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      if (!STRIPE_PUBLISHABLE_KEY || !STRIPE_SECRET_KEY) {
        // Test modu
        alert(
          '🧪 TEST MODU - STRIPE\n\n' +
          'Stripe ödeme sayfası açılacak.\n\n' +
          '⚠️ Production için gerekli:\n' +
          '1. stripe.com\'dan hesap açın\n' +
          '2. API keys alın\n' +
          '3. npm install @stripe/stripe-js\n' +
          '4. .env dosyasına ekleyin\n\n' +
          'Test Kart: 4242 4242 4242 4242\n' +
          'CVV: Herhangi 3 rakam\n' +
          'Tarih: Gelecek bir tarih'
        );

        setTimeout(() => {
          alert('✅ Stripe ödeme başarılı! (Demo)');
          navigate('/dashboard?payment=success');
        }, 2000);
        
        return;
      }

      // ✅ PRODUCTION: Stripe Checkout Session oluştur
      const response = await fetch('/api/payment/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          amount,
          billingPeriod,
          publishableKey: STRIPE_PUBLISHABLE_KEY,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Stripe Checkout'a yönlendir
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.message || 'Ödeme başlatılamadı');
      }

    } catch (err: any) {
      console.error('Stripe payment error:', err);
      setError(err.message || 'Ödeme işlemi başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <div className="text-2xl font-bold text-purple-600">Stripe</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Stripe ile Uluslararası Ödeme
        </h2>
        <p className="text-gray-600">
          Dünya genelinde 135+ ülkede kullanılan güvenli ödeme
        </p>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-600" />
          Stripe Avantajları
        </h3>
        <ul className="space-y-3">
          {[
            'Uluslararası kartlarla ödeme',
            'Apple Pay ve Google Pay desteği',
            'SCA (Strong Customer Authentication) uyumlu',
            'Otomatik fatura ve makbuz',
            'Çoklu para birimi desteği',
          ].map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Payment Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">Ödenecek Tutar:</span>
          <span className="text-2xl font-bold text-purple-600">
            {amount.toLocaleString('tr-TR')} TL
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            • Stripe güvenli ödeme sayfasına yönlendirileceksiniz
          </p>
          <p className="mb-2">
            • Tüm ana kartlar kabul edilir (Visa, Mastercard, Amex)
          </p>
          <p>
            • Ödeme sonrası aboneliğiniz anında aktif olur
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </motion.div>
      )}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>İşlem yapılıyor...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>Stripe ile Öde</span>
          </>
        )}
      </button>

      {/* Info */}
      <p className="text-xs text-gray-500 text-center">
        Ödeme işleminiz Stripe güvenli altyapısı ile korunmaktadır. <br />
        PCI DSS Level 1 sertifikalı ödeme işlemi.
      </p>
    </div>
  );
};

export default StripePayment;












