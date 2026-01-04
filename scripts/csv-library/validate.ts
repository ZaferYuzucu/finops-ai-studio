/**
 * CSV Validation Script
 * FinOps CSV Standard v1 formatına uygunluk kontrolü
 */

import fs from 'fs';
import path from 'path';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalRows: number;
    dateRange?: { start: string; end: string };
    entities: string[];
    categories: string[];
    metrics: string[];
  };
}

export function validateCSV(filePath: string): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    stats: {
      totalRows: 0,
      entities: [],
      categories: [],
      metrics: []
    }
  };

  try {
    // Dosya kontrolü
    if (!fs.existsSync(filePath)) {
      result.valid = false;
      result.errors.push(`Dosya bulunamadı: ${filePath}`);
      return result;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');

    if (lines.length < 2) {
      result.valid = false;
      result.errors.push('Dosya en az 2 satır içermelidir (header + data)');
      return result;
    }

    // Header kontrolü
    const header = lines[0].toLowerCase();
    const requiredColumns = ['date', 'entity', 'category', 'metric', 'value'];
    const missingColumns = requiredColumns.filter(col => !header.includes(col));

    if (missingColumns.length > 0) {
      result.valid = false;
      result.errors.push(`Eksik kolonlar: ${missingColumns.join(', ')}`);
      return result;
    }

    // Data kontrolü
    const dataRows = lines.slice(1);
    result.stats.totalRows = dataRows.length;

    const entities = new Set<string>();
    const categories = new Set<string>();
    const metrics = new Set<string>();
    const dates: string[] = [];

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i].split(',');
      const lineNum = i + 2;

      if (row.length < 5) {
        result.warnings.push(`Satır ${lineNum}: Yetersiz sütun sayısı`);
        continue;
      }

      const [date, entity, category, metric, value] = row;

      // Tarih kontrolü (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        result.warnings.push(`Satır ${lineNum}: Geçersiz tarih formatı: ${date}`);
      } else {
        dates.push(date);
      }

      // Entity, category, metric boş olmamalı
      if (!entity || entity.trim() === '') {
        result.warnings.push(`Satır ${lineNum}: Entity boş`);
      } else {
        entities.add(entity);
      }

      if (!category || category.trim() === '') {
        result.warnings.push(`Satır ${lineNum}: Category boş`);
      } else {
        categories.add(category);
      }

      if (!metric || metric.trim() === '') {
        result.warnings.push(`Satır ${lineNum}: Metric boş`);
      } else {
        metrics.add(metric);
      }

      // Value numeric olmalı
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        result.warnings.push(`Satır ${lineNum}: Value sayısal değil: ${value}`);
      }
    }

    // Stats doldur
    result.stats.entities = Array.from(entities);
    result.stats.categories = Array.from(categories);
    result.stats.metrics = Array.from(metrics);

    if (dates.length > 0) {
      dates.sort();
      result.stats.dateRange = {
        start: dates[0],
        end: dates[dates.length - 1]
      };
    }

    // Uyarı sayısı çok fazlaysa valid = false
    if (result.warnings.length > result.stats.totalRows * 0.1) {
      result.valid = false;
      result.errors.push(`Çok fazla uyarı: ${result.warnings.length} / ${result.stats.totalRows}`);
    }

  } catch (error: any) {
    result.valid = false;
    result.errors.push(`Beklenmeyen hata: ${error.message}`);
  }

  return result;
}

// CLI kullanımı
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Kullanım: npx tsx validate.ts <csv-dosya-yolu>');
    process.exit(1);
  }

  const filePath = args[0];
  console.log(`🔍 Validating: ${filePath}\n`);

  const result = validateCSV(filePath);

  if (result.valid) {
    console.log('✅ Validation PASSED\n');
  } else {
    console.log('❌ Validation FAILED\n');
  }

  if (result.errors.length > 0) {
    console.log('❌ Errors:');
    result.errors.forEach(err => console.log(`  - ${err}`));
    console.log();
  }

  if (result.warnings.length > 0) {
    console.log(`⚠️  Warnings (${result.warnings.length}):`);
    result.warnings.slice(0, 10).forEach(warn => console.log(`  - ${warn}`));
    if (result.warnings.length > 10) {
      console.log(`  ... +${result.warnings.length - 10} more`);
    }
    console.log();
  }

  console.log('📊 Stats:');
  console.log(`  Total Rows: ${result.stats.totalRows}`);
  console.log(`  Entities: ${result.stats.entities.length}`);
  console.log(`  Categories: ${result.stats.categories.length}`);
  console.log(`  Metrics: ${result.stats.metrics.length}`);
  if (result.stats.dateRange) {
    console.log(`  Date Range: ${result.stats.dateRange.start} → ${result.stats.dateRange.end}`);
  }

  process.exit(result.valid ? 0 : 1);
}




