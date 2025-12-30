import React from 'react';
import { Shield, Lock, Server, Eye, Database, FileCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const DataSecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-600 rounded-full mb-4">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Veri Güvenliği ve Gizlilik
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verileriniz nerede saklanıyor? Nasıl korunuyor? Kimler erişebiliyor? 
            Tüm sorularınızın cevapları burada.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">256-bit</div>
            <div className="text-sm text-gray-600">AES Şifreleme</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Server className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">99.99%</div>
            <div className="text-sm text-gray-600">Uptime Garantisi</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">ISO 27001</div>
            <div className="text-sm text-gray-600">Sertifikalı</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Database className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">Günlük</div>
            <div className="text-sm text-gray-600">Yedekleme</div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-8">

          {/* Veri Depolama */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verileriniz Nerede Saklanıyor?
                </h2>
                <p className="text-gray-600">
                  Verileriniz Google Cloud Platform altyapısı üzerinde, Firebase Firestore veritabanında güvenle saklanmaktadır.
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Google Cloud Platform (GCP)</h3>
                  <p className="text-gray-600 text-sm">
                    Dünya genelinde milyonlarca işletme tarafından güvenilen, Google'ın kendi altyapısını kullandığı bulut platformu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Firebase Firestore</h3>
                  <p className="text-gray-600 text-sm">
                    NoSQL bulut veritabanı. Gerçek zamanlı senkronizasyon, otomatik ölçeklendirme ve yüksek performans.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Coğrafi Konum</h3>
                  <p className="text-gray-600 text-sm">
                    Verileriniz Avrupa (europe-west) veri merkezlerinde saklanmaktadır. KVKK ve GDPR uyumludur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Yedeklilik</h3>
                  <p className="text-gray-600 text-sm">
                    Verileriniz en az 3 farklı veri merkezinde otomatik olarak yedeklenmektedir (Multi-region redundancy).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Şifreleme */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verileriniz Nasıl Şifreleniyor?
                </h2>
                <p className="text-gray-600">
                  Tüm verileriniz hem aktarım sırasında hem de depolama aşamasında şifrelenir.
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Aktarım Güvenliği (In-Transit)</h3>
                  <p className="text-gray-600 text-sm">
                    <strong>TLS 1.3 / HTTPS:</strong> Tarayıcınız ile sunucularımız arasındaki tüm iletişim 256-bit TLS şifrelemesi ile korunur.
                    Verileriniz internet üzerinden geçerken şifrelenir ve üçüncü taraflar tarafından okunamaz.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Depolama Güvenliği (At-Rest)</h3>
                  <p className="text-gray-600 text-sm">
                    <strong>AES-256 Şifreleme:</strong> Veritabanında saklanan tüm verileriniz 256-bit AES standardı ile şifrelenir.
                    Bu, askeri düzeyde güvenlik standardıdır.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Hassas Veri Koruma</h3>
                  <p className="text-gray-600 text-sm">
                    Özellikle hassas veriler (VKN, banka bilgileri, şifreler) ek katmanlı şifreleme ile korunur.
                    Şifreler asla düz metin olarak saklanmaz (bcrypt hash).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Erişim Kontrolü */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verilerinize Kimler Erişebilir?
                </h2>
                <p className="text-gray-600">
                  Verileriniz size özeldir. Erişim kontrolleri çok katmanlıdır ve sıkı kurallara tabidir.
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Sadece Siz (Varsayılan)</h3>
                  <p className="text-gray-600 text-sm">
                    Hesabınızdaki tüm veriler <strong>sadece size aittir</strong>. 
                    Başka hiçbir kullanıcı verilerinizi görüntüleyemez, düzenleyemez veya silemez.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Authentication Zorunluluğu</h3>
                  <p className="text-gray-600 text-sm">
                    Verilerinize erişmek için <strong>giriş yapmış olmanız şarttır</strong>. 
                    Anonim erişim mümkün değildir. Her istek kimlik doğrulamasından geçer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Firestore Security Rules</h3>
                  <p className="text-gray-600 text-sm">
                    Veritabanı seviyesinde <strong>kural bazlı erişim kontrolü</strong> vardır. 
                    Her veri okuması/yazması Firebase Security Rules'dan geçer ve izin kontrolü yapılır.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">FINOPS Ekibi Erişimi</h3>
                  <p className="text-gray-600 text-sm">
                    FINOPS ekibi verilerinize <strong>yalnızca destek talepleriniz için ve sizin onayınızla</strong> erişebilir.
                    Tüm admin erişimleri loglanır ve denetlenir.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Üçüncü Taraf Erişimi YOK</h3>
                  <p className="text-gray-600 text-sm">
                    Verileriniz <strong>hiçbir üçüncü taraf şirkete satılmaz, kiralanmaz veya paylaşılmaz</strong>.
                    Reklam amaçlı kullanılmaz. %100 size aittir.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Yedekleme */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileCheck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Yedekleme ve Felaket Kurtarma
                </h2>
                <p className="text-gray-600">
                  Verileriniz kaybolmaz. Çoklu yedekleme sistemi ve felaket kurtarma planı mevcuttur.
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Otomatik Günlük Yedekleme</h3>
                  <p className="text-gray-600 text-sm">
                    Tüm verileriniz her gün otomatik olarak yedeklenir. 30 günlük yedekleme geçmişi tutulur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Çoklu Veri Merkezi</h3>
                  <p className="text-gray-600 text-sm">
                    Verileriniz 3 farklı coğrafi bölgedeki veri merkezinde saklanır. 
                    Bir veri merkezi çökse bile verileriniz güvendedir.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">99.99% Uptime SLA</h3>
                  <p className="text-gray-600 text-sm">
                    Google Cloud Platform, yılda yaklaşık sadece 52 dakika kesinti ile %99.99 uptime garantisi verir.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Veri Dışa Aktarma</h3>
                  <p className="text-gray-600 text-sm">
                    İstediğiniz zaman tüm verilerinizi JSON/Excel formatında dışa aktarabilirsiniz. 
                    Verileriniz size kilitli değildir.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* KVKK & GDPR */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <FileCheck className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  KVKK ve GDPR Uyumluluğu
                </h2>
                <p className="text-gray-600">
                  Kişisel Verilerin Korunması Kanunu (KVKK) ve GDPR yönetmeliklerine tam uyumluyuz.
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Veri Sahipliği</h3>
                  <p className="text-gray-600 text-sm">
                    Tüm verilerinizin sahibi <strong>sizsiniz</strong>. 
                    FINOPS sadece veri işleyici rolündedir, veri sorumlusu değildir.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Silme Hakkı</h3>
                  <p className="text-gray-600 text-sm">
                    Hesabınızı ve tüm verilerinizi istediğiniz zaman kalıcı olarak silebilirsiniz.
                    30 gün içinde tüm verileriniz sistemden tamamen kaldırılır.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Taşınabilirlik Hakkı</h3>
                  <p className="text-gray-600 text-sm">
                    Verilerinizi standart formatlarda (JSON, Excel, CSV) dışa aktarabilir ve başka platformlara taşıyabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Şeffaflık ve Bilgilendirme</h3>
                  <p className="text-gray-600 text-sm">
                    Hangi verilerin toplandığı, nasıl kullanıldığı ve ne kadar süre saklandığı 
                    <a href="/gizlilik-politikasi" className="text-blue-600 hover:underline ml-1">Gizlilik Politikamızda</a> detaylı olarak açıklanmıştır.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sertifikalar */}
          <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Güvenlik Sertifikaları ve Standartlar
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">ISO 27001</h3>
                <p className="text-sm text-gray-600">
                  Bilgi Güvenliği Yönetim Sistemi sertifikası
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl text-center">
                <Lock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">SOC 2 Type II</h3>
                <p className="text-sm text-gray-600">
                  Güvenlik, kullanılabilirlik ve gizlilik kontrolü
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl text-center">
                <FileCheck className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">GDPR & KVKK</h3>
                <p className="text-sm text-gray-600">
                  Avrupa ve Türkiye veri koruma yönetmeliklerine uyum
                </p>
              </div>
            </div>
          </section>

          {/* SSS */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sıkça Sorulan Sorular
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Verilerim Türkiye dışında mı saklanıyor?
                </h3>
                <p className="text-gray-600 text-sm">
                  Evet, verileriniz Avrupa (europe-west) veri merkezlerinde saklanmaktadır. 
                  Bu, KVKK'nın uluslararası veri aktarımı kurallarına uygundur ve 
                  Google Cloud'un en yakın, en hızlı ve en güvenli seçeneğidir.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  FINOPS çalışanları verilerimi görebilir mi?
                </h3>
                <p className="text-gray-600 text-sm">
                  Normal şartlarda hayır. Ancak sizin açtığınız bir destek talebi için 
                  (örneğin: "verilerimi göremiyorum" gibi bir sorun için) ve sizin onayınızla, 
                  teknik ekibimiz sorunu çözmek amacıyla verilerinize erişebilir. 
                  Tüm admin erişimleri loglanır.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Hesabımı silersem verilerim ne olur?
                </h3>
                <p className="text-gray-600 text-sm">
                  Hesabınızı sildiğinizde, tüm verileriniz 30 gün içinde sistemden kalıcı olarak silinir. 
                  Bu süre içinde hesabınızı geri yükleyebilirsiniz. 30 gün sonra veriler kurtarılamaz.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Verilerimi dışa aktarabilir miyim?
                </h3>
                <p className="text-gray-600 text-sm">
                  Evet! Dashboard'ınızdan "Ayarlar → Veri Dışa Aktar" bölümünden 
                  tüm verilerinizi JSON veya Excel formatında indirebilirsiniz.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bir güvenlik açığı bulsam ne yapmalıyım?
                </h3>
                <p className="text-gray-600 text-sm">
                  Lütfen derhal <strong>security@finops.ist</strong> adresine e-posta gönderin. 
                  Güvenlik açıkları en yüksek öncelikle ele alınır ve sorumlu bildirimi teşvik ederiz.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Başka Sorularınız mı Var?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Veri güvenliği ve gizlilik konusunda daha fazla bilgi almak için 
              destek ekibimizle iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/destek" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Destek Talebi Oluştur
              </a>
              <a 
                href="mailto:security@finops.ist" 
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                security@finops.ist
              </a>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Son güncelleme: 28 Aralık 2025</p>
          <p className="mt-2">
            Daha fazla bilgi için: 
            <a href="/gizlilik-politikasi" className="text-blue-600 hover:underline ml-1">Gizlilik Politikası</a> | 
            <a href="/hizmet-kosullari" className="text-blue-600 hover:underline ml-1">Hizmet Koşulları</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default DataSecurityPage;







