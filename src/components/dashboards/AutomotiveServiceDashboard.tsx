// ✅ FINOPS AutomotiveServiceDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const AutomotiveServiceDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['automotive-service']);

export default AutomotiveServiceDashboard;
