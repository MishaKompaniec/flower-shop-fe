import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout, setToken } from '@/store/slices/authSlice';

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return {
    token,
    setToken: (token: string | null) => dispatch(setToken(token)),
    logout: () => dispatch(logout()),
  };
};
