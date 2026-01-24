// CSV DATA BINDER
// Deterministic CSV to dashboard data binding layer

import { DashboardTemplate } from '../registry/DashboardTemplateRegistry';

export interface CSVBindingResult {
  success: boolean;
  data?: any[];
  mappedColumns: Record<string, string>;
  missingColumns: string[];
  warnings: string[];
}

export class CSVDataBinder {
  /**
   * Bind CSV data to dashboard template
   * - Never blocks rendering
   * - Shows warnings for missing columns
   * - Attempts fuzzy column matching
   */
  static bind(
    template: DashboardTemplate,
    csvData: any[],
    userColumnMapping?: Record<string, string>
  ): CSVBindingResult {
    if (!csvData || csvData.length === 0) {
      return {
        success: false,
        mappedColumns: {},
        missingColumns: template.dataSchema.requiredColumns,
        warnings: ['CSV data is empty']
      };
    }
    
    const csvColumns = Object.keys(csvData[0]);
    const requiredColumns = template.dataSchema.requiredColumns;
    const mappedColumns: Record<string, string> = {};
    const missingColumns: string[] = [];
    const warnings: string[] = [];
    
    // Step 1: Apply user-provided mappings
    if (userColumnMapping) {
      Object.entries(userColumnMapping).forEach(([templateCol, csvCol]) => {
        if (csvColumns.includes(csvCol)) {
          mappedColumns[templateCol] = csvCol;
        }
      });
    }
    
    // Step 2: Auto-match remaining columns (exact match)
    requiredColumns.forEach(reqCol => {
      if (mappedColumns[reqCol]) return; // Already mapped
      
      if (csvColumns.includes(reqCol)) {
        mappedColumns[reqCol] = reqCol;
      }
    });
    
    // Step 3: Fuzzy matching for unmapped columns
    requiredColumns.forEach(reqCol => {
      if (mappedColumns[reqCol]) return;
      
      const fuzzyMatch = this.fuzzyMatch(reqCol, csvColumns);
      if (fuzzyMatch) {
        mappedColumns[reqCol] = fuzzyMatch;
        warnings.push(`Column "${reqCol}" fuzzy-matched to "${fuzzyMatch}"`);
      }
    });
    
    // Step 4: Identify missing columns
    requiredColumns.forEach(reqCol => {
      if (!mappedColumns[reqCol]) {
        missingColumns.push(reqCol);
        warnings.push(`Required column "${reqCol}" not found in CSV`);
      }
    });
    
    // Step 5: Transform data
    const transformedData = csvData.map(row => {
      const transformed: any = {};
      Object.entries(mappedColumns).forEach(([templateCol, csvCol]) => {
        transformed[templateCol] = row[csvCol];
      });
      return transformed;
    });
    
    return {
      success: missingColumns.length === 0,
      data: transformedData,
      mappedColumns,
      missingColumns,
      warnings
    };
  }
  
  /**
   * Fuzzy column name matching
   * Handles common variations like:
   * - case differences: "Revenue" vs "revenue"
   * - separators: "revenue_total" vs "revenueTotal" vs "Revenue Total"
   * - abbreviations: "rev" vs "revenue"
   */
  private static fuzzyMatch(target: string, candidates: string[]): string | null {
    const normalized = this.normalize(target);
    
    // Try exact normalized match first
    for (const candidate of candidates) {
      if (this.normalize(candidate) === normalized) {
        return candidate;
      }
    }
    
    // Try partial match (target contained in candidate)
    for (const candidate of candidates) {
      const normCand = this.normalize(candidate);
      if (normCand.includes(normalized) || normalized.includes(normCand)) {
        return candidate;
      }
    }
    
    return null;
  }
  
  private static normalize(str: string): string {
    return str
      .toLowerCase()
      .replace(/[_\s-]/g, '') // Remove separators
      .replace(/[^a-z0-9]/g, ''); // Remove special chars
  }
  
  /**
   * Validate CSV structure against template
   */
  static validate(template: DashboardTemplate, csvData: any[]): {
    isValid: boolean;
    errors: string[];
    suggestions: string[];
  } {
    const errors: string[] = [];
    const suggestions: string[] = [];
    
    if (!csvData || csvData.length === 0) {
      errors.push('CSV file is empty');
      return { isValid: false, errors, suggestions };
    }
    
    const csvColumns = Object.keys(csvData[0]);
    const requiredColumns = template.dataSchema.requiredColumns;
    
    // Check for missing required columns
    const missingCols = requiredColumns.filter(col => !csvColumns.includes(col));
    if (missingCols.length > 0) {
      errors.push(`Missing required columns: ${missingCols.join(', ')}`);
      
      // Suggest fuzzy matches
      missingCols.forEach(missing => {
        const match = this.fuzzyMatch(missing, csvColumns);
        if (match) {
          suggestions.push(`Did you mean "${match}" for "${missing}"?`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      suggestions
    };
  }
}

export default CSVDataBinder;
