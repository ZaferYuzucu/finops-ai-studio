
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import LoadingSpinner from './components/LoadingSpinner';

// Sayfaları ve Bileşenleri Import Et
import HeroPage from './pages/HeroPage';
import PricingPage from './pages/PricingPage';
import FinancialDataAnalysisPage from './pages/solutions/FinansalVeriAnaliziPage';
import CostInventoryManagementPage from './pages/solutions/MaliyetVeStokYonetimiPage';
import CashFlowPage from './pages/solutions/NakitAkisiPage';
import BudgetPlanningPage from './pages/solutions/ButceVePlanlamaPage';
import HRPayrollPerformancePage from './pages/solutions/IKBordoPerformansPage';
import DataVisualizationDashboardExamplesPage from './pages/solutions/DataVisualizationDashboardExamplesPage';
import DataVisualizationFeaturesPage from './pages/solutions/DataVisualizationFeaturesPage';
import DataVisualizationSupportPage from './pages/solutions/DataVisualizationSupportPage';
import DashboardDetailPage from './pages/solutions/DashboardDetailPage';
import BlogPage from './pages/BlogPage';
import WhatIsFinopsPage from './pages/blog/WhatIsFinopsPage';
import BringingTeamsTogetherPage from './pages/blog/BringingTeamsTogetherPage';
import DataDrivenDecisionsPage from './pages/blog/DataDrivenDecisionsPage';
import DocsPage from './pages/DocsPage';
import GetStartedDocPage from './pages/docs/GetStartedDocPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BrandKitPage from './pages/BrandKitPage'; // ✅ DÜZELTİLDİ - Eksik asset'ler kaldırıldı
import ProjectActivityReportPage from './pages/ProjectActivityReportPage';
// import IllustrationDemoPage from './pages/IllustrationDemoPage'; // ❌ HATALI DOSYA - GEÇİCİ OLARAK KAPALI
// import UndrawComparisonPage from './pages/UndrawComparisonPage'; // ❌ HATALI DOSYA - GEÇİCİ OLARAK KAPALI
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from './pages/legal/TermsOfServicePage';
import CookiePolicyPage from './pages/legal/CookiePolicyPage';
import DataGuidePage from './pages/DataGuidePage';
import DataImportPage from './pages/DataImportPage';
import UserJourneyMapPage from './pages/UserJourneyMapPage';
import DemoDashboardPreview from './pages/DemoDashboardPreview';
import VeriHazirlamaRehberiPage from './pages/VeriHazirlamaRehberiPage'; 
import VeriKaynaklariPage from './pages/VeriKaynaklariPage';
import AIVeriAnaliziPage from './pages/AIVeriAnaliziPage';
import VeriGorsellestirmePage from './pages/VeriGorsellestirmePage';
import NotFoundPage from './pages/NotFoundPage';
import PaymentCheckoutPage from './pages/PaymentCheckoutPage';
import DataSecurityPage from './pages/DataSecurityPage';

// Koruma Bileşenleri ve Korunan Sayfalar
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import ProfessionalDashboardsPage from './pages/ProfessionalDashboardsPage';
import AdminPanelPage from './pages/AdminPanelPage';
import NewsletterPanelPage from './pages/admin/NewsletterPanelPage';
import PlatformAnalyticsPage from './pages/admin/PlatformAnalyticsPage';
import PlatformAnalyticsDashboard from './pages/admin/PlatformAnalyticsDashboard';
import PaymentGuideAdminPage from './pages/admin/PaymentGuideAdminPage';
import CSVLibraryPage from './pages/admin/CSVLibraryPage';
import FinOpsTheatrePage from './pages/FinOpsTheatrePage';
import BusinessPlanPage from './pages/BusinessPlanPage';
import MarketingPlanPage from './pages/MarketingPlanPage';
import LaunchRoadmapPage from './pages/LaunchRoadmapPage';
import InvestorPresentationPage from './pages/InvestorPresentationPage';
import DashboardCreateWizardPage from './pages/DashboardCreateWizardPage';
import ManufacturingPage from './pages/sectors/ManufacturingPage';
import ManufacturingDashboardsPage from './pages/ManufacturingDashboardsPage';
import DataIngestionPage from './pages/DataIngestionPage';


