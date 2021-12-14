import React, { useEffect, useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import { Comments } from 'components/comments';
import FooterPolicy from 'components/footer-policy';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import BuyBubbleTea from 'components/ui-elements/buyBubbleTea';
import Pagination from 'components/ui-elements/pagination';
import { EVENTS } from 'helpers/amplitudeEvents';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

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
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);

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
        user_id: user?._id,
        user_properties: {
          ...user,
        },
      },
    ];

    myAmplitude(data);
  }, []);

  useEffect(() => {
    const getCurrentMangaUrls = chapters[currentChapter - 1].mangaUrls;
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
        shallow: true,
      });
    }
  }, [currentChapter]);

  const chapterItems = chapters?.map((value, index) => {
    const type = value.cover.slice(-3);
    const ifPdf = type === 'pdf' || type === '{DF';
    const activeChapter = index + 1 === currentChapter;
    return (
      <div
        key={value._id + index}
        className={cn(styles.itemChapters, activeChapter && styles.activeChapter)}
        onClick={() => {
          const dataEvent = [
            {
              event_type: EVENTS.CHOOSE_VIEW_CHAPTER,
              event_properties: { chapter: chapters[currentChapter - 1] },
              user_id: user?._id,
              user_properties: {
                ...user,
              },
            },
          ];
          myAmplitude(dataEvent);
          setCurrentChapter(index + 1);
        }}>
        {ifPdf ? (
          <PDFViewer url={client.UPLOAD_URL + value.cover} />
        ) : (
          <Imgix
            width={100}
            height={100}
            src={client.UPLOAD_URL + value.cover}
            alt="MangaFy chapter image"
          />
        )}
        <p>CH {index + 1}</p>
        <div className={styles.opacity} />
      </div>
    );
  });

  const participantItems = participants.map((value, index) => (
    <Tooltip key={value._id + index} placement="top" title={value.name} arrowPointAtCenter>
      <div className={styles.participantsItem} style={{ marginLeft: `-${(index + 1) * 4}px` }}>
        <Link href={`/profile/${value._id}`}>
          <a>
            <Imgix
              width={40}
              height={40}
              src={client.UPLOAD_URL + value.avatar}
              alt={'MangaFy participants image'}
            />
          </a>
        </Link>
      </div>
    </Tooltip>
  ));

  const shareUrl = !!getNameViewUrl
    ? `https://${getNameViewUrl}.mangafy.club`
    : `https://mangafy.club/manga-view/${storyBoardId}?chapter=${currentChapter}`;

  const shareClick = () => {
    const dataEvent = [
      {
        event_type: EVENTS.SHARE_VIEW_PAGE,
        event_properties: { chapter: chapters[currentChapter - 1] },
        user_id: user?._id,
        user_properties: {
          ...user,
        },
      },
    ];
    myAmplitude(dataEvent);
  };

  return (
    <>
      <NextSeo
        title={`MangaFY is happy to introduce my latest graphic novel project, entitled ${mangaStoryTitle}.`}
        description="MangaFY is an easy to use application that features tools for
                   authors who wish to create manga and comics for digital publication"
        canonical={`https://mangafy.club/manga-view/${storyBoardId}`}
        openGraph={{
          url: shareUrl,
          title: `MangaFY is happy to introduce my latest graphic novel project, entitled ${mangaStoryTitle}.`,
          description:
            'MangaFY is an easy to use application that features tools for ' +
            'authors who wish to create manga and comics for digital publication',
          images: [
            {
              url: images?.length ? `https://mangafy.club/api/v2/uploads/${images[0]}` : '',
              width: 800,
              height: 600,
              alt: 'Manga Story Image',
            },
          ],
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
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
          <ShareButtons className={styles.shareButtons} shareUrl={shareUrl} onClick={shareClick} />
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
          </div>
          <div className={styles.commentContainerMenu}>
            {payPalPublished && (
              <BuyBubbleTea
                payPalEmail={userData.payPalEmail}
                createAmplitude={true}
                chapter={chapters[currentChapter - 1]}
                mangaStoryId={mangaStoryId}
                user={user}
              />
            )}
            <Comments
              commentsData={comments}
              mangaStory={{ _id: mangaStoryId }}
              user={user}
              viewPage={true}
              chapter={chapters[currentChapter - 1]}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.chaptersItems}>{chapterItems}</div>
          <div className={styles.paginationContainer}>
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
                chapter={chapters[currentChapter - 1]}
              />
            </div>
            {payPalPublished && (
              <BuyBubbleTea
                payPalEmail={userData.payPalEmail}
                createAmplitude={true}
                chapter={chapters[currentChapter - 1]}
                mangaStoryId={mangaStoryId}
                user={user}
              />
            )}
          </div>
          <FooterPolicy />
        </div>
      </div>
      <ButtonToTop />
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
