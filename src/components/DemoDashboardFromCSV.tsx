/**
 * Demo Dashboard - CSV Library'den Beslenen
 */

import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCSVData } from '../hooks/useCSVData';
import { TrendingUp, Database, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DemoDashboardFromCSVProps {
  datasetId: string | null;
  onClose?: () => void;
}

const DemoDashboardFromCSV: React.FC<DemoDashboardFromCSVProps> = ({ datasetId, onClose }) => {
  const { t } = useTranslation();
  const { data, metadata, loading, error, aggregateMetric, getMetricData } = useCSVData(datasetId);

  if (!datasetId) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-200">
        <p className="text-gray-600">
          {t('demoDashboard.noDatasetSelected')}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-200">
        <p className="text-gray-600">{t('demoDashboard.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-red-200">
        <p className="text-red-600">{t('demoDashboard.error')}: {error}</p>
      </div>
    );
  }

  if (!metadata || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
        <p className="text-gray-600">{t('demoDashboard.noDataFound')}</p>
      </div>
    );
  }

  // Chart data hazırlama
  const prepareChartData = (chart: any) => {
    const metricData = getMetricData(chart.y);
    
    // Tarihe göre grupla
    const grouped: any = {};
    metricData.forEach((row: any) => {
      const key = row.date;
      if (!grouped[key]) {
        grouped[key] = { x: key, y: 0, count: 0 };
      }
      grouped[key].y += parseFloat(String(row.value)) || 0;
      grouped[key].count += 1;
    });
    
    return Object.values(grouped)
      .map((item: any) => ({
        x: item.x,
        y: chart.aggregate === 'avg' ? item.y / item.count : item.y
      }))
      .slice(0, 30);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Database className="text-blue-600" size={36} />
              {metadata.title}
            </h2>
            <p className="text-gray-700 text-lg">
              {metadata.sector} • {metadata.use_case}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              📊 {data.length.toLocaleString()} satır • {metadata.date_range?.start} → {metadata.date_range?.end}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center gap-2"
            >
              <X size={20} />
              {t('demoDashboard.close')}
            </button>
          )}
        </div>
      </div>

      {/* KPI Kartları */}
      {metadata.kpi_cards && metadata.kpi_cards.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={24} />
            {t('demoDashboard.keyMetrics')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metadata.kpi_cards.map((kpi: any, idx: number) => {
              const value = aggregateMetric(kpi.metric, kpi.aggregate);
              
              return (
                <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 border-2 border-green-200 shadow-md">
                  <p className="text-sm text-green-700 font-semibold mb-2">{kpi.title}</p>
                  <p className="text-3xl font-black text-green-900">
                    {kpi.format === 'currency' && '₺'}
                    {value.toLocaleString('tr-TR', { maximumFractionDigits: kpi.format === 'percentage' ? 1 : 0 })}
                    {kpi.format === 'percentage' && '%'}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {kpi.aggregate === 'sum' && t('demoDashboard.aggregates.sum')}
                    {kpi.aggregate === 'avg' && t('demoDashboard.aggregates.avg')}
                    {kpi.aggregate === 'max' && t('demoDashboard.aggregates.max')}
                    {kpi.aggregate === 'min' && t('demoDashboard.aggregates.min')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grafikler */}
      {metadata.recommended_charts && metadata.recommended_charts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            📊 {t('demoDashboard.charts')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metadata.recommended_charts.map((chart: any, idx: number) => {
              const chartData = prepareChartData(chart);
              
              return (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <p className="text-lg font-semibold text-gray-800 mb-4">{chart.title}</p>
                  <ResponsiveContainer width="100%" height={250}>
                    {chart.type === 'LineChart' ? (
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} name={chart.y} />
                      </LineChart>
                    ) : (
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="y" fill="#3b82f6" name={chart.y} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Veri Tablosu (opsiyonel) */}
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 {t('demoDashboard.dataPreview')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(data[0] || {}).map(key => (
                  <th key={key} className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row: any, idx: number) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  {Object.values(row).map((val: any, i: number) => (
                    <td key={i} className="px-4 py-2 text-gray-600">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboardFromCSV;

