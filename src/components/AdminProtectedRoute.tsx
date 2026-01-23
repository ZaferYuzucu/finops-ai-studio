/**
 * Admin Protected Route
 * 
 * Ensures only admin users can access admin routes
 * Redirects non-admin users to admin login page
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading, isAdmin } = useAuth();
  const location = useLocation();

  // Dev-only bypass
  const disableAdminGuard =
    import.meta.env.DEV && import.meta.env.VITE_DISABLE_AUTH_GUARD === 'true';
  
  if (disableAdminGuard) {
    console.warn('⚠️ ADMIN GUARD DISABLED - DEV MODE');
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Check if user is authenticated and is admin
  if (currentUser && isAdmin) {
    console.log('✅ Admin access granted');
    return <>{children}</>;
  }

  // Not authenticated or not admin - redirect to admin login
  console.log('❌ Admin access denied - redirecting to admin login');
  return <Navigate to={`/admin-login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
};

export default AdminProtectedRoute;
