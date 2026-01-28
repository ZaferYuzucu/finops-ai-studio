import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Brain, TrendingUp, 
  CheckCircle, ArrowRight, Sparkles, 
  Cloud, FileText, DollarSign, AlertTriangle,
  BarChart3, PieChart, LineChart, Server, Upload
} from 'lucide-react';

// Mock data - Turkish labels
const DATA_SOURCES = [
  { 
    id: 'cloud', 
    name: 'Bulut Sağlayıcı', 
    description: 'AWS, Azure, GCP',
    icon: Cloud,
    color: 'blue'
  },
  { 
    id: 'erp', 
    name: 'ERP Sistemi', 
    description: 'SAP, Logo, Elektraweb',
    icon: Server,
    color: 'purple'
  },
  { 
    id: 'file', 
    name: 'Excel / CSV', 
    description: 'Dosya Yükleme',
    icon: Upload,
    color: 'green'
  }
];

const MOCK_INSIGHTS = [
  { icon: Cloud, label: 'Tespit Edilen Kaynak', value: 847, unit: 'kaynak' },
  { icon: DollarSign, label: 'Atıl Kaynaklar', value: 12400, unit: '₺' },
  { icon: AlertTriangle, label: 'Maliyet Anomalisi', value: 23, unit: 'sorun' },
  { icon: TrendingUp, label: 'Tasarruf Fırsatı', value: 31, unit: '%' }
];

const MOCK_KPIS = [
  { id: 'total-cost', name: 'Toplam Maliyet', value: '₺42.5K', trend: '+8%', icon: DollarSign },
  { id: 'savings', name: 'Tasarruf', value: '₺13.2K', trend: '31%', icon: TrendingUp },
  { id: 'efficiency', name: 'Verimlilik', value: '%87', trend: '+5%', icon: BarChart3 }
];

const CHART_SUGGESTIONS = [
  { id: 'line', name: 'Zaman Serisi', icon: LineChart, description: 'Trend analizi' },
  { id: 'bar', name: 'Karşılaştırma', icon: BarChart3, description: 'Kategori analizi' },
  { id: 'pie', name: 'Dağılım', icon: PieChart, description: 'Oran analizi' }
];

// Multi-metric chart data
const MULTI_METRIC_DATA = [
  { month: 'Oca', revenue: 85, cost: 62, profit: 23 },
  { month: 'Şub', revenue: 92, cost: 68, profit: 24 },
  { month: 'Mar', revenue: 88, cost: 65, profit: 23 },
  { month: 'Nis', revenue: 95, cost: 70, profit: 25 },
  { month: 'May', revenue: 102, cost: 74, profit: 28 },
  { month: 'Haz', revenue: 98, cost: 71, profit: 27 }
];

