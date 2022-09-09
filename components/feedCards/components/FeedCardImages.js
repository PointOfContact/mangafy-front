import client from 'api/client';
import React from 'react';
import styles from './styles.module.scss';
import Imgix, { imgixClient } from 'components/imgix';

const FeedCardImages = ({ images }) => {
  return (
    <div className={styles.feedCardImages}>
      <Imgix
        src={client.UPLOAD_URL + images[0].image}
        layout="fill"
        objectFit="cover"
        alt="Project cover"
        quality={0}
        placeholder="blur"
        blurDataURL={imgixClient.buildURL(client.UPLOAD_URL + images[0].image, {
          w: 300,
          h: 350,
          q: 0,
          auto: 'format',
          fit: 'min',
          dpr: 0.1,
        })}
        loading="lazy"
      />
      <Imgix
        src={client.UPLOAD_URL + images[1].image}
        layout="fill"
        objectFit="cover"
        alt="Project cover"
        quality={0}
        placeholder="blur"
        blurDataURL={imgixClient.buildURL(client.UPLOAD_URL + images[1].image, {
          w: 300,
          h: 350,
          q: 0,
          auto: 'format',
          fit: 'min',
          dpr: 0.1,
        })}
        loading="lazy"
      />
      <Imgix
        src={client.UPLOAD_URL + images[2].image}
        layout="fill"
        objectFit="cover"
        alt="Project cover"
        quality={0}
        placeholder="blur"
        blurDataURL={imgixClient.buildURL(client.UPLOAD_URL + images[2].image, {
          w: 300,
          h: 350,
          q: 0,
          auto: 'format',
          fit: 'min',
          dpr: 0.1,
        })}
        loading="lazy"
      />
      {/* <img src={client.UPLOAD_URL + images[1].image} alt="post image" /> */}
      {/* <img src={client.UPLOAD_URL + images[2].image} alt="post image" /> */}
    </div>
  );
};

export default FeedCardImages;
