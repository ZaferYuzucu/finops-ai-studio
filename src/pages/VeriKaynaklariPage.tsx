import React from 'react';
import { Database, FileSpreadsheet, Link2, Shield, RefreshCw, Zap, CheckCircle, Lock, Users, Clock, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VeriKaynaklariPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Database size={20} />
            <span>{t('veriKaynaklari.hero.badge')}</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('veriKaynaklari.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('veriKaynaklari.hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/veri-girisi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              <Zap size={20} />
              <span>{t('veriKaynaklari.hero.cta1')}</span>
            </a>
            <a 
              href="#canlı-demo"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-green-500 hover:text-green-600 transition-all font-semibold"
            >
              <Database size={20} />
              <span>{t('veriKaynaklari.hero.cta2')}</span>
            </a>
          </div>
        </div>

        {/* Featured: Google Sheets */}
        <section className="mb-24 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12 border-2 border-green-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <RefreshCw size={18} />
                <span>{t('veriKaynaklari.googleSheets.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                📊 {t('veriKaynaklari.googleSheets.title')}
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                {t('veriKaynaklari.googleSheets.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriKaynaklari.googleSheets.feature1')}</h4>
                    <p className="text-sm text-gray-600">{t('veriKaynaklari.googleSheets.feature1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriKaynaklari.googleSheets.feature2')}</h4>
                    <p className="text-sm text-gray-600">{t('veriKaynaklari.googleSheets.feature2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriKaynaklari.googleSheets.feature3')}</h4>
                    <p className="text-sm text-gray-600">{t('veriKaynaklari.googleSheets.feature3Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriKaynaklari.googleSheets.feature4')}</h4>
                    <p className="text-sm text-gray-600">{t('veriKaynaklari.googleSheets.feature4Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriKaynaklari.googleSheets.feature5')}</h4>
                    <p className="text-sm text-gray-600">{t('veriKaynaklari.googleSheets.feature5Desc')}</p>
                  </div>
                </li>
              </ul>
              <a 
                href="#google-sheets-kurulum"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
              >
                <Link2 size={20} />
                <span>{t('veriKaynaklari.googleSheets.guideBtn')}</span>
              </a>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-green-300">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FileSpreadsheet className="text-green-600" size={32} />
                    <div>
                      <h3 className="font-bold text-gray-900">Google Sheets</h3>
                      <p className="text-xs text-gray-500">Canlı Veri Bağlantısı</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-mono text-gray-600 mb-2">Bağlantı URL:</p>
                    <p className="text-xs font-mono bg-white p-2 rounded border border-gray-300 overflow-x-auto">
                      https://docs.google.com/spreadsheets/d/...
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="font-semibold text-gray-700">Durum</span>
                    <span className="flex items-center gap-2 text-green-600">
                      <RefreshCw size={14} className="animate-spin" />
                      Canlı Bağlı
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold text-gray-700">Yenileme Aralığı</span>
                    <span className="text-blue-600 font-semibold">Her 5 dakika</span>
                  </div>
                  <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                    <span className="font-semibold text-gray-700">Son Güncelleme</span>
                    <span className="text-purple-600 font-semibold">2 dakika önce</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </section>

        {/* Data Sources Grid */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Verilerinizi Raporlarla Bağlama Yöntemleri
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              İhtiyaçlarınıza en uygun veri kaynağını seçin ve raporlarınızı kolayca oluşturun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Google Sheets */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileSpreadsheet className="text-green-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Google Sheets</h3>
                  <span className="text-xs text-green-600 font-semibold">Önerilen</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Elektronik tablo bağlantısını ekleyin, raporu kurun ve canlı güncellemeler alın.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  <span>Otomatik senkronizasyon</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  <span>Gerçek zamanlı güncelleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  <span>Kolay paylaşım</span>
                </li>
              </ul>
              <a 
                href="/veri-girisi?method=url"
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Şimdi Bağla
              </a>
            </div>

            {/* Microsoft Excel */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileSpreadsheet className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t('veriKaynaklari.excel.title')}</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                {t('veriKaynaklari.excel.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-blue-600" />
                  <span>Tüm Excel formatları</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-blue-600" />
                  <span>Manuel güncelleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-blue-600" />
                  <span>Güvenli yükleme</span>
                </li>
              </ul>
              <a 
                href="/veri-girisi?method=file"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Dosya Yükle
              </a>
            </div>

            {/* CSV File */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Database className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">CSV Dosyası</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                .csv dosyalarını yükleyin veya herhangi bir yerden veri kopyalayın ve dashboard'lar oluşturun.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-purple-600" />
                  <span>Evrensel format</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-purple-600" />
                  <span>Hızlı yükleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-purple-600" />
                  <span>Kopyala-yapıştır desteği</span>
                </li>
              </ul>
              <a 
                href="/veri-girisi?method=file"
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                CSV Yükle
              </a>
            </div>

            {/* MS SQL */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Database className="text-orange-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">MS SQL</h3>
                  <span className="text-xs text-orange-600 font-semibold">Gelişmiş</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                SQL veritabanınızı bağlayın ve günlük güncellenen dashboard'lar elde edin.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-orange-600" />
                  <span>Direkt veritabanı bağlantısı</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-orange-600" />
                  <span>Günlük otomatik güncelleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-orange-600" />
                  <span>Büyük veri setleri</span>
                </li>
              </ul>
              <a 
                href="/veri-girisi?method=url"
                className="block w-full text-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                SQL Bağla
              </a>
            </div>

            {/* MySQL */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-cyan-200 hover:border-cyan-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-100 rounded-lg">
                  <Database className="text-cyan-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">MySQL</h3>
                  <span className="text-xs text-cyan-600 font-semibold">Gelişmiş</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Dashboard'unuzu MySQL ile bağlayın ve isteğe bağlı güncelleyin.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-cyan-600" />
                  <span>Esnek bağlantı</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-cyan-600" />
                  <span>İsteğe bağlı güncelleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-cyan-600" />
                  <span>Yüksek performans</span>
                </li>
              </ul>
              <a 
                href="/veri-girisi?method=url"
                className="block w-full text-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
              >
                MySQL Bağla
              </a>
            </div>

            {/* PostgreSQL */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Database className="text-indigo-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">PostgreSQL</h3>
                  <span className="text-xs text-indigo-600 font-semibold">Gelişmiş</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                PostgreSQL veritabanınızı ekleyin ve düzenli veri güncellemeleri alın.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-indigo-600" />
                  <span>Güçlü veritabanı</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-indigo-600" />
                  <span>Düzenli senkronizasyon</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-indigo-600" />
                  <span>Kurumsal çözüm</span>
                </li>
              </ul>
              <a 
                href="/veri-girisi?method=url"
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                PostgreSQL Bağla
              </a>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="mb-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6">
                <Shield size={20} />
                <span>Güvenlik ve Gizlilik</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">
                🔒 Müşterilerimiz ve Veri Gizlilikleri Önemli
              </h2>
              <p className="text-gray-300 text-lg">
                Verilerinizin güvenliği bizim önceliğimiz. İşte sık sorulan sorulara cevaplar:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Lock className="text-green-400" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Güvenli Şifreleme</h4>
                    <p className="text-gray-300 text-sm">
                      Verileriniz güvenli bir şekilde şifrelenir ve sunucularımızda saklanır. 
                      Tüm veri aktarımları SSL/TLS ile korunur.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Users className="text-blue-400" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Sadece Siz Erişebilirsiniz</h4>
                    <p className="text-gray-300 text-sm">
                      Verilerinize doğrudan sadece siz erişebilirsiniz. 
                      Ekip üyeleriyle paylaşım tamamen sizin kontrolünüzde.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Shield className="text-purple-400" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">AI Eğitiminde Kullanılmaz</h4>
                    <p className="text-gray-300 text-sm">
                      Verileriniz AI/ML model eğitimi için kullanılmaz ve üçüncü taraflarla paylaşılmaz. 
                      Gizliliğiniz garanti altında.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="text-red-400" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Tamamen Silebilirsiniz</h4>
                    <p className="text-gray-300 text-sm">
                      Verilerinizi istediğiniz zaman silebilirsiniz ve sunucularımızdan 
                      geri dönüşü olmayacak şekilde kalıcı olarak silinir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Users className="text-orange-400" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Yetkilendirme Kontrolü</h4>
                    <p className="text-gray-300 text-sm">
                      Rapor paylaşımını düzenleyiciler veya görüntüleyiciler ekleyerek yönetebilir 
                      ve raporları şifrelerle koruyabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="text-cyan-400" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Otomatik Yedekleme</h4>
                    <p className="text-gray-300 text-sm">
                      Verileriniz düzenli olarak yedeklenir. Veri kaybı riski yoktur. 
                      İstediğiniz zaman önceki sürümlere dönebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a 
                href="/legal/privacy-policy"
                className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors font-semibold"
              >
                <Shield size={16} />
                <span>Gizlilik Politikamızı İnceleyin →</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Teknik Olmayan Ekipleri Güçlendirin
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Kullanımı kolay BI platformumuz ile profesyonel raporlar oluşturun, 
            verilerinizi görselleştirin ve AI destekli içgörüler elde edin.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/veri-girisi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-100 transition-all shadow-lg font-bold text-lg"
            >
              <Zap size={24} />
              <span>Ücretsiz Başla</span>
            </a>
            <a 
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
            >
              <span>Fiyatlandırma</span>
            </a>
          </div>
          <p className="text-sm text-green-100 mt-4">Kredi kartı gerektirmez • 14 gün ücretsiz deneme</p>
        </section>
      </div>
    </div>
  );
};

export default VeriKaynaklariPage;


