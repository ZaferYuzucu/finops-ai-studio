import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Wallet, Banknote, LineChart as LineIcon, Layers } from 'lucide-react';
import KpiCard from './KpiCard';
import { useAutomotiveDemoData } from '@/hooks/useAutomotiveDemoData';

const monthOrder = [
  '2025-01',
  '2025-02',
  '2025-03',
  '2025-04',
  '2025-05',
  '2025-06',
  '2025-07',
  '2025-08',
  '2025-09',
  '2025-10',
  '2025-11',
  '2025-12',
];

function formatScaled(value: number, currency?: string, unit?: string) {
  const abs = Math.abs(value);
  let scaled = value;
  let suffix = '';
  if (!unit) {
    if (abs >= 1_000_000_000) {
      scaled = value / 1_000_000_000;
      suffix = ' Bio';
    } else if (abs >= 1_000_000) {
      scaled = value / 1_000_000;
      suffix = ' Mio';
    } else if (abs >= 1_000) {
      scaled = value / 1_000;
      suffix = ' K';
    }
  }
  const base = `${scaled.toFixed(1)}${suffix}`;
  if (unit) return `${base}${unit}`;
  if (currency) return `${currency}${base}`;
  return base;
}

const deltaClass = (delta: number) => {
  if (delta > 0.1) return 'text-emerald-600';
  if (delta < -0.1) return 'text-rose-600';
  return 'text-slate-600';
};

