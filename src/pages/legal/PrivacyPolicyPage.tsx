import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
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
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Gizlilik Politikası</h1>
        <p className="mt-6 text-xl leading-8">
          Bu Gizlilik Politikası, FINOPS AI ("Şirket", "biz") olarak, hizmetlerimizi kullanan siz değerli kullanıcılarımızın kişisel verilerini nasıl topladığımızı, kullandığımızı, sakladığımızı ve koruduğumuzu açıklamaktadır. Hizmetlerimizi kullanarak, verilerinizin bu politikaya uygun olarak işlenmesini kabul etmiş olursunuz.
        </p>

        <div className="mt-10 max-w-2xl">
          <SectionTitle>1. Topladığımız Bilgiler</SectionTitle>
          <SectionParagraph>
Hizmetlerimizi sunmak ve iyileştirmek amacıyla çeşitli türde bilgiler topluyoruz.</SectionParagraph>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600">
            <li><b>Kişisel Veriler:</b> Kayıt sırasında sağladığınız ad, soyadı, e-posta adresi, şirket bilgileri gibi kimliğinizi belirleyen veriler.</li>
            <li><b>Finansal Veriler:</b> Platformumuza yüklediğiniz veya entegre ettiğiniz bilanço, gelir tablosu, fatura verileri gibi anonimleştirilmiş veya kişisel olmayan şirket verileri.</li>
            <li><b>Kullanım Verileri:</b> IP adresi, tarayıcı türü, ziyaret edilen sayfalar, tıklama akışı ve platformdaki etkileşimleriniz gibi teknik veriler.</li>
          </ul>

          <SectionTitle>2. Bilgileri Nasıl Kullanıyoruz?</SectionTitle>
          <SectionParagraph>
            Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:
          </SectionParagraph>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600">
            <li>Hizmetlerimizi sunmak, yönetmek ve sürdürmek.</li>
            <li>Hesabınızı oluşturmak ve yönetmek.</li>
            <li>Deneyiminizi kişiselleştirmek ve platformumuzu iyileştirmek.</li>
            <li>Müşteri desteği sağlamak ve taleplerinize yanıt vermek.</li>
            <li>Hizmet güncellemeleri, güvenlik uyarıları ve yönetimsel mesajlar göndermek.</li>
            <li>Yasal yükümlülüklere uymak ve sahtekarlığı önlemek.</li>
          </ul>

          <SectionTitle>3. Bilgilerin Paylaşımı</SectionTitle>
          <SectionParagraph>
            Kişisel verilerinizi, onayınız olmadan üçüncü taraflarla satmayız, kiralamayız veya ticaretini yapmayız. Bilgilerinizi yalnızca aşağıdaki durumlarda paylaşabiliriz:
          </SectionParagraph>
           <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600">
            <li><b>Hizmet Sağlayıcılar:</b> Veri tabanı yönetimi, analiz veya barındırma gibi hizmetleri bizim adımıza yürüten güvenilir üçüncü taraf şirketlerle.</li>
            <li><b>Yasal Zorunluluklar:</b> Mahkeme kararı veya yasal bir talep doğrultusunda, yasaların gerektirdiği durumlarda.</li>
            <li><b>Şirket Devri:</b> Bir birleşme, devralma veya varlık satışı durumunda, verileriniz devredilen varlıkların bir parçası olabilir.</li>
          </ul>

          <SectionTitle>4. Veri Güvenliği</SectionTitle>
          <SectionParagraph>
            Verilerinizin güvenliğini sağlamak için endüstri standardı teknik ve idari güvenlik önlemleri alıyoruz. Veri iletiminde SSL şifrelemesi kullanıyor ve sunucularımızı güvenli ortamlarda barındırıyoruz. Ancak, internet üzerinden hiçbir iletim yönteminin veya elektronik depolama yönteminin %100 güvenli olmadığını unutmayınız.
          </SectionParagraph>

          <SectionTitle>5. Haklarınız</SectionTitle>
          <SectionParagraph>
            Kişisel verilerinizle ilgili olarak erişme, düzeltme, silme veya işlemeyi kısıtlama hakkına sahipsiniz. Bu haklarınızı kullanmak için lütfen bizimle iletişime geçin.
          </SectionParagraph>

          <SectionTitle>6. Politikadaki Değişiklikler</SectionTitle>
          <SectionParagraph>
            Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlandığı andan itibaren yürürlüğe girer. Politikayı düzenli olarak gözden geçirmenizi öneririz.
          </SectionParagraph>

          <SectionTitle>7. Bize Ulaşın</SectionTitle>
          <SectionParagraph>
            Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen <Link to="/contact" className="text-blue-600 hover:text-blue-700">iletişim sayfamız</Link> üzerinden bize ulaşın.
          </SectionParagraph>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
