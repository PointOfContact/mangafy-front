import React from 'react';

import { Modal } from 'antd';
import SvgClose from 'components/icon/Close';
import { ShareButtons } from 'components/share';
import CopyInput from 'components/ui-elements/copyInput';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DraftCheckbox = ({ originUrl, isModalVisible, setIsModalVisible }) => (
  <Modal
    className={styles.modal}
    closeIcon={
      <span
        className={styles.closeIcon}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalVisible(false);
        }}
      >
        <SvgClose />
      </span>
    }
    onCancel={() => {
      setIsModalVisible(false);
    }}
    visible={isModalVisible}
    footer={null}
  >
    <div className={styles.publishedModal}>
      <img width={113} height={113} src={'/img/ballons.webp'} alt={'mangafy ballons'} />
      <h2 className={styles.modalTitle}>Your project is live!</h2>
      <h3>Share it whenever your followers are. Posts are the best way to make new supporters.</h3>
      <h4>Tell your followers everywhere 🎉</h4>
      <div className={styles.shareButtons}>
        <ShareButtons shareUrl={originUrl} text="Share to the world!" />
      </div>
      <CopyInput white={true} copyUrl={originUrl} copyLink={() => copy(originUrl)} />
    </div>
  </Modal>
);

DraftCheckbox.propTypes = {
  originUrl: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default DraftCheckbox;
