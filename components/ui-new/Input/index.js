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
    <div className={cn(className, styles.input__container)}>
      <input
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        type={type || 'text'}
        className={cn(
          styles.input,
          sm && styles.input_sm,
          full && styles.input_fullWidth,
          err && styles.input_red,
          typeof err === 'string' && styles.input_error,
          rounded && styles.input_rounded,
          pink && styles.input_pink
        )}
        onInput={onChange ? (e) => onChange(e.target.value) : null}
        defaultValue={defaultValue}></input>
      {typeof err === 'string' && <div className={styles.input__error}>{err}</div>}
    </div>
  );
};

export default Input;
