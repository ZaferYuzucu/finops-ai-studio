// ✅ FINOPS AgricultureDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const AgricultureDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['agriculture-operations'] || DASHBOARD_CONFIGS['agriculture']);

export default AgricultureDashboard;
