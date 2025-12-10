import React from 'react';

const sectors = [
  { name: 'Turizm / Otel', kpi: 'Doluluk %78, RevPAR +%12' },
  { name: 'Restoran / Cafe', kpi: 'Masa başı ciro +%9' },
  { name: 'Sağlık', kpi: 'Randevu no-show %4,3' },
  { name: 'Perakende', kpi: 'Sepet tutarı 482 ₺' },
  { name: 'Otomotiv', kpi: 'Servis kârlılığı +%7,1' },
  { name: 'Tarım', kpi: 'Dekar başı verim +%15' }
];

const SectorCards: React.FC = () => {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3 text-[11px]">
      {sectors.map((s) => (
        <div
          key={s.name}
          className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 hover:border-finops-blue/70"
        >
          <div className="text-xs font-semibold text-slate-100">{s.name}</div>
          <div className="mt-1 text-slate-400">{s.kpi}</div>
          <div className="mt-2 h-1 w-full rounded-full bg-slate-800">
            <div className="h-1 w-2/3 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectorCards;
