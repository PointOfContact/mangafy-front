/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';

import Modal from 'antd/lib/modal/Modal';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import styles from './style.module.scss';
import client from 'api/client';
import ShotComments from 'components/shotComments';
import ResponsiveImgix from 'components/imgix/responsiveImgix';
import Heart from 'components/icon/new/Heart';
import { notification } from 'antd';
import { editGallery, likeShot } from '../utils';
import getDeviceId from 'utils/deviceId';
import { viewShot } from 'utils';
import PrimaryButton from 'components/ui-elements/button';
import { useAppContext } from 'context';
import { SignInModal } from 'components/modals/SignInModal';

export const ShowGalleryModal = ({
  startIndex,
  images,
  handleCancel,
  isModalVisible,
  user,
  authorId,
  updateShots,
}) => {
  const image = {
    _id: images[startIndex]._id._id || images[startIndex]._id,
    title: images[startIndex].title,
    description: images[startIndex].description,
    image: images[startIndex]._id.image || images[startIndex].image,
    likedUsers: images[startIndex]?.likedUsers || [],
    viewerId: images[startIndex]?.viewerId,
    view: images[startIndex]?.view,
    authorId: images[startIndex]?.authorId,
    planId: images[startIndex]?.planId,
    chargebee: images[startIndex]?.chargebee,
  };

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  // const [isLiked, setIsLiked] = useState(
  //   image.likedUsers?.some((user) => user.likedUserId === user._id)
  // );

  // useEffect(() => {
  //   setIsLiked(image.likedUsers?.some((user) => user.likedUserId === user._id));
  // }, [image]);

  const isLiked = image.likedUsers?.some((us) => us.likedUserId === user._id);

  const onLikeGallery = (galleryId, authorId, likedUserId) => {
    user
      ? likeShot(galleryId, authorId)
          .then((res) => {
            updateShots();
          })
          .catch((err) => {
            if (err.code === 401)
              notification.error({
                message: 'Please log in to like Shots',
                placement: 'bottomLeft',
              });
            else if (err.message === 'You can not like yourself')
              notification.error({ message: 'You can not like yourself', placement: 'bottomLeft' });
            else {
              console.log(err);
            }
          })
      : router.push('/sign-in');
  };

  useEffect(() => {
    viewShot(user, image);
  }, []);

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
            <div
              className={cn(styles.modal__like, isLiked && styles.modal__like_active)}
              onClick={() => onLikeGallery(image._id, authorId, user?._id)}>
              {image.likedUsers.length}
              <Heart color="#fff" />
            </div>
            <ResponsiveImgix src={client.UPLOAD_URL + image.image} />
          </div>
        )}
        <ShotComments
          shotId={image._id}
          user={user}
          setIsLoginModalVisible={setIsLoginModalVisible}
        />
      </Modal>
      <SignInModal
        title="Sign in"
        visible={isLoginModalVisible}
        setVisible={setIsLoginModalVisible}></SignInModal>
    </div>
  );
};

ShowGalleryModal.propTypes = {
  startIndex: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};
