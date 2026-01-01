// Construction Dashboard - İnşaat Proje Yönetimi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { HardHat, TrendingUp, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const projectProgressData = [
  { week: 'Hf1', planned: 15.5, actual: 14.2, cumPlanned: 15.5, cumActual: 14.2 },
  { week: 'Hf2', planned: 16.2, actual: 15.8, cumPlanned: 31.7, cumActual: 30.0 },
  { week: 'Hf3', planned: 17.5, actual: 17.2, cumPlanned: 49.2, cumActual: 47.2 },
  { week: 'Hf4', planned: 18.8, actual: 19.5, cumPlanned: 68.0, cumActual: 66.7 },
];

const costPerformanceData = [
  { category: 'Malzeme', budget: 2850000, actual: 2780000, variance: -70000 },
  { category: 'İşçilik', budget: 1850000, actual: 1920000, variance: 70000 },
  { category: 'Ekipman', budget: 950000, actual: 920000, variance: -30000 },
  { category: 'Alt Yüklenici', budget: 1280000, actual: 1350000, variance: 70000 },
  { category: 'Genel Giderler', budget: 420000, actual: 385000, variance: -35000 },
];

const safetyMetricsData = [
  { month: 'Oca', incidents: 8, nearMiss: 22, daysWithoutIncident: 12 },
  { month: 'Şub', incidents: 6, nearMiss: 18, daysWithoutIncident: 18 },
  { month: 'Mar', incidents: 4, nearMiss: 15, daysWithoutIncident: 25 },
  { month: 'Nis', incidents: 2, nearMiss: 12, daysWithoutIncident: 42 },
];

const resourceUtilizationData = [
  { resource: 'Vinç', utilization: 85.5, capacity: 100.0 },
  { resource: 'Ekskavatör', utilization: 78.2, capacity: 100.0 },
  { resource: 'Beton Pompası', utilization: 92.5, capacity: 100.0 },
  { resource: 'İskele', utilization: 68.5, capacity: 100.0 },
  { resource: 'Jeneratör', utilization: 55.8, capacity: 100.0 },
];

const materialConsumptionData = [
  { material: 'Beton', planned: 2850, actual: 2920, variance: 70 },
  { material: 'Çelik', planned: 485, actual: 465, variance: -20 },
  { material: 'Tuğla', planned: 185000, actual: 178000, variance: -7000 },
  { material: 'Çimento', planned: 1280, actual: 1320, variance: 40 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const ConstructionDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">İnşaat Proje Yönetimi</h1>
        <p className="text-sm text-gray-600">Proje İlerlemesi & Maliyet Kontrolü | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Tamamlanma %"
          value="66.7"
          unit="%"
          change={370.4}
          previousValue="14.2%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Plana Uyum"
          value="98.1"
          unit="%"
          change={-1.4}
          previousValue="99.5%"
          icon={<CheckCircle size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Bütçe Varyans"
          value="₺+5K"
          change={-92.9}
          previousValue="₺+70K"
          icon={<DollarSign size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Kazasız Gün"
          value="42"
          change={250.0}
          previousValue="12"
          icon={<HardHat size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ekipman Kullanım"
          value="76.1"
          unit="%"
          change={-11.0}
          previousValue="85.5%"
          icon={<Clock size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Aktif Riskler"
          value="8"
          change={-60.0}
          previousValue="20"
          icon={<AlertTriangle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Proje İlerlemesi (Kümülatif)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 80]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="cumPlanned" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Planlanan (%)" />
              <Line type="monotone" dataKey="cumActual" stroke="#10B981" strokeWidth={3} name="Gerçekleşen (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Maliyet Performansı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={costPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="budget" fill="#9CA3AF" name="Bütçe (₺)" />
              <Bar dataKey="actual" fill="#3B82F6" name="Gerçekleşen (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">İş Güvenliği Göstergeleri</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={safetyMetricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="incidents" fill="#EF4444" name="Kaza" />
              <Line yAxisId="right" type="monotone" dataKey="daysWithoutIncident" stroke="#10B981" strokeWidth={3} name="Kazasız Gün" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ekipman Kullanım Oranı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={resourceUtilizationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis dataKey="resource" type="category" tick={{ fontSize: 10 }} width={95} />
              <Tooltip />
              <Bar dataKey="utilization" name="Kullanım (%)">
                {resourceUtilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Malzeme Tüketimi vs Plan</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={materialConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="material" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="planned" fill="#9CA3AF" name="Planlanan" />
              <Bar dataKey="actual" fill="#3B82F6" name="Gerçekleşen" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Proje Yönetim Yazılımı + Saha Takibi | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default ConstructionDashboard;










