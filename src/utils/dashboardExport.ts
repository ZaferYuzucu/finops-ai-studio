// Dashboard Export Utilities
// PDF, Excel, Share fonksiyonları

import * as XLSX from 'xlsx';

/**
 * PDF Export - A4 Yatay Tek Sayfa
 * window.print() kullanarak tarayıcı print dialog'u açar
 * CSS @media print kuralları PDF çıktısını kontrol eder
 */
export const exportToPDF = () => {
  window.print();
};

/**
 * Excel Export
 * Dashboard verilerini Excel formatında indirir
 */
export const exportToExcel = (data: {
  dashboardName: string;
  kpiData: Array<{ label: string; value: string | number; change?: string }>;
  chartData?: any;
  dateRange?: string;
  location?: string;
}) => {
  try {
    const wb = XLSX.utils.book_new();
    
    // KPI Sheet
    const kpiSheet = XLSX.utils.json_to_sheet(
      data.kpiData.map(kpi => ({
        'KPI': kpi.label,
        'Değer': kpi.value,
        'Değişim': kpi.change || '-'
      }))
    );
    XLSX.utils.book_append_sheet(wb, kpiSheet, 'KPI Summary');
    
    // Chart Data Sheet (eğer varsa)
    if (data.chartData && data.chartData.dailyRevenue) {
      const chartSheet = XLSX.utils.json_to_sheet(data.chartData.dailyRevenue);
      XLSX.utils.book_append_sheet(wb, chartSheet, 'Revenue Data');
    }
    
    if (data.chartData && data.chartData.hourlyBusy) {
      const hourlySheet = XLSX.utils.json_to_sheet(data.chartData.hourlyBusy);
      XLSX.utils.book_append_sheet(wb, hourlySheet, 'Hourly Data');
    }
    
    if (data.chartData && data.chartData.productSales) {
      const productSheet = XLSX.utils.json_to_sheet(data.chartData.productSales);
      XLSX.utils.book_append_sheet(wb, productSheet, 'Product Sales');
    }
    
    // Metadata Sheet
    const metadataSheet = XLSX.utils.json_to_sheet([
      { 'Field': 'Dashboard', 'Value': data.dashboardName },
      { 'Field': 'Export Date', 'Value': new Date().toLocaleString('tr-TR') },
      { 'Field': 'Date Range', 'Value': data.dateRange || 'N/A' },
      { 'Field': 'Location', 'Value': data.location || 'N/A' },
    ]);
    XLSX.utils.book_append_sheet(wb, metadataSheet, 'Info');
    
    // Dosya adı oluştur
    const fileName = `${data.dashboardName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Excel dosyasını indir
    XLSX.writeFile(wb, fileName);
    
    return true;
  } catch (error) {
    console.error('Excel export error:', error);
    alert('Excel export failed. Please try again.');
    return false;
  }
};

/**
 * Share Dashboard
 * Dashboard linkini panoya kopyalar
 * Gelecekte: Token-based secure share link sistemi eklenebilir
 */
export const shareDashboard = (additionalParams?: Record<string, string>) => {
  try {
    let url = window.location.href;
    
    // Ek parametreler varsa URL'e ekle
    if (additionalParams && Object.keys(additionalParams).length > 0) {
      const urlObj = new URL(url);
      Object.entries(additionalParams).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value);
      });
      url = urlObj.toString();
    }
    
    navigator.clipboard.writeText(url);
    
    // Başarılı feedback
    showToast('✅ Dashboard linki panoya kopyalandı!', 'success');
    
    return true;
  } catch (error) {
    console.error('Share error:', error);
    alert('Link kopyalama başarısız. Lütfen tekrar deneyin.');
    return false;
  }
};

/**
 * Toast notification helper
 */
const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  // Basit bir toast notification
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      document.body.removeChild(toast);
      document.head.removeChild(style);
    }, 300);
  }, 3000);
};

/**
 * Print Preview Check
 * PDF export öncesi print media CSS'in doğru yüklendiğini kontrol eder
 */
export const checkPrintStyles = (): boolean => {
  const printArea = document.querySelector('.dashboard-print-area');
  if (!printArea) {
    console.warn('Dashboard print area not found');
    return false;
  }
  
  // @media print CSS kurallarını kontrol et
  const stylesheets = Array.from(document.styleSheets);
  const hasPrintRules = stylesheets.some(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      return rules.some(rule => 
        rule instanceof CSSMediaRule && 
        rule.media.mediaText.includes('print')
      );
    } catch (e) {
      // Cross-origin stylesheet access hatası - normal
      return false;
    }
  });
  
  if (!hasPrintRules) {
    console.warn('Print media CSS rules not found');
  }
  
  return hasPrintRules;
};
