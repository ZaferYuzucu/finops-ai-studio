import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type RouteEntry = {
  path: string;
  label: string;
  kind: 'public' | 'protected' | 'admin';
};

const ROUTES: RouteEntry[] = [
  { path: '/', label: 'Home', kind: 'public' },
  { path: '/pricing', label: 'Pricing', kind: 'public' },
  { path: '/beta-basvuru', label: 'Beta Başvuru', kind: 'public' },
  { path: '/payment/checkout', label: 'Payment Checkout', kind: 'public' },

  // Solutions
  { path: '/solutions/financial-data-analysis', label: 'Finansal Veri Analizi', kind: 'public' },
  { path: '/solutions/cost-inventory-management', label: 'Maliyet & Stok Yönetimi', kind: 'public' },
  { path: '/solutions/cash-flow', label: 'Nakit Akışı', kind: 'public' },
  { path: '/solutions/budget-planning', label: 'Bütçe & Planlama', kind: 'public' },
  { path: '/solutions/hr-payroll-performance', label: 'İK & Bordro', kind: 'public' },
  { path: '/solutions/dashboard-examples', label: 'Dashboard Örnekleri', kind: 'public' },
  { path: '/solutions/dashboards/:dashboardId', label: 'Dashboard Detay (dynamic)', kind: 'public' },
  { path: '/solutions/features', label: 'DataViz Features', kind: 'public' },
  { path: '/solutions/support', label: 'DataViz Support', kind: 'public' },

  // Sectors
  { path: '/sektorler/uretim', label: 'Üretim Sektörü', kind: 'public' },
  { path: '/sektorler/uretim/dashboards', label: 'Üretim Dashboardları', kind: 'public' },

  // Content
  { path: '/blog', label: 'Blog', kind: 'public' },
  { path: '/blog/what-is-finops', label: 'Blog: What is FinOps', kind: 'public' },
  { path: '/blog/bringing-teams-together', label: 'Blog: Bringing Teams Together', kind: 'public' },
  { path: '/blog/data-driven-decisions', label: 'Blog: Data Driven Decisions', kind: 'public' },
  { path: '/docs', label: 'Docs', kind: 'public' },
  { path: '/docs/get-started', label: 'Docs: Get Started', kind: 'public' },
  { path: '/about', label: 'About', kind: 'public' },
  { path: '/contact', label: 'Contact', kind: 'public' },
  { path: '/admin/management-office/project-activity-report', label: 'Project Activity Report', kind: 'admin' },

  // Auth pages
  { path: '/login', label: 'Login', kind: 'public' },
  { path: '/signup', label: 'Sign Up', kind: 'public' },
  { path: '/admin-login', label: 'Admin Login', kind: 'public' },

  // Legal
  { path: '/legal/privacy-policy', label: 'Privacy Policy', kind: 'public' },
  { path: '/legal/terms-of-service', label: 'Terms of Service', kind: 'public' },
  { path: '/legal/cookie-policy', label: 'Cookie Policy', kind: 'public' },
  { path: '/veri-guvenligi', label: 'Veri Güvenliği', kind: 'public' },

  // Protected (user)
  { path: '/dashboard', label: 'Dashboard', kind: 'protected' },
  { path: '/dashboards', label: 'Dashboards', kind: 'protected' },
  { path: '/professional-dashboards', label: 'Professional Dashboards', kind: 'protected' },
  { path: '/veri-girisi', label: 'Veri Girişi / Data Import', kind: 'protected' },
  { path: '/dashboard/demo-preview', label: 'Demo Preview', kind: 'protected' },

  // Admin-protected
  { path: '/admin/platform-analytics', label: 'Platform Analytics', kind: 'admin' },
  { path: '/admin/csv-library', label: 'CSV Library', kind: 'admin' },
  { path: '/admin/dashboard', label: 'Admin Dashboard', kind: 'admin' },
  { path: '/admin/panel', label: 'Admin Panel', kind: 'admin' },
  { path: '/admin/newsletter', label: 'Newsletter Panel', kind: 'admin' },
  { path: '/admin/payment-guide', label: 'Payment Guide Admin', kind: 'admin' },
  { path: '/dashboard/create', label: 'Dashboard Create', kind: 'admin' },
  { path: '/office', label: 'Office', kind: 'admin' },
  { path: '/finops-theatre', label: 'FinOps Theatre', kind: 'admin' },
  { path: '/business-plan', label: 'Business Plan', kind: 'admin' },
  { path: '/admin/system-guide', label: 'System Guide', kind: 'admin' },
  { path: '/admin/beta-applications', label: 'Beta Applications', kind: 'admin' },
  { path: '/admin/user-management', label: 'User Management', kind: 'admin' },
  { path: '/admin/email-outbox', label: 'Email Outbox', kind: 'admin' },
  { path: '/marketing-plan', label: 'Marketing Plan', kind: 'admin' },
  { path: '/launch-roadmap', label: 'Launch Roadmap', kind: 'admin' },
  { path: '/investor-presentation', label: 'Investor Presentation', kind: 'admin' },
  { path: '/veri-rehberi', label: 'Veri Rehberi', kind: 'admin' },
  { path: '/data-ingestion', label: 'Data Ingestion', kind: 'admin' },
  { path: '/veri-hazirlama', label: 'Veri Hazırlama', kind: 'public' },
  { path: '/veri-kaynaklari', label: 'Veri Kaynakları', kind: 'public' },
  { path: '/ai-veri-analizi', label: 'AI Veri Analizi', kind: 'public' },
  { path: '/veri-gorsellestirme', label: 'Veri Görselleştirme', kind: 'public' },
  { path: '/user-journey-map', label: 'User Journey Map', kind: 'admin' },
];

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return [];
  const obj = value as Record<string, unknown>;
  const keys: string[] = [];

  for (const k of Object.keys(obj)) {
    const nextPrefix = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...flattenKeys(v, nextPrefix));
    } else {
      keys.push(nextPrefix);
    }
  }
  return keys;
}

