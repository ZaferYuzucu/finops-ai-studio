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
  
  // Admin routes should not show regular navbar/footer
  const isAdminRoute = location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith('/office') ||
                       location.pathname === '/admin-login';
  
  // Hide navbar and footer for admin users or on admin routes
  const hideNavbarAndFooter = isAdmin || isAdminRoute;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideNavbarAndFooter && <Navbar />}
      <main className={`flex-grow ${!hideNavbarAndFooter ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!hideNavbarAndFooter && <Footer />}
      
      {/* Fino Chat Widget - Only for regular users, not for admins */}
      {!isAdmin && <FinoChatWidget />}
    </div>
  );
};

export default PageLayout;
