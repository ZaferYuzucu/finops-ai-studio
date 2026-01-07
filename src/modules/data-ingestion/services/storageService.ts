import { NormalizedRow, IngestionHistory, DatasetType } from '../types';

const STORAGE_KEY_DATA = 'finops_ingested_data';
const STORAGE_KEY_HISTORY = 'finops_ingestion_history';

export interface SavedDataset {
  id: string;
  name: string;
  type: DatasetType;
  rows: NormalizedRow[];
  uploadDate: string;
  fileName: string;
  sheetName: string;
  rowCount: number;
}

/**
 * Save ingested data to localStorage
 */
export function saveIngestedData(
  name: string,
  type: DatasetType,
  rows: NormalizedRow[],
  fileName: string,
  sheetName: string
): SavedDataset {
  const dataset: SavedDataset = {
    id: generateId(),
    name,
    type,
    rows,
    uploadDate: new Date().toISOString(),
    fileName,
    sheetName,
    rowCount: rows.length
  };
  
  // Get existing datasets
  const existing = getAllDatasets();
  existing.push(dataset);
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(existing));
  
  // Add to history
  addToHistory({
    id: dataset.id,
    fileName,
    sheetName,
    datasetType: type,
    rowCount: rows.length,
    timestamp: dataset.uploadDate,
    status: 'success'
  });
  
  return dataset;
}

/**
 * Get all saved datasets
 */
export function getAllDatasets(): SavedDataset[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DATA);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Get dataset by ID
 */
export function getDatasetById(id: string): SavedDataset | null {
  const datasets = getAllDatasets();
  return datasets.find(d => d.id === id) || null;
}

/**
 * Get datasets by type
 */
export function getDatasetsByType(type: DatasetType): SavedDataset[] {
  return getAllDatasets().filter(d => d.type === type);
}

/**
 * Delete dataset
 */
export function deleteDataset(id: string): void {
  const datasets = getAllDatasets().filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(datasets));
}

/**
 * Get ingestion history
 */
export function getIngestionHistory(): IngestionHistory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Add to history
 */
function addToHistory(entry: IngestionHistory): void {
  const history = getIngestionHistory();
  history.unshift(entry); // Add to beginning
  
  // Keep only last 50
  const trimmed = history.slice(0, 50);
  
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(trimmed));
}

/**
 * Clear all data (for debugging)
 */
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY_DATA);
  localStorage.removeItem(STORAGE_KEY_HISTORY);
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `ds_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Export dataset as CSV
 */
export function exportDatasetAsCSV(dataset: SavedDataset): string {
  const headers = ['date', 'entity', 'category', 'sub_category', 'metric', 'value', 'currency', 'unit', 'source', 'notes'];
  const rows = dataset.rows.map(row => 
    headers.map(h => row[h as keyof NormalizedRow] || '').join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
}










