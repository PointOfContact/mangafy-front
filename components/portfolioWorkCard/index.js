import client from 'api/client';
import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

const PortfolioCard = ({ card }) => {
  // const image = card.imageUrl;
  // const text = card.subTitle;
  // const author = card.title;
  // const avatar = card.logoUrl;
  // const likes = card.likesCount;
  // const comments = card.commentsCount;
  const title = card.title;
  const image = card.image;
  const text = card.text;
  const author = card.title;
  const avatar = '';
  const likes = card.likes;
  const comments = card.comments;

  async function getPortfolioWorks() {
    try {
      const posts = await client.service('/api/v2/posts').find({
        query: {
          $limit: 3,
          $sort: {
            createdAt: -1,
          },
          postType: 'Profile',
          userId: card.authorId,
        },
      });
      console.log(posts.data);
      return posts.data;
    } catch (error) {
      console.log(error);
    }
  }

  const [images, setImages] = useState([]);

  useEffect(async () => {
    const posts = await getPortfolioWorks();
    console.log(posts);
    setImages(posts);
  }, []);

  return (
    <div className={styles.card}>
      {image ? (
        <div className={styles.card__image}>
          {/* <img src={client.UPLOAD_URL + image} alt="post image" /> */}
          <img src={image} alt="post image" />
        </div>
      ) : // <div className={styles.card__content}>{text}</div>
      null}
      {title ? <div className={styles.card__title}>{title}</div> : null}
      {text ? <div className={styles.card__text}>{text}</div> : null}
      <div className={styles.card__footer}>
        <div className={styles.card__author}>
          <img src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'} />
          <div>{author}</div>
        </div>
        <div className={styles.card__comments}>
          {comments} <Comment />
        </div>
        <div className={styles.card__stars}>
          {likes} <Star />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
