import Avatar from 'components/Avatar';
import Comment from 'components/icon/new/Comment';
import Fire from 'components/icon/new/Fire';
import Button from 'components/ui-new/Button';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Share from 'components/icon/new/Share';
import MangaComments from 'components/shotComments/MangaComments';
import Edit from 'components/icon/new/Edit';
import Link from 'next/link';

const MangaSideMenu = ({
  manga,
  chapter,
  setAreCommentsOpened,
  areCommentsOpened,
  user,
  isLiked,
  like,
  updateMangaInfo,
  comments,
  setIsShareModalOpened,
  authors,
  updateComments,
  isParticipant,
}) => {
  const author = authors[0];
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
          image={author?.avatar}
          text={author?.name[0]}
          className={styles.menu__avatar}
        />
        <div className={styles.menu__buttons}>
          <Button
            onClick={() => setAreCommentsOpened(!areCommentsOpened)}
            rounded
            outline
            iconRight
            icon={<Comment color="#7B65F3" />}>
            {comments?.total || 0}
          </Button>
          <Button
            className={isLiked && styles.menu__like_active}
            onClick={like}
            rounded
            outline
            iconRight
            icon={<Fire color="#7B65F3" />}>
            {chapter?.like || 0}
          </Button>
          <Button
            rounded
            outline
            iconRight
            icon={<Share color="#7B65F3" />}
            onClick={() => setIsShareModalOpened(true)}
          />
          {isParticipant && (
            <Link href={'/manga-story/' + manga.mangaStoryId}>
              <a>
                <Button rounded outline iconRight icon={<Edit color="#7B65F3" />} />
              </a>
            </Link>
          )}
        </div>
      </div>
      <div
        ref={commentsRef}
        className={cn(styles.sideComments, areCommentsOpened && styles.sideComments_opened)}>
        <div className={styles.sideComments__header}>Feedback</div>
        <MangaComments
          manga={manga}
          user={user}
          comments={comments.data}
          onUpload={() => {
            updateComments();
            updateMangaInfo();
          }}
        />
      </div>
    </>
  );
};

export default MangaSideMenu;
