import client from 'api/client';
import Imgix from 'components/imgix';
import Button from 'components/ui-new/Button';
import Input from 'components/ui-new/Input';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { Avatar, notification } from 'antd';
import Close from 'components/icon/new/Close';

const ShotComments = ({ shotId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    updateComments();
  }, [shotId]);

  function updateComments() {
    client
      .service('/api/v2/portfolio-comment')
      .find({ query: { portfolioId: shotId, $limit: 100 } })
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }

  function createComment() {
    if (newComment.length < 3) {
      return notification.error({
        message: 'Comment must be at least 3 characters',
        placement: 'bottomLeft',
      });
    }

    const jwt = client.getCookie('feathers-jwt');
    client
      .service('/api/v2/portfolio-comment')
      .create(
        {
          portfolioId: shotId,
          content: newComment,
          senderId: user._id,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        }
      )
      .then((res) => updateComments())
      .catch((err) => console.log(err));
  }

  const commentsElements = comments.map((comment) => (
    <div className={styles.comment} key={comment._id}>
      <div className={styles.comment__time}>{new Date(comment.createdAt).toLocaleDateString()}</div>
      <div className={styles.comment__body}>
        <div className={styles.comment__avatar}>
          {comment.authorInfo?.avatar ? (
            <Imgix width={48} height={48} src={client.UPLOAD_URL + comment.authorInfo?.avatar} />
          ) : (
            <Avatar size={48} style={{ background: '#7b65f3', color: '#fff' }}>
              {comment.authorInfo?.name[0]}
            </Avatar>
          )}
        </div>
        <div className={styles.comment__content}>
          <div className={styles.comment__author}>{comment.authorInfo?.name}</div>
          <div className={styles.comment__text}>{comment.content}</div>
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
    <div className={styles.comments}>
      <div className={styles.comments__title}>Comments</div>
      <div>{commentsElements || 'There is no comments yet...'}</div>
      <div className={styles.comments__input}>
        <Input sm placeholder="Input comment" onChange={setNewComment} />
        <Button rounded onClick={createComment}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ShotComments;
