export const DATA_IMPORT_COMPLETED_KEY = 'fino_data_import_completed';
export const DATA_IMPORT_COMPLETED_AT_KEY = 'fino_data_import_completed_at';

export function markDataImportCompleted() {
  try {
    localStorage.setItem(DATA_IMPORT_COMPLETED_KEY, 'true');
    localStorage.setItem(DATA_IMPORT_COMPLETED_AT_KEY, new Date().toISOString());
  } catch {
    // ignore storage issues
  }
}

export function hasCompletedDataImport(): boolean {
  try {
    return localStorage.getItem(DATA_IMPORT_COMPLETED_KEY) === 'true';
  } catch {
    return false;
  }
}

