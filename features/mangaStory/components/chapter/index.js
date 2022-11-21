import React, { useEffect, useRef, useState } from 'react';

import { Form } from 'antd';
import SvgAdd from 'components/icon/Add';
import PrimaryInput from 'components/ui-elements/input';
import mangaStoryClient from 'api/mangaStoryClient';
import PropTypes from 'prop-types';

import ChapterItems from './chapterItems';
import styles from './styles.module.scss';

const Chapter = ({ storyBoard, setStoryBoard, chapters, setChapters, user, baseData }) => {
  const [chapterName, setChapterName] = useState('');
  const [createChapter, setCreateChapter] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const inputRef = useRef(null);
  const validateMin = chapterName.trim().length < 2;
  const validateMax = chapterName.trim().length > 30;

  useEffect(() => {
    createChapter &&
      inputRef?.current?.focus({
        cursor: 'end',
      });
    setOnBlur(false);
  }, [createChapter]);

  const error = validateMin ? (
    <p className={styles.error}>
      Please enter a name for your chapter. You can leave it blank if you want
    </p>
  ) : (
    validateMax &&
    onBlur && (
      <p className={styles.error}>The title of a chapter can contain maximum 64 characters.</p>
    )
  );

  const onFinish = () => {
    if (validateMin || validateMax) {
      setOnBlur(true);
      return;
    }

    console.log({
      chapterName,
      storyBoard,
      chapters,
      setCreateChapter,
      setChapters,
      chapterNumber: (chapters.length || 0) + 1,
    });

    mangaStoryClient.chapter.create(
      chapterName,
      storyBoard,
      chapters,
      setCreateChapter,
      setChapters,
      chapters?.length + 1
    );
  };

  return (
    <>
      <div className={styles.addChaptersContainer}>
        {createChapter ? (
          <Form
            name="chapterCreate"
            initialValues={{
              chapterName: 'Untitled Chapter',
            }}
            onFinish={onFinish}>
            <Form.Item name="chapterName">
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
                  validateMin || validateMax
                    ? setCreateChapter(false)
                    : mangaStoryClient.chapter.create(
                        chapterName,
                        storyBoard,
                        chapters,
                        setCreateChapter,
                        setChapters,
                        chapters?.length + 1
                      );
                }}
              />
            </Form.Item>
            {error}
          </Form>
        ) : (
          <div
            className={styles.addChapter}
            onClick={() => {
              setCreateChapter(true);
              setChapterName(`Untitled Chapter`);
            }}>
            <SvgAdd width={50} height={50} />
            Add Chapter
          </div>
        )}
      </div>
      <div className={styles.container}>
        <ChapterItems
          chapters={chapters}
          setChapters={setChapters}
          storyBoard={storyBoard}
          setStoryBoard={setStoryBoard}
          user={user}
          baseData={baseData}
        />
      </div>
    </>
  );
};

Chapter.propTypes = {
  storyBoard: PropTypes.object.isRequired,
  setStoryBoard: PropTypes.func.isRequired,
  chapters: PropTypes.array,
  setChapters: PropTypes.func.isRequired,
  user: PropTypes.object,
  baseData: PropTypes.object.isRequired,
};

Chapter.defaultProps = {
  user: {},
  chapters: [],
};

export default Chapter;
