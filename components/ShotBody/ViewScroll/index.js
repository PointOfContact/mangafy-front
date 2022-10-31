import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import styles from './styles.module.scss';
import PropsTypes from 'prop-types';
import cn from 'classnames';
import client from 'api/client';

const ViewScroll = ({ images, className }) => {
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

ViewScroll.propTypes = {
  images: PropsTypes.array.isRequired,
  className: PropsTypes.string,
};

ViewScroll.defaultProps = {
  className: '',
};

export default ViewScroll;
