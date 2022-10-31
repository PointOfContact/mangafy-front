import React from 'react';

import { notification } from 'antd';
import { likeGallery } from 'components/gallery/utils';
import SvgHeart from 'components/icon/Heart';
import Imgix from 'components/imgix';
import { userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DescriptionBestProfile = ({
  item,
  user,
  likeModalContainerStyle,
  topGallery,
  setTopGallery,
  ifModal,
  setStartIndex,
}) => {
  const isLiked = (userId) => {
    const liked = !!item?.galleryLikedUsers?.find((value) => value === userId);
    console.log(item?.galleryLikedUsers);
    console.log(liked);
    return liked;
  };

  const onLikeGallery = (galleryId, userId, likedUserId) => {
    if (!user) return Router.push('/sign-in');
    if (!isLiked(user?._id)) {
      likeGallery(galleryId, userId)
        .then(() => {
          setTopGallery(
            topGallery.map((value, index) => {
              if (value._id === galleryId) {
                setStartIndex(index);
                return {
                  ...value,
                  // add new like user id
                  galleryLikedUsers: [...value.galleryLikedUsers, likedUserId],
                  // add like
                  likeCount: item?.likeCount + 1,
                };
              }
              return value;
            })
          );
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
        });
    } else {
      // There should be 'unLike' functionality but it can't be done yet
      likeGallery(galleryId, userId)
        .then(() => {
          setTopGallery(
            topGallery.map((value, index) => {
              if (value._id === galleryId) {
                setStartIndex(index);
                return {
                  ...value,
                  // remove user id
                  galleryLikedUsers: value.galleryLikedUsers.filter((id) => id !== likedUserId),
                  // remove like
                  likeCount: item?.likeCount - 1,
                };
              }
              return value;
            })
          );
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
        });
    }
  };

  return (
    <>
      <span className={styles.descriptionContent}>
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
          }
        >
          <SvgHeart
            width="20px"
            height="20px"
            onClick={(e) => {
              e.stopPropagation();
              onLikeGallery(item?._id, item?.userId, user?._id);
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
  user: PropTypes.object,
  likeModalContainerStyle: PropTypes.bool,
  topGallery: PropTypes.array.isRequired,
  setTopGallery: PropTypes.func.isRequired,
  ifModal: PropTypes.bool,
  setStartIndex: PropTypes.func.isRequired,
};

DescriptionBestProfile.defaultProps = {
  ifModal: false,
  likeModalContainerStyle: false,
  user: {},
};

export default DescriptionBestProfile;
