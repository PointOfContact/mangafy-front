import client from 'api/client';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import Input from 'components/ui-new/Input';
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { notification } from 'antd';
import Close from 'components/icon/new/Close';
import Send from 'components/icon/new/Send';
import cn from 'classnames';
import MangaComment from './MangaComment';

const MangaComments = ({ className, comments = [], createComment }) => {
  const [newComment, setNewComment] = useState('');
  const inputRef = useRef(null);

  function clearInput() {
    setNewComment('');
    if (inputRef.current) inputRef.current.innerHTML = '';
  }

  function handleChange(e) {
    const value = e.target.innerText;
    setNewComment(value);
  }

  function onSubmit() {
    const ifOnlySpace = newComment.trim().length;
    if (!ifOnlySpace) {
      if (!newComment.length) return;
      return notification.error({
        message: "You can't write only spaces",
        placement: 'bottomLeft',
      });
    }

    createComment(newComment);

    clearInput();
  }

  let commentsElements = [];
  if (Array.isArray(comments)) {
    commentsElements = comments?.map((comment) => (
      <MangaComment key={comment._id} comment={comment} />
    ));
  }

  return (
    <div className={cn(styles.comments, className)}>
      <div className={styles.comments__input}>
        <div className={styles.comments__inputWrapper}>
          <div
            className={styles.comments__inputText}
            contentEditable
            onInput={handleChange}
            ref={inputRef}></div>
        </div>
        <button className={styles.comments__sendButton} onClick={onSubmit}>
          <Send color={'#8E8E93'} />
        </button>
      </div>
      <div className={styles.comments__title}>Comments</div>
      <div>{commentsElements.length > 0 ? commentsElements : 'There is no comments yet...'}</div>
    </div>
  );
};

export default MangaComments;
