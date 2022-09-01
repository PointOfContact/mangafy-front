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
import Link from 'next/link';
import { useRouter } from 'next/router';

const PortfolioWorkCard = ({ card, user }) => {
  const images = card.gallery;
  const author = card.name;
  const avatar = card.avatar;
  const followers = card.likedUsers?.length;
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [isFollowed, setIsFollowed] = useState();

  useEffect(() => {
    const likedUser = card.likedUsers?.includes(user?._id);
    setIsFollowed(likedUser);
  }, []);

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
      router.push(`/profile/${card._id}`);
    }
  }

  return (
    <>
      {/* {modal && (
        <Modal
          visible={modal}
          onCancel={() => setModal(false)}
          style={{ top: 50 }}
          wrapClassName={styles.modal}
          closeIcon={<Close className={styles.modal__close} />}
          footer={null}>
          <div className={styles.modal__title}>{author}</div>
          <div className={styles.modal__content}>
            <img src={client.UPLOAD_URL + images[0]} alt="shot image" />
            <img src={client.UPLOAD_URL + images[1]} alt="shot image" />
            <img src={client.UPLOAD_URL + images[2]} alt="shot image" />
          </div>
          <FeedCardLine />
          <div className={styles.modal__footer}>
            <Link href={'/profile/' + card._id}>
              <a className={styles.modal__author}>
                <div className={styles.modal__avatar}>
                  <img
                    src={avatar ? client.UPLOAD_URL + avatar : 'img/feedTemp/avatar.png'}
                    alt="user avatar"
                  />
                </div>
                {author}
              </a>
            </Link>
            <div className={styles.modal__followers}>
              {followers} followers
              <Button
                sm
                rounded
                outline={isFollowed}
                onClick={(e) => {
                  e.stopPropagation();
                  like();
                }}>
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          </div>
        </Modal>
      )} */}
      <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {images.length > 2 && <FeedCardImages images={images} />}
        <FeedCardPortfolioFooter
          authorId={card._id}
          author={author}
          avatar={avatar}
          followers={followers}
          isFollowed={isFollowed}
          like={() => like()}
        />
      </div>
    </>
  );
};

export default PortfolioWorkCard;
