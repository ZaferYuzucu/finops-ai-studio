// Quality Control Dashboard - Kalite Kontrol Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { CheckCircle, XCircle, AlertTriangle, Target, TrendingDown, Award } from 'lucide-react';

const defectTrendData = [
  { week: 'Hf1', defectRate: 2.8, inspected: 8500, defects: 238 },
  { week: 'Hf2', defectRate: 2.6, inspected: 8800, defects: 229 },
  { week: 'Hf3', defectRate: 2.4, inspected: 9100, defects: 218 },
  { week: 'Hf4', defectRate: 2.2, inspected: 9400, defects: 207 },
  { week: 'Hf5', defectRate: 2.0, inspected: 9600, defects: 192 },
  { week: 'Hf6', defectRate: 1.9, inspected: 9800, defects: 186 },
];

const defectCategoryData = [
  { category: 'Boyut Hatası', count: 58, percentage: 31.2 },
  { category: 'Yüzey Hatası', count: 42, percentage: 22.6 },
  { category: 'Montaj Hatası', count: 35, percentage: 18.8 },
  { category: 'Malzeme Hatası', count: 28, percentage: 15.1 },
  { category: 'Diğer', count: 23, percentage: 12.4 },
];

const productLineQualityData = [
  { line: 'Hat-A', yield: 98.1, defectRate: 1.9, production: 3200 },
  { line: 'Hat-B', yield: 97.8, defectRate: 2.2, production: 2800 },
  { line: 'Hat-C', yield: 97.5, defectRate: 2.5, production: 2600 },
  { line: 'Hat-D', yield: 96.9, defectRate: 3.1, production: 1400 },
];

const inspectionStatusData = [
  { day: 'Pzt', passed: 1420, failed: 35, pending: 45 },
  { day: 'Sal', passed: 1480, failed: 42, pending: 38 },
  { day: 'Çar', passed: 1510, failed: 38, pending: 32 },
  { day: 'Per', passed: 1550, failed: 35, pending: 35 },
  { day: 'Cum', passed: 1600, failed: 33, pending: 27 },
  { day: 'Cmt', passed: 1420, failed: 28, pending: 22 },
];

const reworkCostData = [
  { month: 'Oca', reworkCost: 28500, preventionCost: 12000 },
  { month: 'Şub', reworkCost: 26800, preventionCost: 13500 },
  { month: 'Mar', reworkCost: 24200, preventionCost: 14200 },
  { month: 'Nis', reworkCost: 22100, preventionCost: 14800 },
];

const COLORS = ['#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6', '#10B981'];

const QualityControlDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Kalite Kontrol Dashboard</h1>
        <p className="text-sm text-gray-600">Kalite Göstergeleri & Hata Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Kalite Oranı"
          value="98.1"
          unit="%"
          change={1.2}
          previousValue="96.9%"
          icon={<CheckCircle size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Hata Oranı"
          value="1.9"
          unit="%"
          change={-0.9}
          previousValue="2.8%"
          icon={<XCircle size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="Muayene Adedi"
          value="9,800"
          change={15.3}
          previousValue="8,500"
          icon={<Target size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Toplam Hata"
          value="186"
          change={-21.8}
          previousValue="238"
          icon={<AlertTriangle size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="En İyi Hat"
          value="Hat-A"
          unit=""
          change={0}
          previousValue="-"
          icon={<Award size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Yeniden İşleme"
          value="₺22.1K"
          change={-22.5}
          previousValue="₺28.5K"
          icon={<TrendingDown size={20} />}
          color="#8B5CF6"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hata Oranı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={defectTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} domain={[0, 4]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="right" dataKey="defects" fill="#F59E0B" name="Hata Adedi" />
              <Line yAxisId="left" type="monotone" dataKey="defectRate" stroke="#EF4444" strokeWidth={3} name="Hata Oranı (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hata Türleri (Pareto)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={defectCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Adet">
                {defectCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hat Bazlı Kalite</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productLineQualityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[94, 100]} />
              <YAxis dataKey="line" type="category" tick={{ fontSize: 10 }} width={60} />
              <Tooltip />
              <Bar dataKey="yield" name="Kalite (%)">
                {productLineQualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Muayene Durumu</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={inspectionStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="passed" stackId="a" fill="#10B981" name="Geçti" />
              <Bar dataKey="failed" stackId="a" fill="#EF4444" name="Kaldı" />
              <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Bekliyor" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kalite Maliyeti Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={reworkCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="reworkCost" stroke="#EF4444" strokeWidth={3} name="Yeniden İşleme (₺)" />
              <Line type="monotone" dataKey="preventionCost" stroke="#10B981" strokeWidth={2} name="Önleme (₺)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Kalite Kontrol Sistemi + Muayene Raporları | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default QualityControlDashboard;











