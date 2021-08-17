import React from 'react';

import { notification } from 'antd';
import { likeGallery } from 'components/gallery/utils';
import SvgHeart from 'components/icon/Heart';
import Imgix from 'components/imgix';
import { userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DescriptionBestProfile = ({
  item,
  user,
  likeModalContainerStyle,
  topGallery,
  setTopGallery,
  ifModal,
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

  const handleEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <span className={styles.descriptionContent} onClick={(e) => handleEvent(e)}>
        <Link href={`/profile/${item.userId}`}>
          <a className={styles.avatarData}>
            {ifModal && (
              <Imgix
                layout="fixed"
                className={styles.avatarImage}
                width={55}
                height={55}
                src={`https://mangafy.club/api/v2/uploads/${item?.avatar}`}
                alt="mangaFy top gallery"
              />
            )}
            <div className={styles.description}>
              <p>{item?.name}</p>
              <p className={styles.type}>{userTypesEnums[item?.type]}</p>
            </div>
          </a>
        </Link>
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
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeModalContainerStyle: PropTypes.bool.isRequired,
  topGallery: PropTypes.array.isRequired,
  setTopGallery: PropTypes.func.isRequired,
  ifModal: PropTypes.bool,
};

DescriptionBestProfile.defaultProps = {
  ifModal: false,
};

export default DescriptionBestProfile;
