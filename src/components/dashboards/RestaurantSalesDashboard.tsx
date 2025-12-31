// Restaurant Sales Dashboard - Satış Göstergeleri
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import KpiCard from './KpiCard';
import { DollarSign, TrendingUp, ShoppingCart, Percent, Users, Award } from 'lucide-react';

const dailyRevenueData = [
  { date: '01 Ara', revenue: 52000, previousYear: 48000 },
  { date: '02 Ara', revenue: 54000, previousYear: 49000 },
  { date: '03 Ara', revenue: 56000, previousYear: 51000 },
  { date: '04 Ara', revenue: 58000, previousYear: 52000 },
  { date: '05 Ara', revenue: 60000, previousYear: 54000 },
  { date: '06 Ara', revenue: 62000, previousYear: 55000 },
  { date: '07 Ara', revenue: 64000, previousYear: 57000 },
];

const categorySalesData = [
  { category: 'Ana Yemekler', sales: 245000, percentage: 45 },
  { category: 'Mezeler', sales: 98000, percentage: 18 },
  { category: 'Tatlılar', sales: 87000, percentage: 16 },
  { category: 'İçecekler', sales: 76000, percentage: 14 },
  { category: 'Salatalar', sales: 38000, percentage: 7 },
];

const hourlyRevenueData = [
  { hour: '09-11', revenue: 28000 },
  { hour: '11-13', revenue: 95000 },
  { hour: '13-15', revenue: 125000 },
  { hour: '15-17', revenue: 45000 },
  { hour: '17-19', revenue: 85000 },
  { hour: '19-21', revenue: 180000 },
  { hour: '21-23', revenue: 142000 },
];

const paymentMethodData = [
  { name: 'Kredi Kartı', value: 58 },
  { name: 'Nakit', value: 28 },
  { name: 'Mobil Ödeme', value: 14 },
];

const topItemsData = [
  { item: 'Dana Bonfile', revenue: 128000, orders: 856 },
  { item: 'Izgara Tavuk', revenue: 98000, orders: 782 },
  { item: 'Levrek', revenue: 95000, orders: 543 },
  { item: 'Kuzu Şiş', revenue: 87000, orders: 612 },
  { item: 'Karides', revenue: 76000, orders: 421 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];
const PIE_COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const RestaurantSalesDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Restoran Satış Göstergeleri</h1>
        <p className="text-sm text-gray-600">Satış Analizi & Performans | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Satış"
          value="₺544K"
          change={11.5}
          previousValue="₺488K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ortalama Hesap"
          value="₺156"
          change={3.2}
          previousValue="₺151"
          icon={<TrendingUp size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Toplam Sipariş"
          value="3,487"
          change={8.7}
          previousValue="3,208"
          icon={<ShoppingCart size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Büyüme Oranı"
          value="11.5"
          unit="%"
          change={2.5}
          previousValue="9.0%"
          icon={<Percent size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Müşteri Başına"
          value="₺167"
          change={4.5}
          previousValue="₺160"
          icon={<Users size={20} />}
          color="#06B6D4"
        />
        <KpiCard
          title="En İyi Ürün"
          value="Bonfile"
          unit=""
          change={0}
          previousValue="-"
          icon={<Award size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Satış Trendi (Yıllık Karşılaştırma)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="2025" />
              <Line type="monotone" dataKey="previousYear" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="2024" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kategori Bazlı Satışlar</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categorySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="sales" name="Satış (₺)">
                {categorySalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Saatlik Satış Dağılımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hourlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" name="Satış (₺)">
                {hourlyRevenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.revenue > 150000 ? '#EF4444' : entry.revenue > 100000 ? '#F59E0B' : '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Top 5 En Çok Satan Ürünler</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topItemsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="item" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="revenue" name="Gelir (₺)">
                {topItemsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ödeme Yöntemi Dağılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: POS Sistemi | Otomatik güncellenme: Gerçek zamanlı | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default RestaurantSalesDashboard;








