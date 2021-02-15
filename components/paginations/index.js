import React from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

const Paginations = ({}) => (
  <div className={styles.Paginations}>
    <div className={'container'}>
      <div className={styles.Paginations__wrap}>
        <div className={styles.Paginations__prev}>
          <img src="icons/Pagination-arrow-prev.svg" alt=""></img>
        </div>
        <div className={cn(styles.Paginations__item, styles.Paginations__itemActive)}>1</div>
        <div className={styles.Paginations__item}>2</div>
        <div className={styles.Paginations__item}>3</div>
        <div className={styles.Paginations__item}>4</div>
        <div className={styles.Paginations__item}>5</div>
        <div className={styles.Paginations__item}>6</div>
        <div className={styles.Paginations__item}>7</div>
        <div className={styles.Paginations__item}>8</div>
        <div className={styles.Paginations__next}>
          <img src="icons/Pagination-arrow-prev.svg" alt=""></img>
        </div>
      </div>
    </div>
  </div>
);
export default Paginations;
