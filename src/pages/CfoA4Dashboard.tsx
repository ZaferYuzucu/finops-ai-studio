import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Kpi = {
  label: string;
  current: number;
  previous: number;
  currency?: string;
  unit?: string;
  interpretation: string;
};

const kpis: Kpi[] = [
  {
    label: 'Gelir',
    current: 463_100_000,
    previous: 431_400_000,
    currency: '₺',
    interpretation: 'Gelir tempo kazanıyor; fiyat + hacim katkısı.',
  },
  {
    label: 'Faaliyet Kârı',
    current: 82_400_000,
    previous: 77_900_000,
    currency: '₺',
    interpretation: 'Marj toparlanıyor; pazarlama gideri kısmi kontrol altında.',
  },
  {
    label: 'Brüt Marj',
    current: 21.8,
    previous: 20.3,
    unit: '%',
    interpretation: 'Marj genişliyor; miks iyileşmesi + fiyatlama disiplini.',
  },
  {
    label: 'Nakit Pozisyonu',
    current: 142_000_000,
    previous: 155_000_000,
    currency: '₺',
    interpretation: 'Nakit tüketimi hızlandı; stok + tahsilat baskısı var.',
  },
  {
    label: 'Net Çalışma Sermayesi',
    current: 68_500_000,
    previous: 59_700_000,
    currency: '₺',
    interpretation: 'Stok ve alacak büyümesi nakdi kilitliyor.',
  },
];

const contributionData = [
  { segment: 'Binek', grossProfit: 38.2 },
  { segment: 'SUV', grossProfit: 29.7 },
  { segment: 'Ticari', grossProfit: 18.5 },
  { segment: 'Tarım', grossProfit: 13.6 },
];

const marginErosionData = [
  { month: 'Oca', margin: 19.6, surcharge: 0.0 },
  { month: 'Şub', margin: 20.4, surcharge: 0.2 },
  { month: 'Mar', margin: 21.1, surcharge: 0.3 },
  { month: 'Nis', margin: 21.8, surcharge: 0.5 },
];

const cashLockData = [
  { bucket: '0-30g', stock: 24 },
  { bucket: '31-60g', stock: 31 },
  { bucket: '61-90g', stock: 19 },
  { bucket: '90g+', stock: 26 },
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

function deltaColor(delta: number) {
  if (delta > 0.1) return 'text-emerald-600';
  if (delta < -0.1) return 'text-rose-600';
  return 'text-slate-600';
}

const CfoA4Dashboard: React.FC = () => {
  const kpiCards = useMemo(
    () =>
      kpis.map((kpi) => {
        const delta = kpi.previous === 0 ? 0 : ((kpi.current - kpi.previous) / kpi.previous) * 100;
        return { ...kpi, delta };
      }),
    []
  );

  return (
    <div
      className="min-h-screen flex justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100"
      style={{ padding: '24px 12px' }}
    >
      <div
        className="bg-white/90 border border-slate-200 shadow-xl rounded-2xl"
        style={{ width: '794px', minHeight: '1123px', padding: '24px 28px', boxShadow: '0 18px 38px -16px rgba(30,41,59,0.25)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">CFO Yürütme Özeti — Tek Sayfa (A4)</h1>
            <p className="text-sm text-slate-600">Karar için hazır: üstten alta tek akış, okuması 60 saniye.</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            Dönem: Q2 YTD<br />
            Para Birimi: ₺
          </div>
        </div>

        {/* 1. Executive Financial Snapshot */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">1) Executive Financial Snapshot</h2>
            <span className="text-xs text-slate-500">Gelir, kârlılık, nakit, WCap</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {kpiCards.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm"
              >
                <div className="text-xs text-slate-500 font-semibold">{kpi.label}</div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-black text-slate-900 leading-tight">
                    {formatScaled(kpi.current, kpi.currency, kpi.unit)}
                  </div>
                  <div className={`text-sm font-semibold ${deltaColor(kpi.delta)}`}>
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

        {/* 2. Value Contribution Analysis */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">2) Value Contribution Analysis</h2>
            <span className="text-xs text-slate-500">Hangi segment değer yaratıyor?</span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50/40 to-white p-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-800 mb-1">
              Soru: Hangi segmentler brüt kârı sürüklüyor?
            </div>
            <div className="text-xs text-slate-500 mb-2">Yanıt: SUV + Binek brüt kârın %67,9’unu taşıyor; Ticari düşük katkı.</div>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={contributionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="segment" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                  <Bar dataKey="grossProfit" name="Brüt Kâr Payı" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* 3. Operational Pressure Indicators */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">3) Operational Pressure Indicators</h2>
            <span className="text-xs text-slate-500">Stok, nakit kilidi, marj baskısı</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50/50 to-white p-3 shadow-sm">
              <div className="text-sm font-semibold text-slate-800 mb-1">Soru: Stokta nakit nerede kilitli?</div>
              <div className="text-xs text-slate-500 mb-2">Yanıt: Stokun %45’i 60 gün üstünde; nakit dönüşü yavaş.</div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <BarChart data={cashLockData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="bucket" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(v: number) => `${v.toFixed(0)}%`} />
                    <Bar dataKey="stock" name="Stok Payı" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-emerald-50/60 to-white p-3 shadow-sm">
              <div className="text-sm font-semibold text-slate-800 mb-1">Soru: Marj erozyonu kontrol altında mı?</div>
              <div className="text-xs text-slate-500 mb-2">Yanıt: Marj 4 ayda +1,5 puan; sürşarj katkısı +0,5 puan.</div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <LineChart data={marginErosionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis unit="%" domain={[18, 23]} />
                    <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                    <Line type="monotone" dataKey="margin" name="Brüt Marj" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="surcharge" name="Fiyat Sürşarjı (pp)" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Management Interpretation Block */}
        <section className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">4) Yönetim Yorum Bloğu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-800">
            <div>
              <div className="font-semibold text-slate-900 mb-1">Ne oluyor?</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Gelir +7.4% QoQ, brüt marj +1.5 puan.</li>
                <li>Nakit pozisyonu -13 Mio; stok günleri şişti.</li>
                <li>SUV + Binek kârı taşıyor; Ticari düşük katkı.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">Neden oluyor?</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Fiyat disiplinine rağmen stok yenileme pahalı.</li>
                <li>Alacak tahsil süresi uzadı; kampanya indirimleri sınırlı.</li>
                <li>Sürşarj uygulaması marjı kısmi korudu.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">Ne yapmalıyız?</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Ticari segmentte fiyat + stok optimizasyonu, düşük katkıyı kapat.</li>
                <li>60g+ stok için agresif tahliye planı; nakit dönüşünü hızlandır.</li>
                <li>Sürşarjı segment bazlı kalibre et; marjı 22%+ bandında tut.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CfoA4Dashboard;
