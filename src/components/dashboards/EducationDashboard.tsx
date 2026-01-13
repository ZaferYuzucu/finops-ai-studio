// Education Dashboard - Eğitim Performans Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import KpiCard from './KpiCard';
import { GraduationCap, Users, BookOpen, TrendingUp, Award, Clock } from 'lucide-react';

const enrollmentTrendData = [
  { semester: '2023-1', students: 2850, retention: 92.5, completion: 88.2 },
  { semester: '2023-2', students: 2920, retention: 93.2, completion: 89.5 },
  { semester: '2024-1', students: 3050, retention: 94.0, completion: 90.2 },
  { semester: '2024-2', students: 3180, retention: 94.5, completion: 91.5 },
];

const coursePerformanceData = [
  { course: 'Matematik', enrolled: 485, passed: 420, passRate: 86.6 },
  { course: 'Fizik', enrolled: 420, passed: 365, passRate: 86.9 },
  { course: 'Kimya', enrolled: 385, passed: 320, passRate: 83.1 },
  { course: 'Biyoloji', enrolled: 358, passed: 305, passRate: 85.2 },
  { course: 'İngilizce', enrolled: 520, passed: 475, passRate: 91.3 },
];

const studentGradeDistributionData = [
  { grade: 'A (90-100)', count: 485 },
  { grade: 'B (80-89)', count: 720 },
  { grade: 'C (70-79)', count: 850 },
  { grade: 'D (60-69)', count: 520 },
  { grade: 'F (<60)', count: 280 },
];

const attendanceData = [
  { week: 'Hf1', attendance: 95.2, target: 90.0 },
  { week: 'Hf2', attendance: 94.8, target: 90.0 },
  { week: 'Hf3', attendance: 93.5, target: 90.0 },
  { week: 'Hf4', attendance: 94.0, target: 90.0 },
  { week: 'Hf5', attendance: 95.5, target: 90.0 },
  { week: 'Hf6', attendance: 96.2, target: 90.0 },
];

const facultyWorkloadData = [
  { faculty: 'Mühendislik', students: 850, staffCount: 28, ratio: 30.4 },
  { faculty: 'İşletme', students: 720, staffCount: 22, ratio: 32.7 },
  { faculty: 'Tıp', students: 580, staffCount: 42, ratio: 13.8 },
  { faculty: 'Hukuk', students: 485, staffCount: 18, ratio: 26.9 },
  { faculty: 'Fen-Edebiyat', students: 545, staffCount: 25, ratio: 21.8 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'];

const EducationDashboard: React.FC = () => {
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
        <h1 className="text-2xl font-black text-gray-900">Eğitim Performans Paneli</h1>
        <p className="text-sm text-gray-600">Öğrenci & Akademik Başarı Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Öğrenci"
          value="3,180"
          change={11.6}
          previousValue="2,850"
          icon={<Users size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Devam Oranı"
          value="96.2"
          unit="%"
          change={3.8}
          previousValue="92.7%"
          icon={<Clock size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Başarı Oranı"
          value="91.5"
          unit="%"
          change={3.7}
          previousValue="88.2%"
          icon={<Award size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Tutma Oranı"
          value="94.5"
          unit="%"
          change={2.2}
          previousValue="92.5%"
          icon={<TrendingUp size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Ders Sayısı"
          value="158"
          change={5.3}
          previousValue="150"
          icon={<BookOpen size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Öğr./Öğretim Üyesi"
          value="25.1"
          change={-2.7}
          previousValue="25.8"
          icon={<GraduationCap size={20} />}
          color="#3B82F6"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kayıt & Başarı Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollmentTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="semester" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="retention" stroke="#3B82F6" strokeWidth={3} name="Tutma (%)" />
              <Line type="monotone" dataKey="completion" stroke="#10B981" strokeWidth={2} name="Tamamlama (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ders Başarı Oranları (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={coursePerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis dataKey="course" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="passRate" name="Başarı (%)">
                {coursePerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Not Dağılımı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={studentGradeDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="grade" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Öğrenci Sayısı">
                {studentGradeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Haftalık Devam Oranı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[85, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={3} name="Devam (%)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Hedef (90%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Fakülte Bazlı İş Yükü</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={facultyWorkloadData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="faculty" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Bar dataKey="ratio" name="Öğr./Öğretim Üyesi">
                {facultyWorkloadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: Öğrenci Bilgi Sistemi (LMS) | Otomatik güncellenme: Günlük | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default EducationDashboard;










