/**
 * Bank Transfer Payment Component
 * FINOPS AI Studio
 * 
 * Banka Transferi / Havale ile ödeme
 * Manuel onay sistemi
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Copy, 
  Check, 
  AlertCircle, 
  Info,
  Upload,
  Clock
} from 'lucide-react';
import { PlanType } from '../../types/subscription';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface BankTransferPaymentProps {
  planType: PlanType;
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
}

const BankTransferPayment: React.FC<BankTransferPaymentProps> = ({
  planType,
  amount,
  billingPeriod,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // Form state
  const [senderName, setSenderName] = useState('');
  const [senderBank, setSenderBank] = useState('');
  const [senderIban, setSenderIban] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  // ✅ FINOPS AI Studio Banka Hesap Bilgileri
  const BANK_ACCOUNTS = [
    {
      bank: 'Ziraat Bankası',
      accountName: 'FINOPS AI STUDIO TEKNOLOJİ A.Ş.',
      iban: 'TR00 0001 0000 0000 0000 0000 01',
      swift: 'TCZBTR2AXXX',
      branch: 'İstanbul Merkez Şubesi',
    },
    {
      bank: 'İş Bankası',
      accountName: 'FINOPS AI STUDIO TEKNOLOJİ A.Ş.',
      iban: 'TR00 0006 4000 0000 0000 0000 01',
      swift: 'ISBKTRISXXX',
      branch: 'İstanbul Kurumsal Şubesi',
    },
  ];

  const [selectedBank, setSelectedBank] = useState(BANK_ACCOUNTS[0]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Dosya boyutu kontrolü (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Dosya boyutu maksimum 5MB olabilir');
        return;
      }
      setReceiptFile(file);
    }
  };

  const handleSubmit = async () => {
    setError('');

    // Validasyon
    if (!senderName.trim()) {
      setError('Gönderen adı gerekli');
      return;
    }
    if (!senderBank.trim()) {
      setError('Banka adı gerekli');
      return;
    }
    if (!senderIban.trim() || senderIban.length < 26) {
      setError('Geçerli bir IBAN giriniz');
      return;
    }
    if (!transferDate) {
      setError('Transfer tarihi gerekli');
      return;
    }

    setLoading(true);

    try {
      // ✅ Firebase'e transfer bilgilerini kaydet
      const transferData = {
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        planType,
        amount,
        billingPeriod,
        senderName,
        senderBank,
        senderIban,
        transferDate,
        receiverBank: selectedBank.bank,
        receiverIban: selectedBank.iban,
        status: 'pending', // pending, approved, rejected
        createdAt: new Date(),
        hasReceipt: !!receiptFile,
      };

      await addDoc(collection(db, 'bankTransfers'), transferData);

      // TODO: Dekont yüklemesi için Firebase Storage kullanılabilir
      if (receiptFile) {
        // Firebase Storage'a yükle
        console.log('Dekont yükleniyor:', receiptFile.name);
      }

      // Başarılı
      alert(
        '✅ Transfer Bildiriminiz Alındı!\n\n' +
        'Transfer bilgileriniz kaydedildi.\n' +
        'Ödemeniz kontrol edildikten sonra (1-2 iş günü içinde) aboneliğiniz aktif edilecektir.\n\n' +
        'E-posta ile bilgilendirileceksiniz.'
      );

      navigate('/dashboard?payment=pending');

    } catch (err: any) {
      console.error('Bank transfer submit error:', err);
      setError(err.message || 'Bildirim gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Banka Transferi / Havale
        </h2>
        <p className="text-gray-600">
          EFT veya havale ile ödeme yapın
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Ödeme Süreci</p>
            <ul className="space-y-1 text-blue-800">
              <li>1. Aşağıdaki hesaba transfer yapın</li>
              <li>2. Transfer bilgilerinizi bu formla bildirin</li>
              <li>3. Ödemeniz 1-2 iş günü içinde onaylanır</li>
              <li>4. Aboneliğiniz otomatik aktif edilir</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bank Account Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Transfer Yapılacak Hesap
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BANK_ACCOUNTS.map((account, index) => (
            <button
              key={index}
              onClick={() => setSelectedBank(account)}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                selectedBank === account
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{account.bank}</div>
              <div className="text-sm text-gray-600 mt-1">{account.branch}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-gray-900 text-lg mb-4">
          {selectedBank.bank} Hesap Bilgileri
        </h3>

        {/* Account Name */}
        <div className="flex items-center justify-between bg-white rounded-lg p-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">Hesap Adı</div>
            <div className="font-semibold text-gray-900">{selectedBank.accountName}</div>
          </div>
          <button
            onClick={() => copyToClipboard(selectedBank.accountName, 'name')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {copied === 'name' ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* IBAN */}
        <div className="flex items-center justify-between bg-white rounded-lg p-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">IBAN</div>
            <div className="font-mono font-semibold text-gray-900">{selectedBank.iban}</div>
          </div>
          <button
            onClick={() => copyToClipboard(selectedBank.iban, 'iban')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {copied === 'iban' ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between bg-white rounded-lg p-3 border-2 border-orange-300">
          <div>
            <div className="text-xs text-gray-500 mb-1">Transfer Tutarı</div>
            <div className="font-bold text-2xl text-orange-600">
              {amount.toLocaleString('tr-TR')} TL
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(amount.toString(), 'amount')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {copied === 'amount' ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Swift (for international) */}
        <div className="text-xs text-gray-600">
          <strong>SWIFT Kodu:</strong> {selectedBank.swift} (Yurtdışı transferler için)
        </div>
      </div>

      {/* Transfer Notification Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-gray-900 mb-4">
          Transfer Bildirim Formu
        </h3>

        {/* Sender Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gönderen Adı / Şirket Adı *
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Ad Soyad veya Şirket Adı"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Sender Bank */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gönderen Banka *
          </label>
          <input
            type="text"
            value={senderBank}
            onChange={(e) => setSenderBank(e.target.value)}
            placeholder="Örn: Ziraat Bankası"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Sender IBAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gönderen IBAN *
          </label>
          <input
            type="text"
            value={senderIban}
            onChange={(e) => setSenderIban(e.target.value.toUpperCase())}
            placeholder="TR00 0000 0000 0000 0000 0000 00"
            maxLength={32}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono"
          />
        </div>

        {/* Transfer Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transfer Tarihi *
          </label>
          <input
            type="date"
            value={transferDate}
            onChange={(e) => setTransferDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Receipt Upload (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dekont / Makbuz (Opsiyonel)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
              id="receipt-upload"
            />
            <label htmlFor="receipt-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                {receiptFile ? receiptFile.name : 'Dekont yüklemek için tıklayın'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG veya PDF (Max 5MB)
              </p>
            </label>
          </div>
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Gönderiliyor...</span>
          </>
        ) : (
          <>
            <Clock className="w-5 h-5" />
            <span>Transfer Bildir</span>
          </>
        )}
      </button>

      {/* Info */}
      <p className="text-xs text-gray-500 text-center">
        Transfer bildiriminiz alındıktan sonra 1-2 iş günü içinde manuel olarak kontrol edilir.<br />
        Onay sonrası e-posta ile bilgilendirileceksiniz.
      </p>
    </div>
  );
};

export default BankTransferPayment;










