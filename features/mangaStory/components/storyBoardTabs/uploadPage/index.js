import React from 'react';

import { Popconfirm } from 'antd';
import client from 'api/client';
import { patchStoryBoard } from 'api/storyBoardClient';
import SvgDelete from 'components/icon/Delete';
import Imgix from 'components/imgix';
import ShowImgModal from 'components/modals/showImg';
import PDFViewer from 'components/pdfViewer';
import PrimaryUpload from 'components/ui-elements/upload';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const UploadPage = ({
  storyBoard,
  setStoryBoard,
  openNotification,
  getUploadImages,
  isModalVisible,
  setZoomImageUrl,
  setIsModalVisible,
  renderNavigationButtons,
  addNewButtons,
  setUploadImages,
  zoomImageUrl,
}) => {
  const ifPdf = (index) =>
    storyBoard?.mangaUrls[index]?.slice(-3) === 'pdf' ||
    storyBoard?.mangaUrls[index]?.slice(-3) === 'PDF';

  const confirmDelete = (index) => {
    storyBoard.mangaUrls.splice(index, 1);
    patchStoryBoard(
      storyBoard?._id,
      {
        mangaUrls: [...storyBoard.mangaUrls],
      },
      (response) => {
        setStoryBoard(response);
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  };
  const listUploadPhoto = getUploadImages.map((value, index) => (
    <div className={styles.uploadList} key={index}>
      <div className={styles.uploadListTitle}>Page {index + 1}</div>
      <div
        className={styles.uploadPhoto}
        onClick={() => {
          if (ifPdf(index)) {
            setZoomImageUrl(<PDFViewer url={client.UPLOAD_URL + storyBoard?.mangaUrls[index]} />);
            setIsModalVisible(!isModalVisible);
          } else {
            setZoomImageUrl(value.url);
            setIsModalVisible(!isModalVisible);
          }
        }}>
        {ifPdf(index) ? (
          <Imgix
            width={58}
            height={58}
            layout="fixed"
            src="https://mangafy.club/img/pdf.webp"
            alt="Manga story cover"
          />
        ) : (
          <img className={styles.photo} src={value.url} alt="" />
        )}
      </div>
      <Popconfirm
        overlayClassName={styles.popConfirm}
        placement="topLeft"
        title={'Are you sure to delete this page?'}
        onConfirm={() => {
          confirmDelete(index);
        }}
        okText="Yes"
        cancelText="No">
        <span className={styles.deleteCard}>
          <SvgDelete width="12px" height="12px" />
        </span>
      </Popconfirm>
    </div>
  ));
  return (
    <div className={styles.tabContent}>
      {addNewButtons}
      <div className={styles.uploadPhotoContainer}>
        <div className={styles.uploadListContainer}>
          <div className={styles.card_wrap}>{!!getUploadImages.length && listUploadPhoto}</div>
        </div>
        <div
          className={!!getUploadImages.length ? styles.uploadContainerDef : styles.uploadContainer}>
          <div className={styles.headerUpload} />
          <PrimaryUpload
            className={styles.upload}
            storyBoardId={storyBoard?._id}
            mangaUrl={storyBoard?.mangaUrl}
            setStoryBoard={setStoryBoard}
            mangaUrls={storyBoard?.mangaUrls}
            setUploadImages={setUploadImages}
            showText={false}
          />
          <ShowImgModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            img={zoomImageUrl}
          />
        </div>
      </div>
      {renderNavigationButtons(!getUploadImages.length)}
    </div>
  );
};

UploadPage.propTypes = {
  storyBoard: PropTypes.object.isRequired,
  setStoryBoard: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  getUploadImages: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  renderNavigationButtons: PropTypes.func.isRequired,
  setZoomImageUrl: PropTypes.array.isRequired,
  setIsModalVisible: PropTypes.array.isRequired,
  addNewButtons: PropTypes.func.isRequired,
  setUploadImages: PropTypes.func.isRequired,
  zoomImageUrl: PropTypes.object.isRequired,
};

export default UploadPage;
