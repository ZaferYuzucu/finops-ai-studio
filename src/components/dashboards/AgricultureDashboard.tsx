// Agriculture Dashboard - Tarım Yönetimi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Leaf, Droplets, TrendingUp, Sun, CloudRain, DollarSign } from 'lucide-react';

const cropYieldData = [
  { month: 'Oca', yield: 2850, target: 3000, efficiency: 95.0 },
  { month: 'Şub', yield: 2920, target: 3000, efficiency: 97.3 },
  { month: 'Mar', yield: 3050, target: 3100, efficiency: 98.4 },
  { month: 'Nis', yield: 3180, target: 3200, efficiency: 99.4 },
  { month: 'May', yield: 3350, target: 3300, efficiency: 101.5 },
  { month: 'Haz', yield: 3480, target: 3400, efficiency: 102.4 },
];

const fieldPerformanceData = [
  { field: 'Tarla-A', area: 125, yield: 3850, yieldPerHa: 30.8 },
  { field: 'Tarla-B', area: 110, yield: 3520, yieldPerHa: 32.0 },
  { field: 'Tarla-C', area: 95, yield: 2850, yieldPerHa: 30.0 },
  { field: 'Tarla-D', area: 80, yield: 2480, yieldPerHa: 31.0 },
];

const irrigationData = [
  { week: 'Hf1', waterUsed: 2850, rainfall: 12, temperature: 18.5 },
  { week: 'Hf2', waterUsed: 2920, rainfall: 8, temperature: 19.2 },
  { week: 'Hf3', waterUsed: 3180, rainfall: 5, temperature: 21.5 },
  { week: 'Hf4', waterUsed: 3350, rainfall: 15, temperature: 20.8 },
];

const cropDistributionData = [
  { crop: 'Buğday', area: 185, revenue: 285000 },
  { crop: 'Arpa', area: 142, revenue: 198000 },
  { crop: 'Mısır', area: 128, revenue: 245000 },
  { crop: 'Ayçiçeği', area: 95, revenue: 165000 },
];

const costBreakdownData = [
  { category: 'Tohum', amount: 85000, percentage: 28.5 },
  { category: 'Gübre', amount: 72000, percentage: 24.2 },
  { category: 'İlaç', amount: 58000, percentage: 19.5 },
  { category: 'Su', amount: 48000, percentage: 16.1 },
  { category: 'İşçilik', amount: 35000, percentage: 11.7 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'];

const AgricultureDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Tarım Yönetimi Paneli</h1>
        <p className="text-sm text-gray-600">Mahsul & Verimlilik Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Verim"
          value="3,480"
          unit="ton"
          change={22.1}
          previousValue="2,850 ton"
          icon={<Leaf size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Verim/Hektar"
          value="31.2"
          unit="ton/ha"
          change={4.0}
          previousValue="30.0 ton/ha"
          icon={<TrendingUp size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Toplam Alan"
          value="410"
          unit="ha"
          change={0}
          previousValue="410 ha"
          icon={<Sun size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Su Kullanımı"
          value="3,350"
          unit="m³"
          change={17.5}
          previousValue="2,850 m³"
          icon={<Droplets size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Ort. Yağış"
          value="10"
          unit="mm"
          change={-16.7}
          previousValue="12 mm"
          icon={<CloudRain size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Toplam Gelir"
          value="₺893K"
          change={18.5}
          previousValue="₺753.5K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Mahsul Verimi Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={cropYieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="yield" fill="#10B981" name="Verim (ton)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Tarla Performansı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fieldPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="field" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="yieldPerHa" name="Verim (ton/ha)">
                {fieldPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Sulama & Hava Durumu</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={irrigationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="waterUsed" fill="#3B82F6" name="Su (m³)" />
              <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#8B5CF6" strokeWidth={2} name="Yağış (mm)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ürün Dağılımı & Gelir</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={cropDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="crop" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="area" fill="#10B981" name="Alan (ha)" />
              <Bar dataKey="revenue" fill="#3B82F6" name="Gelir (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Maliyet Kırılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={costBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
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
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Tarım Yönetim Sistemi + IoT Sensörler | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default AgricultureDashboard;















