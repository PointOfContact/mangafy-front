import client from 'api/client';
import HeaderNew from 'components/headerNew';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import notification from 'antd/lib/notification';
import cn from 'classnames';
import { followUser, unFollowUser } from 'helpers/shared';
import { Modal } from 'antd';
import { ShareButtons } from 'components/share';
import MangaHeader from 'components/ShotHeader/MangaHeader';
import MangaBody from 'components/ShotBody/MangaBody';
import MangaFooter from 'components/ShotFooter/MangaFooter';
import MangaSlider from 'components/ShotSlider/MangaSlider';
import MangaSideMenu from 'components/ShotSideMenu/MangaSideMenu';

const MangaView = ({
  user,
  serverSideAuthors,
  serverSideManga,
  serverSideComments,
  serverSideChapter,
}) => {
  const router = useRouter();
  const [activeChapterIndex, setActiveChapterIndex] = useState(+router.query.chapter || 1);
  const [authors, setAuthors] = useState(serverSideAuthors);
  const [comments, setComments] = useState(serverSideComments);

  const [isLiked, setIsLiked] = useState(
    serverSideManga.chapters[serverSideChapter - 1]?.likedUsers?.some((obj) => {
      return obj === user?._id;
    })
  );

  const [manga, setManga] = useState(serverSideManga);

  const [areCommentsOpened, setAreCommentsOpened] = useState(false);
  function toggleComments() {
    setAreCommentsOpened(!areCommentsOpened);
  }

  const [isShareModalOpened, setIsShareModalOpened] = useState(false);

  async function updateMangaInfo() {
    const newManga = await client.service(`/api/v2/manga-view`).get(manga?.id, {
      query: {
        storyBoardId: manga?.id,
      },
    });
    setManga(newManga);
  }

  async function updateAuthorsInfo() {
    try {
      const newAuthors = await Promise.all(
        authors?.map((item) => client.service('/api/v2/users').get(item._id))
      );
      newAuthors.forEach((item) => {
        item.isFollowed = item.likedUsers?.includes(user?._id);
      });
      setAuthors(newAuthors);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsLiked(
      manga.chapters[serverSideChapter - 1]?.likedUsers?.some((obj) => {
        return obj === user?._id;
      })
    );
  }, [manga]);

  useEffect(() => {
    updateMangaInfo();
    updateAuthorsInfo();
  }, [router.query.mid]);

  useEffect(() => {
    if (
      !router.query.chapter ||
      router.query.chapter < 1 ||
      router.query.chapter > manga.chapters.length
    ) {
    } else {
      setActiveChapterIndex(1);
      setActiveChapterIndex(+router.query.chapter || 1);
    }
  }, [router.query.chapter]);

  function like() {
    if (!user) {
      notification.error({
        message: 'Error',
        description: 'You need to be logged in to like this shot',
      });
      return;
    }

    const data = {
      ownerId: authors[0]._id,
      chapterId: manga?.chapters[activeChapterIndex - 1]?._id,
      likedUserId: user._id,
      participants: manga?.participants,
    };

    if (isLiked) {
      data.like = 'decrement';
    } else {
      data.like = 'increment';
    }

    const jwt = client.getCookie('feathers-jwt');

    client
      .service('/api/v2/chapter-like')
      .create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then(() => {
        updateMangaInfo();
      })
      .catch((err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
        return err;
      });
  }

  function subscribe(authorId) {
    if (!user) {
      notification.error({
        placement: 'bottomLeft',
        message: 'You need to be logged in to follow a user',
      });
    }
    if (!authors[0].isFollowed) {
      followUser(authorId)
        .then(() => {
          updateMangaInfo();
          updateAuthorsInfo();
        })
        .catch((err) => console.log(err));
    } else {
      unFollowUser(authorId)
        .then(() => {
          updateMangaInfo();
          updateAuthorsInfo();
        })
        .catch((err) => console.log(err));
    }
  }

  function updateComments() {
    client
      .service('/api/v2/comments')
      .find({
        query: {
          mangaStoryId: manga?.mangaStoryId,
          $sort: { createdAt: -1 },
          $limit: 1000,
        },
      })
      .then((res) => setComments(res));
  }

  const isOwn = authors && authors[0]?._id === user?._id;
  const isParticipant = authors && authors.some((author) => author?._id === user?._id);
  return (
    <>
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
              client.API_ENDPOINT + '/manga-view/' + manga?.id + '?chapter=' + activeChapterIndex
            }
          />
        </Modal>
        <MangaSideMenu
          manga={manga}
          areCommentsOpened={areCommentsOpened}
          setAreCommentsOpened={setAreCommentsOpened}
          user={user}
          isLiked={isLiked}
          like={like}
          updateMangaInfo={updateMangaInfo}
          setIsShareModalOpened={setIsShareModalOpened}
          authors={authors}
          comments={comments}
          updateComments={updateComments}
          chapter={manga?.chapters[activeChapterIndex - 1]}
          isParticipant={isParticipant}
        />
        <MangaHeader
          user={user}
          manga={manga}
          className={styles.shotPage__header}
          chapters={manga?.chapters}
          authors={authors}
          subscribe={subscribe}
          isOwn={isOwn}
          activeChapterIndex={activeChapterIndex}
        />
        <MangaBody
          images={manga?.chapters[activeChapterIndex - 1]?.mangaUrls}
          className={styles.shotPage__body}
        />
        <MangaFooter
          chapter={manga?.chapters[activeChapterIndex - 1]}
          manga={manga}
          user={user}
          isOwn={isOwn}
          subscribe={subscribe}
          authors={authors}
          comments={comments}
          isLiked={isLiked}
          like={like}
          toggleComments={toggleComments}
          updateComments={updateComments}
          updateMangaInfo={updateMangaInfo}
          isParticipant={isParticipant}
          shareUrl={
            client.API_ENDPOINT + '/manga-view/' + manga?.id + '?chapter=' + activeChapterIndex
          }
        />
        <MangaSlider manga={manga} activeChapterIndex={activeChapterIndex} />
      </div>
    </>
  );
};

export default MangaView;