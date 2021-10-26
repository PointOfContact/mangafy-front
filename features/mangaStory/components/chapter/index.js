import React, { useEffect, useRef, useState } from 'react';

import SvgAdd from 'components/icon/Add';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import ChapterItems from './chapterItems';
import styles from './styles.module.scss';

const Chapter = ({ storyBoard }) => {
  const [chapters, setChapters] = useState(storyBoard?.chapters);
  const [chapterName, setChapterName] = useState('');
  const [createChapter, setCreateChapter] = useState(false);
  const [lengthChapters, setLengthChapters] = useState(chapters?.length);
  const [onBlur, setOnBlur] = useState(false);
  const inputRef = useRef(null);
  const validate = chapterName.trim().length < 2;

  useEffect(() => {
    createChapter &&
      inputRef.current.focus({
        cursor: 'end',
      });
  }, [createChapter]);

  const error = validate && onBlur && (
    <p className={styles.error}>
      Please enter a name for your chapter. You can leave it blank if you want
    </p>
  );

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <PrimaryButton className={styles.published} isWhite={true} text={'Published'} />
        <PrimaryButton isWhite={true} text={'Last modified'} />
      </div>
      {<ChapterItems chapters={chapters} setChapters={setChapters} storyBoard={storyBoard} />}
      <div className={styles.addChaptersContainer}>
        {createChapter ? (
          <>
            <PrimaryInput
              inputRef={inputRef}
              value={chapterName}
              placeholder="Chapter name"
              className={styles.chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              onMouseOut={() => {
                setOnBlur(true);
              }}
              onBlur={() => {
                validate
                  ? (setLengthChapters(lengthChapters - 1), setCreateChapter(false))
                  : mangaStoryAPI.chapter.create(
                      chapterName,
                      storyBoard,
                      chapters,
                      setCreateChapter,
                      setChapters,
                      lengthChapters
                    );
              }}
            />
            {error}
          </>
        ) : (
          <div
            className={styles.addChapter}
            onClick={() => {
              setCreateChapter(true);
              setLengthChapters(lengthChapters + 1);
              setChapterName(`Chapter ${lengthChapters + 1}`);
            }}>
            <SvgAdd width={50} height={50} />
            Add Chapter
          </div>
        )}
      </div>
    </div>
  );
};

Chapter.propTypes = {
  storyBoard: PropTypes.object.isRequired,
};

export default Chapter;
