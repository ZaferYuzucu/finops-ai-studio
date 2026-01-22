import React from 'react';
import { Link } from 'react-router-dom';

const TrustAndDataConfidencePage: React.FC = () => {
  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{children}</h2>
  );

  const SectionParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="mt-4 leading-7">{children}</p>
  );

  const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">{children}</h3>
  );

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-blue-600">Veri Güvenliği Yaklaşımımız</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Verilerinize Neden Güvenle Emanet Edebilirsiniz?
        </h1>

        <div className="mt-10 max-w-2xl">
          <SectionTitle>Güven Bir Teknoloji Değil, Bir Yaklaşımdır</SectionTitle>
          
          <SectionParagraph>
            Bir işletmenin finansal verileri, yalnızca rakamlardan ibaret değildir.
            O veriler; emeği, riski, alın terini ve yılların birikimini temsil eder.
          </SectionParagraph>

          <SectionParagraph>
            Türkiye'de işletme sahiplerinin bu konudaki hassasiyetini çok iyi biliyoruz.
            Bu yüzden FinOps AI Studio'yu tasarlarken şu soruyu kendimize sorduk:
          </SectionParagraph>

          <p className="mt-4 text-xl font-semibold italic text-gray-800">
            "Bir işletme sahibi neden bize güvensin?"
          </p>

          <SectionTitle>Emanet Defteri Yaklaşımı</SectionTitle>
          
          <SectionParagraph>
            Bir işletmenin iki defteri vardır:
          </SectionParagraph>

          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Günlük bakılan, karar almak için kullanılan defter</li>
            <li>Asıl önemli olan, kimseyle paylaşılmak istenmeyen ana defter</li>
          </ul>

          <SectionParagraph>
            FinOps AI Studio, sizin ana defterinizi alıp götüren bir sistem değildir.
            Biz o defteri saklamayız, sahiplenmeyiz ve paylaşmayız.
          </SectionParagraph>

          <p className="mt-4 text-lg font-semibold text-gray-800 leading-7">
            Defter sizin kasanızda durur.
          </p>
          
          <SectionParagraph>
            Biz yalnızca, siz izin verdiğiniz sürece o defterden anlam çıkarmanıza yardımcı oluruz.
          </SectionParagraph>

          <SectionTitle>Verileriniz Kimin Kontrolünde?</SectionTitle>

          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Yüklenen veriler sizin hesabınıza özeldir</li>
            <li>Siz istemedikçe paylaşılmaz</li>
            <li>Siz silmeden kalıcı hale gelmez</li>
            <li>Siz kapattığınızda erişim sona erer</li>
          </ul>

          <SubSectionTitle>FinOps AI Studio:</SubSectionTitle>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Muhasebeciniz değildir</li>
            <li>Denetçiniz değildir</li>
            <li>Banka ya da raporlama otoritesi değildir</li>
          </ul>

          <p className="mt-6 text-lg font-semibold text-gray-800 leading-7">
            Biz, karar vermenizi kolaylaştıran bir analiz aracıyız.
          </p>

          <SectionTitle>Bulut Meselesi Hakkında Açık Konuşalım</SectionTitle>
          
          <SectionParagraph>
            "Bulut" kavramı çoğu zaman yanlış anlaşılır.
            Bulut, herkesin eriştiği ortak bir alan değildir.
          </SectionParagraph>

          <p className="mt-4 text-lg font-semibold text-gray-800 leading-7">
            Bulut, size özel ayrılmış, kilitli bir kasadır.
          </p>

          <SectionParagraph>
            Ancak şunu da açıkça söylüyoruz:
            İşletme tercihlerine göre verinin nerede ve nasıl tutulacağına siz karar verirsiniz.
          </SectionParagraph>

          <p className="mt-4 text-lg font-semibold text-gray-800 leading-7">
            Bizim yaklaşımımız nettir:
            Kontrol her zaman işletme sahibindedir.
          </p>

          <SectionTitle>Şeffaflık Bizim İçin Esastır</SectionTitle>
          
          <SubSectionTitle>FinOps AI Studio:</SubSectionTitle>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Arka planda gizli işlem yapmaz</li>
            <li>Verilerinizi üçüncü taraflarla paylaşmaz</li>
            <li>Sizin adınıza raporlama ya da bildirimde bulunmaz</li>
          </ul>

          <p className="mt-6 text-lg italic text-gray-700 leading-7">
            Ne yaptığımız kadar, ne yapmadığımızı da açıkça söyleriz.
          </p>

          <SectionTitle>Kısaca</SectionTitle>
          
          <SectionParagraph>
            FinOps AI Studio,
            verilerinizi alan bir sistem değil,
            verilerinizi daha iyi okumanıza yardımcı olan bir araçtır.
          </SectionParagraph>

          <p className="mt-6 text-xl font-semibold text-gray-900 leading-8">
            Güven, teknik terimlerle değil;
            şeffaflık, kontrol ve saygıyla inşa edilir.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Bu yaklaşım hakkında daha fazla bilgi almak veya sorularınız için{' '}
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                bizimle iletişime geçebilirsiniz
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustAndDataConfidencePage;
