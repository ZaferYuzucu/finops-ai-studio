import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createAdminSessionToken } from '../_lib/adminSession';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = (req.body || {}) as { password?: string };
  if (!password) return res.status(400).json({ error: 'Missing password' });

  // For demo, fallback to the same password used in UI if env not set.
  const expected = process.env.ADMIN_PASSWORD || 'ATA1923';
  if (password !== expected) return res.status(401).json({ error: 'Invalid password' });

  const token = createAdminSessionToken(60 * 60 * 12); // 12h
  // httpOnly cookie to avoid exposing token to JS
  const proto = (req.headers['x-forwarded-proto'] || '').toString();
  const secure = proto === 'https' ? ' Secure;' : '';
  res.setHeader('Set-Cookie', `finops_admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax;${secure}`);

  return res.status(200).json({ success: true });
}

