/**
 * SECURITY-CRITICAL: Admin Protected Route
 * 
 * ⚠️ DO NOT MODIFY WITHOUT SECURITY TEAM APPROVAL
 * 
 * Protects admin routes using server-side HMAC session cookies.
 * Verifies admin session via API call (httpOnly cookie).
 * 
 * @stability LOCKED
 * @security CRITICAL
 */

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  // Dev-only bypass (NEVER enable in production)
  const disableAdminGuard =
    import.meta.env.DEV && import.meta.env.VITE_DISABLE_AUTH_GUARD === 'true';
  
  useEffect(() => {
    if (disableAdminGuard) {
      console.warn('⚠️ ADMIN GUARD DISABLED - DEV MODE ONLY');
      setIsAuthenticated(true);
      return;
    }

    // SECURITY-CRITICAL: Verify admin session via API
    const verifySession = async () => {
      try {
        const response = await fetch('/api/admin/verify-session', {
          method: 'GET',
          credentials: 'include', // Include httpOnly cookie
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated === true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Admin session verification failed:', error);
        setIsAuthenticated(false);
      }
    };

    verifySession();
  }, [disableAdminGuard, location.pathname]);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Authenticated - show protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Not authenticated - redirect to login
  return <Navigate to={`/admin-login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
};

export default AdminProtectedRoute;
