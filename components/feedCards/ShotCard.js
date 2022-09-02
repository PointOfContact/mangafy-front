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
import { likeShot } from 'components/gallery/utils';
import { notification } from 'antd';
import Link from 'next/link';

const ShotCard = ({ card, user }) => {
  const image = card.image.image || card.image;
  const author = card.authorInfo[0].name;
  const authorId = card.authorInfo[0]._id;
  const avatar = card.authorInfo[0].avatar;
  const likes = card.likedUsers?.length;
  const comments = card.comments.data.length;
  const title = card.title;

  let text = card.description;

  const [modal, setModal] = useState(false);
  const [isLiked, setIsLiked] = useState(
    Array.isArray(card.likedUsers)
      ? card.likedUsers.map((obj) => obj.likedUserId).includes(user?._id)
      : false
  );

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
    likeShot(card._id, card.authorInfo[0]._id)
      .then((res) => {
        if (!isLiked) {
          if (Array.isArray(card.likedUsers)) {
            card.likedUsers.push(res);
          } else {
            card.likedUsers = [res];
          }
          setIsLiked(true);
        } else {
          card.likedUsers = card.likedUsers.filter((like) => like.likedUserId !== user?._id);
          setIsLiked(false);
        }
      })
      .catch((err) => {
        if (err.code === 401)
          notification.error({ message: 'Please log in to like Shots', placement: 'bottomLeft' });
        else if (err.message === 'You can not like yourself')
          notification.error({ message: 'You can not like yourself', placement: 'bottomLeft' });
        else {
          console.log(err);
        }
      });
  }

  useEffect(() => {}, [card.likedUsers]);

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
            {image && <img src={client.UPLOAD_URL + image} alt="shot image" />}
            {text && (
              <div
                className={styles.modal__text}
                dangerouslySetInnerHTML={{ __html: highlightURLs(text) }}></div>
            )}
          </div>
          <FeedCardLine />
          <div className={styles.modal__footer}>
            <Link href={'/profile/' + card.authorId}>
              <a className={styles.modal__authorInfo}>
                <div className={styles.modal__avatar}>
                  <img
                    src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'}
                    alt="user avatar"
                  />
                </div>
                <div className={styles.modal__author}>{author}</div>
              </a>
            </Link>
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
        {image && <FeedCardImage image={client.UPLOAD_URL + image} />}
        <div className={styles.card__content}>
          {text && (
            <FeedCardText
              title={title}
              description={text.length > 200 ? text.slice(0, 200) + ' ...' : text}
            />
          )}
          <FeedCardLine />
          <FeedCardShotFooter
            authorId={authorId}
            author={author}
            avatar={avatar}
            comments={comments}
            likes={likes}
            like={like}
            isLiked={isLiked}
          />
        </div>
      </div>
    </>
  );
};

export default ShotCard;
