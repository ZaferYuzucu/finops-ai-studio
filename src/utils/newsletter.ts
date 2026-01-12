import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const AUTO_SUBSCRIBE_LS_PREFIX = 'finops_newsletter_auto_subscribed:';

function getKey(email: string) {
  return `${AUTO_SUBSCRIBE_LS_PREFIX}${String(email || '').trim().toLowerCase()}`;
}

/**
 * Best-effort auto subscribe.
 * - Dedupe: localStorage flag per email (client-side).
 * - Never throws (errors are swallowed by caller).
 */
export async function autoSubscribeNewsletter(
  email: string,
  source: 'signup' | 'login' | 'admin',
) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) return;

  try {
    const key = getKey(normalized);
    if (typeof window !== 'undefined' && window.localStorage.getItem(key) === 'true') return;

    await addDoc(collection(db, 'aboneler'), {
      email: normalized,
      subscribedAt: serverTimestamp(),
      source,
      auto: true,
    });

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, 'true');
    }
  } catch (err) {
    // best-effort only (do not block signup/login flows)
    console.warn('Auto newsletter subscribe failed:', err);
  }
}

