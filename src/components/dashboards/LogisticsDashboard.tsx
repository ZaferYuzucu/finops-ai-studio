// Logistics Dashboard - Lojistik & Tedarik Zinciri
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Truck, Package, Clock, TrendingUp, MapPin, DollarSign } from 'lucide-react';

const deliveryPerformanceData = [
  { week: 'Hf1', onTime: 1250, delayed: 85, total: 1335, otd: 93.6 },
  { week: 'Hf2', onTime: 1320, delayed: 75, total: 1395, otd: 94.6 },
  { week: 'Hf3', onTime: 1385, delayed: 68, total: 1453, otd: 95.3 },
  { week: 'Hf4', onTime: 1450, delayed: 55, total: 1505, otd: 96.3 },
  { week: 'Hf5', onTime: 1520, delayed: 48, total: 1568, otd: 96.9 },
  { week: 'Hf6', onTime: 1580, delayed: 42, total: 1622, otd: 97.4 },
];

const routeEfficiencyData = [
  { route: 'Rota-1', distance: 285, deliveries: 42, efficiency: 6.8 },
  { route: 'Rota-2', distance: 320, deliveries: 38, efficiency: 8.4 },
  { route: 'Rota-3', distance: 265, deliveries: 45, efficiency: 5.9 },
  { route: 'Rota-4', distance: 298, deliveries: 40, efficiency: 7.5 },
  { route: 'Rota-5', distance: 310, deliveries: 35, efficiency: 8.9 },
];

const vehicleUtilizationData = [
  { vehicle: 'Araç-01', capacity: 2500, loaded: 2350, utilization: 94.0 },
  { vehicle: 'Araç-02', capacity: 2500, loaded: 2280, utilization: 91.2 },
  { vehicle: 'Araç-03', capacity: 2500, loaded: 2420, utilization: 96.8 },
  { vehicle: 'Araç-04', capacity: 2500, loaded: 2150, utilization: 86.0 },
  { vehicle: 'Araç-05', capacity: 2500, loaded: 2310, utilization: 92.4 },
];

const costBreakdownData = [
  { category: 'Yakıt', amount: 285000, percentage: 42.5 },
  { category: 'Personel', amount: 185000, percentage: 27.6 },
  { category: 'Bakım', amount: 95000, percentage: 14.2 },
  { category: 'Sigorta', amount: 68000, percentage: 10.1 },
  { category: 'Diğer', amount: 37000, percentage: 5.5 },
];

const deliveryTimeDistributionData = [
  { timeSlot: '08-10', deliveries: 285 },
  { timeSlot: '10-12', deliveries: 420 },
  { timeSlot: '12-14', deliveries: 385 },
  { timeSlot: '14-16', deliveries: 350 },
  { timeSlot: '16-18', deliveries: 182 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const LogisticsDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Lojistik & Tedarik Zinciri</h1>
        <p className="text-sm text-gray-600">Teslimat & Rota Performansı | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Teslimat Adedi"
          value="1,622"
          change={21.5}
          previousValue="1,335"
          icon={<Package size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Zamanında %"
          value="97.4"
          unit="%"
          change={4.1}
          previousValue="93.6%"
          icon={<Clock size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Ort. Mesafe"
          value="295"
          unit="km"
          change={3.5}
          previousValue="285 km"
          icon={<MapPin size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Araç Doluluk"
          value="92.1"
          unit="%"
          change={-1.9}
          previousValue="94.0%"
          icon={<Truck size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Verimlilik"
          value="7.5"
          unit="km/tes"
          change={10.3}
          previousValue="6.8 km/tes"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Lojistik Maliyet"
          value="₺670K"
          change={8.5}
          previousValue="₺617.5K"
          icon={<DollarSign size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Teslimat Performans Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={deliveryPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[90, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="total" fill="#3B82F6" name="Toplam Teslimat" />
              <Line yAxisId="right" type="monotone" dataKey="otd" stroke="#10B981" strokeWidth={3} name="OTD (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Rota Verimliliği (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={routeEfficiencyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="route" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="efficiency" name="Verim (km/tes)">
                {routeEfficiencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Araç Kullanım Oranı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={vehicleUtilizationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis dataKey="vehicle" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="utilization" name="Doluluk (%)">
                {vehicleUtilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Maliyet Kırılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={costBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="amount" name="Tutar (₺)">
                {costBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Saat Bazlı Teslimat Dağılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={deliveryTimeDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="timeSlot" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="deliveries" name="Teslimat Adedi">
                {deliveryTimeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: TMS (Transportation Management System) + GPS Tracking | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default LogisticsDashboard;










