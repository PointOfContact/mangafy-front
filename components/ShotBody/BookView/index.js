import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import PropsTypes from 'prop-types';
import cn from 'classnames';
import Imgix from 'components/imgix';
import HTMLFlipBook from 'react-pageflip';
import styles from './styles.module.scss';
import client from 'api/client';
import { useEffect, useRef, useState } from 'react';

const BookView = ({ images, setRef, refBook, setConutPage }) => {
  const [imagesArray, setImagesArray] = useState(images);

  useEffect(() => {
    const imagesLength = images.length % 2;
    if (imagesLength) {
      return setImagesArray([...images, '1667401070487-396290380-ssss.jpg']);
    }
    setImagesArray(images);
  }, []);

  return (
    <HTMLFlipBook
      ref={refBook}
      width={950}
      height={1100}
      minWidth={339}
      maxWidth={1000}
      minHeight={420}
      maxHeight={1350}
      size="stretch"
      onFlip={({ data }) => setConutPage(data + 1)}
      showCover={false}>
      {imagesArray?.map((image, index) => (
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
