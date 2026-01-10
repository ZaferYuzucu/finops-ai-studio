import type { DashboardSpecV1 } from '../types/dashboardSpec';
import type { ChartWizardResult } from '../components/chart-wizard/ChartChoiceWizard';

export function wizardResultToDashboardSpec(result: ChartWizardResult): DashboardSpecV1 {
  return {
    version: 1,
    intent: result.intent,
    chartType: result.selectedChart,
    icon: result.icon,
    output: result.output,
    reason: result.reason,
    settings: { ...result.settings },
    renderHints: { ...result.renderHints },
  };
}

