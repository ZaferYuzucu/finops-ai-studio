// ✅ FINOPS RestaurantLaborDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const RestaurantLaborDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['restaurant-labor']);

export default RestaurantLaborDashboard;
