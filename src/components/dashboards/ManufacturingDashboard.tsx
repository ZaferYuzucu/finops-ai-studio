// ✅ FINOPS ManufacturingDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const ManufacturingDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['manufacturing-control'] || DASHBOARD_CONFIGS['manufacturing']);

export default ManufacturingDashboard;
