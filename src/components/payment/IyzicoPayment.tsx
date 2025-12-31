/**
 * iyzico Payment Component
 * FINOPS AI Studio
 * 
 * İyzico API Entegrasyonu için hazırlık
 * 
 * GEREKLİ:
 * 1. iyzico hesabı oluşturun: https://merchant.iyzipay.com/auth/register
 * 2. API Key ve Secret Key alın
 * 3. .env dosyasına ekleyin:
 *    VITE_IYZICO_API_KEY=your_api_key
 *    VITE_IYZICO_SECRET_KEY=your_secret_key
 * 4. Test modu için sandbox kullanın
 * 
 * ÜCRETLENDİRME:
 * - Kurulum ücreti: 0 TL
 * - İşlem komisyonu: %2.49 + 0.25 TL (değişkenlik gösterebilir)
 * - Aylık üyelik: Yok
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CreditCard, Check, AlertCircle } from 'lucide-react';
import { PlanType } from '../../types/subscription';

interface IyzicoPaymentProps {
  planType: PlanType;
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
}

const IyzicoPayment: React.FC<IyzicoPaymentProps> = ({
  planType,
  amount,
  billingPeriod,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // İyzico API keys (production'da .env'den gelecek)
  const IYZICO_API_KEY = import.meta.env.VITE_IYZICO_API_KEY;
  const IYZICO_SECRET_KEY = import.meta.env.VITE_IYZICO_SECRET_KEY;
  const IS_PRODUCTION = import.meta.env.VITE_NODE_ENV === 'production';

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // ✅ İyzico API entegrasyonu buraya gelecek
      
      if (!IYZICO_API_KEY || !IYZICO_SECRET_KEY) {
        // Test modu - API keys yoksa demo göster
        alert(
          '🧪 TEST MODU\n\n' +
          'İyzico ödeme sayfası açılacak.\n\n' +
          '⚠️ Production için gerekli:\n' +
          '1. iyzico.com\'dan hesap açın\n' +
          '2. API Key ve Secret Key alın\n' +
          '3. .env dosyasına ekleyin\n\n' +
          'Test Kart Numarası: 5528 7900 0000 0001\n' +
          'CVV: 123\n' +
          'Tarih: 12/30'
        );

        // Demo: 2 saniye sonra başarılı
        setTimeout(() => {
          alert('✅ Ödeme başarılı! (Demo)');
          navigate('/dashboard?payment=success');
        }, 2000);
        
        return;
      }

      // ✅ PRODUCTION: İyzico API çağrısı
      const response = await fetch('/api/payment/iyzico/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          amount,
          billingPeriod,
          apiKey: IYZICO_API_KEY,
          // Diğer gerekli bilgiler...
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // İyzico ödeme sayfasına yönlendir
        window.location.href = data.paymentPageUrl;
      } else {
        throw new Error(data.message || 'Ödeme başlatılamadı');
      }

    } catch (err: any) {
      console.error('İyzico payment error:', err);
      setError(err.message || 'Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <div className="text-2xl font-bold text-indigo-600">iyzico</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          iyzico ile Güvenli Ödeme
        </h2>
        <p className="text-gray-600">
          Türkiye'nin en güvenli ödeme altyapısı
        </p>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          Güvenlik Özellikleri
        </h3>
        <ul className="space-y-3">
          {[
            '256-bit SSL şifreleme ile korumalı',
            '3D Secure doğrulama',
            'PCI DSS Level 1 sertifikalı',
            'Kart bilgileriniz saklanmaz',
            'Anında onay, hızlı aktivasyon',
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
          <span className="text-2xl font-bold text-indigo-600">
            {amount.toLocaleString('tr-TR')} TL
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            • iyzico ödeme sayfasına yönlendirileceksiniz
          </p>
          <p className="mb-2">
            • Kredi kartı veya banka kartı ile ödeyebilirsiniz
          </p>
          <p>
            • Ödeme sonrası otomatik olarak aboneliğiniz aktif olacak
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
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>İşlem yapılıyor...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>iyzico ile Öde</span>
          </>
        )}
      </button>

      {/* Info */}
      <p className="text-xs text-gray-500 text-center">
        Ödeme işleminiz 256-bit SSL şifreleme ile korunmaktadır. <br />
        Kart bilgileriniz sistemimizde saklanmaz.
      </p>
    </div>
  );
};

export default IyzicoPayment;












