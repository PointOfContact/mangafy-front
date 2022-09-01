import React, { useState } from 'react';

import Modal from 'antd/lib/modal/Modal';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import styles from './style.module.scss';
import client from 'api/client';
import ShotComments from 'components/shotComments';

export const ShowGalleryModal = ({ startIndex, images, handleCancel, isModalVisible, user }) => {
  const image = {
    id: images[startIndex]._id._id || images[startIndex]._id,
    title: images[startIndex].title,
    description: images[startIndex].description,
    image: images[startIndex]._id.image || images[startIndex].image,
  };

  return (
    <div>
      <Modal
        className={cn(styles.modal, 'galeryModal')}
        footer={null}
        zIndex={200000000}
        onCancel={handleCancel}
        closeIcon={<SvgClose />}
        visible={isModalVisible}>
        {image.title && <div className={styles.modal__title}>{image.title}</div>}
        {image.description && <div className={styles.modal__description}>{image.description}</div>}
        {image.image && (
          <div className={styles.modal__image}>
            <img src={client.UPLOAD_URL + image.image} alt="gallery image" />
          </div>
        )}
        <ShotComments shotId={image.id} user={user} />
      </Modal>
    </div>
  );
};

ShowGalleryModal.propTypes = {
  startIndex: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};
