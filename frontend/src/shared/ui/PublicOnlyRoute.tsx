import { Navigate, Outlet } from 'react-router';
import React from 'react';

export const PublicOnlyRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isLoggenIn = () => {
    return localStorage.getItem('accessToken') !== null;
  };

  if (isLoggenIn()) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
