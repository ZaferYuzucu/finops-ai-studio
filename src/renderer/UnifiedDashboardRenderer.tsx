// UNIFIED DASHBOARD RENDERER
// Single rendering pipeline for all dashboards

import React from 'react';
import { Card } from '@tremor/react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { DashboardTemplate } from '../registry/DashboardTemplateRegistry';
import { TrendingUp, DollarSign, Package, Activity } from 'lucide-react';

interface UnifiedDashboardRendererProps {
  template: DashboardTemplate;
  data?: any;
  csvData?: any[];
  onDataMissing?: () => void;
}

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

const KPI_ICONS: Record<string, any> = {
  default: TrendingUp,
  money: DollarSign,
  package: Package,
  trend: Activity
};

const formatValue = (value: number, format: string): string => {
  if (typeof value !== 'number' || isNaN(value)) return '-';
  
  switch (format) {
    case 'currency':
      if (value >= 1000000) return `₺${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `₺${(value / 1000).toFixed(1)}K`;
      return `₺${value.toFixed(0)}`;
    case 'percentage':
      return `%${value.toFixed(1)}`;
    case 'decimal':
      return value.toFixed(1);
    case 'number':
    default:
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toFixed(0);
  }
};

export const UnifiedDashboardRenderer: React.FC<UnifiedDashboardRendererProps> = ({
  template,
  data,
  csvData,
  onDataMissing
}) => {
  // Always render dashboard structure - never return null or empty
  const hasRealData = data || (csvData && csvData.length > 0);
  
  // Always render dashboard structure
  const kpiWidgets = template.defaultWidgets.filter(w => w.type === 'kpi');
  const chartWidgets = template.defaultWidgets.filter(w => w.type === 'chart');
  
  // Use real CSV data if available, otherwise generate mock data
  const displayData = csvData && csvData.length > 0 ? csvData : generateMockData(template);
  
  // Calculate KPI values from data
  const calculateKPI = (widget: any): number => {
    if (!displayData || displayData.length === 0) return Math.random() * 100000;
    
    // Try to find matching column in data
    const possibleKeys = [
      widget.id,
      widget.title.toLowerCase().replace(/\s+/g, '_'),
      widget.config.dataKey
    ].filter(Boolean);
    
    // Find first matching column
    for (const key of possibleKeys) {
      const values = displayData
        .map(row => parseFloat(row[key]))
        .filter(v => !isNaN(v));
      
      if (values.length > 0) {
        // Return latest value or average
        return values[values.length - 1];
      }
    }
    
    // Fallback: generate realistic mock value based on format
    if (widget.config.format === 'percentage') {
      return Math.random() * 60 + 20; // 20-80%
    } else if (widget.config.format === 'decimal') {
      return Math.random() * 2 + 3; // 3-5
    } else if (widget.config.format === 'currency') {
      return Math.random() * 500000 + 100000; // 100K-600K
    } else {
      return Math.random() * 10000 + 1000; // 1K-11K
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{template.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{template.name}</h1>
              <p className="text-sm text-blue-100">{template.description}</p>
            </div>
          </div>
        </div>
        
        {/* Data Warning Banner - Only show if no real data */}
        {!hasRealData && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="text-yellow-900 font-semibold">Veri Bağlı Değil</p>
                <p className="text-sm text-yellow-800">
                  Bu dashboard örnek verilerle gösteriliyor. Gerçek verilerinizi yüklemek için CSV dosyası bağlayın.
                </p>
              </div>
              {onDataMissing && (
                <button
                  onClick={onDataMissing}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition font-semibold text-sm"
                >
                  Veri Yükle
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* KPI Cards */}
        <div className={`grid gap-3 ${
          kpiWidgets.length === 6 ? 'grid-cols-3 lg:grid-cols-6' :
          kpiWidgets.length === 4 ? 'grid-cols-2 lg:grid-cols-4' :
          'grid-cols-3'
        }`}>
          {kpiWidgets.map((widget, index) => {
            const IconComponent = KPI_ICONS.default;
            const kpiValue = calculateKPI(widget);
            const formattedValue = formatValue(kpiValue, widget.config.format || 'number');
            
            return (
              <div
                key={widget.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <IconComponent size={16} className="text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">{widget.title}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formattedValue}</p>
              </div>
            );
          })}
        </div>
        
        {/* Charts */}
        <div className={`grid gap-4 ${
          chartWidgets.length === 3 ? 'grid-cols-1 lg:grid-cols-3' :
          chartWidgets.length === 4 ? 'grid-cols-1 lg:grid-cols-2' :
          'grid-cols-1 lg:grid-cols-2'
        }`}>
          {chartWidgets.map((widget, index) => {
            const chartData = generateChartData(widget.config.chartType, displayData, widget);
            
            return (
              <Card key={widget.id} className="p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{widget.title}</h3>
                {widget.config.chartType === 'line' && (
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                {widget.config.chartType === 'bar' && (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value">
                        {chartData.map((entry: any, idx: number) => (
                          <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
                {widget.config.chartType === 'pie' && (
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {chartData.map((entry: any, idx: number) => (
                          <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper functions
function generateMockData(template: DashboardTemplate): any[] {
  return Array.from({ length: 10 }, (_, i) => ({
    date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    value: Math.random() * 100000
  }));
}

function generateChartData(type: string, data: any[], widget?: any): any[] {
  // Try to use real data if available
  if (data && data.length > 0) {
    const firstRow = data[0];
    const columns = Object.keys(firstRow);
    
    // Find date/time column
    const dateCol = columns.find(col => 
      /date|time|day|month|period/i.test(col)
    );
    
    // Find value column
    const valueCol = columns.find(col => 
      /value|amount|total|revenue|sales|cost|price/i.test(col)
    );
    
    // For pie charts, try to find category and value columns
    if (type === 'pie') {
      const categoryCol = columns.find(col => 
        /category|type|name|group|segment/i.test(col)
      );
      
      if (categoryCol && valueCol) {
        // Aggregate by category
        const aggregated: Record<string, number> = {};
        data.forEach(row => {
          const cat = row[categoryCol];
          const val = parseFloat(row[valueCol]);
          if (cat && !isNaN(val)) {
            aggregated[cat] = (aggregated[cat] || 0) + val;
          }
        });
        
        return Object.entries(aggregated)
          .slice(0, 6) // Max 6 categories
          .map(([name, value]) => ({ name, value }));
      }
    }
    
    // For line/bar charts, use time series data
    if ((type === 'line' || type === 'bar') && dateCol && valueCol) {
      return data
        .slice(0, 12) // Max 12 data points
        .map(row => ({
          name: String(row[dateCol]).substring(0, 10),
          value: parseFloat(row[valueCol]) || 0
        }))
        .filter(item => !isNaN(item.value));
    }
  }
  
  // Fallback to mock data
  if (type === 'pie') {
    return [
      { name: 'Category A', value: 4500 },
      { name: 'Category B', value: 3200 },
      { name: 'Category C', value: 2800 },
      { name: 'Category D', value: 2100 }
    ];
  }
  
  return Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.random() * 10000 + 5000
  }));
}

export default UnifiedDashboardRenderer;
