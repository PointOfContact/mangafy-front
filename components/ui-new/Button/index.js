import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const Button = (props) => {
  const {
    sm = false,
    rounded = false,
    smooth = false,
    outline = false,
    iconRight = false,
    pink = false,
  } = props;
  return (
    <button
      className={cn(
        styles.button,
        sm ? styles.button_sm : null,
        rounded ? styles.button_rounded : null,
        smooth ? styles.button_smooth : null,
        outline ? styles.button_outline : styles.button_solid,
        iconRight ? styles['button_icon-right'] : null,
        pink ? styles.button_pink : null
      )}>
      {props.icon}
      {props.children}
    </button>
  );
};

export default Button;
