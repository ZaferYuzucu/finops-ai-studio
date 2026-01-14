import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import { Wrench, Clock3, Activity, Shield } from 'lucide-react';
import KpiCard from './KpiCard';
import { useAutomotiveDemoData } from '@/hooks/useAutomotiveDemoData';

const monthOrder = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'];

const AutomotiveServiceDashboard: React.FC = () => {
  const { service, loading, error } = useAutomotiveDemoData();

  const totals = useMemo(() => {
    const revenue = service.reduce((sum, row) => sum + (row.Gelir_TL || 0), 0);
    const cost = service.reduce((sum, row) => sum + (row.Maliyet_TL || 0), 0);
    const workOrders = service.reduce((sum, row) => sum + (row.Is_Emri_Sayisi || 0), 0);
    const billedHours = service.reduce((sum, row) => sum + (row.Faturalanan_Saat || 0), 0);
    const techHours = service.reduce((sum, row) => sum + (row.Teknisyen_Saat || 0), 0);
    const avgRepair = service.reduce((sum, row) => sum + (row.Ortalama_Tamir_Suresi_Saat || 0), 0) / (service.length || 1);
    return {
      revenue,
      cost,
      workOrders,
      gross: revenue - cost,
      grossMargin: revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0,
      avgRepair,
      utilization: techHours > 0 ? (billedHours / techHours) * 100 : 0,
      accessoryShare:
        revenue > 0
          ? (service
              .filter((row) => row.Servis_Turu === 'Aksesuar' || row.Servis_Turu === 'Sigorta')
              .reduce((sum, row) => sum + (row.Gelir_TL || 0), 0) /
              revenue) *
            100
          : 0,
    };
  }, [service]);

  const workOrdersByType = useMemo(() => {
    const map = service.reduce<Record<string, { orders: number; revenue: number; cost: number; parts: number }>>(
      (acc, row) => {
        const key = row.Servis_Turu || 'Diğer';
        if (!acc[key]) {
          acc[key] = { orders: 0, revenue: 0, cost: 0, parts: 0 };
        }
        acc[key].orders += row.Is_Emri_Sayisi || 0;
        acc[key].revenue += row.Gelir_TL || 0;
        acc[key].cost += row.Maliyet_TL || 0;
        acc[key].parts += row.Parca_Geliri_TL || 0;
        return acc;
      },
      {}
    );
    return Object.entries(map).map(([type, vals]) => ({ type, ...vals }));
  }, [service]);

  const repairTrend = useMemo(() => {
    const map = service.reduce<Record<string, { total: number; count: number }>>((acc, row) => {
      acc[row.Ay] = acc[row.Ay] || { total: 0, count: 0 };
      acc[row.Ay].total += row.Ortalama_Tamir_Suresi_Saat || 0;
      acc[row.Ay].count += 1;
      return acc;
    }, {});
    return Object.entries(map)
      .map(([month, vals]) => ({
        month,
        avg: vals.count > 0 ? vals.total / vals.count : 0,
      }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  }, [service]);

  const utilizationDonut = useMemo(() => {
    const billed = service.reduce((sum, row) => sum + (row.Faturalanan_Saat || 0), 0);
    const tech = service.reduce((sum, row) => sum + (row.Teknisyen_Saat || 0), 0);
    const idle = Math.max(tech - billed, 0);
    return [
      { name: 'Faturalanan Saat', value: billed },
      { name: 'Faturalanmayan Saat', value: idle },
    ];
  }, [service]);

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-600 font-semibold">Servis & after-sales verisi yükleniyor...</p>
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
        background: 'linear-gradient(135deg, #f5fbff 0%, #eef7ff 35%, #f8fbff 70%, #ffffff 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto space-y-4">
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center w-fit gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold border border-sky-200">
            🛠️ Servis & After-Sales
          </span>
          <h2 className="text-2xl font-black text-slate-900">Servis Operasyon Performansı</h2>
          <p className="text-sm text-slate-600">
            İş emri hacmi, gelir-maliyet, ortalama tamir süresi ve teknisyen saat verimliliği. Kaynak: `otomotiv_servis_aksesuar_sigorta_detay.csv`.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <KpiCard
            title="Toplam Servis Geliri"
            value={`₺${Math.round(totals.revenue).toLocaleString('tr-TR')}`}
            icon={<Wrench size={18} />}
            color="#0EA5E9"
          />
          <KpiCard
            title="Brüt Kâr"
            value={`₺${Math.round(totals.gross).toLocaleString('tr-TR')}`}
            icon={<Shield size={18} />}
            color="#22C55E"
          />
          <KpiCard
            title="Brüt Kâr Marjı"
            value={totals.grossMargin.toFixed(1)}
            unit="%"
            icon={<Shield size={18} />}
            color="#10B981"
          />
          <KpiCard
            title="Avg. Tamir Süresi"
            value={totals.avgRepair.toFixed(2)}
            unit="saat"
            icon={<Clock3 size={18} />}
            color="#F97316"
          />
          <KpiCard
            title="Teknisyen Verimliliği"
            value={totals.utilization.toFixed(1)}
            unit="%"
            icon={<Activity size={18} />}
            color="#6366F1"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Servis Türüne Göre İş Emri ve Gelir</h3>
              <span className="text-xs text-slate-500">Hacim & gelir kıyası</span>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={workOrdersByType}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip formatter={(v: number, name) => (name === 'orders' ? v : `₺${Math.round(v).toLocaleString('tr-TR')}`)} />
                <Legend />
                <Bar dataKey="orders" name="İş Emri" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Gelir (TL)" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" name="Maliyet (TL)" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Teknisyen Saat Verimliliği</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={utilizationDonut} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} label>
                  {utilizationDonut.map((entry, idx) => (
                    <Cell key={entry.name} fill={idx === 0 ? '#6366F1' : '#CBD5E1'} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v.toFixed(0)} saat`} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-600 text-center">
              Toplam verimlilik: {totals.utilization.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Ortalama Tamir Süresi Trend</h3>
              <span className="text-xs text-slate-500">Aylık saat</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={repairTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v: number) => `${v.toFixed(2)} saat`} />
                <Legend />
                <Line type="monotone" dataKey="avg" name="Avg. Tamir Süresi" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Servis Türü KPI Tablosu</h3>
              <span className="text-xs text-slate-500">Gelir, maliyet, parça payı</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-slate-500 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Servis Türü</th>
                    <th className="px-4 py-3 text-right">İş Emri</th>
                    <th className="px-4 py-3 text-right">Gelir</th>
                    <th className="px-4 py-3 text-right">Maliyet</th>
                    <th className="px-4 py-3 text-right">Parça Payı</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrdersByType.map((row) => {
                    const partsShare = row.revenue > 0 ? (row.parts / row.revenue) * 100 : 0;
                    return (
                      <tr key={row.type} className="border-b border-slate-100 hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-semibold text-slate-800">{row.type}</td>
                        <td className="px-4 py-3 text-right">{row.orders.toLocaleString('tr-TR')}</td>
                        <td className="px-4 py-3 text-right">₺{Math.round(row.revenue).toLocaleString('tr-TR')}</td>
                        <td className="px-4 py-3 text-right text-rose-600">
                          ₺{Math.round(row.cost).toLocaleString('tr-TR')}
                        </td>
                        <td className="px-4 py-3 text-right text-indigo-600">
                          {partsShare.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Aksesuar + Sigorta gelir payı: {totals.accessoryShare.toFixed(1)}% | Tek CSV ile tüm after-sales kartları beslenir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomotiveServiceDashboard;
