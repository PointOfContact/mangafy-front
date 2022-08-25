import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';
import Imgix from 'components/imgix';

const FeedCardImages = ({ images }) => {
  return (
    <div className={styles.feedCardImages}>
      <Imgix
        src={client.UPLOAD_URL + images[0].image}
        layout="fill"
        objectFit="cover"
        alt="Project cover"
      />
      <Imgix
        src={client.UPLOAD_URL + images[1].image}
        layout="fill"
        objectFit="cover"
        alt="Project cover"
      />
      <Imgix
        src={client.UPLOAD_URL + images[2].image}
        layout="fill"
        objectFit="cover"
        alt="Project cover"
      />
      {/* <img src={client.UPLOAD_URL + images[1].image} alt="post image" /> */}
      {/* <img src={client.UPLOAD_URL + images[2].image} alt="post image" /> */}
    </div>
  );
};

export default FeedCardImages;
