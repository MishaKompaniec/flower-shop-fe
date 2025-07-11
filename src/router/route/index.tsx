import Authorization from '../../pages/authorization';
import Store from '../../pages/store';
import Home from '../../pages/home';
import { Pages } from '../../utils/pages';
import type { IROUTE_MODEL } from '../../types';
import type { RouteProps } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import AdminPanel from '../../pages/adminPanel';
import Profile from '../../pages/profile';

export const ROUTES: IROUTE_MODEL<RouteProps['children']>[] = [
  {
    path: Pages.HOME,
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: Pages.STORE,
    element: (
      <PrivateRoute>
        <Store />
      </PrivateRoute>
    ),
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
