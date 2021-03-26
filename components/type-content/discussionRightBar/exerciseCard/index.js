import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ExerciseCard = (props) => {
  const { count, type, description } = props;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardNumberCount}>{count}</div>
          <div className={styles.cardTheme}>
            <div className={styles.cardThemeDot}></div>
            {type}
          </div>
        </div>
        <div className={styles.cardDescr}>{description}</div>
        <a className={styles.cardButton}>Snap a Photo</a>
      </div>
    </>
  );
};

ExerciseCard.propTypes = {
  count: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

ExerciseCard.defaultProps = {};

export default ExerciseCard;
