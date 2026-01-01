// Supply Chain Dashboard - Tedarik Zinciri Yönetimi
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Package, TrendingUp, Clock, DollarSign, Truck, AlertTriangle } from 'lucide-react';

const orderFulfillmentData = [
  { week: 'Hf1', orders: 1250, onTime: 1125, delayed: 95, otd: 90.0 },
  { week: 'Hf2', orders: 1320, onTime: 1212, delayed: 82, otd: 91.8 },
  { week: 'Hf3', orders: 1385, onTime: 1302, delayed: 69, otd: 94.0 },
  { week: 'Hf4', orders: 1450, onTime: 1392, delayed: 58, otd: 96.0 },
  { week: 'Hf5', orders: 1520, onTime: 1474, delayed: 46, otd: 97.0 },
  { week: 'Hf6', orders: 1580, onTime: 1549, delayed: 31, otd: 98.0 },
];

const supplierPerformanceData = [
  { supplier: 'Tedarikçi-A', onTime: 98.5, quality: 97.2, cost: 285000 },
  { supplier: 'Tedarikçi-B', onTime: 96.8, quality: 98.5, cost: 245000 },
  { supplier: 'Tedarikçi-C', onTime: 95.2, quality: 96.8, cost: 220000 },
  { supplier: 'Tedarikçi-D', onTime: 92.5, quality: 95.5, cost: 185000 },
  { supplier: 'Tedarikçi-E', onTime: 90.8, quality: 94.2, cost: 165000 },
];

const inventoryTurnoverData = [
  { category: 'Hammadde', turnover: 8.5, daysOnHand: 42 },
  { category: 'Yarı Mamul', turnover: 12.2, daysOnHand: 30 },
  { category: 'Mamul', turnover: 15.8, daysOnHand: 23 },
  { category: 'MRO', turnover: 4.2, daysOnHand: 87 },
];

const leadTimeData = [
  { month: 'Oca', planned: 28, actual: 32, variance: 4 },
  { month: 'Şub', planned: 28, actual: 30, variance: 2 },
  { month: 'Mar', planned: 28, actual: 29, variance: 1 },
  { month: 'Nis', planned: 28, actual: 28, variance: 0 },
];

const costSavingsData = [
  { initiative: 'Vendor Consolidation', savings: 185000 },
  { initiative: 'Volume Discount', savings: 142000 },
  { initiative: 'Process Optimization', savings: 95000 },
  { initiative: 'Alternative Sourcing', savings: 68000 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const SupplyChainDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Tedarik Zinciri Yönetimi</h1>
        <p className="text-sm text-gray-600">Sipariş & Tedarikçi Performansı | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Sipariş Adedi"
          value="1,580"
          change={26.4}
          previousValue="1,250"
          icon={<Package size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="OTD %"
          value="98.0"
          unit="%"
          change={8.9}
          previousValue="90.0%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Lead Time"
          value="28"
          unit="gün"
          change={-12.5}
          previousValue="32 gün"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Stok Devir"
          value="11.6"
          unit="x/yıl"
          change={15.0}
          previousValue="10.1 x/yıl"
          icon={<Truck size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Tasarruf"
          value="₺490K"
          change={28.5}
          previousValue="₺381K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Risk Siparişleri"
          value="31"
          change={-67.4}
          previousValue="95"
          icon={<AlertTriangle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Sipariş Karşılama Performansı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={orderFulfillmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[85, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="orders" fill="#3B82F6" name="Toplam Sipariş" />
              <Line yAxisId="right" type="monotone" dataKey="otd" stroke="#10B981" strokeWidth={3} name="OTD (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Tedarikçi Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={supplierPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[85, 100]} />
              <YAxis dataKey="supplier" type="category" tick={{ fontSize: 9 }} width={85} />
              <Tooltip />
              <Bar dataKey="onTime" name="Zamanında (%)">
                {supplierPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Stok Devir Hızı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={inventoryTurnoverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="turnover" name="Devir (x/yıl)">
                {inventoryTurnoverData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Lead Time Analizi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="planned" fill="#9CA3AF" name="Planlanan (gün)" />
              <Bar dataKey="actual" fill="#3B82F6" name="Gerçekleşen (gün)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Maliyet Tasarruf İnisiyatifleri</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={costSavingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="initiative" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="savings" name="Tasarruf (₺)">
                {costSavingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: ERP Sistemi + Tedarikçi Portalı | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default SupplyChainDashboard;










