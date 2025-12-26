
import React from 'react';
import { User, Server, FileText, UploadCloud, Clock, Link as LinkIcon, AlertTriangle, ListChecks } from 'lucide-react';

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
