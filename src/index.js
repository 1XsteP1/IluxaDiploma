import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/userStore';
import './style.sass';
import BookStore from './store/BookStore';
import CardStore from './store/CardStore';
import AuthorStore from './store/AuthorStore';

export const Context = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      book: new BookStore(),
      author: new AuthorStore(),
      cards: new CardStore(),
    }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
);
