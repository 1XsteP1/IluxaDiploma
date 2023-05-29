import Logo from '../../assets/logo.svg';
import './Header.sass';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Context } from '../..';
import {
  ADMIN_ROUTE,
  AUTHORS_ROUTE,
  BOOKS_ROUTE,
  CARDS_ROUTE,
  MAIN_ROUTE,
} from '../../store/consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  const { user } = useContext(Context);
  return (
    <div className="header">
      <Link to={MAIN_ROUTE} className="header__logo">
        Библиотека
      </Link>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__item">
            <Link to={AUTHORS_ROUTE}>Авторы</Link>
          </li>
          <li className="header__item">
            <Link to={CARDS_ROUTE}>Библиотечные карты</Link>
          </li>
          <li className="header__item">
            <Link to={ADMIN_ROUTE}>
              <FontAwesomeIcon icon={faUser} size="lg" style={{ color: '#fff' }} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
