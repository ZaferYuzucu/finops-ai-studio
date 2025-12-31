// Cash Flow Dashboard - Nakit Akış Yönetimi
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { DollarSign, TrendingUp, TrendingDown, Clock, AlertTriangle, Target } from 'lucide-react';

const cashFlowData = [
  { month: 'Oca', inflow: 485000, outflow: 425000, net: 60000, balance: 320000 },
  { month: 'Şub', inflow: 512000, outflow: 448000, net: 64000, balance: 384000 },
  { month: 'Mar', inflow: 535000, outflow: 462000, net: 73000, balance: 457000 },
  { month: 'Nis', inflow: 558000, outflow: 478000, net: 80000, balance: 537000 },
  { month: 'May', inflow: 582000, outflow: 495000, net: 87000, balance: 624000 },
  { month: 'Haz', inflow: 605000, outflow: 512000, net: 93000, balance: 717000 },
];

const arAgingData = [
  { period: '0-30 gün', amount: 185000, percentage: 62.0 },
  { period: '31-60 gün', amount: 75000, percentage: 25.1 },
  { period: '61-90 gün', amount: 28000, percentage: 9.4 },
  { period: '90+ gün', amount: 10500, percentage: 3.5 },
];

const apAgingData = [
  { period: '0-30 gün', amount: 142000, percentage: 58.2 },
  { period: '31-60 gün', amount: 68000, percentage: 27.9 },
  { period: '61-90 gün', amount: 25000, percentage: 10.2 },
  { period: '90+ gün', amount: 9000, percentage: 3.7 },
];

const budgetVsActualData = [
  { category: 'Satışlar', budget: 600000, actual: 605000, variance: 5000 },
  { category: 'İşletme Gid.', budget: 180000, actual: 175000, variance: -5000 },
  { category: 'Maaşlar', budget: 220000, actual: 225000, variance: 5000 },
  { category: 'Pazarlama', budget: 65000, actual: 62000, variance: -3000 },
  { category: 'Genel Gid.', budget: 50000, actual: 50000, variance: 0 },
];

const weeklyInOutData = [
  { week: 'Hf1', inflow: 95000, outflow: 88000 },
  { week: 'Hf2', inflow: 102000, outflow: 92000 },
  { week: 'Hf3', inflow: 98000, outflow: 85000 },
  { week: 'Hf4', inflow: 105000, outflow: 95000 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const CashFlowDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Nakit Akış Yönetimi</h1>
        <p className="text-sm text-gray-600">Cash Flow & Likidite Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Nakit Bakiyesi"
          value="₺717K"
          change={124.1}
          previousValue="₺320K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Net Nakit Akışı"
          value="₺93K"
          change={55.0}
          previousValue="₺60K"
          icon={<TrendingUp size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Alacaklar (AR)"
          value="₺298.5K"
          change={8.5}
          previousValue="₺275K"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Borçlar (AP)"
          value="₺244K"
          change={-5.2}
          previousValue="₺257.5K"
          icon={<AlertTriangle size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="Burn Rate"
          value="₺512K"
          unit="/ay"
          change={20.4}
          previousValue="₺425K/ay"
          icon={<TrendingDown size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Runway"
          value="16.8"
          unit="ay"
          change={40.0}
          previousValue="12 ay"
          icon={<Target size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Nakit Akışı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="net" fill="#10B981" name="Net Akış (₺)" />
              <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={3} name="Bakiye (₺)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Alacak Yaşlandırma (AR)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={arAgingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="amount" name="Tutar (₺)">
                {arAgingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Borç Yaşlandırma (AP)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={apAgingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="amount" name="Tutar (₺)">
                {apAgingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Bütçe vs Gerçekleşen</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={budgetVsActualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="budget" fill="#9CA3AF" name="Bütçe (₺)" />
              <Bar dataKey="actual" fill="#10B981" name="Gerçekleşen (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Haftalık Giriş/Çıkış</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyInOutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="inflow" fill="#10B981" name="Giriş (₺)" />
              <Bar dataKey="outflow" fill="#EF4444" name="Çıkış (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Muhasebe Sistemi + Banka Entegrasyonu | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default CashFlowDashboard;








