import { ColumnMapping, NormalizedRow, ValidationIssue } from '../types';

/**
 * Normalize raw data using column mappings
 */
export function normalizeData(
  rawData: any[][],
  headerRow: number,
  mappings: ColumnMapping[],
  fileName: string,
  sheetName: string
): { normalized: NormalizedRow[]; issues: ValidationIssue[] } {
  const headers = rawData[headerRow];
  const dataRows = rawData.slice(headerRow + 1);
  
  const normalized: NormalizedRow[] = [];
  const issues: ValidationIssue[] = [];
  
  dataRows.forEach((row, rowIndex) => {
    if (!row || row.every(cell => !cell)) return; // Skip empty rows
    
    const normalizedRow: NormalizedRow = {
      date: null,
      entity: null,
      category: null,
      sub_category: null,
      metric: null,
      value: null,
      currency: 'TRY',
      unit: null,
      source: `${fileName}/${sheetName}`,
      notes: null
    };
    
    mappings.forEach((mapping, colIndex) => {
      if (!mapping.targetColumn) return;
      
      const cellValue = row[colIndex];
      
      if (cellValue == null || cellValue === '') {
        // Check if required
        if ((mapping.targetColumn === 'date' || mapping.targetColumn === 'value')) {
          issues.push({
            row: rowIndex + headerRow + 1,
            column: mapping.sourceColumn,
            issue: mapping.targetColumn === 'date' ? 'missing_date' : 'missing_value',
            severity: 'warning',
            message: `${mapping.sourceColumn} eksik`
          });
        }
        return;
      }
      
      // Type conversion
      try {
        switch (mapping.targetColumn) {
          case 'date':
            normalizedRow.date = parseDate(cellValue);
            if (!normalizedRow.date) {
              issues.push({
                row: rowIndex + headerRow + 1,
                column: mapping.sourceColumn,
                issue: 'invalid_date',
                severity: 'error',
                message: `Geçersiz tarih formatı: ${cellValue}`
              });
            }
            break;
          
          case 'value':
            const numValue = parseNumber(cellValue);
            if (numValue !== null) {
              normalizedRow.value = numValue;
            } else {
              issues.push({
                row: rowIndex + headerRow + 1,
                column: mapping.sourceColumn,
                issue: 'invalid_number',
                severity: 'error',
                message: `Geçersiz sayı: ${cellValue}`
              });
            }
            break;
          
          default:
            // String columns
            normalizedRow[mapping.targetColumn] = String(cellValue).trim();
        }
      } catch (error) {
        issues.push({
          row: rowIndex + headerRow + 1,
          column: mapping.sourceColumn,
          issue: 'missing_required',
          severity: 'error',
          message: `Dönüşüm hatası: ${(error as Error).message}`
        });
      }
    });
    
    // Only add if has date and value
    if (normalizedRow.date || normalizedRow.value !== null) {
      normalized.push(normalizedRow);
    }
  });
  
  return { normalized, issues };
}

function parseDate(value: any): string | null {
  if (!value) return null;
  
  try {
    // Excel serial date
    if (typeof value === 'number') {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + value * 86400000);
      return date.toISOString().split('T')[0];
    }
    
    // String date
    const str = String(value).trim();
    const date = new Date(str);
    
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    
    // Turkish format: DD.MM.YYYY
    const match = str.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (match) {
      return `${match[3]}-${match[2]}-${match[1]}`;
    }
    
    return null;
  } catch {
    return null;
  }
}

function parseNumber(value: any): number | null {
  if (value === null || value === undefined || value === '') return null;
  
  if (typeof value === 'number') return value;
  
  // Clean string
  const cleaned = String(value)
    .replace(/[^\d,.-]/g, '') // Remove non-numeric except comma, dot, minus
    .replace(',', '.'); // Turkish decimal separator
  
  const num = parseFloat(cleaned);
  
  return isNaN(num) ? null : num;
}





