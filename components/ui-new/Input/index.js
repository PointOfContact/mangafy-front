import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Input = ({
  type,
  value,
  name,
  sm,
  md,
  full,
  err,
  errPosAbs,
  pink,
  onChange,
  className,
  placeholder,
  defaultValue,
  rounded,
  onBlur,
  inputRef,
}) => {
  return (
    <div className={cn(className, styles.input__container)}>
      <input
        value={value}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        type={type || 'text'}
        className={cn(
          styles.input,
          sm && styles.input_sm,
          md && styles.input_md,
          full && styles.input_fullWidth,
          err && styles.input_red,
          typeof err === 'string' && styles.input_error,
          errPosAbs && styles.input_errorPosAbs,
          rounded && styles.input_rounded,
          pink && styles.input_pink
        )}
        onInput={onChange ? (e) => onChange(e.target.value) : null}
        defaultValue={defaultValue}
        ref={inputRef}></input>
      {typeof err === 'string' && (
        <div className={cn(styles.input__error, errPosAbs && styles.input__error_abs)}>{err}</div>
      )}
    </div>
  );
};

export default Input;
