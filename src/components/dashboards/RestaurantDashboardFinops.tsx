// ✅ FINOPS RestaurantDashboardFinops - Factory Pattern ile Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const RestaurantDashboardFinops = createFinopsDashboard(DASHBOARD_CONFIGS['restaurant-finops']);

export default RestaurantDashboardFinops;
