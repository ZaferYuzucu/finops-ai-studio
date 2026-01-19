// ✅ FINOPS AutomotiveExecutiveDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const AutomotiveExecutiveDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['automotive-executive']);

export default AutomotiveExecutiveDashboard;
