import React, { useCallback, useState } from 'react';

import { notification, Popconfirm } from 'antd';
import client from 'api/client';
import cd from 'classnames';
import SvgDustbin from 'components/icon/Dustbin';
import SvgEdit from 'components/icon/Edit';
import SvgHeart from 'components/icon/Heart';
import PropTypes from 'prop-types';

import { likeGallery, removeImg, prepareDataImages, removeShortStory } from '../utils';
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
  setSelectedGallery,
  setCreateGalleryModal,
  setIsModalVisible,
}) => {
  const [type] = useState(galleryItem?._id?.slice(-3));
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
    if (!galleryItem.renderItem || (galleryItem.renderItem && (type !== 'pdf' || type !== 'PDF'))) {
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
    } else {
      removeShortStory(
        _id,
        (res) => {
          const newImages = images.filter((item) => item._id !== res._id);
          setImages(newImages);
        },
        (err) => {
          notification.error({
            message: err.message,
          });
        }
      );
    }
  };
  const onEditImg = (e) => {
    e.stopPropagation();
    setSelectedGallery(galleryItem);
    setCreateGalleryModal(true);
    setIsModalVisible(true);
  };

  return (
    <div>
      <div
        key={index}
        className={cd(styles.galleryImg, galleryItem.renderItem && styles.typeRender)}>
        {canEditInit && (
          <>
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
            {galleryItem.renderItem && type !== 'pdf' && type !== 'PDF' && (
              <span
                onClick={(e) => onEditImg(e, galleryItem._id)}
                className={styles.edit}
                data-id={galleryItem._id}>
                <SvgEdit width="18px" />
              </span>
            )}
          </>
        )}
        {(!galleryItem.renderItem || type === 'pdf' || type === 'PDF') && (
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
              className={(user && isLiked(galleryItem._id, user._id) && styles.liked) || ''}
            />
            <span>{getLikesCount(galleryItem._id)}</span>
          </span>
        )}

        <div className={styles.filter} onClick={(e) => gallerySet(e, index)}></div>
        {
          // eslint-disable-next-line no-nested-ternary
          galleryItem.renderItem ? (
            type === 'pdf' || type === 'PDF' ? (
              <img
                src="https://icons.iconarchive.com/icons/graphicloads/filetype/256/pdf-icon.png"
                alt=""
              />
            ) : (
              <div className={styles.textContent}>
                <h3>{galleryItem.title}</h3>
                <p>{galleryItem.description}</p>
              </div>
            )
          ) : (
            <img src={client.UPLOAD_URL + galleryItem._id} alt="" />
          )
        }
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  user: PropTypes.object.isRequired,
  galleryItem: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  canEditInit: PropTypes.bool,
  setUserData: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  canEdit: PropTypes.bool,
  gallerySet: PropTypes.func.isRequired,
  setImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  fromPath: PropTypes.string,
  setCreateGalleryModal: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  setSelectedGallery: PropTypes.func.isRequired,
};

GalleryCard.defaultProps = {
  canEditInit: false,
  canEdit: false,
  fromPath: 'users',
};

export default GalleryCard;
