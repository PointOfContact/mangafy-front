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

const ShowImgModal = ({ setIsModalVisible, isModalVisible, img, imageType }) => (
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
    {typeof img === 'string' ? (
      imageType ? (
        <PDFViewer url={img} />
      ) : (
        <Imgix layout="fill" src={img} alt="MangaFy modal" />
      )
    ) : (
      img
    )}
  </Modal>
);

ShowImgModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  img: PropTypes.string,
  imageType: PropTypes.string,
};

ShowImgModal.defaultProps = {
  img: '',
  imageType: '',
};

export default ShowImgModal;
