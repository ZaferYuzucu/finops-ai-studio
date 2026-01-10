import type { ChartType } from '../utils/chartWizard';
import type { DatasetProfile } from '../utils/chartWizard';

export type DashboardBuilderWizardData = {
  // Basic metadata
  dashboardName: string;

  // Snapshot for governance checks (no raw data)
  datasetProfileSnapshot?: DatasetProfile;

  // Source choices
  dataSource: 'upload' | 'integration' | 'demo' | null;
  dashboardType: 'template' | 'custom' | null;
  selectedTemplate: string | null;

  // We cannot persist File objects; store only metadata.
  uploadedFileMeta?: { name: string; size: number; type: string } | null;
  selectedIntegration: string | null;

  // Mapping is currently optional in the wizard UI
  columnMapping: Record<string, string>;

  customizations: {
    chartTypes: ChartType[];
    selectedMetrics: string[];
    colorScheme: string;
    chartSettings?: {
      dateRange?: '30d' | '90d' | 'ytd' | 'all';
      topN?: number;
      bottomN?: number;
      stacked?: boolean;
      includePdfTable?: boolean;
    };
  };
};

export type UserDashboardRecord = {
  id: string;
  userId: string;
  name: string;
  createdAtIso: string;
  updatedAtIso: string;
  wizardData: DashboardBuilderWizardData;
};

