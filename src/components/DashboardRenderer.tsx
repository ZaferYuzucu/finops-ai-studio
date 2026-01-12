import React from 'react';
import { Card, Title, AreaChart, BarChart, LineChart, DonutChart } from '@tremor/react';
import type { DashboardLayout } from '../utils/dashboardRenderer';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface DashboardRendererProps {
  layout: DashboardLayout;
}

export const DashboardRenderer: React.FC<DashboardRendererProps> = ({ layout }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">{layout.title}</h1>
        <p className="text-blue-100">{layout.description}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card decoration="top" decorationColor="blue">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-blue-600" size={20} />
            <p className="text-sm text-gray-600 font-medium">Toplam Veri</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{layout.summary.totalRows}</p>
          <p className="text-xs text-gray-500 mt-1">satır</p>
        </Card>

        {layout.summary.dateRange && (
          <Card decoration="top" decorationColor="green">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-green-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">Tarih Aralığı</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">{layout.summary.dateRange}</p>
          </Card>
        )}

        {Object.entries(layout.summary.keyMetrics).slice(0, 1).map(([key, value]) => (
          <Card key={key} decoration="top" decorationColor="purple">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-purple-600" size={20} />
              <p className="text-sm text-gray-600 font-medium">{key}</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value.toLocaleString('tr-TR')}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        {layout.charts.map((chart, index) => (
          <Card key={index}>
            <Title>{chart.title}</Title>
            <div className="mt-4">
              {chart.type === 'line' && (
                <LineChart
                  data={chart.data}
                  index={chart.index}
                  categories={chart.categories}
                  colors={['blue']}
                  valueFormatter={(value) => value.toLocaleString('tr-TR')}
                  yAxisWidth={80}
                  showAnimation={true}
                  className="h-80"
                />
              )}
              
              {chart.type === 'bar' && (
                <BarChart
                  data={chart.data}
                  index={chart.index}
                  categories={chart.categories}
                  colors={['indigo']}
                  valueFormatter={(value) => value.toLocaleString('tr-TR')}
                  yAxisWidth={80}
                  showAnimation={true}
                  className="h-80"
                />
              )}
              
              {chart.type === 'area' && (
                <AreaChart
                  data={chart.data}
                  index={chart.index}
                  categories={chart.categories}
                  colors={['green']}
                  valueFormatter={(value) => value.toLocaleString('tr-TR')}
                  yAxisWidth={80}
                  showAnimation={true}
                  className="h-80"
                />
              )}
              
              {(chart.type === 'donut' || chart.type === 'pie') && (
                <DonutChart
                  data={chart.data}
                  category="value"
                  index={chart.index === 'category' ? 'category' : 'name'}
                  valueFormatter={(value) => value.toLocaleString('tr-TR')}
                  colors={['blue', 'cyan', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']}
                  showAnimation={true}
                  className="h-80"
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pt-4">
        <p>Dashboard oluşturuldu: {new Date().toLocaleString('tr-TR')}</p>
        <p className="mt-1">FinOps AI Studio • Powered by Tremor</p>
      </div>
    </div>
  );
};
