/* eslint-disable react-hooks/exhaustive-deps */
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import styles from './styles.module.scss';
import PropsTypes from 'prop-types';
import cn from 'classnames';
import client from 'api/client';
import { useEffect } from 'react';
import { imgixClient, myLoader } from 'components/imgix';

const ViewScroll = ({ images, className }) => {
  const getImageFromImgix = (image) =>
    imgixClient.buildURL('https://mangafy.club/api/v2/uploads/' + image, {
      auto: 'format',
      fit: 'cover',
    });

  return (
    <div
      onMouseLeave={() => {
        document.body.style.position = 'initial';
      }}
      className={cn(styles.body, className)}>
      {/* {shot.image && <ResponsiveImgix src={client.UPLOAD_URL + shot.image} />} */}
      {images?.map((image, index) => {
        const imageFromImgix = getImageFromImgix(image);
        return (
          <div id={`page${index + 1}`} key={image + index}>
            <InnerImageZoom
              moveType="pan"
              fullscreenOnMobile
              zoomScale={1}
              hideHint
              src={imageFromImgix}
            />
          </div>
        );
      })}
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
