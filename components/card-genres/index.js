import React from 'react';

import { Popover } from 'antd';
import cn from 'classnames';
import ButtonColab from 'components/colaborationCard/buttonColab';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const СardGenres = ({ title, subTitle, genres, limit }) => {
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
                <Popover placement="bottomLeft" title={title} content={genresContent}>
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
          <ButtonColab className={cn(styles.ButtonWhite)} text={subTitle} />
        )}
      </div>
    </div>
  );
};

СardGenres.propTypes = {
  genres: PropTypes.array,
  limit: PropTypes.number,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

СardGenres.defaultProps = {
  genres: [],
  limit: 4,
  title: '',
  subTitle: '',
};

export default СardGenres;
