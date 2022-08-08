import React from 'react';
import styles from './styles.module.scss';
import Button from 'components/ui-new/Button';

const FeedCardPortfolioFooter = ({ author, avatar, followers }) => {
  return (
    <div className={styles.feedCardPortfolioFooter}>
      <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
      <div className={styles.feedCardPortfolioFooter__author}>
        <div className={styles.feedCardPortfolioFooter__name}>{author}</div>
        <div className={styles.feedCardPortfolioFooter__followers}>{followers + ' followers'}</div>
      </div>
      <Button className={styles.followButton} rounded sm>
        Follow
      </Button>
    </div>
  );
};

export default FeedCardPortfolioFooter;
