/* eslint-disable react-hooks/exhaustive-deps */
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import styles from './styles.module.scss';
import PropsTypes from 'prop-types';
import cn from 'classnames';
import client from 'api/client';
import { useEffect } from 'react';

const ViewScroll = ({ images, className }) => {
  return (
    <div
      onMouseLeave={() => {
        document.body.style.position = 'initial';
      }}
      className={cn(styles.body, className)}>
      {/* {shot.image && <ResponsiveImgix src={client.UPLOAD_URL + shot.image} />} */}
      {images?.map((image, index) => (
        <div id={`page${index + 1}`} key={image + index}>
          <InnerImageZoom
            moveType="drag"
            fullscreenOnMobile
            zoomScale={0.5}
            hideHint
            src={client.UPLOAD_URL + image}
          />
        </div>
      ))}
    </div>
  );
};

ViewScroll.propTypes = {
  images: PropsTypes.array.isRequired,
  className: PropsTypes.string,
};

ViewScroll.defaultProps = {
  className: '',
};

export default ViewScroll;