interface InteractiveHeroJourneyProps {
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export const InteractiveHeroJourney: React.FC<InteractiveHeroJourneyProps> = ({ 
  autoPlay = true, 
  autoPlayDelay = 3000 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const totalSteps = 5;

  // Auto-advance logic
  useEffect(() => {
    if (!isAutoPlaying || currentStep >= totalSteps - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }, autoPlayDelay);

    return () => clearTimeout(timer);
  }, [currentStep, isAutoPlaying, autoPlayDelay]);

  const goToStep = (step: number) => {
    setIsAutoPlaying(false);
    setCurrentStep(step);
  };

  return (
    <div className="relative w-full py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <div className="relative w-full max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            5 Adımda Modern Yönetim Paneli
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-100 max-w-3xl mx-auto"
          >
            Finansal verilerinizi profesyonel yönetime dönüştürün
          </motion.p>
        </div>

        {/* PRODUCT STAGE - Fixed Container */}
        <div 
          className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ minHeight: '580px' }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Stage Content - All steps render inside this fixed frame */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {currentStep === 0 && <Step1DataSources key="step1" />}
                {currentStep === 1 && <Step2AIAnalysis key="step2" />}
                {currentStep === 2 && <Step3KPIAndCharts key="step3" />}
                {currentStep === 3 && <Step4MultiMetricChart key="step4" />}
                {currentStep === 4 && <Step5FinalDashboard key="step5" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Timeline Navigation - Top Right */}
          <div className="absolute top-6 right-6 flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-md z-10">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentStep 
                    ? 'w-10 h-3 bg-blue-600' 
                    : index < currentStep 
                    ? 'w-3 h-3 bg-gray-400' 
                    : 'w-3 h-3 bg-gray-300'
                }`}
                aria-label={`Adım ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button - Below Stage */}
        {currentStep === totalSteps - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <a
              href="/signup"
              className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl font-bold text-lg"
            >
              <span>Haydi Deneyelim</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Step 1: Data Sources
const Step1DataSources: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-5xl mx-auto flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
        Veri Kaynağınızı Seçin
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Hangi kaynaktan başlamak istersiniz?
      </p>
      
      <div className="grid grid-cols-3 gap-8 w-full max-w-5xl">
        {DATA_SOURCES.map((source, index) => {
          const Icon = source.icon;
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
            purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
            green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          };
          
          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {/* Icon Circle */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colorClasses[source.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 mx-auto`}>
                <Icon className="text-white" size={36} />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {source.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-4">
                {source.description}
              </p>
              
              {/* Check indicator */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="absolute -top-3 -right-3"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-white" size={20} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Connection indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 flex items-center gap-2 text-green-600 font-semibold"
      >
        <CheckCircle size={20} />
        <span>Tüm veri kaynakları hazır</span>
      </motion.div>
    </motion.div>
  );
};

// Step 2: AI Analysis
const Step2AIAnalysis: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const timers = MOCK_INSIGHTS.map((insight, index) => {
      return setTimeout(() => {
        const duration = 800;
        const steps = 20;
        const increment = insight.value / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= insight.value) {
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = insight.value;
              return newCounts;
            });
            clearInterval(counter);
          } else {
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = Math.floor(current);
              return newCounts;
            });
          }
        }, duration / steps);
      }, index * 300);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-5xl mx-auto flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
        Yapay Zeka Analiz Ediyor
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Verileriniz işleniyor ve öngörüler oluşturuluyor...
      </p>

      {/* Central AI Icon */}
      <motion.div
        className="relative mb-12"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
          <Brain className="text-white" size={64} />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-purple-400"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Insight Cards */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {MOCK_INSIGHTS.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.label}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">{insight.label}</div>
                  <div className="text-3xl font-bold text-gray-800">
                    {insight.unit === '₺' && '₺'}
                    {counts[index].toLocaleString('tr-TR')}
                    {insight.unit === '%' && '%'}
                    {insight.unit !== '₺' && insight.unit !== '%' && (
                      <span className="text-lg text-gray-500 ml-2">{insight.unit}</span>
                    )}
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.3 }}
                >
                  <Sparkles className="text-yellow-500" size={20} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Step 3: KPI Cards + Chart Suggestions
const Step3KPIAndCharts: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-5xl mx-auto flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
        KPI ve Grafik Seçimi
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Dashboard'unuz için önemli metrikleri seçin
      </p>

      {/* KPI Cards - Top Section */}
      <div className="w-full mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Ana Göstergeler (KPI)</h3>
        <div className="grid grid-cols-3 gap-6">
          {MOCK_KPIS.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-500"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">{kpi.name}</div>
                    <div className="text-2xl font-bold text-gray-800">{kpi.value}</div>
                  </div>
                  <div className="text-green-600 font-semibold text-sm">
                    {kpi.trend}
                  </div>
                </div>
                
                {/* Mini sparkline */}
                <div className="flex items-end gap-1 h-10 mt-4">
                  {[40, 55, 45, 70, 60, 75, 65].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-blue-200 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                {/* Selected indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.15 }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-white" size={18} />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Chart Suggestions - Bottom Section */}
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Grafik Türleri</h3>
        <div className="grid grid-cols-3 gap-6">
          {CHART_SUGGESTIONS.map((chart, index) => {
            const Icon = chart.icon;
            return (
              <motion.div
                key={chart.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-500 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg mb-2">{chart.name}</h4>
                  <p className="text-sm text-gray-600">{chart.description}</p>
                </div>

                {/* Selected indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.15 }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-white" size={18} />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Step 4: Multi-Metric Chart (Enterprise Style)
const Step4MultiMetricChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
        Gelişmiş Görselleştirme
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Çoklu metrik analizi ile derin içgörüler
      </p>

      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
        {/* Chart Title and Legend */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Finansal Performans Analizi</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Gelir</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Maliyet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Kar</span>
            </div>
          </div>
        </div>

        {/* Multi-Metric Chart */}
        <div className="relative h-80">
          <svg className="w-full h-full" viewBox="0 0 700 300">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="60"
                y1={50 + i * 50}
                x2="680"
                y2={50 + i * 50}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Y-axis */}
            <line x1="60" y1="30" x2="60" y2="250" stroke="#9ca3af" strokeWidth="2" />
            {/* X-axis */}
            <line x1="60" y1="250" x2="680" y2="250" stroke="#9ca3af" strokeWidth="2" />
            
            {/* Y-axis labels */}
            {['120K', '90K', '60K', '30K', '0'].map((label, i) => (
              <text key={i} x="45" y={55 + i * 50} textAnchor="end" fontSize="12" fill="#6b7280">
                {label}
              </text>
            ))}

            {/* Calculate line paths from data points */}
            {(() => {
              const revenuePoints = MULTI_METRIC_DATA.map((data, i) => {
                const x = 110 + i * 100;
                const y = 250 - (data.revenue * 2);
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
              }).join(' ');
              
              const costPoints = MULTI_METRIC_DATA.map((data, i) => {
                const x = 110 + i * 100;
                const y = 250 - (data.cost * 2);
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
              }).join(' ');
              
              const profitPoints = MULTI_METRIC_DATA.map((data, i) => {
                const x = 110 + i * 100;
                const y = 250 - (data.profit * 2);
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
              }).join(' ');
              
              return (
                <>
                  {/* Revenue Line (Blue) */}
                  <motion.path
                    d={revenuePoints}
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  
                  {/* Cost Line (Red) */}
                  <motion.path
                    d={costPoints}
                    stroke="#ef4444"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  />
                  
                  {/* Profit Line (Green) */}
                  <motion.path
                    d={profitPoints}
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                  />
                </>
              );
            })()}

            {/* Data Points */}
            {MULTI_METRIC_DATA.map((data, i) => {
              const x = 110 + i * 100;
              const revenueY = 250 - (data.revenue * 2);
              const costY = 250 - (data.cost * 2);
              const profitY = 250 - (data.profit * 2);
              
              return (
                <g key={i}>
                  {/* Revenue point */}
                  <motion.circle
                    cx={x}
                    cy={revenueY}
                    r="5"
                    fill="#3b82f6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                  />
                  {/* Cost point */}
                  <motion.circle
                    cx={x}
                    cy={costY}
                    r="5"
                    fill="#ef4444"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                  />
                  {/* Profit point */}
                  <motion.circle
                    cx={x}
                    cy={profitY}
                    r="5"
                    fill="#10b981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.1 + i * 0.1 }}
                  />
                  
                  {/* X-axis label */}
                  <text x={x} y="270" textAnchor="middle" fontSize="12" fill="#6b7280">
                    {data.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Key Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-blue-600 font-medium mb-1">Ortalama Gelir</div>
            <div className="text-2xl font-bold text-blue-700">₺93.3K</div>
            <div className="text-xs text-blue-600 mt-1">↑ %12 artış</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="text-sm text-red-600 font-medium mb-1">Ortalama Maliyet</div>
            <div className="text-2xl font-bold text-red-700">₺68.3K</div>
            <div className="text-xs text-red-600 mt-1">↑ %8 artış</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-green-600 font-medium mb-1">Ortalama Kar</div>
            <div className="text-2xl font-bold text-green-700">₺25.0K</div>
            <div className="text-xs text-green-600 mt-1">↑ %18 artış</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Step 5: Final Dashboard (3+3 Model)
const Step5FinalDashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-sm mb-3 shadow-lg"
        >
          <CheckCircle size={16} />
          <span>Modern Yönetim Paneliniz Hazır</span>
        </motion.div>
        <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--finops-ocean, #0C4A6E)' }}>
          Profesyonel FinOps Yönetim Paneli
        </h2>
        <p className="text-base mt-1 font-medium" style={{ color: 'var(--text-secondary, #64748B)' }}>
          Tüm finansal metrikleriniz tek ekranda, gerçek zamanlı
        </p>
      </div>

      {/* Top: 3 KPI Summary Cards - SMALLER, CLEANER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-5"
      >
        {/* KPI Card 1: Toplam Maliyet */}
        <div 
          className="rounded-lg p-3 shadow-md border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-0.5 bg-white"
        >
          <div className="flex items-start justify-between mb-1">
            <div className="text-xs font-semibold text-gray-500">Toplam Maliyet</div>
            <DollarSign size={18} className="text-blue-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">₺42.5K</div>
          <div className="flex items-center gap-1.5">
            <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-bold bg-red-100 text-red-700">
              <TrendingUp size={10} />
              8%
            </div>
            <span className="text-xs text-gray-400">vs Geçen Ay</span>
          </div>
        </div>

        {/* KPI Card 2: Tasarruf */}
        <div 
          className="rounded-lg p-3 shadow-md border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-0.5 bg-white"
        >
          <div className="flex items-start justify-between mb-1">
            <div className="text-xs font-semibold text-gray-500">Tasarruf Fırsatı</div>
            <Sparkles size={18} className="text-green-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">₺13.2K</div>
          <div className="flex items-center gap-1.5">
            <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-bold bg-green-100 text-green-700">
              <TrendingUp size={10} />
              31%
            </div>
            <span className="text-xs text-gray-400">Potansiyel</span>
          </div>
        </div>

        {/* KPI Card 3: Verimlilik */}
        <div 
          className="rounded-lg p-3 shadow-md border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-0.5 bg-white"
        >
          <div className="flex items-start justify-between mb-1">
            <div className="text-xs font-semibold text-gray-500">Verimlilik Skoru</div>
            <BarChart3 size={18} className="text-purple-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">87%</div>
          <div className="flex items-center gap-1.5">
            <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-bold bg-purple-100 text-purple-700">
              <CheckCircle size={10} />
              İyi
            </div>
            <span className="text-xs text-gray-400">Hedef %95</span>
          </div>
        </div>
      </motion.div>


      {/* Bottom: 3 LARGE Professional Charts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Chart 1: Professional Time Series with Axes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-5 shadow-lg border border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-blue-300"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2 text-base text-gray-900">
            <LineChart size={20} className="text-blue-600" />
            Maliyet Trendi
          </h3>
          <div className="h-48 relative mb-3">
            <svg className="w-full h-full" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              <g opacity="0.1">
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={`h${i}`} x1="40" y1={20 + i * 35} x2="290" y2={20 + i * 35} stroke="#9CA3AF" strokeWidth="1" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <line key={`v${i}`} x1={50 + i * 40} y1="20" x2={50 + i * 40} y2="160" stroke="#9CA3AF" strokeWidth="1" />
                ))}
              </g>
              
              {/* Y-axis */}
              <line x1="40" y1="20" x2="40" y2="160" stroke="#6B7280" strokeWidth="2" />
              <text x="10" y="30" fontSize="10" fill="#6B7280">₺60K</text>
              <text x="10" y="95" fontSize="10" fill="#6B7280">₺30K</text>
              <text x="15" y="158" fontSize="10" fill="#6B7280">₺0</text>
              
              {/* X-axis */}
              <line x1="40" y1="160" x2="290" y2="160" stroke="#6B7280" strokeWidth="2" />
              {['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem'].map((month, i) => (
                <text key={month} x={45 + i * 40} y="175" fontSize="10" fill="#6B7280" textAnchor="middle">{month}</text>
              ))}
              
              {/* Area fill */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 50,120 L 90,90 L 130,105 L 170,70 L 210,80 L 250,55 L 290,65 L 290,160 L 50,160 Z"
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              
              {/* Main line */}
              <motion.path
                d="M 50,120 L 90,90 L 130,105 L 170,70 L 210,80 L 250,55 L 290,65"
                stroke="#3B82F6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Data points */}
              {[50, 90, 130, 170, 210, 250, 290].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={[120, 90, 105, 70, 80, 55, 65][i]}
                  r="4"
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                />
              ))}
            </svg>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Brain size={14} className="text-blue-600" />
            <span className="font-medium">Yükseliş trendi tespit edildi</span>
          </div>
        </motion.div>

        {/* Chart 2: Department Spending Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-5 shadow-lg border border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-emerald-300"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2 text-base text-gray-900">
            <TrendingUp size={20} className="text-emerald-600" />
            Departman Harcama Trendi
          </h3>
          <div className="h-48 relative mb-3">
            <svg className="w-full h-full" viewBox="0 0 320 180" style={{ overflow: 'visible' }}>
              {/* Grid lines */}
              <line x1="45" y1="30" x2="300" y2="30" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="45" y1="65" x2="300" y2="65" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="45" y1="100" x2="300" y2="100" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="45" y1="135" x2="300" y2="135" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4,4" />
              
              {/* Y-axis */}
              <line x1="45" y1="15" x2="45" y2="155" stroke="#6B7280" strokeWidth="2" />
              <text x="8" y="20" fontSize="9" fill="#6B7280" fontWeight="500">₺80K</text>
              <text x="8" y="55" fontSize="9" fill="#6B7280" fontWeight="500">₺60K</text>
              <text x="8" y="90" fontSize="9" fill="#6B7280" fontWeight="500">₺40K</text>
              <text x="8" y="125" fontSize="9" fill="#6B7280" fontWeight="500">₺20K</text>
              <text x="15" y="158" fontSize="9" fill="#6B7280" fontWeight="500">₺0</text>
              
              {/* X-axis */}
              <line x1="45" y1="155" x2="300" y2="155" stroke="#6B7280" strokeWidth="2" />
              <text x="60" y="170" fontSize="9" fill="#6B7280" fontWeight="500">Oca</text>
              <text x="105" y="170" fontSize="9" fill="#6B7280" fontWeight="500">Şub</text>
              <text x="150" y="170" fontSize="9" fill="#6B7280" fontWeight="500">Mar</text>
              <text x="195" y="170" fontSize="9" fill="#6B7280" fontWeight="500">Nis</text>
              <text x="240" y="170" fontSize="9" fill="#6B7280" fontWeight="500">May</text>
              <text x="280" y="170" fontSize="9" fill="#6B7280" fontWeight="500">Haz</text>
              
              {/* Line path - Smooth curve */}
              <motion.path
                d="M 60,90 L 105,70 L 150,85 L 195,55 L 240,65 L 285,45"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Data points */}
              {[
                { x: 60, y: 90, value: '₺35K' },
                { x: 105, y: 70, value: '₺45K' },
                { x: 150, y: 85, value: '₺38K' },
                { x: 195, y: 55, value: '₺55K' },
                { x: 240, y: 65, value: '₺48K' },
                { x: 285, y: 45, value: '₺65K' }
              ].map((point, i) => (
                <motion.g key={i}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#10B981"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.3 }}
                  />
                  <motion.text
                    x={point.x}
                    y={point.y - 12}
                    fontSize="9"
                    fill="#10B981"
                    textAnchor="middle"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    {point.value}
                  </motion.text>
                </motion.g>
              ))}
            </svg>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Brain size={14} className="text-emerald-600" />
            <span className="font-medium">Yükseliş trendi tespit edildi</span>
          </div>
        </motion.div>

        {/* Chart 3: Modern Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-5 shadow-lg border border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-purple-300"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2 text-base text-gray-900">
            <PieChart size={20} className="text-purple-600" />
            Bütçe Kullanımı
          </h3>
          <div className="h-48 flex flex-col items-center justify-center mb-3">
            <div className="relative">
              <svg width="160" height="160" viewBox="0 0 160 160">
                {/* Background circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="20"
                />
                {/* Animated progress circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="url(#purpleGradient)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray="377"
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 - (377 * 0.73) }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                  transform="rotate(-90 80 80)"
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  className="text-4xl font-black text-gray-900"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  73%
                </motion.div>
                <div className="text-sm text-gray-500 font-medium mt-1">Kullanılan</div>
                <div className="text-xs text-gray-400 mt-1">₺42.5K / ₺58K</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Brain size={14} className="text-purple-600" />
            <span className="font-medium">Bütçe takibi ideal durumda</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InteractiveHeroJourney;
