// Sales Dashboard - Satış Performans Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { DollarSign, TrendingUp, Target, Users, Award, ShoppingCart } from 'lucide-react';

const salesTrendData = [
  { month: 'Oca', revenue: 2850000, target: 3000000, deals: 142, avgDeal: 20070 },
  { month: 'Şub', revenue: 3120000, target: 3200000, deals: 158, avgDeal: 19746 },
  { month: 'Mar', revenue: 3450000, target: 3400000, deals: 172, avgDeal: 20058 },
  { month: 'Nis', revenue: 3680000, target: 3600000, deals: 185, avgDeal: 19891 },
  { month: 'May', revenue: 3920000, target: 3800000, deals: 195, avgDeal: 20102 },
  { month: 'Haz', revenue: 4200000, target: 4000000, deals: 208, avgDeal: 20192 },
];

const salesRepPerformanceData = [
  { rep: 'Ahmet Y.', revenue: 685000, deals: 38, quota: 650000, achievement: 105.4 },
  { rep: 'Ayşe K.', revenue: 620000, deals: 35, quota: 600000, achievement: 103.3 },
  { rep: 'Mehmet D.', revenue: 580000, deals: 32, quota: 600000, achievement: 96.7 },
  { rep: 'Fatma S.', revenue: 545000, deals: 28, quota: 550000, achievement: 99.1 },
  { rep: 'Ali B.', revenue: 485000, deals: 25, quota: 500000, achievement: 97.0 },
];

const pipelineStageData = [
  { stage: 'Lead', count: 485, value: 9700000 },
  { stage: 'Qualified', count: 285, value: 5700000 },
  { stage: 'Proposal', count: 142, value: 2840000 },
  { stage: 'Negotiation', count: 68, value: 1360000 },
  { stage: 'Won', count: 208, value: 4200000 },
];

const productMixData = [
  { product: 'Ürün-A', revenue: 1520000, deals: 85, margin: 42.5 },
  { product: 'Ürün-B', revenue: 1280000, deals: 68, margin: 38.2 },
  { product: 'Ürün-C', revenue: 985000, deals: 52, margin: 35.8 },
  { product: 'Ürün-D', revenue: 415000, deals: 28, margin: 48.5 },
];

const conversionRateData = [
  { month: 'Oca', leadToQual: 58.5, qualToProp: 49.8, propToWon: 48.2 },
  { month: 'Şub', leadToQual: 59.2, qualToProp: 51.2, propToWon: 50.5 },
  { month: 'Mar', leadToQual: 60.5, qualToProp: 52.8, propToWon: 52.2 },
  { month: 'Nis', leadToQual: 61.8, qualToProp: 54.5, propToWon: 54.8 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const SalesDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Satış Performans Paneli</h1>
        <p className="text-sm text-gray-600">Satış Göstergeleri & Pipeline Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Aylık Gelir"
          value="₺4.2M"
          change={47.4}
          previousValue="₺2.85M"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Hedef Gerç."
          value="105.0"
          unit="%"
          change={10.0}
          previousValue="95.0%"
          icon={<Target size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Kapanan Anlaşma"
          value="208"
          change={46.5}
          previousValue="142"
          icon={<ShoppingCart size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Ort. Anlaşma"
          value="₺20.2K"
          change={0.6}
          previousValue="₺20.1K"
          icon={<TrendingUp size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Aktif Lead"
          value="485"
          change={18.5}
          previousValue="410"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="En İyi Satıcı"
          value="Ahmet Y."
          unit=""
          change={0}
          previousValue="-"
          icon={<Award size={20} />}
          color="#10B981"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Satış Trendi vs Hedef</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="revenue" fill="#10B981" name="Gelir (₺)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef (₺)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Satış Temsilcisi Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesRepPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="rep" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="revenue" name="Gelir (₺)">
                {salesRepPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Pipeline Aşamaları</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={pipelineStageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Fırsat Sayısı">
                {pipelineStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ürün Karması</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={productMixData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="product" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" name="Gelir (₺)">
                {productMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Dönüşüm Oranları Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={conversionRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[40, 70]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="leadToQual" stroke="#10B981" strokeWidth={3} name="Lead→Qual (%)" />
              <Line type="monotone" dataKey="qualToProp" stroke="#3B82F6" strokeWidth={2} name="Qual→Prop (%)" />
              <Line type="monotone" dataKey="propToWon" stroke="#8B5CF6" strokeWidth={2} name="Prop→Won (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: CRM Sistemi (Salesforce, HubSpot) | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default SalesDashboard;






