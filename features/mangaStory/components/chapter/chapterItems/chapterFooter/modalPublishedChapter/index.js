import React, { useState } from 'react';

import client from 'api/client';
import { Modal, Tooltip } from 'antd';
import SvgClose from 'components/icon/Close';
import SvgCopy from 'components/icon/Copy';
import { ShareButtons } from 'components/share';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ModalPublishedChapter = ({
  index,
  isModalVisible,
  setOpenPublishedModal,
  setIsModalVisible,
  baseData,
  storyBoard,
}) => {
  const [copyText, setCopyText] = useState('Copy to clipboard');

  const link = client.API_ENDPOINT + `/manga-view/${storyBoard._id}`;

  return (
    <Modal
      className={styles.modalPublishChapter}
      visible={isModalVisible}
      closeIcon={
        <span
          onClick={() => {
            setOpenPublishedModal(false);
            setIsModalVisible(false);
          }}
          className={styles.close}>
          <SvgClose />
        </span>
      }
      footer={null}>
      <div className={styles.container}>
        <h2>Chapter {index + 1} published!</h2>
        <p>Get a peek and share with your friends and fans.</p>
        <div className={styles.copyView}>
          <div className={styles.viewUrl}>{link}</div>
          <Tooltip placement="topLeft" title={copyText}>
            <div
              className={styles.copy}
              onClick={() => {
                setCopyText('Copied');
                copy(link);
              }}
              onMouseOut={() => setCopyText('Copy to clipboard')}>
              <SvgCopy width="18px" height="18px" alt="mangaFy copy icon" />
            </div>
          </Tooltip>
        </div>
        <div className={styles.shareUrlContainer}>
          <ShareButtons shareUrl={link} />
          <p
            onClick={() => {
              window.open(link, '_self');
              setIsModalVisible(false);
              setOpenPublishedModal(false);
            }}>
            Link settings
          </p>
        </div>
      </div>
    </Modal>
  );
};

ModalPublishedChapter.propTypes = {
  index: PropTypes.number.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setOpenPublishedModal: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
};

export default ModalPublishedChapter;
