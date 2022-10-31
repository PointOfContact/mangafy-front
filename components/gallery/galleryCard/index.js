import React, { useCallback, useState } from 'react';

import { notification, Popconfirm } from 'antd';
import client from 'api/client';
import cd from 'classnames';
import SvgDustbin from 'components/icon/Dustbin';
import SvgEdit from 'components/icon/Edit';
import SvgHeart from 'components/icon/Heart';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import dynamic from 'next/dynamic';
import router from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import { likeGallery, removeImg, prepareDataImages, removeShortStory, likeShot } from '../utils';
import styles from './style.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

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
  profileId,
  updateShots,
}) => {
  const ifNotStories = galleryItem?.original;
  const getTypeImg = ifNotStories && image?.slice(-3);
  const type = getTypeImg;

  const isLiked = Array.isArray(galleryItem.likedUsers)
    ? galleryItem.likedUsers.map((obj) => obj.likedUserId).includes(user?._id)
    : false;

  const getLikesCount = useCallback(
    (galleryId) =>
      userData?.galleryLikedUsers?.filter((item) => galleryId === item.galleryId).length || 0,
    [userData?.galleryLikedUsers]
  );

  const onLikeGallery = (galleryId, userId, likedUserId) => {
    user
      ? likeShot(galleryItem._id._id || galleryItem._id, router.query.pid)
          .then((res) => {
            const eventData = [
              {
                event_type: EVENTS.LIKE_SHOT,
                event_properties: {
                  shotId: res.portfolioId,
                  shotTitle: galleryItem.title,
                  from: 'Profile page',
                },
              },
            ];
            myAmplitude(eventData);
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

  const onRemoveImg = (e, _id) => {
    e.stopPropagation();
    // if (!!image || (!image && (type === 'pdf' || type === 'PDF'))) {
    //   removeImg(images, _id, fromPath, userData)
    //     .then((res) => {
    //       setUserData(res);
    //       setImages(prepareDataImages(res.gallery));
    //     })
    //     .catch((err) => {
    //       notification.error({
    //         message: err.message,
    //         placement: 'bottomLeft',
    //       });
    //     });
    // } else {
    removeShortStory(
      _id,
      (res) => {
        const newImages = images.filter((item) => item._id !== res._id);
        myAmplitude(EVENTS.DELETE_SHOT);
        setImages(newImages);
      },
      (err) => {
        const newImages = images.filter((item) => item._id !== _id);
        setImages(newImages);
        if (err.name !== 'NotFound')
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
      }
    );
    // }
  };

  const onEditImg = (e) => {
    e.stopPropagation();
    setSelectedGallery(galleryItem);
    setCreateGalleryModal(true);
    setIsModalVisible(true);
  };

  const image = galleryItem?._id.image || galleryItem?.image;

  return (
    <div>
      <div
        key={index}
        className={cd(
          styles.galleryImg,
          !image && type !== 'pdf' && type !== 'PDF' && styles.typeRender
        )}
      >
        {!!canEditInit && (
          <>
            <Popconfirm
              title={
                <div>
                  <h2>Delete attachment?</h2>
                  <span>Deleting an attachment is permanent. There is no undo.</span>
                </div>
              }
              onConfirm={(e) => onRemoveImg(e, galleryItem?._id)}
              onCancel={() => {}}
              okText="Delete"
              cancelText="No"
            >
              <span className={styles.dustbin} data-id={galleryItem?._id}>
                <SvgDustbin width="18px" />
              </span>
            </Popconfirm>
            {canEdit && (
              <span
                onClick={(e) => onEditImg(e, galleryItem?._id)}
                className={styles.edit}
                data-id={galleryItem?._id}
              >
                <SvgEdit width="18px" />
              </span>
            )}
          </>
        )}

        {!canEdit && Object.keys(galleryItem).length > 2 && (
          <span className={styles.heart}>
            <SvgHeart
              width="18px"
              height="16px"
              onClick={() => !canEdit && onLikeGallery(image, userData?._id, user?._id)}
              className={(user && isLiked && styles.liked) || ''}
            />
            <span>{!!getLikesCount(galleryItem?._id) && getLikesCount(image)}</span>
          </span>
        )}

        <div className={styles.filter} onClick={(e) => gallerySet(e, index)}></div>
        {
          // eslint-disable-next-line no-nested-ternary
          // galleryItem?.renderItem ? (
          //  type === 'pdf' || type === 'PDF' ? (
          //     <span className={styles.pdf}>
          //       <PDFViewer url={client.UPLOAD_URL + image} />
          //     </span>
          //   ) : (
          //     <div className={styles.textContent}>
          //       <h3>{galleryItem?.title}</h3>
          //       <p>{galleryItem?.description}</p>
          //     </div>
          //   )
          // ) : (
          //   <Imgix layout="fill" src={client.UPLOAD_URL + image} alt="MangaFy galere" />
          // )
          image ? (
            <Imgix layout="fill" src={client.UPLOAD_URL + image} alt="MangaFy galere" />
          ) : (
            <div className={styles.textContent}>
              <h3>{galleryItem?.title}</h3>
              <p>{galleryItem?.description}</p>
            </div>
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
  profileId: PropTypes.string,
};

GalleryCard.defaultProps = {
  canEditInit: false,
  canEdit: false,
  fromPath: 'users',
  profileId: '',
};

export default GalleryCard;
