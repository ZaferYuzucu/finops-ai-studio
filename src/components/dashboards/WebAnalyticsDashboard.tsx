// ✅ FINOPS WebAnalyticsDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const WebAnalyticsDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['web-analytics']);

export default WebAnalyticsDashboard;
