import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Loader = ({ className }) => {
  return (
    <div class={cn(styles.ldsRing, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
