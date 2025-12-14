
const BrandingKitPage = () => {
  const colorPalette = {
    primary: '#4F46E5',
    secondary: '#10B981',
    accent: '#F59E0B',
    neutral: '#4B5563',
    'base-100': '#FFFFFF',
    info: '#3B82F6',
    success: '#22C55E',
    warning: '#FBBF24',
    error: '#EF4444',
  };

  const typography = {
    heading: ''Poppins', sans-serif',
    body: ''Inter', sans-serif',
  };

  const logos = {
    light: '/public/finops-logo-light.png',
    dark: '/public/finops-logo-dark.png',
    tm_color: '/public/finops-tm-color.png',
    tm_mono: '/public/finops-tm-mono.png',
  };

  const marketingAssets = [
    { name: 'Instagram Analiz', src: '/public/finops-ig-Analiz.png' },
    { name: 'Instagram Bütçe', src: '/public/finops-ig-Bütçe.png' },
    { name: 'Instagram Haberler', src: '/public/finops-ig-Haberler.png' },
    { name: 'Instagram İpuçları', src: '/public/finops-ig-İpuçları .png' },
    { name: 'Kartvizit (Koyu)', src: '/public/finops-kartvizit-dark.png' },
    { name: 'Kartvizit (Açık)', src: '/public/finops-kartvizit-light.png' },
    { name: 'LinkedIn Banner (Koyu)', src: '/public/finops-li-banner-dark.png' },
    { name: 'LinkedIn Banner (Açık)', src: '/public/finops-li-banner-light.png' },
    { name: 'Profil (Koyu)', src: '/public/finops-profile-dark.png' },
    { name: 'Profil (Açık)', src: '/public/finops-profile-light.png' },
    { name: 'QR Kod', src: '/public/finops-qr-code.png' },
    { name: 'Reels (Koyu)', src: '/public/finops-reels-dark.png' },
    { name: 'Reels (Açık)', src: '/public/finops-reels-light.png' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Marka Kiti</h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            FinOps AI'nin marka kimliğini oluşturan temel görsel ve yazılı unsurlar. Bu kılavuz, markamızın tutarlı ve doğru bir şekilde temsil edilmesini sağlamak için hazırlanmıştır.
          </p>

          {/* Logo Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Logolar</h2>
            <p className="mt-4 text-gray-600">Farklı arka planlar ve kullanım senaryoları için tasarlanmış logolarımız.</p>
            <div className="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
                <div className="rounded-lg bg-gray-100 p-8 flex flex-col items-center justify-center">
                    <img src={logos.dark} alt="FinOps AI Logo - Açık Zemin" className="h-12 object-contain"/>
                    <p className="mt-4 text-sm font-medium text-gray-500">Açık Zemin Üzeri Logo</p>
                </div>
                <div className="rounded-lg bg-gray-800 p-8 flex flex-col items-center justify-center">
                    <img src={logos.light} alt="FinOps AI Logo - Koyu Zemin" className="h-12 object-contain"/>
                    <p className="mt-4 text-sm font-medium text-gray-200">Koyu Zemin Üzeri Logo</p>
                </div>
                <div className="rounded-lg bg-gray-100 p-8 flex flex-col items-center justify-center">
                    <img src={logos.tm_color} alt="FinOps AI Ticari Marka Renkli" className="h-20 object-contain"/>
                    <p className="mt-4 text-sm font-medium text-gray-500">Ticari Marka (Renkli)</p>
                </div>
                 <div className="rounded-lg bg-gray-100 p-8 flex flex-col items-center justify-center">
                    <img src={logos.tm_mono} alt="FinOps AI Ticari Marka Mono" className="h-20 object-contain"/>
                    <p className="mt-4 text-sm font-medium text-gray-500">Ticari Marka (Mono)</p>
                </div>
            </div>
          </div>

          {/* Pazarlama Materyalleri Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Pazarlama ve Sosyal Medya Materyalleri</h2>
            <p className="mt-4 text-gray-600">Kampanyalar, sosyal medya paylaşımları ve diğer pazarlama faaliyetleri için hazırlanmış görsel varlıklar.</p>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {marketingAssets.map((asset) => (
                <div key={asset.name} className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <img src={asset.src} alt={asset.name} className="w-full h-auto object-cover" />
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-700">{asset.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Renk Paleti Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Renk Paleti</h2>
            <p className="mt-4 text-gray-600">Marka kimliğimizi yansıtan ana ve yardımcı renklerimiz.</p>
            <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
              {Object.entries(colorPalette).map(([name, hex]) => (
                <div key={name} className="flex flex-col items-center space-y-3">
                  <div className="h-24 w-24 rounded-full border border-gray-200" style={{ backgroundColor: hex }} />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900 capitalize">{name.replace('-', ' ')}</p>
                    <p className="text-sm text-gray-500 uppercase">{hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tipografi Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tipografi</h2>
            <p className="mt-4 text-gray-600">Okunabilirlik ve marka tutarlılığı için kullandığımız yazı tipleri.</p>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800" style={{ fontFamily: typography.heading }}>Başlık Yazı Tipi: Poppins</h3>
                <p className="mt-2 text-6xl font-bold text-gray-900" style={{ fontFamily: typography.heading }}>Aa</p>
                <p className="mt-2 text-gray-600" style={{ fontFamily: typography.heading }}>ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800" style={{ fontFamily: typography.body }}>Metin Yazı Tipi: Inter</h3>
                <p className="mt-2 text-4xl text-gray-900" style={{ fontFamily: typography.body }}>Aa</p>
                <p className="mt-2 text-gray-600" style={{ fontFamily: typography.body }}>abcçdefgğhiıjklmnoöprsştuüvyz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingKitPage;
