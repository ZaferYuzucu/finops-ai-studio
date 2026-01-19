/**
 * AI-Assisted Suggestions (NON-AUTOMATIC)
 * Phase 2: Suggestions only, user must confirm
 */

import type { AISuggestion, JoinConfig, SemanticMapping } from '../types/semanticLayer';

// Disabled by default
let AI_SUGGESTIONS_ENABLED = false;

export function enableAISuggestions(enabled: boolean) {
  AI_SUGGESTIONS_ENABLED = enabled;
}

export function isAISuggestionsEnabled(): boolean {
  return AI_SUGGESTIONS_ENABLED;
}

/**
 * Suggest join keys between two datasets
 * Returns suggestions only, never executes automatically
 */
export function suggestJoinKeys(
  leftHeaders: string[],
  rightHeaders: string[]
): AISuggestion[] {
  if (!AI_SUGGESTIONS_ENABLED) return [];

  const suggestions: AISuggestion[] = [];

  // Simple heuristic: look for similar column names
  leftHeaders.forEach(leftCol => {
    rightHeaders.forEach(rightCol => {
      const leftLower = leftCol.toLowerCase();
      const rightLower = rightCol.toLowerCase();

      let confidence = 0;

      // Exact match
      if (leftLower === rightLower) {
        confidence = 0.95;
      }
      // Similar names (contains)
      else if (leftLower.includes(rightLower) || rightLower.includes(leftLower)) {
        confidence = 0.7;
      }
      // Common join patterns
      else if (
        (leftLower.includes('id') && rightLower.includes('id')) ||
        (leftLower.includes('code') && rightLower.includes('code')) ||
        (leftLower.includes('key') && rightLower.includes('key'))
      ) {
        confidence = 0.6;
      }

      if (confidence > 0.5) {
        suggestions.push({
          type: 'join',
          confidence,
          suggestion: {
            leftKey: leftCol,
            rightKey: rightCol,
            joinType: 'inner' as const
          },
          reasoning: `Sütun adları benzer veya ortak join deseni tespit edildi (${leftCol} ↔ ${rightCol})`,
          approved: false
        });
      }
    });
  });

  // Sort by confidence
  return suggestions.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}

/**
 * Suggest semantic mappings for columns
 * Returns suggestions only, never executes automatically
 */
