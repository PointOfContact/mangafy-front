import React, { useState } from 'react';

import client from 'api/client';
import FooterPolicy from 'components/footer-policy';
import Imgix from 'components/imgix';
import Pagination from 'components/ui-elements/pagination';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import ViewHeader from './viewHeader';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const MangaView = ({ user, storyBoardId, mangaUrls, mangaStoryId, mangaStoryTitle, chapters }) => {
  const [currentChapter, setCurrentChapter] = useState(1);

  const images = mangaUrls?.map((value) => {
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
        <div className={styles.imagesContainer}>{images}</div>
        <div className={styles.footer}>
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
};

MangaView.defaultProps = {
  user: {},
};

export default MangaView;
