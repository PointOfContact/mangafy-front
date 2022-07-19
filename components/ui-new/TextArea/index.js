import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const TextArea = ({ placeholder, defaultValue, value, sm, width, error, onChange, ...props }) => {
  // const ref = useRef(null);

  // const [height, setHeight] = useState('24px');

  // function onInput() {
  //   setHeight(() => 0);
  //   setHeight(() => ref.current?.scrollHeight + 12 + 'px');
  // }

  function handleKeyDown(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <textarea
      style={{ width }}
      onChange={(e) => {
        handleKeyDown(e);
        onChange && onChange(e);
      }}
      className={cn(styles.textarea, sm && styles.sm, error && styles.error)}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      {...props}
    />
  );
};

export default TextArea;
