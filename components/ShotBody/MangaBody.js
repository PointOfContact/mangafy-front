import client from 'api/client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import ResponsiveImgix from 'components/imgix/responsiveImgix';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import reactImageSize from 'react-image-size';
import { imgixClient } from 'components/imgix';

const zoomData = (width, image) => {
  const zoomUrl = imgixClient.buildURL(client.UPLOAD_URL + image, {
    w: width,
    q: 0,
    auto: 'format',
    fit: 'min',
    dpr: 0.1,
    fm: 'json',
  });
  return zoomUrl;
};

const MangaBody = ({ images, className }) => {
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    images?.forEach((image, index) => {
      const size = reactImageSize(client.UPLOAD_URL + image);
      Promise.all([size]).then((values) => {
        const zoomSrc = zoomData(values[0].width);
        setImagesArray((val) => [
          ...val,
          <InnerImageZoom
            key={image + index}
            moveType="drag"
            fullscreenOnMobile
            // zoomScale={4}
            hideHint
            src={zoomData(values[0].width, image)}
            zoomSrc={zoomData(values[0].width + 250, image)}
          />,
        ]);
      });
    });
  }, [images.lenght]);

  return (
    <div className={cn(styles.body, className)}>
      {/* {shot.image && <ResponsiveImgix src={client.UPLOAD_URL + shot.image} />} */}
      {imagesArray}
    </div>
  );
};

export default MangaBody;
