import { useContext } from 'react';
import './Book.sass';
import { Context } from '../..';
import { createCard } from '../../http/userAPI';
import ControlPanel from '../ControlPanel/ControlPanel';

const Book = (props) => {
  const { user } = useContext(Context);

  const handleButtonClick = async () => {
    const response = await createCard(props.ID, user.user.id);
    console.log(response.message);
  };

  return (
    <div className="book" id={`book${props.ID}`}>
      <img src={`http://localhost:987/api/${props.Image}`} alt={props.Name} className="book__img" />
      <h1 className="book__title">{props.Name}</h1>
      <div className="book__descr">
        <p className="book__subtitle">
          <b>Писатель:</b> {props.Author.Name}
        </p>
        <p className="book__subtitle">
          <b>Издательство:</b> {props.Publicator}
        </p>
        <p className="book__subtitle">
          <b>Дата издания:</b> {props.DateOfpublication}
        </p>
        <p className="book__subtitle">
          <b>Жанр:</b> {props.Genre}
        </p>
        <p className="book__subtitle">
          <b>Количество страниц:</b> {props.CountOfPages}
        </p>
        {user.user.role === 'ADMIN' ? (
          <ControlPanel obj={props.obj} table="book" />
        ) : (
          <button
            onClick={handleButtonClick}
            className={`book__${props.IsAvailability ? 'btn' : 'unuseable'}`}>
            {props.IsAvailability ? 'Заказать' : 'Нет на складе'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Book;
