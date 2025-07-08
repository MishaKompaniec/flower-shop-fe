import Authorization from '../../pages/authorization';
import Store from '../../pages/store';
import Home from '../../pages/home';
import { Pages } from '../../utils/pages';
import type { IROUTE_MODEL } from '../../types';
import type { RouteProps } from 'react-router-dom';
import PrivateRoute from './privateRoute';

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
    path: Pages.AUTHORIZATION,
    element: <Authorization />,
  },
];
