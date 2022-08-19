import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';

function FeedCardImage({ image }) {
  return (
    <div className={styles.feedCardImage}>
      <img src={image} alt="post image" />
    </div>
  );
}

export default FeedCardImage;
