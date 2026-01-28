// ✅ FINOPS Dashboard Factory - Otomatik Standart Dashboard Üretici
// Tüm dashboard'lar için tek kaynak, %100 standart format
// 🛡️ Anti-Chaos: Fail-soft render engine entegre edildi
import React from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Package, 
  Users, Target, Activity, BarChart3, PieChart as PieChartIcon,
  Calendar, Percent, Award, AlertCircle, Info, CheckCircle2 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { createFallbackDashboard } from '../../utils/antiChaos/failSoftDashboard';
import { logDashboardFallback, logLowConfidence } from '../../utils/diagnostics/eventLogger';

// Dashboard Configuration Type
export interface DashboardConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // Emoji veya ✅
  dataSource?: string; // Veri kaynağı bilgisi (CSV dosya adı veya "Mockup Data")
  kpis: Array<{
    id: string;
    label: string;
    icon: string | React.ComponentType<{ size?: number }>; // String (icon name) veya component
    format: 'currency' | 'number' | 'percentage' | 'decimal';
    insight: string;
  }>;
  charts: Array<{
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie';
    dataKey: string;
    insight: string;
  }>;
  // 🛡️ Anti-Chaos: Confidence & Risk Indicators (opsiyonel)
  diagnosis?: {
    confidenceScore: number; // 0-1 arası
    riskFlags: Array<{
      code: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      message: string;
    }>;
    blockedAssumptions?: string[];
  };
}

// FINOPS Brand Colors
const FINOPS_COLORS = {
  primary: '#0000FF',
  secondary: '#8000FF',
  gradient: 'linear-gradient(135deg, #0000FF 0%, #8000FF 100%)',
  chart1: '#0066FF',
  chart2: '#3385FF',
  chart3: '#6600FF',
  chart4: '#9933FF',
  chart5: '#CC66FF',
  chart6: '#FF66CC',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

// Icon string'i React component'e map et
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  Target,
  Activity,
  BarChart3,
  PieChartIcon,
  Calendar,
  Percent,
  Award,
};

const getIconComponent = (icon: string | React.ComponentType<{ size?: number }>): React.ComponentType<{ size?: number }> => {
  // Eğer zaten component ise direkt döndür
  if (typeof icon === 'function') return icon;
  // String ise map'ten bul, yoksa Activity döndür
  return iconMap[icon] || Activity;
};

