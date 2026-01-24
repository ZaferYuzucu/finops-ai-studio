// UNIFIED DASHBOARD TEMPLATE REGISTRY
// Single source of truth for all dashboard templates

export type DashboardSector = 
  | 'restaurant' 
  | 'hotel' 
  | 'automotive' 
  | 'finance' 
  | 'hr' 
  | 'manufacturing' 
  | 'sales' 
  | 'agriculture'
  | 'ecommerce'
  | 'education'
  | 'other';

export type DashboardCategory = 
  | 'financial' 
  | 'operational' 
  | 'sales' 
  | 'hr' 
  | 'executive';

export type RoleVisibility = 'admin' | 'user' | 'both';

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart';
  title: string;
  config: any;
}

export interface DashboardTemplate {
  id: string;
  name: string;
  sector: DashboardSector;
  category: DashboardCategory;
  templateType: string;
  description: string;
  icon: string;
  
  // Layout and widgets
  defaultLayout: {
    kpiCount: number;
    chartCount: number;
    gridLayout: string;
  };
  defaultWidgets: DashboardWidget[];
  
  // Data schema
  dataSchema: {
    requiredColumns: string[];
    optionalColumns: string[];
    csvTemplate?: string;
  };
  
  // Visibility
  roleVisibility: RoleVisibility;
  isTemplate: boolean;
  
  // Metadata
  createdBy?: 'system' | string;
  tags: string[];
}

class DashboardTemplateRegistry {
  private templates: Map<string, DashboardTemplate> = new Map();
  
  constructor() {
    this.initializeSystemTemplates();
  }
  
