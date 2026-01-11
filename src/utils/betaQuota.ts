const LS_KEY = 'finops_beta_applications';

export const BETA_LIMIT = 20;

type BetaApplicationLike = {
  email?: string;
  status?: string;
};

function safeParseJson<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getLocalBetaApplications(): BetaApplicationLike[] {
  if (typeof window === 'undefined') return [];
  return safeParseJson<BetaApplicationLike[]>(window.localStorage.getItem(LS_KEY), []);
}

/**
 * Quota usage heuristic (demo-safe):
 * - Count unique emails to avoid double-counting retries.
 * - Count all non-rejected applications as "consumed".
 */
export function getLocalBetaCount(): number {
  const apps = getLocalBetaApplications();
  const unique = new Set<string>();
  for (const a of apps) {
    if (a?.status === 'rejected') continue;
    const email = (a?.email || '').trim().toLowerCase();
    if (!email) continue;
    unique.add(email);
  }
  return unique.size;
}

export function getLocalRemainingBetaQuota(): number {
  return Math.max(0, BETA_LIMIT - getLocalBetaCount());
}

export function isLocalBetaQuotaFull(): boolean {
  return getLocalBetaCount() >= BETA_LIMIT;
}

