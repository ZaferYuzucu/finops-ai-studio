// ✅ FINOPS QualityControlDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const QualityControlDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['quality-control']);

export default QualityControlDashboard;
