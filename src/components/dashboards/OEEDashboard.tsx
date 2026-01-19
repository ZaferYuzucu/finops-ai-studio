// ✅ FINOPS OEEDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const OEEDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['oee-dashboard'] || DASHBOARD_CONFIGS['oee']);

export default OEEDashboard;
