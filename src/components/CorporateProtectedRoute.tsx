import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface CorporateProtectedRouteProps {
  children: React.ReactElement;
}

const CorporateProtectedRoute: React.FC<CorporateProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isCorporateAdminAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/corporate-admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default CorporateProtectedRoute;
