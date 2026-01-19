// ✅ FINOPS FleetManagementDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const FleetManagementDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['fleet-management']);

export default FleetManagementDashboard;
