// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  // Eğer giriş yapmış bir kullanıcı yoksa, /login sayfasına yönlendir.
  // Giriş yapmış kullanıcı varsa, alt bileşenleri (Outlet) göster.
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
