import React from 'react';
import { Download, Copy } from 'lucide-react';

// --- ASSET IMPORTS --- //
import finopsLogoDark from '../assets/brand/finops-logo-dark.png';
import finopsLogoLight from '../assets/brand/finops-logo-light.png';
import finopsTmColor from '../assets/brand/finops-tm-color.png';
import finopsTmMono from '../assets/brand/finops-tm-mono.png';
import finopsProfileLight from '../assets/brand/finops-profile-light.png';
import finopsProfileDark from '../assets/brand/finops-profile-dark.png';
import finopsLiBannerLight from '../assets/brand/finops-li-banner-light.png';
import finopsLiBannerDark from '../assets/brand/finops-li-banner-dark.png';
import finopsKartvizitLight from '../assets/brand/finops-kartvizit-light.png';
import finopsKartvizitDark from '../assets/brand/finops-kartvizit-dark.png';
import finopsQrCode from '../assets/brand/finops-qr-code.png';
import finopsIgAnaliz from '../assets/brand/finops-ig-Analiz.png';
import finopsIgButceLight from '../assets/brand/finops-ig-Bütçe-light.png';
import finopsIgHaberlerLight from '../assets/brand/finops-ig-Haberler-light.png';
import finopsIgIpuclari from '../assets/brand/finops-ig-İpuçları .png';

// --- DATA: COLORS --- //
const colorPalette = [
  { name: "Primary Blue", hex: "#2563eb", rgb: "37, 99, 235", philosophy: "Güven, teknoloji ve yenilikçiliği temsil eder. Ana eylem çağrıları ve vurgular için kullanılır." },
  { name: "Neutral Black", hex: "#111827", rgb: "17, 24, 39", philosophy: "Güçlü ve net bir duruş sergiler. Ana başlıklar ve temel metinler için idealdir." },
  { name: "Neutral Gray", hex: "#6b7280", rgb: "107, 114, 128", philosophy: "Denge ve profesyonelliği yansıtır. Yardımcı metinler ve daha az önemli bilgiler için kullanılır." },
  { name: "Accent Emerald", hex: "#10b981", rgb: "16, 185, 129", philosophy: "Büyüme, başarı ve pozitifliği simgeler. Olumlu geri bildirimler ve başarı metriklerinde kullanılır." },
  { name: "Background White", hex: "#ffffff", rgb: "255, 255, 255", philosophy: "Ferahlık, sadelik ve odaklanma sağlar. Tüm tasarımların ana zeminini oluşturur." },
  { name: "Background Gray", hex: "#f3f4f6", rgb: "243, 244, 246", philosophy: "Görsel hiyerarşiyi destekler ve bölümleri ayırmak için kullanılır. Hafif bir kontrast oluşturur." },
];

// --- DATA: TYPOGRAPHY --- //
const typography = {
  fontFamily: "'Manrope', sans-serif",
  styles: [
    { name: "Ana Başlık (H1)", style: "text-4xl font-bold tracking-tight text-gray-900", text: "Veri Odaklı Finans Yönetimi" },
    { name: "İkincil Başlık (H2)", style: "text-3xl font-bold text-gray-800", text: "Sektörel Çözümler" },
    { name: "Bölüm Başlığı (H3)", style: "text-xl font-semibold text-gray-800", text: "Renk Felsefesi" },
    { name: "Paragraf Metni", style: "text-base text-gray-600 leading-relaxed", text: "Finops AI, KOBİ'lerin finansal verilerini anlamlandırmalarına ve kârlılıklarını artırmalarına yardımcı olan yapay zeka destekli bir platformdur." },
    { name: "Yardımcı Metin / Etiket", style: "text-sm font-medium text-gray-500", text: "Logo (Açık Zemin)" },
  ]
};

