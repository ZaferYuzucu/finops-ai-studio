// Call Center Dashboard - Çağrı Merkezi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { Phone, Clock, Users, TrendingUp, ThumbsUp, AlertCircle } from 'lucide-react';

const callVolumeData = [
  { day: 'Pzt', inbound: 1250, outbound: 420, answered: 1180, abandoned: 70 },
  { day: 'Sal', inbound: 1320, outbound: 385, answered: 1265, abandoned: 55 },
  { day: 'Çar', inbound: 1285, outbound: 410, answered: 1225, abandoned: 60 },
  { day: 'Per', inbound: 1350, outbound: 395, answered: 1295, abandoned: 55 },
  { day: 'Cum', inbound: 1420, outbound: 450, answered: 1365, abandoned: 55 },
  { day: 'Cmt', inbound: 985, outbound: 285, answered: 935, abandoned: 50 },
  { day: 'Paz', inbound: 850, outbound: 220, answered: 815, abandoned: 35 },
];

const agentPerformanceData = [
  { agent: 'Ahmet Y.', calls: 185, avgTime: 285, satisfaction: 4.8 },
  { agent: 'Ayşe K.', calls: 172, avgTime: 295, satisfaction: 4.7 },
  { agent: 'Mehmet D.', calls: 165, avgTime: 310, satisfaction: 4.6 },
  { agent: 'Fatma S.', calls: 158, avgTime: 320, satisfaction: 4.5 },
  { agent: 'Ali B.', calls: 145, avgTime: 335, satisfaction: 4.4 },
];

const callReasonData = [
  { reason: 'Teknik Destek', count: 2850, percentage: 35.2 },
  { reason: 'Sipariş Takibi', count: 2100, percentage: 25.9 },
  { reason: 'Fatura Sorgusu', count: 1550, percentage: 19.1 },
  { reason: 'Şikayet', count: 985, percentage: 12.2 },
  { reason: 'Diğer', count: 615, percentage: 7.6 },
];

const slMetricsData = [
  { hour: '08-10', sl: 85.5, target: 80.0, awt: 45 },
  { hour: '10-12', sl: 88.2, target: 80.0, awt: 38 },
  { hour: '12-14', sl: 82.5, target: 80.0, awt: 52 },
  { hour: '14-16', sl: 86.8, target: 80.0, awt: 42 },
  { hour: '16-18', sl: 84.2, target: 80.0, awt: 48 },
];

const satisfactionTrendData = [
  { week: 'Hf1', csat: 4.2, nps: 42 },
  { week: 'Hf2', csat: 4.3, nps: 45 },
  { week: 'Hf3', csat: 4.4, nps: 48 },
  { week: 'Hf4', csat: 4.5, nps: 52 },
  { week: 'Hf5', csat: 4.6, nps: 55 },
  { week: 'Hf6', csat: 4.7, nps: 58 },
];

const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'];

const CallCenterDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Çağrı Merkezi Paneli</h1>
        <p className="text-sm text-gray-600">Çağrı Performansı & Müşteri Memnuniyeti | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Çağrı"
          value="1,420"
          change={13.6}
          previousValue="1,250"
          icon={<Phone size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Yanıtlama %"
          value="96.1"
          unit="%"
          change={1.8}
          previousValue="94.4%"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ort. Bekleme"
          value="42"
          unit="sn"
          change={-6.7}
          previousValue="45 sn"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="SL (80/20)"
          value="85.4"
          unit="%"
          change={5.8}
          previousValue="80.7%"
          icon={<Target size={20} />}
          color="#10B981"
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
          title="Terk Oranı"
          value="3.9"
          unit="%"
          change={-44.3}
          previousValue="7.0%"
          icon={<AlertCircle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Çağrı Hacmi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="answered" stackId="a" fill="#10B981" name="Yanıtlanan" />
              <Bar dataKey="abandoned" stackId="a" fill="#EF4444" name="Terk Edilen" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Temsilci Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={agentPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="agent" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="calls" name="Çağrı Sayısı">
                {agentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Çağrı Nedenleri (Pareto)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={callReasonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="reason" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Çağrı Adedi">
                {callReasonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Saatlik Service Level</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={slMetricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[70, 95]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="sl" stroke="#10B981" strokeWidth={3} name="SL (%)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef (80%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Memnuniyet Trendi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={satisfactionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="csat" stroke="#10B981" strokeWidth={3} name="CSAT (/5)" />
              <Line yAxisId="right" type="monotone" dataKey="nps" stroke="#3B82F6" strokeWidth={2} name="NPS" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Contact Center Platform (CCP) | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default CallCenterDashboard;















