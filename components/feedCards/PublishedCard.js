import Button from 'components/ui-new/Button';
import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import FeedCardImage from 'components/feedCards/components/FeedCardImage';
import FeedCardText from 'components/feedCards/components/FeedCardText';
import FeedCardLine from './components/FeedCardLine';
import { Modal } from 'antd';
import Close from 'components/icon/new/Close';
import Heart from 'components/icon/new/Heart';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { formatHtml } from 'helpers/shared';
import cn from 'classnames';
import client from 'api/client';
import { notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FeedCardProjectFooter from './components/FeedCardProjectFooter';

const PublishedCard = ({ card, user }) => {
  const image = card.image || card.chapterImg;
  const title = card.title;
  let text = card.story;
  const author = card.authorInfo?.name;
  const avatar = card.authorInfo?.avatar;
  const likes = card.likedUsers?.length || card?.likes || card?.like;
  const comments = card.comments?.total;
  const mangaUrl =
    card.postType === 'Ongoing'
      ? card.button.navigateTo + '?chapter=' + card?.order
      : `/project/${card._id}`;

  const [isLiked, setIsLiked] = useState(card?.likedUsers?.includes(user?.id));
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
      router.push(mangaUrl);
    }
  }

  function like() {
    if (!user) {
      notification.info({
        message: 'Please login to like this post',
      });
      return;
    }
    const data = {
      ownerId: card?.authorInfo?._id,
      chapterId: card?._id,
      likedUserId: user._id,
      participants: [card?.authorInfo],
    };
    if (isLiked) {
      data.like = 'decrement';
    } else {
      data.like = 'increment';
      // setCountLike(countLike + 1);
    }

    const jwt = client.getCookie('feathers-jwt');
    client
      .service('/api/v2/chapter-like')
      .create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
        return err;
      });
  }
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

  return (
    <div className={styles.card} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {image && (
        <FeedCardImage
          image={client.UPLOAD_URL + image}
          isOwned={
            card.postType === 'Ongoing'
              ? card.authorInfo?._id === user?._id
              : card.author === user?._id
          }
          mangaId={card._id}
          mangaUrl={client.API_ENDPOINT + mangaUrl}
        />
      )}
      <div className={styles.card__content}>
        <FeedCardText
          title={title}
          description={text && text.length > 200 ? text?.slice(0, 200) + ' ...' : text}
        />
        <FeedCardLine />
        <FeedCardProjectFooter
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
  );
};

export default PublishedCard;
