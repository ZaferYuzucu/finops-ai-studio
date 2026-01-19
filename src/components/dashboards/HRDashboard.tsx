// ✅ FINOPS HRDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const HRDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['hr-metrics'] || DASHBOARD_CONFIGS['hr']);

export default HRDashboard;
