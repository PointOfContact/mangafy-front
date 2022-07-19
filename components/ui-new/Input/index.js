import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Input = ({ placeholder, defaultValue, value, sm, rounded, width, error, ...props }) => {
  return (
    <input
      type="text"
      style={{ width }}
      className={cn(
        styles.input,
        styles.fullWidth,
        sm && styles.sm,
        rounded && styles.rounded,
        error && styles.error
      )}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      {...props}
    />
  );
};

export default Input;
