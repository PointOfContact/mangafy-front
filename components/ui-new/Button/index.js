import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const Button = (props) => {
  const { sm, rounded, smooth, outline, iconRight, pink, full, bold } = props;
  return (
    <button
      className={cn(
        styles.button,
        sm ? styles.button_sm : null,
        rounded ? styles.button_rounded : null,
        smooth ? styles.button_smooth : null,
        outline ? styles.button_outline : styles.button_solid,
        iconRight ? styles['button_icon-right'] : null,
        pink ? styles.button_pink : null,
        full && styles.button_fullWidth,
        bold && styles.button_bold
      )}
      onClick={props.onClick}>
      {props.icon}
      {props.children}
    </button>
  );
};

export default Button;
