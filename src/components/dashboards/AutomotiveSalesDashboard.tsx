// ✅ FINOPS AutomotiveSalesDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const AutomotiveSalesDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['automotive-sales']);

export default AutomotiveSalesDashboard;
