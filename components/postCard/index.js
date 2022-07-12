import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';
import React from 'react';
import styles from './styles.module.scss';

const PostCard = ({ card }) => {
  // const { image, text, author } = card;
  return (
    <div className={styles.card}>
      {/* {image ? (
        <div className={styles.card__image}>
          <img src={image} alt="post image" />
        </div>
      ) : (
        <div className={styles.card__content}>{text}</div>
      )}
      {title ? <div className={styles.card__title}>{title}</div> : null}
      {image && text ? <div className={styles.card__text}>{text}</div> : null}
      <div className={styles.card__footer}>
        <div className={styles.card__author}>
          <img src="img/feedTemp/avatar.png" />
          <div>{author}</div>
        </div>
        <div className={styles.card__comments}>
          31 <Comment />
        </div>
        <div className={styles.card__stars}>
          123 <Star />
        </div>
      </div> */}
    </div>
  );
};

export default PostCard;
