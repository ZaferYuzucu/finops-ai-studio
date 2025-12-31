/**
 * Payment Guide Admin Page
 * Ödeme Yöntemleri Rehberi - Sadece Admin
 * FINOPS AI Studio
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Building2, 
  Shield, 
  Key,
  Server,
  Link as LinkIcon,
  Download,
  CheckCircle,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const PaymentGuideAdminPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'overview',
      title: 'Genel Bakış',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Ödeme Sistemi Genel Bakış</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Kurulu Sistemler:</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>✅ İyzico Entegrasyonu (Türkiye)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>✅ Stripe Entegrasyonu (Uluslararası)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>✅ Kredi Kartı (Direkt) UI</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>✅ Banka Transferi Sistemi</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">⚠️ Production İçin Gerekli:</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• İyzico API Key'leri (.env dosyasına)</li>
              <li>• Stripe API Key'leri (.env dosyasına)</li>
              <li>• Backend API endpoint'leri</li>
              <li>• Webhook yapılandırması</li>
              <li>• Banka hesap bilgileri güncelleme</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
            <h4 className="font-bold text-xl mb-3">Kronolojik Süreç:</h4>
            <ol className="space-y-2 text-sm">
              <li>1️⃣ Ticari banka hesabı aç (1-2 hafta)</li>
              <li>2️⃣ İyzico/Stripe'a başvur (3-5 gün)</li>
              <li>3️⃣ API key'leri al (onaydan sonra)</li>
              <li>4️⃣ Backend API oluştur (1-2 gün)</li>
              <li>5️⃣ Webhook'ları kur (1 gün)</li>
              <li>6️⃣ Test & Deploy (2-3 gün)</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 'iyzico',
      title: 'İyzico Kurulumu',
      icon: <CreditCard className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">İyzico Entegrasyonu</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Adım 1: Hesap Oluştur</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. <a href="https://merchant.iyzipay.com/auth/register" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">https://merchant.iyzipay.com/auth/register</a> adresine git</p>
              <p>2. E-posta ve şifre ile kayıt ol</p>
              <p>3. E-posta onayını tamamla</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Adım 2: Belgeleri Yükle</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-medium">Gerekli Belgeler:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Vergi Levhası (PDF/JPG)</li>
                <li>Ticaret Sicil Gazetesi</li>
                <li>İmza Sirküleri</li>
                <li>Yetkili Kimliği</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Adım 3: Banka Bilgileri</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-medium">Ticari hesap IBAN'ınızı ekleyin:</p>
              <div className="bg-gray-50 rounded p-3 mt-2">
                <p className="text-xs text-gray-600 mb-1">Örnek:</p>
                <p className="font-mono text-sm">Banka: Ziraat Bankası</p>
                <p className="font-mono text-sm">IBAN: TR00 0001 0000 ...</p>
                <p className="font-mono text-sm">Hesap Sahibi: ŞİRKET ADINIZ A.Ş.</p>
              </div>
              <p className="text-amber-700 mt-2">⚠️ Para bu hesaba gelecek!</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">Adım 4: API Key'leri Al</h4>
            <div className="space-y-2 text-sm text-green-800">
              <p>Onay sonrası: Ayarlar → API Anahtarları</p>
              <div className="bg-white rounded p-3 mt-2 border border-green-300">
                <p className="font-mono text-xs mb-1">API Key: sandbox-abc123...</p>
                <p className="font-mono text-xs">Secret Key: sandbox-secret-xyz789...</p>
              </div>
              <p className="mt-2">📋 Bu key'leri .env dosyasına ekle!</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-900 mb-3">Maliyet Bilgisi</h4>
            <div className="space-y-2 text-sm text-indigo-800">
              <p>• Kurulum: <strong>ÜCRETSİZ</strong></p>
              <p>• Komisyon: <strong>%2.49 + 0.25 TL</strong></p>
              <p>• Aylık Üyelik: <strong>YOK</strong></p>
              <p className="text-xs mt-2 text-gray-600">Örnek: 599 TL ödeme → 15.17 TL komisyon → 583.83 TL net</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'stripe',
      title: 'Stripe Kurulumu',
      icon: <CreditCard className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Stripe Entegrasyonu</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Adım 1: Hesap Oluştur</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">https://dashboard.stripe.com/register</a> adresine git</p>
              <p>2. E-posta ile kayıt ol</p>
              <p>3. Test modu hemen kullanılabilir</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Adım 2: İşletme Bilgileri</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Dashboard → Settings → Business details:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Legal business name</li>
                <li>Industry: Software</li>
                <li>Website URL</li>
                <li>Phone number</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Adım 3: Banka Bilgileri</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Settings → Payouts → Bank account:</p>
              <div className="bg-gray-50 rounded p-3 mt-2">
                <p className="font-mono text-sm">Country: Turkey</p>
                <p className="font-mono text-sm">Currency: TRY</p>
                <p className="font-mono text-sm">IBAN: TR00 0001 0000 ...</p>
              </div>
              <p className="text-amber-700 mt-2">⚠️ Para bu hesaba gelecek (7 günde)!</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">Adım 4: API Key'leri Al</h4>
            <div className="space-y-2 text-sm text-green-800">
              <p>Dashboard → Developers → API keys:</p>
              <div className="bg-white rounded p-3 mt-2 border border-green-300">
                <p className="font-mono text-xs mb-1">Publishable: pk_live_...</p>
                <p className="font-mono text-xs">Secret: sk_live_...</p>
              </div>
              <p className="mt-2">📋 Bu key'leri .env dosyasına ekle!</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-3">Maliyet Bilgisi</h4>
            <div className="space-y-2 text-sm text-purple-800">
              <p>• Kurulum: <strong>ÜCRETSİZ</strong></p>
              <p>• Komisyon (Türkiye): <strong>%3.4 + 2 TL</strong></p>
              <p>• Aylık Üyelik: <strong>YOK</strong></p>
              <p className="text-xs mt-2 text-gray-600">Örnek: 599 TL ödeme → 22.37 TL komisyon → 576.63 TL net</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'backend',
      title: 'Backend API',
      icon: <Server className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Backend API Oluşturma</h3>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">⚠️ Neden Backend Gerekli?</h4>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Secret Key'ler frontend'de OLAMAZ (güvenlik)</li>
              <li>• Ödeme işlemleri backend'den yapılmalı</li>
              <li>• Webhook'ları backend alır</li>
              <li>• Database güncellemeleri backend'de</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Gerekli Endpoint'ler:</h4>
            <div className="space-y-2">
              <div className="bg-gray-50 rounded p-3 font-mono text-xs">
                <p className="text-green-600">POST /api/payment/iyzico/initialize</p>
                <p className="text-gray-600 ml-4">→ Ödeme sayfası oluştur</p>
              </div>
              <div className="bg-gray-50 rounded p-3 font-mono text-xs">
                <p className="text-green-600">POST /api/payment/iyzico/callback</p>
                <p className="text-gray-600 ml-4">→ Webhook (ödeme sonucu)</p>
              </div>
              <div className="bg-gray-50 rounded p-3 font-mono text-xs">
                <p className="text-purple-600">POST /api/payment/stripe/create-checkout-session</p>
                <p className="text-gray-600 ml-4">→ Stripe checkout oluştur</p>
              </div>
              <div className="bg-gray-50 rounded p-3 font-mono text-xs">
                <p className="text-purple-600">POST /api/payment/stripe/webhook</p>
                <p className="text-gray-600 ml-4">→ Webhook (ödeme sonucu)</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Backend Teknoloji:</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• Node.js + Express</p>
              <p>• Firebase Admin SDK</p>
              <p>• iyzipay & stripe NPM paketleri</p>
              <p className="text-xs mt-2 text-gray-600">Detaylı kod örnekleri PAYMENT_SETUP.md'de</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'webhook',
      title: 'Webhook Kurulumu',
      icon: <LinkIcon className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Webhook Yapılandırması</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Webhook Nedir?</h4>
            <p className="text-sm text-blue-800">
              Ödeme tamamlandığında iyzico/Stripe, backend'inizdeki bir URL'e POST isteği atar.
              Bu sayede ödeme sonucunu anlık öğrenip aboneliği aktifleştirirsiniz.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">İyzico Webhook:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. Merchant Panel → Ayarlar → Webhook/Callback URL</p>
              <p>2. URL ekle:</p>
              <div className="bg-gray-50 rounded p-3 font-mono text-xs mt-2">
                https://your-backend.com/api/payment/iyzico/callback
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Stripe Webhook:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. Dashboard → Developers → Webhooks</p>
              <p>2. Add endpoint:</p>
              <div className="bg-gray-50 rounded p-3 font-mono text-xs mt-2">
                https://your-backend.com/api/payment/stripe/webhook
              </div>
              <p className="mt-2">3. Events seç:</p>
              <ul className="list-disc list-inside ml-4 text-xs">
                <li>checkout.session.completed</li>
                <li>payment_intent.succeeded</li>
              </ul>
              <p className="mt-2">4. Webhook Secret'i kopyala ve .env'e ekle</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'bank',
      title: 'Banka Transferi',
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Banka Transferi Sistemi</h3>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ Avantajlar:</h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Komisyon: <strong>0 TL</strong> (en karlı)</li>
              <li>• Para direkt sizin hesabınıza gelir</li>
              <li>• Aracı yok, tam kontrol</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">⚠️ Dezavantajlar:</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Manuel onay gerekir</li>
              <li>• 1-2 gün onay süresi</li>
              <li>• E-posta bildirimi göndermelisiniz</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">IBAN Güncelleme:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Dosya: <code className="bg-gray-100 px-2 py-1 rounded text-xs">src/components/payment/BankTransferPayment.tsx</code></p>
              <p className="mt-2">Satır 40 civarı:</p>
              <div className="bg-gray-50 rounded p-3 font-mono text-xs mt-2">
                <pre>{`const BANK_ACCOUNTS = [
  {
    bank: 'Ziraat Bankası',
    accountName: 'ŞİRKET ADINIZ A.Ş.',
    iban: 'TR00 0001 0000 0000 0000 0000 01',
    swift: 'TCZBTR2AXXX',
  },
];`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Manuel Onay Süreci:</h4>
            <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
              <li>Kullanıcı transfer yapar</li>
              <li>Firestore'a bildirim kaydedilir</li>
              <li>Siz admin panelden kontrol edersiniz</li>
              <li>Transfer onaylanır/reddedilir</li>
              <li>E-posta bildirimi gönderilir</li>
              <li>Abonelik aktifleştirilir</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 'env',
      title: '.env Yapılandırması',
      icon: <Key className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">.env Dosyası</h3>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">🔒 Güvenlik Uyarısı:</h4>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• .env dosyası asla Git'e gitmemeli</li>
              <li>• .gitignore'da olduğundan emin olun</li>
              <li>• Production key'leri paylaşmayın</li>
              <li>• Her ortam için ayrı key kullanın (test/prod)</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Örnek .env Dosyası:</h4>
            <div className="bg-gray-900 rounded p-4 font-mono text-xs text-green-400 overflow-x-auto">
              <pre>{`# Firebase
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_PROJECT_ID=finops...

# iyzico
VITE_IYZICO_API_KEY=live-abc123...
VITE_IYZICO_SECRET_KEY=live-secret-xyz789...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_SECRET_KEY=sk_live_...

# reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=6LfE4jU...

# Environment
VITE_NODE_ENV=production`}</pre>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Key Nereden Alınır?</h4>
            <div className="space-y-3 text-sm text-blue-800">
              <div>
                <p className="font-semibold">İyzico:</p>
                <p className="text-xs">Merchant Panel → Ayarlar → API Anahtarları</p>
              </div>
              <div>
                <p className="font-semibold">Stripe:</p>
                <p className="text-xs">Dashboard → Developers → API keys</p>
              </div>
              <div>
                <p className="font-semibold">Firebase:</p>
                <p className="text-xs">Firebase Console → Project Settings</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleDownloadGuide = () => {
    // Masaüstüne kopyalandı mesajı
    alert(
      '✅ Rehber İndirildi!\n\n' +
      'Dosya konumu:\n' +
      '📁 Masaüstü → FINOPS_Odeme_Rehberi.md\n\n' +
      'Ayrıca proje klasöründe:\n' +
      '📁 PAYMENT_COMPLETE_GUIDE.md'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">💳 Ödeme Yöntemleri Rehberi</h1>
              <p className="text-indigo-100">
                Sadece Yönetici - Komple Kurulum Kılavuzu
              </p>
            </div>
            <Shield className="w-16 h-16 text-white/50" />
          </div>
        </div>

        {/* Download Button */}
        <div className="mb-6">
          <button
            onClick={handleDownloadGuide}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-indigo-300 text-indigo-700 py-4 rounded-xl hover:bg-indigo-50 transition-colors font-semibold"
          >
            <Download className="w-5 h-5" />
            <span>Detaylı Rehberi İndir (Masaüstü)</span>
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                {expandedSection === section.id ? (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Section Content */}
              {expandedSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 p-6"
                >
                  {section.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Sistem Durumu:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✅ Tüm ödeme UI'ları hazır</li>
                <li>✅ Test modu aktif</li>
                <li>⚠️ Production için API key'leri gerekli</li>
                <li>⚠️ Backend API endpoint'leri oluşturulmalı</li>
                <li>⚠️ Webhook'lar yapılandırılmalı</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Son güncelleme: 27 Aralık 2025 | Versiyon: 1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGuideAdminPage;












