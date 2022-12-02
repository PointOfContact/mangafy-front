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
import ShotAndMangaTitle from 'components/ShotAndMangaTitle';
import Pledge from './pledge';

const MangaFooter = ({
  user,
  manga,
  chapter,
  setChapter,
  className,
  isOwn,
  authors,
  like,
  isLiked,
  ifPayed,
  setIfPayed,
  toggleComments,
  subscribe,
  updateComments,
  updateMangaInfo,
  shareUrl,
  comments,
  isParticipant,
  createComment,
  setIsLoginModalVisible,
}) => {
  return (
    <div name="footer" className={cn(styles.footer, className)}>
      <div className={styles.footer__container}>
        <div className={styles.footer__mobileComments} id={'comments'}>
          <div className={styles.footer__mobileCommentsHeader}>Feedback</div>
          <MangaComments manga={manga} comments={comments.data} createComment={createComment} />
        </div>
        <Pledge
          item={manga}
          image={chapter?.cover}
          user={user}
          updatePage={() => {
            setIfPayed(true);
          }}
          ifPayed={ifPayed}
          type="Project"
        />
        <ShotAndMangaTitle
          className={styles.footer__info}
          title={manga?.mangaStoryTitle}
          link={'/project/' + manga?.mangaStoryId}
          author={authors[0]}
          isOwn={isOwn}
          subscribe={subscribe}
        />
        Share this series and show support for the creator!
        <div className={styles.footer__buttonsAndLinks}>
          <div className={styles.footer__buttons}>
            <Button
              onClick={() => {
                if (!user) {
                  setIsLoginModalVisible(true);
                  return;
                }
                toggleComments();
              }}
              className={styles.footer__commentButton}
              sm
              rounded
              outline
              iconRight
              icon={<Comment color="#7B65F3" />}>
              {comments?.total || 0}
            </Button>
            <Link href="#comments">
              <a>
                <Button
                  className={styles.footer__commentButtonMobile}
                  sm
                  rounded
                  outline
                  iconRight
                  icon={<Comment color="#7B65F3" />}>
                  {comments?.total || 0}
                </Button>
              </a>
            </Link>
            <Button
              sm
              rounded
              outline
              icon={<Fire color="#7B65F3" />}
              onClick={like}
              iconRight
              className={cn(styles.footer__like, isLiked && styles.footer__like_active)}>
              {chapter?.like || 0}
            </Button>
            {isParticipant && (
              <Link href={'/project/production/' + manga?.mangaStoryId + '?tab=details'}>
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
