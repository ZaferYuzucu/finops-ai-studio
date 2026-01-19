// FINOPS Chart Wrapper - Modular Component for Custom Dashboards
import React from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts';

export interface FinopsChartWrapperProps {
  title: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  data: any[];
  dataKey?: string;
  xAxisKey?: string;
  yAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showDataLabels?: boolean;
  colors?: string[];
  height?: number;
  microTable?: boolean;
  microTableData?: { columns: string[]; rows: (string | number)[][]; footnote?: string };
  footer?: string;
}

const DEFAULT_FINOPS_COLORS = [
  'var(--chart-1)', // #0284C7
  'var(--chart-2)', // #059669
  'var(--chart-3)', // #F59E0B
  'var(--chart-4)', // #7C3AED
  'var(--chart-5)', // #475569
  'var(--chart-6)', // #EC4899
  'var(--chart-7)', // #14B8A6
];

export const FinopsChartWrapper: React.FC<FinopsChartWrapperProps> = ({
  title,
  type,
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  yAxisKey,
  showGrid = true,
  showLegend = false,
  showDataLabels = true,
  colors = DEFAULT_FINOPS_COLORS,
  height = 280,
  microTable,
  microTableData,
  footer
}) => {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 20, bottom: 20, left: 20 }
    };

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-card-border)" />}
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid var(--bg-card-border)', 
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px' }} />}
            <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              {showDataLabels && (
                <LabelList 
                  dataKey={dataKey} 
                  position="top" 
                  style={{ fontSize: '11px', fill: 'var(--text-primary)', fontWeight: 700 }} 
                />
              )}
            </Bar>
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-card-border)" />}
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid var(--bg-card-border)', 
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px' }} />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              strokeWidth={3} 
              dot={{ r: 4, fill: colors[0] }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-card-border)" />}
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid var(--bg-card-border)', 
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px' }} />}
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              fill={colors[0]} 
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={showDataLabels ? ({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%` : false}
              labelLine={showDataLabels}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid var(--bg-card-border)', 
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px' }} />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="finops-card pdf-avoid-break h-full flex flex-col">
      {/* Title */}
      <div className="mb-3">
        <h3 className="text-sm font-bold finops-title">{title}</h3>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Micro Table (for PDF) */}
      {microTable && microTableData && (
        <div className="mt-3 print:block hidden">
          <div className="text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Detay Tablo
          </div>
          <div className="overflow-x-auto rounded-lg border-2" style={{ borderColor: 'var(--bg-card-border)' }}>
            <table className="w-full text-xs">
              <thead style={{ backgroundColor: 'var(--bg-main)' }}>
                <tr>
                  {microTableData.columns.map((col, idx) => (
                    <th key={idx} className="px-2 py-1.5 text-left font-bold" style={{ color: 'var(--text-primary)' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {microTableData.rows.map((row, ridx) => (
                  <tr key={ridx} className="border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="px-2 py-1.5" style={{ color: 'var(--text-secondary)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {microTableData.footnote && (
            <div className="mt-1 text-xs" style={{ color: 'var(--text-light)' }}>
              {microTableData.footnote}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="mt-2 pt-2 border-t text-xs" style={{ color: 'var(--text-light)', borderColor: 'var(--bg-card-border)' }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default FinopsChartWrapper;
