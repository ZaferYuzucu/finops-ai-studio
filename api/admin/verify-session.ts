/**
 * SECURITY-CRITICAL: Verify Admin Session API
 * 
 * Checks if the current request has a valid admin session cookie.
 * Returns 200 if valid, 401 if invalid/expired.
 * 
 * @stability LOCKED
 * @security CRITICAL
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_lib/adminSession';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = requireAdmin(req);
  
  if (!auth.ok) {
    return res.status(401).json({ 
      authenticated: false,
      reason: auth.reason 
    });
  }

  return res.status(200).json({ 
    authenticated: true,
    role: 'admin'
  });
}
