type ShareKind = 'demo' | 'template';

export type ShareSecurity = {
  /**
   * Optional expiry ISO timestamp. If provided, Share page must refuse access after this time.
   */
  expiresAtIso?: string;
  /**
   * Optional watermark text to render on the shared dashboard view.
   */
  watermarkText?: string;
  /**
   * If true, records view events locally (MVP).
   * Note: This is client-only and is NOT a server-side audit log.
   */
  logViews?: boolean;
};

export type DemoSharePayload = {
  kind: 'demo';
  title: string;
  generatedAtIso: string;
  security?: ShareSecurity;
  note: {
    dateRange: string;
    currency: string;
    source: string;
  };
  kpis: Array<{ label: string; value: number; prefix?: string; suffix?: string; trend: string }>;
  dailyData: Array<{ day: string; gelir: number; siparis: number }>;
  categoryData: Array<{ name: string; value: number; color: string }>;
  productData: Array<{ name: string; siparis: number; gelir: number }>;
};

export type TemplateSharePayload = {
  kind: 'template';
  templateId: string;
  templateLabel?: string;
  categoryLabel?: string;
  generatedAtIso: string;
  security?: ShareSecurity;
};

export type SharePayload = DemoSharePayload | TemplateSharePayload;

type StoredShareRecordV1 = {
  v: 1;
  createdAtIso: string;
  payload: SharePayload;
};

function base64UrlEncode(input: string): string {
  // UTF-8 safe base64
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  const b64 = btoa(binary);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function isLocalHostOrigin(): boolean {
  const h = window.location.hostname;
  return h === '127.0.0.1' || h === 'localhost';
}

function randomId(): string {
  // Prefer stable UUID if available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = window.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function localStorageKey(id: string): string {
  return `finops_share_${id}`;
}

export function createShortLocalShareUrl(payload: SharePayload): string {
  const id = randomId();
  try {
    const record: StoredShareRecordV1 = {
      v: 1,
      createdAtIso: new Date().toISOString(),
      payload,
    };
    localStorage.setItem(localStorageKey(id), JSON.stringify(record));
  } catch {
    // If storage is blocked, fall back to embedded URL
    return createEmbeddedShareUrl(payload);
  }
  const url = new URL('/share', window.location.origin);
  url.searchParams.set('s', id);
  return url.toString();
}

export function createEmbeddedShareUrl(payload: SharePayload): string {
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const url = new URL('/share', window.location.origin);
  url.searchParams.set('d', encoded);
  return url.toString();
}

/**
 * Creates a share URL.
 * - On localhost, defaults to a SHORT link using localStorage (nice for WhatsApp testing).
 * - On real domains, defaults to embedded payload (temporary) until server-side shares are implemented.
 */
export function createShareUrl(payload: SharePayload): string {
  if (isLocalHostOrigin()) return createShortLocalShareUrl(payload);
  return createEmbeddedShareUrl(payload);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall back below
  }
  try {
    window.prompt('Linki kopyalayın:', text);
    return false;
  } catch {
    return false;
  }
}

export function kindFromPayload(payload: SharePayload): ShareKind {
  return payload.kind;
}

