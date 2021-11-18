import React, { useEffect, useRef, useState } from 'react';

import SvgAdd from 'components/icon/Add';
import SvgMobileMenu from 'components/icon/MobileMenu';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import Pages from '../pages';
import ChapterHeader from './chapterHeader';
import ModalCreatePage from './modalCreatePage';
import styles from './styles.module.scss';

const ChapterItems = ({ chapters, setChapters, storyBoard }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [chapterItem, setChapterItem] = useState({});
  const [pageItem, setPageItem] = useState({});
  const [publish, setPublish] = useState(false);
  const [modalTitle, setModalTitle] = useState('Create page');
  const publishedRef = useRef(null);

  useEffect(() => {
    // publishedRef.current.checked = value?.published;
  }, []);

  const upgradeChapterData = (item, resultId) =>
    chapters.map((val) => (val?._id === resultId ? item : val));

  const publishedChapter = (value) => {
    const publishedValue = publishedRef.current.checked;
    setPublish(publishedValue);
    console.log(publishedValue);
    mangaStoryAPI.chapter.patch(
      value?._id,
      { published: publishedValue },
      upgradeChapterData,
      () => {},
      setChapters
    );
  };

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
              <div className={styles.addPage}>
                <h3>{value.title}</h3>
                <div
                  className={styles.newPageContainer}
                  onClick={() => {
                    setVisibleModal(true);
                    setChapterItem({ value, index });
                    setModalTitle('Create page');
                    setPageItem({});
                  }}>
                  <SvgAdd width={50} height={50} />
                  <h4>New Page</h4>
                </div>
                <div className={styles.chapterItemFooter}>
                  <div className={styles.switchContainer}>
                    <ToggleSwitch
                      onChange={() => publishedChapter(value)}
                      inputRef={publishedRef}
                      className={styles.switch}
                      value={value.published}
                    />
                    {publish ? 'Published' : 'Draft'}
                  </div>
                  <SvgMobileMenu width="20px" height="20px" />
                </div>
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
