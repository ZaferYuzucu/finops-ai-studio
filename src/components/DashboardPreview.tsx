import React from 'react';

const DashboardPreview: React.FC = () => {
  const cards = [
    { title: 'Nakit Akışı', value: '₺1.850.000', sub: '12 haftalık runway' },
    { title: 'Net Kâr', value: '₺254.000', sub: 'Net marj: %7,8' },
    { title: 'Stok Maliyeti', value: '₺970.000', sub: 'Hedefe göre +%4,2' }
  ];

  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-[11px]">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-100">
          Örnek Finansal Dashboard
        </div>
        <div className="text-slate-400">Toplam İşletmeler</div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="rounded-xl border border-slate-800 bg-slate-950/80 p-3"
          >
            <div className="text-slate-400">{c.title}</div>
            <div className="mt-1 text-sm font-semibold text-slate-50">
              {c.value}
            </div>
            <div className="mt-1 text-[10px] text-emerald-300">{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPreview;
