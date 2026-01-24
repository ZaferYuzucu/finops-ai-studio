
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import DashboardPreparationGuide from './pages/DashboardPreparationGuide';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BrandKitPage from './pages/BrandKitPage'; // ✅ DÜZELTİLDİ - Eksik asset'ler kaldırıldı
import ProjectActivityReportPage from './pages/ProjectActivityReportPage';
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
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import ProfessionalDashboardsPage from './pages/ProfessionalDashboardsPage';
import MyDashboardsPage from './pages/MyDashboardsPage';
import DashboardViewPage from './pages/DashboardViewPage';
import StandardDashboardViewPage from './pages/StandardDashboardViewPage';
import SmartDashboardWizardPage from './pages/SmartDashboardWizardPage';
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
import TemplateLibraryPage from './pages/TemplateLibraryPage';
import DashboardTemplatePage from './pages/DashboardTemplatePage';
import UnifiedDashboardsPage from './pages/UnifiedDashboardsPage';
import UnifiedDashboardWizardPage from './pages/UnifiedDashboardWizardPage';

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
        <Route path="/bilgi-merkezi/dashboard-hazirlama-rehberi" element={<DashboardPreparationGuide />} />
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

        {/* === Kimlik Doğrulama Rotaları === */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* === Dashboard Rotaları (Herkese Açık - Demo) === */}
        {/* NEW: Unified Dashboard System */}
        <Route path="/dashboards/all" element={<UnifiedDashboardsPage />} />
        
        {/* Canonical URL - Tek dashboard kütüphanesi */}
        <Route path="/professional-dashboards" element={<ProfessionalDashboardsPage />} />
        {/* Redirects - SEO ve backward compatibility */}
        <Route path="/dashboards" element={<Navigate to="/dashboards/all" replace />} />
        <Route path="/dashboard/professional" element={<Navigate to="/dashboards/all" replace />} />
        <Route path="/dashboard/demo-preview" element={<DemoDashboardPreview />} />

        {/* === Dashboard Template System (Public) === */}
        <Route path="/dashboard/templates" element={<TemplateLibraryPage />} />
        <Route path="/dashboard/template/:templateId" element={<DashboardTemplatePage />} />
        <Route path="/dashboard/template-preview/:templateId" element={<DashboardTemplatePage />} />
        
        {/* === Kullanıcı Korumalı Rotalar (Giriş Yapmış Kullanıcılar) === */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/create" element={<DashboardCreateWizardPage />} />
          <Route path="/dashboard/create-wizard" element={<UnifiedDashboardWizardPage />} />
          <Route path="/dashboard/smart-create" element={<SmartDashboardWizardPage />} />
          <Route path="/dashboard/preparation-guide" element={<DashboardPreparationGuide />} />
          <Route path="/dashboard/my" element={<MyDashboardsPage />} />
          <Route path="/dashboard/view/:id" element={<DashboardViewPage />} />
          <Route path="/dashboard/view-standard/:id" element={<StandardDashboardViewPage />} />
          <Route path="/dashboard/edit/:id" element={<DashboardCreateWizardPage />} />
          <Route path="/kutuphane" element={<DataLibraryPage />} />
          <Route path="/data-library" element={<DataLibraryPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
          <Route path="/user/settings" element={<UserSettingsPage />} />
        </Route>
        
        {/* === Yönetici Korumalı Rotalar (Sadece Yöneticiler) === */}
        <Route element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/admin/platform-analytics" element={<PlatformAnalyticsPage />} />
          <Route path="/admin/csv-library" element={<CSVLibraryPage />} />
          <Route path="/admin/dashboard" element={<PlatformAnalyticsDashboard />} />
          <Route path="/admin/panel" element={<AdminPanelPage />} />
          <Route path="/admin/newsletter" element={<NewsletterPanelPage />} />
          <Route path="/admin/payment-guide" element={<PaymentGuideAdminPage />} />
          <Route path="/office" element={<OfficePage />} />
          <Route path="/finops-theatre" element={<FinOpsTheatrePage />} />
          <Route path="/business-plan" element={<BusinessPlanPage />} />
          <Route path="/admin/system-guide" element={<SystemGuidePage />} />
          <Route path="/admin/beta-applications" element={<BetaApplicationsPage />} />
          <Route path="/admin/user-management" element={<UserManagementPage />} />
          <Route path="/admin/email-outbox" element={<EmailOutboxPage />} />
          <Route path="/admin/internal-pricing" element={<InternalPricingGuidePage />} />
          <Route path="/admin/chart-rules" element={<ChartRulesAdminPage />} />
          <Route path="/admin/management-office/executive-report" element={<ExecutiveStatusReportPage />} />
          <Route path="/admin/management-office/project-activity-report" element={<ProjectActivityReportPage />} />
          <Route path="/admin/dashboard-library" element={<DashboardLibraryAdminPage />} />
          <Route path="/marketing-plan" element={<MarketingPlanPage />} />
          <Route path="/launch-roadmap" element={<LaunchRoadmapPage />} />
          <Route path="/investor-presentation" element={<InvestorPresentationPage />} />
          <Route path="/user-journey-map" element={<UserJourneyMapPage />} />
          <Route path="/data-ingestion" element={<DataIngestionPage />} />
        </Route>
        
        {/* === Public Info Pages (Not Admin-Only) === */}
        <Route path="/veri-hazirlama" element={<VeriHazirlamaRehberiPage />} />
        <Route path="/veri-kaynaklari" element={<VeriKaynaklariPage />} />
        <Route path="/ai-veri-analizi" element={<AIVeriAnaliziPage />} />
        <Route path="/veri-gorsellestirme" element={<VeriGorsellestirmePage />} />

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
