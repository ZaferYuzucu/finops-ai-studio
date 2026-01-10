import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Wand2,
} from 'lucide-react';
import type { ChartIntent, ChartType, DatasetProfile } from '../../utils/chartWizard';
import { recommendChart } from '../../utils/chartWizard';
import { CHART_META, INTENT_META, type WizardIntentChoice } from './chartMeta';
import { wizardResultToDashboardSpec } from '../../utils/dashboardSpec';
import type { DashboardOutput } from '../../types/dashboardSpec';

export interface ChartWizardResult {
  intent: ChartIntent;
  recommendedChart: ChartType;
  selectedChart: ChartType;
  icon: string;
  output: 'live' | 'pdf';
  reason: string;
  settings: {
    dateRange: '30d' | '90d' | 'ytd' | 'all';
    topN: number;
    bottomN: number;
    stacked: boolean;
    includePdfTable: boolean;
  };
  renderHints: {
    tooltip: boolean;
    showValueLabels: boolean;
    tableRequired: boolean;
    dataNote: boolean;
    filtersInteractive: boolean;
    tableOptional: boolean;
  };
}

export function ChartChoiceWizard(props: {
  profile: DatasetProfile;
  onComplete: (result: ChartWizardResult) => void;
  onCancel?: () => void;
  prefill?: {
    intent?: ChartIntent;
    output?: DashboardOutput;
    openToStep?: 1 | 2 | 3 | 4 | 5;
  };
}) {
  const { profile, onComplete, onCancel, prefill } = props;
  const { i18n } = useTranslation();
  const locale = i18n.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en';

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(prefill?.openToStep ?? 1);
  const [intent, setIntent] = useState<ChartIntent>(prefill?.intent ?? 'trend');
  const [selectedChart, setSelectedChart] = useState<ChartType>('line');
  const [output, setOutput] = useState<'live' | 'pdf'>(prefill?.output ?? 'live');

  const [settings, setSettings] = useState<ChartWizardResult['settings']>({
    dateRange: '90d',
    topN: 10,
    bottomN: 0,
    stacked: false,
    includePdfTable: true,
  });

  const recommendation = useMemo(
    () => recommendChart(intent, profile, locale, undefined, undefined, output),
    [intent, profile, locale, output]
  );

  const analysisLines = useMemo(() => {
    const lines: string[] = [];
    if (profile.hasDate) {
      lines.push(locale === 'tr' ? 'Bu veri zaman serisi içeriyor.' : 'This dataset contains a time series.');
    } else {
      lines.push(locale === 'tr' ? 'Bu veride zaman ekseni tespit edilmedi.' : 'No time axis detected.');
    }
    if (profile.hasCategory) {
      lines.push(locale === 'tr' ? 'Kategorik kırılım mevcut.' : 'Categorical breakdown detected.');
    } else {
      lines.push(locale === 'tr' ? 'Kategori alanı tespit edilmedi.' : 'No category field detected.');
    }
    if (profile.isRatio) {
      lines.push(locale === 'tr' ? 'Oran / yüzde türü metrikler mevcut.' : 'Ratio / percentage metrics detected.');
    }
    if (profile.hasBridgeSteps) {
      lines.push(locale === 'tr' ? 'Başlangıç → adımlar → sonuç yapısı uygun.' : 'Start → steps → result structure detected.');
    }
    if (profile.hasTargetActual && profile.singleEntity) {
      lines.push(
        locale === 'tr'
          ? 'Bu veri hedef takibi içeriyor (tek hedef / tek kişi).'
          : 'This data supports target tracking (single target / single entity).'
      );
    }
    if (profile.multiBusiness) {
      lines.push(
        locale === 'tr'
          ? `Çoklu işletme tespit edildi (${profile.businessCount ?? 'n/a'}).`
          : `Multi-business detected (${profile.businessCount ?? 'n/a'}).`
      );
    }
    if (profile.rowCount > 100) {
      lines.push(
        locale === 'tr'
          ? `Satır sayısı yüksek (${profile.rowCount}). Tablo + filtre önerilir.`
          : `High row count (${profile.rowCount}). Consider Table + filters.`
      );
    }
    return lines;
  }, [profile, locale]);

  const ui = useMemo(
    () =>
      locale === 'tr'
        ? {
            title: 'Grafik Seçimi Sihirbazı',
            subtitle: 'Fino, doğru grafiği bulmana yardım eder — seni yormadan.',
            step: (n: number) => `Adım ${n} / 5`,
            next: 'İleri',
            back: 'Geri',
            cancel: 'İptal',
            add: "Dashboard’a Ekle",
            step1Title: 'Ne görmek istiyorsun?',
            step2Title: 'Veri Yapısı Analizi',
            step3Title: 'Önerilen Grafik',
            step4Title: 'Çıktı Tipi',
            step5Title: 'Önizleme & Ekle',
            recommended: 'Önerilen',
            alternatives: 'Alternatifler',
            why: 'Neden bu grafik?',
            outputLive: 'Canlı Dashboard',
            outputPdf: 'PDF Rapor',
            outputLiveDesc: 'Tooltip açık, filtreler interaktif, tablo opsiyonel.',
            outputPdfDesc: 'Tooltip kapalı, değer etiketleri açık, alt tablo + veri notu zorunlu.',
          }
        : {
            title: 'Chart Selection Wizard',
            subtitle: 'Fino helps you choose the right chart—without friction.',
            step: (n: number) => `Step ${n} / 5`,
            next: 'Next',
            back: 'Back',
            cancel: 'Cancel',
            add: 'Add to Dashboard',
            step1Title: 'What do you want to see?',
            step2Title: 'Dataset Analysis',
            step3Title: 'Recommended Chart',
            step4Title: 'Output Type',
            step5Title: 'Preview & Add',
            recommended: 'Recommended',
            alternatives: 'Alternatives',
            why: 'Why this chart?',
            outputLive: 'Live Dashboard',
            outputPdf: 'PDF Report',
            outputLiveDesc: 'Tooltips on, interactive filters, table optional.',
            outputPdfDesc: 'Tooltips off, value labels on, table + data note required.',
          },
    [locale]
  );

  const canNext = useMemo(() => {
    if (step === 1) return !!intent;
    if (step === 2) return true;
    if (step === 3) return true;
    if (step === 4) return true;
    return true;
  }, [step, intent]);

  const goNext = () => {
    if (!canNext) return;
    if (step === 2) {
      // prime recommended selection
      setSelectedChart(recommendation.recommended);
    }
    if (step === 4) {
      // Apply automatic PDF vs Live behavior without extra user decisions
      if (output === 'pdf') {
        setSettings((s) => ({ ...s, includePdfTable: true }));
        if (selectedChart === 'gauge') {
          // PDF rule: Gauge is not recommended -> fallback to KPI
          setSelectedChart('kpi');
        }
      }
    }
    setStep((s) => (s < 5 ? ((s + 1) as any) : s));
  };

  const goBack = () => setStep((s) => (s > 1 ? ((s - 1) as any) : s));

  const handleComplete = () => {
    const iconName = (CHART_META[selectedChart] as any)?.Icon?.name || '';
    const renderHints =
      output === 'pdf'
        ? {
            tooltip: false,
            showValueLabels: true,
            tableRequired: true,
            dataNote: true,
            filtersInteractive: false,
            tableOptional: false,
          }
        : {
            tooltip: true,
            showValueLabels: false,
            tableRequired: false,
            dataNote: false,
            filtersInteractive: true,
            tableOptional: true,
          };
    const result: ChartWizardResult = {
      intent,
      recommendedChart: recommendation.recommended,
      selectedChart,
      icon: iconName,
      output,
      reason: recommendation.reason,
      settings,
      renderHints,
    };
    onComplete(result);
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 dark:bg-indigo-950 dark:border-indigo-900">
              <Wand2 className="w-4 h-4 text-indigo-700 dark:text-indigo-200" />
              <span className="text-sm font-bold text-indigo-900 dark:text-indigo-100">
                {ui.step(step)}
              </span>
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100">
              {ui.title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-slate-300">
              {ui.subtitle}
            </p>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-sm font-bold text-gray-800 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
            >
              {ui.cancel}
            </button>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-slate-100">
              {ui.step1Title}
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {(['trend', 'compare', 'distribution', 'flow', 'detail'] as WizardIntentChoice[]).map((k) => {
                const meta = INTENT_META[k];
                const active = intent === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setIntent(k)}
                    className={[
                      'rounded-2xl border p-4 text-left transition-all',
                      active
                        ? 'border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200 dark:bg-emerald-950 dark:ring-emerald-900'
                        : 'border-gray-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <meta.Icon className={active ? 'w-6 h-6 text-emerald-700' : 'w-6 h-6 text-indigo-700'} />
                      <div className="font-extrabold text-gray-900 dark:text-slate-100">
                        {locale === 'tr' ? meta.labelTr : meta.labelEn}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                      {locale === 'tr' ? meta.descriptionTr : meta.descriptionEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-slate-100">
              {ui.step2Title}
            </h3>
            <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-700 dark:text-indigo-200 mt-0.5" />
                <div>
                  <div className="font-extrabold text-gray-900 dark:text-slate-100">
                    {locale === 'tr' ? 'Kısa analiz' : 'Quick analysis'}
                  </div>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-slate-200">
                    {analysisLines.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-slate-100">
              {ui.step3Title}
            </h3>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-emerald-200 text-emerald-800 text-xs font-extrabold dark:bg-emerald-950 dark:border-emerald-900 dark:text-emerald-200">
                        <CheckCircle2 className="w-4 h-4" /> {ui.recommended}
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        {(() => {
                          const meta = CHART_META[recommendation.recommended];
                          return (
                            <>
                              <meta.Icon className="w-7 h-7 text-emerald-700 dark:text-emerald-200" />
                              <div className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
                                {locale === 'tr' ? meta.labelTr : meta.labelEn}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedChart(recommendation.recommended)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-extrabold hover:bg-emerald-700"
                    >
                      {locale === 'tr' ? 'Seç' : 'Select'}
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                  <div className="font-extrabold text-gray-900 dark:text-slate-100">
                    {ui.alternatives}
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recommendation.alternatives.map((k) => {
                      const meta = CHART_META[k];
                      const active = selectedChart === k;
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setSelectedChart(k)}
                          className={[
                            'rounded-2xl border p-4 text-left transition-all',
                            active
                              ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200 dark:bg-indigo-950 dark:ring-indigo-900'
                              : 'border-gray-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-slate-500',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-3">
                            <meta.Icon className={active ? 'w-6 h-6 text-indigo-700' : 'w-6 h-6 text-gray-700 dark:text-slate-200'} />
                            <div className="font-extrabold text-gray-900 dark:text-slate-100">
                              {locale === 'tr' ? meta.labelTr : meta.labelEn}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                <div className="font-extrabold text-gray-900 dark:text-slate-100">{ui.why}</div>
                <div className="mt-2 text-sm text-gray-700 dark:text-slate-200">
                  {recommendation.reason}
                </div>
                {recommendation.warnings.length > 0 && (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-200 mt-0.5" />
                      <div className="text-sm font-extrabold text-amber-900 dark:text-amber-100">
                        {locale === 'tr' ? 'Uyarılar' : 'Warnings'}
                      </div>
                    </div>
                    <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-amber-900 dark:text-amber-100">
                      {recommendation.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-slate-100">
              {ui.step4Title}
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOutput('live')}
                className={[
                  'rounded-2xl border p-5 text-left transition-all',
                  output === 'live'
                    ? 'border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200 dark:bg-emerald-950 dark:ring-emerald-900'
                    : 'border-gray-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500',
                ].join(' ')}
              >
                <div className="font-extrabold text-gray-900 dark:text-slate-100">{ui.outputLive}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-slate-300">{ui.outputLiveDesc}</div>
              </button>
              <button
                type="button"
                onClick={() => setOutput('pdf')}
                className={[
                  'rounded-2xl border p-5 text-left transition-all',
                  output === 'pdf'
                    ? 'border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200 dark:bg-emerald-950 dark:ring-emerald-900'
                    : 'border-gray-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500',
                ].join(' ')}
              >
                <div className="font-extrabold text-gray-900 dark:text-slate-100">{ui.outputPdf}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-slate-300">{ui.outputPdfDesc}</div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-slate-100">
              {ui.step5Title}
            </h3>
            <div className="mt-4 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold text-gray-900 dark:text-slate-100">
                    {locale === 'tr' ? 'Seçimin' : 'Your selection'}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    {(() => {
                      const meta = CHART_META[selectedChart];
                      return (
                        <>
                          <meta.Icon className="w-7 h-7 text-indigo-700 dark:text-indigo-200" />
                          <div className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
                            {locale === 'tr' ? meta.labelTr : meta.labelEn}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                    {recommendation.reason}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-gray-500 dark:text-slate-400">
                    {locale === 'tr' ? 'AI çıktısı örneği' : 'AI-ready output'}
                  </div>
                  <pre className="mt-2 text-xs bg-white/70 border border-gray-200 rounded-xl p-3 text-gray-800 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 overflow-auto max-w-[360px]">
{JSON.stringify(
  wizardResultToDashboardSpec({
    intent,
    recommendedChart: recommendation.recommended,
    selectedChart,
    icon: (CHART_META[selectedChart] as any)?.Icon?.name || '',
    output,
    reason: recommendation.reason,
    settings,
    renderHints:
      output === 'pdf'
        ? {
            tooltip: false,
            showValueLabels: true,
            tableRequired: true,
            dataNote: true,
            filtersInteractive: false,
            tableOptional: false,
          }
        : {
            tooltip: true,
            showValueLabels: false,
            tableRequired: false,
            dataNote: false,
            filtersInteractive: true,
            tableOptional: true,
          },
  }),
  null,
  2
)}
                  </pre>
                </div>
              </div>

              {/* Minimal detail settings (kept, but auto-locked by output type) */}
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="font-extrabold text-gray-900 dark:text-slate-100">
                  {locale === 'tr' ? 'Detay ayarları' : 'Minimal settings'}
                </div>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-bold text-gray-700 dark:text-slate-200">
                      {locale === 'tr' ? 'Tarih aralığı' : 'Date range'}
                    </div>
                    <select
                      disabled={!profile.hasDate}
                      value={settings.dateRange}
                      onChange={(e) => setSettings((s) => ({ ...s, dateRange: e.target.value as any }))}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 disabled:opacity-50"
                    >
                      <option value="30d">{locale === 'tr' ? 'Son 30 gün' : 'Last 30 days'}</option>
                      <option value="90d">{locale === 'tr' ? 'Son 90 gün' : 'Last 90 days'}</option>
                      <option value="ytd">{locale === 'tr' ? 'Yıl başından beri' : 'Year to date'}</option>
                      <option value="all">{locale === 'tr' ? 'Tüm zamanlar' : 'All time'}</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-gray-700 dark:text-slate-200">Top / Bottom N</div>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-200">
                        Top N
                        <input
                          type="number"
                          min={0}
                          max={50}
                          disabled={!profile.hasCategory}
                          value={settings.topN}
                          onChange={(e) => setSettings((s) => ({ ...s, topN: Number(e.target.value) }))}
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 disabled:opacity-50"
                        />
                      </label>
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-200">
                        Bottom N
                        <input
                          type="number"
                          min={0}
                          max={50}
                          disabled={!profile.hasCategory}
                          value={settings.bottomN}
                          onChange={(e) => setSettings((s) => ({ ...s, bottomN: Number(e.target.value) }))}
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 disabled:opacity-50"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.stacked}
                        onChange={(e) => setSettings((s) => ({ ...s, stacked: e.target.checked }))}
                        className="w-5 h-5 rounded border-gray-300"
                        disabled={!(selectedChart === 'bar' || selectedChart === 'stacked_bar')}
                      />
                      <div>
                        <div className="font-extrabold text-gray-900 dark:text-slate-100">
                          {locale === 'tr' ? 'Yığılmış mı?' : 'Stacked?'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-slate-300">
                          {locale === 'tr'
                            ? 'Bar/Stacked seçimlerinde kompozisyon göstermek için.'
                            : 'Show composition on Bar/Stacked charts.'}
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.includePdfTable}
                        onChange={(e) => setSettings((s) => ({ ...s, includePdfTable: e.target.checked }))}
                        className="w-5 h-5 rounded border-gray-300"
                        disabled={output === 'pdf'}
                      />
                      <div>
                        <div className="font-extrabold text-gray-900 dark:text-slate-100">
                          {locale === 'tr' ? 'PDF’te alt tablo' : 'PDF bottom table'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-slate-300">
                          {output === 'pdf'
                            ? locale === 'tr'
                              ? 'PDF çıktısında zorunlu (otomatik).'
                              : 'Required for PDF output (automatic).'
                            : locale === 'tr'
                              ? 'Canlıda opsiyonel.'
                              : 'Optional for live.'}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="font-extrabold text-gray-900 dark:text-slate-100">
                  {locale === 'tr' ? 'Canlı önizleme' : 'Live preview'}
                </div>
                <div className="mt-3 h-48 rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {output === 'pdf'
                    ? locale === 'tr'
                      ? 'PDF Önizleme (MVP): tooltip kapalı • etiketler açık • alt tablo + veri notu zorunlu'
                      : 'PDF Preview (MVP): tooltips off • value labels on • table + data note required'
                    : locale === 'tr'
                      ? 'Canlı Önizleme (MVP): tooltip açık • filtreler interaktif • tablo opsiyonel'
                      : 'Live Preview (MVP): tooltips on • interactive filters • table optional'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-extrabold hover:bg-gray-50 disabled:opacity-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
          >
            {ui.back}
          </button>
          {step < 5 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 disabled:opacity-50"
            >
              {ui.next} <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700"
            >
              {ui.add}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

