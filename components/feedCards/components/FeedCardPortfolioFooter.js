import React from 'react';
import styles from './styles.module.scss';
import Button from 'components/ui-new/Button';
import client from 'api/client';
import Link from 'next/link';
import Imgix from 'components/imgix';

const FeedCardPortfolioFooter = ({ authorId, author, avatar, followers, isFollowed, like }) => {
  return (
    <div className={styles.feedCardPortfolioFooter}>
      <div className={styles.authorImgContainer}>
        <Imgix
          layout="fill"
          src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'}
          alt="Mangafy author image"
        />
      </div>
      <div className={styles.feedCardPortfolioFooter__author}>
        <Link href={'/profile/' + authorId}>
          <a className={styles.feedCardPortfolioFooter__name}>{author}</a>
        </Link>
        <div className={styles.feedCardPortfolioFooter__followers}>{followers + ' followers'}</div>
      </div>
      <Button
        className={styles.followButton}
        rounded
        sm
        onClick={(e) => {
          e.stopPropagation();
          like();
        }}
        outline={isFollowed}>
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
};

export default FeedCardPortfolioFooter;
