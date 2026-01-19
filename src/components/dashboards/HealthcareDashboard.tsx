// ✅ FINOPS HealthcareDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const HealthcareDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['healthcare']);

export default HealthcareDashboard;
