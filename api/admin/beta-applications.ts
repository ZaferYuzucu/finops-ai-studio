import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminDb } from '../_lib/firebaseAuth';
import { requireAdmin } from '../_lib/adminSession';

function requiredString(v: unknown) {
  return typeof v === 'string' && v.trim().length > 0;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const db = getAdminDb();

    // List
    if (req.method === 'GET') {
      const snap = await db.collection('beta_applications').orderBy('appliedAt', 'desc').limit(500).get();
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return res.status(200).json({ success: true, items });
    }

    // Upsert (create or mark approved)
    if (req.method === 'POST') {
      const body = req.body || {};
      const companyName = body.companyName;
      const contactName = body.contactName;
      const email = body.email;
      const phone = body.phone;
      const sector = body.sector || 'other';
      const employeeCount = body.employeeCount || '1-10';
      const description = body.description || '';
      const source = body.source || 'admin';

      if (!requiredString(companyName) || !requiredString(contactName) || !requiredString(email) || !requiredString(phone)) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email))) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const appsRef = db.collection('beta_applications');
      const normalizedEmail = String(email).trim().toLowerCase();

      // Match the intended record as tightly as possible (email + companyName)
      const existingSnap = await appsRef
        .where('email', '==', normalizedEmail)
        .where('companyName', '==', String(companyName))
        .limit(1)
        .get();

      const nowIso = new Date().toISOString();
      const patch = {
        companyName: String(companyName),
        contactName: String(contactName),
        email: normalizedEmail,
        phone: String(phone),
        sector: String(sector),
        employeeCount: String(employeeCount),
        description: String(description),
        source: String(source),
        status: 'approved',
        reviewedAt: nowIso,
        reviewedBy: 'admin',
        approvalEmailSent: false,
        adminNotes: 'Admin manual Beta Partner approval (upsert)',
      };

      if (!existingSnap.empty) {
        const docRef = existingSnap.docs[0].ref;
        await docRef.set(patch, { merge: true });
        return res.status(200).json({ success: true, id: docRef.id, action: 'updated' });
      }

      const docRef = await appsRef.add({
        ...patch,
        appliedAt: nowIso,
      });
      return res.status(200).json({ success: true, id: docRef.id, action: 'created' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[admin/beta-applications] error:', error);
    return res.status(500).json({ error: 'Server error', details: error?.message || String(error) });
  }
}

