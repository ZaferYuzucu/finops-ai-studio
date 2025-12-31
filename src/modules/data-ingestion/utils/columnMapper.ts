import { ColumnMapping, StandardColumn } from '../types';
import { 
  DATE_COLUMN_PATTERNS, 
  VALUE_COLUMN_PATTERNS, 
  CATEGORY_COLUMN_PATTERNS,
  ENTITY_COLUMN_PATTERNS 
} from '../constants';

/**
 * Auto-detect column mappings using pattern matching
 */
export function autoDetectColumnMappings(headers: string[], sampleData: any[][]): ColumnMapping[] {
  return headers.map((header, index) => {
    const headerLower = header.toLowerCase().trim();
    const sampleValues = sampleData.slice(1, 6).map(row => row[index]).filter(v => v != null && v !== '');
    
    // Detect target column
    let targetColumn: StandardColumn | null = null;
    let confidence = 0;
    
    // Date detection
    if (DATE_COLUMN_PATTERNS.some(pattern => headerLower.includes(pattern))) {
      targetColumn = 'date';
      confidence = 0.9;
    }
    // Value detection
    else if (VALUE_COLUMN_PATTERNS.some(pattern => headerLower.includes(pattern))) {
      targetColumn = 'value';
      confidence = 0.85;
    }
    // Category detection
    else if (CATEGORY_COLUMN_PATTERNS.some(pattern => headerLower.includes(pattern))) {
      targetColumn = 'category';
      confidence = 0.8;
    }
    // Entity detection
    else if (ENTITY_COLUMN_PATTERNS.some(pattern => headerLower.includes(pattern))) {
      targetColumn = 'entity';
      confidence = 0.75;
    }
    // Fallback: check sample values
    else if (sampleValues.length > 0) {
      const firstValue = sampleValues[0];
      
      // Check if numeric
      if (typeof firstValue === 'number' || !isNaN(parseFloat(String(firstValue)))) {
        targetColumn = 'value';
        confidence = 0.6;
      }
      // Check if date-like
      else if (isDateLike(String(firstValue))) {
        targetColumn = 'date';
        confidence = 0.7;
      }
      // Default to notes
      else {
        targetColumn = 'notes';
        confidence = 0.4;
      }
    }
    
    // Detect data type
    const dataType = detectDataType(sampleValues);
    
    return {
      sourceColumn: header,
      targetColumn,
      confidence,
      dataType,
      sampleValues: sampleValues.slice(0, 3)
    };
  });
}

function isDateLike(value: string): boolean {
  // Simple date detection
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}/, // DD/MM/YYYY
    /^\d{2}\.\d{2}\.\d{4}/, // DD.MM.YYYY
  ];
  
  return datePatterns.some(pattern => pattern.test(value));
}

function detectDataType(values: any[]): 'string' | 'number' | 'date' | 'boolean' {
  if (values.length === 0) return 'string';
  
  const firstValue = values[0];
  
  if (typeof firstValue === 'number') return 'number';
  if (typeof firstValue === 'boolean') return 'boolean';
  
  const strValue = String(firstValue);
  
  if (isDateLike(strValue)) return 'date';
  if (!isNaN(parseFloat(strValue))) return 'number';
  
  return 'string';
}

/**
 * Detect header row (first row with text values)
 */
export function detectHeaderRow(data: any[][]): number {
  for (let i = 0; i < Math.min(5, data.length); i++) {
    const row = data[i];
    const hasText = row.some(cell => typeof cell === 'string' && cell.trim().length > 0);
    const notAllNumbers = row.some(cell => isNaN(parseFloat(String(cell))));
    
    if (hasText && notAllNumbers) {
      return i;
    }
  }
  
  return 0; // Default to first row
}



