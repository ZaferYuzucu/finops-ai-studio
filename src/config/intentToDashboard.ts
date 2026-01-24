// Intent-to-Dashboard Mapping (Single Source of Truth)
export const INTENT_TO_DASHBOARD = {
  'cash-flow': {
    label: 'Cash Flow Overview',
    icon: '💰',
    description: 'Track income, expenses, and cash position',
    dashboardId: 'cashflow',
    kpiCount: 6,
    chartTypes: ['line', 'bar', 'pie'],
  },
  'profitability': {
    label: 'Profitability & Margin',
    icon: '📈',
    description: 'Monitor profit margins and ROE',
    dashboardId: 'restaurant-finance',
    kpiCount: 6,
    chartTypes: ['line', 'pie', 'bar'],
  },
  'sales': {
    label: 'Sales Performance',
    icon: '🎯',
    description: 'Track sales trends and targets',
    dashboardId: 'restaurant-sales',
    kpiCount: 6,
    chartTypes: ['line', 'bar', 'pie'],
  },
  'cost-control': {
    label: 'Cost Control & Expenses',
    icon: '💳',
    description: 'Manage expenses and cost efficiency',
    dashboardId: 'restaurant-labor',
    kpiCount: 6,
    chartTypes: ['bar', 'pie', 'line'],
  },
  'risk-alerts': {
    label: 'Risk & Alerts',
    icon: '⚠️',
    description: 'Identify risks and anomalies',
    dashboardId: 'finance',
    kpiCount: 6,
    chartTypes: ['line', 'bar', 'pie'],
  },
  'operations': {
    label: 'Operational Efficiency',
    icon: '⚙️',
    description: 'Optimize operations and productivity',
    dashboardId: 'manufacturing',
    kpiCount: 6,
    chartTypes: ['bar', 'line', 'pie'],
  },
} as const;

export type IntentKey = keyof typeof INTENT_TO_DASHBOARD;
