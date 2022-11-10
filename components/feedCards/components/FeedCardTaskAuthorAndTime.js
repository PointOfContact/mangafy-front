import React from 'react';
import styles from './styles.module.scss';
import Clock from 'components/icon/new/Clock';
import client from 'api/client';
import Link from 'next/link';

const FeedCardTaskAuthorAndTime = ({ authorId, author, avatar, time }) => {
  return (
    <div className={styles.feedCardTaskAuthorAndTime}>
      <div className={styles.feedCardTaskAuthorAndTime__author}>
        <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
        <Link href={'/profile/' + authorId}>
          <a>{author}</a>
        </Link>
      </div>
      <div className={styles.feedCardTaskAuthorAndTime__time}>
        {`${time}`}
        <Clock color="#C3BAFA" />
      </div>
    </div>
  );
};

export default FeedCardTaskAuthorAndTime;
