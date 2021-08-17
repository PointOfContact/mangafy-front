/* eslint-disable react/display-name */
import React from 'react';

import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import Imgix from 'components/imgix';
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
  const images = topGallery.map((item) => ({
    renderItem: () => (
      <div className={styles.moduleGa}>
        <DescriptionBestProfile
          item={item}
          user={user}
          likeModalContainerStyle={true}
          topGallery={topGallery}
          setTopGallery={setTopGallery}
          ifModal={true}
        />
        <Imgix
          layout="fill"
          src={`https://mangafy.club/api/v2/uploads/${item?._id}`}
          alt="mangaFy top gallery"
        />
      </div>
    ),
    _id: item?._id,
  }));

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
        <ImageGallery
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
  currentItem: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  gallery: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  topGallery: PropTypes.array.isRequired,
  setTopGallery: PropTypes.func.isRequired,
};

export default ModalBestProfile;
