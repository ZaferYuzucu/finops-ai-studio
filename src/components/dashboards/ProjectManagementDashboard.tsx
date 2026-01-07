// Project Management Dashboard - Proje Yönetimi Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { Briefcase, Clock, DollarSign, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

const projectStatusData = [
  { status: 'Tamamlandı', count: 42, budget: 2850000 },
  { status: 'Devam Ediyor', count: 28, budget: 4200000 },
  { status: 'Gecikmeli', count: 8, budget: 950000 },
  { status: 'Riskli', count: 5, budget: 620000 },
];

const budgetPerformanceData = [
  { project: 'Proje-A', budget: 850000, spent: 820000, variance: -30000 },
  { project: 'Proje-B', budget: 720000, spent: 685000, variance: -35000 },
  { project: 'Proje-C', budget: 620000, spent: 640000, variance: 20000 },
  { project: 'Proje-D', budget: 580000, spent: 595000, variance: 15000 },
  { project: 'Proje-E', budget: 485000, spent: 475000, variance: -10000 },
];

const milestoneCompletionData = [
  { month: 'Oca', planned: 28, completed: 25, onTrack: 89.3 },
  { month: 'Şub', planned: 32, completed: 30, onTrack: 93.8 },
  { month: 'Mar', planned: 35, completed: 33, onTrack: 94.3 },
  { month: 'Nis', planned: 38, completed: 37, onTrack: 97.4 },
];

const resourceUtilizationData = [
  { team: 'Geliştirme', allocated: 85.5, available: 95.0 },
  { team: 'Tasarım', allocated: 78.2, available: 92.0 },
  { team: 'Test', allocated: 72.5, available: 88.0 },
  { team: 'PM', allocated: 90.2, available: 96.0 },
];

const riskIssueData = [
  { week: 'Hf1', open: 28, resolved: 22, new: 8 },
  { week: 'Hf2', open: 25, resolved: 18, new: 5 },
  { week: 'Hf3', open: 22, resolved: 20, new: 7 },
  { week: 'Hf4', open: 18, resolved: 15, new: 4 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

const ProjectManagementDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Proje Yönetimi Paneli</h1>
        <p className="text-sm text-gray-600">Proje Portföyü & Performans | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Aktif Projeler"
          value="83"
          change={8.2}
          previousValue="77"
          icon={<Briefcase size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Zamanında %"
          value="84.3"
          unit="%"
          change={5.2}
          previousValue="80.1%"
          icon={<CheckCircle size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Bütçe Uyumu"
          value="92.5"
          unit="%"
          change={3.8}
          previousValue="89.1%"
          icon={<DollarSign size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Tamamlanan"
          value="42"
          change={16.7}
          previousValue="36"
          icon={<TrendingUp size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Kaynak Kullanım"
          value="81.6"
          unit="%"
          change={4.5}
          previousValue="78.1%"
          icon={<Clock size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Riskli/Gecikmeli"
          value="13"
          change={-27.8}
          previousValue="18"
          icon={<AlertTriangle size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Proje Durum Dağılımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={projectStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="status" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Proje Sayısı">
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Bütçe Performansı (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="project" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="budget" fill="#9CA3AF" name="Bütçe (₺)" />
              <Bar dataKey="spent" fill="#3B82F6" name="Harcanan (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Milestone Tamamlama</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={milestoneCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[80, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="completed" fill="#10B981" name="Tamamlanan" />
              <Line yAxisId="right" type="monotone" dataKey="onTrack" stroke="#3B82F6" strokeWidth={3} name="Uyum (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kaynak Kullanımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={resourceUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="team" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="allocated" fill="#3B82F6" name="Tahsis Edilen (%)" />
              <Bar dataKey="available" fill="#9CA3AF" name="Mevcut (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Risk & Issue Takibi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={riskIssueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="open" stroke="#EF4444" strokeWidth={3} name="Açık" />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Çözülen" />
              <Line type="monotone" dataKey="new" stroke="#F59E0B" strokeWidth={2} name="Yeni" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Proje Yönetim Araçları (Jira, MS Project) | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default ProjectManagementDashboard;















