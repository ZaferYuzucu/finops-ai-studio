// ✅ FINOPS FinanceDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const FinanceDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['finance-cfo'] || DASHBOARD_CONFIGS['finance']);

export default FinanceDashboard;
