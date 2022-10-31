import React from 'react';
import { Modal } from 'antd';
import styles from './styles.module.scss';
import client from 'api/client';
import { ShareButtons } from 'components/share';

const ShareModal = ({ isShareModalOpened, setIsShareModalOpened, shareUrl }) => {
  return (
    <Modal
      title="Share with your friends"
      visible={isShareModalOpened}
      onCancel={() => setIsShareModalOpened(false)}
      centered
      footer={null}
      wrapClassName={styles.shareModal}
    >
      <ShareButtons shareUrl={shareUrl} />
    </Modal>
  );
};

export default ShareModal;
