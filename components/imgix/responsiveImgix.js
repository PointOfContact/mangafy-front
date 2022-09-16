import React, { useState, useEffect } from 'react';
import Imgix, { imgixClient } from '.';

const ResponsiveImgix = ({ src }) => {
  const [json, setJson] = useState({});

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
        <Imgix
          src={src}
          width={300}
          height={imgHeight > 600 ? 600 : imgHeight}
          quality={75}
          layout="responsive"
          objectFit="cover"
          alt="Shot"
          loading="lazy"
        />
      )}
    </>
  );
};

export default ResponsiveImgix;
