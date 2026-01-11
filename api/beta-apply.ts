import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminDb, FieldValue } from './_lib/firebaseAdmin';
import { requireAdmin } from './_lib/adminSession';

const BETA_LIMIT = 20;

function requiredString(v: unknown) {
  return typeof v === 'string' && v.trim().length > 0;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const db = getAdminDb();

    const body = req.body || {};
    const companyName = body.companyName;
    const contactName = body.contactName;
    const email = body.email;
    const phone = body.phone;
    const sector = body.sector || 'other';
    const employeeCount = body.employeeCount || '1-10';
    const description = body.description || '';
    const source = body.source || 'user';

    // Admin-created offers should require admin session
    if (source === 'admin') {
      const auth = requireAdmin(req);
      if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!requiredString(companyName) || !requiredString(contactName) || !requiredString(email) || !requiredString(phone)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Quota check + increment
    const quotaRef = db.collection('system').doc('beta_limit');
    const appsRef = db.collection('beta_applications');

    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(quotaRef);
      const current = snap.exists ? (snap.data()?.count ?? 0) : 0;
      if (current >= BETA_LIMIT) {
        return { ok: false as const, current };
      }

      const appliedAt = new Date().toISOString();
      const docRef = appsRef.doc();
      tx.set(docRef, {
        companyName,
        contactName,
        email,
        phone,
        sector,
        employeeCount,
        description,
        source,
        status: 'pending',
        appliedAt,
        approvalEmailSent: false,
      });

      if (!snap.exists) {
        tx.set(quotaRef, { count: 1, createdAt: new Date().toISOString() });
        return { ok: true as const, id: docRef.id, remaining: BETA_LIMIT - 1, total: BETA_LIMIT };
      }

      tx.update(quotaRef, { count: FieldValue.increment(1) });
      return { ok: true as const, id: docRef.id, remaining: BETA_LIMIT - (current + 1), total: BETA_LIMIT };
    });

    if (!result.ok) {
      return res.status(409).json({ error: 'Quota full', total: BETA_LIMIT, remaining: 0 });
    }

    return res.status(200).json({ success: true, id: result.id, remaining: result.remaining, total: result.total });
  } catch (error: any) {
    console.error('[beta-apply] error:', error);
    return res.status(500).json({
      error: 'Server error',
      details: error?.message || String(error),
    });
  }
}

