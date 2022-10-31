/* eslint-disable react/display-name */
import client from 'api/client';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import ResponsiveImgix from 'components/imgix/responsiveImgix';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import reactImageSize from 'react-image-size';
import Imgix, { imgixClient } from 'components/imgix';
import HTMLFlipBook from 'react-pageflip';

const MangaBody = ({ images, className }) => {
  const [readStyle, setReadStyle] = useState(true);
  const [ref, setRef] = useState();

  return readStyle ? (
    <HTMLFlipBook
      width={800}
      height={800}
      maxWidth={1200}
      onChangeState={() => false}
      onCliclk={() => {
        console.log(10);
      }}
      size="stretch"
    >
      {images?.map((image, index) => (
        <div key={image + index}>
          <p className={styles.pageCount} style={{ textAlign: index % 2 ? 'end' : 'left' }}>
            {index + 1}
          </p>
          <div className={styles.containerImage}>
            <Imgix layout="fill" src={client.UPLOAD_URL + image} alt="images"></Imgix>
          </div>
        </div>
      ))}
    </HTMLFlipBook>
  ) : (
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
