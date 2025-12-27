import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FinoChatWidget from './FinoChatWidget';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Navbar yüksekliği (h-16) kadar padding ekle */}
        {children}
      </main>
      <Footer />
      
      {/* Fino Chat Widget - Her sayfada sağ alt köşede */}
      <FinoChatWidget />
    </div>
  );
};

export default PageLayout;
