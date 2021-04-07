import React from 'react';

import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ExerciseCard = (props) => {
  const { order, categories, title, url, btnText } = props;
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardNumberCount}>{order}</div>
          {categories.map((categorie) => (
            <div key={categorie} className={styles.cardTheme}>
              <div className={styles.cardThemeDot}></div>
              {categorie}
            </div>
          ))}
        </div>
        <div className={styles.cardDescr}>{title}</div>
        <Link href={url}>
          <a className={styles.cardButton}>
            <PrimaryButton text={btnText} suffix={<span style={{ marginLeft: '15px' }}>❯</span>} />
          </a>
        </Link>
      </div>
    </>
  );
};

ExerciseCard.propTypes = {
  order: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

ExerciseCard.defaultProps = {};

export default ExerciseCard;
