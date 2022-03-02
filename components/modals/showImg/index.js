/* eslint-disable no-nested-ternary */
import React from 'react';

import { Modal } from 'antd';
import SvgClose from 'components/icon/Close';
import Imgix from 'components/imgix';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const ShowImgModal = ({ setIsModalVisible, isModalVisible, img, imageType }) => {
  const imgTypeVideo = img?.slice(-3) === 'mp4';

  return (
    <Modal
      className={styles.modal}
      footer={null}
      zIndex={200000000}
      onCancel={() => setIsModalVisible(false)}
      closeIcon={
        <span className={styles.closeIcon}>
          <SvgClose />
        </span>
      }
      visible={isModalVisible}>
      {imgTypeVideo ? (
        <video
          controls="true"
          autoPlay
          muted
          loop
          playsInline
          poster="https://mangafy.club/api/v2/uploads/1645708912743-980848197-istockphoto-1017890344-170667a.jpg">
          <source src={img} type="video/mp4" />
        </video>
      ) : imageType ? (
        <PDFViewer url={img} />
      ) : (
        <Imgix layout="fill" src={img} alt="MangaFy modal" />
      )}
    </Modal>
  );
};

ShowImgModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  img: PropTypes.string,
  imageType: PropTypes.bool,
};

ShowImgModal.defaultProps = {
  img: '',
  imageType: false,
};

export default ShowImgModal;
