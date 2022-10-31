import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import PropsTypes from 'prop-types';
import cn from 'classnames';
import Imgix from 'components/imgix';
import HTMLFlipBook from 'react-pageflip';
import styles from './styles.module.scss';
import client from 'api/client';

const BookView = ({ images }) => {
  return (
    <HTMLFlipBook width={800} height={800} maxWidth={1200} size="stretch">
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
  );
};

BookView.propTypes = {
  images: PropsTypes.array.isRequired,
};

export default BookView;
