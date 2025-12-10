import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HeroPage from './pages/HeroPage';
import FlowPage from './pages/FlowPage';
import DashboardsPage from './pages/DashboardsPage';
import AiAssistantPage from './pages/AiAssistantPage';
import VisionOcrPage from './pages/VisionOcrPage';
import PricingPage from './pages/PricingPage';
import BusinessPlanPage from './pages/BusinessPlanPage';
import MarketingPlanPage from './pages/MarketingPlanPage';
import StudioCreatorPage from './pages/StudioCreatorPage';
import BrandingKitPage from './pages/BrandingKitPage';
import SupportPage from './pages/SupportPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-slate-950 via-slate-930 to-slate-950">
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/hero" element={<HeroPage />} />
          <Route path="/nasil-calisir" element={<FlowPage />} />
          <Route path="/dashboards" element={<DashboardsPage />} />
          <Route path="/ai-asistan" element={<AiAssistantPage />} />
          <Route path="/vision-ocr" element={<VisionOcrPage />} />
          <Route path="/fiyatlandirma" element={<PricingPage />} />
          <Route path="/business-plan" element={<BusinessPlanPage />} />
          <Route path="/marketing-plan" element={<MarketingPlanPage />} />
          <Route path="/studio-creator" element={<StudioCreatorPage />} />
          <Route path="/brand-kit" element={<BrandingKitPage />} />
          <Route path="/destek" element={<SupportPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