const AutomotiveExecutiveDashboard: React.FC = () => {
  const { operations, loading, error } = useAutomotiveDemoData();

  const sorted = useMemo(
    () => [...operations].sort((a, b) => monthOrder.indexOf(a.Ay) - monthOrder.indexOf(b.Ay)),
    [operations]
  );

  const windowSize = 3;
  const currentWindow = sorted.slice(-windowSize);
  const prevWindow = sorted.slice(-windowSize * 2, -windowSize);

  const sumWindow = (rows: typeof operations) => ({
    revenue: rows.reduce((s, r) => s + (r.Gelir_TL || 0), 0),
    gross: rows.reduce((s, r) => s + (r.Brut_Kar_TL || 0), 0),
    cash: rows.reduce((s, r) => s + (r.Nakit_Akisi_TL || 0), 0),
  });

  const cur = sumWindow(currentWindow);
  const prev = sumWindow(prevWindow.length ? prevWindow : currentWindow);

  const kpis = [
    {
      label: 'Gelir',
      icon: <Wallet size={18} />,
      current: cur.revenue,
      previous: prev.revenue,
      currency: '₺',
      interpretation: 'Gelir artışı sürüyor; hacim + fiyat katkılı.',
    },
    {
      label: 'Brüt Kâr',
      icon: <Banknote size={18} />,
      current: cur.gross,
      previous: prev.gross,
      currency: '₺',
      interpretation: 'Marj toparlanıyor; miks iyileşmesi destekliyor.',
    },
    {
      label: 'Nakit Akışı',
      icon: <LineIcon size={18} />,
      current: cur.cash,
      previous: prev.cash,
      currency: '₺',
      interpretation: 'Nakit çekişi azaldı; stok ve tahsilat yönetimi kritik.',
    },
    {
      label: 'Brüt Marj',
      icon: <Layers size={18} />,
      current: cur.revenue > 0 ? (cur.gross / cur.revenue) * 100 : 0,
      previous: prev.revenue > 0 ? (prev.gross / prev.revenue) * 100 : 0,
      unit: '%',
      interpretation: 'Marj genişliyor; fiyat disiplinini koru.',
    },
  ].map((kpi) => ({
    ...kpi,
    delta: kpi.previous === 0 ? 0 : ((kpi.current - kpi.previous) / kpi.previous) * 100,
  }));

  const groupContribution = useMemo(() => {
    const map = operations.reduce<Record<string, number>>((acc, row) => {
      const key = row.Arac_Grubu || 'Diğer';
      acc[key] = (acc[key] || 0) + (row.Brut_Kar_TL || 0);
      return acc;
    }, {});
    return Object.entries(map).map(([group, value]) => ({ group, value }));
  }, [operations]);

  const monthlyCashFlow = useMemo(() => {
    const map = operations.reduce<Record<string, number>>((acc, row) => {
      acc[row.Ay] = (acc[row.Ay] || 0) + (row.Nakit_Akisi_TL || 0);
      return acc;
    }, {});
    return Object.entries(map)
      .map(([month, value]) => ({ month, value }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  }, [operations]);

  const monthlyGrossProfit = useMemo(() => {
    const map = operations.reduce<Record<string, number>>((acc, row) => {
      acc[row.Ay] = (acc[row.Ay] || 0) + (row.Brut_Kar_TL || 0);
      return acc;
    }, {});
    return Object.entries(map)
      .map(([month, value]) => ({ month, value }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  }, [operations]);

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-600 font-semibold">Otomotiv veri seti yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 rounded-xl border border-rose-200 text-rose-700">
        {error}
      </div>
    );
  }

  return (
    <div
      className="flex justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100"
      style={{ padding: '24px 12px' }}
    >
      <div
        className="bg-white/90 border border-slate-200 shadow-xl rounded-2xl space-y-4"
        style={{ width: '794px', minHeight: '1123px', padding: '24px 28px' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">Otomotiv Yönetici Özeti — A4</h1>
            <p className="text-sm text-slate-600">Tek akış: gelir, kâr, nakit, yorumu 60 saniyede oku.</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            Dönem: Son 3 ay (vs önceki 3 ay)
            <br />
            Para Birimi: ₺
          </div>
        </div>

        {/* 1) Executive Financial Snapshot */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">1) Executive Financial Snapshot</h2>
            <span className="text-xs text-slate-500">Gelir, kâr, marj, nakit</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                  <span>{kpi.label}</span>
                  {kpi.icon}
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-black text-slate-900 leading-tight">
                    {formatScaled(kpi.current, kpi.currency, kpi.unit)}
                  </div>
                  <div className={`text-sm font-semibold ${deltaClass(kpi.delta)}`}>
                    {kpi.delta >= 0 ? '+' : ''}
                    {kpi.delta.toFixed(1)}%
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  Önceki: {formatScaled(kpi.previous, kpi.currency, kpi.unit)}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">{kpi.interpretation}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2) Value Contribution Analysis */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">2) Value Contribution Analysis</h2>
            <span className="text-xs text-slate-500">Hangi segment değer yaratıyor?</span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50/40 to-white p-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-800 mb-1">
              Soru: Hangi segmentler brüt kârı sürüklüyor?
            </div>
            <div className="text-xs text-slate-500 mb-2">
              Yanıt: SUV + Binek toplam brüt kârın çoğunu taşıyor; Ticari sınırlı katkı veriyor.
            </div>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={groupContribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="group" />
                  <YAxis tickFormatter={(v) => `${v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + ' Mio' : v.toFixed(0)}`} />
                  <Tooltip formatter={(v: number) => formatScaled(v, '₺')} />
                  <Bar dataKey="value" name="Brüt Kâr" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* 3) Operational Pressure Indicators */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">3) Operational Pressure Indicators</h2>
            <span className="text-xs text-slate-500">Nakit ve marj baskısı</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-sky-50/60 to-white p-3 shadow-sm">
              <div className="text-sm font-semibold text-slate-800 mb-1">Soru: Nakit akışı trendi?</div>
              <div className="text-xs text-slate-500 mb-2">Yanıt: Son iki ay pozitif; volatilite devam ediyor.</div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <LineChart data={monthlyCashFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => formatScaled(v)} />
                    <Tooltip formatter={(v: number) => formatScaled(v, '₺')} />
                    <Line type="monotone" dataKey="value" name="Nakit Akışı" stroke="#0EA5E9" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-emerald-50/60 to-white p-3 shadow-sm">
              <div className="text-sm font-semibold text-slate-800 mb-1">Soru: Brüt kâr trendi?</div>
              <div className="text-xs text-slate-500 mb-2">Yanıt: Yukarı eğilim; fiyat disiplinini koru.</div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <LineChart data={monthlyGrossProfit}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => formatScaled(v)} />
                    <Tooltip formatter={(v: number) => formatScaled(v, '₺')} />
                    <Line type="monotone" dataKey="value" name="Brüt Kâr" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* 4) Management Interpretation */}
        <section className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">4) Yönetim Yorum Bloğu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-800">
            <div>
              <div className="font-semibold text-slate-900 mb-1">Ne oluyor?</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Gelir ve brüt kâr son 3 ayda yukarı yönlü.</li>
                <li>Nakit akışı toparlanıyor fakat oynak.</li>
                <li>SUV + Binek kârlılığı taşıyor; Ticari zayıf.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">Neden oluyor?</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Fiyat disiplinine rağmen stok yenileme maliyeti yüksek.</li>
                <li>Alacak tahsil süresi uzuyor; kampanya indirimleri sınırlı.</li>
                <li>Mix iyileşmesi marjı destekliyor.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">Ne yapmalıyız?</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Ticari segmentte fiyat + stok optimizasyonu yap.</li>
                <li>60g+ stok tahliyesi ve tahsilat hızlandırması uygula.</li>
                <li>Fiyat sürşarjını sürdür; marjı %22 bandında tut.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AutomotiveExecutiveDashboard;
