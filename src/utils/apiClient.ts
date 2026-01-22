/**
 * SECURITY-CRITICAL: API Client with Firebase Authentication
 * 
 * Automatically attaches Firebase ID token to all API requests.
 * Ensures authenticated requests to backend APIs.
 * 
 * @stability LOCKED
 * @security CRITICAL
 */

import { auth } from '../firebase';

/**
 * Make an authenticated API request
 * 
 * Automatically includes Firebase ID token in Authorization header
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated. Please login first.');
  }

  try {
    // Get fresh ID token
    const idToken = await user.getIdToken();

    // Merge headers with Authorization
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${idToken}`,
    };

    // Make the request
    return fetch(url, {
      ...options,
      headers,
    });
  } catch (error: any) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Make an authenticated API request (JSON)
 * 
 * Convenience method that sets Content-Type and parses JSON response
 */
export async function authenticatedFetchJson<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await authenticatedFetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Make an unauthenticated API request
 * 
 * For public endpoints that don't require authentication
 */
export async function publicFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(url, options);
}
