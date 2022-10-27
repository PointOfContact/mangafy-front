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
import { buildShotURL, formatHtml } from 'helpers/shared';
import cn from 'classnames';
import { likeShot } from 'components/gallery/utils';
import { notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import { debounce } from 'throttle-debounce';

const ShotCard = ({ card, user, editShot, deleteShot, setShowSignInModal }) => {
  const image = card.image?.image || card.image;
  const author = card.authorInfo?.name;
  const authorId = card.authorInfo?._id;
  const avatar = card.authorInfo?.avatar;
  const comments = card.comments?.data?.length;
  const title = card.title;
  const router = useRouter();

  let text = card.description;

  const [modal, setModal] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState({ isLoading: false, error: false });
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
      if (card?.image?._id) {
        router.push(buildShotURL(card.image._id, card._id));
      } else {
        router.push(`/shot/${card._id}`);
      }
    }
  }

  function amplitude(event_type, shotId) {
    const eventData = [
      {
        event_type,
        event_properties: { shotId, shotTitle: title, from: 'Feed page' },
      },
    ];
    myAmplitude(eventData);
  }

  useEffect(() => {
    if (!loading.isLoading && !loading.error) {
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      } else {
        setLikes(likes + 1);
        setIsLiked(true);
      }
    }
  }, [loading]);

  function likeFeedShot() {
    if (!user) {
      setShowSignInModal(true);
      return;
    }
    setLoading({ isLoading: true, error: false });
    likeShot(card._id, card.authorInfo._id)
      .then((res) => {
        setLoading({ isLoading: false, error: false });
        if (isLiked) {
          amplitude(EVENTS.DELETE_LIKE_SHOT, res.portfolioId);
        } else {
          amplitude(EVENTS.LIKE_SHOT, res.portfolioId);
        }
      })
      .catch((err) => {
        setLoading({ isLoading: false, error: true });
        if (err.code === 401)
          notification.error({ message: 'Please log in to like shots', placement: 'bottomLeft' });
        else if (err.message === 'You can not like yourself')
          notification.error({ message: 'You can not like yourself', placement: 'bottomLeft' });
        else {
          console.log(err);
        }
      });
  }

  const like = debounce(500, likeFeedShot);

  useEffect(() => {
    const isLiked = Array.isArray(card.likedUsers)
      ? card.likedUsers.map((obj) => obj.likedUserId).includes(user?._id)
      : false;
    setIsLiked(isLiked);
    setLikes(card.likedUsers?.length);
  }, []);

  return (
    <>
      <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {image && (
          <FeedCardImage
            image={client.UPLOAD_URL + image}
            isOwned={authorId === user?._id}
            shareUrl={client.API_ENDPOINT + '/shot/' + card._id}
            onEdit={() => editShot(card)}
            onDelete={() => deleteShot(card._id)}
          />
        )}
        <div className={styles.card__content}>
          {(title || text) && (
            <FeedCardText
              title={title}
              description={text.length > 200 ? text?.slice(0, 200) + ' ...' : text}
              isOwned={authorId === user?._id}
              shareUrl={'/shot/' + card._id}
              textOnly={!image}
            />
          )}
          {(title || text) && <FeedCardLine />}
          <FeedCardShotFooter
            card={card}
            authorId={authorId}
            author={author}
            avatar={avatar}
            comments={comments}
            likes={likes}
            like={like}
            loading={loading.isLoading}
            isLiked={isLiked}
          />
        </div>
      </div>
    </>
  );
};

export default ShotCard;
