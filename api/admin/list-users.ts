/**
 * ADMIN API: List Firebase Authentication Users
 * 
 * Lists all users from Firebase Authentication using Admin SDK.
 * 
 * SECURITY:
 * - Requires admin session (HMAC cookie)
 * - Server-side only (Vercel function)
 * - NO passwords returned (Firebase doesn't provide them)
 * 
 * RETURNS:
 * - uid
 * - email
 * - providerData (Google, email/password, etc.)
 * - creationTime
 * - lastSignInTime
 * - disabled status
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAuth } from 'firebase-admin/auth';
import { requireAdmin } from '../_lib/adminSession';

interface UserInfo {
  uid: string;
  email: string | undefined;
  emailVerified: boolean;
  displayName: string | undefined;
  photoURL: string | undefined;
  disabled: boolean;
  providerData: Array<{
    providerId: string;
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
  }>;
  metadata: {
    creationTime: string | undefined;
    lastSignInTime: string | undefined;
    lastRefreshTime: string | undefined;
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // TEMPORARY: Accept both Firebase Auth and HMAC session
  // Try Firebase Auth first
  const { verifyAuthToken } = await import('../_lib/firebaseAuth');
  let isAdmin = false;
  
  try {
    const user = await verifyAuthToken(req);
    if (user && user.role === 'admin') {
      isAdmin = true;
      console.log('✅ Admin authenticated via Firebase:', user.uid);
    }
  } catch (error) {
    // Fall back to HMAC session
    const auth = requireAdmin(req);
    if (auth.ok) {
      isAdmin = true;
      console.log('✅ Admin authenticated via HMAC session');
    }
  }

  if (!isAdmin) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Admin authentication required'
    });
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get query parameters for pagination
    const maxResults = parseInt(req.query.maxResults as string) || 1000;
    const pageToken = req.query.pageToken as string | undefined;

    console.log(`📋 [Admin] Listing Firebase Auth users (max: ${maxResults})`);

    // List users from Firebase Authentication
    const listUsersResult = await getAuth().listUsers(maxResults, pageToken);

    // Transform user data to our format
    const users: UserInfo[] = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      disabled: user.disabled,
      providerData: user.providerData.map(provider => ({
        providerId: provider.providerId,
        uid: provider.uid,
        displayName: provider.displayName,
        email: provider.email,
        photoURL: provider.photoURL,
      })),
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        lastRefreshTime: user.metadata.lastRefreshTime,
      },
    }));

    console.log(`✅ [Admin] Found ${users.length} users`);

    // Return response with pagination info
    return res.status(200).json({
      success: true,
      users,
      pageToken: listUsersResult.pageToken,
      totalCount: users.length,
      hasMore: !!listUsersResult.pageToken,
    });

  } catch (error: any) {
    console.error('❌ [Admin] Error listing users:', error);
    
    return res.status(500).json({
      error: 'Failed to list users',
      message: error.message || 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
