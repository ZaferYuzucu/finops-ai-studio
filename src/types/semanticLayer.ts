/**
 * Semantic Layer - Minimal Implementation
 * Maps dataset columns to business entities
 */

export type SemanticFieldType = 
  | 'metric'      // Measurable values (revenue, cost, quantity)
  | 'dimension'   // Categorical attributes (product, location, customer)
  | 'temporal';   // Time-based fields (date, month, year)

export interface SemanticField {
  id: string;
  name: string;
  type: SemanticFieldType;
  description?: string;
}

// Standard semantic fields (extensible)
export const STANDARD_METRICS: SemanticField[] = [
  { id: 'revenue', name: 'Revenue', type: 'metric' },
  { id: 'cost', name: 'Cost', type: 'metric' },
  { id: 'profit', name: 'Profit', type: 'metric' },
  { id: 'quantity', name: 'Quantity', type: 'metric' },
  { id: 'price', name: 'Price', type: 'metric' },
  { id: 'margin', name: 'Margin', type: 'metric' },
];

export const STANDARD_DIMENSIONS: SemanticField[] = [
  { id: 'product', name: 'Product', type: 'dimension' },
  { id: 'category', name: 'Category', type: 'dimension' },
  { id: 'location', name: 'Location', type: 'dimension' },
  { id: 'customer', name: 'Customer', type: 'dimension' },
  { id: 'region', name: 'Region', type: 'dimension' },
  { id: 'branch', name: 'Branch', type: 'dimension' },
];

export const STANDARD_TEMPORAL: SemanticField[] = [
  { id: 'date', name: 'Date', type: 'temporal' },
  { id: 'month', name: 'Month', type: 'temporal' },
  { id: 'year', name: 'Year', type: 'temporal' },
  { id: 'quarter', name: 'Quarter', type: 'temporal' },
];

export interface SemanticMapping {
  datasetColumn: string;      // Original column name
  semanticFieldId: string;    // Mapped semantic field
  confidence?: number;         // 0-1, for assisted mapping
}

export interface DatasetSemantics {
  datasetId: string;
  mappings: SemanticMapping[];
  grain?: 'daily' | 'weekly' | 'monthly' | 'yearly'; // Data granularity
}

// Phase 2: Multi-dataset join configuration
export type JoinType = 'inner' | 'left';

export interface JoinConfig {
  leftDatasetId: string;
  rightDatasetId: string;
  joinType: JoinType;
  leftKey: string;    // Semantic field or column
  rightKey: string;   // Semantic field or column
}

export interface MultiDatasetConfig {
  datasetIds: string[];
  semanticFieldsUsed: string[];
  joinConfigs: JoinConfig[];
  grain?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Phase 2: AI suggestion structure (non-automatic)
export interface AISuggestion {
  type: 'join' | 'semantic_mapping' | 'dashboard_template';
  confidence: number; // 0-1
  suggestion: any;
  reasoning: string;
  approved?: boolean;
}