// Format helper - CEO/CFO için kısa ve net format
const formatValue = (value: number, format: string): string => {
  switch (format) {
    case 'currency':
      if (value >= 1000000000) return `₺${(value / 1000000000).toFixed(1)}B`;
      if (value >= 1000000) return `₺${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `₺${(value / 1000).toFixed(1)}K`;
      return `₺${value.toFixed(0)}`;
    case 'percentage':
      return `%${value.toFixed(1)}`;
    case 'decimal':
      return value.toFixed(1);
    case 'number':
    default:
      if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toFixed(0);
  }
};

// Dashboard Factory Component
export const createFinopsDashboard = (config: DashboardConfig) => {
  return () => {
    const [showInterpretation, setShowInterpretation] = React.useState(false);
    const [dateRange, setDateRange] = React.useState('mtd');
    const [location, setLocation] = React.useState('all');
    const [isLoading, setIsLoading] = React.useState(false);
    const [dashboardData, setDashboardData] = React.useState<any>(null);

    React.useEffect(() => {
      fetchData();
    }, [dateRange, location]);

    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // 🛡️ Mock data generation - Fail-soft korumalı
        const baseMultiplier = dateRange === 'ytd' ? 4.8 : dateRange === 'wtd' ? 0.35 : 1.0;
        const locMultiplier = location === 'kadikoy' ? 0.38 : location === 'besiktas' ? 0.35 : location === 'taksim' ? 0.27 : 1.0;
        
        const mockKpis: any = {};
        config.kpis.forEach(kpi => {
          try {
            let baseValue;
            
            // Format'a göre uygun değer aralığı belirle
            if (kpi.format === 'percentage') {
              baseValue = Math.random() * 60 + 20; // 20-80 arası
            } else if (kpi.format === 'decimal') {
              baseValue = Math.random() * 2 + 3; // 3-5 arası
            } else if (kpi.format === 'currency') {
              baseValue = 100000 * baseMultiplier * locMultiplier * (Math.random() * 0.4 + 0.8);
            } else {
              baseValue = 50000 * baseMultiplier * locMultiplier * (Math.random() * 0.4 + 0.8);
            }
            
            mockKpis[kpi.id] = {
              value: baseValue,
              change: (Math.random() * 20 - 5).toFixed(1),
              previous: baseValue / 1.1,
            };
          } catch (kpiError) {
            // 🛡️ KPI oluşturma hatası - placeholder kullan
            console.warn(`⚠️ KPI oluşturma hatası (${kpi.id}):`, kpiError);
            mockKpis[kpi.id] = {
              value: 0,
              change: 0,
              previous: 0,
              placeholder: true,
            };
          }
        });

        const mockChartData = Array.from({ length: dateRange === 'ytd' ? 12 : 7 }, (_, i) => ({
          name: dateRange === 'ytd' 
            ? ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'][i] || `Ay ${i+1}`
            : `${String(i + 1).padStart(2, '0')} Ara`,
          value: Math.round(50000 * baseMultiplier * locMultiplier * (0.8 + Math.random() * 0.4)),
          target: Math.round(45000 * baseMultiplier * locMultiplier),
        }));

        const mockPieData = [
          { name: 'Kategori A', value: Math.round(125000 * baseMultiplier * locMultiplier) },
          { name: 'Kategori B', value: Math.round(98000 * baseMultiplier * locMultiplier) },
          { name: 'Kategori C', value: Math.round(87000 * baseMultiplier * locMultiplier) },
          { name: 'Kategori D', value: Math.round(76000 * baseMultiplier * locMultiplier) },
          { name: 'Kategori E', value: Math.round(54000 * baseMultiplier * locMultiplier) },
        ];

        setDashboardData({ kpis: mockKpis, chartData: mockChartData, pieData: mockPieData });
      } catch (error) {
        // 🛡️ Veri yükleme hatası - Boş data set et, UI render etmeye devam et
        console.error('❌ Dashboard veri yükleme hatası:', error);
        setDashboardData({ 
          kpis: {}, 
          chartData: [], 
          pieData: [],
          error: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleExport = (type: 'pdf' | 'excel') => {
      try {
        if (type === 'pdf') {
          window.print();
        } else {
          // 🛡️ Excel/CSV Export - Fail-soft korumalı
          const exportKpis = safeKpis || {};
          const exportChartData = safeChartData || [];
          
          // KPI verilerini CSV formatına çevir
          let csvContent = `${config.title} - Dashboard Raporu\n`;
          csvContent += `Dönem: ${dateRange.toUpperCase()}, Lokasyon: ${location === 'all' ? 'Tüm Lokasyonlar' : location}\n\n`;
          
          // KPI Başlıkları
          csvContent += 'KPI ÖZET\n';
          csvContent += 'Metrik,Değer,Değişim\n';
          config.kpis.forEach(kpiConfig => {
            const kpiData = exportKpis[kpiConfig.id] || { value: 0, change: 0 };
            const formattedValue = kpiData.placeholder ? 'N/A' : formatValue(kpiData.value, kpiConfig.format);
            const changeSymbol = kpiData.change >= 0 ? '+' : '';
            csvContent += `${kpiConfig.label},${formattedValue},${changeSymbol}${kpiData.change.toFixed(1)}%\n`;
          });
          
          // Chart verileri
          csvContent += '\n\nGRAFİK VERİLERİ\n';
          csvContent += 'Dönem,Değer\n';
          if (exportChartData.length > 0) {
            exportChartData.forEach((item: any) => {
              csvContent += `${item.name || 'N/A'},${item.value || 0}\n`;
            });
          } else {
            csvContent += 'Veri Yok,0\n';
          }
          
          // CSV dosyasını indir
          const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          const fileName = `${config.id}_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`;
          
          link.setAttribute('href', url);
          link.setAttribute('download', fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          showToast('✅ CSV dosyası indirildi!');
        }
      } catch (error) {
        // 🛡️ Export hatası durumunda bile UI render etmeye devam et
        console.error('❌ Export hatası:', error);
        showToast('⚠️ Export sırasında bir sorun oluştu. Lütfen tekrar deneyin.');
      }
    };

    const handleShare = () => {
      const url = new URL(window.location.href);
      url.searchParams.set('period', dateRange);
      url.searchParams.set('location', location);
      navigator.clipboard.writeText(url.toString());
      showToast('✅ Dashboard linki kopyalandı!');
    };

    const showToast = (msg: string) => {
      const toast = document.createElement('div');
      toast.textContent = msg;
      toast.style.cssText = `position:fixed;top:20px;right:20px;background:#10B981;color:white;padding:12px 24px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:10000;font-size:14px;font-weight:500;`;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    };

    // 🛡️ Anti-Chaos: Fail-soft render - Veri yoksa bile UI render et
    let safeKpis: any = {};
    let safeChartData: any[] = [];
    let safePieData: any[] = [];
    let hasData = false;
    let dataWarning: string | null = null;
    let fallbackUsed = false;

    try {
      if (dashboardData && dashboardData.kpis && dashboardData.chartData) {
        safeKpis = dashboardData.kpis || {};
        safeChartData = Array.isArray(dashboardData.chartData) ? dashboardData.chartData : [];
        safePieData = Array.isArray(dashboardData.pieData) ? dashboardData.pieData : [];
        hasData = Object.keys(safeKpis).length > 0 || safeChartData.length > 0;
      } else {
        // 🛡️ Veri yoksa fallback kullan
        dataWarning = 'Veriler yükleniyor veya mevcut değil. Placeholder gösteriliyor.';
        hasData = false;
        fallbackUsed = true;
      }
    } catch (error) {
      // 🛡️ Hata durumunda bile render et
      console.warn('⚠️ Dashboard veri işleme hatası:', error);
      dataWarning = 'Veri işleme sırasında bir sorun oluştu. Dashboard placeholder modunda gösteriliyor.';
      hasData = false;
      fallbackUsed = true;
    }
    
    // 🛡️ Diagnostics: Fallback kullanıldı log (sessiz)
    if (fallbackUsed) {
      logDashboardFallback(
        undefined, // userId (opsiyonel)
        undefined, // email
        config.id,
        dataWarning || 'Veri eksikliği'
      ).catch(() => {}); // Sessizce atla, UI etkilenmez
    }

    // 🛡️ KPI fallback - En azından placeholder göster
    if (!hasData || Object.keys(safeKpis).length === 0) {
      // Config'den placeholder KPI'lar oluştur
      config.kpis.forEach(kpi => {
        if (!safeKpis[kpi.id]) {
          safeKpis[kpi.id] = {
            value: 0,
            change: 0,
            previous: 0,
            placeholder: true,
          };
        }
      });
    }

    // 🛡️ Chart fallback - Boş array yerine placeholder data
    if (safeChartData.length === 0 && config.charts.length > 0) {
      safeChartData = [
        { name: 'Veri Yok', value: 0, target: 0 },
        { name: 'Veri Yok', value: 0, target: 0 },
      ];
    }

    if (safePieData.length === 0) {
      safePieData = [
        { name: 'Veri Yok', value: 0 },
      ];
    }

    const { kpis, chartData, pieData } = {
      kpis: safeKpis,
      chartData: safeChartData,
      pieData: safePieData,
    };

    return (
      <>
        <style>{`
          @media print { 
            body * { visibility: hidden; } 
            .dashboard-print-area, .dashboard-print-area * { visibility: visible; } 
            .dashboard-print-area { 
              position: absolute; 
              left: 0; 
              top: 0; 
              width: 297mm !important; 
              height: 210mm !important; 
              padding: 8mm 10mm !important; 
              margin: 0 !important; 
              overflow: hidden !important; 
              transform: scale(0.95);
              transform-origin: top left;
              page-break-inside: avoid;
              page-break-after: avoid;
            } 
            .no-print { display: none !important; } 
            .kpi-grid { max-height: 110px !important; gap: 6px !important; }
            .kpi-card { min-height: 100px !important; max-height: 110px !important; padding: 8px 10px !important; }
            .charts-grid { height: 320px !important; gap: 6px !important; }
            .chart-card { padding: 8px !important; }
            .dashboard-header { padding: 8px 12px !important; min-height: 50px !important; }
          }
          @page { size: A4 landscape; margin: 0; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .dashboard-container { width: 100vw; height: 100vh; overflow: hidden; background: #E8EAED; display: flex; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .dashboard-print-area { width: 100%; max-width: 1600px; height: calc(100vh - 40px); margin: 0 auto; padding: 16px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 12px; overflow-y: auto; }
          
          /* Responsive Design - Tablet */
          @media (max-width: 1024px) {
            .dashboard-print-area { max-width: 100%; padding: 12px; gap: 10px; }
            .kpi-grid { grid-template-columns: repeat(3, 1fr) !important; max-height: 280px !important; }
            .charts-grid { grid-template-columns: repeat(2, 1fr) !important; height: auto !important; }
            .chart-card { height: 300px !important; }
          }
          
          /* Responsive Design - Mobile */
          @media (max-width: 768px) {
            .dashboard-container { height: auto; overflow-y: auto; }
            .dashboard-print-area { height: auto; padding: 10px; gap: 8px; }
            .dashboard-header { flex-direction: column; align-items: flex-start; gap: 10px; min-height: auto !important; }
            .dashboard-actions { width: 100%; justify-content: space-between; }
            .action-btn { flex: 1; font-size: 12px; padding: 6px 10px; }
            .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; max-height: none !important; }
            .kpi-card { min-height: 100px; max-height: none; }
            .charts-grid { grid-template-columns: 1fr !important; height: auto !important; }
            .chart-card { height: 280px !important; margin-bottom: 10px; }
            .filter-container { flex-direction: column; width: 100%; }
            .filter-select { width: 100%; }
          }
          .dashboard-header { background: linear-gradient(135deg, #0000FF 0%, #8000FF 100%); color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; border-radius: 8px; min-height: 60px; }
          .dashboard-title { font-size: 20px; font-weight: 800; margin: 0; }
          .dashboard-subtitle { font-size: 12px; margin: 4px 0 0 0; opacity: 0.9; }
          .dashboard-datasource { font-size: 10px; margin: 3px 0 0 0; opacity: 0.75; font-weight: 400; font-style: italic; display: flex; align-items: center; gap: 4px; }
          .dashboard-actions { display: flex; gap: 12px; }
          .action-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .action-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
          .action-btn-red { background: #DC2626; }
          .action-btn-red:hover { background: #B91C1C; }
          .action-btn-blue { background: #4F46E5; }
          .action-btn-blue:hover { background: #4338CA; }
          .action-btn-green { background: #16A34A; }
          .action-btn-green:hover { background: #15803D; }
          .kpi-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; max-height: 130px; }
          .kpi-card { background: #FFF; border: 2px solid #D1D5DB; border-radius: 8px; padding: 10px 12px 8px 12px; display: flex; flex-direction: column; gap: 4px; transition: all 0.3s; min-height: 120px; max-height: 130px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .kpi-card:hover { border-color: #8000FF; box-shadow: 0 6px 16px rgba(128,0,255,0.15); transform: translateY(-3px); background: linear-gradient(135deg, #FFF 0%, #F8F9FF 100%); }
          .kpi-header { display: flex; align-items: center; gap: 8px; }
          .kpi-icon { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0000FF 0%, #8000FF 100%); color: white; }
          .kpi-label { font-size: 10px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; line-height: 1.2; flex: 1; }
          .kpi-value { font-size: 24px; font-weight: 700; color: #111827; line-height: 1; letter-spacing: -0.5px; }
          .kpi-change { font-size: 11px; font-weight: 600; }
          .kpi-change.positive { color: #10B981; }
          .kpi-change.negative { color: #EF4444; }
          .kpi-insight { 
            font-size: 9px; 
            color: #4B5563; 
            background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
            border-left: 2px solid #8000FF;
            border-radius: 3px;
            padding: 4px 6px; 
            margin-top: auto;
            line-height: 1.3; 
            font-weight: 500;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .charts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; height: 360px; }
          .chart-card { background: #FFF; border: 2px solid #D1D5DB; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; height: 100%; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .chart-card:hover { border-color: #8000FF; box-shadow: 0 8px 20px rgba(128,0,255,0.12); transform: translateY(-3px); background: linear-gradient(135deg, #FFF 0%, #F8F9FF 100%); }
          .chart-title { font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 6px; }
          .chart-container { flex: 1; min-height: 0; height: 240px; }
          .chart-insight { margin-top: 6px; padding: 6px 8px; background: linear-gradient(135deg, #E0E7FF 0%, #EDE9FE 100%); border-left: 3px solid #8000FF; border-radius: 4px; font-size: 10px; color: #374151; line-height: 1.3; }
          .filter-container { display: flex; gap: 12px; margin-top: 8px; }
          .filter-select { padding: 6px 12px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; color: white; font-size: 12px; cursor: pointer; }
          .filter-select option { background: #1F2937; color: white; }
        `}</style>

        <div className="dashboard-container">
          <div className="dashboard-print-area">
            {isLoading && <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'rgba(255,255,255,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}><div style={{width:'40px',height:'40px',border:'4px solid #E5E7EB',borderTop:'4px solid #8000FF',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/></div>}

            {/* 🛡️ Confidence & Risk Indicator - Sessiz bilgilendirme */}
            {config.diagnosis && (() => {
              try {
                const confidence = config.diagnosis.confidenceScore || 0;
                const riskCount = config.diagnosis.riskFlags?.length || 0;
                const confidencePercent = Math.round(confidence * 100);
                
                // 🛡️ Admin: Console'a log (kullanıcı görmez)
                if (import.meta.env.DEV) {
                  console.group('🔬 [Dashboard Diagnosis]', config.title);
                  console.log('Confidence Score:', confidencePercent + '%');
                  console.log('Risk Flags:', riskCount);
                  if (riskCount > 0) {
                    console.log('Risk Details:', config.diagnosis.riskFlags);
                  }
                  if (config.diagnosis.blockedAssumptions && config.diagnosis.blockedAssumptions.length > 0) {
                    console.log('Blocked Assumptions:', config.diagnosis.blockedAssumptions);
                  }
                  console.groupEnd();
                }
                
                // 🛡️ Diagnostics: Low confidence log (sessiz)
                if (confidence < 0.8) {
                  logLowConfidence(
                    undefined, // userId (config'de yok, opsiyonel)
                    undefined, // email
                    config.id,
                    confidence,
                    config.diagnosis.riskFlags
                  ).catch(() => {}); // Sessizce atla, UI etkilenmez
                }
                
                // Renk belirleme (korkutma yok - kırmızı YOK)
                let confidenceColor = '#6B7280'; // Gri (varsayılan)
                let confidenceBg = '#F3F4F6';
                let confidenceIcon = Info;
                
                if (confidence >= 0.85) {
                  confidenceColor = '#10B981'; // Yeşil
                  confidenceBg = '#ECFDF5';
                  confidenceIcon = CheckCircle2;
                } else if (confidence >= 0.60) {
                  confidenceColor = '#F59E0B'; // Sarı
                  confidenceBg = '#FFFBEB';
                }
                // <60 için gri kalır (korkutma yok)
                
                return (
                  <div 
                    className="confidence-indicator no-print"
                    style={{
                      marginBottom: '8px',
                      padding: '8px 12px',
                      background: confidenceBg,
                      border: `1px solid ${confidenceColor}20`,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: '#374151',
                    }}
                  >
                    <confidenceIcon size={16} style={{ color: confidenceColor, flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>
                      Veri Güveni: <strong style={{ color: confidenceColor }}>%{confidencePercent}</strong>
                    </span>
                    {riskCount > 0 && (
                      <span 
                        style={{ 
                          marginLeft: 'auto', 
                          color: '#6B7280',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'help',
                        }}
                        title={config.diagnosis.riskFlags?.map(r => `${r.code}: ${r.message}`).join('\n') || ''}
                      >
                        <AlertCircle size={14} />
                        <span>{riskCount} potansiyel varsayım</span>
                      </span>
                    )}
                  </div>
                );
              } catch (error) {
                // 🛡️ Hata durumunda bile render etmeye devam et
                console.warn('⚠️ Confidence indicator render hatası:', error);
                return null; // Sessizce atla
              }
            })()}

            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">{config.icon} {config.title}</h1>
                <p className="dashboard-subtitle">
                  {config.subtitle} | {dateRange === 'mtd' ? 'MTD' : dateRange === 'wtd' ? 'WTD' : 'YTD'} | {location === 'all' ? 'Tüm Lokasyonlar' : location}
                </p>
                {config.dataSource && (
                  <p className="dashboard-datasource">
                    <span>📊 Veri Kaynağı:</span>
                    <span>{config.dataSource}</span>
                  </p>
                )}
                <div className="filter-container no-print">
                  <select className="filter-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option value="mtd">📅 MTD</option>
                    <option value="wtd">📅 WTD</option>
                    <option value="ytd">📅 YTD</option>
                  </select>
                  <select className="filter-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="all">📍 Tüm Lokasyonlar</option>
                    <option value="kadikoy">📍 Kadıköy</option>
                    <option value="besiktas">📍 Beşiktaş</option>
                    <option value="taksim">📍 Taksim</option>
                  </select>
                </div>
              </div>
              <div className="dashboard-actions no-print">
                <button className="action-btn action-btn-blue" onClick={handleShare}>📤 Paylaş</button>
                <button className="action-btn action-btn-green" onClick={() => handleExport('excel')}>📊 Excel</button>
                <button className="action-btn action-btn-red" onClick={() => handleExport('pdf')}>📄 PDF</button>
              </div>
            </div>

            {/* 🛡️ Data Warning Banner */}
            {dataWarning && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">{dataWarning}</p>
                </div>
              </div>
            )}

            <div className="kpi-grid">
              {config.kpis.map((kpiConfig, idx) => {
                const kpiData = kpis[kpiConfig.id] || { value: 0, change: 0, placeholder: false };
                const IconComponent = getIconComponent(kpiConfig.icon);
                const isPlaceholder = kpiData.placeholder || (kpiData.value === 0 && !hasData);
                
                return (
                  <div key={idx} className={`kpi-card ${isPlaceholder ? 'opacity-60' : ''}`}>
                    <div className="kpi-header">
                      <div className="kpi-icon"><IconComponent size={16} /></div>
                      <div className="kpi-label">{kpiConfig.label}</div>
                    </div>
                    <div className="kpi-value">
                      {isPlaceholder ? (
                        <span className="text-gray-400 text-lg">—</span>
                      ) : (
                        formatValue(kpiData.value, kpiConfig.format)
                      )}
                    </div>
                    {!isPlaceholder && (
                      <div className={`kpi-change ${parseFloat(String(kpiData.change)) >= 0 ? 'positive' : 'negative'}`}>
                        {parseFloat(String(kpiData.change)) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(String(kpiData.change))).toFixed(1)}%
                      </div>
                    )}
                    <div className="kpi-insight">
                      {isPlaceholder ? 'Veri yükleniyor...' : kpiConfig.insight}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="charts-grid">
              {config.charts.map((chartConfig, idx) => {
                // 🛡️ Veri kontrolü
                const chartHasData = chartConfig.type === 'pie' 
                  ? (pieData && pieData.length > 0 && pieData.some((d: any) => d.value > 0))
                  : (chartData && chartData.length > 0 && chartData.some((d: any) => d.value !== undefined));
                
                return (
                  <div key={idx} className="chart-card">
                    <div className="chart-title">{chartConfig.title}</div>
                    <div className="chart-container">
                      {chartHasData ? (
                        <ResponsiveContainer width="100%" height="100%">
                          {chartConfig.type === 'line' && (
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                              <XAxis dataKey="name" tick={{fontSize:10}} />
                              <YAxis tick={{fontSize:10}} />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke={FINOPS_COLORS.primary} strokeWidth={3} />
                              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeDasharray="5 5" strokeWidth={2} />
                            </LineChart>
                          )}
                          {chartConfig.type === 'bar' && (
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                              <XAxis dataKey="name" tick={{fontSize:10}} />
                              <YAxis tick={{fontSize:10}} />
                              <Tooltip />
                              <Bar dataKey="value" fill={FINOPS_COLORS.chart1} />
                            </BarChart>
                          )}
                          {chartConfig.type === 'pie' && (
                            <PieChart>
                              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label={(e) => e.name}>
                                {pieData.map((entry: any, i: number) => (
                                  <Cell key={`cell-${i}`} fill={[FINOPS_COLORS.chart1,FINOPS_COLORS.chart2,FINOPS_COLORS.chart3,FINOPS_COLORS.chart4,FINOPS_COLORS.chart5][i%5]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          )}
                        </ResponsiveContainer>
                      ) : (
                        // 🛡️ Fail-soft: Veri yoksa açıklayıcı mesaj göster
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6">
                          <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-sm font-medium text-gray-600 text-center mb-1">
                            Grafik Verisi Mevcut Değil
                          </p>
                          <p className="text-xs text-gray-500 text-center">
                            Bu grafik için henüz veri yüklenmedi veya veri bulunamadı.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="chart-insight">
                      💡 <strong>Insight:</strong> {chartHasData ? chartConfig.insight : 'Veri yüklendiğinde insight gösterilecek.'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };
};

export default createFinopsDashboard;
