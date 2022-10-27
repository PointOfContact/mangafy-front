import client from 'api/client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import ResponsiveImgix from 'components/imgix/responsiveImgix';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import reactImageSize from 'react-image-size';
import { imgixClient } from 'components/imgix';

const MangaBody = ({ images, className }) => {
  return (
    <div className={cn(styles.body, className)}>
      {/* {shot.image && <ResponsiveImgix src={client.UPLOAD_URL + shot.image} />} */}
      {images?.map((image, index) => (
        <InnerImageZoom
          key={image + index}
          moveType="drag"
          fullscreenOnMobile
          zoomScale={1.5}
          hideHint
          src={client.UPLOAD_URL + image}
        />
      ))}
    </div>
  );
};

export default MangaBody;
