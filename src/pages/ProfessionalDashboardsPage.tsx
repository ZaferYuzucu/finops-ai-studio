import React, { useMemo, useRef, useState, useEffect } from 'react';
import { BarChart3, ArrowLeft, Download, Share2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeepSurveyPanel from '@/components/surveys/DeepSurveyPanel';
import { useSurvey } from '@/hooks/useSurvey';
import type { SectorType } from '@/types/survey';
import * as XLSX from 'xlsx';
import { exportElementToPdfA4 } from '@/utils/pdfExport';
import { copyToClipboard, createShareUrl } from '@/utils/shareLink';
import {
  RestaurantDashboardFinops,
  RestaurantSalesDashboard,
  RestaurantFinanceDashboard,
  RestaurantLaborDashboard,
  AutomotivTermostatDashboard,
  ManufacturingDashboard,
  QualityControlDashboard,
  InventoryDashboard,
  OEEDashboard,
  HotelOperationsDashboard,
  EcommerceDashboard,
  FinanceDashboard,
  CashFlowDashboard,
  HealthcareDashboard,
  AgricultureDashboard,
  LogisticsDashboard,
  EducationDashboard,
  EnergyDashboard,
  RetailDashboard,
  CallCenterDashboard,
  MarketingDashboard,
  HRDashboard,
  SupplyChainDashboard,
  ProjectManagementDashboard,
  CustomerServiceDashboard,
  SalesDashboard,
  ITOperationsDashboard,
  WebAnalyticsDashboard,
  FleetManagementDashboard,
  RealEstateDashboard,
  InsuranceDashboard,
  ConstructionDashboard,
  AutomotiveExecutiveDashboard,
  AutomotiveSalesDashboard,
  AutomotiveServiceDashboard
} from '../components/dashboards';
import { DASHBOARD_CATEGORIES, DASHBOARD_STATS } from '../config/dashboardCategoriesConfig';

// Sektörel kategoriler - Ortak config'den import edildi
// DASHBOARD_CATEGORIES artık ../config/dashboardCategoriesConfig.ts'den geliyor

const ProfessionalDashboardsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('restaurant');
  const [selectedDashboard, setSelectedDashboard] = useState<string>('restaurant-sales');
  const [showDeepSurvey, setShowDeepSurvey] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const exportRef = useRef<HTMLDivElement | null>(null);
  
  const { 
    profile, 
    trackDashboardView, 
    shouldShowDeepSurvey, 
    completeDeepSurvey,
    dismissDeepSurvey,
    markDeepSurveyOffered 
  } = useSurvey();

  // Track dashboard view and check if deep survey should be shown
  useEffect(() => {
    // Track dashboard view
    trackDashboardView();

    // Check if deep survey should be shown
    if (shouldShowDeepSurvey()) {
      setTimeout(() => {
        setShowDeepSurvey(true);
        markDeepSurveyOffered();
      }, 3000); // Show after 3 seconds of viewing
    }
  }, []);

  // Allow direct deep links like:
  // /professional-dashboards?category=manufacturing&dashboard=automotive-termostat
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const cat = params.get('category');
      const dash = params.get('dashboard');
      if (!cat && !dash) return;

      const safeCategory = cat && DASHBOARD_CATEGORIES[cat as keyof typeof DASHBOARD_CATEGORIES] ? cat : null;
      const safeDashboard =
        dash &&
        Object.values(DASHBOARD_CATEGORIES)
          .flatMap((c) => c.dashboards)
          .some((d) => d.id === dash)
          ? dash
          : null;

      if (safeCategory) setSelectedCategory(safeCategory);

      // Ensure dashboard belongs to the selected category when possible
      if (safeDashboard) {
        const effectiveCategory = safeCategory ?? selectedCategory;
        const existsInCat = DASHBOARD_CATEGORIES[effectiveCategory]?.dashboards?.some((d) => d.id === safeDashboard);
        if (existsInCat) setSelectedDashboard(safeDashboard);
        else if (!safeCategory) setSelectedDashboard(safeDashboard);
      } else if (safeCategory) {
        // If only category provided, select first dashboard
        const first = DASHBOARD_CATEGORIES[safeCategory]?.dashboards?.[0]?.id;
        if (first) setSelectedDashboard(first);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleDeepSurveyComplete = (answers: Record<string, string | string[]>) => {
    completeDeepSurvey(answers);
    setShowDeepSurvey(false);
  };

  const handleDeepSurveyDismiss = () => {
    dismissDeepSurvey();
    setShowDeepSurvey(false);
  };

  const handleExportPDF = async () => {
    const el = exportRef.current;
    if (!el) return;

    const fileName = `FINOPS_Dashboard_${selectedDashboard}_${new Date().toISOString().slice(0, 10)}.pdf`;
    setIsExportingPdf(true);
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    // Let ResponsiveContainer measure + render
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 700));
    window.dispatchEvent(new Event('resize'));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 150));

    try {
      await exportElementToPdfA4(el, {
        filename: fileName,
        orientation: 'landscape',
        renderAtA4Size: true,
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    // Template dashboards mostly render charts; we export the selection metadata as a usable workbook
    // (Demo dashboard exports real datasets on /dashboard/demo-preview).
    const metaRows = [
      { key: 'category', value: selectedCategory },
      { key: 'dashboard', value: selectedDashboard },
      { key: 'exportedAt', value: new Date().toISOString() },
    ];
    const wsMeta = XLSX.utils.json_to_sheet(metaRows);
    XLSX.utils.book_append_sheet(wb, wsMeta, 'Meta');

    const fileName = `FINOPS_Dashboard_${selectedDashboard}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleShareLink = async () => {
    const payload = {
      kind: 'template' as const,
      templateId: selectedDashboard,
      templateLabel: selectedDashboardLabel,
      categoryLabel: selectedCategoryLabel,
      generatedAtIso: new Date().toISOString(),
    };
    const url = createShareUrl(payload);
    void copyToClipboard(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const selectedCategoryLabel = DASHBOARD_CATEGORIES[selectedCategory]?.name ?? selectedCategory;
  const selectedDashboardLabel = useMemo(() => {
    const cat = DASHBOARD_CATEGORIES[selectedCategory];
    const found = cat?.dashboards?.find((d) => d.id === selectedDashboard);
    return found?.name ?? selectedDashboard;
  }, [selectedCategory, selectedDashboard]);

  const reportNote = useMemo(() => {
    const today = new Date();
    const fmt = (d: Date) =>
      d.toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return {
      dateRange: `${fmt(today)} – ${fmt(today)}`,
      currency: 'TRY (₺)',
      filters: `Kategori: ${selectedCategoryLabel} • Şablon: ${selectedDashboardLabel}`,
      source: 'Şablon Dashboard (print-ready)',
    };
  }, [selectedCategoryLabel, selectedDashboardLabel]);

  const renderSelectedDashboard = () => (
    <>
      {/* ✅ Restaurant & Kafe */}
      {selectedDashboard === 'restaurant-finops' && <RestaurantDashboardFinops />}
      {selectedDashboard === 'restaurant-sales' && <RestaurantSalesDashboard />}
      {selectedDashboard === 'restaurant-finance' && <RestaurantFinanceDashboard />}
      {selectedDashboard === 'restaurant-labor' && <RestaurantLaborDashboard />}
      
      {/* ✅ Üretim & Operasyon */}
      {selectedDashboard === 'automotive-termostat' && <AutomotivTermostatDashboard />}
      {selectedDashboard === 'manufacturing' && <ManufacturingDashboard />}
      {selectedDashboard === 'quality-control' && <QualityControlDashboard />}
      {selectedDashboard === 'oee' && <OEEDashboard />}
      
      {/* ✅ Finans & Muhasebe */}
      {selectedDashboard === 'finance' && <FinanceDashboard />}
      {selectedDashboard === 'cashflow' && <CashFlowDashboard />}
      
      {/* ✅ Otel & Konaklama */}
      {selectedDashboard === 'hotel-management' && <HotelOperationsDashboard />}
      {selectedDashboard === 'retail' && <RetailDashboard />}
      {selectedDashboard === 'energy' && <EnergyDashboard />}
      
      {/* ✅ E-Ticaret & Retail */}
      {selectedDashboard === 'ecommerce' && <EcommerceDashboard />}
      {selectedDashboard === 'inventory' && <InventoryDashboard />}
      
      {/* ✅ İnsan Kaynakları */}
      {selectedDashboard === 'hr' && <HRDashboard />}
      {selectedDashboard === 'supply-chain' && <SupplyChainDashboard />}
      
      {/* ✅ Automotive */}
      {selectedDashboard === 'automotive-executive' && <AutomotiveExecutiveDashboard />}
      {selectedDashboard === 'automotive-sales' && <AutomotiveSalesDashboard />}
      {selectedDashboard === 'automotive-service' && <AutomotiveServiceDashboard />}
      
      {/* ✅ Satış & Pazarlama */}
      {selectedDashboard === 'sales' && <SalesDashboard />}
      {selectedDashboard === 'marketing' && <MarketingDashboard />}
      {selectedDashboard === 'web-analytics' && <WebAnalyticsDashboard />}
      
      {/* ✅ Tarım */}
      {selectedDashboard === 'agriculture' && <AgricultureDashboard />}
      
      {/* ✅ Eğitim & Akademik */}
      {selectedDashboard === 'education' && <EducationDashboard />}
      {selectedDashboard === 'healthcare' && <HealthcareDashboard />}
      
      {/* ✅ Lojistik & Tedarik */}
      {selectedDashboard === 'logistics' && <LogisticsDashboard />}
      {selectedDashboard === 'fleet-management' && <FleetManagementDashboard />}
      
      {/* ✅ Hizmet Sektörü */}
      {selectedDashboard === 'call-center' && <CallCenterDashboard />}
      {selectedDashboard === 'customer-service' && <CustomerServiceDashboard />}
      {selectedDashboard === 'it-operations' && <ITOperationsDashboard />}
      
      {/* ✅ İnşaat & Enerji */}
      {selectedDashboard === 'construction' && <ConstructionDashboard />}
      {selectedDashboard === 'real-estate' && <RealEstateDashboard />}
      
      {/* ✅ Sigorta & Finans */}
      {selectedDashboard === 'insurance' && <InsuranceDashboard />}
      {selectedDashboard === 'project-management' && <ProjectManagementDashboard />}
      
      {/* Fallback - Eğer dashboard bulunamazsa */}
      {!['restaurant-finops', 'restaurant-sales', 'restaurant-finance', 'restaurant-labor',
          'automotive-termostat', 'manufacturing', 'quality-control', 'oee',
          'finance', 'cashflow', 'hotel-management', 'retail', 'energy',
          'ecommerce', 'inventory', 'hr', 'supply-chain',
          'automotive-executive', 'automotive-sales', 'automotive-service',
          'sales', 'marketing', 'web-analytics', 'agriculture',
          'education', 'healthcare', 'logistics', 'fleet-management',
          'call-center', 'customer-service', 'it-operations',
          'construction', 'real-estate', 'insurance', 'project-management'
      ].includes(selectedDashboard) && (
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Bulunamadı</h3>
          <p className="text-gray-600 mb-4">
            Seçili dashboard ID: <code className="bg-gray-100 px-2 py-1 rounded">{selectedDashboard}</code>
          </p>
          <p className="text-sm text-gray-500">
            Lütfen farklı bir dashboard seçin veya destek ile iletişime geçin.
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Deep Survey Panel - shown after dashboard view */}
      <DeepSurveyPanel
        isVisible={showDeepSurvey}
        sector={(profile.sector || 'other') as SectorType}
        onComplete={handleDeepSurveyComplete}
        onDismiss={handleDeepSurveyDismiss}
      />

      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Geri Dön</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profesyonel Dashboard Örnekleri
          </h1>
          <p className="text-gray-600">
            {DASHBOARD_STATS.totalDashboards} adet profesyonel dashboard, {DASHBOARD_STATS.totalCategories} sektör kategorisinde. Zengin CSV verileri ile beslenen, print-ready görseller.
          </p>
        </div>

        {/* Dashboard Content */}
        <div>
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <BarChart3 className="text-green-600" size={28} />
              Sektör ve Dashboard Seçimi
            </h2>
                <p className="text-gray-700 mb-4">
                  <strong>{DASHBOARD_STATS.totalDashboards} adet</strong> profesyonel dashboard, <strong>{DASHBOARD_STATS.totalCategories} sektör</strong> kategorisinde gruplandırılmış. 
                  Zengin CSV verileri ile beslenen, A4 print-ready, Recharts + Tailwind ile kodlanmış.
                </p>
            
            {/* Kategori Seçimi */}
            <div className="flex flex-wrap gap-3 mb-4">
              {Object.entries(DASHBOARD_CATEGORIES).map(([key, category]) => {
                const isActive = selectedCategory === key;
                let activeClass = 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50';
                
                if (isActive) {
                  if (category.color === 'green') activeClass = 'bg-green-600 text-white shadow-lg';
                  else if (category.color === 'blue') activeClass = 'bg-blue-600 text-white shadow-lg';
                  else if (category.color === 'purple') activeClass = 'bg-purple-600 text-white shadow-lg';
                  else if (category.color === 'amber') activeClass = 'bg-amber-600 text-white shadow-lg';
                  else if (category.color === 'orange') activeClass = 'bg-orange-600 text-white shadow-lg';
                  else if (category.color === 'teal') activeClass = 'bg-teal-600 text-white shadow-lg';
                  else if (category.color === 'red') activeClass = 'bg-red-600 text-white shadow-lg';
                  else if (category.color === 'indigo') activeClass = 'bg-indigo-600 text-white shadow-lg';
                  else if (category.color === 'lime') activeClass = 'bg-lime-600 text-white shadow-lg';
                  else if (category.color === 'cyan') activeClass = 'bg-cyan-600 text-white shadow-lg';
                  else if (category.color === 'emerald') activeClass = 'bg-emerald-600 text-white shadow-lg';
                  else if (category.color === 'rose') activeClass = 'bg-rose-600 text-white shadow-lg';
                  else if (category.color === 'yellow') activeClass = 'bg-yellow-600 text-white shadow-lg';
                  else if (category.color === 'slate') activeClass = 'bg-slate-600 text-white shadow-lg';
                }
                
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key);
                      setSelectedDashboard(category.dashboards[0].id);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeClass}`}
                  >
                    {category.icon} {category.name}
                  </button>
                );
              })}
            </div>

            {/* Seçili Kategorinin Dashboard'ları */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                {DASHBOARD_CATEGORIES[selectedCategory].icon} {DASHBOARD_CATEGORIES[selectedCategory].name} - Dashboard Seçimi:
              </h3>
              <div className="flex flex-wrap gap-2">
                {DASHBOARD_CATEGORIES[selectedCategory].dashboards.map((dashboard) => (
                  <button
                    key={dashboard.id}
                    onClick={() => setSelectedDashboard(dashboard.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedDashboard === dashboard.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dashboard.name}
                    {!dashboard.component && <span className="ml-2 text-xs">(Yakında)</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

            {/* Dashboard Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="text-sm text-gray-600">
              Seçili dashboard: <span className="font-semibold text-gray-900">{selectedDashboardLabel} ({selectedDashboard})</span>
              <div className="mt-1 text-[11px] text-gray-500">
                Dashboards and reports generated on FinOps AI Studio are proprietary
                and licensed for use only within this platform.
              </div>
            </div>
            <div className="text-xs text-indigo-600 font-medium px-3 py-1 bg-indigo-50 rounded-full">
              ✓ Dashboard aktif ve görünür
            </div>
          </div>

          {/* Dashboard Display */}
          <div className="bg-white rounded-xl shadow-2xl overflow-auto" style={{ maxHeight: '85vh', minHeight: '500px' }}>
            {/* Export target: during export we render a 2-page print layout */}
            <div ref={exportRef} className="w-full overflow-visible min-h-[400px]">
              {isExportingPdf ? (
                <div className="space-y-4">
                  {/* Page 1: scaled overview */}
                  <div className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-bold text-gray-900">Şablon Dashboard Raporu</div>
                        <div className="mt-1 text-[11px] text-gray-600">
                          {selectedCategoryLabel} • {selectedDashboardLabel} • {reportNote.dateRange}
                        </div>
                      </div>
                      <div className="text-[11px] text-gray-500">PDF (A4 Yatay)</div>
                    </div>

                    {/* Fit the whole selected dashboard into ONE page */}
                    <div className="mt-3 border border-gray-200 rounded-lg p-2" data-pdf-fit="one-page">
                      {renderSelectedDashboard()}
                    </div>
                  </div>

                  {/* Page break */}
                  <div style={{ breakBefore: 'page', pageBreakBefore: 'always' as any }} />

                  {/* Page 2: notes + metadata */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                      <div className="text-sm font-semibold text-gray-800 mb-2">📝 Veri Notu</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700">
                        <div><span className="font-semibold">Tarih aralığı:</span> {reportNote.dateRange}</div>
                        <div><span className="font-semibold">Para birimi:</span> {reportNote.currency}</div>
                        <div><span className="font-semibold">Filtreler:</span> {reportNote.filters}</div>
                        <div><span className="font-semibold">Veri kaynağı:</span> {reportNote.source}</div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-3">
                      <div className="text-sm font-semibold text-gray-900 mb-2">📋 Rapor Özeti</div>
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full text-[11px]">
                          <tbody>
                            <tr className="border-t border-gray-100">
                              <td className="px-2 py-1.5 text-gray-600 font-semibold">Kategori</td>
                              <td className="px-2 py-1.5 text-gray-900">{selectedCategoryLabel}</td>
                            </tr>
                            <tr className="border-t border-gray-100">
                              <td className="px-2 py-1.5 text-gray-600 font-semibold">Dashboard</td>
                              <td className="px-2 py-1.5 text-gray-900">{selectedDashboardLabel}</td>
                            </tr>
                            <tr className="border-t border-gray-100">
                              <td className="px-2 py-1.5 text-gray-600 font-semibold">Format</td>
                              <td className="px-2 py-1.5 text-gray-900">A4 Yatay PDF (Overview + Notlar)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-2 text-[11px] text-gray-500">
                        Not: Bu şablon rapor, dashboard’ı tek sayfaya sığdıracak şekilde ölçekler. Bazı dashboard’larda okunabilirlik için zoom önerilebilir.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                renderSelectedDashboard()
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>ℹ️ Bilgi:</strong> Toplam <strong>{DASHBOARD_STATS.totalDashboards} dashboard</strong> | 
              <strong> {DASHBOARD_STATS.totalCategories} sektör kategorisi</strong> | 
              <strong> 20+ zengin CSV dosyası</strong> | 
              Standart boyut: %98 genişlik, 1800px max | 
              Detaylar: <code className="bg-blue-100 px-2 py-1 rounded">DASHBOARD_STANDARDS.md</code>
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>🍽️ Restoran: 5 | 🏭 Üretim: 4 | 💰 Finans: 5</div>
              <div>🏨 Otel: 3 | 🛒 E-ticaret: 3 | 👥 İK: 2</div>
              <div>🚗 Otomotiv: 2 | 📊 Satış: 3 | 🌾 Tarım: 2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfessionalDashboardsPage;

