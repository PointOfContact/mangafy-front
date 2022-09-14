import Avatar from 'components/Avatar';
import Comment from 'components/icon/new/Comment';
import Fire from 'components/icon/new/Fire';
import Send from 'components/icon/new/Send';
import Button from 'components/ui-new/Button';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import ShotComments from 'components/shotComments';

const ShotSideMenu = ({
  shot,
  setAreCommentsOpened,
  areCommentsOpened,
  user,
  isLiked,
  like,
  updateShotInfo,
  comments,
  setIsShareModalOpened,
}) => {
  const commentsRef = useRef(null);
  // const [commentsCount, setCommentsCount] = useState(0);

  function handleClickOutside(event) {
    if (commentsRef.current && !commentsRef.current.contains(event.target)) {
      setAreCommentsOpened(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={cn(styles.menu, areCommentsOpened && styles.menu_withOpenedComments)}>
        <Avatar
          size={60}
          image={shot.authorInfo?.avatar}
          text={shot.authorInfo?.name[0]}
          className={styles.menu__avatar}
        />
        <div className={styles.menu__buttons}>
          <Button
            onClick={() => setAreCommentsOpened(!areCommentsOpened)}
            rounded
            outline
            iconRight
            icon={<Comment color="#7B65F3" />}>
            {shot?.comments?.total || 0}
          </Button>
          <Button
            className={isLiked && styles.menu__like_active}
            onClick={like}
            rounded
            outline
            iconRight
            icon={<Fire color="#7B65F3" />}>
            {shot?.likedUsers?.length || 0}
          </Button>
          <Button
            rounded
            outline
            iconRight
            icon={<Send color="#7B65F3" />}
            onClick={() => setIsShareModalOpened(true)}
          />
        </div>
      </div>
      <div
        ref={commentsRef}
        className={cn(styles.sideComments, areCommentsOpened && styles.sideComments_opened)}>
        <div className={styles.sideComments__header}>Feedback</div>
        <ShotComments shotId={shot._id} user={user} onUpload={updateShotInfo} />
      </div>
    </>
  );
};

export default ShotSideMenu;
