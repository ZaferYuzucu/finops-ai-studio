import React from 'react';

type DashboardCard = {
  name: string;
  category: string;
  description: string;
};

const dashboards: DashboardCard[] = Array.from({ length: 20 }).map((_, i) => {
  const base = [
    'Finansal Özet',
    'Nakit Akışı',
    'Bütçe vs Gerçekleşen',
    'Satış Hunisi',
    'Stok Maliyeti',
    'HR / Bordro',
    'Kârlılık Analizi',
    'KPI Executive Panel',
    'Tahmin & Forecast',
    'Müşteri Karlılığı'
  ];
  const name = base[i % base.length] + ` #${Math.floor(i / base.length) + 1}`;
  const category =
    i % 3 === 0 ? 'Finance' : i % 3 === 1 ? 'Sales' : 'Operations';
  return {
    name,
    category,
    description:
      'Mockup veri ile hazırlanmış örnek dashboard. Gerçek projede sektörünüze göre uyarlanır.'
  };
});

const DashboardsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-50">
          Dashboard Kütüphanesi
        </h1>
        <p className="text-sm text-slate-300">
          Finans, satış, operasyon, HR ve yönetim için 20+ hazır dashboard
          mockup&apos;ı. Hepsi Türk KOBİ&apos;lerine uyarlanabilir.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 text-[11px]">
        {dashboards.map((d) => (
          <div
            key={d.name}
            className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-4 hover:border-finops-blue/70 hover:shadow-lg hover:shadow-blue-900/40"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-100">
                {d.name}
              </div>
              <div className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">
                {d.category}
              </div>
            </div>
            <p className="text-slate-400">{d.description}</p>
            <div className="mt-3 h-16 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 opacity-80 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardsPage;