export function suggestSemanticMappings(
  columns: string[]
): AISuggestion[] {
  if (!AI_SUGGESTIONS_ENABLED) return [];

  const suggestions: AISuggestion[] = [];

  const patterns: Record<string, { semanticId: string; keywords: string[] }> = {
    revenue: { semanticId: 'revenue', keywords: ['gelir', 'revenue', 'income', 'sales'] },
    cost: { semanticId: 'cost', keywords: ['gider', 'cost', 'expense', 'maliyet'] },
    profit: { semanticId: 'profit', keywords: ['kar', 'profit', 'margin'] },
    quantity: { semanticId: 'quantity', keywords: ['adet', 'quantity', 'miktar', 'count'] },
    price: { semanticId: 'price', keywords: ['fiyat', 'price', 'ucret'] },
    product: { semanticId: 'product', keywords: ['urun', 'product', 'item'] },
    category: { semanticId: 'category', keywords: ['kategori', 'category', 'type'] },
    location: { semanticId: 'location', keywords: ['lokasyon', 'location', 'sube', 'branch'] },
    customer: { semanticId: 'customer', keywords: ['musteri', 'customer', 'client'] },
    date: { semanticId: 'date', keywords: ['tarih', 'date', 'time'] },
    month: { semanticId: 'month', keywords: ['ay', 'month'] },
    year: { semanticId: 'year', keywords: ['yil', 'year'] }
  };

  columns.forEach(column => {
    const columnLower = column.toLowerCase();

    Object.entries(patterns).forEach(([key, { semanticId, keywords }]) => {
      const matchedKeyword = keywords.find(kw => columnLower.includes(kw));
      
      if (matchedKeyword) {
        const confidence = columnLower === matchedKeyword ? 0.9 : 0.75;
        
        suggestions.push({
          type: 'semantic_mapping',
          confidence,
          suggestion: {
            column,
            semanticId
          },
          reasoning: `"${column}" sütunu "${matchedKeyword}" anahtar kelimesini içeriyor`,
          approved: false
        });
      }
    });
  });

  return suggestions.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Suggest dashboard template based on semantic fields
 * Returns suggestions only, never executes automatically
 */
export function suggestDashboardTemplate(
  semanticFields: string[]
): AISuggestion[] {
  if (!AI_SUGGESTIONS_ENABLED) return [];

  const suggestions: AISuggestion[] = [];

  // Simple template matching based on semantic fields
  const hasRevenue = semanticFields.includes('revenue');
  const hasCost = semanticFields.includes('cost');
  const hasProfit = semanticFields.includes('profit');
  const hasDate = semanticFields.includes('date') || semanticFields.includes('month');
  const hasProduct = semanticFields.includes('product');
  const hasLocation = semanticFields.includes('location');

  // Financial dashboard
  if (hasRevenue && hasCost && hasProfit) {
    suggestions.push({
      type: 'dashboard_template',
      confidence: 0.9,
      suggestion: {
        template: 'financial',
        kpis: ['revenue', 'cost', 'profit', 'margin'],
        charts: ['revenue_trend', 'cost_breakdown', 'profit_margin']
      },
      reasoning: 'Gelir, gider ve kar verileri mevcut - Finansal dashboard öneriliyor',
      approved: false
    });
  }

  // Sales dashboard
  if (hasRevenue && hasProduct && hasDate) {
    suggestions.push({
      type: 'dashboard_template',
      confidence: 0.85,
      suggestion: {
        template: 'sales',
        kpis: ['revenue', 'quantity', 'avg_price'],
        charts: ['sales_by_product', 'sales_trend', 'top_products']
      },
      reasoning: 'Ürün ve tarih bazlı satış verileri mevcut - Satış dashboard öneriliyor',
      approved: false
    });
  }

  // Regional dashboard
  if (hasLocation && hasRevenue) {
    suggestions.push({
      type: 'dashboard_template',
      confidence: 0.8,
      suggestion: {
        template: 'regional',
        kpis: ['total_revenue', 'branch_count', 'avg_revenue_per_branch'],
        charts: ['revenue_by_location', 'branch_comparison']
      },
      reasoning: 'Lokasyon bazlı gelir verileri mevcut - Bölgesel dashboard öneriliyor',
      approved: false
    });
  }

  return suggestions.sort((a, b) => b.confidence - a.confidence).slice(0, 2);
}

/**
 * Check if datasets are compatible for joining
 * Returns warnings, never blocks automatically
 */
export function checkDatasetCompatibility(
  dataset1: { rowCount?: number; grain?: string },
  dataset2: { rowCount?: number; grain?: string }
): { compatible: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Check row count mismatch
  if (dataset1.rowCount && dataset2.rowCount) {
    const ratio = Math.max(dataset1.rowCount, dataset2.rowCount) / 
                  Math.min(dataset1.rowCount, dataset2.rowCount);
    
    if (ratio > 10) {
      warnings.push(
        `Veri setleri arasında büyük satır sayısı farkı var (${dataset1.rowCount} vs ${dataset2.rowCount}). ` +
        'Join işlemi sonrası veri kaybı olabilir.'
      );
    }
  }

  // Check grain mismatch
  if (dataset1.grain && dataset2.grain && dataset1.grain !== dataset2.grain) {
    warnings.push(
      `Veri setleri farklı granülariteye sahip (${dataset1.grain} vs ${dataset2.grain}). ` +
      'Agregasyon hatalarına dikkat edin.'
    );
  }

  return {
    compatible: warnings.length === 0,
    warnings
  };
}
