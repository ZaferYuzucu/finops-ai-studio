// Marketing Dashboard - Pazarlama Performans Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { TrendingUp, Users, DollarSign, Eye, MousePointer, Target } from 'lucide-react';

const campaignPerformanceData = [
  { week: 'Hf1', impressions: 285000, clicks: 8550, conversions: 385, spend: 12500 },
  { week: 'Hf2', impressions: 312000, clicks: 9360, conversions: 420, spend: 13200 },
  { week: 'Hf3', impressions: 335000, clicks: 10050, conversions: 465, spend: 14100 },
  { week: 'Hf4', impressions: 358000, clicks: 10740, conversions: 505, spend: 15000 },
  { week: 'Hf5', impressions: 385000, clicks: 11550, conversions: 550, spend: 16200 },
  { week: 'Hf6', impressions: 412000, clicks: 12360, conversions: 595, spend: 17500 },
];

const channelPerformanceData = [
  { channel: 'Google Ads', spend: 42000, conversions: 1250, roi: 3.8, cpa: 33.6 },
  { channel: 'Facebook', spend: 28000, conversions: 920, roi: 2.9, cpa: 30.4 },
  { channel: 'Instagram', spend: 22000, conversions: 685, roi: 2.5, cpa: 32.1 },
  { channel: 'LinkedIn', spend: 18500, conversions: 420, roi: 2.2, cpa: 44.0 },
  { channel: 'Twitter', spend: 12500, conversions: 285, roi: 1.8, cpa: 43.9 },
];

const contentPerformanceData = [
  { content: 'Blog-01', views: 28500, engagement: 4250, convRate: 4.8 },
  { content: 'Video-02', views: 42000, engagement: 8400, convRate: 5.2 },
  { content: 'Infographic-03', views: 18500, engagement: 3145, convRate: 3.9 },
  { content: 'Webinar-04', views: 12500, engagement: 2875, convRate: 6.5 },
  { content: 'eBook-05', views: 9500, engagement: 1900, convRate: 7.2 },
];

const leadFunnelData = [
  { stage: 'Ziyaret', count: 412000, percentage: 100.0 },
  { stage: 'Lead', count: 12360, percentage: 3.0 },
  { stage: 'MQL', count: 5944, percentage: 1.4 },
  { stage: 'SQL', count: 2472, percentage: 0.6 },
  { stage: 'Müşteri', count: 595, percentage: 0.14 },
];

const roiTrendData = [
  { month: 'Oca', spend: 48500, revenue: 145500, roi: 3.0 },
  { month: 'Şub', spend: 52000, revenue: 166400, roi: 3.2 },
  { month: 'Mar', spend: 55500, revenue: 183150, roi: 3.3 },
  { month: 'Nis', spend: 58000, revenue: 203000, roi: 3.5 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const MarketingDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Pazarlama Performans Paneli</h1>
        <p className="text-sm text-gray-600">Kampanya & ROI Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Gösterim"
          value="412K"
          change={44.6}
          previousValue="285K"
          icon={<Eye size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Tıklama"
          value="12.4K"
          change={44.6}
          previousValue="8.6K"
          icon={<MousePointer size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Dönüşüm"
          value="595"
          change={54.5}
          previousValue="385"
          icon={<Target size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="CTR"
          value="3.0"
          unit="%"
          change={0}
          previousValue="3.0%"
          icon={<TrendingUp size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="ROI"
          value="3.5"
          unit="x"
          change={16.7}
          previousValue="3.0x"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="CPA"
          value="₺29.4"
          change={-9.2}
          previousValue="₺32.5"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kampanya Performans Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={campaignPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="impressions" fill="#3B82F6" name="Gösterim" />
              <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={3} name="Dönüşüm" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kanal Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={channelPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="conversions" name="Dönüşüm">
                {channelPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">İçerik Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={contentPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="content" type="category" tick={{ fontSize: 9 }} width={95} />
              <Tooltip />
              <Bar dataKey="engagement" name="Etkileşim">
                {contentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Lead Hunisi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadFunnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Adet">
                {leadFunnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">ROI Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={roiTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="spend" fill="#EF4444" name="Harcama (₺)" />
              <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} name="ROI (x)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Marketing Automation + Google Analytics + Ad Platforms | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default MarketingDashboard;















