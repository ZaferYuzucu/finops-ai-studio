import type { DashboardBuilderWizardData, UserDashboardRecord } from '../types/userDashboard';
import { parseCSVFile } from './csvParser';
import { generateDashboardLayout } from './dashboardRenderer';

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

/**
 * Kullanıcı UID formatı değiştiğinde (veya bug fix sonrası) dashboard'ların kaybolmaması için
 * eski userId altındaki dashboard kayıtlarını yeni userId altına taşır ve birleştirir.
 *
 * - Aynı dashboard id iki tarafta varsa, updatedAtIso daha yeni olan korunur.
 * - Taşınan tüm kayıtlarda record.userId alanı yeni userId'ye set edilir.
 */
export function migrateUserDashboards(
  fromUserId: string,
  toUserId: string,
): { movedCount: number; mergedCount: number } {
  if (!fromUserId || !toUserId) return { movedCount: 0, mergedCount: 0 };
  if (fromUserId === toUserId) return { movedCount: 0, mergedCount: 0 };

  const store = loadStore();
  const fromArr = store.byUser[fromUserId] ?? [];
  if (fromArr.length === 0) return { movedCount: 0, mergedCount: (store.byUser[toUserId] ?? []).length };

  const toArr = store.byUser[toUserId] ?? [];

  const byId = new Map<string, UserDashboardRecord>();
  const consider = (d: UserDashboardRecord) => {
    const prev = byId.get(d.id);
    if (!prev) {
      byId.set(d.id, d);
      return;
    }
    // Keep the most recently updated version
    if ((prev.updatedAtIso || '') < (d.updatedAtIso || '')) {
      byId.set(d.id, d);
    }
  };

  [...fromArr, ...toArr].forEach(consider);

  const merged = Array.from(byId.values()).map((d) => ({
    ...d,
    userId: toUserId,
  }));

  // newest first (same behavior as listUserDashboards)
  merged.sort((a, b) => (a.updatedAtIso < b.updatedAtIso ? 1 : -1));

  store.byUser[toUserId] = merged;
  // Remove legacy bucket to prevent duplicates and confusion
  delete store.byUser[fromUserId];
  saveStore(store);

  return { movedCount: fromArr.length, mergedCount: merged.length };
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
    status: 'pending',
  };
  const arr = store.byUser[userId] ?? [];
  store.byUser[userId] = [record, ...arr];
  saveStore(store);
  
  // Arka planda CSV'yi parse et ve renderedLayout oluştur
  void processUserDashboard(userId, record.id, wizardData);
  
  return record;
}

/**
 * CSV dosyasını parse edip dashboard'a renderedLayout ekler (async)
 */
async function processUserDashboard(
  userId: string,
  dashboardId: string,
  wizardData: DashboardBuilderWizardData
): Promise<void> {
  try {
    // CSV dosyasını bul ve yükle
    let csvFile: File | null = null;
    
    // Library'den seçilmişse
    if (wizardData.dataSource === 'library' && wizardData.selectedLibraryFileName) {
      const fileName = wizardData.selectedLibraryFileName;
      const response = await fetch(`/demo-data/${fileName}`);
      if (!response.ok) throw new Error(`CSV bulunamadı: ${fileName}`);
      const blob = await response.blob();
      csvFile = new File([blob], fileName, { type: 'text/csv' });
    }
    
    if (!csvFile) {
      throw new Error('CSV dosyası yüklenemedi');
    }
    
    // CSV'yi parse et
    const parsedData = await parseCSVFile(csvFile);
    
    // Dashboard layout oluştur
    const layout = generateDashboardLayout(
      parsedData,
      wizardData.customizations.chartTypes[0] as any || 'line',
      wizardData.dashboardName
    );
    
    // Dashboard'u güncelle
    const store = loadStore();
    const arr = store.byUser[userId] ?? [];
    const idx = arr.findIndex((d) => d.id === dashboardId);
    if (idx === -1) return;
    
    arr[idx] = {
      ...arr[idx],
      renderedLayout: layout,
      status: 'ready',
      updatedAtIso: nowIso(),
    };
    
    store.byUser[userId] = arr;
    saveStore(store);
    
    // Event dispatch et (UI güncellenir)
    window.dispatchEvent(new CustomEvent('dashboard-ready', { detail: { dashboardId } }));
  } catch (error) {
    console.error('Dashboard processing failed:', error);
    
    // Hata durumunu kaydet
    const store = loadStore();
    const arr = store.byUser[userId] ?? [];
    const idx = arr.findIndex((d) => d.id === dashboardId);
    if (idx !== -1) {
      arr[idx] = { ...arr[idx], status: 'error', updatedAtIso: nowIso() };
      store.byUser[userId] = arr;
      saveStore(store);
    }
  }
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

