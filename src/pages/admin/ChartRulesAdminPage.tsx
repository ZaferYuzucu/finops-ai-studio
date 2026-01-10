import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Save, RotateCcw, Settings2, Shield } from 'lucide-react';
import type { ChartRulesConfig } from '../../utils/chartWizard';
import { DEFAULT_CHART_RULES, loadChartRulesFromStorage } from '../../utils/chartWizard';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'fino_chart_rules_v1';

export default function ChartRulesAdminPage() {
  const { i18n } = useTranslation();
  const isTr = i18n.language?.toLowerCase().startsWith('tr');

  const initial = useMemo<ChartRulesConfig>(() => {
    return { ...DEFAULT_CHART_RULES, ...(loadChartRulesFromStorage() ?? {}) };
  }, []);

  const [rules, setRules] = useState<ChartRulesConfig>(initial);
  const [rawJson, setRawJson] = useState<string>(JSON.stringify(rules, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const ui = useMemo(
    () =>
      isTr
        ? {
            title: 'Grafik Kural Yönetimi',
            subtitle:
              'Admin-only. Wizard + manuel panel + AI için ortak kural seti. Değişiklikler tarayıcı localStorage’da saklanır (MVP).',
            backOffice: 'Yönetim Ofisi',
            save: 'Kaydet',
            reset: 'Sıfırla',
            jsonTitle: 'Kural JSON',
            quickTitle: 'Hızlı Ayarlar',
            hint: 'İpucu: Bu ekran kullanıcıya gösterilmez.',
            note:
              'Not: İleride Firestore ile tenant bazlı kural yönetimi ve versiyonlama eklenebilir.',
          }
        : {
            title: 'Chart Rules Admin',
            subtitle:
              'Admin-only. Shared rule set for Wizard + manual panel + AI. Stored in browser localStorage (MVP).',
            backOffice: 'Office',
            save: 'Save',
            reset: 'Reset',
            jsonTitle: 'Rules JSON',
            quickTitle: 'Quick Settings',
            hint: 'Tip: This page is never shown to end users.',
            note:
              'Note: Later we can add Firestore tenant-based rules and versioning.',
          },
    [isTr]
  );

  const persist = (next: ChartRulesConfig) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    } catch (e: any) {
      setError(e?.message || 'Storage error');
    }
  };

  const applyJson = () => {
    setError(null);
    try {
      const parsed = JSON.parse(rawJson) as ChartRulesConfig;
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON');
      setRules(parsed);
      persist(parsed);
    } catch (e: any) {
      setError(e?.message || 'Invalid JSON');
    }
  };

  const reset = () => {
    setError(null);
    const next = { ...DEFAULT_CHART_RULES };
    setRules(next);
    setRawJson(JSON.stringify(next, null, 2));
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
              <Shield className="w-4 h-4 text-red-700" />
              <span className="text-sm font-semibold text-red-800">ADMIN</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900">{ui.title}</h1>
            <p className="mt-2 text-gray-600">{ui.subtitle}</p>
            <p className="mt-2 text-sm text-gray-500">{ui.hint}</p>
          </div>
          <Link
            to="/office"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all text-sm font-semibold text-gray-800"
          >
            <Settings2 className="w-4 h-4" />
            {ui.backOffice}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="font-extrabold text-gray-900 mb-3">{ui.quickTitle}</div>

              <label className="block text-sm font-semibold text-gray-700">
                maxPieCategories
                <input
                  type="number"
                  min={1}
                  value={rules.maxPieCategories}
                  onChange={(e) => {
                    const next = { ...rules, maxPieCategories: Number(e.target.value) };
                    setRules(next);
                    setRawJson(JSON.stringify(next, null, 2));
                  }}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </label>

              <label className="mt-3 block text-sm font-semibold text-gray-700">
                maxLineSeries
                <input
                  type="number"
                  min={1}
                  value={rules.maxLineSeries}
                  onChange={(e) => {
                    const next = { ...rules, maxLineSeries: Number(e.target.value) };
                    setRules(next);
                    setRawJson(JSON.stringify(next, null, 2));
                  }}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </label>

              <label className="mt-3 block text-sm font-semibold text-gray-700">
                largeRowCount
                <input
                  type="number"
                  min={0}
                  value={rules.largeRowCount}
                  onChange={(e) => {
                    const next = { ...rules, largeRowCount: Number(e.target.value) };
                    setRules(next);
                    setRawJson(JSON.stringify(next, null, 2));
                  }}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </label>

              <label className="mt-3 block text-sm font-semibold text-gray-700">
                veryLargeRowCount
                <input
                  type="number"
                  min={0}
                  value={rules.veryLargeRowCount}
                  onChange={(e) => {
                    const next = { ...rules, veryLargeRowCount: Number(e.target.value) };
                    setRules(next);
                    setRawJson(JSON.stringify(next, null, 2));
                  }}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </label>

              <label className="mt-3 block text-sm font-semibold text-gray-700">
                maxAreaBusinesses
                <input
                  type="number"
                  min={1}
                  value={rules.maxAreaBusinesses}
                  onChange={(e) => {
                    const next = { ...rules, maxAreaBusinesses: Number(e.target.value) };
                    setRules(next);
                    setRawJson(JSON.stringify(next, null, 2));
                  }}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </label>

              <label className="mt-3 block text-sm font-semibold text-gray-700">
                gaugeRolesAllowed <span className="text-xs text-gray-500">(csv)</span>
                <input
                  type="text"
                  value={rules.gaugeRolesAllowed.join(',')}
                  onChange={(e) => {
                    const roles = e.target.value
                      .split(',')
                      .map((x) => x.trim())
                      .filter(Boolean) as any;
                    const next = { ...rules, gaugeRolesAllowed: roles };
                    setRules(next);
                    setRawJson(JSON.stringify(next, null, 2));
                  }}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                  placeholder="staff,manager,cfo,admin"
                />
              </label>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyJson}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4" /> {ui.save}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4" /> {ui.reset}
                </button>
                {saved && (
                  <span className="text-sm font-semibold text-emerald-700">
                    {isTr ? 'Kaydedildi' : 'Saved'}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5" />
                <div>
                  <div className="font-extrabold text-amber-900">{isTr ? 'Uyarı' : 'Warning'}</div>
                  <div className="mt-1 text-sm text-amber-900">
                    {ui.note}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="font-extrabold text-gray-900 mb-3">{ui.jsonTitle}</div>
              <textarea
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                className="w-full h-[520px] font-mono text-xs rounded-xl border border-gray-200 p-4 bg-gray-50"
              />
              {error && <div className="mt-3 text-sm font-semibold text-red-700">{error}</div>}
              <div className="mt-3 text-xs text-gray-500">
                {isTr
                  ? `Storage key: ${STORAGE_KEY}`
                  : `Storage key: ${STORAGE_KEY}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

