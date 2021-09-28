import React, { useState } from 'react';

import Modal from 'antd/lib/modal/Modal';
import client from 'api/client';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import PrimaryButton from 'components/ui-elements/button';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Preview = ({ uploadImages, storyBoardId, mangaStoryTitle }) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const clearPdf = uploadImages?.filter((value) => value.uid?.slice(-3) !== 'pdf');

  const previewPhotos = clearPdf?.map((value) => (
    <div key={value} className={styles.images}>
      <Imgix layout="fill" src={value.url} alt="mangaFy preview photos" />
    </div>
  ));

  const redirectMangaFyPage = () => {
    Router.push(`/manga-view/${storyBoardId}`);
  };

  const shareContent = (className) => (
    <div className={cn(styles.shareContainer, className)}>
      <p className={styles.shareTitle}>Share</p>
      <ShareButtons
        className={styles.shareButPreview}
        shareUrl={`${client.API_ENDPOINT}/manga-view/${storyBoardId}`}
      />
    </div>
  );

  return (
    <div className={styles.headerUpload}>
      <PrimaryButton className={styles.previewButton} text="View" onClick={redirectMangaFyPage} />
      <PrimaryButton
        className={styles.previewButton}
        text="Preview"
        onClick={() => setShowPreviewModal(true)}
      />
      <Modal
        className={styles.modal}
        closeIcon={
          <span className={styles.close}>
            <SvgClose height="18px" width="18px" />
          </span>
        }
        visible={showPreviewModal}
        onCancel={() => setShowPreviewModal(false)}
        footer={[]}>
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
                url: `${client.API_ENDPOINT}/api/v2/uploads/${
                  clearPdf[0] ? clearPdf[0].url : 'http://mangafy.club/img/indexMobSec3.webp'
                }`,
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
        <div className={styles.card_wrap}>
          <div className={styles.containerTitle}>
            <h1>PREVIEW</h1>
            <p>Time to see what you already have</p>
          </div>
          {shareContent()}
          <p className={styles.projectName}>{mangaStoryTitle}</p>
          <div className={styles.imagesContainer}>{previewPhotos}</div>
          {shareContent(!previewPhotos?.length && styles.bottomShare)}
        </div>
      </Modal>
    </div>
  );
};

Preview.propTypes = {
  uploadImages: PropTypes.array.isRequired,
  storyBoardId: PropTypes.string.isRequired,
  mangaStoryTitle: PropTypes.string.isRequired,
};

export default Preview;
