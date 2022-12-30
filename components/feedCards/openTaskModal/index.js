import React from 'react';
import cn from 'classnames';
import client from 'api/client';
import Close from 'components/icon/new/Close';
import { Modal } from 'antd';
import Button from 'components/ui-new/Button';
import Heart from 'components/icon/new/Heart';
import Clock from 'components/icon/new/Clock';
import Dollar from 'components/icon/new/Dollar';
import Link from 'next/link';
import Imgix from 'components/imgix';
import styles from './styles.module.scss';
import FeedCardLine from '../components/FeedCardLine';
import PropTypes from 'prop-types';

const OpenTaskModal = ({
  modal,
  setModal,
  time,
  title,
  card,
  text,
  avatar,
  author,
  budget,
  setShowModal,
}) => {
  return (
    <Modal
      visible={modal}
      onCancel={() => setModal(false)}
      style={{ top: 50 }}
      wrapClassName={styles.modal}
      closeIcon={<Close className={styles.modal__close} />}
      footer={null}>
      <div className={styles.modal__title}>
        <div className={styles.modal__time}>
          <Clock color="#C3BAFA" />
          {`${time}`}
        </div>
        {title}
      </div>
      <div className={styles.modal__content}>
        {text && <div className={styles.modal__text}>{text}</div>}
      </div>
      <FeedCardLine />
      <div className={styles.modal__footer}>
        <Link href={'/profile/' + card.authorInfo?._id}>
          <a className={styles.modal__authorInfo}>
            <div className={styles.modal__avatar}>
              <Imgix
                layout="fill"
                src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'}
                alt="user avatar"
              />
            </div>
            <div className={styles.modal__author}>{author}</div>
          </a>
        </Link>
        <div className={styles.modal__budgetAndApply}>
          <div className={styles.modal__budget}>
            {budget + ' USD'}
            <Dollar color={'#C3BAFA'} />
          </div>
          <Button
            sm={1}
            iconRight={1}
            rounded={1}
            icon={<Heart color="#fff" />}
            onClick={() => {
              setModal(false);
              setShowModal(true);
            }}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

OpenTaskModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  author: PropTypes.any.isRequired,
  budget: PropTypes.number.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

OpenTaskModal.defaultPrpos = {
  avatar: '',
};

export default OpenTaskModal;
