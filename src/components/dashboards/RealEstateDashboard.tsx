// ✅ FINOPS RealEstateDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const RealEstateDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['real-estate']);

export default RealEstateDashboard;
