import type { ChartType, ChartIntent } from '../../utils/chartWizard';
import {
  Activity,
  AreaChart,
  BarChart3,
  Gauge,
  Grid3X3,
  Layers,
  LayoutDashboard,
  LineChart,
  PieChart,
  Table,
  TrendingDown,
} from 'lucide-react';

export const CHART_META: Record<
  ChartType,
  { labelTr: string; labelEn: string; Icon: React.ElementType }
> = {
  line: { labelTr: 'Line', labelEn: 'Line', Icon: LineChart },
  bar: { labelTr: 'Bar', labelEn: 'Bar', Icon: BarChart3 },
  stacked_bar: { labelTr: 'Stacked', labelEn: 'Stacked', Icon: Layers },
  area: { labelTr: 'Area', labelEn: 'Area', Icon: AreaChart },
  area_line: { labelTr: 'Area + Line', labelEn: 'Area + Line', Icon: Activity },
  donut: { labelTr: 'Donut', labelEn: 'Donut', Icon: PieChart },
  table: { labelTr: 'Table', labelEn: 'Table', Icon: Table },
  heatmap: { labelTr: 'Heatmap', labelEn: 'Heatmap', Icon: Grid3X3 },
  combo: { labelTr: 'Combo', labelEn: 'Combo', Icon: Activity },
  waterfall: { labelTr: 'Waterfall', labelEn: 'Waterfall', Icon: TrendingDown },
  kpi: { labelTr: 'KPI', labelEn: 'KPI', Icon: LayoutDashboard },
  gauge: { labelTr: 'Gauge', labelEn: 'Gauge', Icon: Gauge },
};

// Wizard Step-1 MUST only show these 5 intents (per product spec).
export type WizardIntentChoice = Extract<
  ChartIntent,
  'trend' | 'compare' | 'distribution' | 'flow' | 'detail'
>;

export const INTENT_META: Record<
  WizardIntentChoice,
  { labelTr: string; labelEn: string; Icon: React.ElementType; descriptionTr: string; descriptionEn: string }
> = {
  trend: {
    labelTr: 'Trend',
    labelEn: 'Trend',
    Icon: LineChart,
    descriptionTr: 'Zaman içindeki değişimi',
    descriptionEn: 'Change over time',
  },
  compare: {
    labelTr: 'Karşılaştırma',
    labelEn: 'Comparison',
    Icon: BarChart3,
    descriptionTr: 'Kategorileri karşılaştırmak',
    descriptionEn: 'Compare categories',
  },
  distribution: {
    labelTr: 'Dağılım',
    labelEn: 'Distribution',
    Icon: PieChart,
    descriptionTr: 'Parça – bütün ilişkisi',
    descriptionEn: 'Part-to-whole',
  },
  flow: {
    labelTr: 'Finansal Akış',
    labelEn: 'Financial Flow',
    Icon: TrendingDown,
    descriptionTr: 'Gelir → gider → kâr',
    descriptionEn: 'Revenue → cost → profit',
  },
  detail: {
    labelTr: 'Detay',
    labelEn: 'Detail',
    Icon: Table,
    descriptionTr: 'Net rakamları görmek',
    descriptionEn: 'Read exact numbers',
  },
};

