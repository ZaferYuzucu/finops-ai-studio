/**
 * SECURITY-CRITICAL: Firebase Auth Middleware for API Routes
 * 
 * ⚠️ DO NOT MODIFY WITHOUT SECURITY TEAM APPROVAL
 * 
 * Verifies Firebase ID tokens on server-side API routes.
 * Replaces insecure session cookies with real JWT verification.
 * 
 * SECURITY GUARANTEES:
 * - All API requests verified via Firebase Admin SDK
 * - Tokens cannot be forged (RSA signatures)
 * - Automatic token expiration (1 hour)
 * - User identity verified server-side
 * 
 * @stability LOCKED
 * @security CRITICAL
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (singleton)
if (getApps().length === 0) {
  try {
    // SECURITY-CRITICAL: Service account credentials REQUIRED
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountKey) {
      throw new Error(
        '❌ FIREBASE_SERVICE_ACCOUNT_KEY environment variable is REQUIRED. ' +
        'Production deployment cannot proceed without valid service account credentials.'
      );
    }

    const serviceAccount = JSON.parse(serviceAccountKey);

    initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'finopsprojesi-39510656-2ec03'
    });
    
    console.log('✅ Firebase Admin SDK initialized with service account');
  } catch (error: any) {
    console.error('❌ CRITICAL: Failed to initialize Firebase Admin SDK:', error.message);
    throw error; // FAIL FAST - do not allow system to start without proper credentials
  }
}

export interface AuthenticatedRequest extends VercelRequest {
  user?: {
    uid: string;
    email?: string;
    role?: string;
  };
}

/**
 * SECURITY-CRITICAL: Verify Firebase ID token
 * 
 * Extracts token from Authorization header and verifies it.
 * Returns user data if valid, null if invalid.
 */
export async function verifyAuthToken(req: VercelRequest): Promise<{
  uid: string;
  email?: string;
  role?: string;
} | null> {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('⚠️ Missing or invalid Authorization header');
      return null;
    }

    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      console.warn('⚠️ No token provided');
      return null;
    }

    // SECURITY-CRITICAL: Verify token with Firebase Admin SDK
    const decodedToken = await getAuth().verifyIdToken(token);
    
    console.log('✅ Token verified for user:', decodedToken.uid);
    
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'user' // Custom claim (set via Admin SDK)
    };
  } catch (error: any) {
    console.error('❌ Token verification failed:', error.message);
    return null;
  }
}

/**
 * SECURITY-CRITICAL: Require authentication middleware
 * 
 * Verifies token and attaches user to request.
 * Returns 401 if authentication fails.
 * 
 * Usage:
 * ```typescript
 * export default async function handler(req: VercelRequest, res: VercelResponse) {
 *   const user = await requireAuth(req, res);
 *   if (!user) return; // Response already sent
 *   
 *   // User is authenticated, proceed with request
 *   // Access user via: user.uid, user.email, user.role
 * }
 * ```
 */
export async function requireAuth(
  req: VercelRequest,
  res: VercelResponse
): Promise<{ uid: string; email?: string; role?: string } | null> {
  const user = await verifyAuthToken(req);
  
  if (!user) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid authentication required'
    });
    return null;
  }
  
  return user;
}

/**
 * SECURITY-CRITICAL: Require admin role
 * 
 * Verifies token AND checks for admin role.
 * Returns 403 if user is not admin.
 * 
 * Usage:
 * ```typescript
 * export default async function handler(req: VercelRequest, res: VercelResponse) {
 *   const admin = await requireAdmin(req, res);
 *   if (!admin) return; // Response already sent
 *   
 *   // User is authenticated AND is admin
 * }
 * ```
 */
export async function requireAdmin(
  req: VercelRequest,
  res: VercelResponse
): Promise<{ uid: string; email?: string; role: string } | null> {
  const user = await requireAuth(req, res);
  
  if (!user) {
    return null; // Already sent 401 response
  }
  
  if (user.role !== 'admin') {
    res.status(403).json({
      error: 'Forbidden',
      message: 'Admin privileges required'
    });
    return null;
  }
  
  return user as { uid: string; email?: string; role: string };
}

/**
 * SECURITY-CRITICAL: Get Firestore Admin instance
 * 
 * Returns the Firestore Admin SDK instance for server-side database operations.
 * Ensures Firebase Admin SDK is initialized before use.
 */
export function getAdminDb() {
  if (getApps().length === 0) {
    throw new Error('Firebase Admin SDK not initialized. This should never happen.');
  }
  return getFirestore();
}

/**
 * SECURITY NOTE:
 * 
 * This replaces the previous insecure authentication mechanisms:
 * 
 * ❌ REMOVED: localStorage admin flags
 * ❌ REMOVED: Hardcoded admin passwords
 * ❌ REMOVED: HMAC session tokens with weak secrets
 * ❌ REMOVED: No token verification
 * ❌ REMOVED: Dev mode fallback (security risk)
 * 
 * ✅ IMPLEMENTED: Firebase Admin SDK token verification
 * ✅ IMPLEMENTED: RSA signature validation
 * ✅ IMPLEMENTED: Automatic token expiration
 * ✅ IMPLEMENTED: Role-based access control
 * ✅ IMPLEMENTED: Server-side verification (cannot be bypassed)
 * ✅ IMPLEMENTED: Service account REQUIRED (no fallback)
 * ✅ IMPLEMENTED: Fail-fast on missing credentials
 * 
 * All API routes MUST use requireAuth() or requireAdmin() middleware.
 * NO EXCEPTIONS.
 */
