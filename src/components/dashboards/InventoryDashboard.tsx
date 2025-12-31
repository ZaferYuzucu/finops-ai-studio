// Inventory Management Dashboard - Stok Yönetimi
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Package, TrendingUp, AlertTriangle, DollarSign, BarChart3, Clock } from 'lucide-react';

const inventoryValueData = [
  { month: 'Oca', value: 485000, turnover: 6.2, target: 8.0 },
  { month: 'Şub', value: 462000, turnover: 6.8, target: 8.0 },
  { month: 'Mar', value: 448000, turnover: 7.2, target: 8.0 },
  { month: 'Nis', value: 435000, turnover: 7.6, target: 8.0 },
  { month: 'May', value: 420000, turnover: 7.9, target: 8.0 },
  { month: 'Haz', value: 408000, turnover: 8.1, target: 8.0 },
];

const stockLevelData = [
  { category: 'Hammadde', current: 185000, optimal: 150000, min: 100000 },
  { category: 'Yarı Mamul', current: 95000, optimal: 80000, min: 50000 },
  { category: 'Mamul', current: 128000, optimal: 120000, min: 80000 },
];

const slowMovingData = [
  { item: 'Ürün-A47', value: 28500, days: 185, category: 'Hammadde' },
  { item: 'Ürün-B23', value: 22000, days: 162, category: 'Yarı Mamul' },
  { item: 'Ürün-C15', value: 18500, days: 148, category: 'Mamul' },
  { item: 'Ürün-D09', value: 15200, days: 132, category: 'Hammadde' },
  { item: 'Ürün-E31', value: 12800, days: 118, category: 'Mamul' },
];

const abcAnalysisData = [
  { class: 'A (Top 20%)', items: 45, value: 285000, percentage: 69.9 },
  { class: 'B (Middle 30%)', items: 68, value: 90000, percentage: 22.1 },
  { class: 'C (Bottom 50%)', items: 112, value: 33000, percentage: 8.1 },
];

const stockoutRiskData = [
  { week: 'Hf1', risk: 12, prevented: 3 },
  { week: 'Hf2', risk: 15, prevented: 5 },
  { week: 'Hf3', risk: 10, prevented: 4 },
  { week: 'Hf4', risk: 8, prevented: 6 },
  { week: 'Hf5', risk: 6, prevented: 5 },
  { week: 'Hf6', risk: 5, prevented: 4 },
];

const COLORS = ['#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6', '#10B981'];

const InventoryDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Stok Yönetimi Dashboard</h1>
        <p className="text-sm text-gray-600">Envanter Analizi & Devir Hızı | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Stok Değeri"
          value="₺408K"
          change={-15.9}
          previousValue="₺485K"
          icon={<DollarSign size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Devir Hızı"
          value="8.1"
          unit="x/yıl"
          change={30.6}
          previousValue="6.2 x/yıl"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Toplam SKU"
          value="225"
          change={0}
          previousValue="225"
          icon={<Package size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Yavaş Hareket"
          value="₺97K"
          change={-12.3}
          previousValue="₺110.6K"
          icon={<AlertTriangle size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Stoksuz Risk"
          value="5"
          unit="ürün"
          change={-58.3}
          previousValue="12 ürün"
          icon={<Clock size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="A-Class %"
          value="69.9"
          unit="%"
          change={1.2}
          previousValue="68.7%"
          icon={<BarChart3 size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Stok Değeri & Devir Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={inventoryValueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 10]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="value" fill="#3B82F6" name="Stok Değeri (₺)" />
              <Line yAxisId="right" type="monotone" dataKey="turnover" stroke="#10B981" strokeWidth={3} name="Devir (x)" />
              <Line yAxisId="right" type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kategori Bazlı Stok Seviyesi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stockLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="current" fill="#3B82F6" name="Mevcut (₺)" />
              <Bar dataKey="optimal" fill="#10B981" name="Optimal (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Yavaş Hareket Eden Ürünler (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={slowMovingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="item" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="value" name="Değer (₺)">
                {slowMovingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">ABC Analizi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={abcAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="class" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="value" fill="#10B981" name="Değer (₺)" />
              <Bar dataKey="items" fill="#3B82F6" name="SKU Adedi" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Stoksuz Kalma Riski</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stockoutRiskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="risk" fill="#EF4444" name="Risk" />
              <Bar dataKey="prevented" fill="#10B981" name="Önlenen" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: ERP Stok Modülü + Depo Yönetim Sistemi | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default InventoryDashboard;








