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
import { highlightURLs } from 'helpers/shared';
import cn from 'classnames';
import client from 'api/client';
import { notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PublishedCard = ({ card }) => {
  const image = card.image;
  const title = card.title;
  let text = card.story;
  const author = card.authorInfo.name;
  const avatar = card.authorInfo.avatar;
  const likes = card.likedUsers.length;
  const comments = card.comments.total;

  const [modal, setModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

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
      router.push(card.button.navigateTo);
    }
  }

  function like() {
    // if (!isLiked) {
    //   likeProject(card._id, card.authorInfo.authorId)
    //     .then((res) => {
    //       console.log('Liked: ');
    //       console.log(res);
    //       if (Array.isArray(card.likedUsers)) {
    //         card.likedUsers.push(res);
    //       } else {
    //         card.likedUsers = [res];
    //       }
    //       setIsLiked(true);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   const likeId = card.likedUsers.filter((like) => like.likedUserId === user._id)[0]._id;
    //   unlikeShot(likeId)
    //     .then((res) => {
    //       console.log('Unliked: ' + res);
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   card.likedUsers = card.likedUsers.filter((like) => like.likedUserId !== user._id);
    //   setIsLiked(false);
    // }
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
            {image && <img src={client.UPLOAD_URL + image} alt="shot image" />}
            {text && (
              <div
                className={styles.modal__text}
                dangerouslySetInnerHTML={{ __html: highlightURLs(text) }}></div>
            )}
          </div>
          <FeedCardLine />
          <div className={styles.modal__footer}>
            <Link href={'/profile/' + card.author}>
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
            authorId={card.author}
            avatar={avatar}
            author={author}
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

export default PublishedCard;
