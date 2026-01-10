import type { DashboardBuilderWizardData } from './userDashboard';

export type TemplateLibraryItem = {
  id: string;
  name: string;
  createdAtIso: string;
  createdByAdminEmail?: string | null;
  sourceDashboardId: string;
  sourceUserId: string;
  sectorLabel?: string; // e.g., Restoran & Kafe, Otel & Konaklama
  notes?: string;
  wizardData: DashboardBuilderWizardData;
};

