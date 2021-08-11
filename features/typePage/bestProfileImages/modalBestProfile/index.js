import React, { useEffect, useState } from 'react';

import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import DescriptionBestProfile from '../descriptionBestProfile';
import styles from './styles.module.scss';

const ModalBestProfile = ({
  showModal,
  setShowModal,
  topGallery,
  setTopGallery,
  startIndex,
  user,
}) => {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  const images = topGallery.map((item) => ({
    original: `https://mangafy.club/api/v2/uploads/${item?._id}`,
    _id: item?._id,
  }));

  if (index === 10) {
    setIndex(0);
  }

  return (
    <Modal
      className={styles.modal}
      title={''}
      footer={null}
      visible={showModal}
      closeIcon={
        <span className={styles.close} onClick={() => setShowModal(false)}>
          <SvgClose />
        </span>
      }
      okText="Send">
      <div className={styles.container}>
        <DescriptionBestProfile
          item={topGallery[index]}
          user={user}
          likeModalContainerStyle={true}
          topGallery={topGallery}
          setTopGallery={setTopGallery}
        />
        <ImageGallery
          onSlide={() => {
            setIndex(index + 1);
          }}
          lazyLoad={false}
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
  );
};

ModalBestProfile.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  gallery: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  topGallery: PropTypes.array.isRequired,
  setTopGallery: PropTypes.func.isRequired,
};

export default ModalBestProfile;
