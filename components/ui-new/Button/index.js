import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const Button = ({
  sm,
  rounded,
  smooth,
  outline,
  iconRight,
  pink,
  fullWidth,
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        className,
        styles.button,
        sm && styles.button_sm,
        fullWidth && styles.button_fullWidth,
        rounded && styles.button_rounded,
        smooth && styles.button_smooth,
        outline ? styles.button_outline : styles.button_solid,
        iconRight && styles['button_icon-right'],
        pink && styles.button_pink
      )}
      {...props}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
