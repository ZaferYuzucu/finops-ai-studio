// OEE Dashboard - Overall Equipment Effectiveness
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Activity, CheckCircle, Clock, Zap, TrendingUp, AlertCircle } from 'lucide-react';

const oeeData = [
  { day: 'Pzt', oee: 78.5, availability: 92.5, performance: 88.2, quality: 96.2 },
  { day: 'Sal', oee: 79.8, availability: 93.2, performance: 89.0, quality: 96.3 },
  { day: 'Çar', oee: 81.2, availability: 94.0, performance: 89.8, quality: 96.2 },
  { day: 'Per', oee: 82.5, availability: 94.5, performance: 90.5, quality: 96.5 },
  { day: 'Cum', oee: 83.8, availability: 95.0, performance: 91.2, quality: 96.8 },
  { day: 'Cmt', oee: 80.5, availability: 93.8, performance: 89.5, quality: 95.8 },
];

const downtimeReasonData = [
  { reason: 'Planlı Bakım', duration: 185, percentage: 32.5 },
  { reason: 'Arıza', duration: 142, percentage: 24.9 },
  { reason: 'Kurulum', duration: 98, percentage: 17.2 },
  { reason: 'Malzeme Bekleme', duration: 76, percentage: 13.3 },
  { reason: 'Kalite Problemi', duration: 45, percentage: 7.9 },
  { reason: 'Diğer', duration: 24, percentage: 4.2 },
];

const linePerformanceData = [
  { line: 'Hat-A', oee: 85.2, availability: 95.5, performance: 92.8, quality: 96.1 },
  { line: 'Hat-B', oee: 83.8, availability: 94.2, performance: 91.5, quality: 97.2 },
  { line: 'Hat-C', oee: 81.5, availability: 93.8, performance: 89.8, quality: 96.8 },
  { line: 'Hat-D', oee: 78.2, availability: 92.5, performance: 87.2, quality: 97.0 },
];

const productionVsTargetData = [
  { shift: 'Vardiya 1', actual: 2850, target: 3000, efficiency: 95.0 },
  { shift: 'Vardiya 2', actual: 2920, target: 3000, efficiency: 97.3 },
  { shift: 'Vardiya 3', actual: 2780, target: 3000, efficiency: 92.7 },
];

const mtbfMttrData = [
  { month: 'Oca', mtbf: 125, mttr: 45 },
  { month: 'Şub', mtbf: 132, mttr: 42 },
  { month: 'Mar', mtbf: 138, mttr: 38 },
  { month: 'Nis', mtbf: 145, mttr: 35 },
];

const COLORS = ['#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6', '#10B981', '#06B6D4'];

const OEEDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">OEE Dashboard</h1>
        <p className="text-sm text-gray-600">Ekipman Etkinliği & Performans | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="OEE"
          value="83.8"
          unit="%"
          change={6.8}
          previousValue="78.5%"
          icon={<Activity size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Kullanılabilirlik"
          value="95.0"
          unit="%"
          change={2.7}
          previousValue="92.5%"
          icon={<CheckCircle size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Performans"
          value="91.2"
          unit="%"
          change={3.4}
          previousValue="88.2%"
          icon={<Zap size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Kalite"
          value="96.8"
          unit="%"
          change={0.6}
          previousValue="96.2%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="MTBF"
          value="145"
          unit="saat"
          change={16.0}
          previousValue="125 saat"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="MTTR"
          value="35"
          unit="dk"
          change={-22.2}
          previousValue="45 dk"
          icon={<AlertCircle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">OEE Trendi (Günlük)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={oeeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[70, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="oee" stroke="#10B981" strokeWidth={3} name="OEE (%)" />
              <Line type="monotone" dataKey="availability" stroke="#3B82F6" strokeWidth={2} name="Kullanılabilirlik" />
              <Line type="monotone" dataKey="performance" stroke="#8B5CF6" strokeWidth={2} name="Performans" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Duruş Nedenleri (Pareto)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={downtimeReasonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="reason" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="duration" name="Süre (dk)">
                {downtimeReasonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hat Bazlı OEE</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={linePerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[70, 100]} />
              <YAxis dataKey="line" type="category" tick={{ fontSize: 10 }} width={60} />
              <Tooltip />
              <Bar dataKey="oee" name="OEE (%)">
                {linePerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Üretim vs Hedef (Vardiya Bazlı)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={productionVsTargetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="shift" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="actual" fill="#10B981" name="Gerçekleşen" />
              <Bar dataKey="target" fill="#9CA3AF" name="Hedef" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">MTBF & MTTR Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={mtbfMttrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="mtbf" fill="#10B981" name="MTBF (saat)" />
              <Line yAxisId="right" type="monotone" dataKey="mttr" stroke="#EF4444" strokeWidth={3} name="MTTR (dk)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: MES Sistemi + PLC Entegrasyonu | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default OEEDashboard;















