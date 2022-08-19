import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Textarea = ({ sm, full, className, onChange, placeholder, err, defaultValue }) => {
  function onInput(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 2 + 'px';
  }

  return (
    <textarea
      placeholder={placeholder}
      type="text"
      className={cn(
        styles.textarea,
        className,
        sm && styles.textarea_sm,
        full && styles.textarea_fullWidth,
        err && styles.textarea_error
      )}
      onInput={(e) => {
        onInput(e);
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      defaultValue={defaultValue}></textarea>
  );
};

export default Textarea;
