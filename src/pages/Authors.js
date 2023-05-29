import React, { useContext, useLayoutEffect } from 'react';
import { Context } from '..';
import { getAuthors } from '../http/userAPI';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import { observer } from 'mobx-react';

const Authors = observer(() => {
  const { author } = useContext(Context);

  const getAuthor = async () => {
    const response = await getAuthors();
    author.setAuthors(response);
  };

  useLayoutEffect(() => {
    getAuthor();
  }, []);

  return (
    <div className="authors">
      {Object.keys(author.authors).length !== 0 &&
        author.authors.map((athr) => {
          return (
            <div className="authors__block">
              <h1 className="authors__title">{athr.Name}</h1>
              <p className="authors__subtitle">
                <b>Авторский знак: </b>
                {athr.Mark}
              </p>
              <ControlPanel obj={athr} table="author" />
            </div>
          );
        })}
    </div>
  );
});

export default Authors;
