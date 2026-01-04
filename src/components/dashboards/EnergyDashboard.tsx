// Energy Dashboard - Enerji Yönetimi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Zap, TrendingDown, DollarSign, Leaf, Sun, Activity } from 'lucide-react';

const energyConsumptionData = [
  { month: 'Oca', consumption: 285000, cost: 142500, peak: 485 },
  { month: 'Şub', consumption: 275000, cost: 137500, peak: 465 },
  { month: 'Mar', consumption: 268000, cost: 134000, peak: 452 },
  { month: 'Nis', consumption: 255000, cost: 127500, peak: 438 },
  { month: 'May', consumption: 248000, cost: 124000, peak: 425 },
  { month: 'Haz', consumption: 242000, cost: 121000, peak: 415 },
];

const departmentConsumptionData = [
  { department: 'Üretim', consumption: 125000, cost: 62500, percentage: 51.7 },
  { department: 'HVAC', consumption: 58000, cost: 29000, percentage: 24.0 },
  { department: 'Aydınlatma', consumption: 35000, cost: 17500, percentage: 14.5 },
  { department: 'Ofis', consumption: 18000, cost: 9000, percentage: 7.4 },
  { department: 'Diğer', consumption: 6000, cost: 3000, percentage: 2.5 },
];

const peakDemandData = [
  { day: 'Pzt', morning: 385, afternoon: 485, evening: 320 },
  { day: 'Sal', morning: 390, afternoon: 475, evening: 315 },
  { day: 'Çar', morning: 395, afternoon: 492, evening: 328 },
  { day: 'Per', morning: 388, afternoon: 488, evening: 325 },
  { day: 'Cum', morning: 392, afternoon: 482, evening: 310 },
  { day: 'Cmt', morning: 285, afternoon: 350, evening: 245 },
  { day: 'Paz', morning: 258, afternoon: 320, evening: 228 },
];

const renewableEnergyData = [
  { month: 'Oca', solar: 12500, grid: 272500, solarPercentage: 4.4 },
  { month: 'Şub', solar: 15200, grid: 259800, solarPercentage: 5.5 },
  { month: 'Mar', solar: 18500, grid: 249500, solarPercentage: 6.9 },
  { month: 'Nis', solar: 21800, grid: 233200, solarPercentage: 8.5 },
  { month: 'May', solar: 24500, grid: 223500, solarPercentage: 9.9 },
  { month: 'Haz', solar: 28000, grid: 214000, solarPercentage: 11.6 },
];

const savingsOpportunitiesData = [
  { opportunity: 'LED Dönüşüm', potential: 28500, roi: 18 },
  { opportunity: 'HVAC Optimizasyon', potential: 22000, roi: 24 },
  { opportunity: 'Güneş Paneli', potential: 45000, roi: 36 },
  { opportunity: 'Yalıtım', potential: 18000, roi: 28 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'];

const EnergyDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Enerji Yönetimi Paneli</h1>
        <p className="text-sm text-gray-600">Tüketim & Verimlilik Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Tüketim"
          value="242K"
          unit="kWh"
          change={-15.1}
          previousValue="285K kWh"
          icon={<Zap size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Maliyet"
          value="₺121K"
          change={-15.1}
          previousValue="₺142.5K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Peak Talep"
          value="415"
          unit="kW"
          change={-14.4}
          previousValue="485 kW"
          icon={<Activity size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="Yenilenebilir %"
          value="11.6"
          unit="%"
          change={163.6}
          previousValue="4.4%"
          icon={<Sun size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Tasarruf"
          value="₺21.5K"
          change={50.9}
          previousValue="₺14.25K"
          icon={<TrendingDown size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="CO2 Azaltım"
          value="12.8"
          unit="ton"
          change={28.0}
          previousValue="10.0 ton"
          icon={<Leaf size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Tüketim & Maliyet Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={energyConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="consumption" fill="#F59E0B" name="Tüketim (kWh)" />
              <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={3} name="Maliyet (₺)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Bölüm Bazlı Tüketim</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentConsumptionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="department" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="consumption" name="Tüketim (kWh)">
                {departmentConsumptionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Peak Talep</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={peakDemandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="morning" stroke="#10B981" strokeWidth={2} name="Sabah (kW)" />
              <Line type="monotone" dataKey="afternoon" stroke="#EF4444" strokeWidth={3} name="Öğleden Sonra (kW)" />
              <Line type="monotone" dataKey="evening" stroke="#3B82F6" strokeWidth={2} name="Akşam (kW)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Yenilenebilir Enerji Kullanımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={renewableEnergyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="solar" stackId="a" fill="#F59E0B" name="Güneş (kWh)" />
              <Bar dataKey="grid" stackId="a" fill="#9CA3AF" name="Şebeke (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Tasarruf Fırsatları</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={savingsOpportunitiesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="opportunity" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="potential" name="Potansiyel Tasarruf (₺/yıl)">
                {savingsOpportunitiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Enerji İzleme Sistemi (EMS) + Smart Meters | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default EnergyDashboard;











