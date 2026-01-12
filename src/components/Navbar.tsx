
import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Globe, Menu, X, Settings, User, Database } from "lucide-react";
import logo from '@/assets/brand/finops-logo-Kalkan.png';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

// Navigation config will be dynamic based on translation

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const navConfig = [
    {
      name: t('nav.solutions'),
      href: "/solutions",
      children: [
        { name: t('nav.financialDataAnalysis'), href: "/solutions/financial-data-analysis" },
        { name: t('nav.costInventoryManagement'), href: "/solutions/cost-inventory-management" },
        { name: t('nav.cashFlow'), href: "/solutions/cash-flow" },
        { name: t('nav.budgetPlanning'), href: "/solutions/budget-planning" },
        { name: t('nav.hrPayrollPerformance'), href: "/solutions/hr-payroll-performance" },
        { name: "🏭 Üretim Sektörü", href: "/sektorler/uretim" },
      ],
    },
    {
      name: t('nav.dataVisualization'),
      href: "/solutions/data-visualization",
      children: [
        { name: t('nav.dashboardExamples'), href: "/solutions/dashboard-examples" },
        { name: `📈 ${t('nav.dataVisualizationPage')}`, href: "/veri-gorsellestirme" },
        { name: `🤖 ${t('nav.aiDataAnalysisPage')}`, href: "/ai-veri-analizi" },
        { name: `📊 ${t('nav.dataPreparationPage')}`, href: "/veri-hazirlama" },
        { name: `🔌 ${t('nav.dataSourcesPage')}`, href: "/veri-kaynaklari" },
        { name: t('nav.support'), href: "/solutions/support" },
      ]
    },
    {
      name: t('nav.resources'),
      href: "#",
      children: [
        { name: t('nav.knowledgeBase'), href: "/blog" },
        { name: t('nav.documents'), href: "/docs" },
        { name: t('nav.infoCenterHeader'), href: "#", isHeader: true },
        { name: t('nav.chartGuide'), href: "/bilgi-merkezi/grafik-rehberi" },
        { name: t('nav.dataUploadGuide'), href: "/veri-rehberi" },
        { name: `🔐 ${t('nav.dataSecurity')}`, href: "/veri-guvenligi" },
      ],
    },
    { name: t('nav.pricing'), href: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Finops AI Logo" className="h-9 w-auto" />
              <div className="flex flex-col justify-center">
                <span className="text-lg font-bold text-gray-900 leading-tight">FINOPS</span>
                <span className="text-[10px] font-medium text-gray-500 tracking-wider leading-tight">AI STUDIO</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-1">
              {navConfig.map((item) => (
                <NavItem key={item.name} {...item} />
              ))}
            </div>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full p-1 shadow-sm">
              <button
                onClick={() => changeLanguage('tr')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  i18n.language === 'tr'
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Türkçe"
              >
                <span className="text-base">🇹🇷</span>
                <span>TR</span>
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  i18n.language === 'en'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="English"
              >
                <span className="text-base">🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-x-2">
                {/* Giriş ve Kayıt Butonları - HER ZAMAN GÖRÜNÜR */}
                <Link to="/login" className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg">
                    {t('nav.login')}
                </Link>
                <Link to="/signup" className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg shadow-sm">
                    {t('nav.signUp')}
                </Link>
                
                {/* Kullanıcı Giriş Yapmışsa Profil Dropdown */}
                {currentUser && (
                  <>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    
                    {/* User Profile Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {currentUser.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span className="max-w-[100px] truncate">{currentUser.email}</span>
                        <ChevronDown size={16} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">{currentUser.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {currentUser.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}
                            </p>
                          </div>

                          {/* Menu Items */}
                          <div className="py-1">
                            <Link
                              to="/dashboard"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <User size={16} />
                              Dashboard
                            </Link>
                            <Link
                              to="/kutuphane"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Database size={16} />
                              Veri Kütüphanem
                            </Link>
                            <Link
                              to="/settings"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Settings size={16} />
                              Ayarlar
                            </Link>
                          </div>

                          {/* Logout */}
                          <div className="border-t border-gray-100 pt-1">
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                handleLogout();
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut size={16} />
                              Çıkış Yap
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Items */}
              {navConfig.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  {item.children && (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        child.isHeader ? (
                          <div
                            key={child.name}
                            className="text-xs font-bold text-gray-500 uppercase tracking-wider py-2 border-t border-gray-200 mt-2"
                          >
                            {child.name}
                          </div>
                        ) : (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {child.name}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                  {!item.children && item.href && (
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 justify-center bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => {
                      changeLanguage('tr');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      i18n.language === 'tr'
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-base">🇹🇷</span>
                    <span>TR</span>
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      i18n.language === 'en'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-base">🇬🇧</span>
                    <span>EN</span>
                  </button>
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {currentUser ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 transition-colors rounded-lg shadow-sm"
                    >
                      {t('nav.userPanel')}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-center text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors rounded-lg"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg border border-gray-300"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg shadow-sm"
                    >
                      {t('nav.signUp')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

const NavItem: React.FC<{ name: string; href: string; children?: { name: string; href: string; isHeader?: boolean }[] }> = ({ name, href, children }) => (
  <div className="relative group">
    {children ? (
      <>
        <div className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-gray-600 cursor-default">
          {name} <ChevronDown className="h-4 w-4" />
        </div>
        <div className="absolute top-full left-0 w-64 rounded-md shadow-lg bg-white ring-1 ring-gray-200 p-2 z-10 hidden group-hover:block">
          {children.map((child) => (
            child.isHeader ? (
              <div
                key={child.name}
                className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-t border-b border-gray-200 mt-2 mb-1 bg-gray-50"
              >
                {child.name}
              </div>
            ) : (
              <NavLink
                key={child.name}
                to={child.href}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {child.name}
              </NavLink>
            )
          ))}
        </div>
      </>
    ) : (
      <NavLink
        to={href}
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-blue-600 ${
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }`
        }
      >
        {name}
      </NavLink>
    )}
  </div>
);
