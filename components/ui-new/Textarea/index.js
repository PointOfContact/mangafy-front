import React, { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Textarea = ({ sm, full, className, onChange, placeholder, err, defaultValue }) => {
  const textareaRef = useRef(null);
  function onInput() {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current?.scrollHeight + 2 + 'px';
  }
  useEffect(() => {
    onInput();
  }, [textareaRef.current]);

  return (
    <textarea
      ref={textareaRef}
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
        onInput();
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      defaultValue={defaultValue}></textarea>
  );
};

export default Textarea;
