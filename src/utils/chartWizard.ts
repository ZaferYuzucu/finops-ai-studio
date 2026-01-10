export type ChartIntent =
  | 'trend'
  | 'compare'
  | 'distribution'
  | 'flow'
  | 'detail'
  // Extended intents for AI/Wizard (must stay compatible with existing UX):
  | 'target_tracking'
  | 'trend_analysis';

export type ChartType =
  | 'line'
  | 'bar'
  | 'stacked_bar'
  | 'area'
  | 'area_line'
  | 'donut'
  | 'table'
  | 'heatmap'
  | 'combo'
  | 'waterfall'
  | 'kpi'
  | 'gauge';

export interface DatasetProfile {
  hasDate: boolean;
  hasCategory: boolean;
  isRatio: boolean; // % / share-like
  hasBridgeSteps: boolean; // start → steps → result
  rowCount: number;
  categoryCount?: number;
  seriesCount?: number; // number of series to plot (rough)
  // Extended signals
  hasTargetActual?: boolean; // target + actual present
  singleEntity?: boolean; // single person / single entity (e.g., a waiter)
  multiBusiness?: boolean;
  businessCount?: number;
  userRole?: 'staff' | 'manager' | 'cfo' | 'admin';
}

export interface ChartRulesConfig {
  maxPieCategories: number; // default: 6
  maxLineSeries: number; // default: 5
  largeRowCount: number; // default: 100
  veryLargeRowCount: number; // default: 200
  maxAreaBusinesses: number; // default: 4 (stacked area max)
  gaugeRolesAllowed: Array<'staff' | 'manager' | 'cfo' | 'admin'>; // default: ['staff']
  // Optional sector overrides (admin-only). Keys: otel/restoran/perakende/default
  sectorOverrides?: Record<
    string,
    Partial<Record<ChartIntent, { preferred?: ChartType; alternatives?: ChartType[] }>>
  >;
}

export const DEFAULT_CHART_RULES: ChartRulesConfig = {
  maxPieCategories: 6,
  maxLineSeries: 5,
  largeRowCount: 100,
  veryLargeRowCount: 200,
  maxAreaBusinesses: 4,
  gaugeRolesAllowed: ['staff'],
};

export interface ChartRecommendation {
  recommended: ChartType;
  alternatives: ChartType[];
  reason: string;
  warnings: string[];
}

type Locale = 'tr' | 'en';

function t(locale: Locale, tr: string, en: string) {
  return locale === 'tr' ? tr : en;
}

