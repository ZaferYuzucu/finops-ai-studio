import type { TemplateLibraryItem } from '../types/templateLibrary';
import type { DashboardBuilderWizardData } from '../types/userDashboard';

const STORAGE_KEY = 'finops_template_library_v1';

type StoreV1 = {
  v: 1;
  items: TemplateLibraryItem[];
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
    if (!raw) return { v: 1, items: [] };
    const parsed = JSON.parse(raw) as StoreV1;
    if (!parsed || typeof parsed !== 'object' || parsed.v !== 1) return { v: 1, items: [] };
    if (!Array.isArray(parsed.items)) return { v: 1, items: [] };
    return parsed;
  } catch {
    return { v: 1, items: [] };
  }
}

function saveStore(store: StoreV1) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function listTemplateLibrary(): TemplateLibraryItem[] {
  const store = loadStore();
  return [...store.items].sort((a, b) => (a.createdAtIso < b.createdAtIso ? 1 : -1));
}

export function addTemplateToLibrary(params: {
  name: string;
  wizardData: DashboardBuilderWizardData;
  sourceDashboardId: string;
  sourceUserId: string;
  sectorLabel?: string;
  notes?: string;
  createdByAdminEmail?: string | null;
}): TemplateLibraryItem {
  const store = loadStore();
  const item: TemplateLibraryItem = {
    id: randomId(),
    name: params.name.trim() || 'Admin Onaylı Şablon',
    createdAtIso: nowIso(),
    createdByAdminEmail: params.createdByAdminEmail ?? null,
    sourceDashboardId: params.sourceDashboardId,
    sourceUserId: params.sourceUserId,
    sectorLabel: params.sectorLabel,
    notes: params.notes,
    wizardData: params.wizardData,
  };
  store.items = [item, ...store.items];
  saveStore(store);
  return item;
}

export function deleteTemplateFromLibrary(id: string): boolean {
  const store = loadStore();
  const next = store.items.filter((x) => x.id !== id);
  if (next.length === store.items.length) return false;
  store.items = next;
  saveStore(store);
  return true;
}

