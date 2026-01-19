// ✅ FINOPS MarketingDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const MarketingDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['marketing-campaign'] || DASHBOARD_CONFIGS['marketing']);

export default MarketingDashboard;
