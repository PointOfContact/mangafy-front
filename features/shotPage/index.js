import client from 'api/client';
import HeaderNew from 'components/headerNew';
import Reactt, { useState } from 'react';
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

const shotPage = ({ user, shot, allShots, comments, author }) => {
  const router = useRouter();
  const isOwn = user?._id === shot?.authorId;
  const [isSubscribed, setIsSubscribed] = useState(author?.likedUsers?.includes(user?._id));
  const [isLiked, setIsLiked] = useState(
    shot?.likedUsers?.find((obj) => {
      return obj.likedUserId === user?._id;
    })
  );
  const [areCommentsOpened, setAreCommentsOpened] = useState(false);

  function toggleComments() {
    setAreCommentsOpened(!areCommentsOpened);
  }

  function like() {
    likeShot(shot._id, author._id)
      .then((res) => {
        res.likedUserId = user._id;
        if (!isLiked) {
          if (Array.isArray(shot?.likedUsers)) {
            shot?.likedUsers.push(res);
          } else {
            shot.likedUsers = [res];
          }
          setIsLiked(true);
        } else {
          shot.likedUsers = shot?.likedUsers?.filter((like) => like?.likedUserId !== user?._id);
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

  return (
    <>
      <HeaderNew user={user} />
      <div className={cn(styles.shotPage, areCommentsOpened && styles.shotPage__shifted)}>
        {/* <ShotSideMenu shot={shot} toggleComments={toggleComments} /> */}
        <ShotHeader
          user={user}
          shot={shot}
          className={styles.shotPage__header}
          allShots={allShots}
          isOwn={isOwn}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
        <ShotBody shot={shot} className={styles.shotPage__body} />
        <ShotFooter
          user={user}
          shot={shot}
          isOwn={isOwn}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
          isLiked={isLiked}
          like={() => like()}
        />
        <ShotSlider shot={shot} allShots={allShots} />
      </div>
    </>
  );
};

export default shotPage;
