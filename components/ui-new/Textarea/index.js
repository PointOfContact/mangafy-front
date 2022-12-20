import React, { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

const Textarea = ({
  sm,
  full,
  className,
  onChange,
  placeholder,
  err,
  errPosAbs,
  defaultValue,
  rounded,
  pink,
}) => {
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
    <GrammarlyEditorPlugin clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
      <div className={cn(className, styles.textarea__container)}>
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          type="text"
          className={cn(
            styles.textarea,
            sm && styles.textarea_sm,
            full && styles.textarea_fullWidth,
            err && styles.textarea_error,
            rounded && styles.textarea_rounded,
            pink && styles.textarea_pink
          )}
          onInput={(e) => {
            onInput();
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          defaultValue={defaultValue}
        />
        {typeof err === 'string' && (
          <div className={cn(styles.textarea__error, errPosAbs && styles.textarea__error_abs)}>
            {err}
          </div>
        )}
      </div>
    </GrammarlyEditorPlugin>
  );
};

export default Textarea;
