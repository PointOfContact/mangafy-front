import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import PropsTypes from 'prop-types';
import cn from 'classnames';
import Imgix, { imgixClient } from 'components/imgix';
import HTMLFlipBook from 'react-pageflip';
import styles from './styles.module.scss';
import client from 'api/client';
import { useEffect, useRef, useState, useMemo } from 'react';
import ResponsiveImgix from 'components/imgix/responsiveImgix';

const BookView = ({ images, setRef, refBook, setConutPage }) => {
  const [imagesArray, setImagesArray] = useState(images);
  const pageWidth = 100;
  const [pageHeight, setPageHeight] = useState(null);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    if (window?.innerHeight) {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, [window]);

  useEffect(() => {
    if (images.length > 0) {
      fetch(
        imgixClient.buildURL(client.UPLOAD_URL + images[0], {
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
        .then((data) => {
          setPageHeight((data?.PixelHeight / data?.PixelWidth) * pageWidth);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [images]);

  const imagesElements = useMemo(
    () =>
      imagesArray?.map((image, index) => (
        <div key={image + index}>
          {/* <p className={styles.pageCount} style={{ textAlign: index % 2 ? 'end' : 'left' }}>
            {index + 1}
          </p> */}
          <div className={styles.containerImage}>
            <Imgix layout="fill" src={client.UPLOAD_URL + image} alt="images"></Imgix>
          </div>
        </div>
      )),
    [imagesArray]
  );

  useEffect(() => {
    const imagesLength = images.length % 2;
    if (imagesLength) {
      return setImagesArray([...images, '1667401070487-396290380-ssss.jpg']);
    }
    setImagesArray(images);
  }, []);

  if (!pageHeight || !screenSize) {
    return null;
  }

  return (
    <div
      className={styles.bookView}
      style={{
        width:
          screenSize.width > screenSize.height
            ? `${(pageWidth * 2 * (screenSize.height - 85)) / pageHeight}px`
            : `${(pageWidth * (screenSize.height - 85)) / pageHeight}px`,
      }}>
      <HTMLFlipBook
        ref={refBook}
        width={pageWidth}
        height={pageHeight}
        size="stretch"
        // autoSize={true}
        minWidth={320}
        // maxWidth={3000}
        // minHeight={basePageWidth * aspectRatio}
        // maxHeight={2000}
        mobileScrollSupport={true}
        showCover={false}
        usePortrait={true}
        onFlip={({ data }) => setConutPage(data + 1)}>
        {imagesElements}
      </HTMLFlipBook>
    </div>
  );
};

BookView.propTypes = {
  images: PropsTypes.array.isRequired,
  setRef: PropsTypes.func.isRequired,
  refBook: PropsTypes.object,
  setConutPage: PropsTypes.func.isRequired,
};

BookView.defaultProps = {
  refBook: null,
};

export default BookView;
