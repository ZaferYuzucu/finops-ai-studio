// Restaurant Operations Dashboard - Professional Style
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { DollarSign, ShoppingCart, Users, TrendingUp, Clock, Star } from 'lucide-react';

// Mock Data
const dailyRevenueData = [
  { date: '01 Ara', revenue: 45000, target: 50000 },
  { date: '02 Ara', revenue: 52000, target: 50000 },
  { date: '03 Ara', revenue: 48000, target: 50000 },
  { date: '04 Ara', revenue: 61000, target: 50000 },
  { date: '05 Ara', revenue: 55000, target: 50000 },
  { date: '06 Ara', revenue: 68000, target: 50000 },
  { date: '07 Ara', revenue: 71000, target: 50000 },
];

const hourlyBusyData = [
  { hour: '09:00', orders: 12 },
  { hour: '10:00', orders: 18 },
  { hour: '11:00', orders: 25 },
  { hour: '12:00', orders: 68 },
  { hour: '13:00', orders: 82 },
  { hour: '14:00', orders: 45 },
  { hour: '15:00', orders: 28 },
  { hour: '16:00', orders: 22 },
  { hour: '17:00', orders: 35 },
  { hour: '18:00', orders: 72 },
  { hour: '19:00', orders: 95 },
  { hour: '20:00', orders: 88 },
  { hour: '21:00', orders: 52 },
];

const productSalesData = [
  { product: 'Pizza Margherita', sales: 125000 },
  { product: 'Burger Menü', sales: 98000 },
  { product: 'Pasta Carbonara', sales: 87000 },
  { product: 'Izgara Tavuk', sales: 76000 },
  { product: 'Salata Bar', sales: 54000 },
  { product: 'Tatlılar', sales: 45000 },
  { product: 'İçecekler', sales: 38000 },
];

const expenseBreakdownData = [
  { category: 'Gıda', amount: 185000 },
  { category: 'İşçilik', amount: 145000 },
  { category: 'Kira', amount: 65000 },
  { category: 'Utilities', amount: 28000 },
  { category: 'Marketing', amount: 22000 },
];

const tableTurnoverData = [
  { date: '01 Ara', turnover: 2.3, target: 2.5 },
  { date: '02 Ara', turnover: 2.5, target: 2.5 },
  { date: '03 Ara', turnover: 2.4, target: 2.5 },
  { date: '04 Ara', turnover: 2.8, target: 2.5 },
  { date: '05 Ara', turnover: 2.6, target: 2.5 },
  { date: '06 Ara', turnover: 2.9, target: 2.5 },
  { date: '07 Ara', turnover: 3.1, target: 2.5 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];

const RestaurantDashboard: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto p-4" style={{
      background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 25%, #faf5ff 50%, #f0f9ff 75%, #f5f8ff 100%)'
    }}>
      <div 
        className="p-6 mx-auto"
        style={{
          width: '1123px',
          maxWidth: '1123px',
          minHeight: 'auto',
          fontFamily: 'Inter, system-ui, sans-serif',
          transformOrigin: 'top center'
        }}
      >
      {/* Dashboard Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-gray-900">Restoran Operasyon Paneli</h1>
        <p className="text-sm text-gray-600">Son Güncelleme: 29 Aralık 2025 | MTD (Ay Başından Bu Yana)</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Günlük Ciro (MTD)"
          value="₺458K"
          change={12.5}
          previousValue="₺407K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Sipariş Sayısı"
          value="1,247"
          change={8.3}
          previousValue="1,152"
          icon={<ShoppingCart size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Ort. Sepet"
          value="₺367"
          change={-2.1}
          previousValue="₺375"
          icon={<Users size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Food Cost %"
          value="31.2"
          unit="%"
          change={1.5}
          previousValue="30.7%"
          icon={<TrendingUp size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Labor Cost %"
          value="28.5"
          unit="%"
          change={-0.8}
          previousValue="29.3%"
          icon={<Clock size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="Müş. Memnuniyeti"
          value="4.7"
          unit="/5"
          change={3.2}
          previousValue="4.55"
          icon={<Star size={20} />}
          color="#10B981"
        />
      </div>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Daily Revenue Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Ciro Trendi</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Ciro (₺)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Busy Hours */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Saat Bazlı Yoğunluk</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourlyBusyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" name="Sipariş Sayısı">
                {hourlyBusyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.orders > 70 ? '#EF4444' : entry.orders > 40 ? '#F59E0B' : '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Sales */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ürün Satış Katkısı (Top 7)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productSalesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="product" type="category" tick={{ fontSize: 10 }} width={100} />
              <Tooltip />
              <Bar dataKey="sales" name="Satış (₺)">
                {productSalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Gider Kırılımı (MTD)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={expenseBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="amount" name="Tutar (₺)">
                {expenseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table Turnover */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Masa Devir Hızı (günlük)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={tableTurnoverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 3.5]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="turnover" stroke="#3B82F6" strokeWidth={3} name="Devir" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef (2.5)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer - Data Source */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: POS Sistemi + Mutfak Ekranları | Otomatik güncellenme: Her 5 dakika | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default RestaurantDashboard;
