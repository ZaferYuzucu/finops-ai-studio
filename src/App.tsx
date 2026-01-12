
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
import ChartGuidePage from './pages/docs/ChartGuidePage';
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
import DataLibraryPage from './pages/DataLibraryPage';
import UserJourneyMapPage from './pages/UserJourneyMapPage';
import DemoDashboardPreview from './pages/DemoDashboardPreview';
import VeriHazirlamaRehberiPage from './pages/VeriHazirlamaRehberiPage'; 
import VeriKaynaklariPage from './pages/VeriKaynaklariPage';
import AIVeriAnaliziPage from './pages/AIVeriAnaliziPage';
import VeriGorsellestirmePage from './pages/VeriGorsellestirmePage';
import NotFoundPage from './pages/NotFoundPage';
import PaymentCheckoutPage from './pages/PaymentCheckoutPage';
import DataSecurityPage from './pages/DataSecurityPage';
import ChartWizardDemoPage from './pages/ChartWizardDemoPage';

// Koruma Bileşenleri ve Korunan Sayfalar
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import ProfessionalDashboardsPage from './pages/ProfessionalDashboardsPage';
import MyDashboardsPage from './pages/MyDashboardsPage';
import DashboardViewPage from './pages/DashboardViewPage';
import UserSettingsPage from './pages/UserSettingsPage';
import AdminPanelPage from './pages/AdminPanelPage';
import NewsletterPanelPage from './pages/admin/NewsletterPanelPage';
import PlatformAnalyticsPage from './pages/admin/PlatformAnalyticsPage';
import PlatformAnalyticsDashboard from './pages/admin/PlatformAnalyticsDashboard';
import PaymentGuideAdminPage from './pages/admin/PaymentGuideAdminPage';
import CSVLibraryPage from './pages/admin/CSVLibraryPage';
import FinOpsTheatrePage from './pages/FinOpsTheatrePage';
import BusinessPlanPage from './pages/BusinessPlanPage';
import SystemGuidePage from './pages/admin/SystemGuidePage';
import BetaApplicationsPage from './pages/admin/BetaApplicationsPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import EmailOutboxPage from './pages/admin/EmailOutboxPage';
import OfficePage from './pages/OfficePage';
import MarketingPlanPage from './pages/MarketingPlanPage';
import LaunchRoadmapPage from './pages/LaunchRoadmapPage';
import InvestorPresentationPage from './pages/InvestorPresentationPage';
import DashboardCreateWizardPage from './pages/DashboardCreateWizardPage';
import InternalPricingGuidePage from './pages/admin/InternalPricingGuidePage';
import ChartRulesAdminPage from './pages/admin/ChartRulesAdminPage';
import ExecutiveStatusReportPage from './pages/admin/ExecutiveStatusReportPage';
import DashboardLibraryAdminPage from './pages/admin/DashboardLibraryAdminPage';
import ManufacturingPage from './pages/sectors/ManufacturingPage';
import ManufacturingDashboardsPage from './pages/ManufacturingDashboardsPage';
import DataIngestionPage from './pages/DataIngestionPage';
import BetaApplicationFormPage from './pages/BetaApplicationFormPage';
import AutomotivTermostatDashboard from './pages/dashboards/AutomotivTermostatDashboard';

// Dev-only tools
const I18nAuditPage = lazy(() => import('./pages/I18nAuditPage'));
const ShareDashboardPage = lazy(() => import('./pages/share/ShareDashboardPage'));

