
import React from 'react';
import { Navigate } from 'react-router-dom';

// Bileşenin `children` prop'unu kabul etmesi için tipi tanımla
interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');

  // Eğer yönetici girişi yapılmışsa, korunan sayfayı (children) göster.
  if (isAuthenticated === 'true') {
    return <>{children}</>;
  }

  // Eğer giriş yapılmamışsa, /admin-login sayfasına yönlendir.
  return <Navigate to="/admin-login" />;
};

export default AdminProtectedRoute;
