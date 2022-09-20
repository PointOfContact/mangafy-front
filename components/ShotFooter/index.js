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
import ShotComments from 'components/shotComments';

const ShotFooter = ({
  user,
  shot,
  className,
  isOwn,
  isSubscribed,
  like,
  isLiked,
  toggleComments,
  subscribe,
  updateShotInfo,
  shareUrl,
}) => {
  function subscribeHandler() {
    if (!user) {
      notification.error({
        placement: 'bottomLeft',
        message: 'You need to be logged in to follow a user',
      });
    }
    if (!isSubscribed) {
      followUser(shot.authorId)
        .then(() => {
          setIsSubscribed(true);
        })
        .catch((err) => console.log(err));
    } else {
      unFollowUser(shot.authorId)
        .then(() => {
          setIsSubscribed(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div name="footer" className={cn(styles.footer, className)}>
      <div className={styles.footer__container}>
        <div className={styles.footer__mobileComments}>
          <div className={styles.footer__mobileCommentsHeader}>Feedback</div>
          <ShotComments shotId={shot._id} user={user} onUpload={updateShotInfo} />
        </div>
        <div className={styles.footer__author}>
          <div className={styles.footer__image}>
            <Avatar image={shot?.authorInfo?.avatar} text={shot?.authorInfo?.name[0]} size={80} />
          </div>

          <div className={styles.footer__info}>
            <div className={styles.footer__title}>
              {shot?.isOld ? shot?.authorInfo?.name : shot?.title}
            </div>

            <div className={styles.footer__subtitle}>
              {!shot?.isOld && (
                <>
                  <Link href={'/profile/' + shot?.authorInfo?._id}>
                    <a className={styles.footer__name}>{shot?.authorInfo?.name}</a>
                  </Link>
                  <span>{' | '}</span>
                </>
              )}
              {!isOwn && (
                <>
                  <button className={styles.footer__subscribe} onClick={subscribe}>
                    {isSubscribed ? 'Unfollow' : 'Follow'}
                  </button>
                </>
              )}
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
              {shot?.comments?.total || 0}
            </Button>
            {!shot.isOld && (
              <Button
                sm
                rounded
                outline
                icon={<Fire color="#7B65F3" />}
                onClick={like}
                iconRight
                className={cn(styles.footer__like, isLiked && styles.footer__like_active)}>
                {shot.likedUsers?.length || 0}
              </Button>
            )}
          </div>
          <ShareButtons shareUrl={shareUrl} />
        </div>
      </div>
    </div>
  );
};

export default ShotFooter;
