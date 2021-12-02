import React, { useEffect, useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import FooterPolicy from 'components/footer-policy';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import Pagination from 'components/ui-elements/pagination';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
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
  userName,
  participants,
}) => {
  const router = useRouter();
  const currentChapterNumber = +router.query.chapter;
  const [currentChapter, setCurrentChapter] = useState(currentChapterNumber);
  const [images, setImages] = useState([]);

  console.log(userName, participants, 'participants');

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
    router.push(
      `http://localhost:3000/manga-view/${storyBoardId}?chapter=${currentChapter}`,
      undefined,
      { shallow: true }
    );
  }, [currentChapter]);

  const chapterItems = chapters.map((value, index) => {
    const type = value.cover.slice(-3);
    const ifPdf = type === 'pdf' || type === '{DF';
    const activeChapter = index + 1 === currentChapter;
    return (
      <div
        className={cn(styles.itemChapters, activeChapter && styles.activeChapter)}
        key={value._id + index}
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
    <div key={value + index} className={styles.participantsContainer}>
      <Imgix
        width={50}
        height={50}
        src={client.UPLOAD_URL + value.avatar}
        alt={'MangaFy participants image'}
      />
    </div>
  ));

  return (
    <>
      <NextSeo
        title={`MangaFY is happy to introduce my latest graphic novel project, entitled ${mangaStoryTitle}.`}
        description="MangaFY is an easy to use application that features tools for
                   authors who wish to create manga and comics for digital publication"
        canonical={`${client.API_ENDPOINT}/manga-view/${storyBoardId}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/manga-view/${storyBoardId}`,
          title: `MangaFY is happy to introduce my latest graphic novel project, entitled ${mangaStoryTitle}.`,
          description:
            'MangaFY is an easy to use application that features tools for ' +
            'authors who wish to create manga and comics for digital publication',
          images: [
            {
              url: `${client.API_ENDPOINT}/api/v2/uploads/${images[0]}`,
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
        />
        <div className={styles.menu}>
          <div className={styles.imagesContainer}>{images}</div>
          <p className={styles.shareDescription}>
            Share this series and show support for the creator!
          </p>
          <ShareButtons
            className={styles.shareButtons}
            shareUrl={`${client.API_ENDPOINT}/manga-view/${storyBoardId}`}
          />
          {/* <div className={styles.userData}>
            <p className={styles.shareDescription}>{userName}</p>
            {participantItems}
          </div> */}
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
  userName: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
};

MangaView.defaultProps = {
  user: {},
};

export default MangaView;
