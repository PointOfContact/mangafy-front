import React from 'react';
import styles from './styles.module.scss';
import Comment from 'components/icon/new/Comment';
import cn from 'classnames';
import client from 'api/client';
import Link from 'next/link';
import Eye from 'components/icon/new/Eye';

const FeedCardProjectFooter = ({
  authorId,
  author,
  avatar,
  comments,
  likes,
  isLiked,
  like,
  views,
}) => {
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
      <div className={styles.feedCardShotFooter__views}>
        {views || 0} <Eye />
      </div>
    </div>
  );
};

export default FeedCardProjectFooter;
