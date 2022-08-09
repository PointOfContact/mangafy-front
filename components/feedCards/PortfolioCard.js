import client from 'api/client';
import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import FeedCardImages from './components/FeedCardImages';
import FeedCardPortfolioFooter from './components/FeedCardPortfolioFooter';
import styles from './styles.module.scss';
import { Modal } from 'antd';
import Close from 'components/icon/new/Close';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Button from 'components/ui-new/Button';
import FeedCardLine from './components/FeedCardLine';

const PortfolioWorkCard = ({ card }) => {
  const images = card.images;
  const text = card.text;
  const author = card.author;
  const avatar = '';
  const followers = card.likes;

  const [modal, setModal] = useState(false);

  const debouncedMouseEventHandler = useCallback(
    AwesomeDebouncePromise(mouseEventHandler, 200),
    []
  );

  function handleDoubleClick() {
    debouncedMouseEventHandler('doubleClick');
  }

  function handleClick() {
    debouncedMouseEventHandler('click');
  }

  function mouseEventHandler(type) {
    if (type === 'doubleClick') {
      // Like function here
    } else {
      setModal(!modal);
    }
  }

  return (
    <>
      {modal && (
        <Modal
          visible={modal}
          onCancel={() => setModal(false)}
          style={{ top: 50 }}
          wrapClassName={styles.modal}
          closeIcon={<Close className={styles.modal__close} />}
          footer={null}>
          <div className={styles.modal__title}>{author}</div>
          <div className={styles.modal__content}>
            <img src={images[0]} alt="shot image" />
            <img src={images[1]} alt="shot image" />
            <img src={images[2]} alt="shot image" />
          </div>
          <FeedCardLine />
          <div className={styles.modal__footer}>
            <div className={styles.modal__avatar}>
              <img src={avatar || 'img/feedTemp/avatar.png'} alt="user avatar" />
            </div>
            <div className={styles.modal__author}>{author}</div>
            <div className={styles.modal__followers}>
              {followers} followers
              <Button sm rounded>
                Follow
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {images.length > 2 && <FeedCardImages images={images} />}
        <FeedCardPortfolioFooter author={author} avatar={avatar} followers={followers} />
      </div>
    </>
  );
};

export default PortfolioWorkCard;
