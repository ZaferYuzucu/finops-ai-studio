export type AdminNote = {
  id: string;
  atIso: string;
  severity: 'info' | 'warning';
  message: string;
  adminEmail?: string | null;
};

const STORAGE_KEY = 'finops_dashboard_admin_notes_v1';

type StoreV1 = {
  v: 1;
  byDashboardId: Record<string, AdminNote[]>;
};

function randomId(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = window.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadStore(): StoreV1 {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { v: 1, byDashboardId: {} };
    const parsed = JSON.parse(raw) as StoreV1;
    if (!parsed || typeof parsed !== 'object' || parsed.v !== 1) return { v: 1, byDashboardId: {} };
    if (!parsed.byDashboardId || typeof parsed.byDashboardId !== 'object') return { v: 1, byDashboardId: {} };
    return parsed;
  } catch {
    return { v: 1, byDashboardId: {} };
  }
}

function saveStore(store: StoreV1) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function listAdminNotes(dashboardId: string): AdminNote[] {
  const store = loadStore();
  const arr = store.byDashboardId[dashboardId] ?? [];
  return [...arr].sort((a, b) => (a.atIso < b.atIso ? 1 : -1));
}

export function addAdminNote(params: {
  dashboardId: string;
  severity: 'info' | 'warning';
  message: string;
  adminEmail?: string | null;
}): AdminNote {
  const store = loadStore();
  const note: AdminNote = {
    id: randomId(),
    atIso: new Date().toISOString(),
    severity: params.severity,
    message: params.message.trim(),
    adminEmail: params.adminEmail ?? null,
  };
  const arr = store.byDashboardId[params.dashboardId] ?? [];
  store.byDashboardId[params.dashboardId] = [note, ...arr].slice(0, 200);
  saveStore(store);
  return note;
}

