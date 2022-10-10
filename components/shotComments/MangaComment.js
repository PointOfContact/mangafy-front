import React from 'react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';

const MangaComment = ({ comment }) => {
  const authorInfo =
    comment.authorInfo || (Array.isArray(comment.senderInfo) ? comment.senderInfo[0] : null);

  return (
    <div className={styles.comment}>
      <div className={styles.comment__body}>
        <div className={styles.comment__avatar}>
          <Avatar size={48} image={authorInfo?.avatar} text={authorInfo?.name} />
        </div>
        <div className={styles.comment__content}>
          <div className={styles.comment__author}>{authorInfo?.name}</div>
          <div className={styles.comment__text}>{comment.content}</div>
          <div className={styles.comment__time}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaComment;
