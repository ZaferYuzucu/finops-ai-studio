import { useParams, Link } from "react-router-dom";
import { dashboards } from "../../data/dashboards";
import { ArrowLeft, CheckCircle, HelpCircle, Zap, Share2, Copy, TrendingUp, BarChart3, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DashboardDetailPage() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const dashboard = dashboards.find((d) => d.id === dashboardId);
  const [copiedMetric, setCopiedMetric] = useState<number | null>(null);

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 max-w-2xl mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Panel Bulunamadı</h2>
          <p className="text-lg text-gray-600 mb-8">Aradığınız dashboard mevcut değil veya kaldırılmış olabilir.</p>
          <Link 
            to="/solutions/dashboard-examples" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Tüm Örneklere Geri Dön
          </Link>
        </motion.div>
      </div>
    );
  }

  const relatedDashboards = dashboards.filter(
    (d) => d.category === dashboard.category && d.id !== dashboard.id
  ).slice(0, 3);

  const copyMetric = (metric: string, index: number) => {
    navigator.clipboard.writeText(metric);
    setCopiedMetric(index);
    setTimeout(() => setCopiedMetric(null), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Sayfa linki kopyalandı!');
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

        {/* Geri Dön Butonu */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/solutions/dashboard-examples" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Tüm Dashboard Örnekleri
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          {/* Kategori Rozeti */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 mb-6">
            <TrendingUp className="w-4 h-4" />
            {dashboard.category}
          </div>
          
          {/* Başlık */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            {dashboard.name}
          </h1>
          
          {/* Açıklama */}
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            {dashboard.longDescription}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">
                {dashboard.keyQuestions.length} Anahtar Soru
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">
                {dashboard.keyMetrics.length} Temel Metrik
              </span>
            </div>
            <button
              onClick={shareUrl}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Paylaş</span>
            </button>
          </div>
        </motion.header>

        {/* Ana Görsel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-gray-300">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <img
                src={dashboard.imageUrl}
                alt={dashboard.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Metrikler ve Sorular */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          
          {/* Bu Pano Hangi Soruları Cevaplıyor? */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mr-4">
                <HelpCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Bu Panel Hangi Soruları Cevaplıyor?
              </h2>
            </div>
            
            {dashboard.keyQuestions.length > 0 ? (
              <ul className="space-y-4">
                {dashboard.keyQuestions.map((question, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-start group"
                  >
                    <CheckCircle className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 text-base leading-relaxed">{question}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Henüz soru eklenmemiş.</p>
            )}
          </motion.div>

          {/* İzlenecek Temel Metrikler */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-100 hover:border-purple-300 transition-colors"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                İzlenecek Temel Metrikler
              </h2>
            </div>
            
            {dashboard.keyMetrics.length > 0 ? (
              <ul className="space-y-3">
                {dashboard.keyMetrics.map((metric, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="group relative"
                  >
                    <div className="flex items-start justify-between bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 hover:border-purple-300 hover:shadow-md transition-all">
                      <div className="flex items-start flex-1">
                        <span className="text-purple-500 font-bold text-lg mr-3 mt-0.5">•</span>
                        <span className="text-gray-800 font-medium text-sm leading-relaxed flex-1">
                          {metric}
                        </span>
                      </div>
                      
                      {/* Kopyala Butonu */}
                      <button
                        onClick={() => copyMetric(metric, index)}
                        className="ml-3 p-2 rounded-lg hover:bg-white/50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Kopyala"
                      >
                        {copiedMetric === index ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Henüz metrik eklenmemiş.</p>
            )}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16 text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Arka Plan Deseni */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Verilerinizi Eyleme Dönüştürün
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-indigo-100">
              Finops AI Studio ile kendi dashboard'larınızı oluşturmaya başlayın ve işinizin potansiyelini ortaya çıkarın.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link 
                to="/signup" 
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-indigo-600 shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Ücretsiz Başla
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/30 backdrop-blur-sm border-2 border-white/30 px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-indigo-500/50 transition-all hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Demo Talep Et
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Related Dashboards */}
        {relatedDashboards.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
                İlgili Diğer Panelleri Keşfedin
              </h2>
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-indigo-600">{dashboard.category}</span> kategorisinden benzer paneller
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedDashboards.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link 
                    to={`/solutions/dashboards/${related.id}`}
                    className="group block rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="overflow-hidden rounded-t-2xl">
                      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={related.imageUrl}
                          alt={related.name}
                          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-3">
                        <TrendingUp className="w-3 h-3" />
                        {related.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors leading-tight mb-2">
                        {related.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

      </div>
    </div>
  );
}