const App: React.FC = () => {
  return (
    <PageLayout>
      <Suspense fallback={<LoadingSpinner fullScreen message="Sayfa yükleniyor..." />}>
        <Routes>
        {/* === Genel ve Halka Açık Rotalar === */}
        <Route path="/" element={<HeroPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
        <Route path="/solutions/financial-data-analysis" element={<FinancialDataAnalysisPage />} />
        <Route path="/solutions/cost-inventory-management" element={<CostInventoryManagementPage />} />
        <Route path="/solutions/cash-flow" element={<CashFlowPage />} />
        <Route path="/solutions/budget-planning" element={<BudgetPlanningPage />} />
        <Route path="/solutions/hr-payroll-performance" element={<HRPayrollPerformancePage />} />
        <Route path="/solutions/dashboard-examples" element={<DataVisualizationDashboardExamplesPage />} />
        <Route path="/solutions/dashboards/:dashboardId" element={<DashboardDetailPage />} />
        <Route path="/solutions/features" element={<DataVisualizationFeaturesPage />} />
        <Route path="/solutions/support" element={<DataVisualizationSupportPage />} />
        
        {/* Sectors */}
        <Route path="/sektorler/uretim" element={<ManufacturingPage />} />
        <Route path="/sektorler/uretim/dashboards" element={<ManufacturingDashboardsPage />} />
        
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/what-is-finops" element={<WhatIsFinopsPage />} />
        <Route path="/blog/bringing-teams-together" element={<BringingTeamsTogetherPage />} />
        <Route path="/blog/data-driven-decisions" element={<DataDrivenDecisionsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/get-started" element={<GetStartedDocPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/brand-kit" element={<AdminProtectedRoute><BrandKitPage /></AdminProtectedRoute>} />
        <Route path="/project-activity-report" element={<ProjectActivityReportPage />} />
        {/* <Route path="/illustration-demo" element={<IllustrationDemoPage />} /> */}
        {/* <Route path="/undraw-comparison" element={<UndrawComparisonPage />} /> */}

        {/* === Kimlik Doğrulama Rotaları === */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* === Kullanıcı Korumalı Rotalar (Giriş Yapmış Kullanıcılar) === */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/professional-dashboards" element={<ProfessionalDashboardsPage />} />
          <Route path="/veri-girisi" element={<DataImportPage />} />
          <Route path="/dashboard/demo-preview" element={<DemoDashboardPreview />} />
        </Route>
        
        {/* === Yönetici Korumalı Rotalar (Sadece Yöneticiler) === */}
        <Route path="/admin/platform-analytics" element={<AdminProtectedRoute><PlatformAnalyticsPage /></AdminProtectedRoute>} />
        <Route path="/admin/csv-library" element={<AdminProtectedRoute><CSVLibraryPage /></AdminProtectedRoute>} />
        <Route path="/admin/dashboard" element={<AdminProtectedRoute><PlatformAnalyticsDashboard /></AdminProtectedRoute>} />
        <Route path="/admin/panel" element={<AdminProtectedRoute><AdminPanelPage /></AdminProtectedRoute>} />
        <Route path="/admin/newsletter" element={<AdminProtectedRoute><NewsletterPanelPage /></AdminProtectedRoute>} />
        <Route path="/admin/payment-guide" element={<AdminProtectedRoute><PaymentGuideAdminPage /></AdminProtectedRoute>} />
        <Route path="/dashboard/create" element={<AdminProtectedRoute><DashboardCreateWizardPage /></AdminProtectedRoute>} />
        <Route path="/finops-theatre" element={<AdminProtectedRoute><FinOpsTheatrePage /></AdminProtectedRoute>} />
        <Route path="/business-plan" element={<AdminProtectedRoute><BusinessPlanPage /></AdminProtectedRoute>} />
        <Route path="/marketing-plan" element={<AdminProtectedRoute><MarketingPlanPage /></AdminProtectedRoute>} />
        <Route path="/launch-roadmap" element={<AdminProtectedRoute><LaunchRoadmapPage /></AdminProtectedRoute>} />
        <Route path="/investor-presentation" element={<AdminProtectedRoute><InvestorPresentationPage /></AdminProtectedRoute>} />
        <Route path="/veri-rehberi" element={<AdminProtectedRoute><DataGuidePage /></AdminProtectedRoute>} />
        <Route path="/veri-hazirlama" element={<VeriHazirlamaRehberiPage />} />
        <Route path="/veri-kaynaklari" element={<VeriKaynaklariPage />} />
        <Route path="/ai-veri-analizi" element={<AIVeriAnaliziPage />} />
        <Route path="/veri-gorsellestirme" element={<VeriGorsellestirmePage />} />
        <Route path="/user-journey-map" element={<AdminProtectedRoute><UserJourneyMapPage /></AdminProtectedRoute>} />
        <Route path="/data-ingestion" element={<AdminProtectedRoute><DataIngestionPage /></AdminProtectedRoute>} />

        {/* === Yasal Sayfalar === */}
        <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/legal/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/legal/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/veri-guvenligi" element={<DataSecurityPage />} />

        {/* === 404 Not Found - Catch All Route === */}
        <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </PageLayout>
  );
};

export default App;
