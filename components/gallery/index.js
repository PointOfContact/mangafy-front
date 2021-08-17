import React, { useState, useEffect } from 'react';

import { Upload, Row, Col } from 'antd';
import client from 'api/client';
import Loading from 'components/loading';
import AddButton from 'components/ui-elements/add-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import CreatePreviousWorks from './createPreviousWorks';
import HtmlGalleryModal from './htmlGalleryModal';
import ShortStory from './shortStory';
import { ShowGalleryModal } from './showGalleryModal';
import styles from './styles.module.scss';
import { beforeGalleryUpload, getShortStorys } from './utils';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

export const Gallery = (props) => {
  const { user = false, profile, mangaStoriesMyProfile, fromPath = 'users', title = '' } = props;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = [];
    let textData = [];
    if (canEdit) {
      if (fromPath === 'users') {
        userData &&
          (userData.gallery.forEach((item) => {
            if (item?.slice(-3) === 'pdf' || item?.slice(-3) === 'PDF') {
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
        mangaStoriesMyProfile &&
          mangaStoriesMyProfile.gallery &&
          mangaStoriesMyProfile.gallery.forEach((item) => {
            if (item?.slice(-3) === 'pdf' || item?.slice(-3) === 'PDF') {
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
          if (item?.slice(-3) === 'pdf' || item?.slice(-3) === 'PDF') {
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
  }, [canEdit, fromPath, mangaStoriesMyProfile, profile, userData]);

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
    const data = {
      event_type:
        file?.type === 'application/pdf' ? EVENTS.ADDED_PORTFOLIO_PDF : EVENTS.ADDED_PORTFOLIO,
      user_id: user._id,
      user_properties: {
        ...user,
      },
    };
    myAmplitude(data);

    beforeGalleryUpload(
      file,
      setShowUploadList,
      fromPath,
      userData,
      mangaStoriesMyProfile,
      images,
      setImages,
      setUserData,
      setErrMessage,
      setLoading
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
        <Col span={19}>
          <CreatePreviousWorks
            profile={profile}
            images={images}
            canEdit={canEdit}
            canEditInit={canEditInit}
            user={user}
            userData={userData}
            gallerySet={gallerySet}
            setUserData={setUserData}
            fromPath={fromPath}
            setImages={setImages}
            setSelectedGallery={setSelectedGallery}
            setCreateGalleryModal={setCreateGalleryModal}
            setIsModalVisible={setIsModalVisible}
            onBeforeGalleryUpload={onBeforeGalleryUpload}
            showUploadList={showUploadList}
          />
        </Col>
        {canEditInit && (
          <Col
            xs={{ span: 23 }}
            md={{ span: 5 }}
            xl={{ span: 5 }}
            xxl={{ span: 5 }}
            span={5}
            className={styles.img_add_button}>
            {/* {isShowAdd && ( */}
            <span
              className={styles.uploadText}
              onClick={() => {
                setCreateGalleryModal(true);
                setIsModalVisible(true);
              }}>
              <AddButton width="25px" height="25px" text={'Share stories'} />
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
                accept="image/jpg, image/png, application/pdf, image/jpeg ">
                <AddButton width="25px" height="25px" text={'Upload illustrations'} />
              </Upload>
            </span>
            {/* )} */}
          </Col>
        )}
      </Row>
      <Loading loading={loading} />
    </div>
  );
};

Gallery.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  mangaStoriesMyProfile: PropTypes.array.isRequired,
  mangaStories: PropTypes.array.isRequired,
  fromPath: PropTypes.string,
  title: PropTypes.string,
  ifMyProfile: PropTypes.bool,
};

Gallery.defaultProps = {
  user: {},
  profile: null,
  title: '',
  fromPath: 'users',
  ifMyProfile: true,
};
