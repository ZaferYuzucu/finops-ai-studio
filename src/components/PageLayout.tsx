import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FinoChatWidget from './FinoChatWidget';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideFooterOnAdminRoutes =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/admin-login');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Navbar yüksekliği (h-16) kadar padding ekle */}
        {children}
      </main>
      {!hideFooterOnAdminRoutes && <Footer />}
      
      {/* Fino Chat Widget - Her sayfada sağ alt köşede */}
      <FinoChatWidget />
    </div>
  );
};

export default PageLayout;
