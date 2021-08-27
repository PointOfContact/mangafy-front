import React from 'react';

import client from 'api/client';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MangaView = ({ user, storyBoardId, mangaUrls }) => {
  const clearPdfFromMangaUrls = mangaUrls.filter((value) => value.slice(-3) !== 'pdf');

  const images = clearPdfFromMangaUrls.map((value, index) => (
    <div className={styles.containerImages} key={value}>
      <Imgix
        layout="fill"
        src={`${client.API_ENDPOINT}/api/v2/uploads/${value}`}
        alt="Mangafy preview images"
      />
    </div>
  ));

  return (
    <>
      <NextSeo
        title="Manga View"
        description="View all images of storyboard"
        canonical={`http://mangafy.club/manga-view/${storyBoardId}`}
        openGraph={{
          url: `http://mangafy.club/manga-view/${storyBoardId}`,
          title: 'Manga View',
          description: 'View all images of storyboard',
          images: [
            {
              url: `${client.API_ENDPOINT}/api/v2/uploads/${clearPdfFromMangaUrls[0]}`,
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
      <Header user={user} />
      <div className={styles.containerPreview}>
        <ShareButtons
          className={styles.shareButPreview}
          shareUrl={`http://mangafy.club/manga-view/${storyBoardId}`}
        />
        {images}
      </div>
      <Footer user={user} />
      <FooterPolicy />
      <FooterLogin />
    </>
  );
};

MangaView.propTypes = {
  user: PropTypes.object,
  storyBoardId: PropTypes.string.isRequired,
  mangaUrls: PropTypes.array.isRequired,
};

MangaView.defaultProps = {
  user: {},
};

export default MangaView;
