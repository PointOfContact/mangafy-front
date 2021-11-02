import React, { useState } from 'react';

import client from 'api/client';
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

  const pagesArray = pages?.map((value, index) => {
    const imageType = value?.imageUrl?.slice(-3) === 'pdf' || pages?.imageUrl?.slice(-3) === 'PDF';
    const image = !!value.imageUrl
      ? client.UPLOAD_URL + value.imageUrl
      : 'https://mangafy.club/img/collab_baner.webp';

    return (
      <div key={value?._id}>
        <div className={styles.itemPage}>
          <div
            className={styles.content}
            onClick={() => {
              setVisibleModal(true);
              setModalTitle('Edit page');
              setPageItem({ value, index });
              setChapterItem({ value: chapterItem, index: chapterIndex });
            }}>
            <h2>{value.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: value.text }} />
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
          <div
            className={styles.pageImage}
            onClick={() => !!value?.imageUrl && setIsModalVisible(true)}>
            {imageType ? (
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
        </div>
        <ShowImgModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          img={image}
          imageType={imageType}
        />
      </div>
    );
  });

  return <div className={styles.containerPage}>{pagesArray}</div>;
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
