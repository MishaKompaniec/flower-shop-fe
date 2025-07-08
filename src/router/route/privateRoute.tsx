import { Navigate } from 'react-router-dom';
import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/authorization' replace />;
};

export default PrivateRoute;
