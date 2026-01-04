// HR Dashboard - İnsan Kaynakları Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { Users, TrendingUp, TrendingDown, DollarSign, Clock, Award } from 'lucide-react';

const headcountTrendData = [
  { month: 'Oca', headcount: 285, hires: 8, terminations: 5, net: 3 },
  { month: 'Şub', headcount: 288, hires: 6, terminations: 3, net: 3 },
  { month: 'Mar', headcount: 295, hires: 9, terminations: 2, net: 7 },
  { month: 'Nis', headcount: 302, hires: 10, terminations: 3, net: 7 },
  { month: 'May', headcount: 308, hires: 8, terminations: 2, net: 6 },
  { month: 'Haz', headcount: 315, hires: 9, terminations: 2, net: 7 },
];

const departmentDistributionData = [
  { department: 'Üretim', employees: 128, percentage: 40.6 },
  { department: 'Satış', employees: 58, percentage: 18.4 },
  { department: 'Mühendislik', employees: 45, percentage: 14.3 },
  { department: 'Operasyon', employees: 38, percentage: 12.1 },
  { department: 'Destek', employees: 46, percentage: 14.6 },
];

const turnoverRateData = [
  { quarter: 'Q1-2024', turnover: 8.5, benchmark: 12.0 },
  { quarter: 'Q2-2024', turnover: 7.8, benchmark: 12.0 },
  { quarter: 'Q3-2024', turnover: 7.2, benchmark: 12.0 },
  { quarter: 'Q4-2024', turnover: 6.5, benchmark: 12.0 },
];

const attendanceData = [
  { week: 'Hf1', attendance: 96.5, sick: 2.2, vacation: 1.3 },
  { week: 'Hf2', attendance: 97.2, sick: 1.8, vacation: 1.0 },
  { week: 'Hf3', attendance: 96.8, sick: 2.0, vacation: 1.2 },
  { week: 'Hf4', attendance: 97.5, sick: 1.5, vacation: 1.0 },
];

const compensationData = [
  { level: 'C-Level', avg: 185000, min: 150000, max: 220000 },
  { level: 'Müdür', avg: 95000, min: 75000, max: 115000 },
  { level: 'Kıdemli', avg: 65000, min: 55000, max: 75000 },
  { level: 'Orta', avg: 48000, min: 42000, max: 54000 },
  { level: 'Genç', avg: 35000, min: 30000, max: 40000 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'];

const HRDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">İnsan Kaynakları Paneli</h1>
        <p className="text-sm text-gray-600">Personel & Performans Göstergeleri | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Personel"
          value="315"
          change={10.5}
          previousValue="285"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Turnover %"
          value="6.5"
          unit="%"
          change={-23.5}
          previousValue="8.5%"
          icon={<TrendingDown size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Net İşe Alım"
          value="+30"
          change={15.4}
          previousValue="+26"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Devam Oranı"
          value="97.0"
          unit="%"
          change={0.5}
          previousValue="96.5%"
          icon={<Clock size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Ort. Maaş"
          value="₺65.6K"
          change={8.5}
          previousValue="₺60.5K"
          icon={<DollarSign size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Eğitim Saati"
          value="18.5"
          unit="saat/kişi"
          change={23.3}
          previousValue="15.0 saat/kişi"
          icon={<Award size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Personel Sayısı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={headcountTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="headcount" stroke="#3B82F6" strokeWidth={3} name="Toplam Personel" />
              <Line type="monotone" dataKey="hires" stroke="#10B981" strokeWidth={2} name="İşe Alım" />
              <Line type="monotone" dataKey="terminations" stroke="#EF4444" strokeWidth={2} name="Ayrılma" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Departman Dağılımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentDistributionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="department" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="employees" name="Personel Sayısı">
                {departmentDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Turnover Oranı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={turnoverRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 15]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="turnover" stroke="#EF4444" strokeWidth={3} name="Turnover (%)" />
              <Line type="monotone" dataKey="benchmark" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Benchmark" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Haftalık Devam Durumu</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="attendance" fill="#10B981" name="Devam (%)" />
              <Bar dataKey="sick" fill="#F59E0B" name="Hastalık (%)" />
              <Bar dataKey="vacation" fill="#3B82F6" name="İzin (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Seviye Bazlı Ücret Analizi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={compensationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="level" type="category" tick={{ fontSize: 10 }} width={60} />
              <Tooltip />
              <Bar dataKey="avg" name="Ortalama Maaş (₺)">
                {compensationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: İK Bilgi Sistemi (HRIS) + Bordro Sistemi | Otomatik güncellenme: Haftalık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default HRDashboard;











