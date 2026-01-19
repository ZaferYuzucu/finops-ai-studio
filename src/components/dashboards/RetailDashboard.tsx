// ✅ FINOPS RetailDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const RetailDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['retail-operations'] || DASHBOARD_CONFIGS['retail']);

export default RetailDashboard;
