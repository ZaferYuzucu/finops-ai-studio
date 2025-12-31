/**
 * CSV Normalization Script
 * Ham CSV → FinOps CSV Standard v1
 */

import fs from 'fs';
import path from 'path';

interface NormalizeOptions {
  dateColumn?: string; // source date column name
  entityColumn?: string;
  categoryColumn?: string;
  metricColumn?: string;
  valueColumn?: string;
  dateFormat?: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'auto';
}

export function normalizeCSV(inputPath: string, outputPath: string, options: NormalizeOptions = {}): void {
  const {
    dateColumn = 'date',
    entityColumn = 'entity',
    categoryColumn = 'category',
    metricColumn = 'metric',
    valueColumn = 'value',
    dateFormat = 'auto'
  } = options;

  try {
    const content = fs.readFileSync(inputPath, 'utf-8');
    const lines = content.trim().split('\n');

    if (lines.length < 2) {
      throw new Error('CSV dosyası en az 2 satır içermelidir');
    }

    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const dataRows = lines.slice(1);

    // Kolon indekslerini bul
    const dateIdx = header.indexOf(dateColumn.toLowerCase());
    const entityIdx = header.indexOf(entityColumn.toLowerCase());
    const categoryIdx = header.indexOf(categoryColumn.toLowerCase());
    const metricIdx = header.indexOf(metricColumn.toLowerCase());
    const valueIdx = header.indexOf(valueColumn.toLowerCase());

    if ([dateIdx, entityIdx, categoryIdx, metricIdx, valueIdx].some(idx => idx === -1)) {
      throw new Error(`Gerekli kolonlar bulunamadı. Header: ${header.join(', ')}`);
    }

    // Normalize edilmiş satırlar
    const normalizedRows: string[] = ['date,entity,category,metric,value,currency,unit'];

    for (const row of dataRows) {
      const columns = row.split(',');
      
      if (columns.length <= Math.max(dateIdx, entityIdx, categoryIdx, metricIdx, valueIdx)) {
        continue; // Skip incomplete rows
      }

      const date = normalizeDate(columns[dateIdx], dateFormat);
      const entity = columns[entityIdx].trim();
      const category = columns[categoryIdx].trim();
      const metric = columns[metricIdx].trim();
      const value = columns[valueIdx].trim();

      // Boş değerleri atla
      if (!date || !entity || !category || !metric || !value) {
        continue;
      }

      normalizedRows.push(`${date},${entity},${category},${metric},${value},,`);
    }

    fs.writeFileSync(outputPath, normalizedRows.join('\n'), 'utf-8');
    console.log(`✅ Normalized: ${normalizedRows.length - 1} rows → ${outputPath}`);

  } catch (error: any) {
    console.error(`❌ Normalization failed: ${error.message}`);
    throw error;
  }
}

function normalizeDate(dateStr: string, format: string): string {
  const trimmed = dateStr.trim();

  // Zaten ISO formatında mı?
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  // Auto-detect veya diğer formatlar
  try {
    // DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
      const [day, month, year] = trimmed.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // MM/DD/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed) && format === 'MM/DD/YYYY') {
      const [month, day, year] = trimmed.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Eğer Date parse edilebiliyorsa
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }

    return trimmed; // Normalize edilemedi, olduğu gibi bırak
  } catch {
    return trimmed;
  }
}

// CLI kullanımı
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Kullanım: npx tsx normalize.ts <input.csv> <output.csv>');
    process.exit(1);
  }

  const [inputPath, outputPath] = args;
  normalizeCSV(inputPath, outputPath);
}

