import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter/AppRouter';
import { check } from './http/userAPI';
import { Context } from '.';
import Header from './components/Header/Header';

function App() {
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const auth = async () => {
    await check()
      .then((data) => {
        delete data.exp;
        delete data.iat;
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    auth();
  });

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {!isLoading ? <AppRouter /> : ''}
    </BrowserRouter>
  );
}

export default App;
