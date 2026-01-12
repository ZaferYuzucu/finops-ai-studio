import type { ParsedCSVData } from './csvParser';
import { detectDateColumn, detectNumericColumns, detectCategoryColumns, sortByDate } from './csvParser';

export interface ChartData {
  type: 'line' | 'bar' | 'area' | 'donut' | 'pie';
  title: string;
  data: any[];
  index: string; // X-axis column
  categories: string[]; // Y-axis columns
}

export interface DashboardLayout {
  title: string;
  description: string;
  charts: ChartData[];
  summary: {
    totalRows: number;
    dateRange?: string;
    keyMetrics: Record<string, number>;
  };
}

/**
 * CSV verisinden dashboard layout oluşturur
 */
export function generateDashboardLayout(
  csvData: ParsedCSVData,
  chartType: 'line' | 'bar' | 'area' | 'donut' | 'pie' = 'line',
  customTitle?: string
): DashboardLayout {
  const dateColumn = detectDateColumn(csvData.headers);
  const numericColumns = detectNumericColumns(csvData);
  const categoryColumns = detectCategoryColumns(csvData);
  
  // Tarih sütununa göre sırala
  const sortedData = dateColumn ? sortByDate(csvData, dateColumn) : csvData;
  
  // Ana metrik sütununu bul
  const mainMetricColumn = numericColumns.find(col => 
    col.toLowerCase().includes('toplam') || 
    col.toLowerCase().includes('total') ||
    col.toLowerCase().includes('miktar') ||
    col.toLowerCase().includes('amount')
  ) || numericColumns[0];
  
  // Grafik data hazırla
  const charts: ChartData[] = [];
  
  // 1. Ana trend grafiği (Zaman serisi)
  if (dateColumn && mainMetricColumn) {
    // Ay bazında topla
    const monthlyData = aggregateByMonth(sortedData.rows, dateColumn, mainMetricColumn);
    
    charts.push({
      type: chartType === 'donut' || chartType === 'pie' ? 'line' : chartType,
      title: `${mainMetricColumn} - Aylık Trend`,
      data: monthlyData,
      index: 'month',
      categories: ['value'],
    });
  }
  
  // 2. Kategori bazlı analiz
  if (categoryColumns.length > 0 && mainMetricColumn) {
    const categoryColumn = categoryColumns[0];
    const categoryData = aggregateByCategory(sortedData.rows, categoryColumn, mainMetricColumn);
    
    charts.push({
      type: chartType === 'line' ? 'bar' : chartType,
      title: `${categoryColumn} Bazında ${mainMetricColumn}`,
      data: categoryData,
      index: 'category',
      categories: ['value'],
    });
  }
  
  // 3. Top 10 analizi (eğer müşteri/ürün sütunu varsa)
  const customerColumn = csvData.headers.find(h => 
    h.toLowerCase().includes('müşteri') || 
    h.toLowerCase().includes('customer') ||
    h.toLowerCase().includes('ürün') ||
    h.toLowerCase().includes('product')
  );
  
  if (customerColumn && mainMetricColumn) {
    const topData = getTopN(sortedData.rows, customerColumn, mainMetricColumn, 10);
    
    charts.push({
      type: 'bar',
      title: `En Yüksek ${mainMetricColumn} - Top 10`,
      data: topData,
      index: 'name',
      categories: ['value'],
    });
  }
  
  // Özet istatistikler
  const totalValue = sortedData.rows.reduce((sum, row) => {
    const val = row[mainMetricColumn || ''] || 0;
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);
  
  const avgValue = totalValue / sortedData.rowCount;
  
  const dateRange = dateColumn && sortedData.rows.length > 0
    ? `${sortedData.rows[0][dateColumn]} - ${sortedData.rows[sortedData.rows.length - 1][dateColumn]}`
    : undefined;
  
  return {
    title: customTitle || 'Dashboard Analizi',
    description: `${csvData.rowCount} satır veri analizi`,
    charts,
    summary: {
      totalRows: csvData.rowCount,
      dateRange,
      keyMetrics: {
        [`Toplam ${mainMetricColumn || 'Değer'}`]: Math.round(totalValue),
        [`Ortalama ${mainMetricColumn || 'Değer'}`]: Math.round(avgValue),
        'Kategori Sayısı': categoryColumns.length,
      },
    },
  };
}

/**
 * Ay bazında toplar
 */
function aggregateByMonth(rows: Record<string, any>[], dateColumn: string, valueColumn: string): any[] {
  const monthMap = new Map<string, number>();
  
  rows.forEach(row => {
    const date = new Date(row[dateColumn]);
    if (isNaN(date.getTime())) return;
    
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const value = row[valueColumn] || 0;
    
    monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + value);
  });
  
  return Array.from(monthMap.entries())
    .sort()
    .map(([month, value]) => ({
      month: month.substring(5) + '/' + month.substring(0, 4), // MM/YYYY
      value: Math.round(value),
    }));
}

/**
 * Kategori bazında toplar
 */
function aggregateByCategory(rows: Record<string, any>[], categoryColumn: string, valueColumn: string): any[] {
  const categoryMap = new Map<string, number>();
  
  rows.forEach(row => {
    const category = row[categoryColumn] || 'Diğer';
    const value = row[valueColumn] || 0;
    
    categoryMap.set(category, (categoryMap.get(category) || 0) + value);
  });
  
  return Array.from(categoryMap.entries())
    .map(([category, value]) => ({
      category,
      value: Math.round(value),
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * En yüksek N değeri getirir
 */
function getTopN(rows: Record<string, any>[], nameColumn: string, valueColumn: string, n: number): any[] {
  const nameMap = new Map<string, number>();
  
  rows.forEach(row => {
    const name = row[nameColumn] || 'Diğer';
    const value = row[valueColumn] || 0;
    
    nameMap.set(name, (nameMap.get(name) || 0) + value);
  });
  
  return Array.from(nameMap.entries())
    .map(([name, value]) => ({
      name,
      value: Math.round(value),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}
