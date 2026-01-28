/**
 * 🛡️ INPUT SHIELD - Anti-Chaos Katmanı 1
 * 
 * CSV/Excel dosyaları GÜVENSİZ kabul edilir ve güvenli şekilde işlenir.
 * 
 * Özellikler:
 * - UTF-8 BOM temizleme
 * - Delimiter auto-detect (',', ';', '\t')
 * - Locale-aware decimal detection (1.234,56 / 1,234.56)
 * - Sheet'li Excel'lerde sheet seçimi zorunlu
 * - Numeric inference %100 emin değilse "belirsiz" olarak işaretle
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ShieldedCSVData {
  headers: string[];
  rows: Record<string, any>[];
  rowCount: number;
  columnCount: number;
  metadata: {
    delimiter: string;
    locale: 'tr' | 'en' | 'auto';
    decimalSeparator: ',' | '.';
    thousandsSeparator: ',' | '.';
    bomRemoved: boolean;
    encoding: string;
    confidenceScore: number; // 0-1 arası güven skoru
  };
}

export interface ColumnProfile {
  columnName: string;
  detectedType: 'numeric' | 'date' | 'text' | 'boolean' | 'unknown';
  confidenceScore: number; // 0-1 arası
  sampleValues: any[];
  nullCount: number;
  uniqueCount: number;
  riskFlags: string[];
}

export interface ShieldedParseResult {
  data: ShieldedCSVData;
  columnProfiles: ColumnProfile[];
  warnings: string[];
  errors: string[];
}

/**
 * Delimiter otomatik tespit
 */
function detectDelimiter(content: string): string {
  const delimiters = [',', ';', '\t', '|'];
  const sample = content.substring(0, Math.min(1000, content.length));
  
  const scores = delimiters.map(delim => {
    const lines = sample.split('\n').slice(0, 5);
    const counts = lines.map(line => (line.match(new RegExp(`\\${delim}`, 'g')) || []).length);
    const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
    const variance = counts.reduce((sum, count) => sum + Math.pow(count - avg, 2), 0) / counts.length;
    return { delim, score: avg, consistency: 1 / (1 + variance) };
  });
  
  // En yüksek skorlu ve tutarlı delimiter'ı seç
  scores.sort((a, b) => (b.score * b.consistency) - (a.score * a.consistency));
  return scores[0]?.delim || ',';
}

/**
 * Locale-aware decimal separator tespit
 */
function detectDecimalSeparator(columnValues: any[]): { decimal: ',' | '.'; thousands: ',' | '.'; confidence: number } {
  const numericStrings = columnValues
    .filter(v => v !== null && v !== undefined && typeof v === 'string')
    .map(v => String(v).trim())
    .filter(v => /[\d,.]/.test(v));
  
  if (numericStrings.length === 0) {
    return { decimal: '.', thousands: ',', confidence: 0 };
  }
  
  // TR format: 1.234,56 (nokta binlik, virgül ondalık)
  // EN format: 1,234.56 (virgül binlik, nokta ondalık)
  
  let trScore = 0;
  let enScore = 0;
  
  numericStrings.forEach(str => {
    // TR pattern: son virgülden sonra 1-2 rakam
    if (/^\d{1,3}(\.\d{3})*,\d{1,2}$/.test(str)) {
      trScore++;
    }
    // EN pattern: son noktadan sonra 1-2 rakam
    if (/^\d{1,3}(,\d{3})*\.\d{1,2}$/.test(str)) {
      enScore++;
    }
  });
  
  const total = trScore + enScore;
  if (total === 0) {
    return { decimal: '.', thousands: ',', confidence: 0 };
  }
  
  if (trScore > enScore) {
    return { decimal: ',', thousands: '.', confidence: trScore / total };
  } else {
    return { decimal: '.', thousands: ',', confidence: enScore / total };
  }
}

/**
 * UTF-8 BOM temizleme
 */
function removeBOM(content: string): { cleaned: string; hadBOM: boolean } {
  if (content.charCodeAt(0) === 0xFEFF) {
    return { cleaned: content.substring(1), hadBOM: true };
  }
  return { cleaned: content, hadBOM: false };
}

