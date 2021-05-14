import React, { useState, useEffect } from 'react';

import { Upload, Row, Col } from 'antd';
import client from 'api/client';
import Card from 'components/card';
import Imgix from 'components/imgix';
import AddButton from 'components/ui-elements/add-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import GalleryCard from './galleryCard';
import HtmlGalleryModal from './htmlGalleryModal';
import ShortStory from './shortStory';
import { ShowGalleryModal } from './showGalleryModal';
import styles from './style.module.scss';
import { beforeGalleryUpload, getShortStorys } from './utils';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

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
  const [startIndex, setStartIndex] = useState(0);
  const [userData, setUserData] = useState(profile || user);
  const [showUploadList, setShowUploadList] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [createGalleryModal, setCreateGalleryModal] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [canEdit] = useState(canEditInit);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    const data = [];
    let textData = [];
    if (canEdit) {
      if (fromPath === 'users') {
        userData &&
          (userData.gallery.forEach((item) => {
            if (item.slice(-3) === 'pdf' || item.slice(-3) === 'PDF') {
              data.push({
                original: client.UPLOAD_URL + item,
                _id: item,
                // eslint-disable-next-line react/display-name
                renderItem: () => <PDFViewer url={client.UPLOAD_URL + item} />,
              });
            } else {
              data.push({
                original: client.UPLOAD_URL + item,
                _id: item,
              });
            }
          }),
          getShortStorys(
            profile._id,
            (res) => {
              textData = res.data;
              const newTextData = textData.map((item) => ({
                ...item,
                // eslint-disable-next-line react/display-name
                renderItem: () => (
                  <ShortStory title={item?.title} description={item?.description} />
                ),
              }));
              setImages(data.concat(newTextData));
            },
            (err) => {
              console.log(err);
            }
          ));
      } else {
        mangaStories &&
          mangaStories.gallery &&
          mangaStories.gallery.forEach((item) => {
            if (item.slice(-3) === 'pdf' || item.slice(-3) === 'PDF') {
              data.push({
                original: client.UPLOAD_URL + item,
                _id: item,
                // eslint-disable-next-line react/display-name
                renderItem: () => <PDFViewer url={client.UPLOAD_URL + item} />,
              });
            } else {
              data.push({
                original: client.UPLOAD_URL + item,
                _id: item,
              });
            }
          });
      }
    } else {
      profile &&
        (profile.gallery.forEach((item) => {
          if (item.slice(-3) === 'pdf' || item.slice(-3) === 'PDF') {
            data.push({
              original: client.UPLOAD_URL + item,
              _id: item,
              // eslint-disable-next-line react/display-name
              renderItem: () => <PDFViewer url={client.UPLOAD_URL + item} />,
            });
          } else {
            data.push({
              original: client.UPLOAD_URL + item,
              _id: item,
            });
          }
        }),
        getShortStorys(
          profile._id,
          (res) => {
            textData = res.data;
            const newTextData = textData.map((item) => ({
              ...item,
              // eslint-disable-next-line react/display-name
              renderItem: () => <ShortStory title={item?.title} description={item?.description} />,
            }));
            setImages(data.concat(newTextData));
          },
          (err) => {
            console.log(err);
          }
        ));
    }
  }, [canEdit, fromPath, mangaStories, profile, userData]);

  const showModal = () => {
    document.body.classList.add('body_remove_scroll');
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    document.body.classList.remove('body_remove_scroll');
    setSelectedGallery(null);
    setShowGallery(false);
    setCreateGalleryModal(false);
    setIsModalVisible(false);
  };

  const gallerySet = (e, indexImg) => {
    setStartIndex(indexImg);
    setShowGallery(true);
    showModal();
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
        <ShowGalleryModal {...{ startIndex, images, handleCancel, isModalVisible }} />
      )}
      {createGalleryModal && (
        <HtmlGalleryModal
          gallery={selectedGallery}
          {...{ setImages, images, user, handleCancel, isModalVisible }}
        />
      )}
      <h4 className={styles.title}>{title}</h4>
      {errMessage && <p>{errMessage}</p>}
      <Row>
        <Col span={21}>
          <div className={styles.imagesBlock}>
            {images?.length ? (
              images.map((galleryItem, index) => (
                <GalleryCard
                  key={galleryItem._id}
                  {...{
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
                  }}
                />
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
                          width={124}
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
                        width={124}
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
            md={{ span: 3 }}
            xl={{ span: 3 }}
            xxl={{ span: 3 }}
            span={3}
            className={styles.img_add_button}>
            {/* {isShowAdd && ( */}
            <span
              className={styles.uploadText}
              onClick={() => {
                setCreateGalleryModal(true);
                setIsModalVisible(true);
              }}>
              <AddButton width="25px" height="25px" text={'Add text'} />
            </span>
            {/* )}
            <div onClick={() => setIsShowAdd(!isShowAdd)}>
              <AddButton text={!isShowAdd && 'Add'} />
            </div>
            {isShowAdd && ( */}
            <span className={styles.uploadFile}>
              <Upload
                beforeUpload={onBeforeGalleryUpload}
                showUploadList={false}
                accept="image/jpg, image/png, image/jpeg, application/pdf ">
                <AddButton width="25px" height="25px" text={'Upload'} />
              </Upload>
            </span>
            {/* )} */}
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
