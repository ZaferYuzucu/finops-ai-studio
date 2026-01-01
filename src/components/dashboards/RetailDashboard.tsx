// Retail Dashboard - Perakende Satış Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { ShoppingBag, Users, TrendingUp, DollarSign, Package, Target } from 'lucide-react';

const salesTrendData = [
  { week: 'Hf1', sales: 285000, transactions: 1850, basketSize: 154 },
  { week: 'Hf2', sales: 312000, transactions: 1920, basketSize: 162.5 },
  { week: 'Hf3', sales: 335000, transactions: 2050, basketSize: 163.4 },
  { week: 'Hf4', sales: 358000, transactions: 2180, basketSize: 164.2 },
  { week: 'Hf5', sales: 385000, transactions: 2320, basketSize: 166.0 },
  { week: 'Hf6', sales: 412000, transactions: 2480, basketSize: 166.1 },
];

const categoryPerformanceData = [
  { category: 'Giyim', sales: 185000, margin: 42.5, inventory: 285000 },
  { category: 'Elektronik', sales: 142000, margin: 28.2, inventory: 420000 },
  { category: 'Gıda', sales: 95000, margin: 18.5, inventory: 125000 },
  { category: 'Ev & Yaşam', sales: 85000, margin: 35.8, inventory: 185000 },
  { category: 'Spor', sales: 72000, margin: 38.2, inventory: 148000 },
];

const storeComparisonData = [
  { store: 'Mağaza-1', sales: 185000, traffic: 5800, conversion: 42.8 },
  { store: 'Mağaza-2', sales: 165000, traffic: 5200, conversion: 38.5 },
  { store: 'Mağaza-3', sales: 142000, traffic: 4850, conversion: 35.2 },
  { store: 'Mağaza-4', sales: 128000, traffic: 4200, conversion: 40.5 },
];

const hourlyTrafficData = [
  { hour: '09-11', traffic: 485, sales: 42500 },
  { hour: '11-13', traffic: 720, sales: 68000 },
  { hour: '13-15', traffic: 850, sales: 85000 },
  { hour: '15-17', traffic: 920, sales: 92000 },
  { hour: '17-19', traffic: 1250, sales: 135000 },
  { hour: '19-21', traffic: 685, sales: 65000 },
];

const loyaltyProgramData = [
  { month: 'Oca', members: 12500, activeRate: 62.5, avgSpend: 285 },
  { month: 'Şub', members: 13200, activeRate: 64.2, avgSpend: 292 },
  { month: 'Mar', members: 13850, activeRate: 65.8, avgSpend: 298 },
  { month: 'Nis', members: 14500, activeRate: 67.5, avgSpend: 305 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'];

const RetailDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Perakende Satış Paneli</h1>
        <p className="text-sm text-gray-600">Mağaza Performansı & Müşteri Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Haftalık Satış"
          value="₺412K"
          change={44.6}
          previousValue="₺285K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="İşlem Sayısı"
          value="2,480"
          change={34.1}
          previousValue="1,850"
          icon={<ShoppingBag size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Ort. Sepet"
          value="₺166"
          change={7.8}
          previousValue="₺154"
          icon={<Target size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Müşteri Trafiği"
          value="5,910"
          change={18.8}
          previousValue="4,975"
          icon={<Users size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Dönüşüm"
          value="42.0"
          unit="%"
          change={12.9}
          previousValue="37.2%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Sadakat Üyeleri"
          value="14.5K"
          change={16.0}
          previousValue="12.5K"
          icon={<Package size={20} />}
          color="#3B82F6"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Satış Trendi & Sepet Büyüklüğü</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="sales" fill="#10B981" name="Satış (₺)" />
              <Line yAxisId="right" type="monotone" dataKey="basketSize" stroke="#8B5CF6" strokeWidth={3} name="Ort. Sepet (₺)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kategori Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="sales" name="Satış (₺)">
                {categoryPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Mağaza Karşılaştırma</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={storeComparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="store" type="category" tick={{ fontSize: 10 }} width={75} />
              <Tooltip />
              <Bar dataKey="sales" name="Satış (₺)">
                {storeComparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Saatlik Trafik & Satış</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={hourlyTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="traffic" fill="#3B82F6" name="Trafik" />
              <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} name="Satış (₺)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Sadakat Programı Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={loyaltyProgramData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="members" stroke="#3B82F6" strokeWidth={3} name="Üye Sayısı" />
              <Line type="monotone" dataKey="activeRate" stroke="#10B981" strokeWidth={2} name="Aktif Oran (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: POS Sistemi + Müşteri Sayma Sensörleri | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default RetailDashboard;










