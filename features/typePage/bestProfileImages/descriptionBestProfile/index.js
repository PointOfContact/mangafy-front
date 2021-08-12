import React from 'react';

import { notification } from 'antd';
import { likeGallery } from 'components/gallery/utils';
import SvgHeart from 'components/icon/Heart';
import { userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DescriptionBestProfile = ({
  item,
  user,
  likeModalContainerStyle,
  topGallery,
  setTopGallery,
}) => {
  const isLiked = (userId) => !!item?.galleryLikedUsers?.find((value) => value === userId);

  const onLikeGallery = (galleryId, userId, likedUserId) => {
    likeGallery(galleryId, userId)
      .then(() => {
        setTopGallery(
          topGallery.map((value) =>
            value._id === galleryId
              ? {
                  ...value,
                  // add new like user id
                  galleryLikedUsers: [...value.galleryLikedUsers, likedUserId],
                  // add like
                  likeCount: item?.likeCount + 1,
                }
              : value
          )
        );
      })
      .catch((err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      });
  };

  return (
    <>
      <span className={styles.descriptionContMobile}>
        <div className={styles.description}>
          <p>{item?.name}</p>
          <p className={styles.type}>{userTypesEnums[item?.type]}</p>
        </div>
        <span
          className={
            likeModalContainerStyle ? styles.likeModalContainerStyle : styles.likeContainer
          }>
          <SvgHeart
            width="20px"
            height="20px"
            onClick={(e) => {
              e.stopPropagation();
              user && !isLiked(user?._id) && onLikeGallery(item?._id, item?.userId, user?._id);
            }}
            className={user && isLiked(user?._id) && styles.isLiked}
          />
          {item?.likeCount}
        </span>
      </span>
    </>
  );
};

DescriptionBestProfile.propTypes = {
  item: PropTypes.object,
  user: PropTypes.object.isRequired,
  likeModalContainerStyle: PropTypes.bool.isRequired,
  topGallery: PropTypes.array.isRequired,
  setTopGallery: PropTypes.func.isRequired,
};

DescriptionBestProfile.defaultProps = {
  item: {},
};

export default DescriptionBestProfile;
