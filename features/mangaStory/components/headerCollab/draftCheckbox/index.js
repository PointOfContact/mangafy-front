/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { Modal, notification } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import Close from 'components/icon/new/Close';
import Button from 'components/ui-new/Button';
import PublishChapterCheck from 'components/icon/new/PublishProjectCheck';

const DraftCheckbox = ({ originUrl, isModalVisible, setIsModalVisible }) => {
  function copyHandler() {
    navigator.clipboard.writeText(originUrl).then(
      () => {
        notification.success({
          message: 'Copied to clipboard',
          placement: 'bottomLeft',
        });
      },
      (err) => {
        notification.error({
          message: 'Failed to copy to clipboard',
          placement: 'bottomLeft',
        });
      }
    );
  }

  return (
    <Modal
      className={styles.modal}
      width={850}
      centered
      closeIcon={<Close bold />}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      visible={isModalVisible}
      footer={null}>
      <div className={styles.modal__title}>Congratulations!</div>
      <div className={styles.modal__checkIcon}>
        <PublishChapterCheck />
      </div>
      <div className={styles.modal__content}>
        <div className={styles.modal__text}>
          You've worked hard to bring your story to life, and now it's time to share it with the
          world.
          <br />
          By sharing your graphic novel with others, you can gain your first fans and begin to build
          your audience.
          <br />
          <br />
          Don't be shy - spread the word about your work and see how it resonates with readers.
          <br />
          Good luck!
        </div>
        <div className={styles.modal__inputTitle}>My Graphic Novel</div>
        <div className={styles.modal__linkContainer}>
          <div className={styles.modal__link}>{originUrl}</div>
          <Button className={styles.modal__copyButton} rounded pink bold onClick={copyHandler}>
            Copy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

DraftCheckbox.propTypes = {
  originUrl: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default DraftCheckbox;
