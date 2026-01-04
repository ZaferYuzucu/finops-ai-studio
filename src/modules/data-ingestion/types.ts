/**
 * Excel Intelligence Layer - Type Definitions
 * MVP v1.0
 */

export type DatasetType = 
  | 'Sales' 
  | 'Expenses' 
  | 'Inventory' 
  | 'Production' 
  | 'HR' 
  | 'Marketing' 
  | 'Finance' 
  | 'Agriculture'
  | 'Custom';

export type WizardStep = 
  | 'upload' 
  | 'sheet-discovery' 
  | 'header-detection' 
  | 'column-mapping' 
  | 'validation' 
  | 'preview';

export interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface SheetInfo {
  name: string;
  rowCount: number;
  colCount: number;
  preview: any[][]; // First 5 rows
  selected: boolean;
  datasetType?: DatasetType;
}

export interface HeaderDetection {
  sheetName: string;
  detectedHeaderRow: number; // 0-based index
  headers: string[];
  confidence: 'high' | 'medium' | 'low';
}

export type StandardColumn = 
  | 'date'
  | 'entity'
  | 'category'
  | 'sub_category'
  | 'metric'
  | 'value'
  | 'currency'
  | 'unit'
  | 'source'
  | 'notes';

export interface ColumnMapping {
  sourceColumn: string; // Original column name
  targetColumn: StandardColumn | null;
  confidence: number; // 0-1
  dataType: 'string' | 'number' | 'date' | 'boolean';
  sampleValues: any[];
}

export interface ValidationIssue {
  row: number;
  column: string;
  issue: 'missing_date' | 'invalid_date' | 'missing_value' | 'invalid_number' | 'missing_required';
  severity: 'error' | 'warning';
  message: string;
}

export interface NormalizedRow {
  date: string | null;
  entity: string | null;
  category: string | null;
  sub_category: string | null;
  metric: string | null;
  value: number | null;
  currency: string | null;
  unit: string | null;
  source: string;
  notes: string | null;
}

export interface Dataset {
  id: string;
  name: string;
  type: DatasetType;
  fileName: string;
  sheetName: string;
  uploadedAt: Date;
  rowCount: number;
  columnMappings: ColumnMapping[];
  data: NormalizedRow[];
  validationIssues: ValidationIssue[];
  metadata: {
    originalHeaders: string[];
    headerRow: number;
    processedAt: Date;
  };
}

export interface DataIngestionState {
  currentStep: WizardStep;
  uploadedFile: UploadedFile | null;
  sheets: SheetInfo[];
  selectedSheet: SheetInfo | null;
  headerDetection: HeaderDetection | null;
  columnMappings: ColumnMapping[];
  validationIssues: ValidationIssue[];
  normalizedData: NormalizedRow[];
  savedDatasets: Dataset[];
}






