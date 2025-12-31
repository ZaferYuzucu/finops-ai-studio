import React from 'react';
import { FileDown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

// Bu bileşen, PDF'e dönüştürülecek olan ana içeriktir.
const RoadmapContent = () => {
  return (
  <div id="user-journey-map-content" className="bg-white p-8 sm:p-12 shadow-lg rounded-2xl border border-gray-200">
    
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Kullanıcı Yolculuk Haritası</h1>
      <p className="mt-4 text-xl text-gray-600">Bir Adayın Müşteriye Dönüşüm Sürecinin Stratejik Adımları</p>
    </div>

    <div className="space-y-16">
      {/* FAZ 1: Keşif ve Karar */}
      <Phase
        phaseNumber="1"
        title="Keşif ve Karar"
        description="Aday, platformumuzla ilk kez tanışır ve potansiyel değeri anlar."
        steps={[
          { 
            title: "İlk Temas", 
            description: "Aday, bir reklam, sosyal medya gönderisi, arama motoru sonucu veya tavsiye yoluyla web sitesine ulaşır." 
          },
          { 
            title: "Değer Önerisini Anlama", 
            description: "Ana sayfa, çözümler ve hakkımızda sayfalarını gezer. Sunulan hizmetlerin kendi ihtiyaçlarına uygunluğunu değerlendirir." 
          },
          { 
            title: "Fiyatlandırmayı İnceleme", 
            description: "Fiyatlandırma sayfasını ziyaret ederek sunulan planları (Bireysel, Premium, Kurumsal) ve özelliklerini karşılaştırır." 
          },
          { 
            title: "Karar Anı", 
            description: "Platformu denemeye karar verir ve 'Kayıt Ol' veya 'Analizi Başlat' butonuna tıklar." 
          }
        ]}
      />

      {/* FAZ 2: Kayıt ve Kimlik Doğrulama */}
      <Phase
        phaseNumber="2"
        title="Kayıt ve Kimlik Doğrulama"
        description="Aday, sisteme ilk adımını atar ve kimliği doğrulanır. Bu, güvenliğin ilk hattıdır."
        steps={[
          { 
            title: "Kayıt Formu", 
            description: "Kullanıcı, Ad-Soyad, Şirket Adı, E-posta ve güvenli bir parola bilgilerini girerek kayıt formunu doldurur." 
          },
          { 
            title: "Parola Teyidi", 
            description: "Sistem, parola girişinin iki kez doğru yapılmasını isteyerek yazım hatalarını önler." 
          },
          { 
            title: "E-posta Doğrulama", 
            description: "Kullanıcının hesabına bir doğrulama e-postası gönderilir. Kullanıcı bu linke tıklayana kadar hesabı 'Beklemede' statüsündedir ve kritik fonksiyonlara erişemez." 
          },
          { 
            title: "Parola Sıfırlama Altyapısı", 
            description: "Eğer kullanıcı parolasını unutursa, 'Şifremi Unuttum' linki üzerinden e-posta adresine bir sıfırlama linki gönderilir." 
          }
        ]}
      />

      {/* FAZ 3: Plan Seçimi ve Ödeme */}
      <Phase
        phaseNumber="3"
        title="Plan Seçimi ve Ödeme"
        description="Doğrulanmış kullanıcı, operasyonel ihtiyaçlarına uygun planı seçer ve ödeme işlemini tamamlar."
        steps={[
          { 
            title: "Plan Seçim Ekranı", 
            description: "E-postasını doğrulayan kullanıcı, tekrar plan seçim sayfasına yönlendirilir ve kendisine en uygun planı seçer." 
          },
          { 
            title: "Dijital Sözleşme Kabulü", 
            description: "Ödeme adımından hemen önce, kullanıcıya 'Kullanım Koşulları' ve 'Gizlilik Politikası' sunulur. 'Okudum, kabul ediyorum' kutucuğunu işaretlemesi zorunlu tutulur." 
          },
          { 
            title: "Güvenli Ödeme Ağ Geçidi", 
            description: "Kullanıcı, kredi kartı bilgilerini girmesi için Stripe veya Iyzico gibi PCI-DSS sertifikalı, güvenli ödeme ağ geçidi arayüzüne yönlendirilir." 
          },
          { 
            title: "Ödeme Onayı ve Faturalandırma", 
            description: "Başarılı ödeme sonrası kullanıcı sistemimize geri yönlendirilir. Sistem, otomatik olarak bir fatura oluşturur ve kullanıcının paneline ekler." 
          }
        ]}
      />

      {/* FAZ 4: Aktivasyon ve Entegrasyon */}
      <Phase
        phaseNumber="4"
        title="Aktivasyon ve Entegrasyon"
        description="Artık bir müşteri olan kullanıcı, panelini aktif hale getirir ve ilk verilerini sisteme entegre eder."
        steps={[
          { 
            title: "Panel Aktivasyonu", 
            description: "Ödeme onayıyla birlikte kullanıcının hesabı 'Aktif' statüsüne geçer. Seçtiği plana ait tüm özellikler ve dashboard panelleri erişilebilir hale gelir." 
          },
          { 
            title: "Kullanıcı Onboarding", 
            description: "Müşteri, ilk girişinde onu adım adım yönlendiren bir 'Hoş Geldin' turu ile karşılanır. Bu tur, ilk veri kaynağını nasıl bağlayacağını gösterir." 
          },
          { 
            title: "Veri Yükleme / Entegrasyon", 
            description: "Müşteri, rehber yardımıyla ilk veri setini yükler veya entegrasyonu kurar." 
          },
          { 
            title: "İlk Değer Üretimi", 
            description: "Sistemimiz, yüklenen veriyi işler ve müşterinin seçtiği dashboard panelinde anlamlı çıktılar üretir. Müşteri, ödediği ücretin karşılığını ilk kez bu anda görür." 
          }
        ]}
      />

      {/* FAZ 5: Değer Üretimi ve Genişleme */}
      <Phase
        phaseNumber="5"
        title="Değer Üretimi ve Genişleme"
        description="Müşteri, platformu düzenli olarak kullanır, değer elde eder ve işbirliğini genişletir."
        steps={[
          { 
            title: "Düzenli Kullanım ve Raporlama", 
            description: "Müşteri, iş kararlarını desteklemek için platformu düzenli olarak kullanır, raporlar alır ve analizler yapar." 
          },
          { 
            title: "Takım Yönetimi", 
            description: "(Kurumsal Plan) Müşteri, kendi ekibinden yeni kullanıcıları farklı yetki seviyeleriyle sisteme davet eder." 
          },
          { 
            title: "Genişleme (Upsell)", 
            description: "Bireysel plandaki bir müşteri, daha fazla özelliğe ihtiyaç duyduğunda Premium plana geçer." 
          },
          { 
            title: "Sadakat ve Tavsiye", 
            description: "Platformdan yüksek memnuniyet duyan müşteri, hizmeti kendi çevresine tavsiye ederek yeni adayların ilk faza girmesini sağlar." 
          }
        ]}
      />
    </div>
  </div>
);
};

// Faz Bileşeni
const Phase: React.FC<{ phaseNumber: string; title: string; description: string; steps: { title: string; description: string }[] }> = ({ phaseNumber, title, description, steps }) => (
  <section className="relative">
    {/* Dikey Çizgi */}
    <div className="absolute left-4 sm:left-6 top-6 h-full border-l-2 border-dashed border-gray-300"></div>
    
    <div className="relative pl-12 sm:pl-16">
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 text-white font-bold text-lg rounded-full ring-8 ring-white">
        {phaseNumber}
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-lg text-gray-500">{description}</p>
      
      <div className="mt-8 space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
             <div className="absolute left-[-42px] sm:left-[-58px] top-2.5 h-0.5 w-6 bg-gray-300"></div>
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="mt-1 text-base text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const UserJourneyMapPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <PageLayout title="Kullanıcı Yolculuk Haritası">
        <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-8">
            <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
            <FileDown size={18} />
            PDF Olarak İndir / Yazdır
            </button>
        </div>

        <RoadmapContent />
        </div>
    </PageLayout>
  );
};

export default UserJourneyMapPage;
