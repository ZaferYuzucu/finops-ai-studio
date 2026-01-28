/**
 * 🛡️ Dashboard Diagnosis Helper
 * 
 * Anti-Chaos diagnosis bilgisini dashboard config'e bağlar
 * Sessiz, bilgilendirici katman
 */

import { DashboardConfig } from '../components/dashboards/DashboardFactory';
import { DashboardDiagnosis } from './antiChaos/selfDiagnosis';

/**
 * Diagnosis bilgisini dashboard config'e ekle
 * Mevcut config'i bozmadan sadece diagnosis ekler
 */
export function attachDiagnosisToConfig(
  config: DashboardConfig,
  diagnosis?: DashboardDiagnosis | null
): DashboardConfig {
  if (!diagnosis) {
    return config; // Diagnosis yoksa config'i olduğu gibi döndür
  }

  return {
    ...config,
    diagnosis: {
      confidenceScore: diagnosis.confidenceScore,
      riskFlags: diagnosis.riskFlags.map(flag => ({
        code: flag.code,
        severity: flag.severity,
        message: flag.message,
      })),
      blockedAssumptions: diagnosis.blockedAssumptions,
    },
  };
}

/**
 * Mock diagnosis oluştur (test için)
 */
export function createMockDiagnosis(
  confidenceScore: number,
  riskCount: number = 0
): DashboardDiagnosis {
  const riskFlags = Array.from({ length: riskCount }, (_, i) => ({
    code: `RISK_${i + 1}`,
    severity: (['low', 'medium', 'high'] as const)[i % 3],
    message: `Risk ${i + 1} açıklaması`,
    category: 'data' as const,
    timestamp: new Date().toISOString(),
  }));

  return {
    dashboardId: 'mock',
    timestamp: new Date().toISOString(),
    confidenceScore,
    riskFlags,
    fallbackUsed: false,
    blockedAssumptions: riskCount > 0 ? [`Varsayım ${riskCount}`] : [],
    dataQuality: {
      totalRows: 100,
      totalColumns: 5,
      nullRatio: 0.1,
      duplicateRows: 0,
      columnConfidenceAvg: confidenceScore,
      dataCompleteness: 0.9,
    },
    recommendations: [],
    severity: riskCount > 0 ? 'medium' : 'low',
  };
}
