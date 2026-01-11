import crypto from 'crypto';
import type { VercelRequest } from '@vercel/node';

type SessionPayload = {
  iat: number;
  exp: number;
};

function base64UrlEncode(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf8');
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(input: string) {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad;
  return Buffer.from(b64, 'base64').toString('utf8');
}

function sign(data: string, secret: string) {
  return base64UrlEncode(crypto.createHmac('sha256', secret).update(data).digest());
}

export function createAdminSessionToken(ttlSeconds: number) {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'ATA1923';
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { iat: now, exp: now + ttlSeconds };
  const body = base64UrlEncode(JSON.stringify(payload));
  const sig = sign(body, secret);
  return `${body}.${sig}`;
}

export function verifyAdminSessionToken(token: string | null | undefined) {
  if (!token) return { ok: false as const, reason: 'missing' as const };
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'ATA1923';
  const [body, sig] = token.split('.');
  if (!body || !sig) return { ok: false as const, reason: 'malformed' as const };
  const expected = sign(body, secret);
  if (expected !== sig) return { ok: false as const, reason: 'bad_sig' as const };
  const payload = JSON.parse(base64UrlDecode(body)) as SessionPayload;
  const now = Math.floor(Date.now() / 1000);
  if (!payload?.exp || payload.exp < now) return { ok: false as const, reason: 'expired' as const };
  return { ok: true as const, payload };
}

export function readCookie(req: VercelRequest, name: string) {
  const header = req.headers.cookie;
  if (!header) return null;
  const parts = header.split(';').map((p) => p.trim());
  for (const p of parts) {
    if (p.startsWith(name + '=')) return decodeURIComponent(p.slice(name.length + 1));
  }
  return null;
}

export function requireAdmin(req: VercelRequest) {
  const token = readCookie(req, 'finops_admin_session');
  return verifyAdminSessionToken(token);
}

