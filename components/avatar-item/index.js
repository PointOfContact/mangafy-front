import React from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

const Avatar = ({}) => (
  <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
    <div className={styles.avatar__avatar}>
      <img src="img/back1.png" alt=""></img>
    </div>
  </div>
);
export default Avatar;
