// Web Analytics Dashboard - Web Analitik Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Users, Eye, Clock, TrendingUp, MousePointer, Target } from 'lucide-react';

const trafficTrendData = [
  { day: 'Pzt', pageviews: 28500, sessions: 12500, users: 8500, bounceRate: 42.5 },
  { day: 'Sal', pageviews: 31200, sessions: 13800, users: 9200, bounceRate: 40.2 },
  { day: 'Çar', pageviews: 33500, sessions: 14500, users: 9800, bounceRate: 38.5 },
  { day: 'Per', pageviews: 35800, sessions: 15200, users: 10500, bounceRate: 37.2 },
  { day: 'Cum', pageviews: 38500, sessions: 16500, users: 11200, bounceRate: 35.8 },
  { day: 'Cmt', pageviews: 24200, sessions: 10500, users: 7200, bounceRate: 45.2 },
  { day: 'Paz', pageviews: 21500, sessions: 9500, users: 6500, bounceRate: 48.5 },
];

const topPagesData = [
  { page: '/home', views: 85000, avgTime: 145, bounceRate: 32.5 },
  { page: '/products', views: 62000, avgTime: 285, bounceRate: 28.2 },
  { page: '/about', views: 45000, avgTime: 95, bounceRate: 52.8 },
  { page: '/blog', views: 38000, avgTime: 385, bounceRate: 22.5 },
  { page: '/contact', views: 28500, avgTime: 125, bounceRate: 38.5 },
];

const trafficSourceData = [
  { source: 'Organik Arama', sessions: 48500, percentage: 48.5, bounceRate: 35.2 },
  { source: 'Direkt', sessions: 28500, percentage: 28.5, bounceRate: 32.8 },
  { source: 'Referral', sessions: 12800, percentage: 12.8, bounceRate: 42.5 },
  { source: 'Sosyal Medya', sessions: 8200, percentage: 8.2, bounceRate: 55.2 },
  { source: 'E-posta', sessions: 2000, percentage: 2.0, bounceRate: 28.5 },
];

const deviceBreakdownData = [
  { device: 'Desktop', sessions: 52500, percentage: 52.5 },
  { device: 'Mobile', sessions: 38500, percentage: 38.5 },
  { device: 'Tablet', sessions: 9000, percentage: 9.0 },
];

const conversionFunnelData = [
  { stage: 'Ziyaret', count: 100000, percentage: 100.0 },
  { stage: 'Ürün Görüntüleme', count: 28500, percentage: 28.5 },
  { stage: 'Sepete Ekleme', count: 8550, percentage: 8.6 },
  { stage: 'Checkout', count: 4275, percentage: 4.3 },
  { stage: 'Satın Alma', count: 2138, percentage: 2.1 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const WebAnalyticsDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Web Analitik Paneli</h1>
        <p className="text-sm text-gray-600">Trafik & Kullanıcı Davranışı Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Günlük Ziyaretçi"
          value="11.2K"
          change={31.8}
          previousValue="8.5K"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Sayfa Görüntüleme"
          value="38.5K"
          change={35.1}
          previousValue="28.5K"
          icon={<Eye size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Oturum Süresi"
          value="3:45"
          unit="dk"
          change={15.4}
          previousValue="3:15 dk"
          icon={<Clock size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Bounce Rate"
          value="35.8"
          unit="%"
          change={-15.8}
          previousValue="42.5%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Dönüşüm Oranı"
          value="2.1"
          unit="%"
          change={10.5}
          previousValue="1.9%"
          icon={<Target size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="CTR"
          value="4.8"
          unit="%"
          change={9.1}
          previousValue="4.4%"
          icon={<MousePointer size={20} />}
          color="#3B82F6"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Haftalık Trafik Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={trafficTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 60]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="users" fill="#3B82F6" name="Ziyaretçi" />
              <Line yAxisId="right" type="monotone" dataKey="bounceRate" stroke="#EF4444" strokeWidth={3} name="Bounce Rate (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">En Popüler Sayfalar (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topPagesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="page" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="views" name="Görüntülenme">
                {topPagesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Trafik Kaynakları</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trafficSourceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="source" type="category" tick={{ fontSize: 9 }} width={100} />
              <Tooltip />
              <Bar dataKey="sessions" name="Oturum">
                {trafficSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Cihaz Dağılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={deviceBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="device" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="sessions" name="Oturum">
                {deviceBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Dönüşüm Hunisi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={conversionFunnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="stage" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Kullanıcı Sayısı">
                {conversionFunnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Google Analytics + Adobe Analytics | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default WebAnalyticsDashboard;










