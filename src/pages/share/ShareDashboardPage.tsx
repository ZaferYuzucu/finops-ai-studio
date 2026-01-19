import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  AgricultureDashboard,
  CallCenterDashboard,
  CashFlowDashboard,
  ConstructionDashboard,
  CustomerServiceDashboard,
  EcommerceDashboard,
  EducationDashboard,
  EnergyDashboard,
  FinanceDashboard,
  FleetManagementDashboard,
  HealthcareDashboard,
  HRDashboard,
  HotelOperationsDashboard,
  InsuranceDashboard,
  InventoryDashboard,
  ITOperationsDashboard,
  LogisticsDashboard,
  ManufacturingDashboard,
  MarketingDashboard,
  OEEDashboard,
  ProjectManagementDashboard,
  QualityControlDashboard,
  RealEstateDashboard,
  RestaurantFinanceDashboard,
  RestaurantLaborDashboard,
  RestaurantSalesDashboard,
  RetailDashboard,
  SalesDashboard,
  SupplyChainDashboard,
  WebAnalyticsDashboard,
} from '@/components/dashboards';

import type { SharePayload, DemoSharePayload, TemplateSharePayload, ShareSecurity } from '@/utils/shareLink';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function isIOS(): boolean {
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

function isInStandaloneMode(): boolean {
  // iOS Safari
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav: any = window.navigator;
  if (nav?.standalone) return true;
  // Other browsers
  return window.matchMedia?.('(display-mode: standalone)')?.matches ?? false;
}

function base64UrlDecodeToString(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  const binary = atob(b64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function safeParsePayload(encoded: string | null): SharePayload | null {
  if (!encoded) return null;
  try {
    const json = base64UrlDecodeToString(encoded);
    const parsed = JSON.parse(json) as SharePayload;
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.kind !== 'demo' && parsed.kind !== 'template') return null;
    return parsed;
  } catch {
    return null;
  }
}

function loadLocalShare(id: string | null): SharePayload | null {
  if (!id) return null;
  try {
    const raw = localStorage.getItem(`finops_share_${id}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as any;
    if (!parsed || typeof parsed !== 'object') return null;

    // Backward compatible:
    // - Old format: payload directly
    // - New format: { v: 1, createdAtIso, payload }
    const payload: SharePayload | undefined =
      parsed?.v === 1 && parsed?.payload ? (parsed.payload as SharePayload) : (parsed as SharePayload);

    if (!payload || typeof payload !== 'object') return null;
    if (payload.kind !== 'demo' && payload.kind !== 'template') return null;
    return payload;
  } catch {
    return null;
  }
}

function getSecurity(payload: SharePayload): ShareSecurity | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: any = payload;
  return p?.security as ShareSecurity | undefined;
}

function isExpired(payload: SharePayload): boolean {
  const sec = getSecurity(payload);
  const exp = sec?.expiresAtIso;
  if (!exp) return false;
  const t = Date.parse(exp);
  if (!Number.isFinite(t)) return false;
  return Date.now() > t;
}

type ShareViewLogEntry = {
  atIso: string;
  kind: 'demo' | 'template';
  templateId?: string;
  title?: string;
  source: 's' | 'd';
  userAgent: string;
};

function appendViewLog(entry: ShareViewLogEntry) {
  try {
    const key = 'finops_share_view_logs_v1';
    const raw = localStorage.getItem(key);
    const arr = (raw ? (JSON.parse(raw) as ShareViewLogEntry[]) : []) ?? [];
    const next = Array.isArray(arr) ? arr.slice(-199) : [];
    next.push(entry);
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // ignore
  }
}

function formatCurrency(value: number): string {
  return `₺${Math.round(value).toLocaleString('tr-TR')}`;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '%0';
  return `%${value.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}`;
}

function pctChange(current: number, prev: number | null): number | null {
  if (prev === null) return null;
  if (!Number.isFinite(prev) || prev === 0) return null;
  return ((current - prev) / prev) * 100;
}

function DemoTooltip({
  active,
  label,
  payload,
  getPrevValue,
}: {
  active?: boolean;
  label?: string;
  payload?: any[];
  getPrevValue: (label: string) => number | null;
}) {
  if (!active || !payload?.length) return null;
  const p0 = payload[0];
  const value = typeof p0?.value === 'number' ? p0.value : null;
  if (value === null) return null;
  const prev = getPrevValue(String(label ?? ''));
  const change = pctChange(value, prev);

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
      <div className="text-xs font-semibold text-gray-700">{label}</div>
      <div className="mt-1 text-sm font-bold text-gray-900">{formatCurrency(value)}</div>
      <div className="mt-1 text-[11px] text-gray-600">
        Karşılaştırma: {change === null ? '—' : formatPercent(change)}
      </div>
    </div>
  );
}

function getTemplateComponent(templateId: string): React.ReactNode | null {
  switch (templateId) {
    case 'restaurant-sales':
      return <RestaurantSalesDashboard />;
    case 'restaurant-finance':
      return <RestaurantFinanceDashboard />;
    case 'restaurant-labor':
      return <RestaurantLaborDashboard />;
    case 'manufacturing-control':
      return <ManufacturingDashboard />;
    case 'quality-control':
      return <QualityControlDashboard />;
    case 'inventory-management':
      return <InventoryDashboard />;
    case 'oee-dashboard':
      return <OEEDashboard />;
    case 'finance-cfo':
      return <FinanceDashboard />;
    case 'cash-flow':
      return <CashFlowDashboard />;
    case 'hotel-management':
      return <HotelOperationsDashboard />;
    case 'ecommerce-kpi':
      return <EcommerceDashboard />;
    case 'healthcare-kpi':
      return <HealthcareDashboard />;
    case 'agriculture-kpi':
      return <AgricultureDashboard />;
    case 'logistics-kpi':
      return <LogisticsDashboard />;
    case 'education-performance':
      return <EducationDashboard />;
    case 'energy-kpi':
      return <EnergyDashboard />;
    case 'retail-kpi':
      return <RetailDashboard />;
    case 'callcenter-kpi':
      return <CallCenterDashboard />;
    case 'marketing-kpi':
      return <MarketingDashboard />;
    case 'hr-metrics':
      return <HRDashboard />;
    case 'supplychain-kpi':
      return <SupplyChainDashboard />;
    case 'project-kpi':
      return <ProjectManagementDashboard />;
    case 'customerservice-kpi':
      return <CustomerServiceDashboard />;
    case 'sales-kpi':
      return <SalesDashboard />;
    case 'it-ops':
      return <ITOperationsDashboard />;
    case 'web-analytics':
      return <WebAnalyticsDashboard />;
    case 'fleet-kpi':
      return <FleetManagementDashboard />;
    case 'realestate-kpi':
      return <RealEstateDashboard />;
    case 'insurance-kpi':
      return <InsuranceDashboard />;
    case 'construction-kpi':
      return <ConstructionDashboard />;
    default:
      return null;
  }
}

function SharedHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xl md:text-2xl font-bold text-gray-900">{title}</div>
      <div className="text-xs md:text-sm text-gray-600">{subtitle}</div>
      <div className="mt-2 text-[11px] text-gray-500">
        View-only paylaşım: Bu sayfada değişiklik yapılamaz.
      </div>
    </div>
  );
}

export default function ShareDashboardPage() {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const source = useMemo<'s' | 'd'>(() => (params.get('s') ? 's' : 'd'), [params]);
  const payload = useMemo(() => {
    // Prefer short local share id first
    const fromLocal = loadLocalShare(params.get('s'));
    if (fromLocal) return fromLocal;
    return safeParsePayload(params.get('d'));
  }, [params]);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState<boolean>(() => isInStandaloneMode());

  useEffect(() => {
    const handler = (e: Event) => {
      // Chrome/Edge on Android/desktop
      e.preventDefault?.();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    // Regardless of choice, we can clear it
    setInstallPrompt(null);
  };

  if (!payload) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">Paylaşım linki geçersiz</div>
          <div className="mt-2 text-sm text-gray-600">
            Bu link bozulmuş olabilir veya süresi dolmuş olabilir.
            <br />
            Eğer link <code className="bg-gray-100 px-1 rounded">?s=</code> ile başlıyorsa, bu sadece aynı cihazda çalışan “kısa test linki”dir.
          </div>
        </div>
      </div>
    );
  }

  if (isExpired(payload)) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">Paylaşım linkinin süresi doldu</div>
          <div className="mt-2 text-sm text-gray-600">
            Bu paylaşım linki için tanımlı geçerlilik süresi dolmuş.
          </div>
        </div>
      </div>
    );
  }

  // Client-only view logging (MVP) — only if enabled.
  useEffect(() => {
    const sec = getSecurity(payload);
    if (!sec?.logViews) return;
    const entry: ShareViewLogEntry = {
      atIso: new Date().toISOString(),
      kind: payload.kind,
      templateId: payload.kind === 'template' ? (payload as TemplateSharePayload).templateId : undefined,
      title: payload.kind === 'demo' ? (payload as DemoSharePayload).title : undefined,
      source,
      userAgent: navigator.userAgent,
    };
    appendViewLog(entry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, source]);

  const watermarkText = getSecurity(payload)?.watermarkText?.trim();

  const watermark = watermarkText ? (
    <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.10] select-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(-30deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 80px, rgba(0,0,0,0.12) 80px, rgba(0,0,0,0.12) 200px)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl sm:text-6xl font-black tracking-widest text-gray-900 rotate-[-18deg]">
          {watermarkText}
        </div>
      </div>
    </div>
  ) : null;

  const pwaBanner = (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
      <div className="text-sm font-semibold text-emerald-900">📌 Uygulama gibi kullan (PWA)</div>
      {installed ? (
        <div className="mt-1 text-sm text-emerald-800">
          Bu dashboard zaten “uygulama” modunda çalışıyor.
        </div>
      ) : (
        <>
          <div className="mt-1 text-sm text-emerald-800">
            Bu sayfayı “Ana Ekrana Ekle” ile tablet/telefonunda uygulama gibi açabilirsin.
          </div>
          <div className="mt-2 text-xs text-emerald-800">
            {isIOS()
              ? "iPhone/iPad (Safari): Paylaş (⬆️) → Ana Ekrana Ekle"
              : "Chrome/Edge: Menü (⋮) → Ana ekrana ekle / Uygulamayı yükle"}
          </div>
          {installPrompt && (
            <button
              onClick={() => void handleInstall()}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Yükle (Install)
            </button>
          )}
        </>
      )}
    </div>
  );

  if (payload.kind === 'template') {
    const p = payload as TemplateSharePayload;
    const node = getTemplateComponent(p.templateId);
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        {watermark}
        <div className="mx-auto max-w-[1200px]">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <SharedHeader
              title={p.templateLabel ? `Dashboard (Şablon): ${p.templateLabel}` : 'Dashboard (Şablon)'}
              subtitle={p.categoryLabel ? `${p.categoryLabel} • ${new Date(p.generatedAtIso).toLocaleString('tr-TR')}` : new Date(p.generatedAtIso).toLocaleString('tr-TR')}
            />
          </div>

          <div className="mt-4">{pwaBanner}</div>

          <div className="mt-4 bg-white border border-gray-200 rounded-xl p-3 overflow-x-auto">
            {node ?? (
              <div className="p-6 text-sm text-gray-600">
                Bu şablon bulunamadı.
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            View-only access. Proprietary to FinOps AI Studio.
          </div>
        </div>
      </div>
    );
  }

  // Demo share
  const p = payload as DemoSharePayload;
  // (demo render continues below...)
  const dailyMap = useMemo(() => {
    const map = new Map<string, number>();
    p.dailyData.forEach((d) => map.set(d.day, d.gelir));
    return map;
  }, [p.dailyData]);

  const getPrevValue = (day: string): number | null => {
    const idx = p.dailyData.findIndex((d) => d.day === day);
    if (idx <= 0) return null;
    return p.dailyData[idx - 1]?.gelir ?? null;
  };

  const categoryTotal = useMemo(
    () => p.categoryData.reduce((sum, c) => sum + c.value, 0),
    [p.categoryData],
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <SharedHeader
            title={p.title}
            subtitle={`${p.note.dateRange} • ${p.note.currency} • ${new Date(p.generatedAtIso).toLocaleString('tr-TR')}`}
          />
        </div>

        <div className="mt-4">{pwaBanner}</div>

        {/* KPI strip */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {p.kpis.map((k) => (
            <div key={k.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-gray-600">{k.label}</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {k.prefix ?? ''}{k.value.toLocaleString('tr-TR')}{k.suffix ?? ''}
              </div>
              <div className="mt-1 text-xs text-gray-500">Trend: {k.trend}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-800 mb-2">📈 Günlük Gelir Trendi</div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={p.dailyData}>
                <defs>
                  <linearGradient id="sharedGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<DemoTooltip getPrevValue={getPrevValue} />} />
                <Area type="monotone" dataKey="gelir" stroke="#3B82F6" fillOpacity={1} fill="url(#sharedGelir)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-800 mb-2">🥧 Kategori Dağılımı</div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={p.categoryData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={100}>
                  {p.categoryData.map((c, idx) => (
                    <Cell key={idx} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any, name: any, entry: any) => {
                    const value = typeof v === 'number' ? v : 0;
                    const pct = categoryTotal ? (value / categoryTotal) * 100 : 0;
                    return [`${value} (${formatPercent(pct)})`, entry?.payload?.name ?? name];
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-800 mb-2">📊 Ürün Performansı (Gelir)</div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={p.productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-12} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip
                formatter={(v: any) => {
                  const value = typeof v === 'number' ? v : 0;
                  // Comparison vs average revenue across products
                  const avg =
                    p.productData.reduce((sum, x) => sum + x.gelir, 0) / Math.max(1, p.productData.length);
                  const change = avg ? ((value - avg) / avg) * 100 : 0;
                  return [`${formatCurrency(value)} • Ortalama’ya göre ${formatPercent(change)}`, 'Gelir'];
                }}
              />
              <Bar dataKey="gelir" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-800 mb-2">📝 Veri Notu</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
            <div><span className="font-semibold">Tarih aralığı:</span> {p.note.dateRange}</div>
            <div><span className="font-semibold">Para birimi:</span> {p.note.currency}</div>
            <div><span className="font-semibold">Veri kaynağı:</span> {p.note.source}</div>
            <div><span className="font-semibold">Link üretim:</span> {new Date(p.generatedAtIso).toLocaleString('tr-TR')}</div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          View-only access. Proprietary to FinOps AI Studio.
        </div>
      </div>
    </div>
  );
}

