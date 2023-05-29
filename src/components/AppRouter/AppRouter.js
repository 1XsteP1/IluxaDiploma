import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../../routes';
import { Context } from '../../index';
import Header from '../Header/Header';

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <>
      {user.isAuth && <Header />}
      <Routes>
        {user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} exact />
          ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      </Routes>
    </>
  );
});

export default AppRouter;
