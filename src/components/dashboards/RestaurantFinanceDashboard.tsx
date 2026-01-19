// ✅ FINOPS RestaurantFinanceDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const RestaurantFinanceDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['restaurant-finance']);

export default RestaurantFinanceDashboard;
