// Healthcare Dashboard - Sağlık Hizmetleri Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Heart, Users, Clock, Activity, TrendingUp, AlertCircle } from 'lucide-react';

const patientVolumeData = [
  { month: 'Oca', patients: 2850, visits: 4250, avgVisit: 1.49 },
  { month: 'Şub', patients: 2920, visits: 4420, avgVisit: 1.51 },
  { month: 'Mar', patients: 3050, visits: 4650, avgVisit: 1.52 },
  { month: 'Nis', patients: 3180, visits: 4920, avgVisit: 1.55 },
  { month: 'May', patients: 3250, visits: 5080, avgVisit: 1.56 },
  { month: 'Haz', patients: 3380, visits: 5320, avgVisit: 1.57 },
];

const departmentPerformanceData = [
  { department: 'Kardiyoloji', patients: 580, revenue: 285000, satisfaction: 4.7 },
  { department: 'Ortopedi', patients: 520, revenue: 245000, satisfaction: 4.5 },
  { department: 'Nöroloji', patients: 480, revenue: 220000, satisfaction: 4.6 },
  { department: 'Genel Cerrahi', patients: 420, revenue: 198000, satisfaction: 4.4 },
  { department: 'Pediatri', patients: 380, revenue: 165000, satisfaction: 4.8 },
];

const waitTimeData = [
  { day: 'Pzt', emergency: 18, outpatient: 42, avgWait: 30 },
  { day: 'Sal', emergency: 15, outpatient: 38, avgWait: 26.5 },
  { day: 'Çar', emergency: 16, outpatient: 40, avgWait: 28 },
  { day: 'Per', emergency: 14, outpatient: 35, avgWait: 24.5 },
  { day: 'Cum', emergency: 17, outpatient: 45, avgWait: 31 },
  { day: 'Cmt', emergency: 22, outpatient: 55, avgWait: 38.5 },
  { day: 'Paz', emergency: 25, outpatient: 58, avgWait: 41.5 },
];

const bedOccupancyData = [
  { week: 'Hf1', icu: 18, general: 85, total: 103, capacity: 120 },
  { week: 'Hf2', icu: 19, general: 88, total: 107, capacity: 120 },
  { week: 'Hf3', icu: 17, general: 82, total: 99, capacity: 120 },
  { week: 'Hf4', icu: 20, general: 90, total: 110, capacity: 120 },
];

const diagnosisDistributionData = [
  { diagnosis: 'Kardiyovasküler', count: 485 },
  { diagnosis: 'Kas-İskelet', count: 420 },
  { diagnosis: 'Solunum', count: 380 },
  { diagnosis: 'Metabolik', count: 325 },
  { diagnosis: 'Diğer', count: 770 },
];

const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'];

const HealthcareDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Sağlık Hizmetleri Paneli</h1>
        <p className="text-sm text-gray-600">Hasta Yönetimi & Performans | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Hasta Sayısı"
          value="3,380"
          change={18.6}
          previousValue="2,850"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Vizit Adedi"
          value="5,320"
          change={25.2}
          previousValue="4,250"
          icon={<Activity size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Yatak Doluluk"
          value="91.7"
          unit="%"
          change={6.2}
          previousValue="86.3%"
          icon={<Heart size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Ort. Bekleme"
          value="30"
          unit="dk"
          change={0}
          previousValue="30 dk"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Memnuniyet"
          value="4.6"
          unit="/5"
          change={4.5}
          previousValue="4.4/5"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Acil Bekleme"
          value="18"
          unit="dk"
          change={-10.0}
          previousValue="20 dk"
          icon={<AlertCircle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hasta Hacmi Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={patientVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="patients" fill="#3B82F6" name="Hasta Sayısı" />
              <Line type="monotone" dataKey="visits" stroke="#10B981" strokeWidth={3} name="Vizit" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Bölüm Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="department" type="category" tick={{ fontSize: 9 }} width={90} />
              <Tooltip />
              <Bar dataKey="patients" name="Hasta">
                {departmentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Bekleme Süreleri</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={waitTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="emergency" stroke="#EF4444" strokeWidth={3} name="Acil (dk)" />
              <Line type="monotone" dataKey="outpatient" stroke="#3B82F6" strokeWidth={2} name="Poliklinik (dk)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Yatak Doluluk Oranı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={bedOccupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="icu" stackId="a" fill="#EF4444" name="Yoğun Bakım" />
              <Bar dataKey="general" stackId="a" fill="#3B82F6" name="Genel" />
              <Line type="monotone" dataKey="capacity" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Kapasite" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Tanı Dağılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={diagnosisDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="diagnosis" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Hasta Sayısı">
                {diagnosisDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Hastane Bilgi Sistemi (HIS) | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default HealthcareDashboard;










