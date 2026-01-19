// ✅ FINOPS CashFlowDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const CashFlowDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['cash-flow'] || DASHBOARD_CONFIGS['cashflow']);

export default CashFlowDashboard;
