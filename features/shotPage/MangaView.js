/* eslint-disable react-hooks/exhaustive-deps */
import client from 'api/client';
import HeaderNew from 'components/headerNew';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import notification from 'antd/lib/notification';
import cn from 'classnames';
import { createChapterComment, followUser, unFollowUser } from 'helpers/shared';
import { Modal } from 'antd';
import { ShareButtons } from 'components/share';
import MangaHeader from 'components/ShotHeader/MangaHeader';
import MangaBody from 'components/ShotBody/MangaBody';
import MangaFooter from 'components/ShotFooter/MangaFooter';
import MangaSlider from 'components/ShotSlider/MangaSlider';
import MangaSideMenu from 'components/ShotSideMenu/MangaSideMenu';
import { viewChapterFun } from 'utils';
import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude from 'utils/amplitude';
import SvgReadBookIcon from 'components/icon/ReadBookIcon';
import SvgRightArrow from 'components/icon/RightArrow';
import SvgLeftArrow from 'components/icon/LeftArrow';
import reactImageSize from 'react-image-size';
import ChangeViewTab from './changeViewTab';
import { NextSeo } from 'next-seo';
import { SignInModal } from 'components/modals/SignInModal';
import ConfirmModal from 'components/modals/ConfirmModal';
import ShareModal from 'components/modals/shareModal';

