import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Input = ({ sm, full, err, onChange, className, placeholder, defaultValue }) => {
  return (
    <input
      placeholder={placeholder}
      type="text"
      className={cn(
        styles.input,
        className,
        sm && styles.input_sm,
        full && styles.input_fullWidth,
        err && styles.input_error
      )}
      onInput={onChange ? (e) => onChange(e.target.value) : null}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
