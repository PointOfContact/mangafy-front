import React from 'react';
import styles from './styles.module.scss';
import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';
import cn from 'classnames';

const FeedCardShotFooter = ({ author, avatar, comments, likes, isLiked, setIsLiked }) => {
  return (
    <div className={styles.feedCardShotFooter}>
      <div className={styles.feedCardShotFooter__author}>
        <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
        <div>{author}</div>
      </div>
      <div className={styles.feedCardShotFooter__comments}>
        {comments} <Comment />
      </div>
      <div
        className={cn(
          styles.feedCardShotFooter__stars,
          isLiked && styles.feedCardShotFooter__stars_liked
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked((oldLiked) => !oldLiked);
        }}>
        {likes} <Star />
      </div>
    </div>
  );
};

export default FeedCardShotFooter;
