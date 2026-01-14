import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Gauge, Database } from 'lucide-react';
import automotiveImg from '@/assets/illustrations/undraw/setup-analytics-pana-finops.svg';

const AutomotiveShowcase: React.FC = () => {
  return (
    <section className="bg-white/80 border border-indigo-100 shadow-lg shadow-indigo-50 rounded-2xl p-6 sm:p-8 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
            🚗 Otomotiv Sektörü • Demo Dashboard Seti
          </span>
          <h2 className="text-3xl font-black text-slate-900 leading-tight">
            Yönetici Özeti, Satış Performansı ve Servis & After-Sales panoları tek veri kütüphanesinden besleniyor.
          </h2>
          <p className="text-slate-600 text-base">
            Üç CSV kaynağı (operasyon-finans, satış KPI, servis-aksesuar-sigorta) aynı anda kullanılır. Bar, line, donut grafikler; KPI kartları ve tablo bileşenleri FinTech görünümüyle hazırlandı.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/professional-dashboards?category=automotive&dashboard=automotive-executive"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-md hover:bg-indigo-700 transition-colors"
            >
              Yönetici Özeti’ni Aç
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/professional-dashboards?category=automotive&dashboard=automotive-sales"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold shadow-md hover:bg-slate-800 transition-colors"
            >
              Satış Performansı
            </Link>
            <Link
              to="/professional-dashboards?category=automotive&dashboard=automotive-service"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-md hover:bg-emerald-700 transition-colors"
            >
              Servis & After-Sales
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-4 flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-lg bg-white border border-slate-100 p-4 shadow-sm">
            <img src={automotiveImg} alt="Automotive dashboard mockup" className="w-full h-auto" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-indigo-50/60 via-transparent to-white/30" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-slate-700">
            <div className="bg-slate-50 border border-slate-100 rounded-md p-2 text-center">
              <div className="text-slate-500 flex items-center justify-center gap-1 mb-1">
                <BarChart3 size={14} /> Gelir
              </div>
              <div className="font-semibold text-slate-900">₺45.6M</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-md p-2 text-center">
              <div className="text-slate-500 flex items-center justify-center gap-1 mb-1">
                <Gauge size={14} /> Hedef %
              </div>
              <div className="font-semibold text-slate-900">93.8%</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-md p-2 text-center">
              <div className="text-slate-500 flex items-center justify-center gap-1 mb-1">
                <Database size={14} /> CSV
              </div>
              <div className="font-semibold text-slate-900">3 kaynak</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Bu Dashboard Hangi Soruları Yanıtlar?</h4>
          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Hangi araç grubu kârlılığı sürüklüyor?</li>
            <li>Satış ekipleri hedeflerini tutturabiliyor mu?</li>
            <li>Servis operasyonları nakit yaratıyor mu?</li>
          </ul>
        </div>
        <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Öne Çıkan KPI’lar</h4>
          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Toplam Gelir, Brüt Kâr</li>
            <li>Hedef Gerçekleşme %</li>
            <li>Servis Gelir Payı & Nakit Akış Etkisi</li>
          </ul>
        </div>
        <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Kullanılan Veri Kaynakları</h4>
          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Araç Satışları (Hedef/gerçekleşme)</li>
            <li>Satış Ajanı Performansı (Brüt kâr)</li>
            <li>Servis & After-Sales (Sigorta, Aksesuar)</li>
            <li>Sigorta & Aksesuar Gelirleri</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AutomotiveShowcase;
