import React from 'react';
import { 
  FileText, 
  Server, 
  Shield, 
  Zap, 
  Code, 
  Database, 
  Lock, 
  Download,
  BookOpen,
  Cpu,
  HardDrive,
  Network,
  Gauge
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

const SystemGuidePage: React.FC = () => {
  
  // PDF İndirme Fonksiyonu
  const handleDownloadPDF = () => {
    const element = document.getElementById('system-guide-content');
    
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'FINOPS_Sistem_Rehberi_2026.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 rounded-3xl shadow-2xl mb-8">
          <div className="text-center px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              <Server className="w-4 h-4" />
              <span>🔐 Admin Sistem Dokümantasyonu</span>
            </div>
            <h1 className="mt-4 text-5xl lg:text-6xl font-extrabold tracking-tight">
              🚗 Sistem Rehberi
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              "Modern bir araba gibi: Güçlü motor, akıllı elektronik, güvenli yapı"
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">📚 3 Seviye Dokümantasyon</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">❓ 12 FAQ</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">🎴 15 Hazır Cevap</span>
              </div>
            </div>

            {/* PDF İndir Butonu */}
            <div className="mt-8">
              <button
                onClick={handleDownloadPDF}
                className="group relative px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center mx-auto"
              >
                <Download className="w-6 h-6 group-hover:animate-bounce" />
                <span>Sistem Rehberini PDF Olarak İndir</span>
              </button>
              <p className="text-white/80 text-sm mt-3">
                📄 Yatırımcı sunumları, Teknokent başvuruları için hazır
              </p>
            </div>
          </div>
        </div>

        {/* Ana İçerik */}
        <div id="system-guide-content" className="space-y-8">

          {/* Seviye 1: Yönetici Özeti */}
          <section className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">SEVİYE 1: Yönetici Özeti</h2>
                <p className="text-gray-600">1 Sayfa - Teknik Olmayan Hedef Kitle İçin</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-indigo-600 mt-8">🎯 Bu Platform Ne İşe Yarar?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-indigo-700">FINOPS AI Studio</strong>, Türkiye'deki KOBİ'lerin Excel dosyalarını, 
                POS verilerini ve e-fatura kayıtlarını <strong>otomatik olarak</strong> anlaşılır finansal panellere 
                (dashboard) dönüştüren bir web platformudur.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg my-6">
                <p className="text-gray-800 font-semibold mb-2">💡 İş Faydası:</p>
                <p className="text-gray-700">
                  Bir işletme sahibi, mali müşavirinden gelen karmaşık Excel tablosunu platforma yükler; 
                  <strong className="text-green-700"> 30 saniye içinde</strong> "Bu ay kârım nedir?", 
                  "Nakit akışım nasıl?" gibi kritik sorulara görsel yanıtlar alır.
                </p>
              </div>
            </div>

            {/* Modern Araba Benzetmesi Tablosu */}
            <div className="mt-8 overflow-x-auto">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">🚗 Modern Araba Benzetmesi</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Araba Parçası</th>
                    <th className="px-6 py-4 text-left font-bold">Platformdaki Karşılığı</th>
                    <th className="px-6 py-4 text-left font-bold">Ne İşe Yarar?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">🚘 Gövde/Dizayn</td>
                    <td className="px-6 py-4 text-gray-700">React UI + Tailwind CSS</td>
                    <td className="px-6 py-4 text-gray-600">Kullanıcının gördüğü tüm ekranlar, butonlar, formlar</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">🔧 Motor</td>
                    <td className="px-6 py-4 text-gray-700">Firebase + Vercel API</td>
                    <td className="px-6 py-4 text-gray-600">Kullanıcı girişi, veri saklama, AI hesaplamaları</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">⚙️ Şanzıman</td>
                    <td className="px-6 py-4 text-gray-700">TypeScript İş Mantığı</td>
                    <td className="px-6 py-4 text-gray-600">Veri işleme, dashboard üretme, öneri motoru</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">⛽ Yakıt</td>
                    <td className="px-6 py-4 text-gray-700">CSV/Excel Dosyaları, Firebase DB</td>
                    <td className="px-6 py-4 text-gray-600">Kullanıcının yüklediği veriler</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">📊 Gösterge Paneli</td>
                    <td className="px-6 py-4 text-gray-700">Dashboard'lar (Tremor Charts)</td>
                    <td className="px-6 py-4 text-gray-600">Grafikler, KPI kartları, trendler</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">🔌 Elektrik Tesisatı</td>
                    <td className="px-6 py-4 text-gray-700">React Context + State</td>
                    <td className="px-6 py-4 text-gray-600">Kullanıcı oturumu, veri akışı</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">🔐 Güvenlik</td>
                    <td className="px-6 py-4 text-gray-700">Firebase Auth + Rules</td>
                    <td className="px-6 py-4 text-gray-600">Giriş kontrolü, veri gizliliği</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">🛠️ Servis/Garanti</td>
                    <td className="px-6 py-4 text-gray-700">Vercel Deploy + GitHub CI</td>
                    <td className="px-6 py-4 text-gray-600">Otomatik yayınlama, hata takibi</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Temel Bilgiler */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-8 h-8 text-blue-600" />
                  <h4 className="text-lg font-bold text-gray-900">Teknoloji Yığını</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✅</span>
                    <span><strong>Frontend:</strong> React 18 + TypeScript + Vite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✅</span>
                    <span><strong>Backend:</strong> Firebase + Vercel Serverless</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✅</span>
                    <span><strong>AI/ML:</strong> OpenAI GPT-4o-mini (128K context)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✅</span>
                    <span><strong>Deployment:</strong> Vercel (30 saniye)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                  <h4 className="text-lg font-bold text-gray-900">Güvenlik</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🔒</span>
                    <span>KVKK uyumlu (veriler Türkiye'de)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🛡️</span>
                    <span>Firebase güvenlik kuralları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🔑</span>
                    <span>2FA opsiyonel (yakında)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">🔐</span>
                    <span>Her kullanıcı izole (birbirini göremez)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rakamlarla Platform */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">📊 Rakamlarla Platform</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-200">
                  <div className="text-3xl font-bold text-indigo-600">25K</div>
                  <div className="text-xs text-gray-600 mt-1">Kod Satırı</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600">38</div>
                  <div className="text-xs text-gray-600 mt-1">Dashboard</div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg text-center border border-pink-200">
                  <div className="text-3xl font-bold text-pink-600">2</div>
                  <div className="text-xs text-gray-600 mt-1">Dil (TR/EN)</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">&lt;2s</div>
                  <div className="text-xs text-gray-600 mt-1">Yükleme</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                  <div className="text-3xl font-bold text-green-600">4</div>
                  <div className="text-xs text-gray-600 mt-1">Format</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">GPT-4o-mini</div>
                  <div className="text-xs text-gray-600 mt-1">AI Model</div>
                </div>
              </div>
            </div>
          </section>

          {/* Motor Detayları Bölümü */}
          <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-10 rounded-2xl shadow-xl border-2 border-orange-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">🔥 MOTORUN TAM TEKNİK ÖZELLİKLERİ</h2>
                <p className="text-gray-600 mt-1">Benzin (Veri) → Motor (AI) → Dashboard Akışı</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-orange-200 mb-6">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-orange-700">İş Faydası:</strong> Bu bölüm, "Yüklenen veri (benzin) nasıl işleniyor?" sorusuna net cevap verir. 
                Yatırımcılar ve teknik ekipler için kritik detaylardır.
              </p>
            </div>

            {/* AI Motor Tablosu */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🏎️</span> AI MOTORUN DETAYLARI
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                      <th className="px-4 py-3 text-left font-bold">Özellik</th>
                      <th className="px-4 py-3 text-left font-bold">Değer</th>
                      <th className="px-4 py-3 text-left font-bold">Açıklama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-orange-50 hover:bg-orange-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">Motor Adı</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">OpenAI GPT-4o-mini</td>
                      <td className="px-4 py-3 text-gray-700">Son nesil, optimize edilmiş model</td>
                    </tr>
                    <tr className="bg-white hover:bg-orange-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">Motor Gücü</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">128K token context</td>
                      <td className="px-4 py-3 text-gray-700">~96,000 kelime aynı anda işleyebilir</td>
                    </tr>
                    <tr className="bg-orange-50 hover:bg-orange-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">Tork (Yaratıcılık)</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">Temperature: 0.7</td>
                      <td className="px-4 py-3 text-gray-700">Dengeli (0=robotik, 1=çok yaratıcı)</td>
                    </tr>
                    <tr className="bg-white hover:bg-orange-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">Maksimum Hız</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">Max 300 token/yanıt</td>
                      <td className="px-4 py-3 text-gray-700">~225 kelimelik yanıtlar (hızlı ve öz)</td>
                    </tr>
                    <tr className="bg-orange-50 hover:bg-orange-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">Yakıt Verimliliği</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">$0.15 / 1M token</td>
                      <td className="px-4 py-3 text-gray-700">Maliyet etkin (GPT-4'ten 10x ucuz)</td>
                    </tr>
                    <tr className="bg-white hover:bg-orange-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">Motor ECU</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">api/chat.ts</td>
                      <td className="px-4 py-3 text-gray-700">Vercel Serverless Function</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Veri Pipeline Şeması */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">⚙️</span> BENZİN İŞLEME HATTI (VERİ PIPELINE)
              </h3>
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-2xl border-2 border-slate-300 overflow-x-auto">
                {/* N8N-Style Horizontal Workflow */}
                <div className="space-y-4">
                  {/* İlk Satır: Input → 1 → 2 */}
                  <div className="flex items-center gap-3 justify-center flex-wrap">
                    {/* Input */}
                    <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] text-center border-2 border-slate-600">
                      <div className="text-2xl mb-1">📂</div>
                      <div className="font-bold text-xs">EXCEL/CSV</div>
                      <div className="text-[10px] opacity-80">(HAM VERİ)</div>
                    </div>

                    <div className="text-3xl text-orange-500 font-bold">→</div>

                    {/* 1. Karbüratör */}
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] border-2 border-orange-600 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div className="text-xl">🔧</div>
                      </div>
                      <div className="font-bold text-xs text-center">KARBÜRATÖR</div>
                      <div className="text-[10px] opacity-90 text-center">Excel Parser</div>
                    </div>

                    <div className="text-3xl text-blue-500 font-bold">→</div>

                    {/* 2. Filtre */}
                    <div className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] border-2 border-blue-600 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div className="text-xl">🧹</div>
                      </div>
                      <div className="font-bold text-xs text-center">FİLTRE</div>
                      <div className="text-[10px] opacity-90 text-center">Normalizer</div>
                    </div>
                  </div>

                  {/* Ortadaki Aşağı Ok */}
                  <div className="flex justify-center">
                    <div className="text-4xl text-purple-500 font-bold animate-bounce">↓</div>
                  </div>

                  {/* İkinci Satır: 3 → 4 → 5 → 6 → Output */}
                  <div className="flex items-center gap-3 justify-center flex-wrap">
                    {/* 3. Enjektör */}
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] border-2 border-purple-600 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div className="text-xl">💉</div>
                      </div>
                      <div className="font-bold text-xs text-center">ENJEKTÖR</div>
                      <div className="text-[10px] opacity-90 text-center">Mapper</div>
                    </div>

                    <div className="text-3xl text-green-500 font-bold">→</div>

                    {/* 4. Validator */}
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] border-2 border-green-600 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                        <div className="text-xl">✅</div>
                      </div>
                      <div className="font-bold text-xs text-center">VALIDATOR</div>
                      <div className="text-[10px] opacity-90 text-center">Kontrol</div>
                    </div>

                    <div className="text-3xl text-indigo-500 font-bold">→</div>

                    {/* 5. Depo */}
                    <div className="bg-gradient-to-br from-indigo-400 to-blue-500 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] border-2 border-indigo-600 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">5</div>
                        <div className="text-xl">💾</div>
                      </div>
                      <div className="font-bold text-xs text-center">DEPO</div>
                      <div className="text-[10px] opacity-90 text-center">Storage</div>
                    </div>

                    <div className="text-3xl text-pink-500 font-bold">→</div>

                    {/* 6. Motor */}
                    <div className="bg-gradient-to-br from-pink-400 to-rose-500 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] border-2 border-pink-600 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">6</div>
                        <div className="text-xl">🚀</div>
                      </div>
                      <div className="font-bold text-xs text-center">MOTOR</div>
                      <div className="text-[10px] opacity-90 text-center">Dashboard</div>
                    </div>

                    <div className="text-3xl text-green-600 font-bold">→</div>

                    {/* Output */}
                    <div className="bg-gradient-to-br from-emerald-500 to-green-700 text-white px-5 py-3 rounded-lg shadow-lg min-w-[160px] text-center border-2 border-green-600 animate-pulse">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="font-bold text-xs">DASHBOARD</div>
                      <div className="text-[10px] opacity-90">(TAMAMLANDI)</div>
                    </div>
                  </div>

                  {/* Detay Toggle */}
                  <div className="mt-6 text-center">
                    <details className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-slate-300">
                      <summary className="cursor-pointer font-semibold text-sm text-slate-700 hover:text-slate-900">
                        🔍 Teknik Detayları Göster
                      </summary>
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-left text-[11px]">
                        <div className="bg-orange-50 p-2 rounded border-l-2 border-orange-500">
                          <div className="font-bold text-orange-800">1. Karbüratör</div>
                          <code className="text-[10px] text-gray-700">excelParser.ts</code>
                        </div>
                        <div className="bg-blue-50 p-2 rounded border-l-2 border-blue-500">
                          <div className="font-bold text-blue-800">2. Filtre</div>
                          <code className="text-[10px] text-gray-700">normalizer.ts</code>
                        </div>
                        <div className="bg-purple-50 p-2 rounded border-l-2 border-purple-500">
                          <div className="font-bold text-purple-800">3. Enjektör</div>
                          <code className="text-[10px] text-gray-700">columnMapper.ts</code>
                        </div>
                        <div className="bg-green-50 p-2 rounded border-l-2 border-green-500">
                          <div className="font-bold text-green-800">4. Validator</div>
                          <code className="text-[10px] text-gray-700">validator.ts</code>
                        </div>
                        <div className="bg-indigo-50 p-2 rounded border-l-2 border-indigo-500">
                          <div className="font-bold text-indigo-800">5. Depo</div>
                          <code className="text-[10px] text-gray-700">storageService.ts</code>
                        </div>
                        <div className="bg-pink-50 p-2 rounded border-l-2 border-pink-500">
                          <div className="font-bold text-pink-800">6. Motor</div>
                          <code className="text-[10px] text-gray-700">dashboards/</code>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            {/* Gerçek Örnek */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🧪</span> GERÇEK ÖRNEK: Restoran Satış Verisi
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">📥 Girdi: restoran-satis-2025.xlsx</p>
                  <div className="bg-white p-3 rounded border border-blue-200 font-mono text-xs">
                    Tarih&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Satış Tutarı | Müşteri Sayısı<br/>
                    2025-01-01&nbsp;&nbsp;&nbsp;| ₺12.450&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 45<br/>
                    2025-01-02&nbsp;&nbsp;&nbsp;| ₺15.320&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 52
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">⚙️ İşleme Sonrası (Normalize edilmiş):</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                    {`[
  { "date": "2025-01-01", "revenue": 12450, "customers": 45 },
  { "date": "2025-01-02", "revenue": 15320, "customers": 52 }
]`}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">📊 Çıktı: Dashboard KPI'ları:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-4 rounded-lg">
                      <div className="text-2xl font-bold">₺27.770</div>
                      <div className="text-xs opacity-90">Toplam Satış</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-4 rounded-lg">
                      <div className="text-2xl font-bold">₺286</div>
                      <div className="text-xs opacity-90">Ortalama Sepet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seviye 2: Mimari Bileşenler */}
          <section className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Server className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">SEVİYE 2: Mimari Bileşenler</h2>
                <p className="text-gray-600">Arka Tarafta Çalışan Yazılımlar</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Frontend */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Frontend (UI)</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong className="text-blue-700">React 18 + TypeScript + Vite</strong>
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Kullanıcı arayüzü (tüm ekranlar)</li>
                  <li>• Dinamik sayfa geçişleri</li>
                  <li>• 3 saniyede yükleme (Vite)</li>
                  <li>• Responsive tasarım (mobil uyumlu)</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                  <code className="text-xs text-blue-700">src/App.tsx, src/pages/</code>
                </div>
              </div>

              {/* Backend */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Backend (Sunucu)</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong className="text-green-700">Firebase + Vercel Serverless</strong>
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Kullanıcı kimlik doğrulama (Auth)</li>
                  <li>• Veritabanı (Firestore)</li>
                  <li>• AI Chat API (OpenAI GPT-4)</li>
                  <li>• Otomatik ölçeklendirme</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                  <code className="text-xs text-green-700">src/firebase.ts, api/chat.ts</code>
                </div>
              </div>

              {/* İş Mantığı */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Gauge className="w-8 h-8 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">İş Mantığı</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong className="text-purple-700">TypeScript Services</strong>
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Dashboard öneri motoru</li>
                  <li>• Anket sistemi (Mini + Deep Survey)</li>
                  <li>• Fino AI konuşma motoru</li>
                  <li>• Kişiselleştirme algoritmaları</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                  <code className="text-xs text-purple-700">src/services/</code>
                </div>
              </div>

              {/* Veri İşleme */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <HardDrive className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Veri İşleme</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong className="text-orange-700">Papa Parse + XLSX.js</strong>
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Excel/CSV dosya okuma</li>
                  <li>• Veri normalizasyonu</li>
                  <li>• Sütun tanıma (AI destekli)</li>
                  <li>• Eksik veri temizleme</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
                  <code className="text-xs text-orange-700">src/modules/data-ingestion/</code>
                </div>
              </div>
            </div>
          </section>

          {/* Güvenlik Katmanları */}
          <section className="bg-gradient-to-br from-red-50 to-pink-50 p-10 rounded-2xl shadow-xl border-2 border-red-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Güvenlik ve Veri Gizliliği</h2>
                <p className="text-gray-600">6 Katmanlı Güvenlik Mimarisi</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border-2 border-red-200 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">🔐</div>
                <h4 className="font-bold text-gray-900 mb-2">1. Authentication</h4>
                <p className="text-sm text-gray-600">Firebase Auth - Email + OAuth</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-bold text-gray-900 mb-2">2. Authorization</h4>
                <p className="text-sm text-gray-600">Firestore Rules - Kullanıcı izolasyonu</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-yellow-200 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-bold text-gray-900 mb-2">3. Encryption</h4>
                <p className="text-sm text-gray-600">HTTPS + AES-256 (at-rest)</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-green-200 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-bold text-gray-900 mb-2">4. KVKK Uyumlu</h4>
                <p className="text-sm text-gray-600">Veri minimizasyonu + kullanıcı hakları</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-bold text-gray-900 mb-2">5. Rate Limiting</h4>
                <p className="text-sm text-gray-600">DDoS koruması - 100 req/min</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">🐛</div>
                <h4 className="font-bold text-gray-900 mb-2">6. Error Tracking</h4>
                <p className="text-sm text-gray-600">ErrorBoundary - Hassas veri loglanmaz</p>
              </div>
            </div>
          </section>

          {/* FAQ Özeti */}
          <section className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Sık Sorulan Sorular</h2>
                <p className="text-gray-600">12 Kritik Soru ve Yanıt</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Yatırımcılar */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span>💼</span> Yatırımcılar İçin
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">Q:</span>
                    <span>Bu proje kaç satır kod? <strong className="text-blue-700">→ ~25,000 satır</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">Q:</span>
                    <span>Teknik borç var mı? <strong className="text-blue-700">→ Minimal</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">Q:</span>
                    <span>1M kullanıcıyı kaldırır mı? <strong className="text-blue-700">→ Evet (otomatik ölçeklenir)</strong></span>
                  </li>
                </ul>
              </div>

              {/* Teknokent */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <span>🏫</span> Teknokent Jürisi İçin
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">Q:</span>
                    <span>Türkiye'de hosting mi? <strong className="text-purple-700">→ Global, ama KVKK uyumlu</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">Q:</span>
                    <span>Yerli teknoloji? <strong className="text-purple-700">→ Ürün yerli, altyapı global</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">Q:</span>
                    <span>Patentlenebilir mi? <strong className="text-purple-700">→ Evet (AI öneri motoru)</strong></span>
                  </li>
                </ul>
              </div>

              {/* Müşteriler */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span>👨‍💼</span> Müşteriler İçin
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">Q:</span>
                    <span>Verilerim güvende mi? <strong className="text-green-700">→ Evet (şifreli + izole)</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">Q:</span>
                    <span>Offline çalışır mı? <strong className="text-green-700">→ Hayır, ama PDF export var</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">Q:</span>
                    <span>Hangi bankalar? <strong className="text-green-700">→ Tüm bankalar (CSV/Excel)</strong></span>
                  </li>
                </ul>
              </div>

              {/* Yazılımcılar */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <span>👨‍💻</span> Yazılımcılar İçin
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">Q:</span>
                    <span>Open-source mi? <strong className="text-orange-700">→ Şu an kapalı (2026 Q3 planlı)</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">Q:</span>
                    <span>API dökümantasyonu? <strong className="text-orange-700">→ Hazırlanıyor (Swagger)</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">Q:</span>
                    <span>Test coverage? <strong className="text-orange-700">→ ~%30 (artırılıyor)</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center py-8 border-t-2 border-gray-200">
            <p className="text-gray-600 mb-2">
              📚 <strong>Detaylı Döküman:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">docs/SYSTEM_GUIDE_TR.md</code>
            </p>
            <p className="text-gray-500 text-sm">
              Son Güncelleme: 8 Ocak 2026 | FINOPS AI Studio Teknik Ekip
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemGuidePage;