  private initializeSystemTemplates() {
    // RESTAURANT TEMPLATES
    this.register({
      id: 'restaurant-finance',
      name: 'Restoran Finansal Performans',
      sector: 'restaurant',
      category: 'financial',
      templateType: 'restaurant-cfo',
      description: 'Finansal analiz ve karlılık göstergeleri',
      icon: '🍽️',
      defaultLayout: {
        kpiCount: 6,
        chartCount: 3,
        gridLayout: '6-kpi-3-chart'
      },
      defaultWidgets: [
        { id: 'netMargin', type: 'kpi', title: 'Net Kâr Marjı', config: { format: 'percentage' } },
        { id: 'foodCost', type: 'kpi', title: 'Food Cost %', config: { format: 'percentage' } },
        { id: 'laborCost', type: 'kpi', title: 'Labor Cost %', config: { format: 'percentage' } },
        { id: 'primeCost', type: 'kpi', title: 'Prime Cost %', config: { format: 'percentage' } },
        { id: 'roe', type: 'kpi', title: 'ROE %', config: { format: 'percentage' } },
        { id: 'revenue', type: 'kpi', title: 'Toplam Gelir', config: { format: 'currency' } },
        { id: 'revenueChart', type: 'chart', title: 'Gelir Trendi', config: { chartType: 'line' } },
        { id: 'costsChart', type: 'chart', title: 'Maliyet Dağılımı', config: { chartType: 'pie' } },
        { id: 'primeChart', type: 'chart', title: 'Prime Cost Trendi', config: { chartType: 'line' } }
      ],
      dataSchema: {
        requiredColumns: ['date', 'revenue', 'cogs', 'labor_cost'],
        optionalColumns: ['location', 'category', 'profit']
      },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['restaurant', 'finance', 'profitability']
    });
    
    this.register({
      id: 'automotive-executive',
      name: 'Otomotiv Executive Dashboard',
      sector: 'automotive',
      category: 'executive',
      templateType: 'automotive-ceo',
      description: 'Yönetim özeti ve performans göstergeleri',
      icon: '🚗',
      defaultLayout: {
        kpiCount: 6,
        chartCount: 3,
        gridLayout: '6-kpi-3-chart'
      },
      defaultWidgets: [
        { id: 'revenue', type: 'kpi', title: 'Toplam Ciro', config: { format: 'currency' } },
        { id: 'units', type: 'kpi', title: 'Satılan Araç', config: { format: 'number' } },
        { id: 'margin', type: 'kpi', title: 'Brüt Kâr Marjı', config: { format: 'percentage' } },
        { id: 'inventory', type: 'kpi', title: 'Stok Devir', config: { format: 'number' } },
        { id: 'service', type: 'kpi', title: 'Servis Geliri', config: { format: 'currency' } },
        { id: 'satisfaction', type: 'kpi', title: 'Müşteri NPS', config: { format: 'number' } },
        { id: 'salesChart', type: 'chart', title: 'Satış Trendi', config: { chartType: 'line' } },
        { id: 'distributionChart', type: 'chart', title: 'Model Dağılımı', config: { chartType: 'pie' } },
        { id: 'serviceChart', type: 'chart', title: 'Servis Geliri', config: { chartType: 'bar' } }
      ],
      dataSchema: {
        requiredColumns: ['date', 'sales_units', 'revenue', 'service_revenue'],
        optionalColumns: ['model', 'region', 'customer_satisfaction']
      },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['automotive', 'executive', 'sales']
    });
    
    // FINANCE TEMPLATES
    this.register({
      id: 'finance-cashflow',
      name: 'Nakit Akış Dashboard',
      sector: 'finance',
      category: 'financial',
      templateType: 'cfo-cashflow',
      description: 'Cash Flow & Likidite yönetimi',
      icon: '💰',
      defaultLayout: {
        kpiCount: 6,
        chartCount: 3,
        gridLayout: '6-kpi-3-chart'
      },
      defaultWidgets: [
        { id: 'cashBalance', type: 'kpi', title: 'Nakit Bakiye', config: { format: 'currency' } },
        { id: 'inflow', type: 'kpi', title: 'Gelen Nakit', config: { format: 'currency' } },
        { id: 'outflow', type: 'kpi', title: 'Çıkan Nakit', config: { format: 'currency' } },
        { id: 'netCash', type: 'kpi', title: 'Net Nakit Akışı', config: { format: 'currency' } },
        { id: 'dso', type: 'kpi', title: 'DSO (Gün)', config: { format: 'number' } },
        { id: 'workingCapital', type: 'kpi', title: 'İşletme Sermayesi', config: { format: 'currency' } },
        { id: 'cashflowChart', type: 'chart', title: 'Nakit Akış Trendi', config: { chartType: 'line' } },
        { id: 'inflowOutflowChart', type: 'chart', title: 'Giriş vs Çıkış', config: { chartType: 'bar' } },
        { id: 'cashCategoriesChart', type: 'chart', title: 'Nakit Dağılımı', config: { chartType: 'pie' } }
      ],
      dataSchema: {
        requiredColumns: ['date', 'cash_inflow', 'cash_outflow', 'cash_balance'],
        optionalColumns: ['operating_cf', 'investing_cf', 'financing_cf']
      },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['finance', 'cashflow', 'liquidity']
    });
    
    // HOTEL TEMPLATES
    this.register({
      id: 'hotel-management',
      name: 'Otel Yönetim Paneli',
      sector: 'hotel',
      category: 'operational',
      templateType: 'hotel-ops',
      description: 'Doluluk, gelir ve operasyonel metrikler',
      icon: '🏨',
      defaultLayout: { kpiCount: 6, chartCount: 3, gridLayout: '6-kpi-3-chart' },
      defaultWidgets: [
        { id: 'occupancy', type: 'kpi', title: 'Doluluk Oranı', config: { format: 'percentage' } },
        { id: 'adr', type: 'kpi', title: 'Ort. Oda Fiyatı', config: { format: 'currency' } },
        { id: 'revpar', type: 'kpi', title: 'RevPAR', config: { format: 'currency' } },
        { id: 'roomRevenue', type: 'kpi', title: 'Oda Geliri', config: { format: 'currency' } },
        { id: 'satisfaction', type: 'kpi', title: 'Müşteri Puanı', config: { format: 'decimal' } },
        { id: 'availability', type: 'kpi', title: 'Müsait Oda', config: { format: 'number' } },
        { id: 'occupancyChart', type: 'chart', title: 'Doluluk Trendi', config: { chartType: 'line' } },
        { id: 'revenueChart', type: 'chart', title: 'Gelir Dağılımı', config: { chartType: 'bar' } },
        { id: 'roomTypeChart', type: 'chart', title: 'Oda Tipi Dağılımı', config: { chartType: 'pie' } }
      ],
      dataSchema: { requiredColumns: ['date', 'occupancy_rate', 'adr', 'total_rooms'], optionalColumns: ['revpar', 'satisfaction_score'] },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['hotel', 'hospitality', 'revenue']
    });

    // MANUFACTURING TEMPLATES
    this.register({
      id: 'manufacturing',
      name: 'Üretim Dashboard',
      sector: 'manufacturing',
      category: 'operational',
      templateType: 'manufacturing-ops',
      description: 'Üretim ve verimlilik göstergeleri',
      icon: '🏭',
      defaultLayout: { kpiCount: 6, chartCount: 3, gridLayout: '6-kpi-3-chart' },
      defaultWidgets: [
        { id: 'output', type: 'kpi', title: 'Üretim Miktarı', config: { format: 'number' } },
        { id: 'oee', type: 'kpi', title: 'OEE %', config: { format: 'percentage' } },
        { id: 'defects', type: 'kpi', title: 'Hata Oranı', config: { format: 'percentage' } },
        { id: 'downtime', type: 'kpi', title: 'Duruş Süresi', config: { format: 'number' } },
        { id: 'productivity', type: 'kpi', title: 'Verimlilik', config: { format: 'percentage' } },
        { id: 'capacity', type: 'kpi', title: 'Kapasite Kullanım', config: { format: 'percentage' } },
        { id: 'productionChart', type: 'chart', title: 'Üretim Trendi', config: { chartType: 'line' } },
        { id: 'oeeChart', type: 'chart', title: 'OEE Analizi', config: { chartType: 'bar' } },
        { id: 'defectChart', type: 'chart', title: 'Hata Dağılımı', config: { chartType: 'pie' } }
      ],
      dataSchema: { requiredColumns: ['date', 'production_output', 'oee', 'defect_rate'], optionalColumns: ['downtime_hours', 'capacity_utilization'] },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['manufacturing', 'production', 'oee']
    });

    // SALES & MARKETING TEMPLATES
    this.register({
      id: 'sales',
      name: 'Satış Dashboard',
      sector: 'sales',
      category: 'sales',
      templateType: 'sales-performance',
      description: 'Satış performansı ve pipeline',
      icon: '📊',
      defaultLayout: { kpiCount: 6, chartCount: 3, gridLayout: '6-kpi-3-chart' },
      defaultWidgets: [
        { id: 'revenue', type: 'kpi', title: 'Toplam Satış', config: { format: 'currency' } },
        { id: 'deals', type: 'kpi', title: 'Kapanan Anlaşma', config: { format: 'number' } },
        { id: 'pipeline', type: 'kpi', title: 'Pipeline Değeri', config: { format: 'currency' } },
        { id: 'conversion', type: 'kpi', title: 'Dönüşüm Oranı', config: { format: 'percentage' } },
        { id: 'avgDealSize', type: 'kpi', title: 'Ort. Anlaşma Tutarı', config: { format: 'currency' } },
        { id: 'salesCycle', type: 'kpi', title: 'Satış Döngüsü', config: { format: 'number' } },
        { id: 'revenueChart', type: 'chart', title: 'Satış Trendi', config: { chartType: 'line' } },
        { id: 'pipelineChart', type: 'chart', title: 'Pipeline Performansı', config: { chartType: 'bar' } },
        { id: 'dealStageChart', type: 'chart', title: 'Anlaşma Aşamaları', config: { chartType: 'pie' } }
      ],
      dataSchema: { requiredColumns: ['date', 'revenue', 'deals_closed', 'pipeline_value'], optionalColumns: ['conversion_rate', 'avg_deal_size'] },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['sales', 'pipeline', 'revenue']
    });

    // HR TEMPLATES
    this.register({
      id: 'hr',
      name: 'İnsan Kaynakları Dashboard',
      sector: 'hr',
      category: 'hr',
      templateType: 'hr-metrics',
      description: 'Personel yönetimi ve HR KPI',
      icon: '👥',
      defaultLayout: { kpiCount: 6, chartCount: 3, gridLayout: '6-kpi-3-chart' },
      defaultWidgets: [
        { id: 'headcount', type: 'kpi', title: 'Toplam Personel', config: { format: 'number' } },
        { id: 'turnover', type: 'kpi', title: 'İşten Ayrılma %', config: { format: 'percentage' } },
        { id: 'avgTenure', type: 'kpi', title: 'Ort. Çalışma Süresi', config: { format: 'number' } },
        { id: 'satisfaction', type: 'kpi', title: 'Çalışan Memnuniyeti', config: { format: 'decimal' } },
        { id: 'timeToHire', type: 'kpi', title: 'İşe Alım Süresi', config: { format: 'number' } },
        { id: 'trainingHours', type: 'kpi', title: 'Eğitim Saati', config: { format: 'number' } },
        { id: 'headcountChart', type: 'chart', title: 'Personel Trendi', config: { chartType: 'line' } },
        { id: 'turnoverChart', type: 'chart', title: 'Ayrılma Analizi', config: { chartType: 'bar' } },
        { id: 'departmentChart', type: 'chart', title: 'Departman Dağılımı', config: { chartType: 'pie' } }
      ],
      dataSchema: { requiredColumns: ['date', 'headcount', 'turnover_rate'], optionalColumns: ['satisfaction_score', 'training_hours'] },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['hr', 'people', 'talent']
    });

    // AGRICULTURE TEMPLATES
    this.register({
      id: 'agriculture',
      name: 'Tarım Operasyon Paneli',
      sector: 'agriculture',
      category: 'operational',
      templateType: 'agriculture-ops',
      description: 'Mahsul verimliliği ve satış performansı',
      icon: '🌾',
      defaultLayout: { kpiCount: 6, chartCount: 3, gridLayout: '6-kpi-3-chart' },
      defaultWidgets: [
        { id: 'yield', type: 'kpi', title: 'Hasat Verimi', config: { format: 'number' } },
        { id: 'area', type: 'kpi', title: 'Ekim Alanı', config: { format: 'number' } },
        { id: 'revenue', type: 'kpi', title: 'Satış Geliri', config: { format: 'currency' } },
        { id: 'costPerUnit', type: 'kpi', title: 'Birim Maliyet', config: { format: 'currency' } },
        { id: 'soilHealth', type: 'kpi', title: 'Toprak Sağlığı', config: { format: 'number' } },
        { id: 'weatherIndex', type: 'kpi', title: 'Hava Koşulu', config: { format: 'number' } },
        { id: 'yieldChart', type: 'chart', title: 'Verim Trendi', config: { chartType: 'line' } },
        { id: 'revenueChart', type: 'chart', title: 'Gelir Analizi', config: { chartType: 'bar' } },
        { id: 'cropChart', type: 'chart', title: 'Ürün Dağılımı', config: { chartType: 'pie' } }
      ],
      dataSchema: { requiredColumns: ['date', 'yield_tons', 'area_hectares', 'revenue'], optionalColumns: ['cost_per_unit', 'soil_health'] },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['agriculture', 'farming', 'yield']
    });

    // ECOMMERCE TEMPLATES
    this.register({
      id: 'ecommerce',
      name: 'E-Ticaret Dashboard',
      sector: 'ecommerce',
      category: 'sales',
      templateType: 'ecommerce-kpi',
      description: 'Online satış ve dijital performans',
      icon: '🛒',
      defaultLayout: { kpiCount: 6, chartCount: 3, gridLayout: '6-kpi-3-chart' },
      defaultWidgets: [
        { id: 'revenue', type: 'kpi', title: 'Online Satış', config: { format: 'currency' } },
        { id: 'orders', type: 'kpi', title: 'Sipariş Sayısı', config: { format: 'number' } },
        { id: 'avgOrderValue', type: 'kpi', title: 'Ort. Sipariş Tutarı', config: { format: 'currency' } },
        { id: 'conversion', type: 'kpi', title: 'Dönüşüm Oranı', config: { format: 'percentage' } },
        { id: 'cartAbandonment', type: 'kpi', title: 'Sepet Terk %', config: { format: 'percentage' } },
        { id: 'customerAcquisition', type: 'kpi', title: 'Müşteri Kazanım', config: { format: 'currency' } },
        { id: 'salesChart', type: 'chart', title: 'Satış Trendi', config: { chartType: 'line' } },
        { id: 'orderChart', type: 'chart', title: 'Sipariş Analizi', config: { chartType: 'bar' } },
        { id: 'categoryChart', type: 'chart', title: 'Kategori Dağılımı', config: { chartType: 'pie' } }
      ],
      dataSchema: { requiredColumns: ['date', 'revenue', 'orders', 'visitors'], optionalColumns: ['conversion_rate', 'cart_abandonment'] },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['ecommerce', 'online', 'digital']
    });

    // EDUCATION TEMPLATES
    this.register({
      id: 'education',
      name: 'Eğitim Dashboard',
      sector: 'education',
      category: 'operational',
      templateType: 'education-performance',
      description: 'Öğrenci ve akademik performans',
      icon: '🎓',
      defaultLayout: { kpiCount: 6, chartCount: 3, gridLayout: '6-kpi-3-chart' },
      defaultWidgets: [
        { id: 'students', type: 'kpi', title: 'Öğrenci Sayısı', config: { format: 'number' } },
        { id: 'retention', type: 'kpi', title: 'Elde Tutma', config: { format: 'percentage' } },
        { id: 'graduation', type: 'kpi', title: 'Mezuniyet Oranı', config: { format: 'percentage' } },
        { id: 'satisfaction', type: 'kpi', title: 'Memnuniyet', config: { format: 'decimal' } },
        { id: 'avgGrade', type: 'kpi', title: 'Ortalama Not', config: { format: 'decimal' } },
        { id: 'revenue', type: 'kpi', title: 'Eğitim Geliri', config: { format: 'currency' } },
        { id: 'enrollmentChart', type: 'chart', title: 'Kayıt Trendi', config: { chartType: 'line' } },
        { id: 'performanceChart', type: 'chart', title: 'Akademik Performans', config: { chartType: 'bar' } },
        { id: 'programChart', type: 'chart', title: 'Program Dağılımı', config: { chartType: 'pie' } }
      ],
      dataSchema: { requiredColumns: ['date', 'student_count', 'retention_rate'], optionalColumns: ['graduation_rate', 'avg_grade'] },
      roleVisibility: 'both',
      isTemplate: true,
      createdBy: 'system',
      tags: ['education', 'academic', 'students']
    });
  }
  
  register(template: DashboardTemplate): void {
    this.templates.set(template.id, template);
  }
  
  get(id: string): DashboardTemplate | undefined {
    return this.templates.get(id);
  }
  
  getAll(): DashboardTemplate[] {
    return Array.from(this.templates.values());
  }
  
  getBySector(sector: DashboardSector): DashboardTemplate[] {
    return this.getAll().filter(t => t.sector === sector);
  }
  
  getByCategory(category: DashboardCategory): DashboardTemplate[] {
    return this.getAll().filter(t => t.category === category);
  }
  
  getTemplates(): DashboardTemplate[] {
    return this.getAll().filter(t => t.isTemplate);
  }
  
  cloneTemplate(templateId: string, userId: string): DashboardTemplate | null {
    const template = this.get(templateId);
    if (!template) return null;
    
    const cloned: DashboardTemplate = {
      ...template,
      id: `${templateId}-${Date.now()}`,
      isTemplate: false,
      createdBy: userId
    };
    
    this.register(cloned);
    return cloned;
  }
}

export const dashboardTemplateRegistry = new DashboardTemplateRegistry();
export default dashboardTemplateRegistry;
