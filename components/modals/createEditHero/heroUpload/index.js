import React, { useEffect, useState } from 'react';

import { Upload, message, notification, Modal } from 'antd';
import client from 'api/client';
// Api
import { uploadFile } from 'api/storyBoardClient';
// Components
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import SvgCloud from 'components/icon/Cloud';
import SvgImage from 'components/icon/Image';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const HeroUpload = ({ mangaUrl, setImgId, titleLoad, typeCard }) => {
  const [img, setImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
      openNotification('error', 'You can only upload PDF, JPG, JPEG, PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error();
      openNotification('error', 'Image must smaller than 10MB!');
    }

    if (isJpgOrPng && isLt2M) {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        uploadFile(
          reader.result,
          (res) => {
            setImgId(res?.id);
          },
          (err) => {
            openNotification('error', err.message);
          }
        );
      });
    }
    return isJpgOrPng && isLt2M;
  }

  const openNotification = (type, mes) => {
    notification[type]({
      message: mes,
    });
  };

  const onPreview = async (file) => {
    setShowModal(true);
    setImg(file.thumbUrl);
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };

  const ifPersonage = typeCard === 'personage';

  return (
    <div className={cn('primary_upload hero_upload', styles.primary_upload)}>
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
                <SvgCloud width="106px" height="77.13px" />
              </span>
              <h4 className={cn(styles.title, styles.titlePersonage)}>
                {ifPersonage
                  ? 'Upload your character profile pic'
                  : `Upload ${titleLoad ? 'new' : ''} files`}
              </h4>
            </div>
          </div>
        )}
      </Upload>
      <Modal
        className={styles.modal}
        bodyStyle={{ height: 'calc(100vh - 30px)', overflow: 'auto' }}
        footer={null}
        width={'100%'}
        zIndex={200000000}
        onCancel={() => setShowModal(false)}
        closeIcon={
          <span className={styles.closeIcon}>
            <SvgClose />
          </span>
        }
        visible={showModal}>
        <Imgix layout="fill" src={img} alt="MangaFy modal" />
      </Modal>
    </div>
  );
};

HeroUpload.propTypes = {
  storyBoardId: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
  mangaUrl: PropTypes.string,
  setImgId: PropTypes.string.isRequired,
  titleLoad: PropTypes.bool,
  typeCard: PropTypes.string,
};

HeroUpload.defaultProps = {
  storyBoardId: '',
  onUploadSuccess: () => {},
  mangaUrl: null,
  setImgId: () => {},
  titleLoad: false,
  typeCard: '',
};

export default HeroUpload;
