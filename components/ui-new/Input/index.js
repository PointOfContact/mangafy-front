import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Input = ({
  type,
  name,
  sm,
  full,
  err,
  pink,
  onChange,
  className,
  placeholder,
  defaultValue,
  rounded,
  onBlur,
}) => {
  return (
    <input
      onBlur={onBlur}
      name={name}
      placeholder={placeholder}
      type={type || 'text'}
      className={cn(
        styles.input,
        className,
        sm && styles.input_sm,
        full && styles.input_fullWidth,
        err && styles.input_error,
        rounded && styles.input_rounded,
        pink && styles.input_pink
      )}
      onInput={onChange ? (e) => onChange(e.target.value) : null}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
