import client from 'api/client';
import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

const PortfolioWorkCard = ({ card }) => {
  const image = card.imageUrl;
  const text = card.subTitle;
  const author = card.title;
  const avatar = card.logoUrl;

  return (
    <div className={styles.card}>
      {image ? (
        <div className={styles.card__image}>
          <img src={client.UPLOAD_URL + image} alt="post image" />
        </div>
      ) : (
        <div className={styles.card__content}>{text}</div>
      )}
      {image && text ? <div className={styles.card__text}>{text}</div> : null}
      <div className={styles.card__footer}>
        <div className={styles.card__author}>
          <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
          <div>{author}</div>
        </div>
        <div className={styles.card__comments}>
          31 <Comment />
        </div>
        <div className={styles.card__stars}>
          123 <Star />
        </div>
      </div>
    </div>
  );
};

export default PortfolioWorkCard;
