import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Target, Users2, PercentCircle, DollarSign } from 'lucide-react';
import KpiCard from './KpiCard';
import { useAutomotiveDemoData } from '@/hooks/useAutomotiveDemoData';

const monthOrder = ['2025-01', '2025-02', '2025-03', '2025-04'];

const AutomotiveSalesDashboard: React.FC = () => {
  const { sales, loading, error } = useAutomotiveDemoData();

  const totals = useMemo(() => {
    const target = sales.reduce((sum, row) => sum + (row.Hedef_Adet || 0), 0);
    const actual = sales.reduce((sum, row) => sum + (row.Gerceklesen_Adet || 0), 0);
    const revenue = sales.reduce((sum, row) => sum + (row.Gelir_TL || 0), 0);
    const gross = sales.reduce((sum, row) => sum + (row.Brut_Kar_TL || 0), 0);
    return {
      target,
      actual,
      attainment: target > 0 ? (actual / target) * 100 : 0,
      revenue,
      gross,
      grossMargin: revenue > 0 ? (gross / revenue) * 100 : 0,
      avgTicket: actual > 0 ? revenue / actual : 0,
    };
  }, [sales]);

  const agentPerformance = useMemo(() => {
    const map = sales.reduce<Record<string, { target: number; actual: number; revenue: number; gross: number }>>(
      (acc, row) => {
        const key = row.Satis_Ajani || 'Diğer';
        if (!acc[key]) {
          acc[key] = { target: 0, actual: 0, revenue: 0, gross: 0 };
        }
        acc[key].target += row.Hedef_Adet || 0;
        acc[key].actual += row.Gerceklesen_Adet || 0;
        acc[key].revenue += row.Gelir_TL || 0;
        acc[key].gross += row.Brut_Kar_TL || 0;
        return acc;
      },
      {}
    );
    return Object.entries(map).map(([agent, vals]) => ({
      agent,
      ...vals,
      attainment: vals.target > 0 ? (vals.actual / vals.target) * 100 : 0,
    }));
  }, [sales]);

  const groupVolumes = useMemo(() => {
    const map = sales.reduce<Record<string, { units: number; revenue: number }>>((acc, row) => {
      const key = row.Arac_Grubu || 'Diğer';
      if (!acc[key]) {
        acc[key] = { units: 0, revenue: 0 };
      }
      acc[key].units += row.Gerceklesen_Adet || 0;
      acc[key].revenue += row.Gelir_TL || 0;
      return acc;
    }, {});
    return Object.entries(map).map(([group, vals]) => ({ group, ...vals }));
  }, [sales]);

  const attainmentTrend = useMemo(() => {
    const map = sales.reduce<Record<string, { target: number; actual: number }>>((acc, row) => {
      acc[row.Ay] = acc[row.Ay] || { target: 0, actual: 0 };
      acc[row.Ay].target += row.Hedef_Adet || 0;
      acc[row.Ay].actual += row.Gerceklesen_Adet || 0;
      return acc;
    }, {});
    return Object.entries(map)
      .map(([month, vals]) => ({
        month,
        attainment: vals.target > 0 ? (vals.actual / vals.target) * 100 : 0,
        revenue: 0,
      }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  }, [sales]);

  const topAgents = useMemo(
    () =>
      [...agentPerformance]
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 4),
    [agentPerformance]
  );

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-600 font-semibold">Satış performans verisi yükleniyor...</p>
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
      className="w-full h-full overflow-auto p-4"
      style={{
        background: 'linear-gradient(135deg, #f7f8ff 0%, #eef7ff 35%, #f8fbff 70%, #ffffff 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto space-y-4">
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center w-fit gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">
            🎯 Satış Performansı
          </span>
          <h2 className="text-2xl font-black text-slate-900">Bayi Satış KPI Dashboard</h2>
          <p className="text-sm text-slate-600">
            Satış danışmanı bazlı hedef & gerçekleşme, araç grubu hacmi ve brüt kâr. Tek CSV kaynağı
            (`otomotiv_dealer_satis_kpi_detay.csv`) ile tüm satış panolarını besler.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <KpiCard
            title="Gerçekleşen Satış"
            value={totals.actual.toLocaleString('tr-TR')}
            icon={<Users2 size={18} />}
            color="#0EA5E9"
          />
          <KpiCard
            title="Hedef Gerçekleşme"
            value={totals.attainment.toFixed(1)}
            unit="%"
            icon={<Target size={18} />}
            color="#6366F1"
          />
          <KpiCard
            title="Toplam Gelir"
            value={`₺${Math.round(totals.revenue).toLocaleString('tr-TR')}`}
            icon={<DollarSign size={18} />}
            color="#22C55E"
          />
          <KpiCard
            title="Brüt Kâr Marjı"
            value={totals.grossMargin.toFixed(1)}
            unit="%"
            icon={<PercentCircle size={18} />}
            color="#F97316"
          />
          <KpiCard
            title="Ortalama Araç Geliri"
            value={Math.round(totals.avgTicket).toLocaleString('tr-TR')}
            icon={<DollarSign size={18} />}
            color="#0EA5E9"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Satış Danışmanı Bazlı Hedef & Gerçekleşme</h3>
              <span className="text-xs text-slate-500">Adet bazında</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="target" name="Hedef" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Gerçekleşen" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Araç Grubu Bazlı Satış Hacmi</h3>
              <span className="text-xs text-slate-500">Adet ve gelir</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={groupVolumes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="group" />
                <YAxis />
                <Tooltip formatter={(v: number, name) => (name === 'units' ? v : `₺${Math.round(v).toLocaleString('tr-TR')}`)} />
                <Legend />
                <Bar dataKey="units" name="Satış Adedi" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Gelir (TL)" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Hedef Gerçekleşme (%) Trend</h3>
              <span className="text-xs text-slate-500">Aylık</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={attainmentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 130]} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                <Legend />
                <Line type="monotone" dataKey="attainment" name="Hedef %" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">En İyi 4 Satış Danışmanı</h3>
              <span className="text-xs text-slate-500">Gelire göre sıralı</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-slate-500 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Danışman</th>
                    <th className="px-4 py-3 text-right">Hedef</th>
                    <th className="px-4 py-3 text-right">Gerçek</th>
                    <th className="px-4 py-3 text-right">Gelir</th>
                    <th className="px-4 py-3 text-right">Brüt Kâr</th>
                    <th className="px-4 py-3 text-right">Hedef %</th>
                  </tr>
                </thead>
                <tbody>
                  {topAgents.map((agent) => (
                    <tr key={agent.agent} className="border-b border-slate-100 hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-semibold text-slate-800">{agent.agent}</td>
                      <td className="px-4 py-3 text-right">{agent.target.toLocaleString('tr-TR')}</td>
                      <td className="px-4 py-3 text-right text-emerald-600">
                        {agent.actual.toLocaleString('tr-TR')}
                      </td>
                      <td className="px-4 py-3 text-right">₺{Math.round(agent.revenue).toLocaleString('tr-TR')}</td>
                      <td className="px-4 py-3 text-right text-emerald-600">
                        ₺{Math.round(agent.gross).toLocaleString('tr-TR')}
                      </td>
                      <td className="px-4 py-3 text-right text-indigo-600">
                        {agent.attainment.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Veri kaynağı: `otomotiv_dealer_satis_kpi_detay.csv`. Hedef & gerçekleşme tüm grafiklerde aynı kaynaktan gelir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomotiveSalesDashboard;
