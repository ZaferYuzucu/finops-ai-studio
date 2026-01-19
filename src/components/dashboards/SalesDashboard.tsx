// ✅ FINOPS SalesDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const SalesDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['sales-team'] || DASHBOARD_CONFIGS['sales']);

export default SalesDashboard;
