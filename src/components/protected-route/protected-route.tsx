import { useSelector } from "../../services/hooks/hooks";
import Preloader from '../Preloader/Preloader';
import { useLocation, Navigate } from 'react-router-dom';
import React, { FC, ReactNode, ReactElement } from 'react';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  component: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((state) => state.authReducer.isAuthChecked);
  const user = useSelector((state) => state.authReducer.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  return component as ReactElement<any, any> | null;
};

export const OnlyAuth = ProtectedRoute;

export const OnlyUnAuth: FC<ProtectedRouteProps> = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);