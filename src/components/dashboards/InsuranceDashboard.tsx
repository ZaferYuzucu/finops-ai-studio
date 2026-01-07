// Insurance Dashboard - Sigorta Yönetimi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Shield, DollarSign, FileText, TrendingUp, Users, AlertCircle } from 'lucide-react';

const premiumTrendData = [
  { month: 'Oca', written: 2850000, earned: 2650000, lossRatio: 58.5 },
  { month: 'Şub', written: 3120000, earned: 2920000, lossRatio: 56.2 },
  { month: 'Mar', written: 3350000, earned: 3180000, lossRatio: 54.8 },
  { month: 'Nis', written: 3580000, earned: 3420000, lossRatio: 52.5 },
  { month: 'May', written: 3820000, earned: 3650000, lossRatio: 50.2 },
  { month: 'Haz', written: 4100000, earned: 3920000, lossRatio: 48.5 },
];

const productMixData = [
  { product: 'Kasko', policies: 1850, premium: 1580000, lossRatio: 45.2 },
  { product: 'Sağlık', policies: 2420, premium: 1280000, lossRatio: 62.5 },
  { product: 'Konut', policies: 1580, premium: 685000, lossRatio: 38.8 },
  { product: 'İşyeri', policies: 925, premium: 420000, lossRatio: 42.5 },
  { product: 'Hayat', policies: 685, premium: 285000, lossRatio: 28.5 },
];

const claimStatusData = [
  { status: 'Yeni', count: 185, amount: 2850000 },
  { status: 'İnceleniyor', count: 142, amount: 2280000 },
  { status: 'Onaylandı', count: 95, amount: 1520000 },
  { status: 'Ödendi', count: 285, amount: 4560000 },
  { status: 'Reddedildi', count: 28, amount: 420000 },
];

const agentPerformanceData = [
  { agent: 'Acente-A', newPolicies: 185, premium: 685000, retention: 92.5 },
  { agent: 'Acente-B', newPolicies: 165, premium: 620000, retention: 90.2 },
  { agent: 'Acente-C', newPolicies: 142, premium: 580000, retention: 88.5 },
  { agent: 'Acente-D', newPolicies: 128, premium: 485000, retention: 85.8 },
  { agent: 'Acente-E', newPolicies: 115, premium: 420000, retention: 82.5 },
];

const claimFrequencyData = [
  { month: 'Oca', frequency: 8.5, severity: 15420 },
  { month: 'Şub', frequency: 7.8, severity: 16200 },
  { month: 'Mar', frequency: 7.2, severity: 17850 },
  { month: 'Nis', frequency: 6.8, severity: 18500 },
  { month: 'May', frequency: 6.2, severity: 19200 },
  { month: 'Haz', frequency: 5.8, severity: 20150 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const InsuranceDashboard: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto bg-gray-100 p-4">
      <div 
        className="bg-gray-50 p-6 mx-auto"
        style={{
          width: '98%',
          maxWidth: '1800px',
          minHeight: 'auto',
          fontFamily: 'Inter, system-ui, sans-serif',
          transformOrigin: 'top center'
        }}
      >
      <div className="mb-4">
        <h1 className="text-2xl font-black text-gray-900">Sigorta Yönetimi Paneli</h1>
        <p className="text-sm text-gray-600">Prim & Hasar Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Yazılan Prim"
          value="₺4.1M"
          change={43.9}
          previousValue="₺2.85M"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Aktif Poliçe"
          value="7,460"
          change={18.5}
          previousValue="6,295"
          icon={<Shield size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Hasar Oranı"
          value="48.5"
          unit="%"
          change={-17.1}
          previousValue="58.5%"
          icon={<AlertCircle size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Yeni Poliçe"
          value="735"
          change={28.5}
          previousValue="572"
          icon={<FileText size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Elde Tutma"
          value="89.9"
          unit="%"
          change={2.8}
          previousValue="87.5%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Bekleyen Hasar"
          value="327"
          change={-12.5}
          previousValue="374"
          icon={<Users size={20} />}
          color="#F59E0B"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Prim & Hasar Oranı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={premiumTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[40, 70]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="written" fill="#10B981" name="Yazılan Prim (₺)" />
              <Line yAxisId="right" type="monotone" dataKey="lossRatio" stroke="#EF4444" strokeWidth={3} name="Hasar Oranı (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ürün Karması (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productMixData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="product" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="premium" name="Prim (₺)">
                {productMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hasar Durumu</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={claimStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="status" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Adet">
                {claimStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Acente Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={agentPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="agent" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="premium" name="Prim (₺)">
                {agentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hasar Sıklığı & Şiddeti</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={claimFrequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="frequency" stroke="#EF4444" strokeWidth={3} name="Sıklık (%)" />
              <Bar yAxisId="right" dataKey="severity" fill="#3B82F6" name="Şiddet (₺)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Sigorta Yönetim Sistemi (IMS) | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default InsuranceDashboard;