const MangaView = ({
  user,
  serverSideAuthors,
  serverSideManga,
  serverSideComments,
  serverSideChapter,
}) => {
  const router = useRouter();
  const refBook = useRef(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(+router.query.chapter || 1);
  const [authors, setAuthors] = useState(serverSideAuthors);
  const [comments, setComments] = useState(serverSideComments);
  const [readStyle, setReadStyle] = useState(false);
  const [conutPage, setConutPage] = useState(1);
  const [imagesHeight, setImagesHeight] = useState([]);

  const hashPath = router.asPath.split('#')[1];
  useEffect(() => {
    if (hashPath) {
      router.push('#' + hashPath);
    }
  }, [router.asPath]);

  const [isLiked, setIsLiked] = useState(false);

  const [manga, setManga] = useState(serverSideManga);
  const chapter = manga?.chapters[activeChapterIndex - 1];

  const [areCommentsOpened, setAreCommentsOpened] = useState(false);
  function toggleComments() {
    if (!user) {
      setIsLoginModalVisible(true);
      return;
    }
    setAreCommentsOpened(!areCommentsOpened);
  }

  const [isShareModalOpened, setIsShareModalOpened] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isGoToSettingsModalOpened, setIsGoToSettingsModalOpened] = useState(false);

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
    updateChapterCommentsInfo();
  }, [manga]);

  useEffect(async () => {
    updateMangaInfo();
    updateAuthorsInfo();
    const imagesHeights = [''];
    for (const image of chapter?.mangaUrls) {
      const { height } = await reactImageSize(client.UPLOAD_URL + image);
      imagesHeights.push(height);
    }
    setImagesHeight(imagesHeights);
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
    viewChapterFun(user, manga.chapters[serverSideChapter - 1]);
  }, [router.query.chapter]);

  function like() {
    if (!user) {
      setIsLoginModalVisible(true);
      return;
    }

    const data = {
      ownerId: authors[0]._id,
      chapterId: chapter?._id,
      likedUserId: user?._id,
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
      .then((res) => {
        const eventData = [
          {
            event_type: EVENTS.EPISODE_LIKE,
            event_properties: {
              chapterID: chapter?._id,
              title: chapter.title,
              from: 'Manga View page',
            },
          },
        ];
        myAmplitude(eventData);
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
      setIsLoginModalVisible(true);
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

  function updateChapterCommentsInfo() {
    const jwt = client.getCookie('feathers-jwt');
    client
      .service('/api/v2/comment-chapter')
      .find({
        query: {
          chapterId: chapter?._id,
          $sort: { createdAt: -1 },
          $limit: 1000,
        },
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then((res) => {
        setComments(res);
      })
      .catch((err) => console.log(err));
  }

  function createCommentChapter(text) {
    if (!user) {
      setIsLoginModalVisible(true);
      return;
    }
    createChapterComment(text, chapter?._id, user?._id)
      .then((res) => {
        updateChapterCommentsInfo();
      })
      .catch((err) => console.log(err));
  }

  const isOwn = authors && authors[0]?._id === user?._id;
  const isParticipant = authors && authors.some((author) => author?._id === user?._id);

  return (
    <>
      <NextSeo
        title={manga?.mangaStoryTitle}
        description={`Read "${manga?.mangaStoryTitle}" on MangaFY`}
        canonical={`${client.API_ENDPOINT}/project/view/${manga?._id}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/project/view/${manga?._id}`,
          title: manga?.mangaStoryTitle,
          description: `Read "${manga?.mangaStoryTitle}" on MangaFY`,
          type: 'article',
          site_name: 'MangaFY',
          images: [
            {
              url:
                client.API_ENDPOINT + '/api/v2/uploads/' + manga?.chapters[0]?.pages[0]?.imageUrl,
              alt: 'Project cover',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <HeaderNew user={user} />
      <div
        onClick={() => {
          document.body.style.position = 'initial';
        }}
        className={cn(styles.shotPage, areCommentsOpened && styles.shotPage__shifted)}>
        <Modal
          title="Share with your friends"
          visible={isShareModalOpened}
          onCancel={() => setIsShareModalOpened(false)}
          centered
          footer={null}
          wrapClassName={styles.shotPage__shareModal}>
          <ShareButtons
            shareUrl={
              client.API_ENDPOINT + '/project/view/' + manga?.id + '?ongoing=' + activeChapterIndex
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
          createComment={createCommentChapter}
          chapter={chapter}
          isParticipant={isParticipant}
          setIsLoginModalVisible={setIsLoginModalVisible}
          setIsGoToSettingsModalOpened={setIsGoToSettingsModalOpened}
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
          images={chapter?.mangaUrls}
          readStyle={readStyle}
          refBook={refBook}
          setConutPage={setConutPage}
          className={styles.shotPage__body}
          conutPage={conutPage}
          chapter={chapter}
          setReadStyle={setReadStyle}
        />
        {/* <ChangeViewTab
          conutPage={conutPage}
          chapter={chapter}
          refBook={refBook}
          readStyle={readStyle}
          setConutPage={setConutPage}
          setReadStyle={setReadStyle}
        /> */}
        <MangaFooter
          chapter={chapter}
          manga={manga}
          user={user}
          isOwn={isOwn}
          subscribe={subscribe}
          authors={authors}
          comments={comments}
          isLiked={isLiked}
          like={like}
          toggleComments={toggleComments}
          updateComments={updateChapterCommentsInfo}
          updateMangaInfo={updateMangaInfo}
          isParticipant={isParticipant}
          shareUrl={
            client.API_ENDPOINT + '/project/view/' + manga?.id + '?ongoing=' + activeChapterIndex
          }
          createComment={createCommentChapter}
          setIsLoginModalVisible={setIsLoginModalVisible}
        />
        <MangaSlider manga={manga} activeChapterIndex={activeChapterIndex} />
        <SignInModal
          page={'/project/view/' + manga?.id}
          title="Sign in"
          visible={isLoginModalVisible}
          setVisible={setIsLoginModalVisible}></SignInModal>
        {isOwn ? (
          <ConfirmModal
            isOpen={isGoToSettingsModalOpened}
            setIsOpen={setIsGoToSettingsModalOpened}
            question={'Publish your project before sharing it'}
            description='Please, go to the settings and set "Is visible" to "Visible"'
            okText={'Go to settings'}
            onOk={() => {
              router.push('/project/production/' + manga?.mangaStoryId + '?tab=settings#visible');
            }}
            cancelText={'Cancel'}
          />
        ) : (
          <ShareModal
            isShareModalOpened={isGoToSettingsModalOpened}
            setIsShareModalOpened={setIsGoToSettingsModalOpened}
            shareUrl={client.API_ENDPOINT + router.asPath}
          />
        )}
      </div>
    </>
  );
};

export default MangaView;
