import React, { useState } from 'react';

import client from 'api/client';
import SvgAdd from 'components/icon/Add';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import Pages from '../pages';
import ChapterFooter from './chapterFooter';
import ChapterTitle from './chapterTitle';
import ModalCreatePage from './modalCreatePage';
import styles from './styles.module.scss';

const ChapterItems = ({ chapters, setChapters, storyBoard, setStoryBoard, user, baseData }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [chapterItem, setChapterItem] = useState({});
  const [pageItem, setPageItem] = useState({});
  const [edit, setEdit] = useState('');
  const [modalTitle, setModalTitle] = useState('Create page');
  const [chapterListVisible, setChapterListVisible] = useState({});

  return (
    <div className={styles.container}>
      {chapters?.map((value, index) => (
        <div key={value._id} className={styles.chapterItem}>
          <div
            className={styles.addPageContainer}
            onMouseLeave={() => {
              setChapterListVisible({ state: false, _id: value?._id });
            }}>
            <div className={styles.addPage}>
              {value.chapterImg && (
                <Imgix
                  className={styles.chapterImg}
                  layout="fill"
                  src={client.UPLOAD_URL + value.chapterImg}
                  alt="MangaFy chapter img"
                />
              )}
              <ChapterTitle
                value={value}
                chapters={chapters}
                setChapters={setChapters}
                edit={edit}
                storyBoard={storyBoard}
                setEdit={setEdit}
                index={index}
              />
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
              <ChapterFooter
                value={value}
                setChapters={setChapters}
                index={index}
                chapters={chapters}
                setEdit={setEdit}
                storyBoard={storyBoard}
                setStoryBoard={setStoryBoard}
                pages={value.pages}
                user={user}
                baseData={baseData}
                chapterListVisible={chapterListVisible}
                setChapterListVisible={setChapterListVisible}
              />
            </div>
          </div>
          <div className={styles.chapterContainer}>
            <Pages
              pages={[...value?.pages]}
              setVisibleModal={setVisibleModal}
              setModalTitle={setModalTitle}
              setPageItem={setPageItem}
              setChapterItem={setChapterItem}
              chapterValue={value}
              chapterIndex={index}
              setChapters={setChapters}
              chapters={chapters}
              mangaId={baseData._id}
            />
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
    </div>
  );
};

ChapterItems.propTypes = {
  chapters: PropTypes.array,
  setChapters: PropTypes.func.isRequired,
  storyBoard: PropTypes.object.isRequired,
  setStoryBoard: PropTypes.func.isRequired,
  user: PropTypes.object,
  baseData: PropTypes.object.isRequired,
};

ChapterItems.defaultProps = {
  chapters: [],
  user: {},
};

export default ChapterItems;
