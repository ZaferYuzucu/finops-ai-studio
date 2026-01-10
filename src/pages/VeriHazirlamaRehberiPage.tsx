import React from 'react';
import { Database, FileSpreadsheet, Link2, Calculator, Zap, CheckCircle, AlertTriangle, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRobotsMeta } from '../hooks/useRobotsMeta';

const VeriHazirlamaRehberiPage: React.FC = () => {
  const { t } = useTranslation();
  useRobotsMeta('noarchive, noimageindex');
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Database size={20} />
            <span>{t('veriHazirlama.hero.badge')}</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('veriHazirlama.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('veriHazirlama.hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/veri-girisi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              <Zap size={20} />
              <span>{t('veriHazirlama.hero.cta1')}</span>
            </a>
            <a 
              href="#video-rehber"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-semibold"
            >
              <Video size={20} />
              <span>{t('veriHazirlama.hero.cta2')}</span>
            </a>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-24">
          {/* Section 1: Veri Temizleme */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <CheckCircle size={18} />
                <span>{t('veriHazirlama.cleaning.badge')}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('veriHazirlama.cleaning.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('veriHazirlama.cleaning.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriHazirlama.cleaning.feature1')}</h4>
                    <p className="text-sm text-gray-600">{t('veriHazirlama.cleaning.feature1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriHazirlama.cleaning.feature2')}</h4>
                    <p className="text-sm text-gray-600">{t('veriHazirlama.cleaning.feature2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriHazirlama.cleaning.feature3')}</h4>
                    <p className="text-sm text-gray-600">{t('veriHazirlama.cleaning.feature3Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriHazirlama.cleaning.feature4')}</h4>
                    <p className="text-sm text-gray-600">{t('veriHazirlama.cleaning.feature4Desc')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('veriHazirlama.cleaning.checklistTitle')}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="w-4 h-4" />
                    <span>Sütun başlıkları standart</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="w-4 h-4" />
                    <span>Tarih formatları tutarlı</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="w-4 h-4" />
                    <span>Sayısal veriler doğru formatta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="w-4 h-4" />
                    <span>Tekrar eden kayıtlar kaldırıldı</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="w-4 h-4" />
                    <span>Eksik veriler tamamlandı</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Veri Kaynakları Birleştirme */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 Desteklenen Veri Kaynakları</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <FileSpreadsheet className="mx-auto text-green-600 mb-2" size={24} />
                    <p className="text-xs font-semibold">Excel / CSV</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Database className="mx-auto text-blue-600 mb-2" size={24} />
                    <p className="text-xs font-semibold">Google Sheets</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Link2 className="mx-auto text-purple-600 mb-2" size={24} />
                    <p className="text-xs font-semibold">Airtable</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Database className="mx-auto text-orange-600 mb-2" size={24} />
                    <p className="text-xs font-semibold">SQL Database</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <CheckCircle size={18} />
                <span>Adım 2</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🔗 Farklı Veri Kaynaklarını Birleştir
              </h2>
              <p className="text-gray-600 mb-6">
                Farklı kaynaklardan gelen verileri birleştirerek daha gelişmiş görselleştirmeler oluşturun.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Verileri Birleştir ve Bağla</h4>
                    <p className="text-sm text-gray-600">Excel, Google Sheets, Airtable ve diğer kaynaklardan verileri tek platformda toplayın</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">İlişkileri Kur</h4>
                    <p className="text-sm text-gray-600">Farklı veri setleri arasında bağlantılar oluşturarak çapraz analiz yapın</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Yeni Veri Tabloları Oluştur</h4>
                    <p className="text-sm text-gray-600">Mevcut verilerden türetilmiş yeni tablolar ve görünümler hazırlayın</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Tüm Dosyaları Tek Yerden Yönet</h4>
                    <p className="text-sm text-gray-600">Merkezi yönetim panelinden tüm veri kaynaklarınızı kontrol edin</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: KPI ve Metrikler */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <CheckCircle size={18} />
                <span>Adım 3</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                📈 Metrikler Oluştur ve KPI'ları Hesapla
              </h2>
              <p className="text-gray-600 mb-6">
                İş metriklerinizi tanımlayın ve KPI'larınızı otomatik olarak hesaplayın.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <Calculator size={14} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">İş Metriklerini Tanımla</h4>
                    <p className="text-sm text-gray-600">Gelir, kar marjı, müşteri edinme maliyeti gibi önemli metrikleri belirleyin</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <Calculator size={14} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">SQL Fonksiyonları Kullan</h4>
                    <p className="text-sm text-gray-600">Güçlü SQL sorguları ile karmaşık hesaplamalar yapın</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <Calculator size={14} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Yeni Alanlar Oluştur</h4>
                    <p className="text-sm text-gray-600">Mevcut verilerden türetilmiş yeni kolonlar ve hesaplanan değerler ekleyin</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <Calculator size={14} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Çapraz Kaynak Hesaplamaları</h4>
                    <p className="text-sm text-gray-600">Farklı veri kaynaklarından gelen verileri birleştirerek hesaplama yapın</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Popüler KPI Örnekleri</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900">Kar Marjı</p>
                    <code className="text-xs text-gray-600">(Gelir - Masraf) / Gelir * 100</code>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900">Ortalama Sipariş Değeri</p>
                    <code className="text-xs text-gray-600">Toplam Gelir / Sipariş Sayısı</code>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900">Müşteri Yaşam Boyu Değeri</p>
                    <code className="text-xs text-gray-600">Ort. Sipariş * Tekrar Sayısı</code>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900">Dönüşüm Oranı</p>
                    <code className="text-xs text-gray-600">Satışlar / Ziyaretçiler * 100</code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: SQL Kullanımı */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 border-2 border-indigo-200">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                <Database size={18} />
                <span>Gelişmiş Özellik</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ⚡ Karmaşık Veri İşlemleri İçin SQL Kullan
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                En popüler veri analizi sorgu motorlarından birini kullanarak verilerinizi özelleştirin.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <Zap className="mx-auto text-yellow-600 mb-3" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">Yüksek Performans</h4>
                  <p className="text-sm text-gray-600">Büyük veri setlerinde bile hızlı sonuçlar</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <CheckCircle className="mx-auto text-green-600 mb-3" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">Tanıdık Söz Dizimi</h4>
                  <p className="text-sm text-gray-600">Bilinen SQL yapısı ve formatı</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <Database className="mx-auto text-blue-600 mb-3" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">Yüksek Güvenlik</h4>
                  <p className="text-sm text-gray-600">Verileriniz güvende ve şifreli</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <Calculator className="mx-auto text-purple-600 mb-3" size={32} />
                  <h4 className="font-bold text-gray-900 mb-2">Excel-benzeri</h4>
                  <p className="text-sm text-gray-600">Excel kullanıcıları için kolay</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg text-left">
                <p className="text-sm font-semibold text-gray-700 mb-3">Örnek SQL Sorgusu:</p>
                <code className="block bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  SELECT urun_adi, SUM(gelir) as toplam_gelir<br/>
                  FROM satis_verileri<br/>
                  WHERE tarih &gt;= '2024-01-01'<br/>
                  GROUP BY urun_adi<br/>
                  ORDER BY toplam_gelir DESC<br/>
                  LIMIT 10
                </code>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section id="video-rehber" className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
              <Video size={18} />
              <span>Adım Adım Rehber</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🎬 KPI Oluşturma Video Rehberi
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Gelişmiş özellikleri nasıl kullanacağınızı öğrenin, KPI'larınızı oluşturun ve 
              zaman içinde ölçümleyin. Adım adım video rehberimizi takip edin.
            </p>
            <div className="bg-gray-100 rounded-2xl aspect-video max-w-4xl mx-auto flex items-center justify-center border-2 border-gray-300">
              <div className="text-center">
                <Video className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-600">Video rehberi yakında eklenecek</p>
                <p className="text-sm text-gray-500 mt-2">Şu anda adım adım yazılı rehberleri kullanabilirsiniz</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Anlamlı Analizler İçin Verilerinizi Hazırlayın
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              FinOps AI Studio ile profesyonel dashboard'lardan AI analizlerine kadar 
              tüm işlemlerinizi tek platformda gerçekleştirin.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a 
                href="/veri-girisi"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all shadow-lg font-bold text-lg"
              >
                <Zap size={24} />
                <span>Ücretsiz Başla</span>
              </a>
              <a 
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
              >
                <span>Fiyatlandırmayı Gör</span>
              </a>
            </div>
          </section>
        </div>

        {/* Warning Box */}
        <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">⚠️ Önemli Notlar</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Veri yüklemeden önce mutlaka backup alın</li>
                <li>• Hassas bilgiler içeren dosyaları yüklemeden önce anonimleştirin</li>
                <li>• Büyük dosyalar (10MB+) için URL bağlantısı yöntemini tercih edin</li>
                <li>• Tarih formatlarını standartlaştırın (YYYY-MM-DD önerilir)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeriHazirlamaRehberiPage;


