// ✅ FINOPS CallCenterDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const CallCenterDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['call-center']);

export default CallCenterDashboard;
