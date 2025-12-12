import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
const footerSections = {
  solutions: { title: "Çözümler", links: [{ name: "Finansal Veri Analizi", href: "/solutions/financial-data-analysis" }, { name: "Maliyet ve Stok Yönetimi", href: "/solutions/cost-and-inventory" }] },
  resources: { title: "Kaynaklar", links: [{ name: "Bilgi Merkezi", href: "/blog" }, { name: "Dökümanlar", href: "/docs" }] },
  company: { title: "Şirket", links: [{ name: "Hakkımızda", href: "/about" }, { name: "İletişim", href: "/contact" }] },
  corporate: { title: "Kurumsal Kimlik", links: [{ name: "Marka Kiti", href: "/branding" }] },
};
const socialLinks = [{ icon: Twitter, href: "#", name: "Twitter" }, { icon: Github, href: "#", name: "GitHub" }, { icon: Linkedin, href: "#", name: "LinkedIn" }];
const Footer: React.FC = () => (
  <footer className="border-t border-slate-800 bg-slate-900">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-4 lg:col-span-1"><Link to="/" className="flex items-center gap-2 mb-4"><img src="/brand/finops-logo-light.png" alt="Finops AI Logo" className="h-7 w-auto" /><span className="text-white font-semibold text-base">Finops AI</span></Link><p className="text-sm text-slate-400 max-w-xs">KOBİ'ler için veri odaklı finans ve operasyon yönetimi platformu.</p></div>
        <FooterLinkColumn {...footerSections.solutions} /><FooterLinkColumn {...footerSections.resources} /><FooterLinkColumn {...footerSections.company} /><FooterLinkColumn {...footerSections.corporate} />
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center"><p className="text-sm text-slate-500">© {new Date().getFullYear()} Finops AI. Tüm hakları saklıdır.</p><div className="flex items-center space-x-4 mt-4 sm:mt-0">{socialLinks.map(social => <a key={social.name} href={social.href} className="text-slate-500 hover:text-slate-400"><span className="sr-only">{social.name}</span><social.icon className="h-5 w-5" /></a>)}</div></div>
    </div>
  </footer>
);
const FooterLinkColumn: React.FC<{ title: string; links: { name: string; href: string }[] }> = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">{title}</h3>
    <ul className="mt-4 space-y-3">{links.map(link => (<li key={link.name}><Link to={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">{link.name}</Link></li>))}</ul>
  </div>
);
export default Footer;
