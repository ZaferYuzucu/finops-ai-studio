/**
 * 🛡️ FAIL-SOFT DASHBOARD ENGINE - Anti-Chaos Katmanı 4
 * 
 * Dashboard üretimi 3 aşamalı:
 * 1) Veri keşfi (column profiler)
 * 2) Taslak KPI önerileri
 * 3) Final dashboard
 * 
 * Her aşama render edilebilir olmalı.
 * Her aşamada fallback UI zorunlu.
 */

import { ShieldedCSVData, ColumnProfile } from './inputShield';
import { AssumptionKillerResult } from './assumptionKiller';

export interface DashboardStage {
  stage: 'discovery' | 'draft' | 'final';
  renderable: boolean;
  data?: any;
  fallbackUsed: boolean;
  fallbackReason?: string;
}

export interface KPIDraft {
  id: string;
  label: string;
  column: string;
  calculation: 'sum' | 'avg' | 'count' | 'min' | 'max';
  format: 'currency' | 'number' | 'percentage' | 'decimal';
  confidence: number;
  riskFlags: string[];
  canRender: boolean;
}

export interface ChartDraft {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie';
  dataKey: string;
  categoryKey?: string;
  confidence: number;
  riskFlags: string[];
  canRender: boolean;
}

export interface DashboardDraft {
  stage: 'draft';
  kpis: KPIDraft[];
  charts: ChartDraft[];
  confidenceScore: number;
  canRender: boolean;
  warnings: string[];
}

export interface FinalDashboard {
  stage: 'final';
  config: any; // DashboardConfig formatında
  confidenceScore: number;
  riskFlags: string[];
  blockedAssumptions: string[];
  fallbackUsed: boolean;
  canRender: boolean;
}

/**
 * Stage 1: Veri keşfi
 */
export function stage1_DataDiscovery(
  data: ShieldedCSVData,
  columnProfiles: ColumnProfile[]
): DashboardStage {
  const hasData = data.rows.length > 0;
  const hasHeaders = data.headers.length > 0;
  const hasProfiles = columnProfiles.length > 0;
  
  const renderable = hasData && hasHeaders && hasProfiles;
  
  return {
    stage: 'discovery',
    renderable,
    data: {
      rowCount: data.rowCount,
      columnCount: data.columnCount,
      columns: columnProfiles.map(p => ({
        name: p.columnName,
        type: p.detectedType,
        confidence: p.confidenceScore,
      })),
    },
    fallbackUsed: !renderable,
    fallbackReason: !hasData ? 'Veri bulunamadı' : !hasHeaders ? 'Başlık satırı bulunamadı' : 'Sütun profilleri oluşturulamadı',
  };
}

/**
 * Stage 2: Taslak KPI önerileri
 */
export function stage2_DraftKPIs(
  data: ShieldedCSVData,
  columnProfiles: ColumnProfile[],
  assumptionResult: AssumptionKillerResult
): DashboardDraft {
  const kpis: KPIDraft[] = [];
  const charts: ChartDraft[] = [];
  const warnings: string[] = [];
  
  // Numeric sütunlardan KPI oluştur
  const numericColumns = columnProfiles.filter(
    p => p.detectedType === 'numeric' && p.confidenceScore >= 0.8
  );
  
  if (numericColumns.length === 0) {
    warnings.push('Sayısal sütun bulunamadı. KPI\'lar oluşturulamayabilir.');
  }
  
  numericColumns.forEach((profile, index) => {
    // KPI oluştur
    const kpi: KPIDraft = {
      id: `kpi_${index}`,
      label: profile.columnName,
      column: profile.columnName,
      calculation: inferCalculation(profile, data),
      format: inferFormat(profile),
      confidence: profile.confidenceScore,
      riskFlags: profile.riskFlags,
      canRender: profile.confidenceScore >= 0.7,
    };
    
    kpis.push(kpi);
    
    // Chart oluştur (eğer tarih sütunu varsa)
    const dateColumn = columnProfiles.find(p => p.detectedType === 'date');
    if (dateColumn) {
      const chart: ChartDraft = {
        id: `chart_${index}`,
        title: `${profile.columnName} Trendi`,
        type: 'line',
        dataKey: profile.columnName,
        categoryKey: dateColumn.columnName,
        confidence: Math.min(profile.confidenceScore, dateColumn.confidenceScore),
        riskFlags: [...profile.riskFlags, ...dateColumn.riskFlags],
        canRender: profile.confidenceScore >= 0.7 && dateColumn.confidenceScore >= 0.7,
      };
      
      charts.push(chart);
    }
  });
  
  // Genel güven skoru
  const avgConfidence = kpis.length > 0
    ? kpis.reduce((sum, kpi) => sum + kpi.confidence, 0) / kpis.length
    : 0;
  
  const canRender = kpis.some(kpi => kpi.canRender) || charts.some(chart => chart.canRender);
  
  return {
    stage: 'draft',
    kpis,
    charts,
    confidenceScore: avgConfidence,
    canRender,
    warnings,
  };
}

