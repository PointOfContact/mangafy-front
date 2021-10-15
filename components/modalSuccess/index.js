import React from 'react';

import { Modal } from 'antd';
import SvgClose from 'components/icon/Close';
import Imgix from 'components/imgix';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryLargeButton from 'components/ui-elements/large-button';

import styles from './styles.module.scss';

export const ModalSuccess = ({ isModalVisible, handleCancelModal }) => (
  <div>
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
      onCancel={handleCancelModal}>
      <div className="content">
        <div className="anima">
          <img src="/img/anima.gif" alt="MangaFy anima" />
          <img src="/img/anima.gif" alt="MangaFy anima" />
          <img src="/img/anima.gif" alt="MangaFy anima" />
          <img src="/img/anima.gif" alt="MangaFy anima" />
        </div>
        <Imgix
          width={492}
          height={380}
          layout="fixed"
          src="https://mangafy.club/img/succsessModal.webp"
          alt="MangaFy success"
        />
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
