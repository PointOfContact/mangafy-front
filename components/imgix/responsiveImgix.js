import React, { useState, useEffect } from 'react';
import Imgix, { imgixClient } from '.';
import styles from './styles.module.scss';

const ResponsiveImgix = ({ src, alt, onSizeLoaded }) => {
  const [json, setJson] = useState({});

  useEffect(() => {
    if (onSizeLoaded) {
      onSizeLoaded(json?.PixelWidth, json?.PixelHeight);
    }
  }, [json]);

  useEffect(() => {
    fetch(
      imgixClient.buildURL(src, {
        w: 300,
        h: 350,
        q: 0,
        auto: 'format',
        fit: 'min',
        dpr: 0.1,
        fm: 'json',
      })
    )
      .then((response) => response.json())
      .then((data) => setJson(data));
  }, [src]);
  const imgHeight = (json?.PixelHeight / json?.PixelWidth) * 300 || 350;

  return (
    <>
      {json?.PixelHeight && (
        <div className={styles.image} style={{ aspectRatio: `${300 / imgHeight}` }}>
          <Imgix
            src={src}
            width={300}
            height={imgHeight}
            quality={75}
            // layout="responsive"
            objectFit="cover"
            alt={alt || 'image'}
            loading="lazy"
          />
        </div>
      )}
    </>
  );
};

export default ResponsiveImgix;
