import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroPage from './pages/HeroPage';
import SupportPage from './pages/SupportPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BlogPage from './pages/BlogPage';
import WhatIsFinopsPage from './pages/blog/WhatIsFinopsPage';
import BringingTeamsTogetherPage from './pages/blog/BringingTeamsTogetherPage';
import DataDrivenDecisionsPage from './pages/blog/DataDrivenDecisionsPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';

// Çözüm Sayfaları
import SolutionsPage from './pages/SolutionsPage';
import FinansalVeriAnaliziPage from './pages/solutions/FinansalVeriAnaliziPage';
import MaliyetVeStokYonetimiPage from './pages/solutions/MaliyetVeStokYonetimiPage';
import NakitAkisiPage from './pages/solutions/NakitAkisiPage';
import ButceVePlanlamaPage from './pages/solutions/ButceVePlanlamaPage';
import IKBordoPerformansPage from './pages/solutions/IKBordoPerformansPage';

// Veri Görselleştirme Sayfaları
import DataVisualizationDashboardExamplesPage from './pages/solutions/DataVisualizationDashboardExamplesPage';
import DataVisualizationFeaturesPage from './pages/solutions/DataVisualizationFeaturesPage';
import DataVisualizationSupportPage from './pages/solutions/DataVisualizationSupportPage';

// Dökümantasyon Detay Sayfası
import GetStartedDocPage from './pages/docs/GetStartedDocPage';

// Hukuki Sayfalar
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from './pages/legal/TermsOfServicePage';
import CookiePolicyPage from './pages/legal/CookiePolicyPage';

// KURUMSAL KİMLİK SAYFALARI İÇİN IMPORT'LAR EKLENDİ
import BrandingKitPage from './pages/BrandingKitPage';
import BusinessPlanPage from './pages/BusinessPlanPage';
import MarketingPlanPage from './pages/MarketingPlanPage';
import ProjectActivityReportPage from './pages/ProjectActivityReportPage';
import StudioCreatorPage from './pages/StudioCreatorPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="pt-16">
        <Routes>
          {/* Temel Sayfalar */}
          <Route path="/" element={<HeroPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Dökümantasyon Sayfaları */}
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/get-started" element={<GetStartedDocPage />} />

          {/* Blog Sayfaları */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/what-is-finops" element={<WhatIsFinopsPage />} />
          <Route path="/blog/bringing-teams-together" element={<BringingTeamsTogetherPage />} />
          <Route path="/blog/data-driven-decisions" element={<DataDrivenDecisionsPage />} />
          
          {/* Çözüm Sayfaları */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/financial-data-analysis" element={<FinansalVeriAnaliziPage />} />
          <Route path="/solutions/cost-inventory-management" element={<MaliyetVeStokYonetimiPage />} />
          <Route path="/solutions/cash-flow" element={<NakitAkisiPage />} />
          <Route path="/solutions/budget-planning" element={<ButceVePlanlamaPage />} />
          <Route path="/solutions/hr-payroll-performance" element={<IKBordoPerformansPage />} />

          {/* Veri Görselleştirme Route'ları */}
          <Route path="/solutions/data-visualization" element={<DataVisualizationDashboardExamplesPage />} />
          <Route path="/solutions/dashboard-examples" element={<DataVisualizationDashboardExamplesPage />} />
          <Route path="/solutions/features" element={<DataVisualizationFeaturesPage />} />
          <Route path="/solutions/support" element={<DataVisualizationSupportPage />} />

          {/* Hukuki Sayfa Route'ları */}
          <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/legal/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/legal/cookie-policy" element={<CookiePolicyPage />} />

          {/* KURUMSAL KİMLİK SAYFA ROUTE'LARI EKLENDİ */}
          <Route path="/branding" element={<BrandingKitPage />} />
          <Route path="/business-plan" element={<BusinessPlanPage />} />
          <Route path="/marketing-plan" element={<MarketingPlanPage />} />
          <Route path="/project-activity-report" element={<ProjectActivityReportPage />} />
          <Route path="/studio-creator" element={<StudioCreatorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
