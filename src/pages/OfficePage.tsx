/**
 * Yönetim Ofisi - Admin Panel
 * Tüm admin sayfalarına erişim merkezi
 * Sadece yetkili kullanıcılar erişebilir
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Rocket, 
  Palette, 
  Mail, 
  Tv, 
  Briefcase, 
  TrendingUp, 
  Map, 
  BookOpen, 
  CreditCard,
  ClipboardList,
  Library,
  ChevronRight
} from 'lucide-react';

interface AdminSection {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  links: {
    name: string;
    href: string;
    description: string;
    icon: React.ElementType;
  }[];
}

const adminSections: AdminSection[] = [
  {
    title: 'Platform Yönetimi',
    description: 'Kullanıcılar, analizler ve başvurular',
    icon: LayoutDashboard,
    color: 'from-blue-500 to-cyan-500',
    links: [
      {
        name: 'Platform Analitiği',
        href: '/admin/platform-analytics',
        description: 'Detaylı kullanım ve performans metrikleri',
        icon: LayoutDashboard
      },
      {
        name: 'Kullanıcı Yönetimi',
        href: '/admin/user-management',
        description: 'Kullanıcıları yönet, plan değiştir',
        icon: Users
      },
      {
        name: 'Beta Başvuruları',
        href: '/admin/beta-applications',
        description: 'Lansman partneri başvurularını yönet',
        icon: Rocket
      }
    ]
  },
  {
    title: 'İçerik & Marka',
    description: 'Marka yönetimi ve içerik üretimi',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    links: [
      {
        name: 'Marka Kiti',
        href: '/brand-kit',
        description: 'Logo, renkler, tipografi ve marka rehberi',
        icon: Palette
      },
      {
        name: 'Bülten Paneli',
        href: '/admin/newsletter',
        description: 'E-posta kampanyaları ve abone yönetimi',
        icon: Mail
      },
      {
        name: 'FinOps Theatre',
        href: '/finops-theatre',
        description: 'Video içerik ve sunum yönetimi',
        icon: Tv
      }
    ]
  },
  {
    title: 'Strateji & Planlama',
    description: 'İş stratejisi ve yol haritaları',
    icon: Briefcase,
    color: 'from-orange-500 to-red-500',
    links: [
      {
        name: 'Kurumsal Pazarlık Rehberi (Gizli)',
        href: '/admin/internal-pricing',
        description: 'Kurumsal fiyatlandırma, senaryolar ve indirim kırmızı çizgileri',
        icon: Briefcase
      },
      {
        name: 'İş Planı',
        href: '/business-plan',
        description: 'Stratejik iş planı ve hedefler',
        icon: Briefcase
      },
      {
        name: 'Pazarlama Planı',
        href: '/marketing-plan',
        description: 'Pazarlama stratejisi ve kampanyalar',
        icon: TrendingUp
      },
      {
        name: 'Kullanıcı Yol Haritası',
        href: '/user-journey-map',
        description: 'Kullanıcı deneyimi ve yolculuk haritası',
        icon: Map
      }
    ]
  },
  {
    title: 'Sistem & Operasyon',
    description: 'Teknik dokümantasyon ve rehberler',
    icon: BookOpen,
    color: 'from-green-500 to-teal-500',
    links: [
      {
        name: 'Yönetici Bilgilendirme Raporu',
        href: '/admin/management-office/executive-report',
        description: 'Dashboard platformu durum analizi (Var/Yok/Kısmen) — yönetici özeti',
        icon: ClipboardList
      },
      {
        name: 'Dashboard Kütüphanesi (Admin)',
        href: '/admin/dashboard-library',
        description: 'Kullanıcı dashboard’larını incele, uyarı bırak, beğendiklerini şablonlaştır',
        icon: Library
      },
      {
        name: 'Grafik Kuralları (Admin)',
        href: '/admin/chart-rules',
        description: 'Wizard/AI için grafik–veri eşleşme kurallarını yönet',
        icon: BookOpen
      },
      {
        name: 'Sistem Rehberi',
        href: '/admin/system-guide',
        description: 'Teknik mimari ve sistem dokümantasyonu',
        icon: BookOpen
      },
      {
        name: 'Ödeme Yöntemleri Rehberi',
        href: '/admin/payment-guide',
        description: 'Ödeme entegrasyonları ve rehber',
        icon: CreditCard
      }
    ]
  }
];

const OfficePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4">
            <LayoutDashboard className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-900">Yönetim Paneli</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Yönetim Ofisi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Platform yönetimi, içerik üretimi, strateji ve sistem operasyonları için merkezi kontrol paneli
          </p>
        </div>

        {/* Sections Grid */}
        <div className="space-y-12">
          {adminSections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.color} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    <p className="text-white/90 text-sm">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={link.href}
                    className="group relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {link.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full border border-blue-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-900 font-medium">
              Tüm sistemler çalışıyor · Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficePage;

