import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const HeppeningCard = (props) => {
  const { img, title, like } = props;

  return (
    <>
      <li className={styles.tagsListItem}>
        <div className={styles.tagsDescr}>
          <div className={styles.tagsImages} style={{ backgroundImage: `url(${img})` }}></div>
          <div className={styles.tagsDescrText}>{title}</div>
        </div>
        <div className={styles.tagsCount}>{like}</div>
      </li>
    </>
  );
};

HeppeningCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  like: PropTypes.string.isRequired,
};

HeppeningCard.defaultProps = {};

export default HeppeningCard;
