import type { ServiceAccount } from 'firebase-admin/app';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

function getServiceAccount(): ServiceAccount {
  // Preferred: a single JSON env var (easy to paste into Vercel)
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    return JSON.parse(json) as ServiceAccount;
  }

  // Fallback: split env vars
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin env missing. Provide FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY.'
    );
  }

  // Vercel stores multiline secrets with escaped newlines
  privateKey = privateKey.replace(/\\n/g, '\n');

  return { projectId, clientEmail, privateKey } as ServiceAccount;
}

export function getAdminDb() {
  if (!getApps().length) {
    const sa = getServiceAccount();
    initializeApp({ credential: cert(sa) });
  }
  return getFirestore();
}

export { FieldValue };

