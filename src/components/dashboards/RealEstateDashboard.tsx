// Real Estate Dashboard - Gayrimenkul Yönetimi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { Home, DollarSign, TrendingUp, Users, Key, AlertCircle } from 'lucide-react';

const occupancyTrendData = [
  { month: 'Oca', occupancy: 88.5, revenue: 2850000, avgRent: 9500 },
  { month: 'Şub', occupancy: 90.2, revenue: 3020000, avgRent: 9650 },
  { month: 'Mar', occupancy: 91.8, revenue: 3180000, avgRent: 9800 },
  { month: 'Nis', occupancy: 93.5, revenue: 3350000, avgRent: 9950 },
  { month: 'May', occupancy: 95.2, revenue: 3520000, avgRent: 10100 },
  { month: 'Haz', occupancy: 96.5, revenue: 3680000, avgRent: 10250 },
];

const propertyTypeData = [
  { type: 'Daire', units: 285, occupied: 278, occupancyRate: 97.5, revenue: 2580000 },
  { type: 'Villa', units: 42, occupied: 40, occupancyRate: 95.2, revenue: 850000 },
  { type: 'Ofis', units: 68, occupied: 65, occupancyRate: 95.6, revenue: 1280000 },
  { type: 'Dükkan', units: 58, occupied: 54, occupancyRate: 93.1, revenue: 685000 },
];

const leaseExpirationData = [
  { month: '0-3 ay', count: 28, value: 285000 },
  { month: '3-6 ay', count: 42, value: 420000 },
  { month: '6-12 ay', count: 68, value: 680000 },
  { month: '12+ ay', count: 185, value: 1850000 },
];

const maintenanceCostData = [
  { category: 'Onarım', cost: 185000, percentage: 38.5 },
  { category: 'Temizlik', cost: 95000, percentage: 19.8 },
  { category: 'Güvenlik', cost: 85000, percentage: 17.7 },
  { category: 'Peyzaj', cost: 65000, percentage: 13.5 },
  { category: 'Diğer', cost: 50000, percentage: 10.4 },
];

const tenantSatisfactionData = [
  { quarter: 'Q1', satisfaction: 4.2, nps: 42, complaints: 28 },
  { quarter: 'Q2', satisfaction: 4.3, nps: 45, complaints: 24 },
  { quarter: 'Q3', satisfaction: 4.5, nps: 52, complaints: 18 },
  { quarter: 'Q4', satisfaction: 4.7, nps: 58, complaints: 12 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const RealEstateDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Gayrimenkul Yönetimi Paneli</h1>
        <p className="text-sm text-gray-600">Portföy & Kiracı Yönetimi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Ünite"
          value="453"
          change={0}
          previousValue="453"
          icon={<Home size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Doluluk Oranı"
          value="96.5"
          unit="%"
          change={9.0}
          previousValue="88.5%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Aylık Gelir"
          value="₺3.68M"
          change={29.1}
          previousValue="₺2.85M"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ort. Kira"
          value="₺10.25K"
          change={7.9}
          previousValue="₺9.5K"
          icon={<Key size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Aktif Kiracı"
          value="437"
          change={7.6}
          previousValue="406"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Boş Ünite"
          value="16"
          change={-60.5}
          previousValue="47"
          icon={<AlertCircle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Doluluk & Gelir Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={occupancyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} domain={[85, 100]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={3} name="Doluluk (%)" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Gelir (₺)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Mülk Tipi Performansı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={propertyTypeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[90, 100]} />
              <YAxis dataKey="type" type="category" tick={{ fontSize: 10 }} width={60} />
              <Tooltip />
              <Bar dataKey="occupancyRate" name="Doluluk (%)">
                {propertyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kira Sözleşmesi Bitiş Süresi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={leaseExpirationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Sözleşme Sayısı">
                {leaseExpirationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Bakım Maliyeti Dağılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={maintenanceCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="cost" name="Maliyet (₺)">
                {maintenanceCostData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kiracı Memnuniyeti</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={tenantSatisfactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 70]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={3} name="Memnuniyet (/5)" />
              <Line yAxisId="right" type="monotone" dataKey="nps" stroke="#3B82F6" strokeWidth={2} name="NPS" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Gayrimenkul Yönetim Sistemi (PMS) | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default RealEstateDashboard;










