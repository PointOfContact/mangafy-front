import React, { useEffect, useRef, useState } from 'react';

import SvgAdd from 'components/icon/Add';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import chapterApi from './chapterApi';
import ChapterItems from './chapterItems';
import styles from './styles.module.scss';

const Chapter = ({ storyBoard }) => {
  const [chapters, setChapters] = useState(storyBoard?.chapters);
  const [chapterName, setChapterName] = useState('');
  const [createChapter, setCreateChapter] = useState(false);
  const [lengthChapters, setLengthChapters] = useState(chapters.length);
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
    <p className={styles.error}>Chapter name should be min 2 characters</p>
  );

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <PrimaryButton className={styles.published} isWhite={true} text={'Published'} />
        <PrimaryButton isWhite={true} text={'Last modified'} />
      </div>
      {<ChapterItems chapters={chapters} setChapters={setChapters} />}
      <div className={styles.addChaptersContainer}>
        {createChapter ? (
          <>
            <PrimaryInput
              inputRef={inputRef}
              value={chapterName}
              placeHolder="Chapter name"
              className={styles.chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              onBlur={() => {
                chapterApi.create(
                  chapterName,
                  storyBoard,
                  chapters,
                  setCreateChapter,
                  setChapters,
                  validate
                );
                setOnBlur(true);
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
