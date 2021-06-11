import React, { useEffect, useState } from 'react';

import { Upload, message, notification } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import client from 'api/client';
// Api
import { patchStoryBoard, uploadFile } from 'api/storyBoardClient';
// Components
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import SvgCloud from 'components/icon/Cloud';
import SvgImage from 'components/icon/Image';
import Imgix from 'components/imgix';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const PrimaryUpload = ({ storyBoardId, onUploadSuccess, mangaUrl }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setIsModalContent] = useState('');
  const [img, setImg] = useState(null);
  const [uplType, setUplType] = useState(null);

  useEffect(() => {
    setUplType(mangaUrl?.slice(-3));
    const newImg = mangaUrl?.slice(-3)
      ? [
          {
            uid: '-1',
            url:
              mangaUrl?.slice(-3) === 'pdf' || mangaUrl?.slice(-3) === 'PDF'
                ? 'https://icons.iconarchive.com/icons/graphicloads/filetype/256/pdf-icon.png'
                : client.UPLOAD_URL + mangaUrl,
            status: 'done',
          },
        ]
      : [];
    setImg(newImg);
    setFileList(newImg);
  }, [mangaUrl]);

  const [fileList, setFileList] = useState(img || []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'application/pdf' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload PDF, JPG, JPEG, PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      message.error('Image must smaller than 100MB!');
    }
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      uploadFile(
        reader.result,
        (res) => {
          patchStoryBoard(
            storyBoardId,
            {
              mangaUrl: res?.id,
            },
            (response) => {
              onUploadSuccess(response);
            },
            (err) => {
              openNotification('error', err.message);
            }
          );
        },
        (err) => {
          openNotification('error', err.message);
        }
      );
    });
    return isJpgOrPng && isLt2M;
  }

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
      setIsModalContent(<Imgix layout="fill" src={src} alt="" />);
      setIsModalVisible(true);
    }
  };
  return (
    <div className="primary_upload">
      <Upload
        accept="image/jpg, image/png, application/pdf, image/jpeg "
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={beforeUpload}
        onPreview={onPreview}>
        {fileList.length < 1 && (
          <div className={styles.content}>
            <div className={styles.types}>
              <SvgImage width="23px" height="23px" />
              PDF, JPG, JPEG, PNG
            </div>
            <div className={styles.description}>
              <span className="desc">
                <SvgCloud width="153px" height="111px" />
              </span>
              <h4 className={styles.title}>Upload files</h4>
              <p className={styles.text}>
                MangaFY can accept PDF Uploader files as big as 100MB, but no bigger. 100MB should
                be enough space to handle even 220-page books that are rich with images. If your PDF
                is larger than 100MB, it probably has far more image information in each digital
                image than is necessary.
              </p>
            </div>
          </div>
        )}
      </Upload>
      <Modal
        className={cn(styles.modal)}
        bodyStyle={{ height: 'calc(100vh - 30px)', overflow: 'auto' }}
        footer={null}
        width={'100%'}
        zIndex={200000000}
        onCancel={() => setIsModalVisible(false)}
        closeIcon={<SvgClose />}
        visible={isModalVisible}>
        <div className={styles.modalContent}>{modalContent}</div>
      </Modal>
    </div>
  );
};

PrimaryUpload.propTypes = {
  storyBoardId: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
  mangaUrl: PropTypes.string,
};

PrimaryUpload.defaultProps = {
  onUploadSuccess: () => {},
  mangaUrl: null,
};

export default PrimaryUpload;
