import { Route, Routes as DomRoutes } from 'react-router-dom';

import { ROUTES } from './route';
import type { FC } from 'react';

const Routes: FC = () => {
  return (
    <DomRoutes>
      {ROUTES.map(({ path, element }, index) => (
        <Route element={element} key={index} path={path} />
      ))}
    </DomRoutes>
  );
};

export default Routes;
