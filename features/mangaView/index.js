import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import { Comments } from 'components/comments';
import FooterPolicy from 'components/footer-policy';
import SvgHeart from 'components/icon/Heart';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import BuyBubbleTea from 'components/ui-elements/buyBubbleTea';
import Pagination from 'components/ui-elements/pagination';
import ShowSomeData from 'components/ui-elements/showSomeData';
import { EVENTS } from 'helpers/amplitudeEvents';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import getDeviceId from 'utils/deviceId';

import ChapterRatings from './chapterRatings';
import createChapterItems from './createChapterItems';
import createParticipantItems from './createParticipantItems';
import styles from './styles.module.scss';
import ViewHeader from './viewHeader';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const MangaView = ({
  user,
  storyBoardId,
  mangaUrls,
  mangaStoryId,
  mangaStoryTitle,
  chapters,
  userData,
  participants,
  getNameViewUrl,
  payPalPublished,
}) => {
  const router = useRouter();
  const currentChapterNumber = +router.query.chapter;
  const [currentChapter, setCurrentChapter] = useState(currentChapterNumber || 1);
  const chapter = chapters[currentChapter - 1];
  const [images, setImages] = useState([]);
  const [disabledLike, setDisabledLike] = useState(false);
  const [countLike, setCountLike] = useState(chapter?.like);
  const [like, setLike] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [participantItems, setParticipantItems] = useState([]);
  const [chapterItems, setChapterItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [deviceId, setDeviceId] = useState('');

  const chapterImg = chapter?.chapterImg;

  const alreadyLikedChapter = () => {
    const userId = !!user ? user._id : deviceId;
    const liked = chapter?.likedUsers?.some((value) => value === userId);

    if (liked) {
      setAlreadyLiked(liked);
      setLike(true);
    } else {
      setAlreadyLiked(liked);
      setLike(false);
    }
  };

  useEffect(() => {
    setCountLike(chapter?.like);
    alreadyLikedChapter();
    createChapterItems(chapters, chapter, setChapterItems, currentChapter, setCurrentChapter);
  }, [currentChapterNumber, chapter]);

  useEffect(() => {
    client
      .service('/api/v2/comments')
      .find({
        query: {
          mangaStoryId,
          $sort: { createdAt: -1 },
          $limit: 1000,
        },
      })
      .then((res) => setComments(res.data));

    const data = [
      {
        event_type: EVENTS.OPEN_VIEW_PAGE,
        event_properties: { storyBoardId },
      },
    ];

    myAmplitude(data);
    createParticipantItems(participants, setParticipantItems);
    getDeviceId(setDeviceId);
  }, []);

  useEffect(() => {
    const getCurrentMangaUrls = !!chapter?.mangaUrls ? chapter?.mangaUrls : [];
    const chapterImages = getCurrentMangaUrls.map((value) => {
      const imgType = !!value.imageUrl ? value.imageUrl.slice(-3) : value.slice(-3);
      const ifPdf = imgType === 'pdf' || imgType === 'PDF';

      return (
        <div className={styles.containerImages} key={value}>
          {ifPdf ? (
            <PDFViewer url={client.UPLOAD_URL + value} />
          ) : (
            <Imgix layout="fill" src={client.UPLOAD_URL + value} alt="Mangafy preview images" />
          )}
        </div>
      );
    });

    setImages(chapterImages);
    if (!getNameViewUrl) {
      router.push(`/manga-view/${storyBoardId}?chapter=${currentChapter}`, undefined, {
        shallow: false,
      });
    }
    client.service(`/api/v2/manga-view`).get(storyBoardId, {
      query: {
        storyBoardId,
        deviceId,
      },
    });
  }, [currentChapter, deviceId]);

  const shareUrl = !!getNameViewUrl
    ? `https://${getNameViewUrl}.mangafy.club`
    : `https://mangafy.club/manga-view/${storyBoardId}?chapter=${currentChapter}`;

  const shareClick = () => {
    const dataEvent = [
      {
        event_type: EVENTS.SHARE_VIEW_PAGE,
        event_properties: { chapter },
      },
    ];
    myAmplitude(dataEvent);
  };

  const returnLikedData = () => {
    const userId = !!user ? user._id : deviceId;
    const data = {
      ownerId: userData[0]._id,
      chapterId: chapter?._id,
      likedUserId: userId,
      participants,
    };

    if (alreadyLiked) {
      data.like = 'decrement';
      setCountLike(countLike - 1);
    } else {
      data.like = 'increment';
      setCountLike(countLike + 1);
    }

    return data;
  };

  const changeStateLiked = () => {
    if (alreadyLiked) {
      setLike(false);
      setAlreadyLiked(false);
    } else {
      setLike(true);
      setAlreadyLiked(true);
    }
  };

  const likeChapter = () => {
    if (disabledLike) return;

    const jwt = client.getCookie('feathers-jwt');

    const data = returnLikedData();
    setDisabledLike(true);
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/chapter-like')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then(() => {
          setDisabledLike(false);
          changeStateLiked();
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
          return err;
        });
    });
  };

  return (
    <>
      <NextSeo
        title={`MangaFY - Collaborate, Create and Publish`}
        description={`${mangaStoryTitle}`}
        canonical={`https://mangafy.club/manga-view/${storyBoardId}`}
        openGraph={{
          type: 'Mangafy-story',
          url: shareUrl,
          title: `MangaFY - Collaborate, Create and Publish`,
          description: mangaStoryTitle,
          images: [
            {
              url: `https://mangafy.club/api/v2/uploads/${
                !!chapterImg ? chapterImg : chapter?.mangaUrls[0]
              }`,
              width: 800,
              height: 600,
              alt: 'Manga Story Image',
            },
          ],
          site_name: 'MangaFY',
        }}
        twitter={{
          title: 'MangaFY - Collaborate, Create and Publish',
          description: `${mangaStoryTitle}`,
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
          images: [
            {
              url: `https://mangafy.club/api/v2/uploads/${
                !!chapterImg ? chapterImg : chapter?.mangaUrls[0]
              }`,
              width: 800,
              height: 600,
              alt: 'Manga Story Image',
            },
          ],
        }}
      />
      <div className={styles.containerPreview}>
        <ViewHeader
          user={user}
          chapters={chapters}
          storyBoardId={storyBoardId}
          mangaStoryTitle={mangaStoryTitle}
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
          shareUrl={shareUrl}
          shareOnClick={shareClick}
        />
        <div className={styles.menu}>
          <div className={styles.imagesContainer}>{images}</div>
          <p className={styles.shareDescription}>
            Share this series and show support for the creator!
          </p>
          <div className={styles.shareContainer}>
            <div
              className={cn(styles.chapterRating, like && styles.likeItem)}
              onClick={likeChapter}>
              <SvgHeart width={20} height={20} />
              {!!countLike ? `${countLike} Likes` : 'Like'}
            </div>
            <div className={styles.chapterRating}>
              {!!chapter?.view ? `${chapter?.view} Views` : 'View'}
            </div>
            <ShareButtons
              className={styles.shareButtons}
              shareUrl={shareUrl}
              onClick={shareClick}
            />
          </div>
          <div className={styles.userData}>
            <Link href={`/profile/${userData[0]._id}`}>
              <a>
                <p className={styles.owner}>
                  {userData[0].name}
                  <span> .Owner</span>
                </p>
              </a>
            </Link>
            {participantItems}
            <ShowSomeData participantsData={participants} size={40} />
          </div>

          <div className={styles.commentContainerMenu}>
            {payPalPublished && (
              <BuyBubbleTea
                payPalEmail={userData.payPalEmail}
                createAmplitude={true}
                chapter={chapter}
                mangaStoryId={mangaStoryId}
                user={user}
              />
            )}
            <Comments
              commentsData={comments}
              mangaStory={{ _id: mangaStoryId }}
              user={user}
              viewPage={true}
              chapter={chapter}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.chaptersItems}>{chapterItems}</div>
          <div className={styles.paginationContainer}>
            <ChapterRatings
              chapter={chapter}
              like={like}
              likeChapter={likeChapter}
              countLike={countLike}
            />
            <Pagination
              currentNumber={currentChapter}
              setCurrentNumber={setCurrentChapter}
              data={chapters}
              user={user}
            />
          </div>
          <div className={cn(styles.commentAndBubble, !payPalPublished && styles.ifNotBubble)}>
            <div className={styles.commentContainer}>
              <Comments
                commentsData={comments}
                mangaStory={{ _id: mangaStoryId }}
                user={user}
                viewPage={true}
                chapter={chapter}
              />
            </div>
            {payPalPublished && (
              <BuyBubbleTea
                payPalEmail={userData.payPalEmail}
                createAmplitude={true}
                chapter={chapter}
                mangaStoryId={mangaStoryId}
                user={user}
              />
            )}
          </div>
          <FooterPolicy />
        </div>
      </div>
      <ButtonToTop user={user} />
    </>
  );
};

MangaView.propTypes = {
  user: PropTypes.object,
  storyBoardId: PropTypes.string.isRequired,
  mangaUrls: PropTypes.array.isRequired,
  mangaStoryId: PropTypes.string.isRequired,
  mangaStoryTitle: PropTypes.string.isRequired,
  chapters: PropTypes.array.isRequired,
  userData: PropTypes.array.isRequired,
  participants: PropTypes.array.isRequired,
  getNameViewUrl: PropTypes.string,
  payPalPublished: PropTypes.bool.isRequired,
};

MangaView.defaultProps = {
  user: {},
  getNameViewUrl: '',
};

export default MangaView;
