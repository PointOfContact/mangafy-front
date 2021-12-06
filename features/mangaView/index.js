import React, { useEffect, useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import FooterPolicy from 'components/footer-policy';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Pagination from 'components/ui-elements/pagination';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

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
}) => {
  const router = useRouter();
  const currentChapterNumber = +router.query.chapter;
  const [currentChapter, setCurrentChapter] = useState(currentChapterNumber || 1);
  const [images, setImages] = useState([]);

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
  }, [currentChapter]);

  useEffect(() => {
    if (!getNameViewUrl) {
      router.push(`/manga-view/${storyBoardId}?chapter=${currentChapter}`, undefined, {
        shallow: true,
      });
    }
  }, [currentChapter]);

  const chapterItems = chapters.map((value, index) => {
    const type = value.cover.slice(-3);
    const ifPdf = type === 'pdf' || type === '{DF';
    const activeChapter = index + 1 === currentChapter;
    return (
      <div
        key={value._id + index}
        className={cn(styles.itemChapters, activeChapter && styles.activeChapter)}
        onClick={() => setCurrentChapter(index + 1)}>
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
              url: `https://mangafy.club/api/v2/uploads/${images[0]}`,
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
        />
        <div className={styles.menu}>
          <div className={styles.imagesContainer}>{images}</div>
          <p className={styles.shareDescription}>
            Share this series and show support for the creator!
          </p>
          <ShareButtons className={styles.shareButtons} shareUrl={shareUrl} />
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
        </div>
        <div className={styles.footer}>
          <div className={styles.chaptersItems}>{chapterItems}</div>
          <div className={styles.paginationContainer}>
            <Pagination
              currentNumber={currentChapter}
              setCurrentNumber={setCurrentChapter}
              data={chapters}
            />
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
};

MangaView.defaultProps = {
  user: {},
  getNameViewUrl: '',
};

export default MangaView;