/**
 * Column profiling - her sütun için detaylı analiz
 */
function profileColumn(
  columnName: string,
  values: any[],
  decimalSeparator: ',' | '.',
  thousandsSeparator: ',' | '.'
): ColumnProfile {
  const nonNullValues = values.filter(v => v !== null && v !== undefined);
  const nullCount = values.length - nonNullValues.length;
  const uniqueValues = new Set(nonNullValues.map(v => String(v)));
  const uniqueCount = uniqueValues.size;
  
  const sampleValues = nonNullValues.slice(0, 10);
  const riskFlags: string[] = [];
  
  // Type detection with confidence
  let detectedType: 'numeric' | 'date' | 'text' | 'boolean' | 'unknown' = 'unknown';
  let confidenceScore = 0;
  
  // Numeric detection
  const numericPattern = decimalSeparator === ','
    ? /^-?\d{1,3}(\.\d{3})*,\d+$|^-?\d+$/
    : /^-?\d{1,3}(,\d{3})*\.\d+$|^-?\d+$/;
  
  const numericMatches = nonNullValues.filter(v => {
    const str = String(v).trim();
    return numericPattern.test(str) || !isNaN(Number(str.replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '')));
  });
  
  const numericRatio = numericMatches.length / Math.max(nonNullValues.length, 1);
  
  if (numericRatio > 0.8) {
    detectedType = 'numeric';
    confidenceScore = numericRatio;
  } else {
    // Date detection
    const datePattern = /^\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4}/;
    const dateMatches = nonNullValues.filter(v => {
      const str = String(v);
      return datePattern.test(str) || !isNaN(Date.parse(str));
    });
    
    const dateRatio = dateMatches.length / Math.max(nonNullValues.length, 1);
    
    if (dateRatio > 0.7) {
      detectedType = 'date';
      confidenceScore = dateRatio;
    } else {
      // Boolean detection
      const booleanValues = ['true', 'false', 'evet', 'hayır', 'yes', 'no', '1', '0'];
      const booleanMatches = nonNullValues.filter(v => booleanValues.includes(String(v).toLowerCase()));
      const booleanRatio = booleanMatches.length / Math.max(nonNullValues.length, 1);
      
      if (booleanRatio > 0.8) {
        detectedType = 'boolean';
        confidenceScore = booleanRatio;
      } else {
        detectedType = 'text';
        confidenceScore = 0.5;
      }
    }
  }
  
  // Risk flag detection
  if (nullCount > values.length * 0.5) {
    riskFlags.push('high_null_ratio');
  }
  if (confidenceScore < 0.7) {
    riskFlags.push('low_confidence');
  }
  if (uniqueCount === 1 && nonNullValues.length > 10) {
    riskFlags.push('single_value');
  }
  if (detectedType === 'numeric' && confidenceScore < 0.8) {
    riskFlags.push('ambiguous_numeric');
  }
  
  return {
    columnName,
    detectedType,
    confidenceScore,
    sampleValues,
    nullCount,
    uniqueCount,
    riskFlags,
  };
}

/**
 * 🛡️ Güvenli CSV parse - Input Shield
 */
