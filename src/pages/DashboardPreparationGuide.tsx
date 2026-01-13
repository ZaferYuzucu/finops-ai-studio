import React from 'react';
import { ArrowLeft, LayoutDashboard, Grid3x3, BarChart3, TrendingUp, Database, Layers, Target, AlertCircle, CheckCircle, Sparkles, LineChart, PieChart, Activity, Table, Package, DollarSign, Calculator, RefreshCcw, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPreparationGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4 text-sm font-medium"
          >
            <ArrowLeft size={18} />
            <span>Geri Dön</span>
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-600">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              <span className="text-sm font-semibold text-indigo-800">
                Bilgi Merkezi • Dashboard Rehberi
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              📊 Dashboard Hazırlama Rehberi
            </h1>
            <p className="text-lg text-gray-600">
              Veri seçiminden nihai dashboard'a kadar adım adım kapsamlı rehber
            </p>
          </div>
        </div>

        {/* İçindekiler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Grid3x3 size={20} className="text-indigo-600" />
            İçindekiler
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a href="#adim1" className="text-indigo-600 hover:underline">1️⃣ Dashboard Tablo Mimarisi Kur</a>
            <a href="#adim2" className="text-indigo-600 hover:underline">2️⃣ KPI Kutularını Belirle</a>
            <a href="#adim3" className="text-indigo-600 hover:underline">3️⃣ Grafiklerini Seç</a>
            <a href="#adim4" className="text-indigo-600 hover:underline">4️⃣ Sistem Senin İçin Ne Yapar?</a>
          </div>
        </div>

        {/* ADIM 1: Dashboard Tablo Mimarisi */}
        <section id="adim1" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <LayoutDashboard className="text-indigo-600" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">1️⃣ Dashboard Mimarisini Kur</h2>
              <p className="text-sm text-gray-600">Dashboard yapısını ve layout düzenini planla</p>
            </div>
          </div>

          {/* 1.1: Dashboard Yapısı */}
          <div className="mt-6 space-y-4">
            <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
              <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <Layers size={20} />
                1.1 Dashboard Katmanlarını Oluştur
              </h3>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded text-blue-700 font-bold text-xs">1</div>
                    <div>
                      <p className="font-bold text-gray-900">Başlığı ve Özet Bilgiyi Ekle</p>
                      <p className="text-sm text-gray-700 mt-1">Dashboard adı, tarih aralığı ve güncelleme zamanını göster</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded text-green-700 font-bold text-xs">2</div>
                    <div>
                      <p className="font-bold text-gray-900">KPI Kartlarını Üste Diz</p>
                      <p className="text-sm text-gray-700 mt-1">4-6 adet ana metrik kartını horizontal sırala</p>
                      <div className="mt-2 bg-gray-50 rounded p-2 text-xs text-gray-700">
                        <strong>Örnek:</strong> Toplam Gelir | Toplam Gider | Net Kâr | Kâr Marjı | Stok | WIP
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded text-purple-700 font-bold text-xs">3</div>
                    <div>
                      <p className="font-bold text-gray-900">Grafik Panellerini Yerleştir</p>
                      <p className="text-sm text-gray-700 mt-1">3+2 veya 2+2 grid düzeni seç (responsive)</p>
                      <div className="mt-2 bg-gray-50 rounded p-3">
                        <pre className="text-xs text-gray-700 whitespace-pre font-mono">
{`┌──────────┬──────────┬──────────┐
│ Grafik 1 │ Grafik 2 │ Grafik 3 │  ← İlk satır
└──────────┴──────────┴──────────┘
┌─────────────────┬─────────────────┐
│    Grafik 4     │    Grafik 5     │  ← İkinci satır
└─────────────────┴─────────────────┘`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded text-orange-700 font-bold text-xs">4</div>
                    <div>
                      <p className="font-bold text-gray-900">Detay Tablosunu Alta Ekle (Opsiyonel)</p>
                      <p className="text-sm text-gray-700 mt-1">Grafiklerin altına destekleyici tablo koy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.2: Layout Kuralları - Otomatik Hazır Gelen */}
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle size={20} />
                1.2 Bunlar Senin İçin Hazır! (Otomatik)
              </h3>
              <p className="text-xs text-green-800 mb-3">Dashboard oluştururken bu ayarlar otomatik yapılır, sen sadece içeriği doldur:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900 text-sm mb-1">📏 Boyut (Otomatik)</p>
                  <p className="text-xs text-gray-700">A4 Landscape: 1123px × 794px (print-ready) ✅</p>
                </div>

                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900 text-sm mb-1">🎨 Renk Paleti (Hazır Template)</p>
                  <p className="text-xs text-gray-700">Gradient arka plan + beyaz kartlar ✅</p>
                </div>

                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900 text-sm mb-1">📐 Boşluklar (Otomatik)</p>
                  <p className="text-xs text-gray-700">Kartlar arası 12-16px gap ayarlı ✅</p>
                </div>

                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900 text-sm mb-1">🔤 Font Boyutları (Standart)</p>
                  <p className="text-xs text-gray-700">Başlık, KPI, metin boyutları optimize ✅</p>
                </div>
              </div>
            </div>

            {/* 1.3: Tek Tık - Tüm Cihazlarda Çalışır */}
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle size={18} />
                1.3 Tek Kere Oluştur, Her Yerde Çalışır! ✨
              </h3>
              <p className="text-sm text-blue-900 font-semibold">
                Dashboard'unu bir kere oluştur, tüm cihazlarda otomatik uyumlu olsun:
              </p>
              <div className="mt-3 bg-white rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-gray-700 leading-relaxed">
                  ✅ <strong>Desktop, Tablet, Mobil, PDF</strong> - Tüm platformlarda otomatik optimize!<br/>
                  💡 Hiçbir ek ayar yapma, sistem her cihaz için en iyi görünümü sağlar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ADIM 2: KPI Kutularını Belirleme */}
        <section id="adim2" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="text-green-600" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">2️⃣ KPI Kutularını Belirle</h2>
              <p className="text-sm text-gray-600">En kritik metrikleri seç ve tasarla</p>
            </div>
          </div>

          {/* 2.1: KPI Seçim Süreci (Pratik Adımlar) */}
          <div className="mt-6 space-y-4">
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-bold text-green-900 mb-3">2.1 KPI'larını Nasıl Seçersin? (Adım Adım)</h3>
              
              <div className="space-y-3">
                {/* Adım 1 */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">CSV'ni Yükle ve Önizle</p>
                      <p className="text-xs text-gray-700 mb-2">Sistemde CSV'ni yükleyince, sütunları (kolonları) otomatik göreceksin.</p>
                      <div className="bg-blue-50 rounded p-2 text-xs text-gray-700">
                        <strong>Örnek sütunlar:</strong> Tarih, Üretilen_Adet, Toplam_Maliyet_USD, Hatalı_Adet
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 2 */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">KPI Sayısını Belirle</p>
                      <p className="text-xs text-gray-700 mb-2">Kaç tane KPI kartı istiyorsun? 0, 3, 4 veya 6 seç.</p>
                      <div className="bg-green-50 rounded p-2 text-xs text-gray-700">
                        <strong>💡 Önerilen:</strong> 4 veya 6 KPI (çok az değil, çok fazla değil)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 3 */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Her KPI Kartını Doldur (4 Bilgi)</p>
                      <p className="text-xs text-gray-700 mb-2">Her KPI kutusu için sırayla şunları yapacaksın:</p>
                      <div className="space-y-2">
                        <div className="bg-purple-50 rounded p-2 text-xs text-gray-700">
                          <strong>a) Başlık ver:</strong> "Toplam Üretim Maliyeti" gibi
                        </div>
                        <div className="bg-purple-50 rounded p-2 text-xs text-gray-700">
                          <strong>b) Sütun seç:</strong> Dropdown menüden CSV sütununu seç (örn: "Toplam_Maliyet_USD")
                        </div>
                        <div className="bg-purple-50 rounded p-2 text-xs text-gray-700">
                          <strong>c) Hesaplama tipi seç:</strong> Toplam (SUM) / Ortalama (AVG) / Maksimum / Minimum
                        </div>
                        <div className="bg-purple-50 rounded p-2 text-xs text-gray-700">
                          <strong>d) Trend göster mi?:</strong> Evet/Hayır seç (değişim oranı için)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 4 */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Önizle ve Devam Et</p>
                      <p className="text-xs text-gray-700">Tüm KPI'ları doldurduktan sonra "Devam Et" butonuna tıkla. ✅</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Önemli Not */}
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 rounded p-3">
                <p className="text-xs text-yellow-900 font-semibold mb-1">⚠️ Önemli:</p>
                <p className="text-xs text-yellow-800">
                  • Sürükle-bırak YOK - Dropdown menüden seç<br/>
                  • En önemli 4-6 metriğe odaklan (gelir, maliyet, kâr, stok vb.)<br/>
                  • Trend göster seçeneğini mutlaka aç (değişim % görmek için)
                </p>
              </div>
            </div>

            {/* 2.2: KPI Tasarım Örneği */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">2.2 KPI Kartını Tasarla</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <DollarSign size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 font-medium">Toplam Üretim Maliyeti</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">$45,280</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                          <TrendingUp size={14} className="text-green-700" />
                          <span className="text-xs font-bold text-green-700">+12.5%</span>
                        </div>
                        <span className="text-xs text-gray-600">vs geçen ay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 bg-gray-50 rounded-lg p-3 text-xs text-gray-700">
                <p className="font-bold mb-2">📌 KPI Kartı Bileşenleri:</p>
                <ul className="space-y-1 list-disc pl-5">
                  <li><strong>İkon:</strong> Görsel tanımlayıcı ekle (Lucide Icons)</li>
                  <li><strong>Başlık:</strong> KPI'ı kısaca açıkla</li>
                  <li><strong>Değer:</strong> Büyük font, bold kullan (ana metrik)</li>
                  <li><strong>Δ Badge:</strong> Değişim yönü ve oranını göster (renk kodla)</li>
                  <li><strong>Bağlam:</strong> "vs geçen ay" gibi karşılaştırma ekle</li>
                </ul>
              </div>
            </div>

            {/* 2.3: Sektöre Göre KPI Önerileri (Kapsamlı) */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">2.3 Sektörüne Göre KPI Seç</h3>
              <p className="text-xs text-gray-600 mb-3">Sektörüne uygun KPI'ları seç, kendi ihtiyacına göre düzenle:</p>
              
              {/* 1. Üretim */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>🏭 Üretim / Manufacturing</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-blue-600" /><span><strong>Üretilen Adet:</strong> Toplam üretim hacmi</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-green-600" /><span><strong>Üretim Maliyeti:</strong> Toplam maliyet</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><AlertTriangle size={14} className="text-red-600" /><span><strong>Fire Oranı %:</strong> Hatalı ürün yüzdesi</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-purple-600" /><span><strong>Birim Maliyet:</strong> Ortalama maliyet/adet</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Layers size={14} className="text-orange-600" /><span><strong>Mamul Stok:</strong> Bitmiş ürün sayısı</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><RefreshCcw size={14} className="text-cyan-600" /><span><strong>WIP Stok:</strong> Yarı mamul (işlem gören)</span></div>
                </div>
              </details>

              {/* 2. Finans */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>💼 Finans & Muhasebe</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={14} className="text-green-600" /><span><strong>Toplam Gelir:</strong> Revenue total</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={14} className="text-red-600" /><span><strong>Toplam Gider:</strong> Total expenses</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-blue-600" /><span><strong>Net Kâr:</strong> Profit after tax</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-purple-600" /><span><strong>Kâr Marjı %:</strong> Profit margin</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-orange-600" /><span><strong>Nakit Pozisyonu:</strong> Cash position</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-cyan-600" /><span><strong>EBITDA:</strong> Operational profit</span></div>
                </div>
              </details>

              {/* 3. Satış & Pazarlama */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>📈 Satış & Pazarlama</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={14} className="text-green-600" /><span><strong>Toplam Satış:</strong> Ciro (revenue)</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-blue-600" /><span><strong>Satış Hedefi %:</strong> Target achievement</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-purple-600" /><span><strong>Dönüşüm Oranı:</strong> Conversion rate</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-orange-600" /><span><strong>CAC:</strong> Customer acquisition cost</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-cyan-600" /><span><strong>LTV:</strong> Lifetime value</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-red-600" /><span><strong>ROAS:</strong> Return on ad spend</span></div>
                </div>
              </details>

              {/* 4. E-ticaret & Retail */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>🛒 E-ticaret & Retail</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={14} className="text-green-600" /><span><strong>Toplam Satış:</strong> Ciro</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-blue-600" /><span><strong>Sipariş Adedi:</strong> Order count</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-purple-600" /><span><strong>Ortalama Sepet:</strong> AOV</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-orange-600" /><span><strong>Dönüşüm Oranı %:</strong> Conversion</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><RefreshCcw size={14} className="text-cyan-600" /><span><strong>İade Oranı %:</strong> Return rate</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Layers size={14} className="text-red-600" /><span><strong>Stok Devir Hızı:</strong> Inventory turnover</span></div>
                </div>
              </details>

              {/* 5. Restoran & Kafe */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>☕ Restoran & Kafe</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-green-600" /><span><strong>Günlük Ciro:</strong> Daily revenue</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-blue-600" /><span><strong>Masabaşı Adet:</strong> Table count</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-purple-600" /><span><strong>Ortalama Hesap:</strong> Average bill</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-orange-600" /><span><strong>Masa Devir Oranı:</strong> Table turnover</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={14} className="text-cyan-600" /><span><strong>Food Cost %:</strong> Maliyet oranı</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-red-600" /><span><strong>Labor Cost %:</strong> İşçilik oranı</span></div>
                </div>
              </details>

              {/* 6. Otel & Konaklama */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>🏨 Otel & Konaklama</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-green-600" /><span><strong>Doluluk Oranı %:</strong> Occupancy rate</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-blue-600" /><span><strong>ADR:</strong> Average daily rate</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={14} className="text-purple-600" /><span><strong>RevPAR:</strong> Revenue per available room</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-orange-600" /><span><strong>Toplam Gelir:</strong> Total revenue</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-cyan-600" /><span><strong>Oda Sayısı:</strong> Total rooms</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-red-600" /><span><strong>Müşteri Memnuniyeti:</strong> Guest satisfaction</span></div>
                </div>
              </details>

              {/* 7. İnsan Kaynakları */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>👥 İnsan Kaynakları</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-blue-600" /><span><strong>Toplam Personel:</strong> Headcount</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><RefreshCcw size={14} className="text-red-600" /><span><strong>Devir Oranı %:</strong> Turnover rate</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-green-600" /><span><strong>Bordro Maliyeti:</strong> Payroll cost</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-purple-600" /><span><strong>İşe Alım Süresi:</strong> Time to hire</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-orange-600" /><span><strong>Performans Skoru:</strong> Avg performance</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-cyan-600" /><span><strong>Eğitim Maliyeti:</strong> Training cost</span></div>
                </div>
              </details>

              {/* 8. Tarım & Hayvancılık */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>🌾 Tarım & Hayvancılık</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-green-600" /><span><strong>Hasat Miktarı:</strong> Yield (ton)</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-blue-600" /><span><strong>Satış Geliri:</strong> Sales revenue</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-purple-600" /><span><strong>Üretim Maliyeti:</strong> Production cost</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-orange-600" /><span><strong>Verimlilik:</strong> Kg/dekar</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Layers size={14} className="text-cyan-600" /><span><strong>Stok (Depo):</strong> Inventory</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-red-600" /><span><strong>Fire/Kayıp %:</strong> Loss rate</span></div>
                </div>
              </details>

              {/* 9. Otomotiv */}
              <details className="group rounded-lg border border-gray-200 mb-2">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>🚗 Otomotiv (Satış & Servis)</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-green-600" /><span><strong>Satılan Araç:</strong> Units sold</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-blue-600" /><span><strong>Satış Cirosu:</strong> Sales revenue</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-purple-600" /><span><strong>Servis Geliri:</strong> Service revenue</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-orange-600" /><span><strong>Stok Yaşı:</strong> Inventory age</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-cyan-600" /><span><strong>Müşteri Memnuniyeti:</strong> CSI score</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><RefreshCcw size={14} className="text-red-600" /><span><strong>Test Drive Dönüşümü:</strong> Conversion</span></div>
                </div>
              </details>

              {/* 10. Şube Operasyonları */}
              <details className="group rounded-lg border border-gray-200">
                <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm text-gray-900 flex justify-between items-center">
                  <span>🏢 Şube Operasyonları (Çok Şubeli)</span>
                  <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <div className="p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><DollarSign size={14} className="text-green-600" /><span><strong>Şube Cirosu:</strong> Branch revenue</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Target size={14} className="text-blue-600" /><span><strong>Hedef Gerçekleşme %:</strong> Target achievement</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Activity size={14} className="text-purple-600" /><span><strong>Müşteri Trafiği:</strong> Foot traffic</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calculator size={14} className="text-orange-600" /><span><strong>Operasyon Maliyeti:</strong> Opex</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Package size={14} className="text-cyan-600" /><span><strong>Personel Sayısı:</strong> Staff count</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={14} className="text-red-600" /><span><strong>Kârlılık:</strong> Profit margin</span></div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ADIM 3: Grafik Seçimi */}
        <section id="adim3" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 className="text-purple-600" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">3️⃣ Grafiklerini Seç</h2>
              <p className="text-sm text-gray-600">Doğru grafik = doğru karar (veri tipine göre seç)</p>
            </div>
          </div>

          {/* 3.1: Grafik Seçim Süreci (Pratik Adımlar) */}
          <div className="mt-6 space-y-4">
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <h3 className="font-bold text-purple-900 mb-3">3.1 Grafiklerini Nasıl Seçersin? (Adım Adım)</h3>
              
              <div className="space-y-3 mb-4">
                {/* Adım 1 */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Grafik Sayısını Belirle</p>
                      <p className="text-xs text-gray-700 mb-2">Kaç grafik istiyorsun? 2, 3, 4 veya 5 seç.</p>
                      <div className="bg-blue-50 rounded p-2 text-xs text-gray-700">
                        <strong>💡 Önerilen:</strong> 5 grafik (3+2 düzeni) - üstte 3, altta 2
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 2 */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Her Grafik İçin Tip Seç</p>
                      <p className="text-xs text-gray-700 mb-2">Line, Bar, Donut, Area, Table - hangisini kullanacağını seç</p>
                      <div className="bg-green-50 rounded p-2 text-xs text-gray-700">
                        <strong>❓ Karar veremiyorsan:</strong> Aşağıdaki "Grafik Tipi Karar Ağacı"na bak →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 3 - SÜRÜKLE BIRAK */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Sütunları Sürükle-Bırak (Drag & Drop) 🖱️</p>
                      <p className="text-xs text-gray-700 mb-2"><strong>Sol panel:</strong> CSV sütunlarını göreceksin (📅 Tarih, 🔢 Sayısal, 🏷️ Kategori)</p>
                      <div className="space-y-2">
                        <div className="bg-purple-50 rounded p-2 text-xs text-gray-700">
                          <strong>a) X Ekseni belirle:</strong> Sol panelden bir sütun seç (örn: Tarih) → Grafik kutusundaki "X Ekseni" alanına sürükle-bırak
                        </div>
                        <div className="bg-purple-50 rounded p-2 text-xs text-gray-700">
                          <strong>b) Y Ekseni belirle:</strong> Sayısal bir sütun seç (örn: Toplam_Maliyet) → "Y Ekseni" alanına sürükle-bırak
                        </div>
                        <div className="bg-purple-50 rounded p-2 text-xs text-gray-700">
                          <strong>c) Grafik başlığı ver:</strong> "Üretim Maliyeti Trendi" gibi anlamlı isim yaz
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 4 */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Tüm Grafikleri Doldur ve Önizle</p>
                      <p className="text-xs text-gray-700">Her 5 grafiği de doldur → "Önizle" butonuna tıkla → Beğendiysen "Devam Et" ✅</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 rounded p-3">
                <p className="text-xs text-yellow-900 font-semibold mb-1">⚠️ Önemli:</p>
                <p className="text-xs text-yellow-800">
                  • <strong>Sürükle-bırak</strong> çalışmazsa: Dropdown menüden seç<br/>
                  • X ekseni genelde: Tarih veya Kategori<br/>
                  • Y ekseni genelde: Sayısal değerler (maliyet, adet, gelir vb.)
                </p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">3.2 Grafik Tipi Karar Ağacı (Yardımcı)</h3>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="font-bold text-gray-900 mb-2">❓ Ne anlatmak istiyorsun?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="font-semibold text-blue-900">📈 Zaman içinde değişim?</p>
                      <p className="text-xs text-blue-700 mt-1">→ <strong>Line Chart</strong> seç (trend)</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="font-semibold text-green-900">⚖️ Kategoriler arası kıyas?</p>
                      <p className="text-xs text-green-700 mt-1">→ <strong>Bar Chart</strong> kullan (comparison)</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded border border-orange-200">
                      <p className="font-semibold text-orange-900">🥧 Parça-bütün ilişkisi?</p>
                      <p className="text-xs text-orange-700 mt-1">→ <strong>Pie/Donut Chart</strong> tercih et (proportion)</p>
                    </div>
                    <div className="bg-cyan-50 p-3 rounded border border-cyan-200">
                      <p className="font-semibold text-cyan-900">📊 Trend + hacim birlikte?</p>
                      <p className="text-xs text-cyan-700 mt-1">→ <strong>Area Chart</strong> ekle (volume)</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded border border-purple-200">
                      <p className="font-semibold text-purple-900">🔀 İki metrik karşılaştır?</p>
                      <p className="text-xs text-purple-700 mt-1">→ <strong>Combo Chart</strong> kullan (dual-axis)</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="font-semibold text-gray-900">📄 Detaylı tablo gerek?</p>
                      <p className="text-xs text-gray-700 mt-1">→ <strong>Table</strong> ekle (data grid)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3.3: Grafik Türleri Hızlı Referans */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">3.3 Grafik Türü Hızlı Kılavuzu (Detaylar)</h3>
              
              <div className="space-y-2">
                {/* Line Chart */}
                <details className="group rounded-lg border border-gray-200">
                  <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 flex items-center gap-3">
                    <LineChart size={20} className="text-blue-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">Line Chart (Çizgi Grafik)</p>
                      <p className="text-xs text-gray-600">Zaman serisi trend analizi için kullan</p>
                    </div>
                    <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                  </summary>
                  <div className="p-4 bg-white space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Ne zaman kullan:</strong> Günlük/haftalık/aylık değişimi göstermek istediğinde</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Kaçın:</strong> 8+ seri (legend kaosu) veya zamansız kategorik veri için kullanma</p>
                    </div>
                    <div className="bg-blue-50 rounded p-2 mt-2">
                      <p className="text-gray-700"><strong>📌 Örnek:</strong> Günlük üretim trendi, aylık gelir, nakit akışı</p>
                    </div>
                  </div>
                </details>

                {/* Bar Chart */}
                <details className="group rounded-lg border border-gray-200">
                  <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 flex items-center gap-3">
                    <BarChart3 size={20} className="text-green-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">Bar Chart (Çubuk Grafik)</p>
                      <p className="text-xs text-gray-600">Kategoriler arası karşılaştırma yap</p>
                    </div>
                    <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                  </summary>
                  <div className="p-4 bg-white space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Ne zaman kullan:</strong> Şube/ürün/kategori kıyası, Top-N sıralama istediğinde</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Kaçın:</strong> Uzun zaman serisini bar ile anlatma (line kullan)</p>
                    </div>
                    <div className="bg-green-50 rounded p-2 mt-2">
                      <p className="text-gray-700"><strong>📌 Örnek:</strong> Şube performansı, ürün Top-10, gider kalemleri</p>
                    </div>
                  </div>
                </details>

                {/* Pie/Donut Chart */}
                <details className="group rounded-lg border border-gray-200">
                  <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 flex items-center gap-3">
                    <PieChart size={20} className="text-orange-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">Pie / Donut Chart (Pasta Grafik)</p>
                      <p className="text-xs text-gray-600">Parça-bütün oransal dağılım göster</p>
                    </div>
                    <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                  </summary>
                  <div className="p-4 bg-white space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Ne zaman kullan:</strong> Toplam içindeki payları göstermek istediğinde (≤5 dilim)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Kaçın:</strong> 6+ dilim (bar chart daha okunur) veya zaman serisi için kullanma</p>
                    </div>
                    <div className="bg-orange-50 rounded p-2 mt-2">
                      <p className="text-gray-700"><strong>📌 Örnek:</strong> Gelir dağılımı (ürün bazlı), gider payları, stok dengesi</p>
                    </div>
                    <div className="bg-yellow-50 rounded p-2 mt-1">
                      <p className="text-gray-700"><strong>💡 İpucu:</strong> PDF'te Donut daha okunaklı (merkez boşluk = başlık)</p>
                    </div>
                  </div>
                </details>

                {/* Area Chart */}
                <details className="group rounded-lg border border-gray-200">
                  <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 flex items-center gap-3">
                    <Activity size={20} className="text-cyan-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">Area Chart (Alan Grafik)</p>
                      <p className="text-xs text-gray-600">Trend + hacim etkisini birlikte göster</p>
                    </div>
                    <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                  </summary>
                  <div className="p-4 bg-white space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Ne zaman kullan:</strong> Kümülatif toplam, akış, hacim hissi vermek istediğinde</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Kaçın:</strong> Çok seri (üst üste binme) veya negatif değer karmaşası için kullanma</p>
                    </div>
                    <div className="bg-cyan-50 rounded p-2 mt-2">
                      <p className="text-gray-700"><strong>📌 Örnek:</strong> Kümülatif gelir, toplam maliyet trendi</p>
                    </div>
                  </div>
                </details>

                {/* Table */}
                <details className="group rounded-lg border border-gray-200">
                  <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 flex items-center gap-3">
                    <Table size={20} className="text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">Table (Tablo)</p>
                      <p className="text-xs text-gray-600">Detaylı veri görüntüle</p>
                    </div>
                    <span className="text-gray-400 group-open:rotate-90 transition-transform">▶</span>
                  </summary>
                  <div className="p-4 bg-white space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Ne zaman kullan:</strong> Kesin değerlere ihtiyaç duyduğunda, CFO kanıt istediğinde</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-600 mt-0.5" />
                      <p className="text-gray-700"><strong>Kaçın:</strong> Tek başına trend anlatmak için kullanma (grafik + tablo kombosu daha iyi)</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2 mt-2">
                      <p className="text-gray-700"><strong>📌 Örnek:</strong> Top 5 ürün listesi, günlük detay kayıtlar, bütçe satırları</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* 3.4: Yaygın Hatalar */}
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} />
                3.4 Bu Hatalardan Kaçın (Anti-Pattern)
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded p-3 border border-red-200">
                  <p className="font-semibold text-red-900">❌ Çok dilimli pie kullanma (6+ dilim)</p>
                  <p className="text-xs text-gray-700 mt-1">✅ Çözüm: Top-5 + "Diğer" yap veya bar chart'a geç</p>
                </div>

                <div className="bg-white rounded p-3 border border-red-200">
                  <p className="font-semibold text-red-900">❌ Zaman serisini bar ile gösterme</p>
                  <p className="text-xs text-gray-700 mt-1">✅ Çözüm: Line/Area chart kullan (bar sadece aylık toplam için)</p>
                </div>

                <div className="bg-white rounded p-3 border border-red-200">
                  <p className="font-semibold text-red-900">❌ Oranı mutlak değer gibi sunma</p>
                  <p className="text-xs text-gray-700 mt-1">✅ Çözüm: % yanında payda/ciro'yu mutlaka göster</p>
                </div>

                <div className="bg-white rounded p-3 border border-red-200">
                  <p className="font-semibold text-red-900">❌ 8+ seri legend kaosu yaratma</p>
                  <p className="text-xs text-gray-700 mt-1">✅ Çözüm: Seri seçici/filtre ekle, varsayılan 5 seri tut</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADIM 4: Verilerin Entegrasyonu */}
        <section id="adim4" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Database className="text-orange-600" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">4️⃣ Sistem Senin İçin Ne Yapar? (Arka Planda)</h2>
              <p className="text-sm text-gray-600">Sen sadece CSV yükle + KPI/Grafik seç → Geri kalanı sistem halleder! ✨</p>
            </div>
          </div>

          {/* 4.0: CSV Seçimi Detaylı */}
          <div className="mt-6 mb-6 border border-blue-300 rounded-lg p-4 bg-blue-50">
            <h3 className="font-bold text-blue-900 mb-3">4.0 CSV Dosyasını Nasıl Seçersin? (3 Yol)</h3>
            
            <div className="space-y-3">
              {/* Yol 1: Bilgisayardan Yükle */}
              <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                <p className="font-bold text-gray-900 mb-1 text-sm">1️⃣ Bilgisayarından Yükle</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• Dashboard Wizard'da "Veri Kaynağı Seç" → "CSV/Excel Yükle" tıkla</p>
                  <p>• Bilgisayarından CSV dosyasını seç</p>
                  <p>• Sistem otomatik yükler ve analiz eder</p>
                </div>
              </div>

              {/* Yol 2: Kütüphaneden Seç */}
              <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                <p className="font-bold text-gray-900 mb-1 text-sm">2️⃣ Kütüphanenden Seç (Önerilen)</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• Daha önce yüklediğin CSV'ler "Veri Kütüphanesi"nde saklanır</p>
                  <p>• Dashboard Wizard'da "Kütüphaneden Seç" tıkla</p>
                  <p>• Listeden dosya seç → Tekrar yüklemeye gerek yok! ✅</p>
                </div>
              </div>

              {/* Yol 3: Demo Verisi */}
              <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                <p className="font-bold text-gray-900 mb-1 text-sm">3️⃣ Demo Verisi Kullan</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• Sistemde hazır örnek CSV'ler var</p>
                  <p>• Test için kullanabilirsin (örn: termostat_uretim_takip_TR.csv)</p>
                </div>
              </div>
            </div>

            <div className="mt-3 bg-yellow-50 border border-yellow-300 rounded p-2 text-xs text-yellow-900">
              <strong>💡 Önemli:</strong> CSV formatı doğru olmalı (başlıklar ilk satırda, veri ikinci satırdan itibaren). Detay için → <a href="/veri-rehberi" className="text-blue-600 font-bold underline">Veri Yükleme Rehberi</a>
            </div>
          </div>

          {/* 4.1: Sistem Arka Planda Ne Yapar? */}
          <div className="mt-6 space-y-4">
            <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <h3 className="font-bold text-orange-900 mb-2">4.1 Sistem Arka Planda Ne Yapar? (Gizli İşlemler)</h3>
              <p className="text-xs text-orange-800 mb-4 italic">💡 Bu alanları sen görmezsin, sistem otomatik doldurur!</p>
              
              <div className="space-y-3">
                {/* Adım 1: Veri Yükleme */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">1</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">📂 CSV Yükle (Sen yaparsın)</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p>• Dosya seç → Dashboard Wizard'da "Veri Kaynağı" adımında yükle</p>
                        <p>• Ya da kütüphaneden daha önce yüklediğin CSV'yi seç</p>
                      </div>
                      <div className="mt-2">
                        <a
                          href="/veri-rehberi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 font-bold hover:text-blue-800"
                        >
                          📄 Nasıl yüklerim? → Veri Yükleme Rehberi
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 2: Otomatik Analiz */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0">2</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">🤖 Otomatik Analiz (Sistem yapar)</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p>• <strong>Sütun tiplerini tespit eder:</strong> Tarih, Sayı, Kategori, Para...</p>
                        <p>• <strong>Zaman frekansını bulur:</strong> Günlük/haftalık/aylık</p>
                        <p>• <strong>Eksik veriyi kontrol eder:</strong> Null değerleri yakalar</p>
                      </div>
                      <div className="mt-2 bg-green-50 rounded p-2 text-xs text-green-800">
                        <strong>✅ Sen hiçbir şey yapma!</strong> Sistem otomatik analiz eder.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 3: KPI Seçimi */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">3</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">📊 KPI Seç (Sen yaparsın)</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p>• <strong>ADIM 2'de zaten yaptın!</strong> (Başlık, sütun, SUM/AVG/MAX, trend)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 4: KPI Hesaplama (Sistem) */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">4</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">🤖 KPI'ları Hesapla (Sistem yapar)</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p>• <strong>Senin seçtiğin KPI'ları otomatik hesaplar:</strong> SUM, AVG, COUNT, MAX, MIN</p>
                        <p>• <strong>Trend gösteriyorsan:</strong> Aylık/haftalık değişimi (MoM, WoW) hesaplar</p>
                        <p>• <strong>Oranları çıkarır:</strong> Fire%, verimlilik, karlılık gibi</p>
                      </div>
                      <div className="mt-2 bg-purple-50 rounded p-2 text-xs text-purple-800">
                        <strong>✅ Sen ADIM 2'de seçtin, sistem şimdi hesaplıyor!</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 5: Grafik Seçimi */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">5</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">📈 Grafik Seç (Sen yaparsın)</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p>• <strong>ADIM 3'te zaten yaptın!</strong> (Tip seç, X-Y ekseni sürükle-bırak)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 6: Grafik Hazırlama (Sistem) */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">6</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">🤖 Grafik Datasını Hazırla (Sistem yapar)</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p>• <strong>Gruplar:</strong> Tarih/kategori bazlı gruplama (senin seçtiğin X-Y eksenine göre)</p>
                        <p>• <strong>Sıralar:</strong> En büyükten küçüğe, alfabetik, zaman sıralı</p>
                        <p>• <strong>Filtreler:</strong> Top-10, tarih aralığı vb.</p>
                        <p>• <strong>Renklendirir:</strong> Grafik renkleri, tooltip, legend otomatik</p>
                      </div>
                      <div className="mt-2 bg-orange-50 rounded p-2 text-xs text-orange-800">
                        <strong>✅ Sen ADIM 3'te seçtin, sistem şimdi hazırlıyor!</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adım 7: Render */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-100 rounded-full w-8 h-8 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">7</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">🖥️ Dashboard'u Göster (Sistem yapar)</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p>• <strong>Layout'u render eder:</strong> KPI + grafikleri A4 boyutunda yerleştirir</p>
                        <p>• <strong>Responsive yapar:</strong> Mobil, tablet, desktop'a adapte eder</p>
                        <p>• <strong>Interactive ekler:</strong> Hover, tooltip, click events</p>
                        <p>• <strong>Export hazırlar:</strong> PDF, PNG, Excel indir butonları</p>
                      </div>
                      <div className="mt-2 bg-cyan-50 rounded p-2 text-xs text-cyan-800">
                        <strong>✅ Tek tıkla dashboard'un hazır!</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Özet Kutu */}
              <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-4">
                <p className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  ÖZET: Senin İşin Çok Basit!
                </p>
                <div className="text-xs text-gray-800 space-y-1">
                  <p><strong>1️⃣</strong> CSV yükle (ADIM 1)</p>
                  <p><strong>2️⃣</strong> KPI seç (ADIM 2)</p>
                  <p><strong>3️⃣</strong> Grafik seç (ADIM 3)</p>
                  <p><strong>4️⃣</strong> Kaydet → <strong>✅ Dashboard hazır!</strong></p>
                  <p className="mt-2 text-green-700 font-bold">🤖 Geri kalan her şeyi sistem otomatik yapar!</p>
                </div>
              </div>
            </div>

            {/* 4.2: Sistemin Otomatik Doldurduğu Teknik Alanlar */}
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>⚙️</span>
                4.2 Sistemin Arka Planda Doldurduğu Teknik Alanlar
              </h3>
              <p className="text-xs text-gray-600 mb-3 italic">Bu alanlar Dashboard Wizard'da görünmez, sistem otomatik yönetir.</p>
              
              <div className="space-y-2 text-xs">
                <details className="bg-white rounded border border-gray-200 p-2">
                  <summary className="cursor-pointer font-semibold text-gray-800">📋 dataSource (Veri Kaynağı Tipi)</summary>
                  <div className="mt-2 pl-4 text-gray-700 space-y-1">
                    <p>• Olası değerler: 'upload' | 'library' | 'demo' | 'integration'</p>
                    <p>• Sistem otomatik seçer (sen nereden CSV yüklediğine göre)</p>
                  </div>
                </details>

                <details className="bg-white rounded border border-gray-200 p-2">
                  <summary className="cursor-pointer font-semibold text-gray-800">🏗️ dashboardType (Dashboard Tipi)</summary>
                  <div className="mt-2 pl-4 text-gray-700 space-y-1">
                    <p>• Olası değerler: 'custom' | 'template'</p>
                    <p>• Sen KPI/Grafik kendim seçtiysen → 'custom'</p>
                    <p>• Hazır şablon kullandıysan → 'template'</p>
                  </div>
                </details>

                <details className="bg-white rounded border border-gray-200 p-2">
                  <summary className="cursor-pointer font-semibold text-gray-800">🗺️ columnMapping (Sütun Eşleştirme)</summary>
                  <div className="mt-2 pl-4 text-gray-700 space-y-1">
                    <p>• Sistem CSV sütunlarını otomatik analiz eder</p>
                    <p>• Tarih, Sayı, Kategori kolonlarını tespit eder</p>
                    <p>• Eşleştirme otomatik yapılır (sen müdahale etmezsin)</p>
                  </div>
                </details>

                <details className="bg-white rounded border border-gray-200 p-2">
                  <summary className="cursor-pointer font-semibold text-gray-800">🎨 customizations (Özelleştirmeler)</summary>
                  <div className="mt-2 pl-4 text-gray-700 space-y-1">
                    <p>• chartTypes: Seçtiğin grafik tipleri (line, bar, donut...)</p>
                    <p>• selectedMetrics: Seçtiğin KPI sütunları</p>
                    <p>• colorScheme: Renk paleti (default: mavi tonlar)</p>
                    <p>• chartSettings: Tarih aralığı, Top-N filtreleri</p>
                  </div>
                </details>

                <details className="bg-white rounded border border-gray-200 p-2">
                  <summary className="cursor-pointer font-semibold text-gray-800">🏷️ selectedTemplate (Şablon Seçimi)</summary>
                  <div className="mt-2 pl-4 text-gray-700 space-y-1">
                    <p>• Hazır şablon kullandıysan: şablon ID'si</p>
                    <p>• Custom dashboard ise: null</p>
                  </div>
                </details>

                <details className="bg-white rounded border border-gray-200 p-2">
                  <summary className="cursor-pointer font-semibold text-gray-800">🔗 selectedIntegration (Entegrasyon)</summary>
                  <div className="mt-2 pl-4 text-gray-700 space-y-1">
                    <p>• API, Google Sheets, Database bağlantısı kullandıysan: entegrasyon ID'si</p>
                    <p>• CSV yüklediysen: null</p>
                  </div>
                </details>
              </div>

              <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-900">
                <strong>💡 NEDEN BİLMELİSİN?</strong> Dashboard'unda sorun olursa veya geliştiriciye soru sorarsan bu terimleri kullanabilirsin. Normal kullanımda görmezsin.
              </div>
            </div>

            {/* 4.2: Örnek CSV → Dashboard */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">4.2 Örnek: Termostat CSV → Dashboard Dönüşümü</h3>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-xs font-bold text-gray-700 mb-2">📄 CSV Yapısı (termostat_uretim_takip_TR.csv):</p>
                <div className="bg-white rounded p-2 font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-700">{`Tarih,Üretim_Emri_No,Ürün_Kodu,Üretim_Aşaması,Üretilen_Adet,Hatalı_Adet,Toplam_Üretim_Maliyeti_USD,Mamul_Stok,Yarı_Mamul_Stok
2024-01-02,UE-2024-001,TRST-A100,Hammadde Hazırlık,1200,15,4800,250,180
2024-01-02,UE-2024-002,TRST-A100,Montaj,1185,8,5925,250,180`}</pre>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="font-bold text-blue-900 mb-1">1️⃣ Auto-Detect Sonuçları:</p>
                  <div className="text-xs text-blue-800 space-y-1">
                    <p>• <strong>Tarih kolonu:</strong> "Tarih" → Zaman serisi analizi mümkün</p>
                    <p>• <strong>Numeric kolonlar:</strong> Üretilen_Adet, Hatalı_Adet, Maliyet, Stoklar</p>
                    <p>• <strong>Category kolonlar:</strong> Ürün_Kodu, Üretim_Aşaması</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="font-bold text-green-900 mb-1">2️⃣ KPI Hesaplama Örnekleri:</p>
                  <div className="text-xs text-green-800 space-y-1 font-mono">
                    <p>• Total_Cost = SUM(Toplam_Üretim_Maliyeti_USD)</p>
                    <p>• Total_Produced = SUM(Üretilen_Adet)</p>
                    <p>• Defect_Rate = (SUM(Hatalı_Adet) / SUM(Üretilen_Adet)) × 100</p>
                    <p>• Avg_Unit_Cost = Total_Cost / Total_Produced</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="font-bold text-purple-900 mb-1">3️⃣ Grafik Data Örnekleri:</p>
                  <div className="text-xs text-purple-800 space-y-1 font-mono">
                    <p>• Line Chart: groupBy(Tarih) → SUM(Üretilen_Adet)</p>
                    <p>• Bar Chart: groupBy(Üretim_Aşaması) → SUM(Maliyet)</p>
                    <p>• Donut Chart: groupBy(Ürün_Kodu) → SUM(Hatalı_Adet)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4.3: Best Practices */}
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle size={20} />
                4.3 Bu İpuçlarına Uy
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">✅ CSV Formatını Standartlaştır</p>
                  <p className="text-xs text-gray-700 mt-1">UTF-8 encoding kullan, başlıkları ilk satıra koy, tutarlı format uygula</p>
                </div>

                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">✅ Tarih Formatını Sabitle</p>
                  <p className="text-xs text-gray-700 mt-1">YYYY-MM-DD (ISO 8601) formatı tercih et</p>
                </div>

                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">✅ Null Değerleri Yönet</p>
                  <p className="text-xs text-gray-700 mt-1">Boş hücreleri "0", "N/A" veya "-" ile doldur</p>
                </div>

                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">✅ Performansı Optimize Et</p>
                  <p className="text-xs text-gray-700 mt-1">Büyük CSV'ler için (&gt;10K satır) pagination kullan</p>
                </div>

                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">✅ Validasyon Ekle</p>
                  <p className="text-xs text-gray-700 mt-1">Veri tipi uyumsuzluklarını kullanıcıya bildir</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SONUÇ */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={32} />
            <h2 className="text-2xl font-bold">✅ Artık Hazırsın!</h2>
          </div>
          
          <div className="space-y-2 text-white/90 mb-4">
            <p>✅ Dashboard mimarisini kurdun</p>
            <p>✅ KPI seçim kriterlerini öğrendin</p>
            <p>✅ Doğru grafik türünü seçebiliyorsun</p>
            <p>✅ Veri entegrasyonunu uygulayabilirsin</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/dashboard/create')}
              className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={20} />
              Dashboard Oluştur
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-white/30 text-sm text-white/80">
            <p>💡 <strong>İpucu:</strong> Örnek dashboard'ları incele, kendi verilerinle dene!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🎓 <strong>FinOps AI Studio</strong> • Dashboard Hazırlama Rehberi</p>
          <p className="text-xs mt-1">Son Güncelleme: Ocak 2026</p>
        </div>
      </div>
    </div>
  );
}
