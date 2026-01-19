// ✅ FINOPS HotelOperationsDashboard - Otomatik Standardize Edildi
import { createFinopsDashboard } from './DashboardFactory';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';

const HotelOperationsDashboard = createFinopsDashboard(DASHBOARD_CONFIGS['hotel-management']);

export default HotelOperationsDashboard;
