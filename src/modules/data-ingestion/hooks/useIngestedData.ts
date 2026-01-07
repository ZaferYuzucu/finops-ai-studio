import { useState, useEffect } from 'react';
import { getAllDatasets, getDatasetsByType, SavedDataset } from '../services/storageService';
import { DatasetType } from '../types';

/**
 * Hook for accessing ingested data in dashboards
 * 
 * Usage:
 * const { datasets, loading, refresh } = useIngestedData('Sales');
 */
export function useIngestedData(type?: DatasetType) {
  const [datasets, setDatasets] = useState<SavedDataset[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    try {
      const data = type ? getDatasetsByType(type) : getAllDatasets();
      setDatasets(data);
    } catch (error) {
      console.error('Error loading ingested data:', error);
      setDatasets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [type]);

  return {
    datasets,
    loading,
    refresh: loadData
  };
}

/**
 * Get aggregated data for a specific date range
 */
export function useAggregatedData(type: DatasetType, startDate?: string, endDate?: string) {
  const { datasets } = useIngestedData(type);
  
  const [aggregated, setAggregated] = useState<{
    totalValue: number;
    rowCount: number;
    categories: Record<string, number>;
    entities: Record<string, number>;
    dateRange: { min: string; max: string };
  } | null>(null);

  useEffect(() => {
    if (datasets.length === 0) {
      setAggregated(null);
      return;
    }

    // Aggregate all rows
    const allRows = datasets.flatMap(d => d.rows);
    
    // Filter by date range if provided
    const filteredRows = allRows.filter(row => {
      if (!row.date) return false;
      if (startDate && row.date < startDate) return false;
      if (endDate && row.date > endDate) return false;
      return true;
    });

    // Calculate aggregations
    const totalValue = filteredRows.reduce((sum, row) => sum + (row.value || 0), 0);
    
    const categories: Record<string, number> = {};
    const entities: Record<string, number> = {};
    
    filteredRows.forEach(row => {
      if (row.category) {
        categories[row.category] = (categories[row.category] || 0) + (row.value || 0);
      }
      if (row.entity) {
        entities[row.entity] = (entities[row.entity] || 0) + (row.value || 0);
      }
    });

    // Date range
    const dates = filteredRows.map(r => r.date).filter(Boolean).sort();
    const dateRange = {
      min: dates[0] || '',
      max: dates[dates.length - 1] || ''
    };

    setAggregated({
      totalValue,
      rowCount: filteredRows.length,
      categories,
      entities,
      dateRange
    });
  }, [datasets, startDate, endDate]);

  return aggregated;
}










