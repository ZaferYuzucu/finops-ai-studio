import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminDb } from '../_lib/firebaseAdmin';
import { requireAdmin } from '../_lib/adminSession';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const db = getAdminDb();
    const snap = await db.collection('beta_applications').orderBy('appliedAt', 'desc').limit(500).get();
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return res.status(200).json({ success: true, items });
  } catch (error: any) {
    console.error('[admin/beta-applications] error:', error);
    return res.status(500).json({ error: 'Server error', details: error?.message || String(error) });
  }
}

