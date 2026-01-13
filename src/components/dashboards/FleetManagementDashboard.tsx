// Fleet Management Dashboard - Filo Yönetimi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { Truck, DollarSign, Wrench, TrendingUp, Fuel, AlertTriangle } from 'lucide-react';

const fleetUtilizationData = [
  { week: 'Hf1', active: 85, idle: 15, maintenance: 8, utilization: 84.2 },
  { week: 'Hf2', active: 88, idle: 12, maintenance: 7, utilization: 87.1 },
  { week: 'Hf3', active: 92, idle: 9, maintenance: 6, utilization: 91.1 },
  { week: 'Hf4', active: 95, idle: 7, maintenance: 5, utilization: 94.1 },
];

const fuelConsumptionData = [
  { month: 'Oca', consumption: 28500, cost: 570000, avgKm: 12.5 },
  { month: 'Şub', consumption: 27800, cost: 556000, avgKm: 12.8 },
  { month: 'Mar', consumption: 26500, cost: 530000, avgKm: 13.2 },
  { month: 'Nis', consumption: 25200, cost: 504000, avgKm: 13.8 },
];

const maintenanceCostData = [
  { vehicle: 'Araç-01', preventive: 12500, corrective: 8500, total: 21000 },
  { vehicle: 'Araç-02', preventive: 11800, corrective: 9200, total: 21000 },
  { vehicle: 'Araç-03', preventive: 13200, corrective: 6800, total: 20000 },
  { vehicle: 'Araç-04', preventive: 10500, corrective: 11500, total: 22000 },
  { vehicle: 'Araç-05', preventive: 12000, corrective: 7500, total: 19500 },
];

const vehicleHealthData = [
  { status: 'Mükemmel', count: 58, percentage: 54.2 },
  { status: 'İyi', count: 32, percentage: 29.9 },
  { status: 'Orta', count: 12, percentage: 11.2 },
  { status: 'Zayıf', count: 5, percentage: 4.7 },
];

const driverPerformanceData = [
  { driver: 'Sürücü-A', score: 92.5, violations: 2, fuelEff: 13.8 },
  { driver: 'Sürücü-B', score: 88.2, violations: 4, fuelEff: 13.2 },
  { driver: 'Sürücü-C', score: 85.8, violations: 6, fuelEff: 12.8 },
  { driver: 'Sürücü-D', score: 82.5, violations: 8, fuelEff: 12.2 },
  { driver: 'Sürücü-E', score: 78.2, violations: 12, fuelEff: 11.5 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

const FleetManagementDashboard: React.FC = () => {
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
      <div className="mb-4">
        <h1 className="text-2xl font-black text-gray-900">Filo Yönetimi Paneli</h1>
        <p className="text-sm text-gray-600">Araç & Sürücü Performans Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Araç"
          value="107"
          change={0}
          previousValue="107"
          icon={<Truck size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Kullanım Oranı"
          value="94.1"
          unit="%"
          change={11.8}
          previousValue="84.2%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Yakıt Maliyeti"
          value="₺504K"
          change={-11.6}
          previousValue="₺570K"
          icon={<Fuel size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ort. Tüketim"
          value="13.8"
          unit="km/L"
          change={10.4}
          previousValue="12.5 km/L"
          icon={<DollarSign size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Bakım Maliyeti"
          value="₺103.5K"
          change={-5.2}
          previousValue="₺109.2K"
          icon={<Wrench size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Risk Araçları"
          value="5"
          change={-37.5}
          previousValue="8"
          icon={<AlertTriangle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Filo Kullanım Oranı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fleetUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="active" stackId="a" fill="#10B981" name="Aktif" />
              <Bar dataKey="idle" stackId="a" fill="#F59E0B" name="Boşta" />
              <Bar dataKey="maintenance" stackId="a" fill="#EF4444" name="Bakımda" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Yakıt Tüketimi & Maliyet</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={fuelConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="consumption" stroke="#F59E0B" strokeWidth={3} name="Tüketim (L)" />
              <Line yAxisId="right" type="monotone" dataKey="avgKm" stroke="#10B981" strokeWidth={2} name="Verim (km/L)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Bakım Maliyeti (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={maintenanceCostData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="vehicle" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="preventive" stackId="a" fill="#10B981" name="Önleyici (₺)" />
              <Bar dataKey="corrective" stackId="a" fill="#EF4444" name="Düzeltici (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Araç Sağlık Durumu</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={vehicleHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="status" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Araç Sayısı">
                {vehicleHealthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Sürücü Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={driverPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis dataKey="driver" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="score" name="Performans Skoru">
                {driverPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Filo Yönetim Sistemi (FMS) + Telematik | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default FleetManagementDashboard;















