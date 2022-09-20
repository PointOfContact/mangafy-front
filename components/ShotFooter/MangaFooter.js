import Imgix from 'components/imgix';
import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import client from 'api/client';
import Button from 'components/ui-new/Button';
import Fire from 'components/icon/new/Fire';
import Comment from 'components/icon/new/Comment';
import Heart from 'components/icon/new/Heart';
import { ShareButtons } from 'components/share';
import cn from 'classnames';
import Avatar from 'components/Avatar';
import { notification } from 'antd';
import MangaComments from 'components/shotComments/MangaComments';
import Edit from 'components/icon/new/Edit';

const MangaFooter = ({
  user,
  manga,
  chapter,
  className,
  isOwn,
  authors,
  like,
  isLiked,
  toggleComments,
  subscribe,
  updateComments,
  updateMangaInfo,
  shareUrl,
  comments,
  isParticipant,
}) => {
  return (
    <div name="footer" className={cn(styles.footer, className)}>
      <div className={styles.footer__container}>
        <div className={styles.footer__mobileComments}>
          <div className={styles.footer__mobileCommentsHeader}>Feedback</div>
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
        <div className={styles.footer__author}>
          <div className={styles.footer__image}>
            <Avatar image={authors[0]?.avatar} text={authors[0]?.name} size={80} />
          </div>

          <div className={styles.footer__info}>
            <div className={styles.footer__title}>{manga?.mangaStoryTitle}</div>

            <div className={styles.footer__subtitle}>
              <Link href={'/profile/' + authors[0]?._id}>
                <a className={styles.footer__authorLink}>{authors[0]?.name}</a>
              </Link>
              {/* {authors.length === 1 && (
                <> */}
              {!isOwn && (
                <>
                  <span>{' | '}</span>
                  <button
                    className={styles.footer__subscribe}
                    onClick={() => subscribe(authors[0]._id)}>
                    {authors[0].isFollowed ? 'Unfollow' : 'Follow'}
                  </button>
                </>
              )}
              {/* </>
              )} */}
            </div>
          </div>
        </div>
        Share this series and show support for the creator!
        <div className={styles.footer__buttonsAndLinks}>
          <div className={styles.footer__buttons}>
            <Button
              onClick={toggleComments}
              className={styles.footer__commentButton}
              sm
              rounded
              outline
              iconRight
              icon={<Comment color="#7B65F3" />}>
              {comments?.total || 0}
            </Button>
            <Button
              sm
              rounded
              outline
              icon={<Fire color="#7B65F3" />}
              onClick={like}
              iconRight
              className={cn(styles.footer__like, isLiked && styles.footer__like_active)}>
              {chapter.like || 0}
            </Button>
            {isParticipant && (
              <Link href={'/manga-story/' + manga.mangaStoryId}>
                <a>
                  <Button rounded outline iconRight icon={<Edit color="#7B65F3" />} />
                </a>
              </Link>
            )}
          </div>
          <ShareButtons shareUrl={shareUrl} />
        </div>
      </div>
    </div>
  );
};

export default MangaFooter;
