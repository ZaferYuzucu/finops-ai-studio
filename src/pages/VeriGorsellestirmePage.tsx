import React from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, Zap, Palette, Layout, Monitor, Smartphone, Eye, CheckCircle, PlayCircle, Sparkles, ArrowRight, Grid3x3, Database, Users, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VeriGorsellestirmePage: React.FC = () => {
  const { t } = useTranslation();
  
  const chartTypes = [
    { name: 'Çubuk Grafik', icon: '📊', color: 'blue' },
    { name: 'Çizgi Grafik', icon: '📈', color: 'green' },
    { name: 'Pasta Grafik', icon: '🥧', color: 'purple' },
    { name: 'Alan Grafik', icon: '📉', color: 'cyan' },
    { name: 'Scatter Plot', icon: '⚫', color: 'orange' },
    { name: 'Heatmap', icon: '🔥', color: 'red' },
    { name: 'Gauge Chart', icon: '⏱️', color: 'indigo' },
    { name: 'Tablo', icon: '📋', color: 'gray' },
    { name: 'KPI Kartı', icon: '🎯', color: 'emerald' },
    { name: 'Funnel Chart', icon: '🔻', color: 'pink' },
    { name: 'Tree Map', icon: '🌳', color: 'lime' },
    { name: 'Radar Chart', icon: '📡', color: 'violet' },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <BarChart3 size={20} />
            <span>{t('veriGorsellestirme.hero.badge')}</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            📊 {t('veriGorsellestirme.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('veriGorsellestirme.hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/veri-girisi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              <Zap size={20} />
              <span>{t('veriGorsellestirme.hero.cta1')}</span>
            </a>
            <a 
              href="/solutions/dashboard-examples"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-300 text-blue-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-semibold"
            >
              <Eye size={20} />
              <span>{t('veriGorsellestirme.hero.cta2')}</span>
            </a>
          </div>
        </div>

        {/* AI Dashboard Generator Section */}
        <section className="mb-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-12 border-2 border-blue-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <Sparkles size={18} />
                <span>{t('veriGorsellestirme.aiGenerator.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                🤖 {t('veriGorsellestirme.aiGenerator.title')}
              </h2>
              <p className="text-gray-700 mb-8 text-lg">
                {t('veriGorsellestirme.aiGenerator.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.aiGenerator.feature1')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.aiGenerator.feature1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.aiGenerator.feature2')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.aiGenerator.feature2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.aiGenerator.feature3')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.aiGenerator.feature3Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.aiGenerator.feature4')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.aiGenerator.feature4Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.aiGenerator.feature5')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.aiGenerator.feature5Desc')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-blue-300">
                <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-200">
                  <h4 className="font-bold text-gray-900">{t('veriGorsellestirme.aiGenerator.editorTitle')}</h4>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-4 h-24 flex items-center justify-center border-2 border-blue-300">
                    <BarChart3 className="text-blue-600" size={32} />
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4 h-24 flex items-center justify-center border-2 border-green-300">
                    <LineChart className="text-green-600" size={32} />
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 h-24 flex items-center justify-center border-2 border-purple-300">
                    <PieChart className="text-purple-600" size={32} />
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-4 h-24 flex items-center justify-center border-2 border-orange-300">
                    <TrendingUp className="text-orange-600" size={32} />
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md flex items-center justify-center gap-2">
                  <Sparkles size={18} />
                  <span>{t('veriGorsellestirme.aiGenerator.autoBtn')}</span>
                </button>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </section>

        {/* Charts & Graphs Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
              <Grid3x3 size={18} />
              <span>{t('veriGorsellestirme.charts.badge')}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📈 {t('veriGorsellestirme.charts.title')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-8">
              {t('veriGorsellestirme.charts.subtitle')}
            </p>
            <a 
              href="/docs"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <span>{t('veriGorsellestirme.charts.exploreAll')}</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {chartTypes.map((chart, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-purple-400 transition-all hover:shadow-xl group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{chart.icon}</div>
                <h4 className="font-bold text-gray-900 text-sm">{chart.name}</h4>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('veriGorsellestirme.charts.moreTitle')}
              </h3>
              <p className="text-gray-700 mb-6">
                {t('veriGorsellestirme.charts.moreDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <Database className="mx-auto mb-2 text-purple-600" size={28} />
                  <p className="text-sm font-semibold text-gray-900">{t('veriGorsellestirme.charts.dataTablesLabel')}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <Layout className="mx-auto mb-2 text-purple-600" size={28} />
                  <p className="text-sm font-semibold text-gray-900">{t('veriGorsellestirme.charts.customLayoutsLabel')}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <Palette className="mx-auto mb-2 text-purple-600" size={28} />
                  <p className="text-sm font-semibold text-gray-900">{t('veriGorsellestirme.charts.visualElementsLabel')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Customization Section */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">F</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">FINOPS</h4>
                        <p className="text-xs text-gray-500">AI Studio</p>
                      </div>
                    </div>
                    <Palette className="text-green-600" size={24} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-2 block">{t('veriGorsellestirme.customization.brandColorLabel')}</label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-lg bg-green-600 border-2 border-gray-300 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-lg bg-blue-600 border-2 border-gray-300 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-lg bg-purple-600 border-2 border-gray-300 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-lg bg-orange-600 border-2 border-gray-300 cursor-pointer"></div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-2 block">{t('veriGorsellestirme.customization.backgroundLabel')}</label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-lg bg-white border-2 border-gray-300 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-gray-300 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-lg bg-gray-900 border-2 border-gray-300 cursor-pointer"></div>
                      </div>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mt-4">
                      <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
                        <CheckCircle size={16} />
                        {t('veriGorsellestirme.customization.successMessage')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                <Palette size={18} />
                <span>{t('veriGorsellestirme.customization.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                🎨 {t('veriGorsellestirme.customization.title')}
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                {t('veriGorsellestirme.customization.description')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.customization.uploadLogo')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.customization.uploadLogoDesc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.customization.setBrandColors')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.customization.setBrandColorsDesc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.customization.customizeBackground')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.customization.customizeBackgroundDesc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('veriGorsellestirme.customization.fontTypography')}</h4>
                    <p className="text-sm text-gray-600">{t('veriGorsellestirme.customization.fontTypographyDesc')}</p>
                  </div>
                </li>
              </ul>
              <a 
                href="/veri-girisi"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
              >
                <Palette size={20} />
                <span>{t('veriGorsellestirme.customization.tryNowBtn')}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Responsive Design Section */}
        <section className="mb-24 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12 border-2 border-orange-200">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
              <Monitor size={18} />
              <span>{t('veriGorsellestirme.responsive.badge')}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              📱 {t('veriGorsellestirme.responsive.title')}
            </h2>
            <p className="text-gray-700 mb-8 text-lg max-w-3xl mx-auto">
              {t('veriGorsellestirme.responsive.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-300">
                <Monitor className="mx-auto mb-4 text-orange-600" size={40} />
                <h3 className="font-bold text-lg text-gray-900 mb-2">{t('veriGorsellestirme.responsive.desktopTitle')}</h3>
                <p className="text-sm text-gray-600">{t('veriGorsellestirme.responsive.desktopDesc')}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-300">
                <div className="mx-auto mb-4 text-orange-600 w-10 h-10 flex items-center justify-center">
                  <Monitor size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{t('veriGorsellestirme.responsive.tabletTitle')}</h3>
                <p className="text-sm text-gray-600">{t('veriGorsellestirme.responsive.tabletDesc')}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-300">
                <Smartphone className="mx-auto mb-4 text-orange-600" size={40} />
                <h3 className="font-bold text-lg text-gray-900 mb-2">{t('veriGorsellestirme.responsive.mobileTitle')}</h3>
                <p className="text-sm text-gray-600">{t('veriGorsellestirme.responsive.mobileDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Guide Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                <PlayCircle size={18} />
                <span>{t('veriGorsellestirme.videoGuide.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                🎥 {t('veriGorsellestirme.videoGuide.title')}
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                {t('veriGorsellestirme.videoGuide.description')}
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Database className="text-blue-400" size={24} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{t('veriGorsellestirme.videoGuide.guidesTitle')}</h4>
                  <p className="text-sm text-gray-300">{t('veriGorsellestirme.videoGuide.guidesDesc')}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="text-green-400" size={24} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{t('veriGorsellestirme.videoGuide.supportTitle')}</h4>
                  <p className="text-sm text-gray-300">{t('veriGorsellestirme.videoGuide.supportDesc')}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Share2 className="text-purple-400" size={24} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{t('veriGorsellestirme.videoGuide.shareTitle')}</h4>
                  <p className="text-sm text-gray-300">{t('veriGorsellestirme.videoGuide.shareDesc')}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <a 
                  href="/docs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg"
                >
                  <PlayCircle size={20} />
                  <span>{t('veriGorsellestirme.videoGuide.exploreGuidesBtn')}</span>
                </a>
                <a 
                  href="/veri-hazirlama"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors font-semibold"
                >
                  <span>{t('veriGorsellestirme.videoGuide.dataPreparationBtn')}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">
            {t('veriGorsellestirme.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('veriGorsellestirme.cta.description')}
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <a 
              href="/veri-girisi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all shadow-lg font-bold text-lg"
            >
              <Zap size={24} />
              <span>{t('veriGorsellestirme.cta.startBtn')}</span>
            </a>
            <a 
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
            >
              <span>{t('veriGorsellestirme.cta.pricingBtn')}</span>
            </a>
          </div>
          <p className="text-sm text-blue-100">{t('veriGorsellestirme.cta.disclaimer')}</p>
        </section>

        {/* Related Features */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🔍 {t('veriGorsellestirme.relatedFeatures.title')}
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <a href="/solutions/features" className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layout className="text-blue-600" size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('veriGorsellestirme.relatedFeatures.overviewTitle')}</h4>
              <p className="text-sm text-gray-600 mb-3">{t('veriGorsellestirme.relatedFeatures.overviewDesc')}</p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
                <span>{t('veriGorsellestirme.relatedFeatures.exploreBtn')}</span>
                <ArrowRight size={14} />
              </div>
            </a>
            <a href="/veri-kaynaklari" className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-green-400 transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="text-green-600" size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('veriGorsellestirme.relatedFeatures.dataSourcesTitle')}</h4>
              <p className="text-sm text-gray-600 mb-3">{t('veriGorsellestirme.relatedFeatures.dataSourcesDesc')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <span>{t('veriGorsellestirme.relatedFeatures.exploreBtn')}</span>
                <ArrowRight size={14} />
              </div>
            </a>
            <a href="/veri-hazirlama" className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-purple-400 transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="text-purple-600" size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('veriGorsellestirme.relatedFeatures.dataPreparationTitle')}</h4>
              <p className="text-sm text-gray-600 mb-3">{t('veriGorsellestirme.relatedFeatures.dataPreparationDesc')}</p>
              <div className="flex items-center gap-1 text-purple-600 text-sm font-semibold">
                <span>{t('veriGorsellestirme.relatedFeatures.exploreBtn')}</span>
                <ArrowRight size={14} />
              </div>
            </a>
            <a href="/ai-veri-analizi" className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-orange-400 transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="text-orange-600" size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('veriGorsellestirme.relatedFeatures.aiAnalyticsTitle')}</h4>
              <p className="text-sm text-gray-600 mb-3">{t('veriGorsellestirme.relatedFeatures.aiAnalyticsDesc')}</p>
              <div className="flex items-center gap-1 text-orange-600 text-sm font-semibold">
                <span>{t('veriGorsellestirme.relatedFeatures.exploreBtn')}</span>
                <ArrowRight size={14} />
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VeriGorsellestirmePage;


