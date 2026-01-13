import Papa from 'papaparse';

export interface ParsedCSVData {
  headers: string[];
  rows: Record<string, any>[];
  rowCount: number;
  columnCount: number;
}

/**
 * CSV dosyasını parse eder
 */
export async function parseCSVFile(file: File): Promise<ParsedCSVData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error('CSV parse hataları:', results.errors);
        }
        
        const headers = results.meta.fields || [];
        const rows = results.data as Record<string, any>[];
        
        resolve({
          headers,
          rows,
          rowCount: rows.length,
          columnCount: headers.length,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

/**
 * Public CSV URL'den parse eder
 */
export async function parseCSVFromURL(url: string): Promise<ParsedCSVData> {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      download: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error('CSV parse hataları:', results.errors);
        }
        
        const headers = results.meta.fields || [];
        const rows = results.data as Record<string, any>[];
        
        resolve({
          headers,
          rows,
          rowCount: rows.length,
          columnCount: headers.length,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

/**
 * Tarih sütununu otomatik algılar
 */
export function detectDateColumn(data: ParsedCSVData | string[]): string | null {
  // Backward compatibility: accept both ParsedCSVData and string[]
  const headers = Array.isArray(data) ? data : data.headers;
  
  const dateKeywords = ['tarih', 'date', 'time', 'zaman', 'gun', 'ay', 'yil'];
  
  for (const header of headers) {
    const lower = header.toLowerCase();
    if (dateKeywords.some(keyword => lower.includes(keyword))) {
      return header;
    }
  }
  
  return headers[0]; // İlk sütun varsayılan
}

/**
 * Sayısal sütunları algılar
 */
export function detectNumericColumns(data: ParsedCSVData): string[] {
  if (data.rows.length === 0) return [];
  
  const numericColumns: string[] = [];
  
  for (const header of data.headers) {
    // İlk 10 satıra bak
    const sampleRows = data.rows.slice(0, 10);
    const isNumeric = sampleRows.every(row => {
      const value = row[header];
      return value === null || value === undefined || typeof value === 'number' || !isNaN(Number(value));
    });
    
    if (isNumeric) {
      numericColumns.push(header);
    }
  }
  
  return numericColumns;
}

/**
 * Kategori sütunlarını algılar
 */
export function detectCategoryColumns(data: ParsedCSVData): string[] {
  if (data.rows.length === 0) return [];
  
  const categoryColumns: string[] = [];
  
  for (const header of data.headers) {
    const uniqueValues = new Set(data.rows.map(row => row[header]));
    
    // 2-50 unique değer varsa kategori olabilir
    if (uniqueValues.size >= 2 && uniqueValues.size <= 50) {
      categoryColumns.push(header);
    }
  }
  
  return categoryColumns;
}

/**
 * Verileri tarih sütununa göre sıralar
 */
export function sortByDate(data: ParsedCSVData, dateColumn: string): ParsedCSVData {
  const sorted = [...data.rows].sort((a, b) => {
    const dateA = new Date(a[dateColumn]).getTime();
    const dateB = new Date(b[dateColumn]).getTime();
    return dateA - dateB;
  });
  
  return {
    ...data,
    rows: sorted,
  };
}
