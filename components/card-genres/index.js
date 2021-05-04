import React from 'react';

import { Popover } from 'antd';
import cn from 'classnames';
import ButtonColab from 'components/colaborationCard/buttonColab';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const СardGenres = ({ genres, limit }) => {
  const genresContent = () => (
    <div>
      {genres.slice(limit - 1).map((item) => (
        <p key={item._id}>{item.name}</p>
      ))}
    </div>
  );
  return (
    <div className={cn(styles.PostColab)}>
      <div className={styles.colabWrap__buttons}>
        {genres.length ? (
          <>
            {genres.length < limit + 1 ? (
              genres.map((item) => (
                <ButtonColab key={item._id} className={cn(styles.ButtonPurple)} text={item.name} />
              ))
            ) : (
              <>
                {genres.slice(0, limit - 1).map((item) => (
                  <ButtonColab
                    key={item._id}
                    className={cn(styles.ButtonPurple)}
                    text={item.name}
                  />
                ))}
                <Popover placement="bottomLeft" title="More Genres" content={genresContent}>
                  {' '}
                  <ButtonColab
                    className={cn(styles.ButtonPurple)}
                    text={`+ ${genres.length - limit + 1}`}
                  />
                </Popover>
              </>
            )}
          </>
        ) : (
          <ButtonColab className={cn(styles.ButtonWhite)} text={'💪 fan of all genres'} />
        )}
      </div>
    </div>
  );
};

СardGenres.propTypes = {
  genres: PropTypes.array,
  limit: PropTypes.number,
};

СardGenres.defaultProps = {
  genres: [],
  limit: 4,
};

export default СardGenres;
