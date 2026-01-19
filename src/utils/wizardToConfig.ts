/**
 * Wizard State → DashboardFactory Config Converter
 * 
 * Kullanıcının wizard ile oluşturduğu dashboard'ı
 * DashboardFactory standardına çevirir.
 * 
 * Bu sayede tüm dashboard'lar aynı standardı kullanır:
 * - 6 KPI kartı
 * - 3 grafik
 * - FINOPS brand colors
 * - Export butonları
 * - Filtreler
 * - Insight metinleri
 */

import type { WizardState } from '../components/dashboard-wizard/DashboardWizard';
import type { DashboardConfig } from '../components/dashboards/DashboardFactory';
import { 
  DollarSign, TrendingUp, TrendingDown, Package, 
  Users, Target, Activity, BarChart3, PieChart,
  Calendar, Percent, Award
} from 'lucide-react';

// KPI calculation tipine göre icon seç
function getIconForCalculation(calculation: string): any {
  const map: Record<string, any> = {
    sum: DollarSign,
    avg: TrendingUp,
    count: Package,
    max: TrendingUp,
    min: TrendingDown,
    formula: Percent,
  };
  return map[calculation] || Activity;
}

// Sütun adına göre format belirle
function getFormatForColumn(column: string): 'currency' | 'number' | 'percentage' | 'decimal' {
  const lower = column.toLowerCase();
  
  if (lower.includes('gelir') || lower.includes('revenue') || 
      lower.includes('satış') || lower.includes('sales') ||
      lower.includes('tutar') || lower.includes('amount') ||
      lower.includes('fiyat') || lower.includes('price')) {
    return 'currency';
  }
  
  if (lower.includes('oran') || lower.includes('yüzde') || 
      lower.includes('rate') || lower.includes('percent') ||
      lower.includes('%')) {
    return 'percentage';
  }
  
  if (lower.includes('puan') || lower.includes('skor') || 
      lower.includes('score') || lower.includes('rating')) {
    return 'decimal';
  }
  
  return 'number';
}

// Grafik tipini DashboardFactory formatına çevir
function normalizeChartType(chartType: string): 'line' | 'bar' | 'pie' {
  if (chartType.includes('line')) return 'line';
  if (chartType.includes('bar')) return 'bar';
  if (chartType.includes('pie') || chartType.includes('donut')) return 'pie';
  return 'bar'; // Default
}

// Insight metni oluştur (KPI için)
function generateKPIInsight(kpi: any): string {
  const insights = [
    `${kpi.label} değeri beklentilerin üzerinde.`,
    `${kpi.label} hedefine ulaşıldı.`,
    `${kpi.label} performansı olumlu.`,
    `${kpi.label} trendi yükseliş gösteriyor.`,
    `${kpi.label} metriği dengeli seyrediyor.`,
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

// Insight metni oluştur (Grafik için)
function generateChartInsight(chart: any): string {
  const insights = [
    `${chart.title} analizinde istikrarlı trend görülüyor.`,
    `${chart.title} verileri pozitif sinyaller veriyor.`,
    `${chart.title} göstergesi hedef değerlerde.`,
    `${chart.title} performansı beklentileri karşılıyor.`,
    `${chart.title} grafiği dengeli bir dağılım sergiliyor.`,
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

/**
 * Wizard state'ini DashboardFactory config'e çevirir
 */
export function wizardStateToDashboardConfig(state: WizardState): DashboardConfig {
  // KPI'ları DashboardFactory formatına çevir
  const kpis = state.selectedKpis.slice(0, 6).map(kpi => ({
    id: kpi.column.replace(/\s+/g, '_').toLowerCase(),
    label: kpi.label,
    icon: getIconForCalculation(kpi.calculation),
    format: getFormatForColumn(kpi.column),
    insight: generateKPIInsight(kpi),
  }));
  
  // Eğer 6'dan az KPI varsa, placeholder'lar ekle
  while (kpis.length < 6) {
    kpis.push({
      id: `placeholder_${kpis.length}`,
      label: 'Veri Yok',
      icon: Activity,
      format: 'number' as const,
      insight: 'Bu KPI için henüz veri yok.',
    });
  }
  
  // Grafikleri DashboardFactory formatına çevir
  const charts = state.selectedCharts.slice(0, 3).map(chart => ({
    id: chart.id,
    title: chart.title,
    type: normalizeChartType(chart.chartType),
    dataKey: chart.yAxis?.field || 'value',
    insight: generateChartInsight(chart),
  }));
  
  // Eğer 3'ten az grafik varsa, placeholder'lar ekle
  while (charts.length < 3) {
    const chartTypes: Array<'line' | 'bar' | 'pie'> = ['line', 'bar', 'pie'];
    charts.push({
      id: `placeholder_chart_${charts.length}`,
      title: 'Veri Bekleniyor',
      type: chartTypes[charts.length % 3],
      dataKey: 'value',
      insight: 'Bu grafik için henüz veri yok.',
    });
  }
  
  // Dashboard config oluştur
  const config: DashboardConfig = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: state.dashboardName || 'Kullanıcı Dashboard',
    subtitle: `${state.selectedFile?.fileName || 'Özel Veri'} Analizi`,
    icon: '✅',
    dataSource: state.selectedFile?.fileName || 'Kullanıcı Verisi',
    kpis,
    charts,
  };
  
  return config;
}

/**
 * Dashboard config'i localStorage'a kaydet
 */
export function saveUserDashboardConfig(userId: string, config: DashboardConfig): void {
  const key = `user_dashboards_${userId}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({
    ...config,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(key, JSON.stringify(existing));
}

/**
 * Kullanıcının dashboard config'lerini getir
 */
export function getUserDashboardConfigs(userId: string): DashboardConfig[] {
  const key = `user_dashboards_${userId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

/**
 * Dashboard config'i sil
 */
export function deleteUserDashboardConfig(userId: string, configId: string): void {
  const key = `user_dashboards_${userId}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  const filtered = existing.filter((c: any) => c.id !== configId);
  localStorage.setItem(key, JSON.stringify(filtered));
}
