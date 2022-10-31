import React from 'react';
import { Modal } from 'antd';
import styles from './styles.module.scss';

const ShotModal = ({ card, user, isVisible, setModal }) => {
  return (
    <Modal
      visible={isVisible}
      onCancel={() => setModal(false)}
      style={{ top: 80 }}
      wrapClassName={styles.modal__wrap}
      // closeIcon={<Close className={styles.modal__close} />}
      footer={null}
    >
      sfad
    </Modal>
  );
};

export default ShotModal;
