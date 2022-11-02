import React from 'react';
import styles from './styles.module.scss';

import { Modal } from 'antd';
import Button from 'components/ui-new/Button';

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  question,
  description,
  okText = 'Ok',
  onOk,
  cancelText = 'Cancel',
  onCancel,
}) => {
  function handleOk() {
    setIsOpen(false);
    onOk();
  }

  function handleCancel() {
    setIsOpen(false);
    onCancel();
  }

  const footerElement = (
    <div className={styles.footer}>
      <Button rounded outline pink onClick={handleCancel}>
        {cancelText}
      </Button>
      <Button rounded pink onClick={handleOk}>
        {okText}
      </Button>
    </div>
  );

  return (
    <Modal
      wrapClassName={styles.modal}
      title={null}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footerElement}>
      <div className={styles.body__title}>{question}</div>
      {!!description && <div className={styles.body__description}>{description}</div>}
    </Modal>
  );
};

export default ConfirmModal;
