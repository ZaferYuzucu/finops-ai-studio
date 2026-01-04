import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { SheetInfo } from '../types';

/**
 * Parse Excel file and extract sheet information
 */
export async function parseExcelFile(file: File): Promise<SheetInfo[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const sheets: SheetInfo[] = workbook.SheetNames.map(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
          
          // Get row/col counts
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
          const rowCount = range.e.r + 1;
          const colCount = range.e.c + 1;
          
          // Preview first 5 rows
          const preview = jsonData.slice(0, 5) as any[][];
          
          return {
            name: sheetName,
            rowCount,
            colCount,
            preview,
            selected: false
          };
        });
        
        resolve(sheets);
      } catch (error) {
        reject(new Error('Excel dosyası okunamadı: ' + (error as Error).message));
      }
    };
    
    reader.onerror = () => reject(new Error('Dosya okunamadı'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Parse CSV file
 */
export async function parseCSVFile(file: File): Promise<SheetInfo[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        const data = results.data as any[][];
        
        const sheet: SheetInfo = {
          name: file.name.replace(/\.(csv|tsv)$/i, ''),
          rowCount: data.length,
          colCount: data[0]?.length || 0,
          preview: data.slice(0, 5),
          selected: true // Auto-select for CSV
        };
        
        resolve([sheet]);
      },
      error: (error) => {
        reject(new Error('CSV dosyası okunamadı: ' + error.message));
      }
    });
  });
}

/**
 * Extract full sheet data (after sheet selection)
 */
export function extractSheetData(file: File, sheetName: string): Promise<any[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[sheetName];
        
        if (!worksheet) {
          reject(new Error('Sheet bulunamadı: ' + sheetName));
          return;
        }
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          header: 1, 
          defval: '',
          raw: false // Convert dates to strings
        });
        
        resolve(jsonData as any[][]);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.readAsArrayBuffer(file);
  });
}