/**
 * Stage 3: Final dashboard
 */
export function stage3_FinalDashboard(
  draft: DashboardDraft,
  assumptionResult: AssumptionKillerResult
): FinalDashboard {
  // Sadece yüksek güvenli KPI ve chart'ları dahil et
  const safeKPIs = draft.kpis.filter(kpi => kpi.canRender && kpi.confidence >= 0.7);
  const safeCharts = draft.charts.filter(chart => chart.canRender && chart.confidence >= 0.7);
  
  const fallbackUsed = safeKPIs.length < draft.kpis.length || safeCharts.length < draft.charts.length;
  
  const riskFlags: string[] = [];
  if (safeKPIs.length === 0) {
    riskFlags.push('no_kpis');
  }
  if (safeCharts.length === 0) {
    riskFlags.push('no_charts');
  }
  if (draft.confidenceScore < 0.7) {
    riskFlags.push('low_confidence');
  }
  
  const config = {
    id: `dashboard_${Date.now()}`,
    title: 'Finansal Dashboard',
    subtitle: 'Veri analizi',
    icon: '📊',
    kpis: safeKPIs.map(kpi => ({
      id: kpi.id,
      label: kpi.label,
      icon: 'DollarSign',
      format: kpi.format,
      insight: generateInsight(kpi),
    })),
    charts: safeCharts.map(chart => ({
      id: chart.id,
      title: chart.title,
      type: chart.type,
      dataKey: chart.dataKey,
      insight: generateChartInsight(chart),
    })),
  };
  
  return {
    stage: 'final',
    config,
    confidenceScore: draft.confidenceScore,
    riskFlags,
    blockedAssumptions: assumptionResult.blockedAssumptions,
    fallbackUsed,
    canRender: safeKPIs.length > 0 || safeCharts.length > 0,
  };
}

/**
 * Calculation inference
 */
function inferCalculation(profile: ColumnProfile, data: ShieldedCSVData): 'sum' | 'avg' | 'count' | 'min' | 'max' {
  const columnName = profile.columnName.toLowerCase();
  
  // Eğer sütun adında "toplam", "sum", "total" varsa sum
  if (columnName.includes('toplam') || columnName.includes('sum') || columnName.includes('total')) {
    return 'sum';
  }
  
  // Eğer sütun adında "ortalama", "avg", "average" varsa avg
  if (columnName.includes('ortalama') || columnName.includes('avg') || columnName.includes('average')) {
    return 'avg';
  }
  
  // Varsayılan: sum (finansal veriler için en yaygın)
  return 'sum';
}

/**
 * Format inference
 */
function inferFormat(profile: ColumnProfile): 'currency' | 'number' | 'percentage' | 'decimal' {
  const columnName = profile.columnName.toLowerCase();
  
  if (columnName.includes('yüzde') || columnName.includes('percent') || columnName.includes('oran')) {
    return 'percentage';
  }
  
  if (columnName.includes('tutar') || columnName.includes('fiyat') || columnName.includes('price') ||
      columnName.includes('gelir') || columnName.includes('revenue') || columnName.includes('ciro') ||
      columnName.includes('gider') || columnName.includes('expense') || columnName.includes('cost')) {
    return 'currency';
  }
  
  // Sample değerlere bak
  const hasDecimals = profile.sampleValues.some(v => {
    const num = typeof v === 'number' ? v : Number(String(v));
    return !isNaN(num) && !Number.isInteger(num);
  });
  
  return hasDecimals ? 'decimal' : 'number';
}

/**
 * Insight generation
 */
function generateInsight(kpi: KPIDraft): string {
  const format = kpi.format === 'currency' ? 'finansal' : kpi.format === 'percentage' ? 'yüzdesel' : 'sayısal';
  return `${kpi.label} için ${format} analiz`;
}

function generateChartInsight(chart: ChartDraft): string {
  return `${chart.title} grafiği - veri trendi görüntüleniyor`;
}

/**
 * Fallback UI için minimal dashboard config
 */
export function createFallbackDashboard(): FinalDashboard {
  return {
    stage: 'final',
    config: {
      id: 'fallback_dashboard',
      title: 'Dashboard Hazırlanıyor',
      subtitle: 'Verileriniz analiz ediliyor...',
      icon: '⏳',
      kpis: [{
        id: 'kpi_placeholder',
        label: 'Veri Yükleniyor',
        icon: 'Activity',
        format: 'number',
        insight: 'Lütfen bekleyin',
      }],
      charts: [],
    },
    confidenceScore: 0,
    riskFlags: ['fallback_mode'],
    blockedAssumptions: ['Veri analizi tamamlanamadı'],
    fallbackUsed: true,
    canRender: true,
  };
}
