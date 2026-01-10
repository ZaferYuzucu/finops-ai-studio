// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
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

  // Eğer giriş yapmış bir kullanıcı yoksa, /login sayfasına yönlendir.
  // Giriş yapmış kullanıcı varsa, alt bileşenleri (Outlet) göster.
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
