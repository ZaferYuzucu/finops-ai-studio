// ✅ FINOPS SupplyChainDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const SupplyChainDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['supply-chain']);

export default SupplyChainDashboard;
