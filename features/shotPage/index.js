import client from 'api/client';
import HeaderNew from 'components/headerNew';
import React, { useState, useRef, useEffect } from 'react';
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
import { buildShotURL, followUser, unFollowUser } from 'helpers/shared';
import { Modal } from 'antd';
import { ShareButtons } from 'components/share';
import { viewShot } from 'utils';
import { NextSeo } from 'next-seo';

const ShotPage = ({ user, allShots, serverSideShot, serverSideAuthor }) => {
  const router = useRouter();

  const [shot, setShot] = useState(
    serverSideShot?.isOld ? prepareOldShot(serverSideShot) : serverSideShot
  );

  const [author, setAuthor] = useState(serverSideAuthor);

  const [isSubscribed, setIsSubscribed] = useState(author?.likedUsers?.includes(user?._id));
  const [isLiked, setIsLiked] = useState(
    !!shot?.likedUsers?.find((obj) => {
      return obj.likedUserId === user?._id;
    })
  );

  useEffect(() => {
    viewShot(user, shot);
  }, []);

  useEffect(() => {
    setIsLiked(!!shot?.likedUsers?.find((obj) => obj.likedUserId === user?._id));
  }, [shot]);

  useEffect(() => {
    setIsSubscribed(author?.likedUsers?.includes(user?._id));
  }, [author]);

  useEffect(() => {
    updateShotInfo();
  }, [router.query.shotId, router.query.galleryId]);

  const [areCommentsOpened, setAreCommentsOpened] = useState(false);
  function toggleComments() {
    setAreCommentsOpened(!areCommentsOpened);
  }

  const [isShareModalOpened, setIsShareModalOpened] = useState(false);

  async function updateShotInfo() {
    const newShot = await getShotInfo(router.query.shotId, router.query.galleryId);
    if (!router.query.galleryId) {
      setShot(newShot);
    } else {
      setShot(prepareOldShot(newShot));
    }
  }

  async function updateAuthorInfo() {
    try {
      const newAuthor = await client.service('/api/v2/users').get(author?._id);
      console.log(newAuthor);
      setAuthor(newAuthor);
    } catch (error) {
      console.log(error);
    }
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
      followUser(author?._id)
        .then(() => {
          updateShotInfo();
          updateAuthorInfo();
        })
        .catch((err) => {
          updateShotInfo();
          console.log(err);
        });
    } else {
      unFollowUser(author?._id)
        .then(() => {
          updateShotInfo();
          updateAuthorInfo();
        })
        .catch((err) => {
          updateAuthorInfo();
          console.log(err);
        });
    }
  }

  const isOwn = user?._id === shot?.authorId;

  return (
    <>
      <NextSeo
        title={shot?.title}
        description={shot?.description}
        canonical={`${client.API_ENDPOINT}/shot/${shot?._id}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/shot/${shot?._id}`,
          title: shot?.title,
          description: shot?.description,
          type: 'article',
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <HeaderNew user={user} />
      <div className={cn(styles.shotPage, areCommentsOpened && styles.shotPage__shifted)}>
        <Modal
          title="Share with your friends"
          visible={isShareModalOpened}
          onCancel={() => setIsShareModalOpened(false)}
          centered
          footer={null}
          wrapClassName={styles.shotPage__shareModal}>
          <ShareButtons
            shareUrl={
              client.API_ENDPOINT + buildShotURL(shot?._id, shot?.isOld ? author?._id : null)
            }
          />
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
          isOld={shot?.isOld}
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
          className={styles.shotPage__footer}
          user={user}
          shot={shot}
          isOwn={isOwn}
          isSubscribed={isSubscribed}
          subscribe={subscribe}
          isLiked={isLiked}
          like={() => like()}
          toggleComments={toggleComments}
          updateShotInfo={updateShotInfo}
          shareUrl={client.API_ENDPOINT + buildShotURL(shot?._id, shot?.isOld ? author?._id : null)}
        />
        <ShotSlider className={styles.shotPage__slider} shot={shot} allShots={allShots} />
      </div>
    </>
  );
};

export default ShotPage;

function prepareOldShot(old) {
  const newShot = { ...old };
  newShot._id = old?.image?._id;
  newShot.image = old?.image?.image;
  if (Array.isArray(old?.authorInfo)) {
    newShot.authorInfo = old?.authorInfo[0];
  }
  return newShot;
}

async function getShotInfo(shotId, galleryId) {
  let newShot = null;
  if (!galleryId) {
    // update shot (new)
    newShot = await client.service('/api/v2/short-stories').get(shotId);
  } else {
    // update shot (old)
    newShot = await client.service(`/api/v2/posts`).get(shotId, {
      query: { postType: 'Portfolio', galleryId: galleryId },
    });
    newShot.isOld = true;
  }
  return newShot;
}
