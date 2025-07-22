import { Navigate } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to='/authorization' replace />;
};

export default PrivateRoute;
