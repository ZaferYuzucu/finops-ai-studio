import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:justify-between">
        <div className="space-y-2 text-[11px] text-slate-400">
          <div className="text-sm font-semibold text-slate-100">FINOPS AI Studio</div>
          <p>Veri odaklı KOBİ finans ve operasyon yönetimi platformu.</p>
          <p>Zafer Yuzucu · info@finops.ist (placeholder)</p>
          <p>© {new Date().getFullYear()} Tüm hakları saklıdır.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-[11px]">
          <div className="space-y-2">
            <div className="font-semibold text-slate-100">Kurumsal</div>
            <ul className="space-y-1 text-slate-400">
              <li><Link to="/business-plan" className="hover:text-slate-100">Business Plan</Link></li>
              <li><Link to="/marketing-plan" className="hover:text-slate-100">Marketing Plan</Link></li>
              <li><Link to="/brand-kit" className="hover:text-slate-100">Marka Kiti</Link></li>
              <li><Link to="/studio-creator" className="hover:text-slate-100">Studio Creator</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-slate-100">Ödeme & Güvenlik</div>
            <ul className="space-y-1 text-slate-400">
              <li>Ödemeler: iyzico, PayTR</li>
              <li>256-bit SSL, PCI-DSS uyumlu altyapı</li>
              <li>KVKK uyumlu veri işleme yaklaşımı (örnek)</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
