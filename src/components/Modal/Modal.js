import { $authHost } from '../../http';
import { getAuthors, getBooks, getCards } from '../../http/userAPI';
import { useContext } from 'react';
import { Context } from '../..';

export default function Modal({ obj, choosed, table }) {
  const { author, book, cards } = useContext(Context);

  const showResult = async (response) => {
    switch (table) {
      case 'author':
        if (response.status === 200) {
          let response = await getAuthors();
          author.setAuthors(response);
        }
        break;
      case 'book':
        if (response.status === 200) {
          let response = await getBooks();
          book.setBooks(response);
        }
        break;
      case 'card':
        if (response.status === 200) {
          let response = await getCards();
          cards.setCards(response);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (choosed === 'add') {
      let values = new FormData();
      document.querySelectorAll(`#id${obj.ID}`).forEach((inp) => {
        if (inp.name === 'Image') {
          values.append(`${inp.name}`, inp.files[0]);
        } else values.append(`${inp.name}`, inp.value);
      });
      const response = await $authHost.post(`api/${table}/create`, values);
      showResult(response);
    } else if (choosed === 'edit') {
      let values = new FormData();
      values.append('ID', obj.ID);
      document.querySelectorAll(`#id${obj.ID}`).forEach((inp) => {
        if (inp.value !== '') {
          if (inp.name === 'Image') {
            values.append(`${inp.name}`, inp.files[0]);
          } else values.append(`${inp.name}`, inp.value);
        }
      });
      const response = await $authHost.post(`api/${table}/edit`, values);
      showResult(response);
    }

    document.querySelectorAll('.modal').forEach((elem) => {
      elem.classList.remove('show');
    });
  };

  return (
    <div className="modal" id={obj.ID}>
      <button
        onClick={(e) => {
          document.querySelectorAll('.modal').forEach((elem) => {
            elem.classList.remove('show');
          });
        }}>
        X: {obj.ID}
      </button>
      {Object.keys(obj).map((value, index) =>
        !value.includes('At') && value !== 'ID' && value.toLowerCase() !== value ? (
          <div key={index}>
            <label htmlFor={value}>{value}</label>
            <input
              type={value === 'Image' ? 'file' : 'text'}
              name={value}
              id={'id' + obj.ID}></input>
          </div>
        ) : (
          ''
        ),
      )}
      <button onClick={handleSubmit}>OK</button>
    </div>
  );
}
