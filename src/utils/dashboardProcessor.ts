import { parseCSVFile, parseCSVFromURL } from './csvParser';
import { generateDashboardLayout } from './dashboardRenderer';
import type { DashboardBuilderWizardData, UserDashboardRecord } from '../types/userDashboard';
import { createUserDashboard, updateUserDashboard, getUserDashboard } from './userDashboards';

/**
 * Dashboard oluşturur ve CSV'yi işler
 */
export async function createDashboardWithData(
  userId: string,
  wizardData: DashboardBuilderWizardData,
  csvFile?: File,
  csvUrl?: string
): Promise<UserDashboardRecord> {
  // 1. Dashboard metadata'sını kaydet
  const dashboard = createUserDashboard(userId, wizardData);
  
  // 2. CSV'yi parse et ve layout oluştur (async)
  processDashboardDataAsync(userId, dashboard.id, wizardData, csvFile, csvUrl);
  
  return dashboard;
}

/**
 * Async olarak CSV'yi işler ve dashboard'u günceller
 */
async function processDashboardDataAsync(
  userId: string,
  dashboardId: string,
  wizardData: DashboardBuilderWizardData,
  csvFile?: File,
  csvUrl?: string
): Promise<void> {
  try {
    console.log('📊 Dashboard işleniyor:', dashboardId);
    
    // CSV parse et
    let csvData;
    if (csvFile) {
      csvData = await parseCSVFile(csvFile);
    } else if (csvUrl) {
      csvData = await parseCSVFromURL(csvUrl);
    } else {
      throw new Error('CSV dosyası veya URL gerekli');
    }
    
    console.log('✅ CSV parse edildi:', csvData.rowCount, 'satır');
    
    // Layout oluştur
    const chartType = wizardData.customizations.chartTypes[0] || 'line';
    const layout = generateDashboardLayout(csvData, chartType, wizardData.dashboardName);
    
    console.log('✅ Dashboard layout oluşturuldu:', layout.charts.length, 'grafik');
    
    // Dashboard'u güncelle
    const current = getUserDashboard(userId, dashboardId);
    if (current) {
      const updated = {
        ...current,
        renderedLayout: layout,
        status: 'ready' as const,
      };
      
      // localStorage'a kaydet
      const store = JSON.parse(localStorage.getItem('finops_user_dashboards_v1') || '{"v":1,"byUser":{}}');
      const userDashboards = store.byUser[userId] || [];
      const index = userDashboards.findIndex((d: any) => d.id === dashboardId);
      
      if (index !== -1) {
        userDashboards[index] = updated;
        store.byUser[userId] = userDashboards;
        localStorage.setItem('finops_user_dashboards_v1', JSON.stringify(store));
        
        console.log('✅ Dashboard kaydedildi:', dashboardId);
        
        // Event dispatch et
        window.dispatchEvent(new CustomEvent('dashboard-ready', { detail: { dashboardId } }));
      }
    }
  } catch (error) {
    console.error('❌ Dashboard işleme hatası:', error);
    
    // Hata durumunu kaydet
    const current = getUserDashboard(userId, dashboardId);
    if (current) {
      const updated = {
        ...current,
        status: 'error' as const,
      };
      
      const store = JSON.parse(localStorage.getItem('finops_user_dashboards_v1') || '{"v":1,"byUser":{}}');
      const userDashboards = store.byUser[userId] || [];
      const index = userDashboards.findIndex((d: any) => d.id === dashboardId);
      
      if (index !== -1) {
        userDashboards[index] = updated;
        store.byUser[userId] = userDashboards;
        localStorage.setItem('finops_user_dashboards_v1', JSON.stringify(store));
      }
    }
  }
}

/**
 * Library dosyasından dashboard oluşturur
 */
export async function createDashboardFromLibrary(
  userId: string,
  wizardData: DashboardBuilderWizardData,
  libraryFileName: string
): Promise<UserDashboardRecord> {
  // Public klasöründeki demo data'yı kullan
  const csvUrl = `/demo-data/${libraryFileName}`;
  
  return createDashboardWithData(userId, wizardData, undefined, csvUrl);
}
