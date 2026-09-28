import { useGetCurrentUser } from '@/entities/user';
import { RoleName } from '@/types';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: RoleName;
}

export const ProtectedRoute = ({
  children,
  requiredRole = 'user',
}: ProtectedRouteProps) => {
  const { data: user, isLoading } = useGetCurrentUser()

  const isLoggenIn = () => {
    return localStorage.getItem('accessToken') !== null;
  };
  
  if (isLoading) return <div>Проверка авторизации...</div>;

  if (!isLoggedIn || user?.role !== requiredRole)
    return <Navigate to="/login" />;

  if (user && user?.role !== requiredRole) return <Navigate to="/" />;

  return <>{children}</>;
};
