import type { ChartIntent } from './chartWizard';
import type { DashboardOutput } from '../types/dashboardSpec';

export interface AiParsedRequest {
  intent: ChartIntent;
  output: DashboardOutput;
  scope?: 'multi_business';
  userRole?: 'staff' | 'manager' | 'cfo' | 'admin';
  reason: string;
}

export function parseAiChartRequest(text: string): AiParsedRequest {
  const q = (text || '').toLowerCase();

  // Output
  const output: DashboardOutput =
    q.includes('pdf') || q.includes('rapor') || q.includes('print') ? 'pdf' : 'live';

  const scope: 'multi_business' | undefined =
    q.includes('tüm işletme') ||
    q.includes('tum isletme') ||
    q.includes('all businesses') ||
    q.includes('multi business') ||
    q.includes('multi-business')
      ? 'multi_business'
      : undefined;

  const userRole: AiParsedRequest['userRole'] =
    q.includes('garson') || q.includes('waiter') || q.includes('personel') || q.includes('staff')
      ? 'staff'
      : q.includes('cfo')
        ? 'cfo'
        : q.includes('admin')
          ? 'admin'
          : 'manager';

  // Intent (very simple keyword mapping; explainable MVP)
  const isTarget =
    q.includes('hedef') || q.includes('target') || q.includes('goal') || q.includes('quota');

  const isTrend =
    q.includes('trend') ||
    q.includes('zaman') ||
    q.includes('son 3 ay') ||
    q.includes('son üç ay') ||
    q.includes('son 90') ||
    q.includes('last 3 months');

  const intent: ChartIntent = isTarget
    ? 'target_tracking'
    : scope === 'multi_business' && isTrend
      ? 'trend_analysis'
      : isTrend
        ? 'trend'
        : q.includes('kıyas') || q.includes('karsil') || q.includes('compare') || q.includes('vs')
          ? 'compare'
          : q.includes('dağılım') || q.includes('dagilim') || q.includes('pay') || q.includes('share')
            ? 'distribution'
            : q.includes('akış') || q.includes('akis') || q.includes('waterfall') || q.includes('köprü') || q.includes('bridge')
              ? 'flow'
              : 'detail';

  const reason =
    intent === 'target_tracking'
      ? 'Single target performance tracking'
      : intent === 'trend_analysis'
        ? 'Aggregate time-series analysis'
        : output === 'pdf'
          ? 'PDF-style reporting requested'
          : 'Live interactive analysis requested';

  return { intent, output, scope, userRole, reason };
}

