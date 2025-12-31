/**
 * CSV Data Loader Hook
 * CSV Kütüphanesi'nden veri yükler
 */

import { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface CSVRow {
  date: string;
  entity: string;
  category: string;
  metric: string;
  value: string | number;
  currency?: string;
  unit?: string;
}

interface Metadata {
  id: string;
  title: string;
  sector: string;
  use_case: string;
  metrics: Array<{
    name: string;
    description: string;
    unit?: string;
    currency?: string;
    type: string;
  }>;
  recommended_charts: Array<{
    type: string;
    title: string;
    x: string;
    y: string;
    groupBy?: string;
    aggregate?: string;
  }>;
  kpi_cards: Array<{
    title: string;
    metric: string;
    aggregate: string;
    format: string;
  }>;
}

interface UseCSVDataResult {
  data: CSVRow[];
  metadata: Metadata | null;
  loading: boolean;
  error: string | null;
  // Yardımcı fonksiyonlar
  getMetricData: (metric: string, entity?: string, category?: string) => CSVRow[];
  getUniqueEntities: () => string[];
  getUniqueCategories: () => string[];
  getUniqueMetrics: () => string[];
  getDateRange: () => { start: string; end: string };
  aggregateMetric: (metric: string, aggregation: 'sum' | 'avg' | 'min' | 'max') => number;
}

export function useCSVData(datasetId: string | null): UseCSVDataResult {
  const [data, setData] = useState<CSVRow[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!datasetId) {
      setData([]);
      setMetadata(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Metadata ve CSV'yi paralel yükle
    Promise.all([
      fetch(`/data/csv-library/datasets/${datasetId}/metadata.json`).then(r => r.json()),
      fetch(`/data/csv-library/datasets/${datasetId}/data.csv`).then(r => r.text())
    ])
      .then(([meta, csvText]) => {
        setMetadata(meta);

        // CSV parse et
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data as CSVRow[]);
            setLoading(false);
          },
          error: (err) => {
            setError(`CSV parse hatası: ${err.message}`);
            setLoading(false);
          }
        });
      })
      .catch((err) => {
        setError(`Veri yükleme hatası: ${err.message}`);
        setLoading(false);
      });
  }, [datasetId]);

  // Yardımcı fonksiyonlar
  const getMetricData = (metric: string, entity?: string, category?: string): CSVRow[] => {
    return data.filter(row => {
      if (row.metric !== metric) return false;
      if (entity && row.entity !== entity) return false;
      if (category && row.category !== category) return false;
      return true;
    });
  };

  const getUniqueEntities = (): string[] => {
    return Array.from(new Set(data.map(row => row.entity)));
  };

  const getUniqueCategories = (): string[] => {
    return Array.from(new Set(data.map(row => row.category)));
  };

  const getUniqueMetrics = (): string[] => {
    return Array.from(new Set(data.map(row => row.metric)));
  };

  const getDateRange = (): { start: string; end: string } => {
    const dates = data.map(row => row.date).filter(d => d).sort();
    return {
      start: dates[0] || '',
      end: dates[dates.length - 1] || ''
    };
  };

  const aggregateMetric = (metric: string, aggregation: 'sum' | 'avg' | 'min' | 'max'): number => {
    const values = data
      .filter(row => row.metric === metric)
      .map(row => parseFloat(String(row.value)))
      .filter(v => !isNaN(v));

    if (values.length === 0) return 0;

    switch (aggregation) {
      case 'sum':
        return values.reduce((a, b) => a + b, 0);
      case 'avg':
        return values.reduce((a, b) => a + b, 0) / values.length;
      case 'min':
        return Math.min(...values);
      case 'max':
        return Math.max(...values);
      default:
        return 0;
    }
  };

  return {
    data,
    metadata,
    loading,
    error,
    getMetricData,
    getUniqueEntities,
    getUniqueCategories,
    getUniqueMetrics,
    getDateRange,
    aggregateMetric
  };
}

