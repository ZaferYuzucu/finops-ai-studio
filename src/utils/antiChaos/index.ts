/**
 * 🛡️ ANTI-CHAOS SYSTEM - Master Export
 * 
 * Tüm anti-chaos katmanlarını tek yerden export et
 */

// Input Shield
export * from './inputShield';

// Assumption Killer
export * from './assumptionKiller';

// User Dignity Guard
export * from './userDignityGuard';

// Fail-Soft Dashboard Engine
export * from './failSoftDashboard';

// Self-Diagnosis & Risk Engine
export * from './selfDiagnosis';

/**
 * 🎯 ANTI-CHAOS PIPELINE
 * 
 * Tüm katmanları sırayla çalıştıran master fonksiyon
 */
import { parseCSVSafe, ShieldedCSVData, ColumnProfile } from './inputShield';
import { inferNumericColumns, AssumptionKillerResult } from './assumptionKiller';
import { translateError, UserFriendlyError } from './userDignityGuard';
import {
  stage1_DataDiscovery,
  stage2_DraftKPIs,
  stage3_FinalDashboard,
  createFallbackDashboard,
  FinalDashboard,
} from './failSoftDashboard';
import { diagnoseDashboard, DashboardDiagnosis, logDiagnosis } from './selfDiagnosis';
import { logLowConfidence, logAssumptionBlocked, logCSVParseWarning } from '../diagnostics/eventLogger';

export interface AntiChaosPipelineResult {
  success: boolean;
  data?: ShieldedCSVData;
  columnProfiles?: ColumnProfile[];
  assumptionResult?: AssumptionKillerResult;
  dashboard?: FinalDashboard;
  diagnosis?: DashboardDiagnosis;
  error?: UserFriendlyError;
  warnings: string[];
}

/**
 * Master pipeline: CSV'den dashboard'a kadar tüm süreç
 */
export async function runAntiChaosPipeline(
  file: File | string
): Promise<AntiChaosPipelineResult> {
  const warnings: string[] = [];
  
  try {
    // Stage 1: Input Shield - Güvenli parse
    const parseResult = await parseCSVSafe(file);
    warnings.push(...parseResult.warnings);
    
    if (parseResult.errors.length > 0) {
      throw new Error(parseResult.errors.join(', '));
    }
    
    // Stage 2: Assumption Killer - Numeric inference
    const assumptionResult = inferNumericColumns(
      parseResult.columnProfiles,
      parseResult.data
    );
    
    if (assumptionResult.blockedAssumptions.length > 0) {
      warnings.push(...assumptionResult.blockedAssumptions);
    }
    
    // Stage 3: Fail-Soft Dashboard Engine
    // 3.1: Data Discovery
    const discovery = stage1_DataDiscovery(parseResult.data, parseResult.columnProfiles);
    if (!discovery.renderable) {
      return {
        success: false,
        error: translateError('Veri keşfi aşaması başarısız'),
        warnings,
      };
    }
    
    // 3.2: Draft KPIs
    const draft = stage2_DraftKPIs(
      parseResult.data,
      parseResult.columnProfiles,
      assumptionResult
    );
    
    if (!draft.canRender) {
      // Fallback dashboard kullan
      const fallbackDashboard = createFallbackDashboard();
      const diagnosis = diagnoseDashboard(
        fallbackDashboard,
        parseResult.data,
        parseResult.columnProfiles,
        assumptionResult
      );
      
      logDiagnosis(diagnosis);
      
      return {
        success: true,
        data: parseResult.data,
        columnProfiles: parseResult.columnProfiles,
        assumptionResult,
        dashboard: fallbackDashboard,
        diagnosis,
        warnings,
      };
    }
    
    // 3.3: Final Dashboard
    const finalDashboard = stage3_FinalDashboard(draft, assumptionResult);
    
    // Stage 4: Self-Diagnosis
    const diagnosis = diagnoseDashboard(
      finalDashboard,
      parseResult.data,
      parseResult.columnProfiles,
      assumptionResult
    );
    
    logDiagnosis(diagnosis);
    
    // 🛡️ Diagnostics: Low confidence log (sessiz)
    if (diagnosis.confidenceScore < 0.8) {
      logLowConfidence(
        undefined, // userId (CSV parse sırasında henüz yok)
        undefined, // email
        finalDashboard.config.id,
        diagnosis.confidenceScore,
        diagnosis.riskFlags
      ).catch(() => {}); // Sessizce atla, UI etkilenmez
    }
    
    // 🛡️ Diagnostics: Blocked assumptions log
    if (assumptionResult.blockedAssumptions.length > 0) {
      logAssumptionBlocked(
        undefined,
        undefined,
        undefined,
        assumptionResult.blockedAssumptions
      ).catch(() => {}); // Sessizce atla
    }
    
    // 🛡️ Diagnostics: CSV parse warnings log
    if (parseResult.warnings.length > 0) {
      logCSVParseWarning(
        undefined,
        undefined,
        undefined,
        parseResult.warnings,
        parseResult.data.metadata.confidenceScore
      ).catch(() => {}); // Sessizce atla
    }
    
    return {
      success: true,
      data: parseResult.data,
      columnProfiles: parseResult.columnProfiles,
      assumptionResult,
      dashboard: finalDashboard,
      diagnosis,
      warnings,
    };
    
  } catch (error) {
    const friendlyError = translateError(error instanceof Error ? error : String(error));
    
    return {
      success: false,
      error: friendlyError,
      warnings,
    };
  }
}