function uniqueSorted(list: string[]): string[] {
  return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
}

export default function I18nAuditPage() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState<'tr' | 'en'>(
    (i18n.resolvedLanguage === 'en' ? 'en' : 'tr') as 'tr' | 'en'
  );

  const bundles = useMemo(() => {
    const tr = i18n.getResourceBundle('tr', 'translation') || {};
    const en = i18n.getResourceBundle('en', 'translation') || {};
    return { tr, en };
  }, [i18n]);

  const diff = useMemo(() => {
    const trKeys = uniqueSorted(flattenKeys(bundles.tr));
    const enKeys = uniqueSorted(flattenKeys(bundles.en));
    const trSet = new Set(trKeys);
    const enSet = new Set(enKeys);

    const missingInTr = enKeys.filter((k) => !trSet.has(k));
    const missingInEn = trKeys.filter((k) => !enSet.has(k));

    const q = search.trim().toLowerCase();
    const filter = (k: string) => (q ? k.toLowerCase().includes(q) : true);

    return {
      trCount: trKeys.length,
      enCount: enKeys.length,
      missingInTr: missingInTr.filter(filter),
      missingInEn: missingInEn.filter(filter),
    };
  }, [bundles.en, bundles.tr, search]);

  const withLang = (path: string) => {
    // Keep existing search params, but ensure lang is set
    const params = new URLSearchParams(location.search);
    params.set('lang', lang);
    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
  };

  const setLangAndPersist = async (next: 'tr' | 'en') => {
    setLang(next);
    await i18n.changeLanguage(next);
    const params = new URLSearchParams(location.search);
    params.set('lang', next);
    navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
  };

  const grouped = useMemo(() => {
    const groups: Record<RouteEntry['kind'], RouteEntry[]> = {
      public: [],
      protected: [],
      admin: [],
    };
    for (const r of ROUTES) groups[r.kind].push(r);
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">i18n Audit (dev-only)</h1>
              <p className="text-sm text-gray-600">
                Route list + translation key diff (TR ↔ EN). Not a UI-perfect guarantee; it helps spot missing keys quickly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => void setLangAndPersist('tr')}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  lang === 'tr' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => void setLangAndPersist('en')}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  lang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Routes</h2>
              <div className="text-xs text-gray-500">lang={lang}</div>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Tip: use these links to quickly open each route while preserving <code className="font-mono">?lang=</code>.
              Protected routes may redirect if guards are on.
            </p>

            <div className="mt-4 space-y-6">
              {(['public', 'protected', 'admin'] as const).map((kind) => (
                <div key={kind}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-800">
                      {kind.toUpperCase()} ({grouped[kind].length})
                    </div>
                  </div>
                  <div className="space-y-2">
                    {grouped[kind].map((r) => (
                      <div
                        key={`${kind}:${r.path}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-gray-900">{r.label}</div>
                          <div className="truncate font-mono text-xs text-gray-600">{r.path}</div>
                        </div>
                        <Link
                          to={withLang(r.path)}
                          className="flex-shrink-0 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
                        >
                          Open
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-900">Translation keys diff</h2>
              <div className="text-xs text-gray-500">
                TR keys: {diff.trCount} · EN keys: {diff.enCount}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-600">Filter</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search key (e.g. dataImport, nav, heroPage...)"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-red-900">Missing in TR</div>
                  <div className="text-xs font-semibold text-red-700">{diff.missingInTr.length}</div>
                </div>
                <div className="mt-2 max-h-64 overflow-auto rounded-lg bg-white p-2 font-mono text-xs text-red-900">
                  {diff.missingInTr.length === 0 ? (
                    <div className="text-gray-600">No missing keys detected (EN → TR).</div>
                  ) : (
                    diff.missingInTr.slice(0, 500).map((k) => <div key={k}>{k}</div>)
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-blue-900">Missing in EN</div>
                  <div className="text-xs font-semibold text-blue-700">{diff.missingInEn.length}</div>
                </div>
                <div className="mt-2 max-h-64 overflow-auto rounded-lg bg-white p-2 font-mono text-xs text-blue-900">
                  {diff.missingInEn.length === 0 ? (
                    <div className="text-gray-600">No missing keys detected (TR → EN).</div>
                  ) : (
                    diff.missingInEn.slice(0, 500).map((k) => <div key={k}>{k}</div>)
                  )}
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Note: this compares key presence only. It cannot automatically detect hardcoded strings inside pages/components.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

