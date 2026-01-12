
import React from 'react';
import { User, Server, FileText, UploadCloud, Clock, Link as LinkIcon, AlertTriangle, ListChecks, Database, BarChart3, Eye } from 'lucide-react';
import { useRobotsMeta } from '../hooks/useRobotsMeta';

// Bölüm başlığı bileşeni
const GuideSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}> = ({ icon, title, subtitle, children, className = '' }) => (
  <div className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-200 ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
    <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

// Önemli Not Bileşeni
const Note: React.FC<{ children: React.ReactNode, type: 'warning' | 'info' }> = ({ children, type }) => (
    <div className={`my-4 p-4 rounded-lg border-l-4 ${type === 'warning' ? 'bg-yellow-50 border-yellow-400 text-yellow-800' : 'bg-sky-50 border-sky-400 text-sky-800'}`}>
        <div className="flex items-start gap-3">
            <AlertTriangle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${type === 'warning' ? 'text-yellow-500' : 'text-sky-500'}`} />
            <div>{children}</div>
        </div>
    </div>
);


const DataGuidePage: React.FC = () => {
  useRobotsMeta('noarchive, noimageindex');
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Üst Başlık Alanı */}
        <div className="text-center mb-16">
          <p className="text-base font-semibold leading-7 text-blue-600">FINOPS AI Veri Entegrasyonu</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Veri Yükleme Rehberi</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-600">
            Sisteme manuel veya otomatik olarak veri aktarımı için gereken adımları ve dikkat edilecek noktaları bu rehberde bulabilirsiniz.
          </p>
        </div>

        {/* VERİ KÜTÜPHANESİ VE DASHBOARD */}
        <GuideSection 
          icon={<Database size={28} />} 
          title="📚 Veri Kütüphanesi ve Dashboard Oluşturma"
          subtitle="Yüklenen Verilerinizi Yönetin ve Dashboard Oluşturun"
          className="mb-12"
        >
          <p>
            Sisteme yüklediğiniz CSV/Excel dosyaları otomatik olarak <strong>Veri Kütüphaneniz</strong>'e kaydedilir. Bu kütüphane üzerinden verilerinizi yönetebilir ve dashboard oluşturabilirsiniz.
          </p>
          
          <h4><Database className="inline-block h-5 w-5 align-text-bottom mr-2" /> 1. Veri Kütüphanesine Erişim</h4>
          <ol>
            <li><strong>Ana Menü:</strong> Üst menüden profilinize tıklayın</li>
            <li><strong>Kütüphane:</strong> Açılan menüden "Veri Kütüphanem" seçeneğini tıklayın</li>
            <li><strong>Görüntüleme:</strong> Tüm yüklediğiniz dosyaları kategori, şube ve tarih bazında görebilirsiniz</li>
          </ol>

          <h4>2. Veri Kategorileri</h4>
          <p>Veri yüklerken dosyanızı aşağıdaki kategorilerden birine atayabilirsiniz:</p>
          <ul>
            <li>💰 <strong>Finansal Veriler:</strong> Gelir, gider, kar-zarar raporları</li>
            <li>📦 <strong>Maliyet ve Stok Verileri:</strong> Ürün maliyetleri, envanter</li>
            <li>💵 <strong>Nakit Akışı Verileri:</strong> Nakit giriş-çıkış takibi</li>
            <li>📊 <strong>Bütçe ve Raporlama:</strong> Bütçe planları, periyodik raporlar</li>
            <li>👥 <strong>İK/Performans Verileri:</strong> Personel ve performans metrikleri</li>
            <li>🏢 <strong>Şube Bazlı Veriler:</strong> Şubelere özel operasyonel veriler</li>
          </ul>

          <Note type="info">
            <strong>İpucu:</strong> Dosyalarınızı kategorilere ayırmak, dashboard oluştururken doğru veriyi hızlıca bulmanızı sağlar.
          </Note>

          <h4><BarChart3 className="inline-block h-5 w-5 align-text-bottom mr-2" /> 3. Dashboard Oluşturma Adımları</h4>
          <ol>
            <li><strong>Dashboard Oluştur:</strong> Ana sayfadan "Dashboard Oluştur" butonuna tıklayın</li>
            <li><strong>Veri Seç:</strong> Kütüphanenizden kullanmak istediğiniz CSV dosyasını seçin</li>
            <li><strong>Dashboard Tipi:</strong> Hazır şablon (26 adet) veya boş dashboard seçin</li>
            <li><strong>Grafik Seçimi:</strong> Line, Bar, Area, Donut gibi grafik tiplerinden birini seçin</li>
            <li><strong>Renk Şeması:</strong> Dashboard renk temasını seçin (Mavi, Mor, Yeşil, Turuncu)</li>
            <li><strong>Dashboard Adı:</strong> Dashboard'unuza anlamlı bir isim verin</li>
            <li><strong>Kaydet:</strong> "Dashboard'u Kaydet" butonuna tıklayın</li>
          </ol>

          <h4><Eye className="inline-block h-5 w-5 align-text-bottom mr-2" /> 4. Dashboard Görüntüleme</h4>
          <p>Dashboard kaydedildikten sonra verileriniz otomatik olarak analiz edilir (birkaç saniye sürer):</p>
          <ul>
            <li><strong>Dashboard'larım:</strong> Ana menüden "Dashboard'larım" sayfasına gidin</li>
            <li><strong>Görüntüle:</strong> İstediğiniz dashboard'un "Görüntüle" butonuna tıklayın</li>
            <li><strong>Grafikler:</strong> Verileriniz otomatik olarak analiz edilmiş grafiklerle gösterilir</li>
            <li><strong>Düzenle:</strong> Dashboard ayarlarını değiştirmek için "Düzenle" butonunu kullanın</li>
          </ul>

          <Note type="info">
            <strong>Otomatik Analiz:</strong> Sistemimiz verilerinizi otomatik olarak analiz eder:
            <ul className="mt-2">
              <li>📈 Aylık trend grafikleri</li>
              <li>📊 Kategori bazlı analizler</li>
              <li>🏆 Top 10 listeleri</li>
              <li>💡 Özet istatistikler (Toplam, Ortalama, Tarih aralığı)</li>
            </ul>
          </Note>

          <h4>5. Arşivleme ve Temizleme</h4>
          <p>Veri kütüphanenizde:</p>
          <ul>
            <li><strong>Arşivle:</strong> Kullanmadığınız dosyaları arşivleyebilirsiniz</li>
            <li><strong>Sil:</strong> Artık ihtiyacınız olmayan dosyaları kalıcı olarak silebilirsiniz</li>
            <li><strong>Otomatik Temizleme:</strong> 30 günden eski arşiv dosyalarını toplu temizleyebilirsiniz</li>
          </ul>
        </GuideSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* KULLANICI REHBERİ */}
          <GuideSection 
            icon={<User size={28} />} 
            title="Son Kullanıcı Rehberi"
            subtitle="Manuel Dosya Yükleme İşlemi"
          >
            <p>
              Bu bölüm, finansal verilerinizi içeren <code>.csv</code> veya <code>.xlsx</code> (Excel) dosyalarını sisteme nasıl yükleyeceğinizi adım adım açıklar.
            </p>
            
            <h4>1. Dosya Formatı ve Yapısı</h4>
            <p>Veri dosyanızın, sistem tarafından doğru bir şekilde işlenebilmesi için belirli bir yapıda olması gerekmektedir. Lütfen aşağıdaki kurallara uyun:</p>
            <ul>
              <li><strong>Başlık Satırı:</strong> Dosyanızın ilk satırı mutlaka kolon başlıklarını içermelidir.</li>
              <li><strong>Zorunlu Kolonlar:</strong> Minimumda <code>Tarih</code>, <code>Açıklama</code> ve <code>Tutar</code> kolonları bulunmalıdır.</li>
              <li><strong>Örnek Kolonlar:</strong> <code>Tarih</code>, <code>Açıklama</code>, <code>Kategori</code>, <code>Tutar</code>, <code>Para Birimi</code>, <code>Fatura No</code>.</li>
            </ul>
             <Note type="info">
                <strong>Esnek Eşleştirme:</strong> Sistem, yükleme sırasında dosyanızdaki kolon adlarıyla veritabanı alanlarını eşleştirmenize olanak tanır. Örneğin, dosyanızdaki "İşlem Tarihi" kolonunu sistemdeki "Tarih" alanıyla eşleştirebilirsiniz.
            </Note>

            <h4>2. Yükleme Adımları</h4>
            <ol>
              <li><strong>Veri Girişi Sayfasına Gidin:</strong> Ana menüden "Veri Girişi" sayfasına tıklayın.</li>
              <li><strong>Dosyanızı Seçin:</strong> <UploadCloud className="inline-block h-5 w-5 align-text-bottom" /> "Dosya Seç" butonuna tıklayarak veya dosyanızı sürükle-bırak alanına bırakarak yüklemek istediğiniz <code>.csv</code> veya <code>.xlsx</code> dosyasını seçin.</li>
              <li><strong>Kolonları Eşleştirin:</strong> Yüklemenin ardından ekranda beliren arayüzde, dosyanızdaki her kolonun hangi veritabanı alanına karşılık geldiğini seçin.</li>
              <li><strong>Verileri Onaylayın:</strong> Eşleştirmeyi tamamladıktan sonra, verilerin bir önizlemesini kontrol edin ve "Onayla ve Yükle" butonuna tıklayarak işlemi tamamlayın.</li>
            </ol>
            
            <h4><ListChecks className="inline-block h-5 w-5 align-text-bottom mr-2" /> Sıkça Karşılaşılan Hatalar ve Çözümleri</h4>
            <ul>
                <li><strong>Hata:</strong> Tarih formatı tanınmıyor. <br/><strong>Çözüm:</strong> Tarihlerin <code>GG.AA.YYYY</code> (örn: 21.12.2025) veya <code>YYYY-AA-GG</code> formatında olduğundan emin olun.</li>
                <li><strong>Hata:</strong> Tutar kolonunda metin var. <br/><strong>Çözüm:</strong> Tutar kolonunun sadece rakam, virgül ve nokta içerdiğini kontrol edin. Para birimi simgelerini (₺, $) bu kolondan kaldırın.</li>
                <li><strong>Hata:</strong> Boş satırlar. <br/><strong>Çözüm:</strong> Dosyanızın sonunda veya arasında tamamen boş olan satırları silin.</li>
            </ul>
          </GuideSection>

          {/* YÖNETİCİ REHBERİ */}
          <GuideSection 
            icon={<Server size={28} />} 
            title="Sistem Yöneticisi Rehberi"
            subtitle="Otomatik Veri Entegrasyonu"
            className="bg-slate-50"
          >
            <p>
              Bu bölüm, harici bir URL'de barındırılan bir veri dosyasının, belirlenen zamanlarda otomatik olarak sisteme entegre edilmesi için gereken teknik altyapıyı ve adımları açıklar.
            </p>
            
            <h4><Clock className="inline-block h-5 w-5 align-text-bottom mr-2" /> Genel İşleyiş (API Planı)</h4>
            <p>Otomasyon, sunucu tarafında çalışan bir script (örn: Google Cloud Function) aracılığıyla gerçekleştirilir. Bu scriptin temel görevleri şunlardır:</p>
            <ol>
              <li><strong>Zamanlama:</strong> Belirlenen bir saatte (örn: her gün 07:00) otomatik olarak tetiklenir.</li>
              <li><strong>Veri Çekme:</strong> Önceden tanımlanmış bir URL'den (örn: <code>https://cdn.sirket.com/data/gunluk_finans.csv</code>) veri dosyasını indirir.</li>
              <li><strong>Veri İşleme:</strong> İndirilen dosyayı, manuel yüklemedeki gibi işler, verileri ayrıştırır ve standart formata getirir.</li>
              <li><strong>Veritabanına Yazma:</strong> İşlenmiş verileri, güvenli bir şekilde projenin Firestore veritabanındaki ilgili koleksiyona yazar.</li>
            </ol>

            <h4><LinkIcon className="inline-block h-5 w-5 align-text-bottom mr-2" /> Kurulum Gereksinimleri</h4>
            <ul>
              <li><strong>Servis Hesabı (Service Account):</strong> Google Cloud projenizde, Firestore veritabanına yazma yetkisine sahip bir servis hesabı oluşturulmalıdır. Bu hesabın anahtarları (credentials) güvenli bir şekilde saklanmalıdır.</li>
              <li><strong>Cloud Function:</strong> Node.js veya Python ortamında, yukarıdaki işleyişi gerçekleştirecek bir Cloud Function yazılmalıdır. Bu fonksiyon, servis hesabı anahtarlarını kullanarak kimlik doğrulaması yapmalıdır.</li>
              <li><strong>Cloud Scheduler:</strong> Cloud Function'ı istediğiniz zaman aralığında (örn: <code>every day 07:00</code>) tetikleyecek bir Cloud Scheduler job'ı oluşturulmalıdır.</li>
            </ul>

            <Note type="warning">
                <strong>Güvenlik Sorumluluğu:</strong> Veri dosyasının barındırıldığı URL'nin güvenliği, Cloud Function ve servis hesabı anahtarlarının gizliliği tamamen sistem yöneticisinin sorumluluğundadır. Anahtarların kaynak koda eklenmemesi (örneğin Secret Manager kullanılması) kritik önem taşır.
            </Note>
             <p className="mt-4">
                Bu altyapı, manuel müdahaleyi ortadan kaldırarak veri akışını sürekli ve güvenilir hale getirir. Detaylı script örnekleri ve kurulum adımları için şirket içi teknik dokümantasyona başvurunuz.
            </p>
          </GuideSection>

        </div>
      </div>
    </div>
  );
};

export default DataGuidePage;
