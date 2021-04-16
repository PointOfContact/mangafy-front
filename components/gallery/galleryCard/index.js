import React, { useCallback } from 'react';

import { notification, Popconfirm } from 'antd';
import client from 'api/client';
import SvgDustbin from 'components/icon/Dustbin';
import SvgHeart from 'components/icon/Heart';
import PropTypes from 'prop-types';

import { likeGallery, removeImg, prepareDataImages } from '../utils';
import styles from './style.module.scss';

const GalleryCard = ({
  index,
  canEdit,
  canEditInit,
  user,
  userData,
  galleryItem,
  gallerySet,
  setUserData,
  fromPath,
  setImages,
  images,
}) => {
  const getLikesCount = useCallback(
    (galleryId) =>
      userData?.galleryLikedUsers?.filter((item) => galleryId === item.galleryId).length || 0,
    [userData?.galleryLikedUsers]
  );

  const isLiked = useCallback(
    (galleryId, userId) =>
      !!userData?.galleryLikedUsers?.find(
        (item) => galleryId === item.galleryId && item.likedUserId === userId
      ),
    [userData?.galleryLikedUsers]
  );

  const onLikeGallery = (galleryId, userId, likedUserId) => {
    likeGallery(galleryId, userId)
      .then(() => {
        setUserData({
          ...userData,
          galleryLikedUsers: [
            ...(userData?.galleryLikedUsers || []),
            {
              galleryId,
              likedUserId,
            },
          ],
        });
      })
      .catch((err) => {
        notification.error({
          message: err.message,
        });
      });
  };

  const onRemoveImg = (e, _id) => {
    e.stopPropagation();
    removeImg(images, _id, fromPath, userData)
      .then((res) => {
        setUserData(res);
        setImages(prepareDataImages(res.gallery));
      })
      .catch((err) => {
        notification.error({
          message: err.message,
        });
      });
  };

  return (
    <div>
      <div key={index} className={styles.galleryImg}>
        {canEditInit && (
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={(e) => onRemoveImg(e, galleryItem._id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No">
            <span className={styles.dustbin} data-id={galleryItem._id}>
              <SvgDustbin width="18px" />
            </span>
          </Popconfirm>
        )}
        <span className={styles.heart}>
          <SvgHeart
            width="18px"
            height="16px"
            onClick={() =>
              user &&
              !isLiked(galleryItem._id, user._id) &&
              !canEdit &&
              onLikeGallery(galleryItem._id, userData._id, user._id)
            }
            className={user && isLiked(galleryItem._id, user._id) && styles.liked}
          />
          <span>{getLikesCount(galleryItem._id)}</span>
        </span>
        <div className={styles.filter} onClick={(e) => gallerySet(e, index)}></div>
        {galleryItem.renderItem ? (
          <div className={styles.textContent}>
            <h3>{galleryItem.title}</h3>
            <p>{galleryItem.description}</p>
          </div>
        ) : (
          <img src={client.UPLOAD_URL + galleryItem._id} alt="" />
        )}
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  user: PropTypes.object.isRequired,
  galleryItem: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  canEditInit: PropTypes.bool.isRequired,
  setUserData: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  canEdit: PropTypes.bool.isRequired,
  gallerySet: PropTypes.func.isRequired,
  setImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  fromPath: PropTypes.string.isRequired,
};

export default GalleryCard;
