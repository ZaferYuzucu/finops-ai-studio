import type { DashboardBuilderWizardData, UserDashboardRecord } from '../types/userDashboard';

const STORAGE_KEY = 'finops_user_dashboards_v1';

type StoreV1 = {
  v: 1;
  byUser: Record<string, UserDashboardRecord[]>;
};

function nowIso(): string {
  return new Date().toISOString();
}

function randomId(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = window.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadStore(): StoreV1 {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { v: 1, byUser: {} };
    const parsed = JSON.parse(raw) as StoreV1;
    if (!parsed || typeof parsed !== 'object' || parsed.v !== 1) return { v: 1, byUser: {} };
    if (!parsed.byUser || typeof parsed.byUser !== 'object') return { v: 1, byUser: {} };
    return parsed;
  } catch {
    return { v: 1, byUser: {} };
  }
}

function saveStore(store: StoreV1) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function listUserDashboards(userId: string): UserDashboardRecord[] {
  const store = loadStore();
  const arr = store.byUser[userId] ?? [];
  // newest first
  return [...arr].sort((a, b) => (a.updatedAtIso < b.updatedAtIso ? 1 : -1));
}

export function getUserDashboard(userId: string, id: string): UserDashboardRecord | null {
  const store = loadStore();
  const arr = store.byUser[userId] ?? [];
  return arr.find((d) => d.id === id) ?? null;
}

export function createUserDashboard(userId: string, wizardData: DashboardBuilderWizardData): UserDashboardRecord {
  const store = loadStore();
  const createdAtIso = nowIso();
  const record: UserDashboardRecord = {
    id: randomId(),
    userId,
    name: wizardData.dashboardName?.trim() || 'Yeni Dashboard',
    createdAtIso,
    updatedAtIso: createdAtIso,
    wizardData,
  };
  const arr = store.byUser[userId] ?? [];
  store.byUser[userId] = [record, ...arr];
  saveStore(store);
  return record;
}

export function updateUserDashboard(
  userId: string,
  id: string,
  wizardData: DashboardBuilderWizardData,
): UserDashboardRecord | null {
  const store = loadStore();
  const arr = store.byUser[userId] ?? [];
  const idx = arr.findIndex((d) => d.id === id);
  if (idx === -1) return null;

  const prev = arr[idx];
  const updated: UserDashboardRecord = {
    ...prev,
    name: wizardData.dashboardName?.trim() || prev.name || 'Dashboard',
    updatedAtIso: nowIso(),
    wizardData,
  };
  const next = [...arr];
  next[idx] = updated;
  store.byUser[userId] = next;
  saveStore(store);
  return updated;
}

export function deleteUserDashboard(userId: string, id: string): boolean {
  const store = loadStore();
  const arr = store.byUser[userId] ?? [];
  const next = arr.filter((d) => d.id !== id);
  if (next.length === arr.length) return false;
  store.byUser[userId] = next;
  saveStore(store);
  return true;
}

export function listAllDashboards(): Array<UserDashboardRecord> {
  const store = loadStore();
  const all: UserDashboardRecord[] = [];
  Object.values(store.byUser).forEach((arr) => {
    if (Array.isArray(arr)) all.push(...arr);
  });
  return all.sort((a, b) => (a.updatedAtIso < b.updatedAtIso ? 1 : -1));
}

