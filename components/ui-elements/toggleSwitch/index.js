import React from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

const ToggleSwitch = () => (
  <label className={styles.switch}>
    <input type="checkbox" />
    <span className={cn(styles.slider, styles.round)}></span>
  </label>
);

export default ToggleSwitch;
