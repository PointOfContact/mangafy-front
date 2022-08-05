import Button from 'components/ui-new/Button';
import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import FeedCardImage from 'components/feedCards/components/FeedCardImage';
import FeedCardText from 'components/feedCards/components/FeedCardText';
import FeedCardShotFooter from './components/FeedCardShotFooter';
import FeedCardLine from './components/FeedCardLine';
import { Modal } from 'antd';
import Close from 'components/icon/new/Close';
import Heart from 'components/icon/new/Heart';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const PublishedCard = ({ card }) => {
  // const image = card.imageUrl;
  // const title = '-';
  // const text = card.subTitle;
  // const author = card.title;
  // const avatar = card.logoUrl;
  // const { likesCount, commentsCount } = card;
  const image = card.image;
  const title = card.title;
  const text = card.text;
  const author = card.author;
  const avatar = '';
  const likes = card.likes;
  const comments = card.comments;

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
          <div className={styles.modal__title}>{title}</div>
          <div className={styles.modal__content}>
            <img src={image} alt="shot image" />
            {text && <div className={styles.modal__text}>{text}</div>}
          </div>
          <FeedCardLine />
          <div className={styles.modal__footer}>
            <div className={styles.modal__avatar}>
              <img src={avatar || 'img/feedTemp/avatar.png'} alt="user avatar" />
            </div>
            <div className={styles.modal__author}>{author}</div>
            <div className={styles.modal__likes}>
              {likes}
              <Heart />
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {image && <FeedCardImage image={image} />}
        <div className={styles.card__content}>
          <FeedCardText title={title} description={text} />
          <FeedCardLine />
          <FeedCardShotFooter author={author} comments={comments} likes={likes} />
        </div>
      </div>
    </>
  );
};

export default PublishedCard;
