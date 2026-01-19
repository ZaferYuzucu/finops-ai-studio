// ✅ FINOPS CustomerServiceDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const CustomerServiceDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['customer-service']);

export default CustomerServiceDashboard;
