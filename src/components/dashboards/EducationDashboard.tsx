// ✅ FINOPS EducationDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const EducationDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['education-performance'] || DASHBOARD_CONFIGS['education']);

export default EducationDashboard;
