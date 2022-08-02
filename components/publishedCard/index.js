import Comment from 'components/icon/new/Comment';
import Diamond from 'components/icon/new/Diamond';
import Fire from 'components/icon/new/Fire';
import Heart from 'components/icon/new/Heart';
import Star from 'components/icon/new/Star';
import Button from 'components/ui-new/Button';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import client from 'api/client';

const PublishedCard = ({ card }) => {
  // const image = card.imageUrl;
  // const title = '-';
  // const text = card.subTitle;
  // const author = card.title;
  // const authorImage = card.logoUrl;
  // const { likesCount, commentsCount } = card;
  const image = card.image;
  const title = card.title;
  const text = card.text;
  const author = card.author;
  const authorImage = '';
  const likesCount = card.likes;
  const commentsCount = card.comments;
  return (
    <div className={styles.card}>
      {image ? (
        <div className={styles.card__image}>
          {/* <img src={client.UPLOAD_URL + image} alt="post image" /> */}
          <img src={image} alt="post image" />
          {/* <Image src={image} width={100} height={100} /> */}
        </div>
      ) : (
        <div className={styles.card__content}>{text}</div>
      )}
      {title ? <div className={styles.card__title}>{title}</div> : null}
      {image && text ? <div className={styles.card__text}>{text}</div> : null}
      <div className={styles.card__authors}>
        <div className={styles.card__author}>
          <img src={authorImage ? client.UPLOAD_URL + authorImage : 'img/feedTemp/avatar.png'} />
          <div>{author}</div>
        </div>
      </div>
      <div className={styles.card__footer}>
        <div className={styles.card__buttons}>
          <Button sm={1} rounded={1} iconRight={1} icon={<Heart color="#fff" />}>
            Follow
          </Button>
          <Button sm={1} rounded={1} iconRight={1} icon={<Diamond color="#fff" />}>
            Tip
          </Button>
        </div>
        <div className={styles.card__comments}>
          {commentsCount} <Comment />
        </div>
        <div className={styles.card__stars}>
          {likesCount} <Star />
        </div>
      </div>
    </div>
  );
};

export default PublishedCard;
