import client from 'api/client';
import HeaderNew from 'components/headerNew';
import Reactt, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import ShotHeader from 'components/ShotHeader';
import ShotBody from 'components/ShotBody';
import ShotFooter from 'components/ShotFooter';
import ShotSlider from 'components/ShotSlider';
import { likeShot } from 'components/gallery/utils';
import notification from 'antd/lib/notification';
import ShotSideMenu from 'components/ShotSideMenu';
import cn from 'classnames';
import { followUser, unFollowUser } from 'helpers/shared';
import { Modal } from 'antd';
import { ShareButtons } from 'components/share';

const shotPage = ({ user, allShots, serverSideShot, serverSideAuthor }) => {
  const router = useRouter();

  const [shot, setShot] = useState(serverSideShot);
  const [author, setAuthor] = useState(serverSideAuthor);

  const [isSubscribed, setIsSubscribed] = useState(author?.likedUsers?.includes(user?._id));
  const [isLiked, setIsLiked] = useState(
    !!shot?.likedUsers?.find((obj) => {
      return obj.likedUserId === user?._id;
    })
  );

  useEffect(() => {
    setIsLiked(!!shot?.likedUsers?.find((obj) => obj.likedUserId === user?._id));
  }, [shot]);

  useEffect(() => {
    setIsSubscribed(author?.likedUsers?.includes(user?._id));
  }, [author]);

  useEffect(() => {
    updateShotInfo();
  }, [router.query.shotId]);

  const [areCommentsOpened, setAreCommentsOpened] = useState(false);
  function toggleComments() {
    setAreCommentsOpened(!areCommentsOpened);
  }

  const [isShareModalOpened, setIsShareModalOpened] = useState(false);

  function updateShotInfo() {
    // update shot
    client
      .service('/api/v2/short-stories')
      .get(router.query.shotId)
      .then((res) => {
        console.log('New shot:');
        console.log(res);
        setShot(res);
      })
      .catch((err) => console.log(err));
    // update author
    client
      .service('/api/v2/users')
      .get(author._id)
      .then((res) => {
        console.log(res);
        setAuthor(res);
      })
      .catch((err) => console.log(err));
  }

  function like() {
    likeShot(shot._id, author._id)
      .then((res) => {
        updateShotInfo();
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

  function subscribe() {
    if (!user) {
      notification.error({
        placement: 'bottomLeft',
        message: 'You need to be logged in to follow a user',
      });
    }
    if (!isSubscribed) {
      followUser(shot.authorId)
        .then(() => {
          updateShotInfo();
        })
        .catch((err) => console.log(err));
    } else {
      unFollowUser(shot.authorId)
        .then(() => {
          updateShotInfo();
        })
        .catch((err) => console.log(err));
    }
  }

  const isOwn = user?._id === shot?.authorId;

  return (
    <>
      <HeaderNew user={user} />
      <div className={cn(styles.shotPage, areCommentsOpened && styles.shotPage__shifted)}>
        <Modal
          title="Share with your friends"
          visible={isShareModalOpened}
          onCancel={() => setIsShareModalOpened(false)}
          centered
          footer={null}
          wrapClassName={styles.shotPage__shareModal}>
          <ShareButtons shareUrl={client.API_ENDPOINT + '/shot/' + shot._id} />
        </Modal>
        <ShotSideMenu
          shot={shot}
          areCommentsOpened={areCommentsOpened}
          setAreCommentsOpened={setAreCommentsOpened}
          user={user}
          isLiked={isLiked}
          like={like}
          updateShotInfo={updateShotInfo}
          setIsShareModalOpened={setIsShareModalOpened}
        />
        <ShotHeader
          user={user}
          shot={shot}
          className={styles.shotPage__header}
          allShots={allShots}
          isOwn={isOwn}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
          subscribe={subscribe}
        />
        <ShotBody shot={shot} className={styles.shotPage__body} />
        <ShotFooter
          user={user}
          shot={shot}
          isOwn={isOwn}
          isSubscribed={isSubscribed}
          subscribe={subscribe}
          isLiked={isLiked}
          like={() => like()}
          toggleComments={toggleComments}
          updateShotInfo={updateShotInfo}
        />
        <ShotSlider shot={shot} allShots={allShots} />
      </div>
    </>
  );
};

export default shotPage;
