import React, { useEffect, useState } from 'react';

import { Upload, message, notification } from 'antd';
import client from 'api/client';
// Api
// Components
import cn from 'classnames';
import SvgCloud from 'components/icon/Cloud';
import SvgImage from 'components/icon/Image';
import ShowImgModal from 'components/modals/showImg';
import PropTypes from 'prop-types';
import beforeUploadFromAMZ from 'utils/upload';

import styles from './styles.module.scss';

const HeroUpload = ({
  text,
  mangaUrl,
  setImgId,
  titleLoad,
  typeCard,
  onChangeHero,
  disabled,
  className,
  uploadVideo,
}) => {
  const [img, setImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState(img || []);
  const typePdf = mangaUrl?.slice(-3);
  const ifPdf = typePdf === 'pdf' || typePdf === 'PDF';
  const ifUploadVideo = uploadVideo
    ? 'You can only upload PDF, JPG, JPEG, PNG, MP4 file!'
    : 'You can only upload PDF, JPG, JPEG, PNG file!';

  useEffect(() => {
    const newImg = typePdf
      ? [
          {
            uid: '-1',
            url: ifPdf
              ? 'https://icons.iconarchive.com/icons/graphicloads/filetype/256/pdf-icon.png'
              : client.UPLOAD_URL + mangaUrl,
            status: 'done',
          },
        ]
      : [];
    setImg(newImg);
    setFileList(newImg);
  }, [mangaUrl]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const setUploadCallback = (fileName) => {
    setImgId(fileName);
    onChangeHero({}, fileName);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'application/pdf' ||
      file.type === 'image/jpg' ||
      file.type === 'video/mp4';
    if (!isJpgOrPng) {
      openNotification('error', ifUploadVideo);
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error();
      openNotification('error', 'Image must smaller than 10MB!');
    }

    if (isJpgOrPng && isLt2M) beforeUploadFromAMZ(file, setUploadCallback);

    return isJpgOrPng && isLt2M;
  };

  const openNotification = (type, mes) => {
    notification[type]({
      message: mes,
    });
  };

  const onPreview = async (file) => {
    setShowModal(true);
    setImg(file?.url);
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
        disabled={disabled}
        accept="image/jpg, image/png, application/pdf, image/jpeg, video/mp4"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={beforeUpload}
        onRemove={() => {
          setImgId('');
        }}
        onPreview={onPreview}>
        {fileList.length < 1 && (
          <div className={cn(styles.content, className)}>
            <div className={styles.types}>
              <SvgImage width="23px" height="23px" />
              PDF, JPG, JPEG, PNG, {uploadVideo && 'MP4'}
            </div>
            <div className={styles.description}>
              <span className="desc">
                <SvgCloud width="106px" height="77.13px" />
              </span>
              <h4 className={cn(styles.title, styles.titlePersonage)}>
                {text ||
                  (ifPersonage
                    ? 'Upload your character profile pic'
                    : `Upload ${titleLoad ? 'new' : ''} files`)}
              </h4>
            </div>
          </div>
        )}
      </Upload>
      <ShowImgModal
        setIsModalVisible={setShowModal}
        isModalVisible={showModal}
        img={client.UPLOAD_URL + mangaUrl}
        imageType={ifPdf}
      />
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
  onChangeHero: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  ifPdf: PropTypes.bool.isRequired,
  uploadVideo: PropTypes.bool,
};

HeroUpload.defaultProps = {
  storyBoardId: '',
  onUploadSuccess: () => {},
  mangaUrl: null,
  setImgId: () => {},
  titleLoad: false,
  typeCard: '',
  onChangeHero: () => {},
  disabled: false,
  text: '',
  className: '',
  uploadVideo: false,
};

export default HeroUpload;
