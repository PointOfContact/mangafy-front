import React from 'react';

import styles from './styles.module.scss';

const ButtonToTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className={styles.button} onClick={scrollTop}>
      <div className={styles.button__circle}>
        <img className={styles.button__circle_img} src="/img/to-top.svg" alt="" />
      </div>
    </div>
  );
};
export default ButtonToTop;
