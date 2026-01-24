import React from 'react';
import { Card, Title } from '@tremor/react';
import { 
  BarChart as RechartsBarChart, 
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import type { DashboardLayout } from '../utils/dashboardRenderer';
import { TrendingUp, DollarSign, Package, TrendingDown, Activity } from 'lucide-react';

interface DashboardRendererProps {
  layout: DashboardLayout;
}

// KPI Icon mapping
const KPI_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  default: TrendingUp,
  money: DollarSign,
  package: Package,
  trend: Activity,
  down: TrendingDown,
};

// KPI Renk paleti
const KPI_COLORS = [
  { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-600' },
  { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: 'text-green-600' },
  { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: 'text-purple-600' },
  { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'text-orange-600' },
  { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', icon: 'text-pink-600' },
  { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: 'text-indigo-600' },
];

// RENKLI PALET (Hex kodları - Recharts için)
const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#14B8A6'];

export const DashboardRenderer: React.FC<DashboardRendererProps> = ({ layout }) => {
  // KPI kartlarını render et
  const renderKPICards = () => {
    const metrics = Object.entries(layout.summary.keyMetrics);
    if (metrics.length === 0) {
      return (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 font-semibold text-center">⚠️ Veri Bağlı Değil - KPI verisi yüklenmedi</p>
        </div>
      );
    }

    return (
      <div className={`grid gap-3 ${
        metrics.length === 3 ? 'grid-cols-3' :
        metrics.length === 4 ? 'grid-cols-4' :
        metrics.length === 6 ? 'grid-cols-3' :
        'grid-cols-3'
      }`}>
        {metrics.map(([key, value], index) => {
          const colorScheme = KPI_COLORS[index % KPI_COLORS.length];
          const IconComponent = KPI_ICONS.default;
          
          return (
            <div
              key={key}
              className={`${colorScheme.bg} ${colorScheme.border} border-2 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`${colorScheme.icon} p-1.5 bg-white rounded-lg shadow-sm`}>
                  <IconComponent size={16} />
                </div>
                <p className={`text-xs font-semibold ${colorScheme.text} uppercase tracking-wide`}>
                  {key}
                </p>
              </div>
              <p className={`text-2xl font-bold ${colorScheme.text}`}>
                {typeof value === 'number' ? value.toLocaleString('tr-TR') : value}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  // Grafik grid düzenini belirle
  const getChartGridClass = () => {
    const chartCount = layout.charts.length;
    if (chartCount === 2) return 'grid-cols-1 lg:grid-cols-2';
    if (chartCount === 3) return 'grid-cols-1 lg:grid-cols-3';  // 3 grafik yan yana
    if (chartCount === 4) return 'grid-cols-1 lg:grid-cols-2';  // 2x2
    if (chartCount === 5) return 'grid-cols-1'; // Özel layout
    if (chartCount === 6) return 'grid-cols-1 lg:grid-cols-3';  // 2x3
    return 'grid-cols-1 lg:grid-cols-2';
  };

  // 5 grafik için özel layout
  const render5ChartLayout = () => (
    <div className="space-y-3">
      {/* İlk 3 grafik */}
      <div className="grid grid-cols-3 gap-3">
        {layout.charts.slice(0, 3).map((chart, index) => (
          <Card key={index} className="shadow-md p-3">
            {renderChart(chart, index)}
          </Card>
        ))}
      </div>
      {/* Son 2 grafik */}
      <div className="grid grid-cols-2 gap-3">
        {layout.charts.slice(3, 5).map((chart, index) => (
          <Card key={index + 3} className="shadow-md p-3">
            {renderChart(chart, index + 3)}
          </Card>
        ))}
      </div>
    </div>
  );

  // Tek bir grafiği render et (RECHARTS - RENKLI!)
  const renderChart = (chart: any, index: number) => {
    return (
      <>
        <Title className="text-sm font-bold text-gray-900">{chart.title}</Title>
        <div className="mt-2">
          {/* LINE CHART */}
          {chart.type === 'line' && (
            <ResponsiveContainer width="100%" height={220}>
              <RechartsLineChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey={chart.index} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: any) => value.toLocaleString('tr-TR')} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={3} 
                  name="Değer"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          )}
          
          {/* BAR CHART - HER BAR FARKLI RENK! */}
          {chart.type === 'bar' && (
            <ResponsiveContainer width="100%" height={220}>
              <RechartsBarChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey={chart.index} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: any) => value.toLocaleString('tr-TR')} />
                <Bar dataKey="value" name="Değer">
                  {chart.data.map((entry: any, idx: number) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          )}
          
          {/* PIE/DONUT CHART - RENKLI! */}
          {(chart.type === 'donut' || chart.type === 'pie') && (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chart.data}
                  dataKey="value"
                  nameKey={chart.index === 'category' ? 'category' : 'name'}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={chart.type === 'donut' ? 60 : 0}
                  label={(entry) => `${entry[chart.index === 'category' ? 'category' : 'name']}: ${entry.value.toLocaleString('tr-TR')}`}
                  labelLine={true}
                >
                  {chart.data.map((entry: any, idx: number) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => value.toLocaleString('tr-TR')} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </>
    );
  };

  return (
    <div 
      className="space-y-4 p-6 rounded-2xl print:p-0 print:rounded-none mx-auto" 
      id="dashboard-printable"
      style={{
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 25%, #faf5ff 50%, #f0f9ff 75%, #f5f8ff 100%)',
        width: '1123px',
        maxWidth: '1123px',
        minHeight: '794px',
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-5 rounded-xl shadow-lg print:rounded-none print:shadow-none">
        <h1 className="text-2xl font-bold mb-1 print:text-xl">{layout.title}</h1>
        <p className="text-sm text-blue-100 print:text-gray-600">{layout.description}</p>
      </div>

      {/* KPI Cards */}
      {renderKPICards()}

      {/* Charts */}
      {layout.charts.length === 5 ? (
        render5ChartLayout()
      ) : (
        <div className={`grid ${getChartGridClass()} gap-3`}>
          {layout.charts.map((chart, index) => (
            <Card key={index} className="shadow-md print:shadow-none print:border p-3">
              {renderChart(chart, index)}
            </Card>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pt-4 print:hidden">
        <p>Dashboard oluşturuldu: {new Date().toLocaleString('tr-TR')}</p>
        <p className="mt-1">FinOps AI Studio • finops.ist</p>
      </div>
    </div>
  );
};
