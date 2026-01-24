export type DashboardIntent = 
  | 'cash-flow'
  | 'profitability'
  | 'sales-performance'
  | 'cost-control'
  | 'risk-alerts'
  | 'operational-efficiency';

export type ViewLevel = 'executive' | 'detailed';
export type TimePeriod = 'daily' | 'weekly' | 'monthly';
export type Scope = 'single' | 'all';

export interface IntentMapping {
  intent: DashboardIntent;
  title: string;
  description: string;
  icon: string;
  factoryConfigId: string;
}

export const INTENT_MAPPINGS: IntentMapping[] = [
  {
    intent: 'cash-flow',
    title: 'Nakit Akışı',
    description: 'Para giriş-çıkışını ve likiditeyi takip et',
    icon: '💰',
    factoryConfigId: 'cashflow'
  },
  {
    intent: 'profitability',
    title: 'Karlılık & Marj',
    description: 'Kâr marjını ve finansal sağlığı analiz et',
    icon: '📈',
    factoryConfigId: 'finance'
  },
  {
    intent: 'sales-performance',
    title: 'Satış Performansı',
    description: 'Satış hedeflerini ve trendleri gör',
    icon: '🎯',
    factoryConfigId: 'sales'
  },
  {
    intent: 'cost-control',
    title: 'Maliyet & Giderler',
    description: 'Giderleri kontrol altında tut',
    icon: '💸',
    factoryConfigId: 'restaurant-finance'
  },
  {
    intent: 'risk-alerts',
    title: 'Risk & Uyarılar',
    description: 'Kritik metrikleri ve sapmaları izle',
    icon: '⚠️',
    factoryConfigId: 'finance'
  },
  {
    intent: 'operational-efficiency',
    title: 'Operasyonel Verimlilik',
    description: 'İşletme verimliliğini ölç',
    icon: '⚡',
    factoryConfigId: 'manufacturing'
  }
];
