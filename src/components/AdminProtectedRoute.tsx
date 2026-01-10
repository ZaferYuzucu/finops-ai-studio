
import React from 'react';
import { Navigate } from 'react-router-dom';

// Bileşenin `children` prop'unu kabul etmesi için tipi tanımla
interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  // Dev-only bypass (do NOT enable in prod builds).
  const disableAdminGuard =
    import.meta.env.DEV && import.meta.env.VITE_DISABLE_AUTH_GUARD === 'true';
  if (disableAdminGuard) {
    return <>{children}</>;
  }

  // localStorage'dan kontrol et (kalıcı - sayfa yenilendiğinde silinmez!)
  const isAuthenticatedLocal = localStorage.getItem('isAdminAuthenticated');
  const isAuthenticatedSession = sessionStorage.getItem('isAdminAuthenticated');
  
  const isAuthenticated = isAuthenticatedLocal === 'true' || isAuthenticatedSession === 'true';

  // Eğer yönetici girişi yapılmışsa, korunan sayfayı (children) göster.
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Eğer giriş yapılmamışsa, /admin-login sayfasına yönlendir.
  return <Navigate to="/admin-login" />;
};

export default AdminProtectedRoute;
