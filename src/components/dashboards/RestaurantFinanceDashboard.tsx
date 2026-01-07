// Restaurant Finance Dashboard - Finansal Performans
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { DollarSign, TrendingDown, TrendingUp, Percent, PieChart as PieIcon, Target } from 'lucide-react';

const revenueData = [
  { month: 'Oca', revenue: 185000, foodCost: 55500, laborCost: 58000, netProfit: 42500 },
  { month: 'Şub', revenue: 192000, foodCost: 57600, laborCost: 59500, netProfit: 45100 },
  { month: 'Mar', revenue: 198000, foodCost: 59400, laborCost: 60500, netProfit: 47200 },
  { month: 'Nis', revenue: 205000, foodCost: 61500, laborCost: 61800, netProfit: 50100 },
  { month: 'May', revenue: 212000, foodCost: 63600, laborCost: 63000, netProfit: 52800 },
  { month: 'Haz', revenue: 218000, foodCost: 65400, laborCost: 64200, netProfit: 54600 },
];

const costBreakdownData = [
  { category: 'Gıda Maliyeti', amount: 63600, percentage: 30.0 },
  { category: 'İşçilik', amount: 63000, percentage: 29.7 },
  { category: 'Kira', amount: 28000, percentage: 13.2 },
  { category: 'Utilities', amount: 12000, percentage: 5.7 },
  { category: 'Marketing', amount: 8500, percentage: 4.0 },
  { category: 'Diğer', amount: 15900, percentage: 7.5 },
];

const profitMarginData = [
  { month: 'Oca', margin: 23.0, target: 25.0 },
  { month: 'Şub', margin: 23.5, target: 25.0 },
  { month: 'Mar', margin: 23.8, target: 25.0 },
  { month: 'Nis', margin: 24.4, target: 25.0 },
  { month: 'May', margin: 24.9, target: 25.0 },
  { month: 'Haz', margin: 25.0, target: 25.0 },
];

const primeCostData = [
  { month: 'Oca', primeCost: 113500, percentage: 61.4 },
  { month: 'Şub', primeCost: 117100, percentage: 61.0 },
  { month: 'Mar', primeCost: 119900, percentage: 60.6 },
  { month: 'Nis', primeCost: 123300, percentage: 60.1 },
  { month: 'May', primeCost: 126600, percentage: 59.7 },
  { month: 'Haz', primeCost: 129600, percentage: 59.4 },
];

const menuContributionData = [
  { item: 'Ana Yemek', contribution: 67 },
  { item: 'Tatlı', contribution: 39 },
  { item: 'Mezeler', contribution: 28 },
  { item: 'İçecek', contribution: 22 },
  { item: 'Salata', contribution: 15 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

const RestaurantFinanceDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Restoran Finansal Performans</h1>
        <p className="text-sm text-gray-600">Finansal Analiz & Kârlılık | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Gelir"
          value="₺218K"
          change={10.3}
          previousValue="₺198K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Food Cost %"
          value="30.0"
          unit="%"
          change={0.0}
          previousValue="30.0%"
          icon={<TrendingDown size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Labor Cost %"
          value="29.7"
          unit="%"
          change={-0.3}
          previousValue="30.0%"
          icon={<TrendingDown size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Prime Cost %"
          value="59.4"
          unit="%"
          change={-2.0}
          previousValue="61.4%"
          icon={<Percent size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Kâr Marjı"
          value="25.0"
          unit="%"
          change={2.0}
          previousValue="23.0%"
          icon={<Target size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Net Kâr"
          value="₺54.6K"
          change={28.5}
          previousValue="₺42.5K"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Gelir & Maliyet Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="revenue" fill="#10B981" name="Gelir (₺)" />
              <Line type="monotone" dataKey="netProfit" stroke="#3B82F6" strokeWidth={3} name="Net Kâr (₺)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Maliyet Kırılımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={costBreakdownData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={100} />
              <Tooltip />
              <Bar dataKey="amount" name="Tutar (₺)">
                {costBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kâr Marjı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={profitMarginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[20, 28]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="margin" stroke="#10B981" strokeWidth={3} name="Kâr Marjı (%)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef (25%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Prime Cost Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={primeCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[55, 65]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="primeCost" fill="#8B5CF6" name="Prime Cost (₺)" />
              <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#EF4444" strokeWidth={3} name="Prime Cost (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Menü Katkı Analizi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={menuContributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="item" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="contribution" name="Katkı (%)">
                {menuContributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Muhasebe Sistemi + POS Entegrasyonu | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default RestaurantFinanceDashboard;















