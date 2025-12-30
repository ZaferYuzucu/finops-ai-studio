// Finance / Cash Flow Dashboard - Professional Style
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { DollarSign, TrendingDown, Calendar, CreditCard, Wallet, ArrowDownUp } from 'lucide-react';

// Mock Data
const cashFlowData = [
  { month: 'Haz', inflow: 850000, outflow: 720000, net: 130000 },
  { month: 'Tem', inflow: 920000, outflow: 780000, net: 140000 },
  { month: 'Ağu', inflow: 880000, outflow: 850000, net: 30000 },
  { month: 'Eyl', inflow: 1050000, outflow: 890000, net: 160000 },
  { month: 'Eki', inflow: 1120000, outflow: 920000, net: 200000 },
  { month: 'Kas', inflow: 980000, outflow: 1050000, net: -70000 },
  { month: 'Ara', inflow: 1250000, outflow: 980000, net: 270000 },
];

const arAgingData = [
  { period: '0-30 gün', amount: 450000 },
  { period: '31-60 gün', amount: 280000 },
  { period: '61-90 gün', amount: 120000 },
  { period: '90+ gün', amount: 85000 },
];

const apAgingData = [
  { period: '0-30 gün', amount: 380000 },
  { period: '31-60 gün', amount: 220000 },
  { period: '61-90 gün', amount: 95000 },
  { period: '90+ gün', amount: 45000 },
];

const revenueExpenseData = [
  { month: 'Haz', revenue: 850000, expense: 720000 },
  { month: 'Tem', revenue: 920000, expense: 780000 },
  { month: 'Ağu', revenue: 880000, expense: 850000 },
  { month: 'Eyl', revenue: 1050000, expense: 890000 },
  { month: 'Eki', revenue: 1120000, expense: 920000 },
  { month: 'Kas', revenue: 980000, expense: 1050000 },
  { month: 'Ara', revenue: 1250000, expense: 980000 },
];

const budgetActualData = [
  { category: 'Satışlar', budget: 1200000, actual: 1250000, variance: 50000 },
  { category: 'COGS', budget: 480000, actual: 520000, variance: -40000 },
  { category: 'İşletme Gid.', budget: 320000, actual: 280000, variance: 40000 },
  { category: 'Pazarlama', budget: 150000, actual: 165000, variance: -15000 },
  { category: 'R&D', budget: 80000, actual: 72000, variance: 8000 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const FinanceDashboard: React.FC = () => {
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
      {/* Dashboard Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-gray-900">Finans & Nakit Akış Paneli</h1>
        <p className="text-sm text-gray-600">Aralık 2025 | Son Güncelleme: 29.12.2025</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Nakit (Kasada)"
          value="₺1.25M"
          change={8.5}
          previousValue="₺1.15M"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Burn Rate"
          value="₺280K"
          unit="/ay"
          change={-5.2}
          previousValue="₺295K"
          icon={<TrendingDown size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="Runway"
          value="4.5"
          unit="ay"
          change={12.5}
          previousValue="3.9"
          icon={<Calendar size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="AR (Alacaklar)"
          value="₺935K"
          change={3.2}
          previousValue="₺906K"
          icon={<CreditCard size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="AP (Borçlar)"
          value="₺740K"
          change={-2.8}
          previousValue="₺761K"
          icon={<Wallet size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Net Cash Flow"
          value="₺270K"
          change={485}
          previousValue="-₺70K"
          icon={<ArrowDownUp size={20} />}
          color="#10B981"
        />
      </div>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Cash Flow Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm col-span-2">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Nakit Akışı Trendi (Son 7 Ay)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="inflow" stroke="#10B981" strokeWidth={3} name="Gelen (₺)" />
              <Line type="monotone" dataKey="outflow" stroke="#EF4444" strokeWidth={3} name="Giden (₺)" />
              <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={3} strokeDasharray="5 5" name="Net (₺)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AR Aging */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">AR Aging (Alacak Yaşı)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={arAgingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
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
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* AP Aging */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">AP Aging (Borç Yaşı)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={apAgingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
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

        {/* Revenue vs Expense */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Gelir vs Gider (Aylık)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueExpenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="revenue" name="Gelir" fill="#10B981" />
              <Bar dataKey="expense" name="Gider" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget vs Actual */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Bütçe vs Gerçekleşen (Aralık)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={budgetActualData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="budget" name="Bütçe" fill="#9CA3AF" />
              <Bar dataKey="actual" name="Gerçekleşen" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Variance Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Bütçe Varyansları (Ayrıntılı)</h3>
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-2 font-bold">Kategori</th>
              <th className="text-right p-2 font-bold">Bütçe (₺)</th>
              <th className="text-right p-2 font-bold">Gerçekleşen (₺)</th>
              <th className="text-right p-2 font-bold">Varyans (₺)</th>
              <th className="text-right p-2 font-bold">Varyans (%)</th>
            </tr>
          </thead>
          <tbody>
            {budgetActualData.map((row, index) => {
              const variancePct = ((row.actual - row.budget) / row.budget * 100).toFixed(1);
              const isPositive = row.variance > 0;
              return (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-2 font-medium">{row.category}</td>
                  <td className="text-right p-2">₺{row.budget.toLocaleString('tr-TR')}</td>
                  <td className="text-right p-2">₺{row.actual.toLocaleString('tr-TR')}</td>
                  <td className={`text-right p-2 font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}₺{row.variance.toLocaleString('tr-TR')}
                  </td>
                  <td className={`text-right p-2 font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{variancePct}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: ERP + Banka API | Günlük Güncelleme 09:00 | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default FinanceDashboard;

