import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Download, Sparkles, Lightbulb, Target } from 'lucide-react';

// 🎨 Counting Animation Hook
const useCountingAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

// 🎯 KPI Card Component with Animation
const AnimatedKPICard: React.FC<{
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: any;
  trend: string;
  delay: number;
}> = ({ label, value, suffix = '', prefix = '', icon: Icon, trend, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const animatedValue = useCountingAnimation(isVisible ? value : 0, 2000);
  const isPositive = trend.startsWith('+');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className="text-blue-600" size={20} />
        <span className={`text-xs font-semibold flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900">
        {prefix}{animatedValue.toLocaleString('tr-TR')}{suffix}
      </p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
};

const DemoDashboardPreview: React.FC = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);

  useEffect(() => {
    const chartsTimer = setTimeout(() => setShowCharts(true), 1000);
    const insightsTimer = setTimeout(() => setShowAIInsights(true), 2500);
    
    return () => {
      clearTimeout(chartsTimer);
      clearTimeout(insightsTimer);
    };
  }, []);

  // Mock data
  const dailyData = [
    { day: 'Pzt', gelir: 26105, siparis: 273 },
    { day: 'Sal', gelir: 30015, siparis: 308 },
    { day: 'Çar', gelir: 33148, siparis: 338 },
    { day: 'Per', gelir: 35595, siparis: 366 },
    { day: 'Cum', gelir: 38255, siparis: 394 },
    { day: 'Cmt', gelir: 32335, siparis: 343 },
    { day: 'Paz', gelir: 34375, siparis: 360 },
  ];

  const categoryData = [
    { name: 'Ana Yemek', value: 65, color: '#3B82F6' },
    { name: 'Meze', value: 15, color: '#10B981' },
    { name: 'Tatlı', value: 20, color: '#F59E0B' },
  ];

  const productData = [
    { name: 'Margherita Pizza', siparis: 1060, gelir: 68900 },
    { name: 'Biftek Patates', siparis: 801, gelir: 76095 },
    { name: 'Karbonara Makarna', siparis: 648, gelir: 35640 },
    { name: 'Izgara Somon', siparis: 516, gelir: 43860 },
    { name: 'Sezar Salata', siparis: 348, gelir: 12180 },
    { name: 'Tiramisu', siparis: 411, gelir: 18495 },
  ];

  // 🤖 AI Insights
  const aiInsights = [
    {
      icon: Target,
      title: "En Karlı Ürün",
      description: "Biftek Patates en yüksek geliri (₺76,095) sağlıyor. Stok ve promosyon odağınızı buraya yönlendirin.",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Büyüme Trendi",
      description: "Hafta içi satışlar %47 artış gösteriyor. Cumartesi ekstra personel planlamanızı öneririz.",
      color: "blue"
    },
    {
      icon: Lightbulb,
      title: "Fırsat Analizi",
      description: "Tatlı kategorisi sadece %20 pay alıyor. Yeni tatlı ürünleri ekleyerek geliri %15-20 artırabilirsiniz.",
      color: "purple"
    }
  ];

  // PDF Export Handler
  const handleExportPDF = () => {
    alert('📥 PDF raporu indirildi! (Demo modunda simüle edildi)');
  };

  // Excel Export Handler
  const handleExportExcel = () => {
    alert('📥 Excel raporu indirildi! (Demo modunda simüle edildi)');
  };

  return (
    <div className="space-y-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* 🎉 Header with Success Animation */}
        <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200 animate-pulse">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="text-yellow-500" size={32} />
                Dashboard Başarıyla Oluşturuldu!
              </h1>
              <p className="text-gray-600 mt-1">Verileriniz analiz edildi ve görselleştirildi 🎊</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportPDF}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
              >
                <Download size={18} />
                <span>PDF İndir</span>
              </button>
              <button
                onClick={handleExportExcel}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                <Download size={18} />
                <span>Excel İndir</span>
              </button>
            </div>
          </div>
        </div>

        {/* 📊 KPI Cards with Counting Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedKPICard
            label="Toplam Gelir"
            value={229828}
            prefix="₺"
            icon={DollarSign}
            trend="+23%"
            delay={0}
          />
          <AnimatedKPICard
            label="Toplam Sipariş"
            value={2382}
            icon={ShoppingCart}
            trend="+18%"
            delay={200}
          />
          <AnimatedKPICard
            label="Ortalama Sipariş"
            value={96}
            prefix="₺"
            icon={TrendingUp}
            trend="+5%"
            delay={400}
          />
          <AnimatedKPICard
            label="Net Kar"
            value={83141}
            prefix="₺"
            icon={DollarSign}
            trend="+27%"
            delay={600}
          />
        </div>

        {/* 📈 Charts with Fade-in Animation */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 ${
            showCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Daily Revenue */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📈 Günlük Gelir Trendi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="gelir" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorGelir)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">🥧 Kategori Dağılımı</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={2000}
                  animationBegin={500}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance */}
        <div 
          className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-1000 ${
            showCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📊 Ürün Performansı</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
              <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
              <Tooltip />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="siparis" 
                fill="#3B82F6" 
                radius={[8, 8, 0, 0]} 
                animationDuration={2000}
                name="Sipariş Sayısı"
              />
              <Bar 
                yAxisId="right" 
                dataKey="gelir" 
                fill="#10B981" 
                radius={[8, 8, 0, 0]} 
                animationDuration={2000}
                animationBegin={300}
                name="Gelir (₺)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🤖 AI Insights with Slide-in Animation */}
        {showAIInsights && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-purple-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">🤖 AI Destekli İçgörüler</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                const colorMap = {
                  green: 'bg-green-50 border-green-200 text-green-700',
                  blue: 'bg-blue-50 border-blue-200 text-blue-700',
                  purple: 'bg-purple-50 border-purple-200 text-purple-700'
                };
                
                return (
                  <div 
                    key={index}
                    className={`${colorMap[insight.color as keyof typeof colorMap]} border-2 rounded-lg p-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg`}
                    style={{ 
                      animation: `slideInFromLeft 0.6s ease-out ${index * 200}ms both`
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Icon size={24} className="flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{insight.title}</h4>
                        <p className="text-xs opacity-90">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DemoDashboardPreview;

