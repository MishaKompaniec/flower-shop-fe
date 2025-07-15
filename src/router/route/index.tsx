import type { RouteProps } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { IROUTE_MODEL } from '@/types';
import { Pages } from '@/utils/pages';
import Home from '@/pages/home';
import Store from '@/pages/store';
import AdminPanel from '@/pages/adminPanel';
import Profile from '@/pages/profile';
import Authorization from '@/pages/authorization';

export const ROUTES: IROUTE_MODEL<RouteProps['children']>[] = [
  {
    path: Pages.HOME,
    element: <Home />,
  },
  {
    path: Pages.STORE,
    element: <Store />,
  },
  {
    path: Pages.ADMIN,
    element: (
      <PrivateRoute>
        <AdminPanel />
      </PrivateRoute>
    ),
  },
  {
    path: Pages.PROFILE,
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: Pages.AUTHORIZATION,
    element: <Authorization />,
  },
];
