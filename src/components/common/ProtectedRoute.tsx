import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  
  console.log('ProtectedRoute check:', {
    currentUser: currentUser ? { id: currentUser.id, role: currentUser.role } : null,
    isLoading,
    allowedRoles,
    currentPath: location.pathname
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <span className="ml-3">Loading...</span>
      </div>
    );
  }
  
  if (!currentUser) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    console.log(`User role '${currentUser.role}' not in allowed roles:`, allowedRoles);
    return <Navigate to="/" replace />;
  }
  
  console.log('Access granted for user:', currentUser.role);
  return <>{children}</>;
};

export default ProtectedRoute;