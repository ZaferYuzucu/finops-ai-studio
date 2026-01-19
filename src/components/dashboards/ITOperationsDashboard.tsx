// ✅ FINOPS ITOperationsDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const ITOperationsDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['it-operations']);

export default ITOperationsDashboard;
