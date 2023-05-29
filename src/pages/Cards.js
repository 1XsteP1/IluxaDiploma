import { observer } from 'mobx-react';
import { useContext, useLayoutEffect } from 'react';
import { Context } from '..';
import { getCards } from '../http/userAPI';
import ControlPanel from '../components/ControlPanel/ControlPanel';

const Cards = observer(() => {
  const { cards } = useContext(Context);

  const getAllCards = async () => {
    const response = await getCards();
    cards.setCards(response);
  };

  useLayoutEffect(() => {
    getAllCards();
  }, []);

  return (
    <div className="cards">
      {Object.keys(cards.cards).length !== 0 &&
        cards.cards.map((crd) => {
          return (
            <div className="cards__block">
              <h1 className="cards__title">Индекс: {crd.Index}</h1>
              <p className="cards__subtitle">
                <b>Книга: </b>
                {crd.book.Name} (ID: {crd.userID})
              </p>
              <p className="cards__subtitle">
                <b>Ученик: </b>
                {crd.user.Name} (ID: {crd.userID})
              </p>
              <ControlPanel obj={crd} table="card" />
            </div>
          );
        })}
    </div>
  );
});

export default Cards;
