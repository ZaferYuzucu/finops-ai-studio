// ✅ FINOPS AutomotivTermostatDashboard - Factory Pattern ile Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const AutomotivTermostatDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['automotive-termostat']);

export default AutomotivTermostatDashboard;
