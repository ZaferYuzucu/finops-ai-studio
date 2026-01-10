import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChartChoiceWizard } from '../components/chart-wizard/ChartChoiceWizard';
import { ChartSelectionPanel } from '../components/chart-wizard/ChartSelectionPanel';
import type { ChartType, DatasetProfile } from '../utils/chartWizard';
import { CHART_META } from '../components/chart-wizard/chartMeta';
import { X } from 'lucide-react';
import { parseAiChartRequest } from '../utils/aiChartIntent';

export default function ChartWizardDemoPage() {
  const { i18n } = useTranslation();
  const locale = i18n.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en';

  const [profile, setProfile] = useState<DatasetProfile>({
    hasDate: true,
    hasCategory: true,
    isRatio: false,
    hasBridgeSteps: false,
    rowCount: 365,
    categoryCount: 12,
    seriesCount: 3,
    hasTargetActual: false,
    singleEntity: false,
    multiBusiness: true,
    businessCount: 6,
    userRole: 'manager',
  });

  const [selectedChart, setSelectedChart] = useState<ChartType>('line');
  const [showWizard, setShowWizard] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [chatPrompt, setChatPrompt] = useState(
    locale === 'tr' ? 'Son 3 ay gelir trendini görmek istiyorum.' : 'I want to see the revenue trend for the last 3 months.'
  );
  const [wizardKey, setWizardKey] = useState(0);
  const [wizardPrefill, setWizardPrefill] = useState<any>(null);

  const title = useMemo(
    () =>
      locale === 'tr'
        ? { h1: 'Grafik Seçim Wizard (Demo)', p: 'Rule-based öneri + manuel panel + uyarılar.' }
        : { h1: 'Chart Selection Wizard (Demo)', p: 'Rule-based recommendation + manual panel + warnings.' },
    [locale]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 px-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-slate-100">
            {title.h1}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-slate-300">{title.p}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-700">
              <div className="font-extrabold text-gray-900 dark:text-slate-100">
                {locale === 'tr' ? 'Veri Yapısı (demo)' : 'Dataset Profile (demo)'}
              </div>

              <div className="mt-4 space-y-3 text-sm">
                {[
                  { key: 'hasDate', labelTr: 'Tarih alanı var', labelEn: 'Has date field' },
                  { key: 'hasCategory', labelTr: 'Kategori alanı var', labelEn: 'Has category field' },
                  { key: 'isRatio', labelTr: 'Oran / % metrik', labelEn: 'Ratio / % metric' },
                  { key: 'hasBridgeSteps', labelTr: 'Başlangıç→adım→sonuç', labelEn: 'Start→steps→result' },
                  { key: 'hasTargetActual', labelTr: 'Hedef + gerçekleşen', labelEn: 'Target + actual' },
                  { key: 'singleEntity', labelTr: 'Tek kişi/tek varlık', labelEn: 'Single entity' },
                  { key: 'multiBusiness', labelTr: 'Çoklu işletme', labelEn: 'Multi-business' },
                ].map((x) => (
                  <label key={x.key} className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-gray-700 dark:text-slate-200">
                      {locale === 'tr' ? x.labelTr : x.labelEn}
                    </span>
                    <input
                      type="checkbox"
                      checked={(profile as any)[x.key]}
                      onChange={(e) => setProfile((p) => ({ ...p, [x.key]: e.target.checked } as any))}
                      className="w-5 h-5"
                    />
                  </label>
                ))}

                <label className="pt-2 block text-gray-700 dark:text-slate-200 font-semibold">
                  {locale === 'tr' ? 'Kullanıcı rolü' : 'User role'}
                  <select
                    value={profile.userRole || 'manager'}
                    onChange={(e) => setProfile((p) => ({ ...p, userRole: e.target.value as any }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                  >
                    <option value="staff">{locale === 'tr' ? 'staff (personel)' : 'staff'}</option>
                    <option value="manager">{locale === 'tr' ? 'manager (yönetici)' : 'manager'}</option>
                    <option value="cfo">cfo</option>
                    <option value="admin">admin</option>
                  </select>
                </label>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <label className="text-gray-700 dark:text-slate-200 font-semibold">
                    {locale === 'tr' ? 'Satır sayısı' : 'Row count'}
                    <input
                      type="number"
                      min={0}
                      value={profile.rowCount}
                      onChange={(e) => setProfile((p) => ({ ...p, rowCount: Number(e.target.value) }))}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-gray-700 dark:text-slate-200 font-semibold">
                    {locale === 'tr' ? 'Kategori sayısı' : 'Category count'}
                    <input
                      type="number"
                      min={0}
                      value={profile.categoryCount ?? 0}
                      onChange={(e) => setProfile((p) => ({ ...p, categoryCount: Number(e.target.value) }))}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                    />
                  </label>
                </div>

                <label className="pt-2 block text-gray-700 dark:text-slate-200 font-semibold">
                  {locale === 'tr' ? 'İşletme sayısı' : 'Business count'}
                  <input
                    type="number"
                    min={0}
                    value={profile.businessCount ?? 0}
                    onChange={(e) => setProfile((p) => ({ ...p, businessCount: Number(e.target.value) }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                    disabled={!profile.multiBusiness}
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowWizard(true)}
                className="mt-5 w-full px-5 py-3 rounded-2xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700"
              >
                {locale === 'tr' ? 'Wizard’ı Aç' : 'Open Wizard'}
              </button>
            </div>

            <div className="mt-6 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-700">
              <div className="font-extrabold text-gray-900 dark:text-slate-100">
                {locale === 'tr' ? 'AI Chat → Wizard (MVP)' : 'AI Chat → Wizard (MVP)'}
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                {locale === 'tr'
                  ? 'Bir cümle yaz: sistem intent + output çıkarıp wizard’ı ilgili adımlarla açar.'
                  : 'Write one sentence: system extracts intent + output and opens the wizard.'}
              </p>
              <textarea
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                className="mt-3 w-full h-28 rounded-2xl border border-gray-200 p-4 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => {
                  const parsed = parseAiChartRequest(chatPrompt);
                  // Apply minimal profile hints from AI (MVP).
                  setProfile((p) => ({
                    ...p,
                    userRole: parsed.userRole || p.userRole,
                    multiBusiness: parsed.scope === 'multi_business' ? true : p.multiBusiness,
                    // If target tracking is requested, simulate target+actual + single entity.
                    hasTargetActual: parsed.intent === 'target_tracking' ? true : p.hasTargetActual,
                    singleEntity: parsed.intent === 'target_tracking' ? true : p.singleEntity,
                  }));
                  setWizardPrefill({
                    intent: parsed.intent,
                    output: parsed.output,
                    openToStep: 3,
                  });
                  setWizardKey((k) => k + 1);
                  setShowWizard(true);
                }}
                className="mt-3 w-full px-5 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700"
              >
                {locale === 'tr' ? 'AI → Wizard’ı Aç' : 'Open Wizard from AI'}
              </button>
            </div>
          </aside>

          {/* Manual selection */}
          <main className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-700">
              <div className="font-extrabold text-gray-900 dark:text-slate-100">
                {locale === 'tr' ? 'Dashboard Builder – Grafik Seçim Paneli' : 'Dashboard Builder – Chart Panel'}
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                {locale === 'tr'
                  ? 'Wizard’a girmeden manuel seçim. Yanlış seçimlerde uyarı gösterir.'
                  : 'Manual selection without wizard. Shows warnings for mismatches.'}
              </p>
              <div className="mt-4">
                <ChartSelectionPanel profile={profile} value={selectedChart} onChange={setSelectedChart} />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-700">
              <div className="font-extrabold text-gray-900 dark:text-slate-100">
                {locale === 'tr' ? 'Seçilen Grafik' : 'Selected Chart'}
              </div>
              <div className="mt-3 flex items-center gap-3">
                {(() => {
                  const meta = CHART_META[selectedChart];
                  return (
                    <>
                      <meta.Icon className="w-6 h-6 text-indigo-700 dark:text-indigo-200" />
                      <div className="text-lg font-extrabold text-gray-900 dark:text-slate-100">
                        {locale === 'tr' ? meta.labelTr : meta.labelEn}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">({selectedChart})</div>
                    </>
                  );
                })()}
              </div>

              {lastResult && (
                <div className="mt-5">
                  <div className="text-sm font-extrabold text-gray-900 dark:text-slate-100">
                    {locale === 'tr' ? 'Son Wizard Çıktısı (AI-uyumlu)' : 'Last Wizard Output (AI-ready)'}
                  </div>
                  <pre className="mt-2 text-xs bg-gray-50 border border-gray-200 rounded-2xl p-4 overflow-auto dark:bg-slate-950 dark:border-slate-700 dark:text-slate-200">
{JSON.stringify(lastResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {showWizard && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl relative">
            <button
              type="button"
              onClick={() => setShowWizard(false)}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <ChartChoiceWizard
              key={wizardKey}
              profile={profile}
              prefill={wizardPrefill || undefined}
              onCancel={() => setShowWizard(false)}
              onComplete={(result) => {
                setLastResult(result);
                setSelectedChart(result.selectedChart);
                setShowWizard(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