export async function parseCSVSafe(file: File | string): Promise<ShieldedParseResult> {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  try {
    // 1. Dosya içeriğini güvenli şekilde oku
    let content: string;
    
    if (typeof file === 'string') {
      content = file;
    } else {
      content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsText(file, 'UTF-8');
      });
    }
    
    // 2. BOM temizle
    const { cleaned, hadBOM } = removeBOM(content);
    if (hadBOM) {
      warnings.push('UTF-8 BOM tespit edildi ve temizlendi');
    }
    
    // 3. Delimiter tespit
    const delimiter = detectDelimiter(cleaned);
    
    // 4. PapaParse ile parse et
    const parseResult = await new Promise<Papa.ParseResult>((resolve, reject) => {
      Papa.parse(cleaned, {
        header: true,
        dynamicTyping: false, // ÖNEMLİ: Otomatik tip dönüşümü YAPMA
        skipEmptyLines: true,
        delimiter,
        complete: resolve,
        error: reject,
      });
    });
    
    if (parseResult.errors.length > 0) {
      parseResult.errors.forEach(err => {
        warnings.push(`Satır ${err.row}: ${err.message}`);
      });
    }
    
    const headers = parseResult.meta.fields || [];
    const rows = parseResult.data as Record<string, any>[];
    
    if (headers.length === 0) {
      errors.push('CSV dosyasında başlık satırı bulunamadı');
      throw new Error('Geçersiz CSV formatı');
    }
    
    if (rows.length === 0) {
      warnings.push('CSV dosyası boş görünüyor');
    }
    
    // 5. Decimal separator tespit (ilk numeric sütundan)
    let decimalSeparator: ',' | '.' = '.';
    let thousandsSeparator: ',' | '.' = ',';
    let locale: 'tr' | 'en' | 'auto' = 'auto';
    
    for (const header of headers) {
      const columnValues = rows.map(r => r[header]).filter(v => v !== null && v !== undefined);
      if (columnValues.length > 0) {
        const localeDetect = detectDecimalSeparator(columnValues);
        if (localeDetect.confidence > 0.5) {
          decimalSeparator = localeDetect.decimal;
          thousandsSeparator = localeDetect.thousands;
          locale = decimalSeparator === ',' ? 'tr' : 'en';
          break;
        }
      }
    }
    
    // 6. Column profiling
    const columnProfiles: ColumnProfile[] = headers.map(header => {
      const columnValues = rows.map(r => r[header]);
      return profileColumn(header, columnValues, decimalSeparator, thousandsSeparator);
    });
    
    // 7. Genel güven skoru hesapla
    const avgConfidence = columnProfiles.reduce((sum, p) => sum + p.confidenceScore, 0) / columnProfiles.length;
    const overallConfidence = Math.min(avgConfidence, 0.95); // Max 0.95 (her zaman %5 belirsizlik)
    
    // 8. Risk flag'leri kontrol et
    const hasHighRisk = columnProfiles.some(p => p.riskFlags.includes('ambiguous_numeric'));
    if (hasHighRisk) {
      warnings.push('Bazı sayısal sütunlar belirsiz görünüyor. Lütfen kontrol edin.');
    }
    
    const shieldedData: ShieldedCSVData = {
      headers,
      rows,
      rowCount: rows.length,
      columnCount: headers.length,
      metadata: {
        delimiter,
        locale,
        decimalSeparator,
        thousandsSeparator,
        bomRemoved: hadBOM,
        encoding: 'UTF-8',
        confidenceScore: overallConfidence,
      },
    };
    
    return {
      data: shieldedData,
      columnProfiles,
      warnings,
      errors: errors.length > 0 ? errors : [],
    };
    
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Bilinmeyen hata');
    throw new Error(`CSV parse hatası: ${errors.join(', ')}`);
  }
}

/**
 * Excel dosyası için sheet listesi
 */
export async function getExcelSheets(file: File): Promise<Array<{ name: string; rowCount: number; colCount: number }>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const sheets = workbook.SheetNames.map(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
          
          return {
            name: sheetName,
            rowCount: range.e.r + 1,
            colCount: range.e.c + 1,
          };
        });
        
        resolve(sheets);
      } catch (error) {
        reject(new Error(`Excel dosyası okunamadı: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`));
      }
    };
    
    reader.onerror = () => reject(new Error('Dosya okunamadı'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Excel sheet'ten güvenli veri çıkarımı
 */
export async function parseExcelSheetSafe(
  file: File,
  sheetName: string
): Promise<ShieldedParseResult> {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  try {
    const workbookData = await new Promise<XLSX.WorkBook>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array', raw: false });
          resolve(workbook);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
    
    const worksheet = workbookData.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheet bulunamadı: ${sheetName}`);
    }
    
    // Excel'i CSV formatına çevir
    const csvString = XLSX.utils.sheet_to_csv(worksheet);
    
    // CSV parse fonksiyonunu kullan
    return await parseCSVSafe(csvString);
    
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Bilinmeyen hata');
    throw new Error(`Excel parse hatası: ${errors.join(', ')}`);
  }
}