// --- DATA: ASSETS --- //
const assetCategories = [
  {
    title: "Ana Logolar",
    description: "Markamızın birincil kimliği. Farklı zeminlerde kullanım için versiyonları mevcuttur.",
    assets: [
      { name: "Logo (Koyu Metin)", file: finopsLogoDark },
      { name: "Logo (Açık Metin)", file: finopsLogoLight },
      { name: "Monogram (Renkli)", file: finopsTmColor },
      { name: "Monogram (Siyah/Beyaz)", file: finopsTmMono },
    ]
  },
  {
    title: "Sosyal Medya ve Profil",
    description: "Dijital platformlarda markamızı temsil eden profil ve banner görselleri.",
    assets: [
      { name: "Profil Resmi (Açık Zemin)", file: finopsProfileLight },
      { name: "Profil Resmi (Koyu Zemin)", file: finopsProfileDark },
      { name: "LinkedIn Banner (Açık)", file: finopsLiBannerLight },
      { name: "LinkedIn Banner (Koyu)", file: finopsLiBannerDark },
    ]
  },
  {
    title: "Pazarlama ve Sunum Materyalleri",
    description: "Satış, pazarlama ve kurumsal iletişimde kullanılacak tüm materyaller.",
    assets: [
      { name: "İş Planı (PDF)", file: "/FINOPS-BusinessPlan.pdf" },
      { name: "Kartvizit (Açık Tasarım)", file: finopsKartvizitLight },
      { name: "Kartvizit (Koyu Tasarım)", file: finopsKartvizitDark },
      { name: "QR Kod", file: finopsQrCode },
    ]
  },
  {
    title: "İçerik Şablonları (Instagram)",
    description: "Instagram paylaşımları için oluşturulmuş, marka kimliğine uygun şablonlar.",
    assets: [
      { name: "Analiz (Koyu)", file: finopsIgAnaliz },
      { name: "Bütçe (Açık)", file: finopsIgButceLight },
      { name: "Haberler (Açık)", file: finopsIgHaberlerLight },
      { name: "İpuçları (Koyu)", file: finopsIgIpuclari },
    ]
  }
];

// --- HELPER COMPONENT: ASSET CARD --- //
const AssetCard: React.FC<{ asset: { name: string; file: string } }> = ({ asset }) => {
  const isPDF = typeof asset.file === 'string' && asset.file.toLowerCase().endsWith('.pdf');
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = asset.file;
    link.download = asset.file.split('/').pop() || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4 rounded-t-lg overflow-hidden">
        <img 
          src={isPDF ? finopsTmColor : asset.file} 
          alt={asset.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 bg-white rounded-b-lg flex-grow flex flex-col justify-between">
        <p className="text-sm font-semibold text-gray-800 truncate">{asset.name}</p>
        <button
          onClick={handleDownload}
          className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-200"
        >
          <Download className="h-3.5 w-3.5" />
          İndir
        </button>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT --- //
const BrandingKitPage: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here to confirm copy
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Header */}
        <div className="text-left mb-20">
          <p className="text-base font-semibold text-blue-600">Kurumsal Kimlik</p>
          <h1 className="mt-2 text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">Marka Merkezi</h1>
          <p className="mt-6 max-w-3xl text-lg text-gray-600">
            Finops AI markasını tutarlı, profesyonel ve etkili bir şekilde temsil etmek için ihtiyacınız olan tüm kaynaklar, kurallar ve araçlar burada.
          </p>
        </div>

        {/* Color Philosophy Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Renk Felsefesi</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">Renklerimiz markamızın kişiliğini yansıtır: teknolojik, güvenilir, ve insan odaklı. Bu palet, dijital ve basılı tüm materyallerimizde tutarlılığı sağlar.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorPalette.map((color) => (
              <div key={color.name} className="border border-gray-200 rounded-lg shadow-sm p-5">
                <div className="w-full h-24 rounded-md mb-4" style={{ backgroundColor: color.hex }}></div>
                <h3 className="text-lg font-semibold text-gray-800">{color.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-3">{color.philosophy}</p>
                <div className="text-xs space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <span className="font-mono text-gray-700">{color.hex}</span>
                    <button onClick={() => copyToClipboard(color.hex)} className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 hover:text-gray-800"> <Copy size={14} /> </button>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <span className="font-mono text-gray-700">rgb({color.rgb})</span>
                    <button onClick={() => copyToClipboard(`rgb(${color.rgb})`)} className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 hover:text-gray-800"> <Copy size={14} /> </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Tipografi</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">Kullandığımız yazı tipi <span className="font-semibold text-gray-800">{typography.fontFamily}</span>, modern, okunaklı ve dijital ekranlar için optimize edilmiştir. Bu hiyerarşi, içeriğin kolayca taranmasını ve anlaşılmasını sağlar.</p>
          <div className="space-y-8 border border-gray-200 rounded-lg p-8">
            {typography.styles.map(style => (
              <div key={style.name}>
                <p className="text-sm text-gray-500 mb-2">{style.name}</p>
                <p className={style.style} style={{ fontFamily: typography.fontFamily }}>{style.text}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Asset Categories */}
        {assetCategories.map((category) => (
          <section key={category.title} className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{category.title}</h2>
            <p className="text-gray-600 mb-10 max-w-3xl">{category.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.assets.map((asset) => (
                <AssetCard key={asset.name} asset={asset} />
              ))}
            </div>
          </section>
        ))}
        
      </div>
    </div>
  );
};

export default BrandingKitPage;
