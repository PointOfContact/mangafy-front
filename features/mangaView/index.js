import React from 'react';

import client from 'api/client';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MangaView = ({ user, storyBoardId, mangaUrls }) => {
  const clearPdfFromMangaUrls = mangaUrls.filter((value) => value.slice(-3) !== 'pdf');

  const images = clearPdfFromMangaUrls.map((value) => (
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
        title={`MangaFY is happy to introduce my latest graphic novel project, entitled manga view.`}
        description="MangaFY is an easy to use application that features tools for
                   authors who wish to create manga and comics for digital publication"
        canonical={`${client.API_ENDPOINT}/manga-view/${storyBoardId}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/manga-view/${storyBoardId}`,
          title: `MangaFY is happy to introduce my latest graphic novel project, entitled manga view.`,
          description:
            'MangaFY is an easy to use application that features tools for ' +
            'authors who wish to create manga and comics for digital publication',
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
          shareUrl={`${client.API_ENDPOINT}/manga-view/${storyBoardId}`}
        />
        {images}
      </div>
      <Footer user={user} />
      <FooterPolicy />
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
