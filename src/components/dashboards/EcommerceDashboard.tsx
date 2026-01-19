// ✅ FINOPS EcommerceDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const EcommerceDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['ecommerce-kpi'] || DASHBOARD_CONFIGS['ecommerce']);

export default EcommerceDashboard;
