import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminDb } from '../../_lib/firebaseAdmin';
import { requireAdmin } from '../../_lib/adminSession';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  const id = (req.query.id || '') as string;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const { status, adminNotes } = (req.body || {}) as { status?: string; adminNotes?: string };
  if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const db = getAdminDb();
    const ref = db.collection('beta_applications').doc(id);
    await ref.update({
      status,
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'admin',
      ...(adminNotes ? { adminNotes } : {}),
    });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('[admin/beta-applications/:id] error:', error);
    return res.status(500).json({ error: 'Server error', details: error?.message || String(error) });
  }
}

