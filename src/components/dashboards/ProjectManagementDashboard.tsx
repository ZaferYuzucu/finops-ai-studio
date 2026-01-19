// ✅ FINOPS ProjectManagementDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const ProjectManagementDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['project-management']);

export default ProjectManagementDashboard;
