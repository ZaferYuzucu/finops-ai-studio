/**
 * Admin Layout Component
 * 
 * Dedicated layout for admin users with admin-specific navigation
 * Replaces the regular user navbar for admin sessions
 */

import React, { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LogOut, Menu, X, Home, Users, Mail, BarChart3, Settings, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '@/assets/brand/finops-logo-Kalkan.png';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const adminNavItems = [
    { name: 'Office', href: '/office', icon: Home },
    { name: 'Admin Panel', href: '/admin', icon: Shield },
    { name: 'User Management', href: '/admin/user-management', icon: Users },
    { name: 'Beta Applications', href: '/admin/beta-applications', icon: Mail },
    { name: 'Platform Analytics', href: '/admin/platform-analytics', icon: BarChart3 },
    { name: 'System Guide', href: '/admin/system-guide', icon: Settings },
  ];

  const isActivePath = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700">
        <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/office" className="flex items-center gap-3">
                <img src={logo} alt="Finops AI Logo" className="h-9 w-auto" />
                <div className="flex flex-col justify-center">
                  <span className="text-lg font-bold text-white leading-tight">FINOPS</span>
                  <span className="text-[10px] font-medium text-gray-300 tracking-wider leading-tight">
                    ADMIN OFFICE
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Admin User Info & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-semibold border border-yellow-500/30">
                <Shield size={14} />
                ADMIN
              </div>
              <div className="text-sm text-gray-300">
                {currentUser?.email}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Çıkış
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-gray-700">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <div className="px-4 text-xs text-gray-400">
                  {currentUser?.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children || <Outlet />}
      </main>

      {/* Admin Footer (optional minimal footer) */}
      <footer className="bg-gray-900 text-gray-400 py-4 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            © {new Date().getFullYear()} FinOps AI Studio - Admin Office
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
