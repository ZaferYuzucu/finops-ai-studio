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
    keyMetrics: Record<string, number | string>;  // ← String values için (formatted)
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
  
  // 2. Kategori bazlı analiz (Area Chart - Gradient)
  if (categoryColumns.length > 0 && mainMetricColumn) {
    const categoryColumn = categoryColumns[0];
    const categoryData = aggregateByCategory(sortedData.rows, categoryColumn, mainMetricColumn);
    
    charts.push({
      type: 'bar',  // Bar chart - renkli barlar
      title: `${categoryColumn} Bazında Satış Dağılımı`,
      data: categoryData,
      index: 'category',
      categories: ['value'],
    });
  }
  
  // 3. Bölgesel Dağılım (Donut Chart)
  const regionColumn = csvData.headers.find(h => 
    h.toLowerCase().includes('bölge') || 
    h.toLowerCase().includes('region') ||
    h.toLowerCase().includes('şehir') ||
    h.toLowerCase().includes('city')
  );
  
  if (regionColumn && mainMetricColumn) {
    const regionData = aggregateByCategory(sortedData.rows, regionColumn, mainMetricColumn);
    
    charts.push({
      type: 'donut',
      title: `${regionColumn} Bazında Dağılım`,
      data: regionData.slice(0, 8),  // İlk 8 bölge
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
  
  // AKILLI KPI HESAPLAMA (GENİŞLETİLMİŞ - 6 KPI)
  const totalValue = sortedData.rows.reduce((sum, row) => {
    const val = row[mainMetricColumn || ''] || 0;
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);
  
  const avgValue = totalValue / sortedData.rowCount;
  const maxValue = Math.max(...sortedData.rows.map(row => row[mainMetricColumn || ''] || 0));
  const minValue = Math.min(...sortedData.rows.map(row => row[mainMetricColumn || ''] || 0).filter(v => v > 0));
  
  // Birimi tahmin et
  const unit = mainMetricColumn?.toLowerCase().includes('toplam') || mainMetricColumn?.toLowerCase().includes('total') 
    ? ' TL' 
    : mainMetricColumn?.toLowerCase().includes('miktar') || mainMetricColumn?.toLowerCase().includes('amount')
    ? ' Adet'
    : '';
  
  // 6 ADET İŞ ODAKLI KPI
  const keyMetrics: Record<string, number | string> = {};
  
  // 1. Toplam Ciro/Satış
  if (mainMetricColumn) {
    const metricName = mainMetricColumn.includes('Toplam') || mainMetricColumn.includes('Total') 
      ? '💰 Toplam Ciro'
      : `📊 Toplam ${mainMetricColumn}`;
    keyMetrics[metricName] = `${Math.round(totalValue).toLocaleString('tr-TR')}${unit}`;
  }
  
  // 2. Ortalama Sipariş Değeri
  if (avgValue > 0) {
    keyMetrics['📈 Ortalama Sipariş'] = `${Math.round(avgValue).toLocaleString('tr-TR')}${unit}`;
  }
  
  // 3. Toplam Sipariş Sayısı
  keyMetrics['📦 Sipariş Sayısı'] = `${sortedData.rowCount} adet`;
  
  // 4. En Yüksek Sipariş
  if (maxValue > 0) {
    keyMetrics['🚀 En Yüksek Sipariş'] = `${Math.round(maxValue).toLocaleString('tr-TR')}${unit}`;
  }
  
  // 5. En Düşük Sipariş
  if (minValue > 0 && minValue < Infinity) {
    keyMetrics['📉 En Düşük Sipariş'] = `${Math.round(minValue).toLocaleString('tr-TR')}${unit}`;
  }
  
  // 6. En Çok Satan Kategori
  if (categoryColumns.length > 0 && mainMetricColumn) {
    const categoryColumn = categoryColumns[0];
    const categoryTotals = new Map<string, number>();
    sortedData.rows.forEach(row => {
      const cat = row[categoryColumn] || 'Diğer';
      const val = row[mainMetricColumn || ''] || 0;
      categoryTotals.set(cat, (categoryTotals.get(cat) || 0) + val);
    });
    const topCategory = Array.from(categoryTotals.entries())
      .sort((a, b) => b[1] - a[1])[0];
    if (topCategory) {
      keyMetrics['🌟 En Popüler'] = `${topCategory[0]}`;
    }
  }
  
  return {
    title: customTitle || 'Dashboard Analizi',
    description: `${csvData.rowCount} satır veri analizi - ${dateColumn ? 'Zaman serisi dahil' : 'Kategori bazlı'}`,
    charts,
    summary: {
      totalRows: csvData.rowCount,
      dateRange: dateColumn && sortedData.rows.length > 0
        ? `${sortedData.rows[0][dateColumn]} - ${sortedData.rows[sortedData.rows.length - 1][dateColumn]}`
        : undefined,
      keyMetrics,
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
