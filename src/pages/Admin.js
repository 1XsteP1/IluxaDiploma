import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router';
import { AUTH_ROUTE } from '../store/consts';
import { getUsersCards } from '../http/userAPI';
import { observer } from 'mobx-react';
import Card from '../components/Card/Card';

const Admin = observer(() => {
  const { user, cards } = useContext(Context);
  const navigator = useNavigate();

  const getCards = async () => {
    const response = await getUsersCards(user.user.id);
    cards.setCards(response);
  };

  useEffect(() => {
    getCards();
  }, []);

  const handleQuit = async () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    navigator(AUTH_ROUTE);
  };

  return (
    <div className="admin">
      <h2 className="admin__title">Личный кабинет</h2>
      <div className="admin__container">
        {Object.keys(user.user).map((value) => (
          <p key={value} className="admin__subtitle">
            <b>{value}</b>: {user.user[value]}
          </p>
        ))}
        <h2 className="admin__header">Ваши библиотечные карты:</h2>
        <div className="admin__cards">
          {Object.keys(cards.cards).length !== 0 && cards.cards.map((card) => <Card card={card} />)}
        </div>
        <button className="admin__btn" onClick={handleQuit}>
          Выйти
        </button>
      </div>
    </div>
  );
});

export default Admin;
