/**
 * Protected Route - User Routes Only
 * 
 * Ensures only regular users (non-admin) can access user routes
 * Redirects admins to admin office
 * Redirects unauthenticated users to login page
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser, loading, isAdmin } = useAuth();
  const location = useLocation();

  // Dev-only temporary bypass for a specific flow (do NOT enable in prod builds).
  const disableAuthGuard =
    import.meta.env.DEV && import.meta.env.VITE_DISABLE_AUTH_GUARD === 'true';
  const bypassPrefixes = [
    // Beta flow (data entry)
    '/veri-girisi',
    // Dashboard demo + templates (admin review / demo)
    '/dashboard/demo-preview',
    '/dashboard',
    '/dashboards',
    '/professional-dashboards',
  ];
  const isBypassAllowedRoute = bypassPrefixes.some((prefix) =>
    location.pathname.startsWith(prefix),
  );

  if (disableAuthGuard && isBypassAllowedRoute) {
    return <Outlet />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If admin tries to access user routes, redirect to admin office
  if (currentUser && isAdmin) {
    console.log('🚫 Admin cannot access user routes - redirecting to office');
    return <Navigate to="/office" replace />;
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    console.log('🔒 Not authenticated - redirecting to login');
    return <Navigate to="/login" />;
  }

  // Regular user - allow access
  return <Outlet />;
};

export default ProtectedRoute;
