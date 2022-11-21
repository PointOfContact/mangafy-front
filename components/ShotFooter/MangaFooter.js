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
import PrimaryButton from 'components/ui-elements/button';
import { useAppContext } from 'context';

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
  createComment,
  setIsLoginModalVisible,
}) => {
  const { cbInstance, openPlanModal } = useAppContext();

  return (
    <div name="footer" className={cn(styles.footer, className)}>
      {chapter.planId && (
        <PrimaryButton
          text="Suscribe"
          onClick={() => openPlanModal(cbInstance, chapter.planId, chapter._id, user?.customerId)}
        />
      )}
      <div className={styles.footer__container}>
        <div className={styles.footer__mobileComments}>
          <div className={styles.footer__mobileCommentsHeader}>Feedback</div>
          <MangaComments manga={manga} comments={comments.data} createComment={createComment} />
        </div>
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
