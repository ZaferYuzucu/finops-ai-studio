/**
 * 🔪 ASSUMPTION KILLER - Anti-Chaos Katmanı 2
 * 
 * "Bu numeric" gibi varsayım YAPMA.
 * Her numeric sütun için confidence score ve sample values döndür.
 * confidenceScore < 0.8 ise kullanıcıya seçenek sun.
 */

import { ColumnProfile } from './inputShield';

export interface NumericInference {
  columnName: string;
  isNumeric: boolean;
  confidenceScore: number; // 0-1 arası
  sampleValues: (number | string)[];
  detectedFormat: 'integer' | 'decimal' | 'currency' | 'percentage' | 'unknown';
  locale: 'tr' | 'en' | 'auto';
  riskFlags: string[];
  userConfirmationRequired: boolean;
}

export interface AssumptionKillerResult {
  inferences: NumericInference[];
  blockedAssumptions: string[];
  requiresUserInput: boolean;
  safeToProceed: boolean;
}

/**
 * Numeric inference - varsayım yapmadan analiz
 */
export function inferNumericColumns(
  columnProfiles: ColumnProfile[],
  data: { headers: string[]; rows: Record<string, any>[] }
): AssumptionKillerResult {
  const inferences: NumericInference[] = [];
  const blockedAssumptions: string[] = [];
  let requiresUserInput = false;
  
  columnProfiles.forEach(profile => {
    const columnData = data.rows.map(r => r[profile.columnName]);
    
    // Eğer confidence score düşükse, varsayım yapma
    if (profile.detectedType === 'numeric' && profile.confidenceScore < 0.8) {
      blockedAssumptions.push(
        `"${profile.columnName}" sütunu numeric olarak işaretlendi ancak güven skoru düşük (${(profile.confidenceScore * 100).toFixed(0)}%)`
      );
    }
    
    // Numeric inference oluştur
    const inference: NumericInference = {
      columnName: profile.columnName,
      isNumeric: profile.detectedType === 'numeric' && profile.confidenceScore >= 0.8,
      confidenceScore: profile.confidenceScore,
      sampleValues: profile.sampleValues.slice(0, 5),
      detectedFormat: inferFormat(columnData, profile),
      locale: 'auto', // Input Shield'dan gelecek
      riskFlags: profile.riskFlags,
      userConfirmationRequired: profile.confidenceScore < 0.8 || profile.riskFlags.includes('ambiguous_numeric'),
    };
    
    if (inference.userConfirmationRequired) {
      requiresUserInput = true;
    }
    
    inferences.push(inference);
  });
  
  // Eğer hiç numeric sütun bulunamazsa, kullanıcıya sor
  const hasHighConfidenceNumeric = inferences.some(i => i.isNumeric && i.confidenceScore >= 0.8);
  if (!hasHighConfidenceNumeric && inferences.length > 0) {
    blockedAssumptions.push('Hiçbir sütun yüksek güvenle numeric olarak tespit edilemedi');
    requiresUserInput = true;
  }
  
  return {
    inferences,
    blockedAssumptions,
    requiresUserInput,
    safeToProceed: !requiresUserInput && blockedAssumptions.length === 0,
  };
}

/**
 * Format inference (integer, decimal, currency, percentage)
 */
function inferFormat(columnData: any[], profile: ColumnProfile): 'integer' | 'decimal' | 'currency' | 'percentage' | 'unknown' {
  if (profile.detectedType !== 'numeric') {
    return 'unknown';
  }
  
  const sample = columnData.slice(0, 20).filter(v => v !== null && v !== undefined);
  const columnNameLower = profile.columnName.toLowerCase();
  
  // Percentage detection
  if (columnNameLower.includes('yüzde') || columnNameLower.includes('percent') || columnNameLower.includes('oran')) {
    return 'percentage';
  }
  
  // Currency detection
  if (columnNameLower.includes('tutar') || columnNameLower.includes('fiyat') || columnNameLower.includes('price') || 
      columnNameLower.includes('gelir') || columnNameLower.includes('revenue') || columnNameLower.includes('ciro')) {
    return 'currency';
  }
  
  // Check if all values are integers
  const allIntegers = sample.every(v => {
    const num = typeof v === 'number' ? v : Number(String(v).replace(/[^\d.-]/g, ''));
    return !isNaN(num) && Number.isInteger(num);
  });
  
  if (allIntegers) {
    return 'integer';
  }
  
  // Check if any value has decimal part
  const hasDecimals = sample.some(v => {
    const num = typeof v === 'number' ? v : Number(String(v).replace(/[^\d.-]/g, ''));
    return !isNaN(num) && !Number.isInteger(num);
  });
  
  if (hasDecimals) {
    return 'decimal';
  }
  
  return 'unknown';
}

/**
 * Kullanıcıya numeric sütun seçimi için UI verisi
 */
export function generateNumericSelectionUI(
  result: AssumptionKillerResult
): Array<{
  columnName: string;
  suggestion: 'numeric' | 'text' | 'date' | 'unknown';
  confidence: number;
  message: string;
  options: Array<{ value: string; label: string; recommended?: boolean }>;
}> {
  return result.inferences
    .filter(i => i.userConfirmationRequired)
    .map(inference => {
      const suggestion = inference.isNumeric ? 'numeric' : 'text';
      const confidencePercent = Math.round(inference.confidenceScore * 100);
      
      let message = '';
      if (inference.confidenceScore < 0.5) {
        message = `"${inference.columnName}" sütunu belirsiz görünüyor (${confidencePercent}% güven). Nasıl işlemek istersiniz?`;
      } else if (inference.confidenceScore < 0.8) {
        message = `"${inference.columnName}" sütunu ${suggestion === 'numeric' ? 'sayısal' : 'metin'} gibi görünüyor (${confidencePercent}% güven). Doğru mu?`;
      } else {
        message = `"${inference.columnName}" sütunu ${suggestion === 'numeric' ? 'sayısal' : 'metin'} olarak tespit edildi.`;
      }
      
      return {
        columnName: inference.columnName,
        suggestion,
        confidence: inference.confidenceScore,
        message,
        options: [
          { value: 'numeric', label: 'Sayısal (Numeric)', recommended: suggestion === 'numeric' },
          { value: 'text', label: 'Metin (Text)', recommended: suggestion === 'text' },
          { value: 'date', label: 'Tarih (Date)', recommended: false },
          { value: 'skip', label: 'Atla (Skip)', recommended: false },
        ],
      };
    });
}
