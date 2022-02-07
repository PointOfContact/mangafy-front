import React from 'react';

import { BackTop } from 'antd';
import cn from 'classnames';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ButtonToTop = ({ user }) => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BackTop>
      <div className={cn(styles.button, !user && styles.ifNotLogin)} onClick={scrollTop}>
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

ButtonToTop.propTypes = {
  user: PropTypes.object,
};

ButtonToTop.defaultProps = {
  user: {},
};

export default ButtonToTop;
