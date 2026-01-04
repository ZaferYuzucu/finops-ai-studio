// Customer Service Dashboard - Müşteri Hizmetleri Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { MessageSquare, Clock, ThumbsUp, TrendingUp, Users, AlertCircle } from 'lucide-react';

const ticketVolumeData = [
  { day: 'Pzt', created: 285, resolved: 265, pending: 20 },
  { day: 'Sal', created: 310, resolved: 295, pending: 15 },
  { day: 'Çar', created: 295, resolved: 285, pending: 10 },
  { day: 'Per', created: 320, resolved: 310, pending: 10 },
  { day: 'Cum', created: 348, resolved: 335, pending: 13 },
  { day: 'Cmt', created: 185, resolved: 180, pending: 5 },
  { day: 'Paz', created: 158, resolved: 155, pending: 3 },
];

const categoryDistributionData = [
  { category: 'Teknik Destek', count: 685, percentage: 38.2 },
  { category: 'Faturalama', count: 420, percentage: 23.4 },
  { category: 'Ürün Sorgusu', count: 325, percentage: 18.1 },
  { category: 'Şikayet', count: 245, percentage: 13.7 },
  { category: 'Diğer', count: 120, percentage: 6.7 },
];

const resolutionTimeData = [
  { priority: 'Kritik', avgTime: 2.5, sla: 4.0, compliance: 97.5 },
  { priority: 'Yüksek', avgTime: 6.8, sla: 8.0, compliance: 95.2 },
  { priority: 'Orta', avgTime: 18.5, sla: 24.0, compliance: 92.8 },
  { priority: 'Düşük', avgTime: 42.0, sla: 48.0, compliance: 90.5 },
];

const satisfactionTrendData = [
  { week: 'Hf1', csat: 4.2, nps: 42, responseTime: 4.5 },
  { week: 'Hf2', csat: 4.3, nps: 45, responseTime: 4.2 },
  { week: 'Hf3', csat: 4.4, nps: 48, responseTime: 3.8 },
  { week: 'Hf4', csat: 4.5, nps: 52, responseTime: 3.5 },
  { week: 'Hf5', csat: 4.6, nps: 55, responseTime: 3.2 },
  { week: 'Hf6', csat: 4.7, nps: 58, responseTime: 2.8 },
];

const agentPerformanceData = [
  { agent: 'Ahmet Y.', tickets: 142, avgTime: 15.5, csat: 4.8 },
  { agent: 'Ayşe K.', tickets: 135, avgTime: 16.2, csat: 4.7 },
  { agent: 'Mehmet D.', tickets: 128, avgTime: 17.5, csat: 4.6 },
  { agent: 'Fatma S.', tickets: 118, avgTime: 18.2, csat: 4.5 },
  { agent: 'Ali B.', tickets: 108, avgTime: 19.5, csat: 4.4 },
];

const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'];

const CustomerServiceDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Müşteri Hizmetleri Paneli</h1>
        <p className="text-sm text-gray-600">Destek Talepleri & Müşteri Memnuniyeti | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Günlük Talep"
          value="348"
          change={22.1}
          previousValue="285"
          icon={<MessageSquare size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Çözüm Oranı"
          value="96.3"
          unit="%"
          change={3.4}
          previousValue="93.0%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ort. Çözüm"
          value="2.8"
          unit="saat"
          change={-37.8}
          previousValue="4.5 saat"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="CSAT"
          value="4.7"
          unit="/5"
          change={11.9}
          previousValue="4.2/5"
          icon={<ThumbsUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="NPS"
          value="58"
          change={38.1}
          previousValue="42"
          icon={<Users size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Bekleyen"
          value="76"
          change={-62.0}
          previousValue="200"
          icon={<AlertCircle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Talep Hacmi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ticketVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="resolved" stackId="a" fill="#10B981" name="Çözülen" />
              <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Bekleyen" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kategori Dağılımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Talep Sayısı">
                {categoryDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Öncelik Bazlı Çözüm Süresi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={resolutionTimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="priority" type="category" tick={{ fontSize: 10 }} width={60} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="avgTime" fill="#3B82F6" name="Ort. Süre (saat)" />
              <Bar dataKey="sla" fill="#9CA3AF" name="SLA (saat)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Memnuniyet & Yanıt Süresi Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={satisfactionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 70]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="csat" stroke="#10B981" strokeWidth={3} name="CSAT (/5)" />
              <Line yAxisId="right" type="monotone" dataKey="nps" stroke="#3B82F6" strokeWidth={2} name="NPS" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Temsilci Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={agentPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="agent" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="tickets" name="Çözülen Talep">
                {agentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Helpdesk Sistemi (Zendesk, Freshdesk) | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default CustomerServiceDashboard;











