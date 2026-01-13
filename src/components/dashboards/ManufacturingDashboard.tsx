// Manufacturing / Production Dashboard - Professional Style
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Activity, Package, AlertTriangle, Clock, DollarSign, CheckCircle } from 'lucide-react';

// Mock Data
const oeeData = [
  { date: '23 Ara', oee: 82 },
  { date: '24 Ara', oee: 85 },
  { date: '25 Ara', oee: 78 },
  { date: '26 Ara', oee: 88 },
  { date: '27 Ara', oee: 84 },
  { date: '28 Ara', oee: 90 },
  { date: '29 Ara', oee: 87 },
];

const downtimeData = [
  { reason: 'Makine Arızası', duration: 245, cumulative: 245 },
  { reason: 'Kalıp Değişimi', duration: 180, cumulative: 425 },
  { reason: 'Kalite Kontrolü', duration: 95, cumulative: 520 },
  { reason: 'Malzeme Bekleme', duration: 78, cumulative: 598 },
  { reason: 'Planlı Bakım', duration: 62, cumulative: 660 },
];

const productionData = [
  { shift: 'Sabah', target: 1000, actual: 1050, defect: 25 },
  { shift: 'Öğle', target: 1000, actual: 980, defect: 35 },
  { shift: 'Akşam', target: 1000, actual: 1020, defect: 18 },
];

const defectTypesData = [
  { type: 'Yüzey Kusuru', count: 42, rate: 2.1 },
  { type: 'Boyut Hatası', count: 28, rate: 1.4 },
  { type: 'Montaj Hatası', count: 18, rate: 0.9 },
  { type: 'Malzeme Hatası', count: 12, rate: 0.6 },
];

const costBreakdownData = [
  { stage: 'Başlangıç', value: 0 },
  { stage: 'Hammadde', value: 285 },
  { stage: 'İşçilik', value: 125 },
  { stage: 'Enerji', value: 45 },
  { stage: 'Bakım', value: 32 },
  { stage: 'Kalite', value: 18 },
  { stage: 'Toplam', value: 505 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const ManufacturingDashboard: React.FC = () => {
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
      {/* Dashboard Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-gray-900">Üretim Kontrol Paneli</h1>
        <p className="text-sm text-gray-600">Hat 1-3 | Son Güncelleme: 29 Aralık 2025 14:30</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="OEE (Genel)"
          value="85.2"
          unit="%"
          change={3.5}
          previousValue="82.3%"
          icon={<Activity size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Üretim Adedi"
          value="3,050"
          change={5.2}
          previousValue="2,899"
          icon={<Package size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Hata Oranı"
          value="1.4"
          unit="%"
          change={-0.3}
          previousValue="1.7%"
          icon={<AlertTriangle size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="Duruş Süresi"
          value="11.2"
          unit="saat"
          change={-12.5}
          previousValue="12.8h"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Birim Maliyet"
          value="₺505"
          change={-1.8}
          previousValue="₺514"
          icon={<DollarSign size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Zamanında Teslimat"
          value="94.5"
          unit="%"
          change={2.1}
          previousValue="92.5%"
          icon={<CheckCircle size={20} />}
          color="#10B981"
        />
      </div>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* OEE Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">OEE Trend (Son 7 Gün)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={oeeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[70, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="oee" stroke="#10B981" strokeWidth={3} name="OEE (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Downtime Pareto */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Duruş Nedenleri (Pareto)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={downtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="reason" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 700]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar yAxisId="left" dataKey="duration" name="Süre (dk)" fill="#3B82F6" />
              <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#EF4444" strokeWidth={2} name="Kümülatif" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Production Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Vardiya Performansı</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="shift" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="target" name="Hedef" fill="#9CA3AF" />
              <Bar dataKey="actual" name="Gerçekleşen" fill="#10B981" />
              <Bar dataKey="defect" name="Hatalı" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Defect Types */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hata Türleri + Oran</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={defectTypesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="type" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 3]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="count" name="Adet" fill="#3B82F6" />
              <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#EF4444" strokeWidth={3} name="Oran (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Breakdown (Waterfall-style) */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Birim Maliyet Bileşenleri (₺)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={costBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" name="Tutar (₺)">
                {costBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.stage === 'Başlangıç' ? '#E5E7EB' :
                    entry.stage === 'Toplam' ? '#10B981' :
                    COLORS[index % COLORS.length]
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: MES Sistemi + SCADA | Gerçek Zamanlı Güncelleme | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default ManufacturingDashboard;

