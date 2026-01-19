// ✅ FINOPS LogisticsDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const LogisticsDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['logistics-operations'] || DASHBOARD_CONFIGS['logistics']);

export default LogisticsDashboard;
