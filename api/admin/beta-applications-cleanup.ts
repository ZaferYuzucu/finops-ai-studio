import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminDb } from '../_lib/firebaseAuth';
import { requireAdmin } from '../_lib/adminSession';

type CleanupBody = {
  keepEmails?: string[];
  test1?: {
    email?: string;
    contactName?: string;
    companyName?: string;
    bag?: string;
  };
};

function normalizeEmail(v: unknown) {
  return String(v || '').trim().toLowerCase();
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = requireAdmin(req);
  if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = (req.body || {}) as CleanupBody;
    const keepEmails = (body.keepEmails || []).map(normalizeEmail).filter(Boolean);
    if (keepEmails.length === 0) {
      return res.status(400).json({ error: 'Missing keepEmails' });
    }

    const keepSet = new Set(keepEmails);
    const test1Email = normalizeEmail(body.test1?.email || 'zaferyuzucu@gmail.com');
    const test1ContactName = String(body.test1?.contactName || 'Test1');
    const test1CompanyName = body.test1?.companyName ? String(body.test1.companyName) : undefined;
    const test1Bag = String(body.test1?.bag || 'Test1Seed.co.csv');

    const db = getAdminDb();
    const appsRef = db.collection('beta_applications');

    // Pull a bounded set (admin UI already uses 500). Cleanup is meant for that working set.
    const snap = await appsRef.orderBy('appliedAt', 'desc').limit(500).get();

    const seenEmail = new Set<string>();
    const deletes: FirebaseFirestore.DocumentReference[] = [];
    const updates: Array<{ ref: FirebaseFirestore.DocumentReference; data: Record<string, unknown> }> = [];
    const keptIds: string[] = [];

    for (const doc of snap.docs) {
      const data = doc.data() as any;
      const email = normalizeEmail(data?.email);

      // Anything not in whitelist gets deleted
      if (!keepSet.has(email)) {
        deletes.push(doc.ref);
        continue;
      }

      // Keep only the newest record per email, delete the rest (duplicates)
      if (seenEmail.has(email)) {
        deletes.push(doc.ref);
        continue;
      }
      seenEmail.add(email);
      keptIds.push(doc.id);

      // Ensure the kept records are marked approved and (optionally) annotated.
      const nowIso = new Date().toISOString();
      const patch: Record<string, unknown> = {
        status: 'approved',
        reviewedAt: nowIso,
        reviewedBy: 'admin',
      };

      if (email === test1Email) {
        patch.contactName = test1ContactName;
        if (test1CompanyName) patch.companyName = test1CompanyName;
        // Put the "bag" hint into notes so it is visible/searchable in admin.
        const note = `Bag: ${test1Bag}`;
        const existingNotes = String(data?.adminNotes || '');
        patch.adminNotes = existingNotes.includes(test1Bag) ? existingNotes : [existingNotes, note].filter(Boolean).join(' | ');
      }

      updates.push({ ref: doc.ref, data: patch });
    }

    // Apply deletes in chunks (Firestore batch limit is 500 ops)
    let deletedCount = 0;
    for (const group of chunk(deletes, 450)) {
      const batch = db.batch();
      for (const ref of group) batch.delete(ref);
      await batch.commit();
      deletedCount += group.length;
    }

    // Apply updates in chunks
    let updatedCount = 0;
    for (const group of chunk(updates, 450)) {
      const batch = db.batch();
      for (const u of group) batch.set(u.ref, u.data, { merge: true });
      await batch.commit();
      updatedCount += group.length;
    }

    return res.status(200).json({
      success: true,
      deletedCount,
      updatedCount,
      keptIds,
      keepEmails,
    });
  } catch (error: any) {
    console.error('[admin/beta-applications-cleanup] error:', error);
    return res.status(500).json({ error: 'Server error', details: error?.message || String(error) });
  }
}

