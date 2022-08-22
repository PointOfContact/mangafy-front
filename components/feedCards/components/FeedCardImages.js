import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';
const FeedCardImages = ({ images }) => {
  return (
    <div className={styles.feedCardImages}>
      <img src={client.UPLOAD_URL + images[0].image} alt="post image" />
      <img src={client.UPLOAD_URL + images[1].image} alt="post image" />
      <img src={client.UPLOAD_URL + images[2].image} alt="post image" />
    </div>
  );
};

export default FeedCardImages;
