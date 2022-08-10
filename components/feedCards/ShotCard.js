import client from 'api/client';
import Comment from 'components/icon/new/Comment';
import Star from 'components/icon/new/Star';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import FeedCardImage from './components/FeedCardImage';
import FeedCardText from './components/FeedCardText';
import FeedCardLine from './components/FeedCardLine';
import FeedCardShotFooter from './components/FeedCardShotFooter';
import styles from './styles.module.scss';
import Heart from 'components/icon/new/Heart';
import Close from 'components/icon/new/Close';
import { Modal } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { highlightURLs } from 'helpers/shared';
import cn from 'classnames';

const ShotCard = ({ card }) => {
  // const image = card.imageUrl;
  // const text = card.subTitle;
  // const author = card.title;
  // const avatar = card.logoUrl;
  // const likes = card.likesCount;
  // const comments = card.commentsCount;
  const title = card.title;
  const image = card.image;
  const text = card.text;
  const author = card.author;
  const avatar = '';
  const likes = card.likes;
  const comments = card.comments;

  const [modal, setModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
      like();
    } else {
      setModal(!modal);
    }
  }

  function like() {
    setIsLiked((oldIsLiked) => !oldIsLiked);
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
            {text && (
              <div
                className={styles.modal__text}
                dangerouslySetInnerHTML={{ __html: highlightURLs(text) }}></div>
            )}
          </div>
          <FeedCardLine />
          <div className={styles.modal__footer}>
            <div className={styles.modal__avatar}>
              <img src={avatar || 'img/feedTemp/avatar.png'} alt="user avatar" />
            </div>
            <div className={styles.modal__author}>{author}</div>
            <div
              className={cn(styles.modal__likes, isLiked && styles.modal__likes_liked)}
              onClick={like}>
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
          <FeedCardShotFooter
            author={author}
            comments={comments}
            likes={likes}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />
        </div>
      </div>
    </>
  );
};

export default ShotCard;
