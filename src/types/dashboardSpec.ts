import type { ChartIntent, ChartType } from '../utils/chartWizard';

export type DashboardOutput = 'live' | 'pdf';

/**
 * Dashboard JSON Schema (v1)
 * Shared by: Live dashboard, PDF export, AI chat, Wizard.
 */
export interface DashboardSpecV1 {
  version: 1;
  intent: ChartIntent;
  chartType: ChartType;
  icon: string; // Lucide icon name
  output: DashboardOutput;
  reason: string;
  settings: {
    dateRange?: '30d' | '90d' | 'ytd' | 'all';
    topN?: number;
    bottomN?: number;
    stacked?: boolean;
    includePdfTable?: boolean;
  };
  renderHints: {
    tooltip: boolean;
    showValueLabels: boolean;
    tableRequired: boolean;
    dataNote: boolean;
    filtersInteractive: boolean;
    tableOptional: boolean;
  };
}

