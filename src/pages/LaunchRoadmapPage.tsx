import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Rocket, Target, TrendingUp, Users, Lightbulb, MessageSquare } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function LaunchRoadmapPage() {
  const { t } = useTranslation();

  // PNG İndirme Fonksiyonu
  const handleDownloadPNG = async (postNumber: number) => {
    try {
      // Geçici iframe oluştur
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.left = '-9999px';
      iframe.style.width = '1080px';
      iframe.style.height = '1080px';
      iframe.src = `/brand/LinkedIn_Post_${postNumber}.html`;
      document.body.appendChild(iframe);

      // İframe yüklenene kadar bekle
      await new Promise((resolve) => {
        iframe.onload = resolve;
      });

      // İframe içeriğini bekle
      await new Promise(resolve => setTimeout(resolve, 500));

      // HTML'i canvas'a çevir
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc || !iframeDoc.body) {
        throw new Error('İframe içeriği yüklenemedi');
      }

      const canvas = await html2canvas(iframeDoc.body, {
        width: 1080,
        height: 1080,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      // Canvas'ı PNG'ye çevir ve indir
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `FinOps_LinkedIn_Post_${postNumber}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        // İframe'i temizle
        document.body.removeChild(iframe);
      }, 'image/png');

    } catch (error) {
      console.error('PNG indirme hatası:', error);
      alert('PNG indirme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-12 w-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Lansman Yol Haritası</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Doğru müşterilerle büyümek için tasarlanmış stratejik pazarlama yol haritamız
          </p>
          
          {/* İki Buton Yan Yana */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/marketing-plan"
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <Target className="h-6 w-6" />
              Pazarlama Planı
            </Link>
            
            <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105">
              <Rocket className="h-6 w-6" />
              Lansman Yol Haritası
              <span className="ml-2 px-2 py-1 bg-purple-500 text-xs rounded-full">Aktif</span>
            </button>
          </div>
        </div>

        {/* FAZ-1 Beta/Lansman Partner Sunum */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Target className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">FAZ-1 | Beta / Lansman Partner Sunum</h2>
          </div>
          
          <div className="prose max-w-none">
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                KOBİ'ler İçin Yapay Zekâ Destekli Karar Dashboard'u
              </h3>
              <p className="text-lg text-indigo-800 font-semibold">
                Lansman Öncesi Beta / Partner Programı
              </p>
            </div>

            {/* Neyi Çözüyoruz */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Neyi Çözüyoruz?</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-4">
                <p className="text-lg text-gray-800 mb-3">KOBİ'lerin büyük bölümü bugün:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>Veriye sahip</strong></li>
                  <li>❌ Ancak <strong>karar netliğine sahip değil</strong></li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-800 mb-3">Excel dosyaları, muhasebe raporları ve dağınık tablolar:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Kârlılığı yanlış gösteriyor</li>
                  <li>• Nakit sorunlarını geç fark ettiriyor</li>
                  <li>• Yöneticiye aksiyon değil, sadece bilgi sunuyor</li>
                </ul>
              </div>
              <p className="text-xl font-bold text-indigo-600">Biz bu noktada devreye giriyoruz.</p>
            </div>

            {/* Biz Ne Yapıyoruz */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Biz Ne Yapıyoruz?</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <p className="text-lg text-gray-800 mb-4">Geliştirdiğimiz SaaS platformu:</p>
                <ul className="space-y-3 text-gray-700">
                  <li>✓ Finansal ve operasyonel verileri <strong>otomatik toplar</strong></li>
                  <li>✓ Yapay zekâ ile <strong>anlamlandırır</strong></li>
                  <li>✓ Sektöre uygun doğru <strong>dashboard'lara dönüştürür</strong></li>
                </ul>
                <div className="bg-white p-4 rounded-lg mt-4">
                  <p className="text-lg font-bold text-indigo-700">
                    Kullanıcıya şu sorunun cevabını verir:<br />
                    <span className="text-2xl text-indigo-900">"Şimdi ne yapmalıyım?"</span>
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-4 text-center">
                  Bu bir raporlama aracı değil,<br />
                  <span className="text-indigo-600">karar destek sistemidir.</span>
                </p>
              </div>
            </div>

            {/* Kimler İçin */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kimler İçin?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-800">• Restoran & Kafe işletmeleri</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-800">• Otel & Turizm şirketleri</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-800">• Üretim & sanayi KOBİ'leri</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-800">• Finansal görünürlüğünü netleştirmek isteyen işletme sahipleri</p>
                </div>
              </div>
            </div>

            {/* Beta Partner Programı */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Beta / Lansman Partner Programı Nedir?</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                <p className="text-xl font-bold text-gray-900 mb-4">Bu bir indirim kampanyası değildir.</p>
                <p className="text-lg text-gray-800 mb-3">Lansman öncesinde:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Sınırlı sayıda</strong> (20 işletme)</li>
                  <li>• Ürünü <strong>birlikte kullandığımız</strong></li>
                  <li>• Geri bildirimleriyle <strong>şekillendirdiğimiz</strong></li>
                  <li>• <strong>Referans oluşturacak</strong> işletmelerle çalışıyoruz</li>
                </ul>
              </div>
            </div>

            {/* Partner Avantajları */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partner Olan İşletmeler Ne Kazanır?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200">
                  <p className="text-gray-800">✓ Lansman sonrası fiyatlara kıyasla <strong>avantajlı kullanım</strong></p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200">
                  <p className="text-gray-800">✓ Ürünün gelişimine <strong>doğrudan katkı</strong></p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200">
                  <p className="text-gray-800">✓ <strong>Öncelikli destek</strong> ve iletişim</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200">
                  <p className="text-gray-800">✓ İlk <strong>vaka çalışmaları</strong> arasında yer alma</p>
                </div>
              </div>
            </div>

            {/* Neden Sınırlı */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Neden Sınırlı?</h3>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                <p className="text-lg text-gray-800 mb-3">Çünkü:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Her işletmeyle <strong>birebir ilgileniyoruz</strong></li>
                  <li>• Ürünü aceleyle değil, <strong>doğru şekilde</strong> büyütüyoruz</li>
                  <li>• Kalabalık değil, <strong>doğru partnerler</strong> arıyoruz</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* LinkedIn Paylaşım Taslakları */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">LinkedIn İçin 10 Paylaşım Taslağı</h2>
          </div>
          <p className="text-gray-600 mb-6 italic">(haftada 1–2 paylaşım = 1,5–2 ay yeter)</p>

          <div className="space-y-6">
            {[
              {
                num: 1,
                text: "Excel rapor üretir, karar vermez.\nBir işletme kârlı görünüp neden nakitte zorlanır?\nÇünkü tablo doğru, okuma yanlış.",
                slogan: "Rapor değil, karar üret."
              },
              {
                num: 2,
                text: "Bir dashboard yanlış tasarlanırsa,\nyanlış karar aldırır.\nGrafik sayısı değil, doğru grafik önemlidir.",
                slogan: "Doğru grafik, doğru karar."
              },
              {
                num: 3,
                text: "KOBİ'lerin sorunu veri eksikliği değil,\nveri karmaşasıdır.",
                slogan: "Veriyi sadeleştir, işi netleştir."
              },
              {
                num: 4,
                text: "Bir restoranın cirosu artarken\nkârlılığı neden düşer?\nCevap genelde tek bir grafikte saklıdır.",
                slogan: "Sorun büyük değil, görünmezdir."
              },
              {
                num: 5,
                text: "Power BI ve Tableau güçlü araçlardır.\nAma KOBİ'ler için çoğu zaman fazla karmaşıktır.",
                slogan: "Araç değil, çözüm."
              },
              {
                num: 6,
                text: "İşletme sahipleri grafik istemez.\nNe yapacağını bilmek ister.",
                slogan: "Grafik gösterme, yol göster."
              },
              {
                num: 7,
                text: "\"Bu ay iyiyiz\" demek yetmez.\nAsıl soru:\nGelecek ay ne olur?",
                slogan: "Bugünü değil, yarını yönet."
              },
              {
                num: 8,
                text: "Veri varsa karar vardır.\nAma veri doğru anlatılmazsa,\nkarar da yanlış olur.",
                slogan: "Veri konuşsun, sen dinle."
              },
              {
                num: 9,
                text: "Bir CFO gibi düşünmeyen dashboard,\nişletmeyi yarı yolda bırakır.",
                slogan: "Dashboard'unuz CFO'nuz olsun."
              },
              {
                num: 10,
                text: "Biz yazılım satmıyoruz.\nİşletmelere netlik satıyoruz.",
                slogan: "Netlik, en değerli varlıktır."
              }
            ].map((item) => (
              <div key={item.num} className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sol Taraf: Metin */}
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-blue-600">{item.num}</span>
                    <div className="flex-1">
                      <p className="text-gray-800 whitespace-pre-line mb-3">{item.text}</p>
                      <div className="bg-white p-3 rounded-lg inline-block">
                        <p className="font-bold text-indigo-600">Slogan: {item.slogan}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sağ Taraf: Görsel + Buton */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-80 h-80 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
                      <iframe 
                        src={`/brand/LinkedIn_Post_${item.num}.html`}
                        className="border-0 pointer-events-none"
                        title={`LinkedIn Post ${item.num}`}
                        style={{ 
                          width: '1080px', 
                          height: '1080px', 
                          transform: 'scale(0.296)',
                          transformOrigin: 'top left'
                        }}
                      />
                    </div>
                    <button 
                      onClick={() => handleDownloadPNG(item.num)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                      </svg>
                      PNG İndir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slogan Havuzu */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lightbulb className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Slogan Havuzu</h2>
          </div>
          <p className="text-gray-600 mb-6 italic">(Web + Sunum + Video için)</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rapor değil, karar üret.",
              "Veriyi sadeleştir, işi netleştir.",
              "Grafik değil, yön.",
              "Dashboard'unuz CFO'nuz olsun.",
              "KOBİ'ler için karar netliği.",
              "Araç değil, sonuç.",
              "Bugünü değil, yarını yönet.",
              "Veri var, netlik yoksa karar da yoktur."
            ].map((slogan, idx) => (
              <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-200 text-center">
                <p className="text-lg font-bold text-gray-900">{slogan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Plan Yol Haritası */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Marketing Plan – Yol Haritası</h2>
          </div>

          <div className="space-y-8">
            {/* Temel İlke */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Temel İlke</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <p className="text-lg text-gray-800">Bu ürün:</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  ❌ Hızla büyümek için değil<br />
                  ✅ <span className="text-green-700">Doğru müşterilerle büyümek için</span> tasarlanmıştır.
                </p>
              </div>
            </div>

            {/* Hedef Kitle */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hedef Kitle</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="text-gray-800">Karar verici KOBİ sahipleri</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="text-gray-800">Finansal görünürlük ihtiyacı olan yöneticiler</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="text-gray-800">"Excel'den fazlasını" isteyen işletmeler</p>
                </div>
              </div>
            </div>

            {/* Pazarlama Yaklaşımı */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pazarlama Yaklaşımı</h3>
              <div className="bg-purple-50 p-6 rounded-lg">
                <ul className="space-y-2 text-gray-800">
                  <li>❌ Sürekli reklam değil</li>
                  <li>❌ Sürekli görünürlük değil</li>
                  <li>✅ <strong>Doğru zamanda, doğru yerde anlatım</strong></li>
                </ul>
              </div>
            </div>

            {/* Kanal Öncelikleri */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kanal Öncelikleri</h3>
              <div className="space-y-3">
                <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
                  <span className="text-2xl mr-3">🤝</span>
                  <p className="text-gray-800">Yüz yüze iş çevresi (odalar, birlikler, referanslar)</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
                  <span className="text-2xl mr-3">💼</span>
                  <p className="text-gray-800">LinkedIn (haftada 1–2 bilgi paylaşımı)</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
                  <span className="text-2xl mr-3">🎥</span>
                  <p className="text-gray-800">Video (ayda 1, kalıcı içerik)</p>
                </div>
              </div>
            </div>

            {/* Ajans Kullanımı */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ajans Kullanımı</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-gray-800">❌ Tam ajans</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-800">✅ Freelance destek (video / tasarım)</p>
                </div>
              </div>
              <p className="mt-4 text-center text-lg font-bold text-gray-900">
                Kontrol her zaman içerik sahibindedir
              </p>
            </div>

            {/* Başarı Ölçütleri */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Başarı Ölçütleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-800">📊 Gelen talebin <strong>kalitesi</strong></p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-800">✅ Demo sonrası <strong>kapanma oranı</strong></p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-800">🤝 Referansla gelen <strong>müşteri sayısı</strong></p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-800">💡 Ürünün <strong>"anlaşılırlık"</strong> geri bildirimi</p>
                </div>
              </div>
            </div>

            {/* Büyüme Felsefesi */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Büyüme Felsefesi</h3>
              <p className="text-2xl font-bold leading-relaxed">
                Bu ürün bir yarış değil,<br />
                bir <span className="text-yellow-300">ustalık çalışmasıdır.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

