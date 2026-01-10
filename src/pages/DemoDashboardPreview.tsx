import React, { useMemo, useRef, useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Download, Sparkles, Lightbulb, Target, Share2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { exportElementToPdfA4 } from '@/utils/pdfExport';
import { copyToClipboard, createShareUrl } from '@/utils/shareLink';

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

// Static KPI (for PDF/print so values are stable and fit tightly)
const StaticKPICard: React.FC<{
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: any;
  trend: string;
}> = ({ label, value, suffix = '', prefix = '', icon: Icon, trend }) => {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="text-blue-600" size={16} />
          <span className="text-[11px] text-gray-600">{label}</span>
        </div>
        <span className={`text-[11px] font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <div className="mt-1 text-lg font-bold text-gray-900">
        {prefix}{value.toLocaleString('tr-TR')}{suffix}
      </div>
    </div>
  );
};

const DemoDashboardPreview: React.FC = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const exportRef = useRef<HTMLDivElement | null>(null);

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

  const formatCurrency = (value: number) =>
    `₺${Math.round(value).toLocaleString('tr-TR')}`;

  const formatPercent = (value: number) =>
    `%${value.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}`;

  const dailyStats = useMemo(() => {
    const values = dailyData.map((d) => d.gelir);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const last = values[values.length - 1] ?? 0;
    return { min, max, avg, last };
  }, [dailyData]);

  const categoryTotal = useMemo(
    () => categoryData.reduce((sum, c) => sum + c.value, 0),
    [categoryData],
  );

  const reportNote = useMemo(() => {
    // Mock weekly window (for demo); in real dashboards this comes from filters.
    const today = new Date();
    const end = new Date(today);
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    const fmt = (d: Date) =>
      d.toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return {
      dateRange: `${fmt(start)} – ${fmt(end)}`,
      currency: 'TRY (₺)',
      filters: 'Demo veri seti (filtre yok)',
      source: 'Mock / Demo (yerel)',
    };
  }, []);

  const shortName = (name: string) => {
    if (name.length <= 12) return name;
    return `${name.slice(0, 12)}…`;
  };

  // PDF Export Handler
  const handleExportPDF = async () => {
    const el = exportRef.current;
    if (!el) return;

    // Switch to "print mode" so PDFs include labels + micro tables.
    setIsExportingPdf(true);
    // Give React time to render the print-only DOM before capture.
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    // Recharts ResponsiveContainer measures size asynchronously (ResizeObserver).
    // Give it a short moment, then trigger a resize so charts compute dimensions.
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 600));
    window.dispatchEvent(new Event('resize'));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 150));

    const fileName = `FINOPS_Dashboard_Demo_${new Date().toISOString().slice(0, 10)}.pdf`;
    try {
      await exportElementToPdfA4(el, {
        filename: fileName,
        orientation: 'landscape',
        renderAtA4Size: true
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleShareLink = async () => {
    const payload = {
      kind: 'demo' as const,
      title: 'FinOps Yönetici Dashboard (Demo)',
      generatedAtIso: new Date().toISOString(),
      note: {
        dateRange: reportNote.dateRange,
        currency: reportNote.currency,
        source: reportNote.source,
      },
      kpis: [
        { label: 'Toplam Gelir', value: 229828, prefix: '₺', trend: '+23%' },
        { label: 'Toplam Sipariş', value: 2382, trend: '+18%' },
        { label: 'Ortalama Sipariş', value: 96, prefix: '₺', trend: '+5%' },
        { label: 'Net Kar', value: 83141, prefix: '₺', trend: '+27%' },
      ],
      dailyData,
      categoryData,
      productData,
    };

    const url = createShareUrl(payload);
    // Copy (best effort) + open in a new tab.
    void copyToClipboard(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Excel Export Handler
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    const wsDaily = XLSX.utils.json_to_sheet(dailyData);
    XLSX.utils.book_append_sheet(wb, wsDaily, 'Gunluk');

    const wsProducts = XLSX.utils.json_to_sheet(productData);
    XLSX.utils.book_append_sheet(wb, wsProducts, 'Urunler');

    const wsCategories = XLSX.utils.json_to_sheet(
      categoryData.map(({ name, value }) => ({ name, value }))
    );
    XLSX.utils.book_append_sheet(wb, wsCategories, 'Kategoriler');

    const wsInsights = XLSX.utils.json_to_sheet(
      aiInsights.map((i) => ({ title: i.title, description: i.description }))
    );
    XLSX.utils.book_append_sheet(wb, wsInsights, 'AI_Icgoruler');

    const fileName = `FINOPS_Dashboard_Demo_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div ref={exportRef} className="max-w-full mx-auto space-y-6">
        {/* ============================================================
            PDF (Print) layout: 2 pages
            - Page 1: KPI + compressed multi-chart overview (A4 landscape)
            - Page 2: micro tables + data note (+ optional AI insights)
           ============================================================ */}
        {isExportingPdf ? (
          <div className="space-y-4">
            {/* Page 1 (compressed dashboard wall) */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-bold text-gray-900">FinOps Yönetici Raporu (Demo)</div>
                  <div className="mt-1 text-[11px] text-gray-600">
                    Tarih: {reportNote.dateRange} • Para birimi: {reportNote.currency} • Kaynak: {reportNote.source}
                  </div>
                </div>
                <div className="text-[11px] text-gray-500">
                  PDF (A4 Yatay)
                </div>
              </div>

              {/* KPI strip */}
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                <StaticKPICard label="Toplam Gelir" value={229828} prefix="₺" icon={DollarSign} trend="+23%" />
                <StaticKPICard label="Toplam Sipariş" value={2382} icon={ShoppingCart} trend="+18%" />
                <StaticKPICard label="Ortalama Sipariş" value={96} prefix="₺" icon={TrendingUp} trend="+5%" />
                <StaticKPICard label="Net Kar" value={83141} prefix="₺" icon={DollarSign} trend="+27%" />
              </div>

              {/* Compressed charts */}
              <div className="mt-3 grid grid-cols-12 gap-2">
                {/* Area chart */}
                <div className="col-span-12 lg:col-span-7 bg-white border border-gray-200 rounded-lg p-2">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="text-sm font-semibold text-gray-800">📈 Günlük Gelir Trendi</div>
                    <div className="text-[11px] text-gray-600">
                      Son {formatCurrency(dailyStats.last)} • Ort {formatCurrency(dailyStats.avg)} • Min {formatCurrency(dailyStats.min)} • Max {formatCurrency(dailyStats.max)}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={175}>
                    <AreaChart data={dailyData}>
                      <defs>
                        <linearGradient id="colorGelir_print" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.75}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Area type="monotone" dataKey="gelir" stroke="#3B82F6" fillOpacity={1} fill="url(#colorGelir_print)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie + list (so it fits and shows % + adet without clutter) */}
                <div className="col-span-12 lg:col-span-5 bg-white border border-gray-200 rounded-lg p-2">
                  <div className="text-sm font-semibold text-gray-800 mb-2">🥧 Kategori Dağılımı</div>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="h-[175px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={38}
                            outerRadius={70}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-print-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2">
                      {categoryData.map((c) => {
                        const pct = categoryTotal ? (c.value / categoryTotal) * 100 : 0;
                        return (
                          <div key={c.name} className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2">
                              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} />
                              <span className="text-gray-700">{c.name}</span>
                            </div>
                            <div className="text-gray-900 font-semibold">
                              {formatPercent(pct)} ({c.value})
                            </div>
                          </div>
                        );
                      })}
                      <div className="pt-1 text-[10px] text-gray-500">(% + adet)</div>
                    </div>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="col-span-12 bg-white border border-gray-200 rounded-lg p-2">
                  <div className="text-sm font-semibold text-gray-800 mb-2">📊 Ürün Performansı (Gelir)</div>
                  <ResponsiveContainer width="100%" height={190}>
                    <BarChart data={[...productData].sort((a, b) => b.gelir - a.gelir).slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => (typeof v === 'string' ? shortName(v) : String(v))}
                        interval={0}
                        height={45}
                      />
                      <YAxis />
                      <Bar dataKey="gelir" fill="#10B981" radius={[8, 8, 0, 0]}>
                        <LabelList
                          dataKey="gelir"
                          position="top"
                          formatter={(v: unknown) => (typeof v === 'number' ? formatCurrency(v) : '')}
                          style={{ fontSize: 9, fill: '#065f46' }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Page break */}
            <div style={{ breakBefore: 'page', pageBreakBefore: 'always' as any }} />

            {/* Page 2 (details) */}
            <div className="space-y-4">
              {/* Micro tables (the most read section in PDF) */}
              <div className="pdf-avoid-break">
                <div className="text-sm font-semibold text-gray-900 mb-2">📋 Detay Tablolar</div>
                <div className="text-[11px] text-gray-600">
                  Bu sayfa, CFO’nun sayıları hızlı kontrol etmesi için tasarlanmıştır.
                </div>
              </div>

              {/* Details in 2 columns so it fits one page */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 lg:col-span-7">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Gün Bazında Gelir</div>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-[11px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-2 py-1.5 font-semibold text-gray-700">Gün</th>
                          <th className="text-right px-2 py-1.5 font-semibold text-gray-700">Gelir</th>
                          <th className="text-right px-2 py-1.5 font-semibold text-gray-700">Sipariş</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyData.map((d) => (
                          <tr key={d.day} className="border-t border-gray-100">
                            <td className="px-2 py-1.5 text-gray-700">{d.day}</td>
                            <td className="px-2 py-1.5 text-right text-gray-900 font-medium">{formatCurrency(d.gelir)}</td>
                            <td className="px-2 py-1.5 text-right text-gray-700">{d.siparis.toLocaleString('tr-TR')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-5 space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-700 mb-2">Kategori Payları</div>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full text-[11px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-2 py-1.5 font-semibold text-gray-700">Kategori</th>
                            <th className="text-right px-2 py-1.5 font-semibold text-gray-700">Adet</th>
                            <th className="text-right px-2 py-1.5 font-semibold text-gray-700">Pay</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryData.map((c) => {
                            const pct = categoryTotal ? (c.value / categoryTotal) * 100 : 0;
                            return (
                              <tr key={c.name} className="border-t border-gray-100">
                                <td className="px-2 py-1.5 text-gray-700">{c.name}</td>
                                <td className="px-2 py-1.5 text-right text-gray-900 font-medium">{c.value}</td>
                                <td className="px-2 py-1.5 text-right text-gray-700">{formatPercent(pct)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-700 mb-2">Top 5 Ürün (Gelir)</div>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full text-[11px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-2 py-1.5 font-semibold text-gray-700">Ürün</th>
                            <th className="text-right px-2 py-1.5 font-semibold text-gray-700">Gelir</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...productData]
                            .sort((a, b) => b.gelir - a.gelir)
                            .slice(0, 5)
                            .map((p) => (
                              <tr key={p.name} className="border-t border-gray-100">
                                <td className="px-2 py-1.5 text-gray-700">{shortName(p.name)}</td>
                                <td className="px-2 py-1.5 text-right text-gray-900 font-medium">{formatCurrency(p.gelir)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data note (compact) */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">📝 Veri Notu</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700">
                  <div><span className="font-semibold">Tarih aralığı:</span> {reportNote.dateRange}</div>
                  <div><span className="font-semibold">Para birimi:</span> {reportNote.currency}</div>
                  <div><span className="font-semibold">Filtreler:</span> {reportNote.filters}</div>
                  <div><span className="font-semibold">Veri kaynağı:</span> {reportNote.source}</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Live UI (hidden during PDF export to keep PDF to 2 pages) */}
        {!isExportingPdf && (
        <div className="pdf-avoid-break mb-6 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200 animate-pulse">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="text-yellow-500" size={32} />
                Dashboard Başarıyla Oluşturuldu!
              </h1>
              <p className="text-gray-600 mt-1">Verileriniz analiz edildi ve görselleştirildi 🎊</p>
              <p className="mt-2 text-[11px] text-gray-500">
                Dashboards and reports generated on FinOps AI Studio are proprietary
                and licensed for use only within this platform.
              </p>
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
                onClick={handleShareLink}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                <Share2 size={18} />
                <span>Paylaş (View-only)</span>
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
        )}

        {/* 📊 KPI Cards with Counting Animation */}
        {!isExportingPdf && (
        <div className="pdf-avoid-break grid grid-cols-2 md:grid-cols-4 gap-4">
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
        )}

        {/* 📈 Charts with Fade-in Animation */}
        {!isExportingPdf && (
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 ${
            showCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Daily Revenue */}
          <div className="pdf-avoid-break bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📈 Günlük Gelir Trendi</h3>
            {isExportingPdf && (
              <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                  <span className="font-semibold">Son:</span> {formatCurrency(dailyStats.last)} &nbsp;|&nbsp;
                  <span className="font-semibold">Ortalama:</span> {formatCurrency(dailyStats.avg)}
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                  <span className="font-semibold">Min:</span> {formatCurrency(dailyStats.min)} &nbsp;|&nbsp;
                  <span className="font-semibold">Max:</span> {formatCurrency(dailyStats.max)}
                </div>
              </div>
            )}
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

            {isExportingPdf && (
              <div className="mt-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">Mikro Tablo — Gün Bazında Gelir</div>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-3 py-2 font-semibold text-gray-700">Gün</th>
                        <th className="text-right px-3 py-2 font-semibold text-gray-700">Gelir</th>
                        <th className="text-right px-3 py-2 font-semibold text-gray-700">Sipariş</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyData.map((d) => (
                        <tr key={d.day} className="border-t border-gray-100">
                          <td className="px-3 py-2 text-gray-700">{d.day}</td>
                          <td className="px-3 py-2 text-right text-gray-900 font-medium">{formatCurrency(d.gelir)}</td>
                          <td className="px-3 py-2 text-right text-gray-700">{d.siparis.toLocaleString('tr-TR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Category Distribution */}
          <div className="pdf-avoid-break bg-white rounded-xl p-6 shadow-sm border border-gray-200">
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
                  label={
                    isExportingPdf
                      ? ({ name, value }: { name?: string; value?: number }) => {
                          const v = typeof value === 'number' ? value : 0;
                          const pct = categoryTotal ? (v / categoryTotal) * 100 : 0;
                          return `${name ?? ''} ${formatPercent(pct)} (${v})`;
                        }
                      : false
                  }
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

            {isExportingPdf && (
              <div className="mt-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">Mikro Tablo — Kategori Payları</div>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-3 py-2 font-semibold text-gray-700">Kategori</th>
                        <th className="text-right px-3 py-2 font-semibold text-gray-700">Adet</th>
                        <th className="text-right px-3 py-2 font-semibold text-gray-700">Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.map((c) => {
                        const pct = categoryTotal ? (c.value / categoryTotal) * 100 : 0;
                        return (
                          <tr key={c.name} className="border-t border-gray-100">
                            <td className="px-3 py-2 text-gray-700">{c.name}</td>
                            <td className="px-3 py-2 text-right text-gray-900 font-medium">{c.value}</td>
                            <td className="px-3 py-2 text-right text-gray-700">{formatPercent(pct)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Product Performance */}
        {!isExportingPdf && (
        <div 
          className={`pdf-avoid-break bg-white rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-1000 ${
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
              >
                {isExportingPdf && (
                  <LabelList
                    dataKey="gelir"
                    position="top"
                    formatter={(v: unknown) => (typeof v === 'number' ? formatCurrency(v) : '')}
                    style={{ fontSize: 10, fill: '#065f46' }}
                  />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {isExportingPdf && (
            <div className="mt-4">
              <div className="text-xs font-semibold text-gray-700 mb-2">Mikro Tablo — Top 5 Ürün (Gelir)</div>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Ürün</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Sipariş</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Gelir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...productData]
                      .sort((a, b) => b.gelir - a.gelir)
                      .slice(0, 5)
                      .map((p) => (
                        <tr key={p.name} className="border-t border-gray-100">
                          <td className="px-3 py-2 text-gray-700">{p.name}</td>
                          <td className="px-3 py-2 text-right text-gray-700">{p.siparis.toLocaleString('tr-TR')}</td>
                          <td className="px-3 py-2 text-right text-gray-900 font-medium">{formatCurrency(p.gelir)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        )}

        {/* 🤖 AI Insights with Slide-in Animation */}
        {!isExportingPdf && showAIInsights && (
          <div className="pdf-avoid-break bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 animate-fade-in">
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

        {/* Data note (PDFs must be self-explanatory) */}
        {!isExportingPdf && (
          <div className="pdf-avoid-break mt-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-800 mb-2">📝 Veri Notu</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
              <div><span className="font-semibold">Tarih aralığı:</span> {reportNote.dateRange}</div>
              <div><span className="font-semibold">Para birimi:</span> {reportNote.currency}</div>
              <div><span className="font-semibold">Filtreler:</span> {reportNote.filters}</div>
              <div><span className="font-semibold">Veri kaynağı:</span> {reportNote.source}</div>
            </div>
            <div className="mt-2 text-[11px] text-gray-500">
              Not: PDF statiktir; tooltip/hover yerine grafik etiketleri ve mikro tablolar kullanılır.
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

