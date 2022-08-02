import client from 'api/client';
import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';
import Button from 'components/ui-new/Button';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

const PortfolioWorkCard = ({ card }) => {
  const images = card.images;
  const text = card.text;
  const author = card.author;
  const avatar = '';
  const followers = card.likes;

  return (
    <div className={styles.card}>
      {images.length > 2 && (
        <div className={styles.card__images}>
          <img src={images[0]} alt="post image" />
          <img src={images[1]} alt="post image" />
          <img src={images[2]} alt="post image" />
        </div>
      )}
      {/* {images && text ? <div className={styles.card__text}>{text}</div> : null} */}
      <div className={styles.card__author}>
        <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
        <div className={styles.card__authorsInfo}>
          <div className={styles.card__authorsInfo_name}>{author}</div>
          <div className={styles.card__authorsInfo_followers}>{followers + ' followers'}</div>
        </div>
        <Button className={styles.followButton} rounded sm>
          Follow
        </Button>
      </div>
    </div>
  );
};

export default PortfolioWorkCard;
