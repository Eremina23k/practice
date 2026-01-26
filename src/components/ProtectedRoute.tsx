import React from 'react';
import { Navigate } from 'react-router-dom';

// TODO: добавить проверку авторизации и роли
const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: string }> = ({ children, role }) => {
  const isAuth = false; // TODO: заменить на реальную проверку
  const isAllowed = !role || role === 'admin'; // TODO: заменить на реальную проверку

  if (!isAuth || !isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute; 