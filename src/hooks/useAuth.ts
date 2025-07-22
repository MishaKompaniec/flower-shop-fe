import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout as authLogout, setToken } from '@/store/slices/authSlice';
import { clearBasket } from '@/store/slices/basketSlice';

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return {
    token,
    setToken: (token: string | null) => dispatch(setToken(token)),

    logout: () => {
      dispatch(authLogout());
      dispatch(clearBasket());
    },
  };
};
