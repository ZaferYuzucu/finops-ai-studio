import React, { useMemo } from 'react';
import type { ChartType, DatasetProfile } from '../../utils/chartWizard';
import { getChartWarnings } from '../../utils/chartWizard';
import { CHART_META } from './chartMeta';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

export function ChartSelectionPanel(props: {
  profile: DatasetProfile;
  value: ChartType;
  onChange: (next: ChartType) => void;
  className?: string;
}) {
  const { profile, value, onChange, className } = props;
  const { i18n } = useTranslation();
  const locale = i18n.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en';

  const charts: ChartType[] = useMemo(
    () => ['line', 'bar', 'stacked_bar', 'area', 'donut', 'table', 'heatmap', 'combo', 'waterfall', 'kpi'],
    []
  );

  const warnings = getChartWarnings(value, profile, locale);

  return (
    <div className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {charts.map((k) => {
          const meta = CHART_META[k];
          const isActive = value === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => onChange(k)}
              className={[
                'group rounded-2xl border p-4 text-left transition-all',
                'bg-white dark:bg-slate-900',
                isActive
                  ? 'border-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900'
                  : 'border-gray-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-slate-500',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <div
                  className={[
                    'w-10 h-10 rounded-xl flex items-center justify-center border',
                    isActive
                      ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-900'
                      : 'bg-indigo-50 border-indigo-100 dark:bg-slate-800 dark:border-slate-700',
                  ].join(' ')}
                >
                  <meta.Icon className={isActive ? 'w-5 h-5 text-emerald-700' : 'w-5 h-5 text-indigo-700'} />
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-gray-900 dark:text-slate-100">
                    {locale === 'tr' ? meta.labelTr : meta.labelEn}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">
                    {k}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {warnings.length > 0 && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-300 mt-0.5" />
            <div>
              <div className="font-extrabold text-amber-900 dark:text-amber-100">
                {locale === 'tr' ? 'Akıllı Uyarılar' : 'Smart Warnings'}
              </div>
              <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-amber-900 dark:text-amber-100">
                {warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

