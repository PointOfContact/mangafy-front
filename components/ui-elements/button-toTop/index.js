import React from 'react';

import { BackTop } from 'antd';

import styles from './styles.module.scss';

const ButtonToTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <BackTop>
      <div className={styles.button} onClick={scrollTop}>
        <div className={styles.button__circle}>
          <img className={styles.button__circle_img} src="/img/to-top.svg" alt="MangaFy to top" />
        </div>
      </div>
    </BackTop>
  );
};
export default ButtonToTop;
