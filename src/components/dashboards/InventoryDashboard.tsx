// ✅ FINOPS InventoryDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const InventoryDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['inventory-control'] || DASHBOARD_CONFIGS['inventory']);

export default InventoryDashboard;
