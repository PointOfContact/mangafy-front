import React, { useState } from 'react';

import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import Imgix from 'components/imgix';
import PrimaryButton from 'components/ui-elements/button';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Preview = ({ uploadImages, storyBoardId }) => {
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
        <div className={styles.card_wrap}>{previewPhotos}</div>
      </Modal>
    </div>
  );
};

Preview.propTypes = {
  uploadImages: PropTypes.array.isRequired,
  storyBoardId: PropTypes.string.isRequired,
};

export default Preview;
