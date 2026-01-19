// ✅ FINOPS InsuranceDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const InsuranceDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['insurance-operations'] || DASHBOARD_CONFIGS['insurance']);

export default InsuranceDashboard;
