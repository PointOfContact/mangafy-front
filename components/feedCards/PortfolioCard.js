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
import { followUser, unFollowUser } from 'helpers/shared';
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

  function like(params) {
    if (!user) {
      notification.error({
        placement: 'bottomLeft',
        message: 'You need to be logged in to follow a user',
      });
    }
    if (!isFollowed) {
      followUser(card._id)
        .then(() => {
          setIsFollowed(true);
        })
        .catch((err) => console.log(err));
    } else {
      unFollowUser(card._id)
        .then(() => {
          setIsFollowed(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {images.length > 0 && <FeedCardImages images={images} />}
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
