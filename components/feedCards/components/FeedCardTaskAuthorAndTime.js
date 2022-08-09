import React from 'react';
import styles from './styles.module.scss';
import Clock from 'components/icon/new/Clock';

const FeedCardTaskAuthorAndTime = ({ author, avatar, time, timeMeasure }) => {
  return (
    <div className={styles.feedCardTaskAuthorAndTime}>
      <div className={styles.feedCardTaskAuthorAndTime__author}>
        <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
        <div>{author}</div>
      </div>
      <div className={styles.feedCardTaskAuthorAndTime__time}>
        {`${time} ${timeMeasure} ago`}
        <Clock color="#C3BAFA" />
      </div>
    </div>
  );
};

export default FeedCardTaskAuthorAndTime;