const App: React.FC = () => {
  return (
    <PageLayout>
      <Suspense fallback={<LoadingSpinner fullScreen message="Sayfa yükleniyor..." />}>
        <Routes>
        {/* === Genel ve Halka Açık Rotalar === */}
        <Route path="/" element={<HeroPage />} />
        {import.meta.env.DEV && <Route path="/i18n-audit" element={<I18nAuditPage />} />}
        <Route path="/share" element={<ShareDashboardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/beta-basvuru" element={<BetaApplicationFormPage />} />
        <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
        <Route path="/chart-wizard" element={<ChartWizardDemoPage />} />
        <Route path="/veri-girisi" element={<DataImportPage />} />
        <Route path="/veri-rehberi" element={<DataGuidePage />} />
        <Route path="/bilgi-merkezi/grafik-rehberi" element={<ChartGuidePage />} />
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
        
        {/* Demo Dashboards */}
        <Route path="/dashboards/automotiv-termostat" element={<AutomotivTermostatDashboard />} />
        
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
          <Route path="/dashboard/create" element={<DashboardCreateWizardPage />} />
          <Route path="/dashboard/my" element={<MyDashboardsPage />} />
          <Route path="/dashboard/view/:id" element={<DashboardViewPage />} />
          <Route path="/dashboard/edit/:id" element={<DashboardCreateWizardPage />} />
          <Route path="/dashboards" element={<ProfessionalDashboardsPage />} />
          <Route path="/professional-dashboards" element={<ProfessionalDashboardsPage />} />
          <Route path="/dashboard/demo-preview" element={<DemoDashboardPreview />} />
          <Route path="/kutuphane" element={<DataLibraryPage />} />
          <Route path="/data-library" element={<DataLibraryPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
          <Route path="/user/settings" element={<UserSettingsPage />} />
        </Route>
        
        {/* === Yönetici Korumalı Rotalar (Sadece Yöneticiler) === */}
        <Route path="/admin/platform-analytics" element={<AdminProtectedRoute><PlatformAnalyticsPage /></AdminProtectedRoute>} />
        <Route path="/admin/csv-library" element={<AdminProtectedRoute><CSVLibraryPage /></AdminProtectedRoute>} />
        <Route path="/admin/dashboard" element={<AdminProtectedRoute><PlatformAnalyticsDashboard /></AdminProtectedRoute>} />
        <Route path="/admin/panel" element={<AdminProtectedRoute><AdminPanelPage /></AdminProtectedRoute>} />
        <Route path="/admin/newsletter" element={<AdminProtectedRoute><NewsletterPanelPage /></AdminProtectedRoute>} />
        <Route path="/admin/payment-guide" element={<AdminProtectedRoute><PaymentGuideAdminPage /></AdminProtectedRoute>} />
        <Route path="/office" element={<AdminProtectedRoute><OfficePage /></AdminProtectedRoute>} />
        <Route path="/finops-theatre" element={<AdminProtectedRoute><FinOpsTheatrePage /></AdminProtectedRoute>} />
        <Route path="/business-plan" element={<AdminProtectedRoute><BusinessPlanPage /></AdminProtectedRoute>} />
        <Route path="/admin/system-guide" element={<AdminProtectedRoute><SystemGuidePage /></AdminProtectedRoute>} />
        <Route path="/admin/beta-applications" element={<AdminProtectedRoute><BetaApplicationsPage /></AdminProtectedRoute>} />
        <Route path="/admin/user-management" element={<AdminProtectedRoute><UserManagementPage /></AdminProtectedRoute>} />
        <Route path="/admin/email-outbox" element={<AdminProtectedRoute><EmailOutboxPage /></AdminProtectedRoute>} />
        <Route path="/admin/internal-pricing" element={<AdminProtectedRoute><InternalPricingGuidePage /></AdminProtectedRoute>} />
        <Route path="/admin/chart-rules" element={<AdminProtectedRoute><ChartRulesAdminPage /></AdminProtectedRoute>} />
        <Route path="/admin/management-office/executive-report" element={<AdminProtectedRoute><ExecutiveStatusReportPage /></AdminProtectedRoute>} />
        <Route path="/admin/dashboard-library" element={<AdminProtectedRoute><DashboardLibraryAdminPage /></AdminProtectedRoute>} />
        <Route path="/marketing-plan" element={<AdminProtectedRoute><MarketingPlanPage /></AdminProtectedRoute>} />
        <Route path="/launch-roadmap" element={<AdminProtectedRoute><LaunchRoadmapPage /></AdminProtectedRoute>} />
        <Route path="/investor-presentation" element={<AdminProtectedRoute><InvestorPresentationPage /></AdminProtectedRoute>} />
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
