import React, { useContext, useState, useEffect } from 'react';
import { registration, logIn } from '../../http/userAPI';
import { useNavigate } from 'react-router';
import './MainForm.sass';
import { Context } from '../../index';
import { MAIN_ROUTE } from '../../store/consts';
import { observer } from 'mobx-react';

const MainForm = observer(() => {
  const { user } = useContext(Context);
  const navigator = useNavigate();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user.isAuth) navigator(MAIN_ROUTE);
  });

  const signIn = async (e) => {
    e.preventDefault();
    let response;
    if (isLogin) {
      response = await logIn(name, password);
    } else {
      response = await registration(name, password);
    }
    if (response && typeof user === 'object') {
      delete response.exp;
      delete response.iat;
      user.setUser(response);
      user.setIsAuth(true);
      navigator(MAIN_ROUTE);
    }
  };

  return (
    <form action="" method="post" className="form">
      <h1 className="form__header">Библиотека</h1>
      <label htmlFor="fio" className="form__title">
        Введите ФИО:
      </label>
      <input
        type="text"
        name="fio"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form__input"
      />

      <label htmlFor="pass" className="form__title">
        Введите пароль:
      </label>
      <input
        type="password"
        name="pass"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form__input"
      />
      {!isLogin ? (
        <>
          <input
            type="button"
            value="Зарегистрироваться!"
            className="form__btn active"
            onClick={signIn}
          />
          <input
            type="button"
            value="Войти!"
            className="form__btn"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(true);
            }}
          />
        </>
      ) : (
        <>
          <input type="button" value="Войти!" className="form__btn active" onClick={signIn} />
          <input
            type="button"
            value="Зарегистрироваться!"
            className="form__btn"
            onClick={(e) => {
              setIsLogin(false);
            }}
          />
        </>
      )}
    </form>
  );
});

export default MainForm;
