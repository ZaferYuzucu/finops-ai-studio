// ✅ FINOPS EnergyDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const EnergyDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['energy-management'] || DASHBOARD_CONFIGS['energy']);

export default EnergyDashboard;
