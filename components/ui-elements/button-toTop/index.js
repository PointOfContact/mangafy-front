import React from 'react';

import { BackTop } from 'antd';
import Imgix from 'components/imgix';

import styles from './styles.module.scss';

const ButtonToTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <BackTop>
      <div className={styles.button} onClick={scrollTop}>
        <div className={styles.button__circle}>
          <Imgix
            layout="fixed"
            width={31}
            height={37}
            className={styles.button__circle_img}
            src="https://mangafy.club/img/to-top.svg"
            alt="MangaFy to top"
          />
        </div>
      </div>
    </BackTop>
  );
};

export default ButtonToTop;
