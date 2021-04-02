import React, { useState, useEffect, useCallback } from 'react';

import { Modal, Upload, Row, Col, Popconfirm } from 'antd';
import client from 'api/client';
import Card from 'components/card';
import SvgClose from 'components/icon/Close';
import SvgDustbin from 'components/icon/Dustbin';
import SvgHeart from 'components/icon/Heart';
import Imgix from 'components/imgix';
import AddButton from 'components/ui-elements/add-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import styles from './style.module.scss';
import { likeGallery, removeImg, prepareDataImages, beforeGalleryUpload } from './utils';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

export const Gallery = (props) => {
  const { user = false, profile, mangaStories, fromPath = 'users', title = '' } = props;
  let canEditInit;
  if (!user) {
    canEditInit = false;
  } else if (!profile && user) {
    canEditInit = true;
  } else if (profile._id === user._id) {
    canEditInit = true;
  }

  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState(profile || user);
  const [showUploadList, setShowUploadList] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [canEdit] = useState(canEditInit);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const data = [];
    if (canEdit) {
      if (fromPath === 'users') {
        userData &&
          userData.gallery.forEach((item) => {
            data.push({
              original: client.UPLOAD_URL + item,
              _id: item,
            });
          });
      } else {
        mangaStories &&
          mangaStories.gallery &&
          mangaStories.gallery.forEach((item) => {
            data.push({
              original: client.UPLOAD_URL + item,
              _id: item,
            });
          });
      }
    } else {
      profile &&
        profile.gallery.forEach((item) => {
          data.push({
            original: client.UPLOAD_URL + item,
            _id: item,
          });
        });
    }
    setImages(data);
  }, [canEdit, fromPath, mangaStories, profile, userData]);

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
        setErrMessage(err.message);
      });
  };

  const showModal = () => {
    document.body.classList.add('body_remove_scroll');
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    document.body.classList.remove('body_remove_scroll');
    setIsModalVisible(false);
  };

  const gallerySet = (e, indexImg) => {
    const currentImg = images[indexImg];
    const ll = images.filter((item, index) => index !== indexImg);
    const newArr = [currentImg, ...ll];
    setShowGallery(true);
    showModal();
    setImages(newArr);
  };

  const onRemoveImg = (e, _id) => {
    e.stopPropagation();
    removeImg(images, _id, fromPath, userData)
      .then((res) => {
        setUserData(res);
        setImages(prepareDataImages(res.gallery));
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  };

  const onBeforeGalleryUpload = (file) => {
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.ADDED_PORTFOLIO,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
    beforeGalleryUpload(
      file,
      setShowUploadList,
      fromPath,
      userData,
      mangaStories,
      images,
      setImages,
      setUserData,
      setErrMessage
    );
  };

  return (
    <div>
      {showGallery && (
        <Modal
          className="galere_modal"
          footer={null}
          width={'100%'}
          zIndex={200000000}
          onCancel={handleCancel}
          closeIcon={<SvgClose />}
          visible={isModalVisible}>
          <div className={styles.main_popup}>
            <ImageGallery
              lazyLoad={true}
              useBrowserFullscreen={true}
              showIndex={true}
              autoPlay={false}
              items={images}
            />
          </div>
        </Modal>
      )}
      <h4 className={styles.title}>{title}</h4>
      {errMessage && <p>{errMessage}</p>}
      <Row>
        <Col span={22}>
          <div className={styles.imagesBlock}>
            {images.length ? (
              images.map((item, index) => (
                <div key={index} className={styles.galleryImg}>
                  {canEditInit && (
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={(e) => onRemoveImg(e, item._id)}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No">
                      <span className={styles.dustbin} data-id={item._id}>
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
                        !isLiked(item._id, user._id) &&
                        !canEdit &&
                        onLikeGallery(item._id, userData._id, user._id)
                      }
                      className={user && isLiked(item._id, user._id) && styles.liked}
                    />
                    <span>{getLikesCount(item._id)}</span>
                  </span>
                  <div className={styles.filter} onClick={(e) => gallerySet(e, index)}></div>
                  <img src={client.UPLOAD_URL + item._id} alt="" />
                </div>
              ))
            ) : (
              <div>
                {canEditInit ? (
                  <Upload beforeUpload={onBeforeGalleryUpload} showUploadList={showUploadList}>
                    <Card
                      description="Do you not want <br/> to add a gallery?"
                      btnText=""
                      items={[
                        <Imgix
                          key="1"
                          width={134}
                          height={140}
                          layout="fixed"
                          src="https://mangafy.club/img/noGalere.webp"
                          alt=""
                        />,
                      ]}
                    />
                  </Upload>
                ) : (
                  <Card
                    description="Sorry, but there is nothing <br/> here (("
                    btnText=""
                    items={[
                      <Imgix
                        key="1"
                        width={134}
                        height={140}
                        layout="fixed"
                        src="https://mangafy.club/img/noGalere.webp"
                        alt=""
                      />,
                    ]}
                  />
                )}
              </div>
            )}
          </div>
        </Col>
        {canEditInit && (
          <Col
            xs={{ span: 23 }}
            md={{ span: 2 }}
            xl={{ span: 2 }}
            xxl={{ span: 2 }}
            span={2}
            className={styles.img_add_button}>
            <Upload beforeUpload={onBeforeGalleryUpload} showUploadList={showUploadList}>
              <div className="">
                <AddButton />
              </div>
            </Upload>
          </Col>
        )}
      </Row>
    </div>
  );
};

Gallery.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
  mangaStories: PropTypes.array.isRequired,
  fromPath: PropTypes.string,
  title: PropTypes.string,
};

Gallery.defaultProps = {
  profile: null,
  title: '',
  fromPath: 'users',
};
