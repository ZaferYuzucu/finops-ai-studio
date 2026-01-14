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
  RestaurantDashboard,
  RestaurantOperationsDashboard,
  RestaurantSalesDashboard,
  RestaurantFinanceDashboard,
  RestaurantLaborDashboard,
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
import AutomotivTermostatDashboard from './dashboards/AutomotivTermostatDashboard';

// Sektörel kategoriler ve dashboard'lar
const DASHBOARD_CATEGORIES = {
  restaurant: {
    icon: '🍽️',
    name: 'Restoran & Kafe',
    color: 'green',
    dashboards: [
      { id: 'restaurant-general', name: 'Genel Kontrol Paneli', component: 'RestaurantDashboard' },
      { id: 'restaurant-operations', name: 'Operasyon Paneli', component: 'RestaurantOperationsDashboard' },
      { id: 'restaurant-sales', name: 'Satış Göstergeleri', component: 'RestaurantSalesDashboard' },
      { id: 'restaurant-finance', name: 'Finansal Performans', component: 'RestaurantFinanceDashboard' },
      { id: 'restaurant-labor', name: 'İşgücü Yönetimi', component: 'RestaurantLaborDashboard' },
    ]
  },
  manufacturing: {
    icon: '🏭',
    name: 'Üretim & Operasyon',
    color: 'blue',
    dashboards: [
      { id: 'manufacturing-control', name: 'Üretim Kontrol', component: 'ManufacturingDashboard' },
      { id: 'quality-control', name: 'Kalite Kontrol', component: 'QualityControlDashboard' },
      { id: 'inventory-management', name: 'Stok Yönetimi', component: 'InventoryDashboard' },
      { id: 'oee-dashboard', name: 'OEE Dashboard', component: 'OEEDashboard' },
      { id: 'automotive-termostat', name: 'Otomotiv Termostat Üretim', component: 'AutomotivTermostatDashboard' },
    ]
  },
  finance: {
    icon: '💰',
    name: 'Finans & Muhasebe',
    color: 'purple',
    dashboards: [
      { id: 'finance-cfo', name: 'CFO Kontrol Paneli', component: 'FinanceDashboard' },
      { id: 'cash-flow', name: 'Nakit Akışı', component: 'CashFlowDashboard' },
      { id: 'profit-loss', name: 'Kâr-Zarar Analizi', component: 'HealthcareDashboard' },
      { id: 'budget-actual', name: 'Bütçe & Gerçekleşen', component: 'LogisticsDashboard' },
      { id: 'ceo-dashboard', name: 'CEO Dashboard', component: 'EducationDashboard' },
    ]
  },
  hotel: {
    icon: '🏨',
    name: 'Otel & Konaklama',
    color: 'amber',
    dashboards: [
      { id: 'hotel-management', name: 'Otel Yönetim Paneli', component: 'HotelOperationsDashboard' },
      { id: 'hotel-occupancy', name: 'Doluluk & Gelir', component: 'EnergyDashboard' },
      { id: 'hotel-guest', name: 'Misafir Deneyimi', component: 'RetailDashboard' },
    ]
  },
  ecommerce: {
    icon: '🛒',
    name: 'E-Ticaret & Retail',
    color: 'orange',
    dashboards: [
      { id: 'ecommerce-kpi', name: 'E-ticaret KPI', component: 'EcommerceDashboard' },
      { id: 'ecommerce-orders', name: 'Sipariş Analizi', component: 'CallCenterDashboard' },
      { id: 'ecommerce-products', name: 'Ürün Performansı', component: 'MarketingDashboard' },
    ]
  },
  hr: {
    icon: '👥',
    name: 'İnsan Kaynakları',
    color: 'teal',
    dashboards: [
      { id: 'hr-metrics', name: 'İK Metrikleri', component: 'HRDashboard' },
      { id: 'hr-performance', name: 'Performans Yönetimi', component: 'SupplyChainDashboard' },
    ]
  },
  automotive: {
    icon: '🚗',
    name: 'Otomotiv',
    color: 'red',
    dashboards: [
      { id: 'automotive-executive', name: 'Yönetici Özeti', component: 'AutomotiveExecutiveDashboard' },
      { id: 'automotive-sales', name: 'Satış Performansı', component: 'AutomotiveSalesDashboard' },
      { id: 'automotive-service', name: 'Servis & After-Sales', component: 'AutomotiveServiceDashboard' },
    ]
  },
  sales: {
    icon: '📊',
    name: 'Satış & Pazarlama',
    color: 'indigo',
    dashboards: [
      { id: 'sales-team', name: 'Satış Ekibi Performansı', component: 'SalesDashboard' },
      { id: 'marketing-campaign', name: 'Kampanya Analizi', component: 'ITOperationsDashboard' },
      { id: 'sales-funnel', name: 'Satış Hunisi', component: 'WebAnalyticsDashboard' },
    ]
  },
  agriculture: {
    icon: '🌾',
    name: 'Tarım',
    color: 'lime',
    dashboards: [
      { id: 'agriculture-operations', name: 'Tarım Operasyonları', component: 'AgricultureDashboard' },
      { id: 'agriculture-harvest', name: 'Hasat Yönetimi', component: 'FleetManagementDashboard' },
    ]
  },
  education: {
    icon: '🎓',
    name: 'Eğitim & Akademik',
    color: 'cyan',
    dashboards: [
      { id: 'education-performance', name: 'Eğitim Performans Paneli', component: 'EducationDashboard' },
    ]
  }
};

const ProfessionalDashboardsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('restaurant');
  const [selectedDashboard, setSelectedDashboard] = useState<string>('restaurant-general');
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
      {/* Restoran Dashboards */}
      {selectedDashboard === 'restaurant-general' && <RestaurantDashboard />}
      {selectedDashboard === 'restaurant-operations' && <RestaurantOperationsDashboard />}
      {selectedDashboard === 'restaurant-sales' && <RestaurantSalesDashboard />}
      {selectedDashboard === 'restaurant-finance' && <RestaurantFinanceDashboard />}
      {selectedDashboard === 'restaurant-labor' && <RestaurantLaborDashboard />}
      
      {/* Manufacturing Dashboards */}
      {selectedDashboard === 'manufacturing-control' && <ManufacturingDashboard />}
      {selectedDashboard === 'quality-control' && <QualityControlDashboard />}
      {selectedDashboard === 'inventory-management' && <InventoryDashboard />}
      {selectedDashboard === 'oee-dashboard' && <OEEDashboard />}
      {selectedDashboard === 'automotive-termostat' && <AutomotivTermostatDashboard />}
      {selectedDashboard === 'automotive-executive' && <AutomotiveExecutiveDashboard />}
      {selectedDashboard === 'automotive-sales' && <AutomotiveSalesDashboard />}
      {selectedDashboard === 'automotive-service' && <AutomotiveServiceDashboard />}

      {/* Finance Dashboards */}
      {selectedDashboard === 'finance-cfo' && <FinanceDashboard />}
      {selectedDashboard === 'cash-flow' && <CashFlowDashboard />}
      
      {/* Hotel & E-commerce */}
      {selectedDashboard === 'hotel-management' && <HotelOperationsDashboard />}
      {selectedDashboard === 'ecommerce-kpi' && <EcommerceDashboard />}
      
      {/* Healthcare & Agriculture */}
      {selectedDashboard === 'healthcare-kpi' && <HealthcareDashboard />}
      {selectedDashboard === 'agriculture-kpi' && <AgricultureDashboard />}
      
      {/* Logistics & Education */}
      {selectedDashboard === 'logistics-kpi' && <LogisticsDashboard />}
      {selectedDashboard === 'education-performance' && <EducationDashboard />}
      
      {/* Energy & Retail */}
      {selectedDashboard === 'energy-kpi' && <EnergyDashboard />}
      {selectedDashboard === 'retail-kpi' && <RetailDashboard />}
      
      {/* Call Center & Marketing */}
      {selectedDashboard === 'callcenter-kpi' && <CallCenterDashboard />}
      {selectedDashboard === 'marketing-kpi' && <MarketingDashboard />}
      
      {/* HR & Supply Chain */}
      {selectedDashboard === 'hr-metrics' && <HRDashboard />}
      {selectedDashboard === 'supplychain-kpi' && <SupplyChainDashboard />}
      
      {/* Project Management & Customer Service */}
      {selectedDashboard === 'project-kpi' && <ProjectManagementDashboard />}
      {selectedDashboard === 'customerservice-kpi' && <CustomerServiceDashboard />}
      
      {/* Sales & IT */}
      {selectedDashboard === 'sales-kpi' && <SalesDashboard />}
      {selectedDashboard === 'it-ops' && <ITOperationsDashboard />}
      
      {/* Web Analytics & Fleet */}
      {selectedDashboard === 'web-analytics' && <WebAnalyticsDashboard />}
      {selectedDashboard === 'fleet-kpi' && <FleetManagementDashboard />}
      
      {/* Real Estate & Insurance */}
      {selectedDashboard === 'realestate-kpi' && <RealEstateDashboard />}
      {selectedDashboard === 'insurance-kpi' && <InsuranceDashboard />}
      
      {/* Construction */}
      {selectedDashboard === 'construction-kpi' && <ConstructionDashboard />}
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
            30 adet profesyonel dashboard, 10 sektör kategorisinde. Zengin CSV verileri ile beslenen, print-ready görseller.
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
              <strong>30 adet</strong> profesyonel dashboard, <strong>10 sektör</strong> kategorisinde gruplandırılmış. 
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

          {/* Export actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="text-sm text-gray-600">
              Seçili dashboard: <span className="font-semibold text-gray-900">{selectedDashboard}</span>
              <div className="mt-1 text-[11px] text-gray-500">
                Dashboards and reports generated on FinOps AI Studio are proprietary
                and licensed for use only within this platform.
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportPDF}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
              >
                <Download size={18} />
                <span>PDF İndir (A4 Yatay)</span>
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

          {/* Dashboard Display */}
          <div className="bg-white rounded-xl shadow-2xl overflow-auto" style={{ maxHeight: '85vh' }}>
            {/* Export target: during export we render a 2-page print layout */}
            <div ref={exportRef} className="w-full overflow-visible">
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
              <strong>ℹ️ Bilgi:</strong> Toplam <strong>29 dashboard</strong> | 
              <strong> 9 sektör kategorisi</strong> | 
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

