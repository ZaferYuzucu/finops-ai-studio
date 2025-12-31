// Restaurant Labor Dashboard - İşgücü Yönetimi
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { Users, Clock, DollarSign, TrendingUp, Award, AlertCircle } from 'lucide-react';

const laborCostData = [
  { week: 'Hf1', cost: 58000, hours: 1840, revenue: 185000 },
  { week: 'Hf2', cost: 59500, hours: 1890, revenue: 192000 },
  { week: 'Hf3', cost: 60500, hours: 1920, revenue: 198000 },
  { week: 'Hf4', cost: 61800, hours: 1960, revenue: 205000 },
];

const productivityData = [
  { employee: 'Ahmet K.', sales: 12500, hours: 160, productivity: 78.1 },
  { employee: 'Ayşe Y.', sales: 11800, hours: 160, productivity: 73.8 },
  { employee: 'Mehmet D.', sales: 10200, hours: 160, productivity: 63.8 },
  { employee: 'Fatma S.', sales: 9800, hours: 160, productivity: 61.3 },
  { employee: 'Ali B.', sales: 8900, hours: 160, productivity: 55.6 },
];

const shiftPerformanceData = [
  { shift: 'Sabah (08-16)', revenue: 45000, staff: 12, revenuePerStaff: 3750 },
  { shift: 'Öğle (12-20)', revenue: 95000, staff: 18, revenuePerStaff: 5278 },
  { shift: 'Akşam (16-00)', revenue: 78000, staff: 16, revenuePerStaff: 4875 },
];

const overtimeData = [
  { month: 'Oca', overtime: 120, normal: 1720 },
  { month: 'Şub', overtime: 135, normal: 1755 },
  { month: 'Mar', overtime: 142, normal: 1778 },
  { month: 'Nis', overtime: 158, normal: 1802 },
];

const staffTurnoverData = [
  { month: 'Oca', hires: 3, terminations: 2, total: 45 },
  { month: 'Şub', hires: 2, terminations: 1, total: 46 },
  { month: 'Mar', hires: 4, terminations: 2, total: 48 },
  { month: 'Nis', hires: 2, terminations: 3, total: 47 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const RestaurantLaborDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Restoran İşgücü Yönetimi</h1>
        <p className="text-sm text-gray-600">Personel Performansı & Verimlilik | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Personel"
          value="47"
          change={4.4}
          previousValue="45"
          icon={<Users size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Labor Cost %"
          value="30.1"
          unit="%"
          change={-1.3}
          previousValue="31.4%"
          icon={<DollarSign size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Mesai Saati"
          value="1,960"
          change={6.5}
          previousValue="1,840"
          icon={<Clock size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Verimlilik"
          value="₺104"
          unit="/saat"
          change={3.8}
          previousValue="₺100/saat"
          icon={<TrendingUp size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="En İyi Çalışan"
          value="Ahmet K."
          unit=""
          change={0}
          previousValue="-"
          icon={<Award size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Fazla Mesai %"
          value="8.1"
          unit="%"
          change={0.5}
          previousValue="7.6%"
          icon={<AlertCircle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">İşçilik Maliyeti Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={laborCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={3} name="Maliyet (₺)" />
              <Line type="monotone" dataKey="hours" stroke="#10B981" strokeWidth={2} name="Saat" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Çalışan Verimliliği (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productivityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="employee" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="sales" name="Satış (₺)">
                {productivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Vardiya Performansı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={shiftPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="shift" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenuePerStaff" name="Kişi Başı Gelir (₺)">
                {shiftPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Fazla Mesai Analizi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={overtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="normal" stackId="a" fill="#10B981" name="Normal Saat" />
              <Bar dataKey="overtime" stackId="a" fill="#EF4444" name="Fazla Mesai" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Personel Devir Hızı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={staffTurnoverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="hires" fill="#10B981" name="İşe Alım" />
              <Bar dataKey="terminations" fill="#EF4444" name="Ayrılma" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: İK Sistemi + Vardiya Planlaması | Otomatik güncellenme: Haftalık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default RestaurantLaborDashboard;








