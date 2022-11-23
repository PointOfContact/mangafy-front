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
import ShotAndMangaTitle from 'components/ShotAndMangaTitle';
import { useAppContext } from 'context';
import PrimaryButton from 'components/ui-elements/button';
import { useRouter } from 'next/router';

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
  setIsLoginModalVisible,
}) => {
  const { cbInstance, openPlanModal } = useAppContext();
  const router = useRouter();

  return (
    <div name="footer" className={cn(styles.footer, className)}>
      {shot.planId && (
        <PrimaryButton
          text="Suscribe"
          onClick={() => openPlanModal(cbInstance, shot.planId, shot._id, user?.customerId)}
        />
      )}
      <div className={styles.footer__container}>
        <div className={styles.footer__mobileComments} id="comments">
          <div className={styles.footer__mobileCommentsHeader}>Feedback</div>
          <ShotComments
            shotId={shot._id}
            user={user}
            onUpload={updateShotInfo}
            setIsLoginModalVisible={setIsLoginModalVisible}
          />
        </div>
        <ShotAndMangaTitle
          title={shot?.isOld ? shot?.authorInfo?.name : shot?.title}
          link={'/profile/' + shot?.authorInfo._id}
          author={{ ...shot?.authorInfo, isFollowed: isSubscribed }}
          isOwn={isOwn}
          subscribe={subscribe}
        />
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
            <Link href="#comments">
              <a>
                <Button
                  className={styles.footer__commentButtonMobile}
                  sm
                  rounded
                  outline
                  iconRight
                  icon={<Comment color="#7B65F3" />}>
                  {shot?.comments?.total || 0}
                </Button>
              </a>
            </Link>
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
