/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const ChangeAvatar = dynamic(() => import('react-avatar-edit'), {
  ssr: false,
});

const ChangeYourAvatar = ({
  isModalVisible,
  setIsModalVisible,
  disabledButton,
  setDisabledButton,
  props,
}) => {
  const { beforeUploadBase64, setUserData, userData, setLoadingImg } = props;

  const [sizeImg, setSizeImg] = useState('');
  const [currentImg, setCurrentImg] = useState('');

  const onCrop = (currentPhoto) => {
    setDisabledButton(false);
    setCurrentImg(currentPhoto);
  };

  const onBeforeFileLoad = (elem) => {
    setSizeImg(elem.target.files[0].size);
  };

  const updater = (res) => {
    setUserData(res);
    setUserData({
      ...userData,
      avatar: res.avatar,
    });
  };

  const saveButton = () => {
    setIsModalVisible(false);
    const getLastIndexOfType = currentImg.indexOf(';');
    const type = currentImg.slice(5, getLastIndexOfType);
    const file = {
      type,
      size: sizeImg,
      base64: currentImg,
    };
    setLoadingImg(true);
    beforeUploadBase64(file, props, updater, () => {
      setLoadingImg(false);
    });
  };

  const cancelButton = () => {
    setIsModalVisible(false);
  };

  return (
    isModalVisible && (
      <Modal
        className={disabledButton ? styles.changePhotoDef : styles.changePhoto}
        title="Update profile photo"
        visible={isModalVisible}
        closeIcon={
          <span className={styles.close} onClick={() => setIsModalVisible(false)}>
            <SvgClose height="14px" width="14px" />
          </span>
        }
        footer={[
          <div key={1} className={styles.buttonModal}>
            <PrimaryButton onClick={cancelButton} isWhite={true} text={'Cancel'} />
            <PrimaryButton onClick={!disabledButton && saveButton} text={'Save'} />
          </div>,
        ]}>
        <ChangeAvatar
          imageWidth={250}
          imageHeight={250}
          onCrop={onCrop}
          onBeforeFileLoad={onBeforeFileLoad}
        />
      </Modal>
    )
  );
};

ChangeYourAvatar.propTypes = {
  beforeUploadBase64: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  setDisabledButton: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setLoadingImg: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  props: PropTypes.object.isRequired,
};

export default ChangeYourAvatar;
