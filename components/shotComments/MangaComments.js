import client from 'api/client';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import Input from 'components/ui-new/Input';
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { notification } from 'antd';
import Close from 'components/icon/new/Close';
import Send from 'components/icon/new/Send';
import Avatar from 'components/Avatar';
import cn from 'classnames';

const MangaComments = ({ manga, user, onUpload, className, comments = [] }) => {
  //   const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const inputRef = useRef(null);

  //   useEffect(() => {
  //     updateComments();
  //   }, [manga]);

  function clearInput() {
    setNewComment('');
    if (inputRef.current) inputRef.current.innerHTML = '';
  }

  //   function updateComments() {
  //     client.service('/api/v2/comments').find({
  //         query: {
  //           mangaStoryId: manga.id,
  //           $sort: { createdAt: -1 },
  //           $limit: 1000,
  //         },
  //       });
  //       .then((res) => {
  //         setComments(res.data.reverse());
  //         onUpload && onUpload();
  //       })
  //       .catch((err) => console.log(err));
  //   }

  function handleChange(e) {
    // eslint-disable-next-line no-shadow
    const value = e.target.innerText;
    setNewComment(value);
  }

  function createComment() {
    if (newComment.length < 3) {
      return notification.error({
        message: 'Comment must be at least 3 characters',
        placement: 'bottomLeft',
      });
    }

    clearInput();
    const jwt = client.getCookie('feathers-jwt');
    client
      .service('/api/v2/comments?page=mangaView')
      .create(
        {
          content: newComment,
          mangaStoryId: manga.mangaStoryId,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        }
      )
      .then((res) => {
        onUpload && onUpload();
      })
      .catch((err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
        console.log(err);
      });
  }

  const commentsElements = comments.map((comment) => (
    <div className={styles.comment} key={comment._id}>
      <div className={styles.comment__body}>
        <div className={styles.comment__avatar}>
          {/* {comment.authorInfo?.avatar ? (
            <Imgix width={48} height={48} src={client.UPLOAD_URL + comment.authorInfo?.avatar} />
          ) : (
            <Avatar size={48} style={{ background: '#7b65f3', color: '#fff' }}>
              {comment.authorInfo?.name[0]}
            </Avatar>
          )} */}
          <Avatar size={48} image={comment.authorInfo?.avatar} text={comment.authorInfo?.name[0]} />
        </div>
        <div className={styles.comment__content}>
          <div className={styles.comment__author}>{comment.authorInfo?.name}</div>
          <div className={styles.comment__text}>{comment.content}</div>
          <div className={styles.comment__time}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* {comment.authorInfo._id === user._id && (
          <div className={styles.comment__delete} onClick={() => deleteComment(comment._id)}>
            <Close color="#f00" />
          </div>
        )} */}
      </div>
    </div>
  ));

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
        {/* <p className={messageError ? styles.messageError : styles.notError}>{messageError}</p> */}
        <button className={styles.comments__sendButton} onClick={createComment}>
          <Send color={'#8E8E93'} />
        </button>

        {/* <Input sm placeholder="Input comment" onChange={setNewComment} ref={inputRef} /> */}

        {/* <Button rounded onClick={createComment}>
          Send
        </Button> */}
      </div>
      <div className={styles.comments__title}>Comments</div>
      <div>{commentsElements.length > 0 ? commentsElements : 'There is no comments yet...'}</div>
    </div>
  );
};

export default MangaComments;
