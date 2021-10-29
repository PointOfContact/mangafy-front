import React, { useEffect, useRef, useState } from 'react';

import SvgAdd from 'components/icon/Add';
import SvgPurplePencil from 'components/icon/PurplePencil';
import PrimaryInput from 'components/ui-elements/input';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import Pages from '../pages';
import ModalCreatePage from './modalCreatePage';
import styles from './styles.module.scss';

const ChapterItems = ({ chapters, setChapters, storyBoard }) => {
  const [editName, setEditName] = useState('');
  const [mouseOut, onMouseOut] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [chapterItem, setChapterItem] = useState({});
  const [modalTitle, setModalTitle] = useState('Create page');
  const inputRef = useRef(null);
  const [edit, setEdit] = useState('');
  const validate = editName.trim().length < 2;

  useEffect(() => {
    // open input get data
    !!edit &&
      inputRef.current.focus({
        cursor: 'end',
      });
  }, [edit]);

  const upgradeChapterData = (item, resultId) =>
    chapters.map((value) => (value?._id === resultId ? item : value));

  const error = editName.trim().length < 2 && mouseOut && (
    <p className={styles.error}>
      Please enter a name for your chapter. You can leave it blank if you want
    </p>
  );

  return (
    <>
      {chapters?.map((value, index) => (
        <div key={value?._id} className={styles.chapterContainer}>
          <div className={styles.addPageContainer}>
            <div className={styles.titleContainer}>
              {edit === value?._id ? (
                <div className={styles.inputNameContainer}>
                  <PrimaryInput
                    inputRef={inputRef}
                    value={editName}
                    placeholder="Chapter name"
                    className={styles.chapterNameInput}
                    onChange={(e) => setEditName(e.target.value)}
                    onMouseOut={() => onMouseOut(true)}
                    onBlur={() => {
                      validate
                        ? setEdit(false)
                        : mangaStoryAPI.chapter.patch(
                            value?._id,
                            setEdit,
                            editName,
                            upgradeChapterData,
                            setChapters
                          );
                    }}
                  />
                  {error}
                </div>
              ) : (
                <div
                  onClick={() => {
                    setEdit(value?._id);
                    onMouseOut(false);
                    setEditName(value?.title);
                  }}
                  className={styles.chapterName}>
                  <h2 className={styles.chapterTitle}>{value?.title}</h2>
                  <SvgPurplePencil width={25} height={25} />
                </div>
              )}
            </div>

            <div
              className={styles.addPage}
              onClick={() => {
                setVisibleModal(true);
                setChapterItem({ value, index });
                setModalTitle('Create page');
              }}>
              <h3>New Page</h3>
              <SvgAdd width={50} height={50} />
            </div>
          </div>
          <Pages
            pages={value?.pages}
            setVisibleModal={setVisibleModal}
            setModalTitle={setModalTitle}
          />
        </div>
      ))}

      <ModalCreatePage
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        storyBoard={storyBoard}
        setChapters={setChapters}
        chapters={chapters}
        chapterItem={chapterItem}
        pages={chapterItem?.value?.pages}
        modalTitle={modalTitle}
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
