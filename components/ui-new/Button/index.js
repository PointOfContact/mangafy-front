import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Loader from '../Loader';

const Button = (props) => {
  const {
    sm,
    md,
    rounded,
    smooth,
    outline,
    iconRight,
    pink,
    full,
    bold,
    color,
    className,
    disabled,
    loading,
  } = props;
  return (
    <button
      className={cn(
        styles.button,
        sm ? styles.button_sm : null,
        md && styles.button_md,
        rounded ? styles.button_rounded : null,
        smooth ? styles.button_smooth : null,
        outline ? styles.button_outline : styles.button_solid,
        iconRight ? styles['button_icon-right'] : null,
        pink ? styles.button_pink : null,
        full && styles.button_fullWidth,
        bold && styles.button_bold,
        !props.children && props.children !== 0 && styles.button_noText,
        (loading || disabled) && styles.button_disabled,
        loading && styles.button_loading,
        className
      )}
      onClick={props.onClick}
      style={{ color }}
    >
      {props.icon}
      {props.children}
      <Loader className={styles.button__loader} />
    </button>
  );
};

export default Button;
