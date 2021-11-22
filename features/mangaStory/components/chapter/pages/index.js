import React, { useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import ShowImgModal from 'components/modals/showImg';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import SettingsPage from './settingsPage';
import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const Pages = ({
  pages,
  setVisibleModal,
  setModalTitle,
  setPageItem,
  setChapterItem,
  chapterItem,
  chapterIndex,
  setChapters,
  chapters,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const ifTypePdf = currentImg?.slice(-3) === 'pdf' || currentImg?.slice(-3) === 'PDF';

  const pagesArray = pages?.map((value, index) => {
    const ifPdf = value?.imageUrl?.slice(-3) === 'pdf' || pages?.imageUrl?.slice(-3) === 'PDF';
    const image = client.UPLOAD_URL + value.imageUrl;

    return (
      <div key={value?._id}>
        <div className={styles.itemPage}>
          <div
            className={cn(styles.content, !value?.imageUrl && styles.contentDef)}
            onClick={() => {
              setVisibleModal(true);
              setModalTitle('Edit page');
              setPageItem({ value, index });
              setChapterItem({ value: chapterItem, index: chapterIndex });
            }}>
            <h2>{value.title}</h2>
            <p
              dangerouslySetInnerHTML={{ __html: value.text }}
              className={cn(styles.description, styles.descriptionDef)}
            />
            <SettingsPage
              page={{ value, index }}
              setVisibleModal={setVisibleModal}
              setModalTitle={setModalTitle}
              setPageItem={() => setPageItem(value)}
              chapterItem={{ value: chapterItem, index: chapterIndex }}
              setChapters={setChapters}
              chapters={chapters}
            />
          </div>
          {!!value?.imageUrl && (
            <div
              className={styles.pageImage}
              onClick={() => !!value?.imageUrl && (setIsModalVisible(true), setCurrentImg(image))}>
              {ifPdf ? (
                <PDFViewer url={image} />
              ) : (
                <Imgix
                  className={styles.image}
                  layout="fill"
                  src={image}
                  alt={'MangaFy page image'}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.containerPage}>
      {pagesArray}
      <ShowImgModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        img={currentImg}
        imageType={ifTypePdf}
      />
    </div>
  );
};

Pages.propTypes = {
  pages: PropTypes.array,
  setVisibleModal: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
  setPageItem: PropTypes.func.isRequired,
  setChapterItem: PropTypes.func,
  chapterItem: PropTypes.object,
  setChapters: PropTypes.func,
  chapterIndex: PropTypes.number,
  chapters: PropTypes.array,
};

Pages.defaultProps = {
  pages: [],
  setChapterItem: () => {},
  chapterItem: {},
  setChapters: () => {},
  chapterIndex: 0,
  chapters: [],
};

export default Pages;
