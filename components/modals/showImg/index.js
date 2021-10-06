import React from 'react';

import { Modal } from 'antd';
import SvgClose from 'components/icon/Close';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ShowImgModal = ({ setIsModalVisible, isModalVisible, img }) => (
  <Modal
    className={styles.modal}
    bodyStyle={{ height: 'calc(100vh - 30px)', overflow: 'auto' }}
    footer={null}
    width={'100%'}
    zIndex={200000000}
    onCancel={() => setIsModalVisible(false)}
    closeIcon={
      <span className={styles.closeIcon}>
        <SvgClose />
      </span>
    }
    visible={isModalVisible}>
    {typeof img === 'string' ? <Imgix layout="fill" src={img} alt="MangaFy modal" /> : img}
  </Modal>
);

ShowImgModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  img: PropTypes.string,
};

ShowImgModal.defaultProps = {
  img: '',
};

export default ShowImgModal;
