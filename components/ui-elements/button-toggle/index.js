import React from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

const ButtonToggle = ({}) => (
  <>
    <div className={styles.box}>
      <input className={styles.box__field} type="checkbox" name="radio" />
      <div className={styles.box__content}>
        <p className={cn(styles.box__text, styles.box__text_not_active)}>Not Aviable</p>
        <i className={styles.box__circle}></i>
        <p className={cn(styles.box__text, styles.box__text_active)}>Aviable</p>
      </div>
    </div>
  </>
);

export default ButtonToggle;
