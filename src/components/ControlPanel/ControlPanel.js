import { useContext, useState } from 'react';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ControlPanel.sass';
import { getAuthors, getBooks, getCards } from '../../http/userAPI';
import { $authHost } from '../../http';
import { Context } from '../..';
import Modal from '../Modal/Modal';

export default function ControlPanel(props) {
  const { user, author, book, cards } = useContext(Context);
  const [choosed, setChoosed] = useState('');

  const showResult = async (response) => {
    switch (props.table) {
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

  const handleDeleteClick = async () => {
    const ID = props.obj.ID;
    const response = await $authHost.post(`api/${props.table}/delete`, { ID });
    showResult(response);
  };

  const handleModalTrigger = async () => {
    document.querySelectorAll('.modal').forEach((elem) => {
      elem.classList.remove('show');
    });
    document.getElementById(props.obj.ID).classList.add('show');
  };

  return (
    <>
      <Modal obj={props.obj} choosed={choosed} table={props.table} />

      <div className="control">
        <FontAwesomeIcon
          onClick={handleDeleteClick}
          icon={faTrash}
          size="lg"
          style={{ color: '#ff2929' }}
        />

        <FontAwesomeIcon
          icon={faPen}
          size="lg"
          style={{ color: '#313ff6' }}
          onClick={() => {
            setChoosed('edit');
            handleModalTrigger();
          }}
        />
        {props.table !== 'user' && (
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            style={{ color: '#1fe03f' }}
            onClick={() => {
              setChoosed('add');
              handleModalTrigger();
            }}
          />
        )}
      </div>
    </>
  );
}
