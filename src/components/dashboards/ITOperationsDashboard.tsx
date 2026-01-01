// IT Operations Dashboard - BT Operasyon Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { Server, AlertTriangle, Clock, TrendingUp, Activity, CheckCircle } from 'lucide-react';

const systemUptimeData = [
  { day: 'Pzt', uptime: 99.95, incidents: 2, downtime: 0.72 },
  { day: 'Sal', uptime: 99.98, incidents: 1, downtime: 0.29 },
  { day: 'Çar', uptime: 99.92, incidents: 3, downtime: 1.15 },
  { day: 'Per', uptime: 99.97, incidents: 1, downtime: 0.43 },
  { day: 'Cum', uptime: 99.99, incidents: 0, downtime: 0.14 },
  { day: 'Cmt', uptime: 99.95, incidents: 2, downtime: 0.72 },
  { day: 'Paz', uptime: 99.98, incidents: 1, downtime: 0.29 },
];

const incidentCategoryData = [
  { category: 'Network', count: 28, mttr: 42 },
  { category: 'Server', count: 22, mttr: 68 },
  { category: 'Application', count: 35, mttr: 35 },
  { category: 'Database', count: 18, mttr: 85 },
  { category: 'Security', count: 12, mttr: 120 },
];

const serverPerformanceData = [
  { server: 'Web-01', cpu: 68.5, memory: 72.8, disk: 58.2, health: 85.2 },
  { server: 'DB-01', cpu: 75.2, memory: 82.5, disk: 65.8, health: 78.8 },
  { server: 'App-01', cpu: 62.8, memory: 68.5, disk: 52.5, health: 88.5 },
  { server: 'Cache-01', cpu: 48.5, memory: 55.2, disk: 35.8, health: 95.2 },
];

const backupStatusData = [
  { week: 'Hf1', successful: 142, failed: 8, completion: 94.7 },
  { week: 'Hf2', successful: 148, failed: 5, completion: 96.7 },
  { week: 'Hf3', successful: 152, failed: 3, completion: 98.1 },
  { week: 'Hf4', successful: 155, failed: 2, completion: 98.7 },
];

const securityEventsData = [
  { day: 'Pzt', blocked: 285, quarantined: 42, clean: 18500 },
  { day: 'Sal', blocked: 312, quarantined: 38, clean: 18650 },
  { day: 'Çar', blocked: 295, quarantined: 45, clean: 18480 },
  { day: 'Per', blocked: 328, quarantined: 52, clean: 18720 },
  { day: 'Cum', blocked: 348, quarantined: 48, clean: 18850 },
  { day: 'Cmt', blocked: 185, quarantined: 22, clean: 14280 },
  { day: 'Paz', blocked: 158, quarantined: 18, clean: 13920 },
];

const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'];

const ITOperationsDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">BT Operasyon Paneli</h1>
        <p className="text-sm text-gray-600">Sistem Sağlığı & Performans Göstergeleri | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Sistem Uptime"
          value="99.96"
          unit="%"
          change={0.05}
          previousValue="99.91%"
          icon={<Server size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Aktif İnci Incident"
          value="10"
          change={-52.4}
          previousValue="21"
          icon={<AlertTriangle size={20} />}
          color="#EF4444"
        />
        <KpiCard
          title="MTTR"
          value="62"
          unit="dk"
          change={-16.2}
          previousValue="74 dk"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Backup Başarı"
          value="98.7"
          unit="%"
          change={4.2}
          previousValue="94.7%"
          icon={<CheckCircle size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Ort. CPU"
          value="63.8"
          unit="%"
          change={-5.2}
          previousValue="67.3%"
          icon={<Activity size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Güvenlik Engeli"
          value="295"
          change={3.5}
          previousValue="285"
          icon={<TrendingUp size={20} />}
          color="#8B5CF6"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Günlük Sistem Uptime</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={systemUptimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[99.8, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="uptime" stroke="#10B981" strokeWidth={3} name="Uptime (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Incident Kategorileri</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={incidentCategoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="count" name="Adet">
                {incidentCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Sunucu CPU Kullanımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={serverPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis dataKey="server" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="cpu" name="CPU (%)">
                {serverPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Backup Durumu</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={backupStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="successful" fill="#10B981" name="Başarılı" />
              <Bar dataKey="failed" fill="#EF4444" name="Başarısız" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Güvenlik Olayları</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={securityEventsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="blocked" fill="#EF4444" name="Engellendi" />
              <Bar dataKey="quarantined" fill="#F59E0B" name="Karantina" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Monitoring Tools (Datadog, Nagios, Zabbix) | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default ITOperationsDashboard;










