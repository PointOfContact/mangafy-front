import React, { useState } from 'react';

import { Modal, Button } from 'antd';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryLargeButton from 'components/ui-elements/large-button';

import styles from './styles.module.scss';

export const ModalSuccess = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    document.body.classList.add('body_remove_scroll');
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    document.body.classList.remove('body_remove_scroll');
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button className={styles.modalSuccess} onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        mask={false}
        footer={null}
        width="100%"
        className="modal_succses"
        visible={isModalVisible}
        closeIcon={
          <div className="close_succsess_modal">
            <SvgClose height="18px" width="18px" />
          </div>
        }
        onCancel={handleCancel}>
        <div className="content">
          <div className="anima">
            <img src="/img/anima.gif" alt="" />
            <img src="/img/anima.gif" alt="" />
            <img src="/img/anima.gif" alt="" />
            <img src="/img/anima.gif" alt="" />
          </div>
          <img src="/img/succsessModal.png" alt="" />
          <h2 className={styles.title}>THAT&apos;S COOL</h2>
          <p className={styles.desc}>WE DID IT</p>
          <PrimaryButton
            className="dek-btn"
            text="MangaFY Home"
            splitterStyle={{
              fontSize: '15px',
              minWidth: '190px',
            }}
          />
          <PrimaryLargeButton
            className="mobile-btn"
            text="MangaFY Home"
            splitterStyle={{
              fontSize: '20px',
              minWidth: '2730px',
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
