
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, Linkedin } from 'lucide-react';
import logo from '@/assets/brand/finops-logo-Kalkan.png';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const getFooterSections = (t: any) => ({
  solutions: {
    title: t('footer.solutions'),
    links: [
      { name: t('footer.links.financialDataAnalysis'), href: "/solutions/financial-data-analysis" },
      { name: t('footer.links.costInventoryManagement'), href: "/solutions/cost-inventory-management" },
      { name: t('footer.links.budgetPlanning'), href: "/solutions/budget-planning" },
      { name: t('footer.links.cashFlow'), href: "/solutions/cash-flow" },
      { name: t('footer.links.hrPayrollPerformance'), href: "/solutions/hr-payroll-performance" },
    ],
    style: {
        background: 'bg-green-50',
        ring: 'ring-green-200',
        shadow: 'hover:shadow-green-100',
        titleColor: 'text-green-800'
    }
  },
  resources: {
    title: t('footer.resources'),
    links: [
      { name: t('footer.links.knowledgeBase'), href: "/blog" },
      { name: t('footer.links.documents'), href: "/docs" },
    ],
    style: {
        background: 'bg-orange-50', 
        ring: 'ring-orange-200',
        shadow: 'hover:shadow-orange-100',
        titleColor: 'text-orange-800'
    }
  },
  corporate: {
    title: t('footer.corporate'),
    links: [
      { name: t('footer.links.about'), href: "/about" },
      { name: t('footer.links.contact'), href: "/contact" },
      { name: t('footer.links.projectActivityReport'), href: "/project-activity-report" },
    ],
    style: {
        background: 'bg-blue-50',
        ring: 'ring-blue-200',
        shadow: 'hover:shadow-blue-100',
        titleColor: 'text-blue-800'
    }
  },
  admin: {
    title: t('footer.admin'),
    links: [
      { name: t('footer.links.platformAnalytics'), href: "/admin-login?redirect=/admin/platform-analytics" },
      { name: t('footer.links.brandingKit'), href: "/admin-login?redirect=/brand-kit" },
      { name: t('footer.links.studioCreator'), href: "/admin-login?redirect=/studio-creator" },
      { name: t('footer.links.newsletterPanel'), href: "/admin-login?redirect=/admin/newsletter" },
      { name: t('footer.links.businessPlan'), href: "/admin-login?redirect=/business-plan" },
      { name: t('footer.links.pricing'), href: "/pricing" },
      { name: t('footer.links.marketingPlan'), href: "/admin-login?redirect=/marketing-plan" },
      { name: t('footer.links.userJourneyMap'), href: "/admin-login?redirect=/user-journey-map" },
      { name: t('footer.links.paymentGuide'), href: "/admin-login?redirect=/admin/payment-guide" },
    ],
    style: {
        background: 'bg-violet-50', 
        ring: 'ring-violet-200',
        shadow: 'hover:shadow-violet-100',
        titleColor: 'text-violet-800'
    }
  },
  social: {
    title: t('footer.social'),
    links: [
      { name: "YouTube", href: "https://www.youtube.com/@finopsai", icon: Youtube, username: "@finopsai" },
      { name: "LinkedIn", href: "https://www.linkedin.com/company/finopsai", icon: Linkedin, username: "@finopsai" },
      { name: "Facebook", href: "https://www.facebook.com/finopsai", icon: Facebook, username: "@finopsai" },
      { name: "Instagram", href: "https://www.instagram.com/finops.ist", icon: Instagram, username: "@finops.ist" },
    ],
    style: {
        background: 'bg-lime-50', 
        ring: 'ring-lime-200',     
        shadow: 'hover:shadow-lime-100', 
        titleColor: 'text-lime-800'  
    }
  },
});

const getLegalLinks = (t: any) => [
    { name: t('footer.privacyPolicy'), href: "/legal/privacy-policy" },
    { name: t('footer.termsOfService'), href: "/legal/terms-of-service" },
    { name: t('footer.cookiePolicy'), href: "/legal/cookie-policy" },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const footerSections = getFooterSections(t);
  const legalLinks = getLegalLinks(t);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      await addDoc(collection(db, 'aboneler'), {
        email: email,
        subscribedAt: serverTimestamp(),
      });
      setStatus('success');
      setMessage(t('footer.subscribeSuccess'));
      setEmail('');
    } catch (error) {
      console.error("Abonelik sırasında hata oluştu: ", error);
      setStatus('error');
      setMessage(t('footer.subscribeError'));
    }
  };

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-8 py-16">
        
        <div className="flex flex-col items-center text-center">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <img src={logo} alt="Finops AI Logo" className="h-12 w-auto" />
            </Link>
            <div className="max-w-xl">
              <h3 className="text-lg font-semibold text-gray-800">{t('footer.stayUpdated')}</h3>
              <p className="mt-2 text-base text-gray-500">{t('footer.stayUpdatedSubtitle')}</p>
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <label htmlFor="email-address" className="sr-only">E-posta adresi</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow sm:text-sm" 
                  placeholder={t('footer.emailPlaceholder')} 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
                <button 
                  type="submit" 
                  className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 transition-colors"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? t('footer.subscribing') : t('footer.subscribe')}
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
            </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {Object.values(footerSections).map(section => (
            <FooterLinkColumn key={section.title} {...section} />
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Finops AI. {t('footer.rightsReserved')}</p>
          <div className="flex items-center gap-x-6 mt-4 sm:mt-0">
            {legalLinks.map(link => (
              <Link key={link.name} to={link.href} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{link.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLinkColumn: React.FC<{ title: string; links: any[]; style: { background: string; ring: string; shadow: string; titleColor: string; } }> = ({ title, links, style }) => (
    <div className={`rounded-2xl p-8 flex flex-col h-full text-center transition-all duration-350 ease-in-out transform hover:-translate-y-2 shadow-lg ${style.background} ring-1 ${style.ring} ${style.shadow}`}>
      <div className="mb-6">
        <div className={`inline-block rounded-full bg-white px-5 py-2 shadow-sm ring-1 ring-inset ${style.ring}`}>
            <h3 className={`text-sm font-bold tracking-wider uppercase ${style.titleColor}`}>
                {title}
            </h3>
        </div>
      </div>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link.name}>
            {link.href.endsWith('.pptx') ? (
              <a href={link.href} className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors" download>
                {link.name}
              </a>
            ) : link.icon && link.username ? (
              <a href={link.href} className="inline-flex items-center justify-center gap-x-3 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                <link.icon className="h-5 w-5 flex-shrink-0" />
                <span>{link.username}</span>
              </a>
            ) : link.href.startsWith('/') ? (
              <Link to={link.href} className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">{link.name}</Link>
            ) : (
              <a href={link.href} className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors" target="_blank" rel="noopener noreferrer">{link.name}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

export default Footer;
