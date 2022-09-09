import client from 'api/client';
import Image from 'next/image';
import Imgix, { imgixClient } from 'components/imgix';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

function FeedCardImage({ image }) {
  const [json, setJson] = useState({});

  useEffect(() => {
    fetch(
      imgixClient.buildURL(image, {
        w: 300,
        h: 350,
        q: 0,
        auto: 'format',
        fit: 'min',
        dpr: 0.01,
        fm: 'json',
      })
    )
      .then((response) => response.json())
      .then((data) => setJson(data));
  }, []);

  const imgHeight = (json?.PixelHeight / json?.PixelWidth) * 300 || 350;
  return (
    <div className={styles.feedCardImage}>
      <Imgix
        src={image}
        width={300}
        height={imgHeight > 600 ? 600 : imgHeight}
        quality={0}
        layout="responsive"
        objectFit="cover"
        alt="Project cover"
        placeholder="blur"
        blurDataURL={imgixClient.buildURL(image, {
          w: 300,
          h: 350,
          q: 0,
          auto: 'format',
          fit: 'min',
          dpr: 0.1,
        })}
        loading="lazy"
      />
      {/* <Image
        src={imgixClient.buildURL(image, {
          w: 300,
          h: 350,
          q: 0,
          auto: 'format',
          fit: 'min',
          // dpr: 0.05,
        })}
        width={300}
        height={350}
        layout="responsive"
        objectFit="cover"
        alt="Project cover" */}
      {/* /> */}
    </div>
  );
}

export default FeedCardImage;
