/**
 * Credit Card Payment Component (Direct)
 * FINOPS AI Studio
 * 
 * Direkt kredi kartı ile ödeme
 * NOT: Bu yöntem için PCI DSS uyumlu bir payment gateway gerekir
 * 
 * ÖNERİLEN GATEWAY'LER:
 * - iyzico (Türkiye)
 * - Stripe (Uluslararası)
 * - PayTR (Türkiye)
 * - Param (Türkiye)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Check, AlertCircle, Lock, Shield } from 'lucide-react';
import { PlanType } from '../../types/subscription';

interface CreditCardPaymentProps {
  planType: PlanType;
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
}

const CreditCardPayment: React.FC<CreditCardPaymentProps> = ({
  planType,
  amount,
  billingPeriod,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Format card number (16 digits, space separated)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace('/', '').length <= 4) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  const validateForm = (): boolean => {
    if (!cardName.trim()) {
      setError('Kart üzerindeki isim gerekli');
      return false;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Geçerli bir kart numarası giriniz (16 hane)');
      return false;
    }
    if (expiryDate.length !== 5) {
      setError('Geçerli bir son kullanma tarihi giriniz (AA/YY)');
      return false;
    }
    if (cvv.length < 3) {
      setError('Geçerli bir CVV giriniz (3-4 hane)');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // ⚠️ UYARI: Gerçek production'da direkt kart bilgisi sunucuya gönderilmez!
      // PCI DSS uyumlu bir gateway kullanılmalı (iyzico, Stripe, vb.)
      
      alert(
        '⚠️ GÜVENLİK UYARISI\n\n' +
        'Direkt kredi kartı işlemi için PCI DSS uyumlu bir payment gateway gereklidir.\n\n' +
        'ÖNERİLEN:\n' +
        '• iyzico ile entegrasyon\n' +
        '• Stripe ile entegrasyon\n' +
        '• PayTR ile entegrasyon\n\n' +
        'Bu sayfa sadece UI demonstrasyonudur.\n' +
        'Production için iyzico veya Stripe kullanın.'
      );

      // Demo: 2 saniye sonra başarılı
      setTimeout(() => {
        alert('✅ Ödeme başarılı! (Demo)');
        navigate('/dashboard?payment=success');
      }, 2000);

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Ödeme işlemi başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  // Detect card type from number
  const getCardType = () => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Card';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Kredi Kartı ile Ödeme
        </h2>
        <p className="text-gray-600">
          Direkt kredi kartı bilgileriniz ile ödeme yapın
        </p>
      </div>

      {/* Security Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="font-semibold mb-1">Güvenlik Bilgisi</p>
            <p className="text-amber-800">
              Kart bilgileriniz 256-bit SSL şifreleme ile korunur ve sistemimizde saklanmaz.
              Ödeme işlemi güvenli bir gateway üzerinden gerçekleştirilir.
            </p>
          </div>
        </div>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kart Numarası
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-16"
            />
            {cardNumber && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                {getCardType()}
              </div>
            )}
          </div>
        </div>

        {/* Card Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kart Üzerindeki İsim
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            placeholder="AD SOYAD"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Son Kullanma Tarihi
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryChange}
              placeholder="AA/YY"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="password"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* 3D Secure Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-green-800">
            <Lock className="w-4 h-4" />
            <span className="font-medium">3D Secure ile güvenli ödeme</span>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">Ödenecek Tutar:</span>
          <span className="text-2xl font-bold text-blue-600">
            {amount.toLocaleString('tr-TR')} TL
          </span>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Anında aktivasyon
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Otomatik fatura
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            7/24 destek
          </li>
        </ul>
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
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>İşlem yapılıyor...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            <span>Güvenli Ödeme Yap</span>
          </>
        )}
      </button>

      {/* Info */}
      <p className="text-xs text-gray-500 text-center">
        Kart bilgileriniz PCI DSS standartlarında korunur ve saklanmaz.
      </p>
    </div>
  );
};

export default CreditCardPayment;



















