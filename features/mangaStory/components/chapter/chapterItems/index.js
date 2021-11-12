import React, { useState } from 'react';

import SvgAdd from 'components/icon/Add';
import PropTypes from 'prop-types';

import Pages from '../pages';
import ChapterHeader from './chapterHeader';
import ModalCreatePage from './modalCreatePage';
import styles from './styles.module.scss';

const ChapterItems = ({ chapters, setChapters, storyBoard }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [chapterItem, setChapterItem] = useState({});
  const [pageItem, setPageItem] = useState({});
  const [modalTitle, setModalTitle] = useState('Create page');

  return (
    <>
      {chapters?.map((value, index) => (
        <div key={value._id}>
          <ChapterHeader
            value={value}
            setChapters={setChapters}
            index={index}
            chapters={chapters}
          />
          <div className={styles.chapterItem}>
            <div className={styles.addPageContainer}>
              <div
                className={styles.addPage}
                onClick={() => {
                  setVisibleModal(true);
                  setChapterItem({ value, index });
                  setModalTitle('Create page');
                  setPageItem({});
                }}>
                <h3>New Page</h3>
                <SvgAdd width={50} height={50} />
              </div>
            </div>
            <div className={styles.chapterContainer}>
              <Pages
                pages={value?.pages}
                setVisibleModal={setVisibleModal}
                setModalTitle={setModalTitle}
                setPageItem={setPageItem}
                setChapterItem={setChapterItem}
                chapterValue={value}
                chapterIndex={index}
                setChapters={setChapters}
                chapters={chapters}
              />
            </div>
          </div>
        </div>
      ))}

      <ModalCreatePage
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        storyBoard={storyBoard}
        setChapters={setChapters}
        chapters={chapters}
        chapterItem={chapterItem}
        pagesArray={chapterItem?.value?.pages}
        modalTitle={modalTitle}
        pageItem={pageItem}
      />
    </>
  );
};

ChapterItems.propTypes = {
  chapters: PropTypes.array.isRequired,
  setChapters: PropTypes.func.isRequired,
  storyBoard: PropTypes.object.isRequired,
};

export default ChapterItems;
