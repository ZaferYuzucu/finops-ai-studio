// ✅ FINOPS RestaurantSalesDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const RestaurantSalesDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['restaurant-sales']);

export default RestaurantSalesDashboard;