export function loadChartRulesFromStorage(): ChartRulesConfig | null {
  try {
    // Safe in SSR/build because `window` might not exist
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w: any = typeof window !== 'undefined' ? window : null;
    if (!w?.localStorage) return null;
    const raw = w.localStorage.getItem('fino_chart_rules_v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChartRulesConfig;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function recommendChart(
  intent: ChartIntent,
  profile: DatasetProfile,
  locale: Locale = 'en',
  rules?: Partial<ChartRulesConfig>,
  sector?: string,
  output?: 'live' | 'pdf'
): ChartRecommendation {
  const stored = loadChartRulesFromStorage();
  const cfg: ChartRulesConfig = {
    ...DEFAULT_CHART_RULES,
    ...(stored ?? {}),
    ...(rules ?? {}),
  };

  const warnings: string[] = [];

  // Generic warnings
  if (profile.rowCount > cfg.largeRowCount) {
    warnings.push(
      t(
        locale,
        'Veri seti büyük: filtreli bir Tablo eklemeyi düşün.',
        'Large dataset: consider adding a Table with filters.'
      )
    );
  }
  if ((profile.categoryCount ?? 0) > cfg.maxPieCategories) {
    warnings.push(
      t(
        locale,
        'Pie/Donut için çok fazla kategori var: Top‑N + “Diğer” veya Bar kullan.',
        'Too many categories for Pie/Donut: use Top‑N + “Other” or Bar.'
      )
    );
  }
  if ((profile.seriesCount ?? 0) > cfg.maxLineSeries) {
    warnings.push(
      t(
        locale,
        'Line için çok fazla seri var: filtrele veya Bar/Tabloya geç.',
        'Too many series for Line: consider filtering or switching to Bar/Table.'
      )
    );
  }

  // Optional sector override hook (admin-managed)
  const sectorKey = (sector || 'default').toLowerCase();
  const sectorOverride = cfg.sectorOverrides?.[sectorKey]?.[intent];

  // Rule-based engine (simple, explainable)
  // Intent-first, then profile validation.
  if (sectorOverride?.preferred) {
    return {
      recommended: sectorOverride.preferred,
      alternatives: sectorOverride.alternatives ?? [],
      reason: t(
        locale,
        `Sektör kuralı (${sectorKey}) → varsayılan öneri.`,
        `Sector rule (${sectorKey}) → preferred default.`
      ),
      warnings,
    };
  }

  // Extended detection rules (automatic behaviors)
  const role = profile.userRole ?? 'manager';
  const wantsPdf = output === 'pdf';

  // 1) Target tracking (single entity) → Gauge (LIVE only)
  if (profile.hasTargetActual && profile.singleEntity && cfg.gaugeRolesAllowed.includes(role)) {
    if (wantsPdf) {
      return {
        recommended: 'kpi',
        alternatives: ['table'],
        reason: t(
          locale,
          'Hedef takibi tespit edildi; PDF’te Gauge önerilmez → KPI + hedef/gerçekleşen tablo.',
          'Target tracking detected; Gauge is not recommended for PDF → KPI + target/actual table.'
        ),
        warnings,
      };
    }
    return {
      recommended: 'gauge',
      alternatives: ['kpi', 'table'],
      reason: t(
        locale,
        'Bu veri hedef takibi içeriyor → Tek hedef/tek kişi için Gauge uygundur.',
        'This data includes target tracking → Gauge fits a single target for a single person.'
      ),
      warnings,
    };
  }

  // 2) Multi-business time series → Area + Line (trend_analysis)
  if ((intent === 'trend' || intent === 'trend_analysis') && profile.hasDate && profile.multiBusiness) {
    return {
      recommended: wantsPdf ? 'area' : 'area_line',
      alternatives: wantsPdf ? ['line', 'table'] : ['area', 'line'],
      reason: t(
        locale,
        'Zaman serisi + çoklu işletme → Toplam eğilim için Area + seçili işletme için Line uygundur.',
        'Time series + multi-business → Area for aggregate volume + Line for a selected business is appropriate.'
      ),
      warnings:
        (profile.businessCount ?? 0) > cfg.maxAreaBusinesses
          ? warnings.concat([
              t(
                locale,
                `Stacked Area için işletme sayısı çok yüksek (max ${cfg.maxAreaBusinesses}).`,
                `Too many businesses for stacked area (max ${cfg.maxAreaBusinesses}).`
              ),
            ])
          : warnings,
    };
  }

  switch (intent) {
    case 'trend': {
      if (profile.hasDate) {
        return {
          recommended: 'line',
          alternatives: ['area', 'combo'],
          reason: t(
            locale,
            'Zaman serisi tespit edildi → Trend için en doğru seçenek Line.',
            'Time series detected → Line is best for trends over time.'
          ),
          warnings,
        };
      }
      return {
        recommended: profile.hasCategory ? 'bar' : 'kpi',
        alternatives: profile.hasCategory ? ['table', 'kpi'] : ['table', 'bar'],
        reason: t(
          locale,
          'Zaman ekseni yok → Kıyas için Bar, tek metrik için KPI uygundur.',
          'No time axis detected → use Bar for comparisons or KPI for a single metric.'
        ),
        warnings: warnings.concat([
          t(locale, 'Tarih/zaman alanı tespit edilemedi.', 'No date/time field detected.'),
        ]),
      };
    }

    case 'compare': {
      if (profile.hasCategory) {
        return {
          recommended: 'bar',
          alternatives: ['stacked_bar', 'table'],
          reason: t(
            locale,
            'Kategori + sayısal değer → Kıyas için en uygun Bar.',
            'Category + numeric values → Bar is best for comparisons.'
          ),
          warnings: warnings.concat([
            t(
              locale,
              'Kıyas sorusunda Area chart önerilmez (kıyas değil, hacim/eğilim grafiğidir).',
              'Area is not recommended for comparisons (it is for volume/trend, not comparison).'
            ),
          ]),
        };
      }
      return {
        recommended: profile.hasDate ? 'combo' : 'table',
        alternatives: profile.hasDate ? ['line', 'bar'] : ['kpi', 'bar'],
        reason: profile.hasDate
          ? t(
              locale,
              'Tarih tespit edildi → Zaman içinde iki metriği kıyaslamak için Combo uygun.',
              'Date detected → Combo can compare two metrics over time.'
            )
          : t(
              locale,
              'Kategori alanı yok → Kıyas için en güvenlisi Tablo.',
              'No categories detected → Table is safest for comparison.'
            ),
        warnings: warnings.concat([
          t(locale, 'Kategori alanı tespit edilemedi.', 'No category field detected.'),
        ]),
      };
    }

    case 'distribution': {
      if (profile.isRatio) {
        return {
          recommended: 'donut',
          alternatives: ['bar', 'kpi'],
          reason: t(
            locale,
            'Oran/pay tespit edildi → Parça–bütün için Donut uygundur.',
            'Ratio/share detected → Donut communicates part-to-whole effectively.'
          ),
          warnings,
        };
      }
      if (profile.hasCategory) {
        return {
          recommended: 'donut',
          alternatives: ['bar', 'stacked_bar'],
          reason: t(
            locale,
            'Parça–bütün → Kategori sayısı düşükse Donut uygun.',
            'Part-to-whole intent → Donut is suitable when category count is small.'
          ),
          warnings,
        };
      }
      return {
        recommended: 'heatmap',
        alternatives: ['table', 'bar'],
        reason: t(
          locale,
          'Kategori net değil → Desen ve dağılımı görmek için Heatmap/Tablo kullan.',
          'No clear categories → use Heatmap/Table to reveal patterns and distribution.'
        ),
        warnings,
      };
    }

    case 'flow': {
      if (profile.hasBridgeSteps) {
        return {
          recommended: 'waterfall',
          alternatives: ['combo', 'table'],
          reason: t(
            locale,
            'Başlangıç → adımlar → sonuç yapısı tespit edildi → Waterfall ideal.',
            'Bridge structure detected (start → steps → result) → Waterfall is ideal.'
          ),
          warnings,
        };
      }
      return {
        recommended: 'waterfall',
        alternatives: ['table', 'combo'],
        reason: t(
          locale,
          'Finansal akış → Etkenleri anlatmak için varsayılan Waterfall.',
          'Financial flow intent → Waterfall is the default for explaining drivers.'
        ),
        warnings: warnings.concat([
          t(
            locale,
            'Başlangıç/adım/sonuç alanları tespit edilemedi; alanlarını kontrol et.',
            'Bridge steps not detected; confirm you have start/steps/result fields.'
          ),
        ]),
      };
    }

    case 'detail': {
      return {
        recommended: 'table',
        alternatives: ['bar', 'kpi'],
        reason: t(
          locale,
          'Detay → Net rakamları okumak için Tablo en iyisi.',
          'Detail intent → Table is best for reading exact numbers.'
        ),
        warnings,
      };
    }

    case 'trend_analysis': {
      // fallback to trend rules
      return recommendChart('trend', profile, locale, cfg, sector, output);
    }

    case 'target_tracking': {
      // If it didn't match the auto-detection above, default to KPI + Table (safe).
      return {
        recommended: wantsPdf ? 'kpi' : 'kpi',
        alternatives: wantsPdf ? ['table'] : ['table', 'gauge'],
        reason: t(
          locale,
          'Hedef takibi için varsayılan: KPI + hedef/gerçekleşen tablosu.',
          'Default for target tracking: KPI + target/actual table.'
        ),
        warnings,
      };
    }
  }
}

export function getChartWarnings(
  chart: ChartType,
  profile: DatasetProfile,
  locale: Locale = 'en',
  rules?: Partial<ChartRulesConfig>
): string[] {
  const stored = loadChartRulesFromStorage();
  const cfg: ChartRulesConfig = {
    ...DEFAULT_CHART_RULES,
    ...(stored ?? {}),
    ...(rules ?? {}),
  };

  const warnings: string[] = [];

  if (chart === 'donut' && (profile.categoryCount ?? 0) > cfg.maxPieCategories) {
    warnings.push(
      t(
        locale,
        'Pie/Donut çok kategoriyle ideal değildir (6+).',
        'Pie/Donut is not ideal with many categories (6+).'
      )
    );
  }
  if (chart === 'line' && !profile.hasDate) {
    warnings.push(
      t(
        locale,
        'Line grafik için tarih/zaman ekseni gerekir.',
        'Line charts require a time axis (date/time).'
      )
    );
  }
  if (chart === 'bar' && !profile.hasCategory) {
    warnings.push(
      t(
        locale,
        'Bar grafik kategorik kırılım ile en iyi çalışır.',
        'Bar charts work best with categorical breakdowns.'
      )
    );
  }
  if (chart === 'waterfall' && !profile.hasBridgeSteps) {
    warnings.push(
      t(
        locale,
        'Waterfall en iyi “başlangıç → adımlar → sonuç” yapısında çalışır.',
        'Waterfall works best with start → steps → result structure.'
      )
    );
  }
  if (chart !== 'table' && profile.rowCount > cfg.veryLargeRowCount) {
    warnings.push(
      t(
        locale,
        'Veri seti büyük: filtre veya Tablo eklemeyi düşün.',
        'Large dataset: consider adding a Table or filtering.'
      )
    );
  }

  return warnings;
}

