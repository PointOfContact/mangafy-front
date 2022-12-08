/* eslint-disable react-hooks/exhaustive-deps */
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import styles from './styles.module.scss';
import PropsTypes from 'prop-types';
import cn from 'classnames';
import client from 'api/client';
import { useEffect, useState } from 'react';
import { imgixClient, myLoader } from 'components/imgix';

const ViewScroll = ({ images, className }) => {
  const [width, setWidth] = useState(false);
  const [largeWidth, setLargeWidth] = useState(false);

  const getImageFromImgix = (image, width) => {
    //The shrinking number is the padding size from the image
    const options = {
      auto: 'format',
      fit: 'cover',
    };
    options.width = width - 180;
    if (width <= 767) {
      delete options.width;
    } else if (width <= 991) {
      options.width = width - 120;
    }
    return imgixClient.buildURL('https://mangafy.club/api/v2/uploads/' + image, options);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    setLargeWidth(window.innerWidth + 200);
  }, []);

  return (
    <div
      // onMouseLeave={() => {
      //   document.body.style.position = 'initial';
      // }}
      className={cn(styles.body, className)}>
      {/* {shot.image && <ResponsiveImgix src={client.UPLOAD_URL + shot.image} />} */}
      {width &&
        images?.map((image, index) => {
          const imageFromImgix = getImageFromImgix(image, width);
          const largeImageFromImgix = getImageFromImgix(image, largeWidth);
          return (
            <div
              id={`page${index + 1}`}
              key={image + index}
              style={{ overflow: 'hidden', borderRadius: '10px', marginBottom: '5px' }}>
              <InnerImageZoom
                moveType="pan"
                fullscreenOnMobile
                // zoomScale={3.5}
                hideHint
                src={imageFromImgix}
                zoomSrc={largeImageFromImgix}
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
