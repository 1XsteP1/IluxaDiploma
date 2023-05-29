import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { getBooks, getFilterBooks } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react';
import Book from '../components/Book/Book';
import './pages.sass';

const Books = observer(() => {
  const { book } = useContext(Context);
  const [isAvailability, setIsAvailability] = useState();
  const [genre, setGenre] = useState();
  const [publicator, setPublicator] = useState();
  const [search, setSearch] = useState('');

  const getAllBooks = async () => {
    const response = await getBooks();
    book.setBooks(response);
  };

  const showBooks = async () => {
    if (search !== '') {
      book.books.forEach((b) => {
        if (!b.Name.toString().toLowerCase().includes(search.toLowerCase())) {
          document.getElementById(`book${b.ID}`).style.display = 'none';
        }
      });
    } else {
      book.books.forEach((b) => {
        document.getElementById(`book${b.ID}`).style.display = 'flex';
      });
    }
  };

  const getFilteredBooks = async () => {
    const filters = {
      IsAvailability: isAvailability,
      Genre: genre === '' ? undefined : genre,
      Publicator: publicator === '' ? undefined : publicator,
    };
    console.log(filters);
    const response = await getFilterBooks(filters);
    book.setBooks(response);
  };

  useLayoutEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    showBooks();
  }, [search]);

  return (
    <div className="books">
      <aside className="books__filter">
        <h2 className="books__title">Фильтровать:</h2>
        <div className="books__block">
          <label htmlFor="search" className="books__label">
            Поиск по названию:{' '}
          </label>
          <input
            type="text"
            name="search"
            onChange={(e) => {
              setSearch(e.target.value);
              showBooks();
              console.log(search);
            }}
            value={search}
            id="search"
            className="books__inp"
          />
        </div>
        <div className="books__block">
          <label htmlFor="IsAvailability" className="books__label">
            В наличии:{' '}
          </label>
          <input
            type="checkbox"
            name="IsAvailability"
            onChange={(e) => {
              setIsAvailability(e.target.checked);
            }}
            value="true"
            id="IsAvailability"
            className="books__inp"
          />
        </div>
        <div className="books__block">
          <label htmlFor="Genre" className="books__label">
            Жанр:{' '}
          </label>
          <select
            id="Genre"
            className="books__label"
            onChange={(e) => {
              setGenre(e.target.value);
            }}>
            <option value="">Любой</option>
            <option value="Приключение">Приключение</option>
            <option value="Детектив">Детектив</option>
            <option value="Фантастика">Фантастика</option>
            <option value="Научная">Научная</option>
          </select>
        </div>

        <div className="books__block">
          <label htmlFor="Publicator" className="books__label">
            Издатель:{' '}
          </label>
          <select
            id="Publicator"
            className="books__label"
            onChange={(e) => setPublicator(e.target.value)}>
            <option value="">Любой</option>
            <option value="Самовар">Самовар</option>
            <option value="Бомбора">Бомбора</option>
            <option value="Эксмо">Эксмо</option>
            <option value="Попурри">Попурри</option>
          </select>
        </div>
        <button className="books__btn" onClick={getFilteredBooks}>
          Фильтровать
        </button>
      </aside>
      {Object.keys(book.books).length !== 0
        ? book.books.map((b) => {
            return (
              <Book
                key={b.ID}
                obj={b}
                ID={b.ID}
                Image={b.Image}
                Author={b.author}
                Name={b.Name}
                IsAvailability={b.IsAvailability}
                Publicator={b.Publicator}
                DateOfpublication={b.DateOfpublication}
                Genre={b.Genre}
                CountOfPages={b.CountOfPages}
              />
            );
          })
        : 'Таких книг нет('}
    </div>
  );
});

export default Books;
