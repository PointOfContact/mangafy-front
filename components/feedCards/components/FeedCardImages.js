import React from 'react';
import styles from './styles.module.scss';
const FeedCardImages = ({ images }) => {
  return (
    <div className={styles.feedCardImages}>
      <img src={images[0]} alt="post image" />
      <img src={images[1]} alt="post image" />
      <img src={images[2]} alt="post image" />
    </div>
  );
};

export default FeedCardImages;
