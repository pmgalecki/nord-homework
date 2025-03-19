import { ReactNode } from 'react';
import { useAuth } from '../../hooks';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};
