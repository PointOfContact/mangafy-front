/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { Modal, notification } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import Close from 'components/icon/new/Close';
import Button from 'components/ui-new/Button';

const DraftCheckbox = ({ originUrl, isModalVisible, setIsModalVisible }) => (
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
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M183.334 100C183.334 53.9766 146.024 16.667 100 16.667C53.9766 16.667 16.667 53.9766 16.667 100C16.667 146.024 53.9766 183.334 100 183.334C146.024 183.334 183.334 146.024 183.334 100Z"
          stroke="#7B65F3"
          stroke-width="10"
        />
        <path
          d="M62.5 95.833L90.8727 128.259C91.2852 128.73 92.0246 128.711 92.4116 128.218L137.5 70.833"
          stroke="#7B65F3"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div className={styles.modal__content}>
      <div className={styles.modal__text}>
        You've worked hard to bring your story to life, and now it's time to share it with the
        world. By sharing your graphic novel with others, you can gain your first fans and begin to
        build your audience.
        <br />
        <br />
        Don't be shy - spread the word about your work and see how it resonates with readers.
        <br />
        Good luck!
      </div>
      <div className={styles.modal__inputTitle}>My Graphic Novel</div>
      <div className={styles.modal__linkContainer}>
        <div className={styles.modal__link}>{originUrl}</div>
        <Button
          className={styles.modal__copyButton}
          rounded
          pink
          bold
          onClick={() => {
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
          }}>
          Copy
        </Button>
      </div>
    </div>
  </Modal>
);

DraftCheckbox.propTypes = {
  originUrl: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default DraftCheckbox;
