// Hotel Operations Dashboard - Otel Operasyon Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Home, Users, DollarSign, TrendingUp, Star, Clock } from 'lucide-react';

const occupancyData = [
  { month: 'Oca', occupancy: 72.5, adr: 850, revpar: 616 },
  { month: 'Şub', occupancy: 75.2, adr: 870, revpar: 654 },
  { month: 'Mar', occupancy: 78.8, adr: 890, revpar: 701 },
  { month: 'Nis', occupancy: 82.5, adr: 920, revpar: 759 },
  { month: 'May', occupancy: 85.3, adr: 950, revpar: 810 },
  { month: 'Haz', occupancy: 88.2, adr: 980, revpar: 864 },
];

const roomTypePerformanceData = [
  { type: 'Deluxe', revenue: 185000, occupancy: 92.5, adr: 1250 },
  { type: 'Suite', revenue: 142000, occupancy: 88.2, adr: 1850 },
  { type: 'Standard', revenue: 128000, occupancy: 85.8, adr: 750 },
  { type: 'Economy', revenue: 95000, occupancy: 82.5, adr: 550 },
];

const channelMixData = [
  { channel: 'Direkt', bookings: 285, revenue: 285000, commission: 0 },
  { channel: 'OTA', bookings: 420, revenue: 380000, commission: 57000 },
  { channel: 'Kurumsal', bookings: 195, revenue: 225000, commission: 11250 },
  { channel: 'Tour Operator', bookings: 148, revenue: 160000, commission: 24000 },
];

const dailyArrivalDepartureData = [
  { day: 'Pzt', arrival: 45, departure: 38, net: 7 },
  { day: 'Sal', arrival: 52, departure: 42, net: 10 },
  { day: 'Çar', arrival: 48, departure: 35, net: 13 },
  { day: 'Per', arrival: 55, departure: 48, net: 7 },
  { day: 'Cum', arrival: 68, departure: 52, net: 16 },
  { day: 'Cmt', arrival: 72, departure: 45, net: 27 },
  { day: 'Paz', arrival: 38, departure: 65, net: -27 },
];

const guestSatisfactionData = [
  { category: 'Oda Temizliği', score: 4.7, target: 4.5 },
  { category: 'Personel', score: 4.6, target: 4.5 },
  { category: 'Lokasyon', score: 4.8, target: 4.5 },
  { category: 'Fiyat/Değer', score: 4.3, target: 4.5 },
  { category: 'Kahvaltı', score: 4.5, target: 4.5 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const HotelOperationsDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Otel Operasyon Paneli</h1>
        <p className="text-sm text-gray-600">Doluluk & Performans Göstergeleri | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Doluluk Oranı"
          value="88.2"
          unit="%"
          change={21.7}
          previousValue="72.5%"
          icon={<Home size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="ADR"
          value="₺980"
          change={15.3}
          previousValue="₺850"
          icon={<DollarSign size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="RevPAR"
          value="₺864"
          change={40.3}
          previousValue="₺616"
          icon={<TrendingUp size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Toplam Oda"
          value="120"
          change={0}
          previousValue="120"
          icon={<Users size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Memnuniyet"
          value="4.6"
          unit="/5"
          change={4.5}
          previousValue="4.4/5"
          icon={<Star size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ort. Konaklama"
          value="2.8"
          unit="gece"
          change={7.7}
          previousValue="2.6 gece"
          icon={<Clock size={20} />}
          color="#3B82F6"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Doluluk & RevPAR Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="right" dataKey="revpar" fill="#8B5CF6" name="RevPAR (₺)" />
              <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={3} name="Doluluk (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Oda Tipi Performansı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={roomTypePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="type" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" name="Gelir (₺)">
                {roomTypePerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kanal Dağılımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={channelMixData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Bar dataKey="revenue" name="Gelir (₺)">
                {channelMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Giriş/Çıkış</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dailyArrivalDepartureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="arrival" fill="#10B981" name="Giriş" />
              <Bar dataKey="departure" fill="#EF4444" name="Çıkış" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Müşteri Memnuniyeti</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={guestSatisfactionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 5]} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="score" fill="#10B981" name="Skor" />
              <Bar dataKey="target" fill="#9CA3AF" name="Hedef" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: PMS (Property Management System) + Guest Feedback | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default HotelOperationsDashboard;








