import React, { useState } from 'react';
import { Brain, MessageSquare, TrendingUp, Sparkles, Zap, BarChart3, LineChart, PieChart, Database, ChevronRight, CheckCircle, AlertCircle, ArrowRight, Bot, Lightbulb, Target, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AIVeriAnaliziPage: React.FC = () => {
  const { t } = useTranslation();
  const [chatMessages, setChatMessages] = useState([
    { role: 'user', text: 'Bu ayki satış performansımızı analiz et' },
    { role: 'ai', text: 'Ocak ayı satışlarınız geçen aya göre %23 artış gösterdi. En yüksek performans Elektronik kategorisinde gerçekleşti. Detaylı grafik hazırlıyorum...' }
  ]);

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <Brain size={20} />
            <span>{t('aiVeriAnalizi.hero.badge')}</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🤖 {t('aiVeriAnalizi.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('aiVeriAnalizi.hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/veri-girisi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              <Sparkles size={20} />
              <span>{t('aiVeriAnalizi.hero.cta1')}</span>
            </a>
            <a 
              href="#demo"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-purple-300 text-purple-700 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all font-semibold"
            >
              <Bot size={20} />
              <span>{t('aiVeriAnalizi.hero.cta2')}</span>
            </a>
          </div>
        </div>

        {/* Feature 1: Auto-Generate Dashboards */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">AI Dashboard Oluşturucu</h4>
                      <p className="text-xs text-gray-500">Otomatik & Akıllı</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                      <BarChart3 className="text-purple-600 mb-2" size={28} />
                      <p className="text-xs font-semibold text-gray-700">Satış Trendi</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
                      <LineChart className="text-blue-600 mb-2" size={28} />
                      <p className="text-xs font-semibold text-gray-700">Gelir Analizi</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                      <PieChart className="text-green-600 mb-2" size={28} />
                      <p className="text-xs font-semibold text-gray-700">Dağılım</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200">
                      <TrendingUp className="text-orange-600 mb-2" size={28} />
                      <p className="text-xs font-semibold text-gray-700">KPI Takip</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <p className="text-sm font-semibold text-green-800">Dashboard hazır! ✨</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <Sparkles size={18} />
                <span>{t('aiVeriAnalizi.autoDashboard.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                📊 {t('aiVeriAnalizi.autoDashboard.title')}
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                {t('aiVeriAnalizi.autoDashboard.description')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.autoDashboard.feature1')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.autoDashboard.feature1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.autoDashboard.feature2')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.autoDashboard.feature2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.autoDashboard.feature3')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.autoDashboard.feature3Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.autoDashboard.feature4')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.autoDashboard.feature4Desc')}</p>
                  </div>
                </li>
              </ul>
              <a 
                href="/veri-girisi?demo=true"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md"
              >
                <Zap size={20} />
                <span>Hemen Dene</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Feature 2: Conversational Analytics */}
        <section className="mb-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-12 border-2 border-blue-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <MessageSquare size={18} />
                <span>{t('aiVeriAnalizi.chat.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                💬 {t('aiVeriAnalizi.chat.title')}
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                {t('aiVeriAnalizi.chat.description')} 
                Manuel olarak dağlar gibi veriyi eleyerek aramak yerine dakikalar içinde cevaplar alın.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.chat.feature1')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.chat.feature1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.chat.feature2')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.chat.feature2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.chat.feature3')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.chat.feature3Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('aiVeriAnalizi.chat.feature4')}</h4>
                    <p className="text-sm text-gray-600">{t('aiVeriAnalizi.chat.feature4Desc')}</p>
                  </div>
                </li>
              </ul>
              <a 
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
              >
                <MessageSquare size={20} />
                <span>AI ile Konuş</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-blue-300 relative">
                {/* ÇOK YAKINDA Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  ✨ ÇOK YAKINDA
                </div>
                
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                  <div className="relative w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl filter drop-shadow-lg">🐕</span>
                    {/* Tech accent dots */}
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      Fino
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">AI</span>
                    </h4>
                    <p className="text-xs text-orange-600 flex items-center gap-1 font-semibold">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      Çok Yakında Sizinle
                    </p>
                  </div>
                </div>
                <div className="space-y-4 h-64 overflow-y-auto mb-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">AI analiz yapıyor...</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3 border-2 border-gray-300 opacity-60">
                  <input 
                    type="text" 
                    placeholder="Fino çok yakında sizinle olacak... 🐕"
                    disabled
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-500 placeholder-gray-400 cursor-not-allowed"
                  />
                  <button disabled className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                    <ArrowRight className="text-white" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: AI Chart Generator */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
              <Sparkles size={18} />
              <span>Sınırsız</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📈 AI Grafik Oluşturucu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              İsteklerinizi yazın ve sınırsız sayıda grafik oluşturun. AI sizin için en uygun görselleştirmeyi hazırlar.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 border-2 border-green-200">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-300 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder={t('aiVeriAnalizi.chartGenerator.placeholder')}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500 transition-colors"
                      defaultValue="2024 yılı aylık gelir dağılımını göster"
                    />
                  </div>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2">
                    <Sparkles size={18} />
                    <span>Oluştur</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button className="px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors">
                    📊 Çubuk Grafik
                  </button>
                  <button className="px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">
                    📈 Çizgi Grafik
                  </button>
                  <button className="px-4 py-2 bg-purple-50 border-2 border-purple-200 rounded-lg text-xs font-semibold text-purple-700 hover:bg-purple-100 transition-colors">
                    🥧 Pasta Grafik
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm text-gray-900">Hızlı</h4>
                    <Clock className="text-green-600" size={20} />
                  </div>
                  <p className="text-xs text-gray-600">Saniyeler içinde grafikler oluşturun</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm text-gray-900">Sınırsız</h4>
                    <Target className="text-blue-600" size={20} />
                  </div>
                  <p className="text-xs text-gray-600">İstediğiniz kadar grafik üretin</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm text-gray-900">Akıllı</h4>
                    <Brain className="text-purple-600" size={20} />
                  </div>
                  <p className="text-xs text-gray-600">AI en uygun türü seçer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4: Correlations & Anomalies */}
        <section className="mb-24 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12 border-2 border-orange-200">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
              <AlertCircle size={18} />
              <span>{t('aiVeriAnalizi.correlations.badge')}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🔍 {t('aiVeriAnalizi.correlations.title')}
            </h2>
            <p className="text-gray-700 mb-8 text-lg max-w-3xl mx-auto">
              {t('aiVeriAnalizi.correlations.description')}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-orange-600" size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Korelasyon Bulma</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Hangi değişkenler birbirleriyle ilişkili? AI otomatik tespit eder.
                </p>
                <div className="text-left bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs text-orange-800 font-semibold mb-1">Örnek Bulgu:</p>
                  <p className="text-xs text-gray-700">"Reklam harcaması ile satış arasında %87 pozitif korelasyon var"</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Karşılaştırma</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Farklı dönemleri, kategorileri veya segmentleri otomatik karşılaştırın.
                </p>
                <div className="text-left bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-800 font-semibold mb-1">Örnek Bulgu:</p>
                  <p className="text-xs text-gray-700">"Q4 2024 satışları Q3'e göre %32 daha yüksek"</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-300">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-red-600" size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Anomali Tespiti</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Beklenmedik değişimler ve aykırı değerleri anında tespit edin.
                </p>
                <div className="text-left bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-red-800 font-semibold mb-1">Örnek Bulgu:</p>
                  <p className="text-xs text-gray-700">"15 Ocak'ta olağandışı sipariş artışı tespit edildi"</p>
                </div>
              </div>
            </div>

            <a 
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold shadow-lg"
            >
              <Brain size={20} />
              <span>AI Analiz Başlat</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* Data Preparation CTA */}
        <section className="mb-24 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Database className="mx-auto mb-6 text-blue-400" size={48} />
            <h2 className="text-4xl font-bold mb-4">
              📋 Anlamlı Analitik İçin Verilerinizi Hazırlayın
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              AI'ın en iyi sonuçları vermesi için verilerinizin düzgün hazırlanması önemlidir. 
              Veri hazırlama rehberimiz size yardımcı olacak.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a 
                href="/veri-hazirlama"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg"
              >
                <Database size={20} />
                <span>Veri Hazırlama Rehberi</span>
              </a>
              <a 
                href="/veri-kaynaklari"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors font-semibold"
              >
                <span>Veri Kaynakları</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Tek Platformda Daha Fazla İş Yapın
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Profesyonel dashboard'lardan AI analitiğine kadar tüm işlevselliği keşfedin.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <a href="/solutions/features" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-sm mb-2">📊 Genel Bakış</h4>
              <p className="text-xs text-purple-100">Tüm özellikleri keşfet</p>
            </a>
            <a href="/veri-kaynaklari" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-sm mb-2">🔌 Veri Kaynakları</h4>
              <p className="text-xs text-purple-100">Canlı raporlama</p>
            </a>
            <a href="/solutions/dashboard-examples" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-sm mb-2">🎨 Görselleştirmeler</h4>
              <p className="text-xs text-purple-100">Dashboard örnekleri</p>
            </a>
            <a href="/veri-hazirlama" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-sm mb-2">🔧 Veri Hazırlama</h4>
              <p className="text-xs text-purple-100">Temizlik & dönüşüm</p>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a 
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all shadow-lg font-bold text-lg"
            >
              <span>Fiyatlandırma</span>
            </a>
            <a 
              href="/veri-girisi"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
            >
              <Zap size={24} />
              <span>Ücretsiz Başla</span>
            </a>
          </div>
          <p className="text-sm text-purple-100 mt-4">Kredi kartı gerektirmez • Sınırsız dashboard • AI destekli</p>
        </section>
      </div>
    </div>
  );
};

export default AIVeriAnaliziPage;


