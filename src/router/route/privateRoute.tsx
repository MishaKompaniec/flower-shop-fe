import { Navigate } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import { useAuth } from '../../context/authContext';

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to='/authorization' replace />;
};

export default PrivateRoute;
