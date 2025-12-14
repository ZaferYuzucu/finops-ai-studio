import React from 'react';
import { Link } from 'react-router-dom';

const EmailDisclaimerPage: React.FC = () => {
  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{children}</h2>
  );

  const SectionParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="mt-4 leading-7">{children}</p>
  );

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-blue-600">Kurumsal İletişim Politikası</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">E-Posta Yasal Uyarısı (Sorumluluk Reddi)</h1>
        <p className="mt-6 text-xl leading-8">
          FINOPS AI ve çalışanları tarafından gönderilen tüm e-posta iletileri ve ekleri, aşağıda belirtilen yasal uyarılara tabidir. E-posta iletişimlerimizle etkileşime geçerek bu koşulları kabul etmiş sayılırsınız.
        </p>

        <div className="mt-10 max-w-2xl">
          <SectionTitle>1. Gizlilik ve Mahremiyet</SectionTitle>
          <SectionParagraph>
            Bu e-posta ve ekleri, yalnızca hedeflenen alıcı(lar) için özel ve gizli bilgiler içerebilir. Eğer bu e-postanın hedeflenen alıcısı siz değilseniz, bu e-postayı veya eklerini ifşa etmeniz, kopyalamanız, dağıtmanız veya içeriğine dayanarak herhangi bir eylemde bulunmanız kesinlikle yasaktır. E-postayı yanlışlıkla aldıysanız, lütfen derhal göndericiyi bilgilendirin ve bu e-postayı sisteminizden kalıcı olarak silin.
          </SectionParagraph>

          <SectionTitle>2. Sorumluluğun Reddi</SectionTitle>
          <SectionParagraph>
            E-posta yoluyla iletilen bilgilerin doğruluğu ve bütünlüğü konusunda herhangi bir garanti verilmemektedir. E-posta iletimleri güvenli veya hatasız olmayabilir; bilgiler kesintiye uğrayabilir, bozulabilir, kaybolabilir, gecikebilir veya virüs içerebilir. FINOPS AI, bu mesajın içeriğindeki hatalardan veya eksikliklerden, iletimi sırasında ortaya çıkabilecek herhangi bir zarardan sorumlu tutulamaz.
          </SectionParagraph>

          <SectionTitle>3. Bağlayıcı Olmama İlkesi</SectionTitle>
          <SectionParagraph>
            Bu e-posta içeriği, aksi açıkça ve yetkili bir temsilci tarafından belirtilmedikçe, herhangi bir sözleşme veya yasal taahhüt oluşturmaz. Şirketimiz adına bağlayıcı anlaşmalar, yalnızca usulüne uygun olarak imzalanmış yazılı belgelerle yapılabilir.
          </SectionParagraph>

          <SectionTitle>4. Virüslere Karşı Tarama</SectionTitle>
          <SectionParagraph>
            FINOPS AI, gönderilen tüm e-postaları virüslere karşı taramak için makul önlemleri alsa da, alıcının da kendi sistemlerinde bir virüs taraması yapması tavsiye edilir. FINOPS AI, bu e-posta veya eklerinin iletilmesiyle ortaya çıkabilecek herhangi bir virüs veya zarardan sorumlu değildir.
          </SectionParagraph>

           <SectionTitle>5. Bize Ulaşın</SectionTitle>
          <SectionParagraph>
            Bu yasal uyarılarla ilgili herhangi bir sorunuz varsa, lütfen <Link to="/contact" className="text-blue-600 hover:text-blue-700">iletişim sayfamız</Link> üzerinden bize ulaşın.
          </SectionParagraph>
        </div>
      </div>
    </div>
  );
};

export default EmailDisclaimerPage;
