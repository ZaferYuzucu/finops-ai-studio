import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{children}</h2>
  );

  const SectionParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="mt-4 leading-7">{children}</p>
  );

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-blue-600">Son Güncelleme: 13 Aralık 2025</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Kullanım ve Hizmet Koşulları</h1>
        <p className="mt-6 text-xl leading-8">
          FINOPS AI platformuna hoş geldiniz. Bu Kullanım ve Hizmet Koşulları ("Koşullar"), FINOPS AI ("Şirket", "biz") tarafından sunulan web sitesi, yazılım ve hizmetlerin ("Hizmetler") kullanımını düzenlemektedir. Hizmetlerimize erişerek veya kullanarak, bu Koşullara yasal olarak bağlı kalmayı kabul edersiniz.
        </p>

        <div className="mt-10 max-w-2xl">
          <SectionTitle>1. Taraflar ve Tanımlar</SectionTitle>
          <SectionParagraph>
            Bu sözleşme, FINOPS AI ile Hizmetler'den faydalanan siz ("Kullanıcı") arasında akdedilmiştir. "Platform", FINOPS AI web sitesi ve ilişkili tüm yazılımları ifade eder.
          </SectionParagraph>

          <SectionTitle>2. Hizmetlerin Kullanımı ve Kapsamı</SectionTitle>
          <SectionParagraph>
            FINOPS AI, kullanıcılara finansal veri analizi, bütçeleme, raporlama ve ilgili diğer araçları sunan bir platformdur. Kullanıcı, Hizmetler'i yalnızca yasal ve bu Koşullara uygun amaçlarla kullanacağını kabul eder.
          </SectionParagraph>

          <SectionTitle>3. Kullanıcı Yükümlülükleri</SectionTitle>
          <SectionParagraph>
            Kullanıcı, aşağıdaki hususlara uymayı taahhüt eder:
          </SectionParagraph>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>Kayıt sırasında doğru, güncel ve eksiksiz bilgi sağlamak.</li>
            <li>Hesap şifresinin gizliliğini korumak ve yetkisiz kullanımları derhal bildirmek.</li>
            <li>Platforma virüs, truva atı gibi zararlı kodlar yüklememek.</li>
            <li>Hizmetlerin işleyişine müdahale etmemek veya etmeye teşebbüs etmemek.</li>
            <li>Üçüncü şahısların haklarını (fikri mülkiyet, gizlilik vb.) ihlal etmemek.</li>
          </ul>

          <SectionTitle>4. Fikri Mülkiyet Hakları ve Telif Hakkı</SectionTitle>
          <SectionParagraph>
            Platformun kendisi, arayüzü, tasarımı, kodları, markası ("FINOPS AI") ve orijinal içeriği Şirket'in münhasır mülkiyetindedir ve Türk ve uluslararası telif hakkı, marka ve diğer yasalarla korunmaktadır. Kullanıcı tarafından Platform'a yüklenen tüm verilerin mülkiyeti Kullanıcı'ya aittir. Ancak Kullanıcı, bu verileri Hizmetler'in sunulabilmesi amacıyla işlememiz, saklamamız ve analiz etmemiz için bize dünya çapında, telifsiz bir lisans verir.
          </SectionParagraph>

          {/* Mandatory special clause: Dashboard & Template IP (EN + TR, verbatim) */}
          <SectionTitle>4.1 Dashboard &amp; Şablon Fikri Mülkiyet Maddesi</SectionTitle>
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="text-sm font-semibold text-gray-900">English</div>
            <p className="mt-2 whitespace-pre-line text-sm text-gray-800">
              All dashboards, templates, reports, visual layouts,
              and analytical structures generated or provided by FinOps AI Studio
              are protected intellectual property of FinOps AI Studio.

              Users are granted a limited, non-transferable, non-exclusive right
              to use these materials solely within their own accounts for internal
              business analysis purposes.

              Any attempt to copy, replicate, reverse-engineer, publicly share,
              resell, or use these materials outside the platform without explicit
              written permission is strictly prohibited.
            </p>

            <div className="mt-4 text-sm font-semibold text-gray-900">Türkçe</div>
            <p className="mt-2 whitespace-pre-line text-sm text-gray-800">
              FinOps AI Studio tarafından sağlanan veya üretilen tüm dashboard’lar,
              şablonlar, raporlar, görsel düzenler ve analitik yapılar,
              FinOps AI Studio’nun telif ve fikri mülkiyet haklarıyla korunan eserleridir.

              Kullanıcılara, bu materyalleri yalnızca kendi hesapları içinde ve sadece
              kurum içi iş analizi amaçlarıyla kullanmak üzere sınırlı, devredilemez,
              münhasır olmayan bir kullanım hakkı tanınır.

              Bu materyallerin; kopyalanması, çoğaltılması, tersine mühendislik yapılması,
              kamuya açık şekilde paylaşılması, yeniden satılması veya yazılı izin olmaksızın
              platform dışında kullanılması kesinlikle yasaktır.
            </p>
          </div>

          {/* Mandatory: Data Usage & Improvement ethics (EN, verbatim) */}
          <SectionTitle>4.2 Data Usage &amp; Improvement</SectionTitle>
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="text-sm font-semibold text-gray-900">English</div>
            <p className="mt-2 whitespace-pre-line text-sm text-gray-800">
              FinOps AI Studio may analyze anonymized and aggregated dashboard
              structures solely for the purpose of improving platform features
              and developing industry best-practice templates.

              No customer-specific data, metrics, visual configurations, or
              identifiable business information are ever reused, exposed,
              or shared.
            </p>
            <div className="mt-4 text-sm font-semibold text-gray-900">Türkçe</div>
            <p className="mt-2 whitespace-pre-line text-sm text-gray-800">
              FinOps AI Studio; yalnızca platform özelliklerini geliştirmek ve sektörel en iyi uygulama
              şablonları oluşturmak amacıyla, anonimleştirilmiş ve toplulaştırılmış dashboard yapılarını
              analiz edebilir.

              Müşteriye özel hiçbir veri, metrik, görsel konfigürasyon veya tanımlanabilir işletme bilgisi
              hiçbir zaman yeniden kullanılmaz, ifşa edilmez veya paylaşılmaz.
            </p>
          </div>

          <SectionTitle>5. Ücretlendirme, Abonelik ve İptal</SectionTitle>
          <SectionParagraph>
            Hizmetler'in bazı özellikleri ücretli abonelik gerektirebilir. Abonelik ücretleri, ödeme koşulları ve iptal politikaları, Platform'un ilgili bölümlerinde belirtildiği gibidir. Zamanında ödenmeyen ücretler, hesabın askıya alınmasına veya feshedilmesine neden olabilir.
          </SectionParagraph>

          <SectionTitle>6. Sorumluluğun Sınırlandırılması ve Garanti Reddi</SectionTitle>
          <SectionParagraph>
            Hizmetler, "OLDUĞU GİBİ" ve "MEVCUT OLDUĞU ŞEKİLDE" sunulmaktadır. FINOPS AI, Hizmetler'in kesintisiz, hatasız veya tamamen güvenli olacağını garanti etmez. Yasaların izin verdiği azami ölçüde, FINOPS AI veya yöneticileri, dolaylı, arızi veya sonuç olarak ortaya çıkan zararlardan sorumlu tutulamaz.
          </SectionParagraph>

          <SectionTitle>7. Sözleşmenin Feshi</SectionTitle>
          <SectionParagraph>
            Bu Koşulların Kullanıcı tarafından ihlal edilmesi durumunda, FINOPS AI, önceden bildirimde bulunmaksızın Kullanıcı'nın hesabını ve Hizmetler'e erişimini derhal askıya alabilir veya feshedebilir.
          </SectionParagraph>

          <SectionTitle>8. Uygulanacak Hukuk ve Yetkili Mahkeme</SectionTitle>
          <SectionParagraph>
            Bu Koşulların yorumlanmasında ve uygulanmasında Türkiye Cumhuriyeti kanunları geçerlidir. Bu Koşullardan doğabilecek her türlü uyuşmazlığın çözümünde İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri münhasıran yetkilidir.
          </SectionParagraph>

          <SectionTitle>9. Bize Ulaşın</SectionTitle>
          <SectionParagraph>
            Bu Koşullar hakkında herhangi bir sorunuz varsa, lütfen <Link to="/contact" className="text-blue-600 hover:text-blue-700">iletişim sayfamız</Link> üzerinden bize ulaşın.
          </SectionParagraph>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
