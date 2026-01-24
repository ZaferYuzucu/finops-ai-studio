import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import FinoChatWidget from './FinoChatWidget';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  // Only hide navbar/footer on actual admin routes, NOT for regular users on public pages
  const isAdminRoute = location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith('/office') ||
                       location.pathname === '/admin-login';
  
  // Hide navbar ONLY if on admin route (admin users will see AdminLayout instead)
  const hideNavbarAndFooter = isAdminRoute;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideNavbarAndFooter && <Navbar />}
      <main className={`flex-grow ${!hideNavbarAndFooter ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!hideNavbarAndFooter && <Footer />}
      
      {/* Fino Chat Widget - Available for all users */}
      <FinoChatWidget />
    </div>
  );
};

export default PageLayout;
