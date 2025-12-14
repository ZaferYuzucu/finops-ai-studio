import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicyPage: React.FC = () => {
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
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Çerez Politikası</h1>
        <p className="mt-6 text-xl leading-8">
          Bu Çerez Politikası, FINOPS AI ("Şirket", "biz") olarak, web sitemizi ve hizmetlerimizi ziyaret ettiğinizde cihazınıza yerleştirilen küçük metin dosyaları olan çerezleri ve benzeri teknolojileri nasıl kullandığımızı açıklamaktadır.
        </p>

        <div className="mt-10 max-w-2xl">
          <SectionTitle>1. Çerez Nedir?</SectionTitle>
          <SectionParagraph>
            Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza indirilen küçük veri dosyalarıdır. Web sitelerinin daha verimli çalışmasını sağlamak ve sahiplerine raporlama bilgileri sunmak gibi çeşitli amaçlar için yaygın olarak kullanılırlar.
          </SectionParagraph>

          <SectionTitle>2. Çerezleri Neden Kullanıyoruz?</SectionTitle>
          <SectionParagraph>
            Çerezleri çeşitli nedenlerle kullanıyoruz:
          </SectionParagraph>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600">
            <li><b>Temel Çerezler:</b> Web sitemizin ve hizmetlerimizin güvenli bir şekilde çalışması için kesinlikle gerekli olan çerezlerdir. Örneğin, oturum açmanızı sağlayan çerezler.</li>
            <li><b>Performans ve Analitik Çerezler:</b> Ziyaretçilerin web sitemizi nasıl kullandığını (örneğin hangi sayfaların en popüler olduğu) anlamamıza yardımcı olur. Bu, sitemizin performansını ve kullanıcı deneyimini iyileştirmemizi sağlar.</li>
            <li><b>Fonksiyonel Çerezler:</b> Yaptığınız seçimleri (kullanıcı adı, dil veya bölge gibi) hatırlamamızı ve size daha gelişmiş, kişisel özellikler sunmamızı sağlar.</li>
            <li><b>Reklam ve Pazarlama Çerezleri:</b> İlgi alanlarınıza daha uygun reklamlar sunmak için kullanılır.</li>
          </ul>

          <SectionTitle>3. Kullandığımız Çerez Türleri</SectionTitle>
          <SectionParagraph>
            <b>Oturum Çerezleri:</b> Tarayıcınızı kapattığınızda sona erer ve yalnızca o anki ziyaretiniz süresince web sitemizdeki eylemlerinizi bağlamamıza olanak tanır.
            <br/><br/>
            <b>Kalıcı Çerezler:</b> Tarayıcınızı kapattıktan sonra da cihazınızda kalır ve birden çok sitedeki tercihlerinizi veya eylemlerinizi hatırlamamızı sağlar.
          </SectionParagraph>

          <SectionTitle>4. Çerezleri Nasıl Kontrol Edebilirsiniz?</SectionTitle>
          <SectionParagraph>
            Çerezleri kontrol etme ve/veya silme hakkına sahipsiniz. Çoğu web tarayıcısı, çerezleri otomatik olarak kabul eder, ancak isterseniz tarayıcı ayarlarınızı genellikle çerezleri reddedecek şekilde değiştirebilirsiniz. Ancak bunu yaparsanız, web sitemizin bazı özelliklerini ve işlevlerini kullanamayabilirsiniz.
            <br/><br/>
            Tarayıcınızdaki çerez ayarlarını nasıl yöneteceğinize dair bilgi için tarayıcınızın yardım menüsüne başvurabilirsiniz.
          </SectionParagraph>

          <SectionTitle>5. Politikadaki Değişiklikler</SectionTitle>
          <SectionParagraph>
            Bu Çerez Politikası'nı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlandığı andan itibaren yürürlüğe girer. Politikayı düzenli olarak gözden geçirmenizi öneririz.
          </SectionParagraph>

          <SectionTitle>6. Bize Ulaşın</SectionTitle>
          <SectionParagraph>
            Bu Çerez Politikası hakkında sorularınız varsa, lütfen <Link to="/contact" className="text-blue-600 hover:text-blue-700">iletişim sayfamız</Link> üzerinden bize ulaşın.
          </SectionParagraph>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
