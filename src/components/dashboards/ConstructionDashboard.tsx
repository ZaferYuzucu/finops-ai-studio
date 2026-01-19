// ✅ FINOPS ConstructionDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const ConstructionDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['construction-projects'] || DASHBOARD_CONFIGS['construction']);

export default ConstructionDashboard;
