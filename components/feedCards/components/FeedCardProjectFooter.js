import React from 'react';
import styles from './styles.module.scss';
import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';
import cn from 'classnames';
import client from 'api/client';
import Link from 'next/link';

const FeedCardProjectFooter = ({ authorId, author, avatar, comments, likes, isLiked, like }) => {
  return (
    <div className={styles.feedCardShotFooter}>
      <Link href={'/profile/' + authorId}>
        <a className={styles.feedCardShotFooter__author}>
          <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
          <div>{author}</div>
        </a>
      </Link>
      <div className={styles.feedCardShotFooter__comments}>
        {comments} <Comment />
      </div>
      {/* <div
        className={cn(
          styles.feedCardShotFooter__stars,
          isLiked && styles.feedCardShotFooter__stars_liked
        )}
        onClick={(e) => {
          e.stopPropagation();
          like();
        }}>
        {likes || 0} <Star />
      </div> */}
    </div>
  );
};

export default FeedCardProjectFooter;
