import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, Linkedin } from 'lucide-react';
import logo from '@/assets/brand/finops-logo-light.png';

const footerSections = {
  solutions: {
    title: "Çözümler",
    links: [
      { name: "Finansal Veri Analizi", href: "/solutions/financial-data-analysis" },
      { name: "Maliyet ve Stok Yönetimi", href: "/solutions/cost-and-inventory" },
      { name: "Bütçe ve Planlama", href: "/solutions/budget-and-planning" },
      { name: "Nakit Akışı", href: "/solutions/cash-flow" },
      { name: "İK & Bordro Performansı", href: "/solutions/hr-payroll-performance" },
    ]
  },
  resources: {
    title: "Kaynaklar",
    links: [
      { name: "Bilgi Merkezi", href: "/blog" },
      { name: "Dökümanlar", href: "/docs" },
    ]
  },
  corporate: {
    title: "Kurumsal Kimlik",
    links: [
      { name: "Marka Kiti", href: "/branding" },
      { name: "Business Plan", href: "/business-plan" },
      { name: "Marketing Plan", href: "/marketing-plan" },
      { name: "Faaliyet Raporu", href: "/project-activity-report" },
      { name: "Studio Creator", href: "/studio-creator" },
    ]
  },
  company: {
    title: "Şirket",
    links: [
      { name: "Hakkımızda", href: "/about" },
      { name: "İletişim", href: "/contact" },
    ]
  },
};

const socialLinks = [
    { icon: Youtube, href: "#", name: "YouTube" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Linkedin, href: "#", name: "LinkedIn" }
];

const legalLinks = [
    { name: "Gizlilik Politikası", href: "/legal/privacy-policy" },
    { name: "Kullanım Şartları", href: "/legal/terms-of-service" },
    { name: "Çerez Politikası", href: "/legal/cookie-policy" },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Abone olan e-posta:', email);
    alert(`${email} adresi bültenimize başarıyla kaydedilmiştir! (Bu bir test mesajıdır)`);
    setEmail(''); // Formu temizle
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Finops AI Logo" className="h-7 w-auto" />
              <span className="text-white font-semibold text-base">Finops AI</span>
            </Link>
            <div className="mt-6 max-w-sm">
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Güncel Kalın</h3>
              <p className="mt-4 text-sm text-slate-400">En son haberler, makaleler ve kaynaklar haftalık olarak gelen kutunuza gönderilir.</p>
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
                <label htmlFor="email-address" className="sr-only">E-posta adresi</label>
                <input 
                  type="email" 
                  name="email-address" 
                  id="email-address" 
                  autoComplete="email" 
                  required 
                  className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                  placeholder="E-posta adresiniz" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="flex-shrink-0 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Abone Ol
                </button>
              </form>
            </div>
          </div>
          <FooterLinkColumn {...footerSections.solutions} />
          <FooterLinkColumn {...footerSections.resources} />
          <FooterLinkColumn {...footerSections.corporate} />
          <FooterLinkColumn {...footerSections.company} />
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-slate-500 flex flex-col sm:flex-row items-center gap-x-4 gap-y-2">
              <p>© {new Date().getFullYear()} Finops AI. Tüm hakları saklıdır.</p>
              <div className="flex gap-x-4">
                  {legalLinks.map(link => (
                      <Link key={link.name} to={link.href} className="hover:text-white transition-colors">
                          {link.name}
                      </Link>
                  ))}
              </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {socialLinks.map(social => (
              <a key={social.name} href={social.href} className="text-slate-500 hover:text-slate-400">
                <span className="sr-only">{social.name}</span>
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLinkColumn: React.FC<{ title: string; links: { name: string; href: string }[] }> = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">{title}</h3>
    <ul className="mt-4 space-y-3">
      {links.map(link => (
        <li key={link.name}>
          <Link to={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
