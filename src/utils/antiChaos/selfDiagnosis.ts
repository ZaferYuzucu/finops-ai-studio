/**
 * 🔬 SELF-DIAGNOSIS & RISK ENGINE - Anti-Chaos Katmanı 5
 * 
 * Her dashboard için üret:
 * - confidenceScore
 * - riskFlags[]
 * - fallbackUsed
 * - blockedAssumptions[]
 * 
 * Kullanıcı görmez, admin panelinde görünür, loglanır.
 */

import { ShieldedCSVData, ColumnProfile } from './inputShield';
import { AssumptionKillerResult } from './assumptionKiller';
import { FinalDashboard } from './failSoftDashboard';

export interface DashboardDiagnosis {
  dashboardId: string;
  timestamp: string;
  confidenceScore: number; // 0-1 arası
  riskFlags: RiskFlag[];
  fallbackUsed: boolean;
  blockedAssumptions: string[];
  dataQuality: DataQualityMetrics;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RiskFlag {
  code: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  category: 'data' | 'inference' | 'rendering' | 'performance' | 'security';
  timestamp: string;
}

export interface DataQualityMetrics {
  totalRows: number;
  totalColumns: number;
  nullRatio: number; // 0-1 arası
  duplicateRows: number;
  columnConfidenceAvg: number; // 0-1 arası
  dataCompleteness: number; // 0-1 arası
}

/**
 * Dashboard diagnosis oluştur
 */
export function diagnoseDashboard(
  dashboard: FinalDashboard,
  data: ShieldedCSVData,
  columnProfiles: ColumnProfile[],
  assumptionResult: AssumptionKillerResult
): DashboardDiagnosis {
  const riskFlags: RiskFlag[] = [];
  const recommendations: string[] = [];
  
  // Confidence score analizi
  if (dashboard.confidenceScore < 0.5) {
    riskFlags.push({
      code: 'LOW_CONFIDENCE',
      severity: 'high',
      message: 'Dashboard güven skoru çok düşük',
      category: 'inference',
      timestamp: new Date().toISOString(),
    });
    recommendations.push('Veri kalitesini kontrol edin ve sütun tiplerini manuel olarak doğrulayın');
  }
  
  // Fallback kullanımı
  if (dashboard.fallbackUsed) {
    riskFlags.push({
      code: 'FALLBACK_USED',
      severity: 'medium',
      message: 'Dashboard fallback modda render edildi',
      category: 'rendering',
      timestamp: new Date().toISOString(),
    });
    recommendations.push('Bazı KPI veya chart\'lar yüksek güvenle oluşturulamadı');
  }
  
  // Blocked assumptions
  if (dashboard.blockedAssumptions.length > 0) {
    riskFlags.push({
      code: 'ASSUMPTIONS_BLOCKED',
      severity: 'medium',
      message: `${dashboard.blockedAssumptions.length} varsayım engellendi`,
      category: 'inference',
      timestamp: new Date().toISOString(),
    });
    recommendations.push('Kullanıcıdan manuel onay alınması gereken sütunlar var');
  }
  
  // Data quality metrics
  const dataQuality = calculateDataQuality(data, columnProfiles);
  
  // Null ratio risk
  if (dataQuality.nullRatio > 0.3) {
    riskFlags.push({
      code: 'HIGH_NULL_RATIO',
      severity: 'medium',
      message: `Verilerin %${(dataQuality.nullRatio * 100).toFixed(0)}'i boş`,
      category: 'data',
      timestamp: new Date().toISOString(),
    });
    recommendations.push('Eksik verileri tamamlamayı düşünün');
  }
  
  // Low column confidence
  if (dataQuality.columnConfidenceAvg < 0.7) {
    riskFlags.push({
      code: 'LOW_COLUMN_CONFIDENCE',
      severity: 'high',
      message: 'Sütun güven skorları düşük',
      category: 'data',
      timestamp: new Date().toISOString(),
    });
    recommendations.push('Sütun tiplerini manuel olarak kontrol edin');
  }
  
  // No KPIs
  if (dashboard.config.kpis.length === 0) {
    riskFlags.push({
      code: 'NO_KPIS',
      severity: 'critical',
      message: 'Hiç KPI oluşturulamadı',
      category: 'rendering',
      timestamp: new Date().toISOString(),
    });
    recommendations.push('Sayısal sütunların varlığını kontrol edin');
  }
  
  // No charts
  if (dashboard.config.charts.length === 0) {
    riskFlags.push({
      code: 'NO_CHARTS',
      severity: 'medium',
      message: 'Hiç chart oluşturulamadı',
      category: 'rendering',
      timestamp: new Date().toISOString(),
    });
    recommendations.push('Tarih sütunu eklemeyi düşünün');
  }
  
  // Severity calculation
  const hasCritical = riskFlags.some(f => f.severity === 'critical');
  const hasHigh = riskFlags.some(f => f.severity === 'high');
  const hasMedium = riskFlags.some(f => f.severity === 'medium');
  
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  if (hasCritical) {
    severity = 'critical';
  } else if (hasHigh) {
    severity = 'high';
  } else if (hasMedium) {
    severity = 'medium';
  }
  
  return {
    dashboardId: dashboard.config.id,
    timestamp: new Date().toISOString(),
    confidenceScore: dashboard.confidenceScore,
    riskFlags,
    fallbackUsed: dashboard.fallbackUsed,
    blockedAssumptions: dashboard.blockedAssumptions,
    dataQuality,
    recommendations,
    severity,
  };
}

/**
 * Data quality metrics hesapla
 */
function calculateDataQuality(
  data: ShieldedCSVData,
  columnProfiles: ColumnProfile[]
): DataQualityMetrics {
  const totalRows = data.rowCount;
  const totalColumns = data.columnCount;
  
  // Null ratio
  let totalNulls = 0;
  let totalCells = 0;
  
  columnProfiles.forEach(profile => {
    totalNulls += profile.nullCount;
    totalCells += totalRows;
  });
  
  const nullRatio = totalCells > 0 ? totalNulls / totalCells : 0;
  
  // Duplicate rows
  const rowStrings = data.rows.map(r => JSON.stringify(r));
  const uniqueRows = new Set(rowStrings);
  const duplicateRows = totalRows - uniqueRows.size;
  
  // Column confidence average
  const columnConfidenceAvg = columnProfiles.length > 0
    ? columnProfiles.reduce((sum, p) => sum + p.confidenceScore, 0) / columnProfiles.length
    : 0;
  
  // Data completeness (1 - null ratio)
  const dataCompleteness = 1 - nullRatio;
  
  return {
    totalRows,
    totalColumns,
    nullRatio,
    duplicateRows,
    columnConfidenceAvg,
    dataCompleteness,
  };
}

/**
 * Diagnosis'u logla (admin için)
 */
export function logDiagnosis(diagnosis: DashboardDiagnosis) {
  console.group(`🔬 [Self-Diagnosis] Dashboard: ${diagnosis.dashboardId}`);
  console.log('Confidence Score:', (diagnosis.confidenceScore * 100).toFixed(0) + '%');
  console.log('Severity:', diagnosis.severity.toUpperCase());
  console.log('Risk Flags:', diagnosis.riskFlags.length);
  console.log('Fallback Used:', diagnosis.fallbackUsed);
  console.log('Blocked Assumptions:', diagnosis.blockedAssumptions.length);
  
  if (diagnosis.riskFlags.length > 0) {
    console.group('Risk Flags:');
    diagnosis.riskFlags.forEach(flag => {
      console.log(`[${flag.severity.toUpperCase()}] ${flag.code}: ${flag.message}`);
    });
    console.groupEnd();
  }
  
  if (diagnosis.recommendations.length > 0) {
    console.group('Recommendations:');
    diagnosis.recommendations.forEach(rec => {
      console.log(`💡 ${rec}`);
    });
    console.groupEnd();
  }
  
  console.group('Data Quality:');
  console.log('Null Ratio:', (diagnosis.dataQuality.nullRatio * 100).toFixed(1) + '%');
  console.log('Completeness:', (diagnosis.dataQuality.dataCompleteness * 100).toFixed(1) + '%');
  console.log('Column Confidence Avg:', (diagnosis.dataQuality.columnConfidenceAvg * 100).toFixed(0) + '%');
  console.groupEnd();
  
  console.groupEnd();
}

/**
 * Diagnosis'u Firestore'a kaydet (admin paneli için)
 */
export async function saveDiagnosisToFirestore(
  diagnosis: DashboardDiagnosis,
  userId: string
): Promise<void> {
  // Firestore entegrasyonu burada yapılacak
  // Şimdilik sadece loglama yapıyoruz
  logDiagnosis(diagnosis);
  
  // TODO: Firestore'a kaydet
  // await setDoc(doc(db, 'users', userId, 'dashboardDiagnostics', diagnosis.dashboardId), diagnosis);
}
