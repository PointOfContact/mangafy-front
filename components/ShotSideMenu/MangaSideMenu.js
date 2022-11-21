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
import Diamond from 'components/icon/new/Diamond';

const MangaSideMenu = ({
  manga,
  chapter,
  setAreCommentsOpened,
  areCommentsOpened,
  setCurrentChapterId,
  user,
  isLiked,
  like,
  comments,
  setIsShareModalOpened,
  authors,
  isParticipant,
  createComment,
  setIsLoginModalVisible,
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
        {!!authors && !!authors[0] && (
          <Avatar
            size={60}
            image={authors[0]?.avatar}
            text={authors[0]?.name[0]}
            className={styles.menu__avatar}
          />
        )}
        <div className={styles.menu__buttons}>
          <Button
            onClick={() => {
              if (!user) {
                setIsLoginModalVisible(true);
                return;
              }
              setAreCommentsOpened(!areCommentsOpened);
            }}
            rounded
            outline
            iconRight
            icon={<Comment color="#7B65F3" />}>
            {comments?.total || 0}
          </Button>
          {like && (
            <Button
              className={isLiked && styles.menu__like_active}
              onClick={like}
              rounded
              outline
              iconRight
              icon={<Fire color="#7B65F3" />}>
              {chapter?.like || 0}
            </Button>
          )}
          {!!authors && authors[0]?.payPalEmail && (
            <Link
              href={`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${authors[0]?.payPalEmail}&item_name=Friends+of+the+Park&item_number=Fall+Cleanup+Campaign&currency_code=USD`}>
              <a>
                <Button rounded outline iconRight icon={<Diamond color="#7B65F3" />}></Button>
              </a>
            </Link>
          )}
          <Button
            rounded
            outline
            iconRight
            icon={<Share color="#7B65F3" />}
            onClick={() => setIsShareModalOpened(true)}
          />
          {isParticipant && (
            <Link href={'/project/production/' + manga?.mangaStoryId + '?tab=details'}>
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
        <MangaComments manga={manga} comments={comments.data} createComment={createComment} />
      </div>
    </>
  );
};

export default MangaSideMenu;
