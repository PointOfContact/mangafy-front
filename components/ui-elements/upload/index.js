import React, { useState } from 'react';

import { Upload, message } from 'antd';
// Api
import client from 'api/client';
import { patchStoryBoard, uploadFile } from 'api/storyBoardClient';
// Components
import SvgCloud from 'components/icon/Cloud';
import SvgImage from 'components/icon/Image';

import styles from './styles.module.scss';

const PrimaryUpload = ({ storyBoardId }) => {
  const [fileList, setFileList] = useState([]);

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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      uploadFile(reader.result, (res) => {
        patchStoryBoard(storyBoardId, {
          mangaUrl: res?.id,
        }, (res) => {}, (err) => {});
      }, (err) => {});
    });
    return isJpgOrPng && isLt2M;
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
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
    </div>
  );
};

export default PrimaryUpload;
