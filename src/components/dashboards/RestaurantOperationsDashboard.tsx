// Restaurant Operations Dashboard - Operasyon Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { Clock, Users, TrendingUp, Star, RefreshCw, ShoppingBag } from 'lucide-react';

// Mock Data - restoran-operasyon.csv'den
const dailySalesData = [
  { date: '01 Haf', sales: 42500, target: 45000 },
  { date: '02 Haf', sales: 45000, target: 45000 },
  { date: '03 Haf', sales: 43800, target: 45000 },
  { date: '04 Haf', sales: 46200, target: 45000 },
  { date: '01 Şub', sales: 48000, target: 47000 },
  { date: '02 Şub', sales: 49500, target: 47000 },
  { date: '03 Şub', sales: 47800, target: 47000 },
  { date: '04 Şub', sales: 50100, target: 47000 },
  { date: '01 Mar', sales: 52500, target: 50000 },
  { date: '02 Mar', sales: 54200, target: 50000 },
];

const tableTurnoverData = [
  { date: '01 Haf', turnover: 2.7, target: 3.0 },
  { date: '02 Haf', turnover: 2.8, target: 3.0 },
  { date: '03 Haf', turnover: 2.7, target: 3.0 },
  { date: '04 Haf', turnover: 2.9, target: 3.0 },
  { date: '01 Şub', turnover: 3.0, target: 3.0 },
  { date: '02 Şub', turnover: 3.0, target: 3.0 },
  { date: '03 Şub', turnover: 2.9, target: 3.0 },
  { date: '04 Şub', turnover: 3.1, target: 3.0 },
  { date: '01 Mar', turnover: 3.2, target: 3.0 },
  { date: '02 Mar', turnover: 3.3, target: 3.0 },
];

const topProductsData = [
  { product: 'Dana Bonfile', count: 456 },
  { product: 'Izgara Tavuk', count: 423 },
  { product: 'Karides Güveç', count: 387 },
  { product: 'Levrek Izgara', count: 352 },
  { product: 'Kuzu Şiş', count: 318 },
  { product: 'Tavuk Şinitzel', count: 285 },
  { product: 'Köfte', count: 247 },
];

const peakHoursData = [
  { hour: '12:00-14:00', orders: 145 },
  { hour: '14:00-16:00', orders: 78 },
  { hour: '16:00-18:00', orders: 52 },
  { hour: '18:00-20:00', orders: 198 },
  { hour: '20:00-22:00', orders: 245 },
  { hour: '22:00-00:00', orders: 87 },
];

const reservationVsOnlineData = [
  { date: '01 Haf', reservation: 75, online: 12 },
  { date: '02 Haf', reservation: 78, online: 14 },
  { date: '03 Haf', reservation: 76, online: 13 },
  { date: '04 Haf', reservation: 80, online: 15 },
  { date: '01 Şub', reservation: 82, online: 16 },
  { date: '02 Şub', reservation: 83, online: 17 },
  { date: '03 Şub', reservation: 81, online: 16 },
  { date: '04 Şub', reservation: 85, online: 18 },
  { date: '01 Mar', reservation: 87, online: 19 },
  { date: '02 Mar', reservation: 89, online: 21 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];

const RestaurantOperationsDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Restoran Operasyon Paneli</h1>
        <p className="text-sm text-gray-600">Operasyonel Performans | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Günlük Satış"
          value="₺52.5K"
          change={9.5}
          previousValue="₺48K"
          icon={<ShoppingBag size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Müşteri Sayısı"
          value="352"
          change={9.3}
          previousValue="322"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Masa Devir Oranı"
          value="3.2"
          unit="/gün"
          change={6.7}
          previousValue="3.0"
          icon={<RefreshCw size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Ortalama Hesap"
          value="₺149"
          change={0.1}
          previousValue="₺149"
          icon={<TrendingUp size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Hazırlama Süresi"
          value="15"
          unit="dk"
          change={-11.8}
          previousValue="17 dk"
          icon={<Clock size={20} />}
          color="#06B6D4"
        />
        <KpiCard
          title="Müşteri Memnun."
          value="4.7"
          unit="/5"
          change={4.4}
          previousValue="4.5"
          icon={<Star size={20} />}
          color="#10B981"
        />
      </div>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Daily Sales Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Haftalık Satış Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} name="Satış (₺)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table Turnover */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Masa Devir Oranı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={tableTurnoverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 4]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="turnover" stroke="#8B5CF6" strokeWidth={3} name="Devir" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef (3.0)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">En Çok Satan Ürünler (Top 7)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="product" type="category" tick={{ fontSize: 10 }} width={100} />
              <Tooltip />
              <Bar dataKey="count" name="Sipariş Adedi">
                {topProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Peak Hours */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Yoğun Saatler Analizi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" name="Sipariş Sayısı">
                {peakHoursData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.orders > 200 ? '#EF4444' : entry.orders > 150 ? '#F59E0B' : '#10B981'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reservation vs Online */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Rezervasyon Doluluk vs Online Sipariş</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={reservationVsOnlineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="reservation" stroke="#3B82F6" strokeWidth={3} name="Doluluk (%)" />
              <Line type="monotone" dataKey="online" stroke="#10B981" strokeWidth={3} name="Online (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: POS Sistemi + Rezervasyon Platformu | Otomatik güncellenme: Her saat | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default RestaurantOperationsDashboard;






