import React from 'react';

import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import styles from './style.module.scss';

export const ShowGalleryModal = ({ startIndex, images, handleCancel, isModalVisible }) => (
  <div>
    <Modal
      className={styles.modal}
      bodyStyle={{ height: 'calc(100vh- 60px)', overflow: 'auto' }}
      footer={null}
      width={'100%'}
      zIndex={200000000}
      onCancel={handleCancel}
      closeIcon={<SvgClose />}
      visible={isModalVisible}>
      <div>
        <ImageGallery
          lazyLoad={true}
          useBrowserFullscreen={false}
          showIndex={false}
          autoPlay={false}
          showThumbnails={false}
          showFullscreenButton={false}
          items={images}
          startIndex={startIndex}
          showPlayButton={false}
          showBullets={false}
        />
      </div>
    </Modal>
  </div>
);

ShowGalleryModal.propTypes = {
  startIndex: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};
