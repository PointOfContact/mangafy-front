import React, { useEffect, useState } from 'react';

import { Upload, notification, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import client from 'api/client';
// Api

import { patchStoryBoard, uploadFile } from 'api/storyBoardClient';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import SvgCloud from 'components/icon/Cloud';
import SvgImage from 'components/icon/Image';
import Imgix from 'components/imgix';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Queue from 'queue-promise';

import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const queue = new Queue({
  concurrent: 1,
  interval: 1,
});

const PrimaryUpload = ({
  setStoryBoard,
  storyBoardId,
  mangaUrl,
  mangaUrls,
  setUploadImages,
  showText,
  ifUploadImg,
  setIfUploadImg,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setIsModalContent] = useState('');
  const [uplType, setUplType] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const list = mangaUrls.map((url) => ({
      uid: url,
      url:
        url?.slice(-3) === 'pdf' || url?.slice(-3) === 'PDF'
          ? 'https://mangafy.imgix.net/https%3A%2F%2Fmangafy.club%2Fimg%2Fpdf.webp?ixlib=js-v3.1.3&w=64&q=undefined&auto=format&fit=max&s=4c59b00291e2b5fdb5d8781c65cef412'
          : client.UPLOAD_URL + url,
      status: 'done',
    }));
    setFileList(list);
  }, [mangaUrls]);

  useEffect(() => {
    setUploadImages(fileList);
  }, [fileList, setUploadImages]);

  function beforeUpload(file) {
    return new Promise((resolve) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'application/pdf';

      if (!isJpgOrPng) {
        openNotification('error', 'You can only upload JPG, JPEG, PDF or PNG file!');
      }

      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        openNotification('error', 'Image must be smaller than 50MB!');
      }

      if (isLt2M && isJpgOrPng) {
        // eslint-disable-next-line no-undef
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          setIfUploadImg(true);
          uploadFile(
            reader.result,
            (res) => {
              setStoryBoard((sb) => {
                setIfUploadImg(false);
                patchStoryBoard(
                  storyBoardId,
                  {
                    mangaUrls: [...sb.mangaUrls, res?.id],
                  },
                  (response) => {
                    setStoryBoard(response);
                    resolve(response);
                  },
                  (err) => {
                    openNotification('error', err.message);
                  }
                );
                return sb;
              });
            },
            (err) => {
              openNotification('error', err.message);
            }
          );
        });
      }
      return isJpgOrPng && isLt2M;
    });
  }

  const onBeforeGalleryUpload = (file) => {
    queue.enqueue([
      async () => {
        await beforeUpload(file);
      },
    ]);
  };

  const openNotification = (type, mes) => {
    notification[type]({
      message: mes,
      placement: 'bottomLeft',
    });
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    if (uplType === 'pdf' || uplType === 'PDF') {
      setIsModalContent(<PDFViewer url={client.UPLOAD_URL + mangaUrl} />);
      setIsModalVisible(true);
    } else {
      setIsModalContent(<Imgix layout="fill" src={src} alt="MangaFy upload" />);
      setIsModalVisible(true);
    }
  };

  return (
    <div className="primary_upload">
      <Upload
        accept="image/jpg, image/png, application/pdf, image/jpeg "
        listType="picture-card"
        fileList={fileList}
        beforeUpload={onBeforeGalleryUpload}
        onPreview={onPreview}
        disabled={ifUploadImg}
        showUploadList={false}
        multiple={true}>
        <div className={styles.content}>
          <div className={styles.types}>
            <SvgImage width="23px" height="23px" />
            PDF, JPG, JPEG, PNG
          </div>
          <div
            className={cn(
              styles.descriptionDef,
              !showText && fileList.length && styles.description
            )}>
            <span className="desc">
              {ifUploadImg ? (
                <Spin className={styles.spin} size="large" tip="Loading..."></Spin>
              ) : (
                <SvgCloud width="153px" height="111px" />
              )}
            </span>
            <h4 className={showText ? styles.titleDef : styles.title}>
              {!!fileList.length ? 'Upload pages' : 'Upload your pages'}
            </h4>
            {!fileList.length && (
              <div>
                <p className={styles.descriptionText}>Drag and drop an image, or Browse</p>
                <p className={styles.descriptionText}>Max 10MB each</p>
              </div>
            )}
            {!fileList.length && (
              <p className={styles.descriptionText}>
                You store the PDF, JPEG, JPG or PNG files. Only upload media your own the rights to
              </p>
            )}
            {showText && (
              <p className={styles.text}>
                MangaFY can accept PDF Uploader files as big as 100MB, but no bigger. 100MB should
                be enough space to handle even 220-page books that are rich with images. If your PDF
                is larger than 100MB, it probably has far more image information in each digital
                image than is necessary.
              </p>
            )}
          </div>
        </div>
      </Upload>
      <Modal
        className={cn(styles.modal)}
        bodyStyle={{ height: 'calc(100vh - 30px)', overflow: 'auto' }}
        footer={null}
        width={'100%'}
        zIndex={20000}
        onCancel={() => setIsModalVisible(false)}
        closeIcon={<SvgClose />}
        visible={isModalVisible}>
        <div className={styles.modalContent}>{modalContent}</div>
      </Modal>
    </div>
  );
};

PrimaryUpload.propTypes = {
  storyBoardId: PropTypes.string,
  mangaUrl: PropTypes.string,
  setUploadImages: PropTypes.func,
  showText: PropTypes.bool,
  mangaUrls: PropTypes.array,
  setStoryBoard: PropTypes.func.isRequired,
  ifUploadImg: PropTypes.bool,
  setIfUploadImg: PropTypes.func,
};

PrimaryUpload.defaultProps = {
  storyBoardId: '',
  mangaUrl: null,
  setUploadImages: () => {},
  showText: true,
  mangaUrls: [],
  ifUploadImg: false,
  setIfUploadImg: () => {},
};

export default PrimaryUpload;
