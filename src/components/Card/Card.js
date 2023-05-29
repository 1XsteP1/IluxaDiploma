import './Card.sass';

const Card = ({ card }) => {
  return (
    <div className="card">
      <h2 className="card__title">{card.book.Name}</h2>
      <p className="card__subtitle">
        <b>Индекс: </b>
        {card.Index}
      </p>
    </div>
  );
};

export default Card;
