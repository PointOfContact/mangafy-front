import client from 'api/client';
import Image from 'next/image';
import Imgix from 'components/imgix';
import React from 'react';
import styles from './styles.module.scss';

function FeedCardImage({ image }) {
  console.log(image);
  return (
    <div className={styles.feedCardImage}>
      <Imgix
        src={image}
        width={300}
        height={350}
        layout="responsive"
        objectFit="cover"
        alt="Project cover"
      />
    </div>
  );
}

export default FeedCardImage;
