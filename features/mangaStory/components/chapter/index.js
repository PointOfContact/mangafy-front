import React, { useEffect, useRef, useState } from 'react';

import { Form } from 'antd';
import SvgAdd from 'components/icon/Add';
import PrimaryInput from 'components/ui-elements/input';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import ChapterItems from './chapterItems';
import styles from './styles.module.scss';

const Chapter = ({ storyBoard, setStoryBoard }) => {
  const [chapters, setChapters] = useState(storyBoard?.chapters);
  const [chapterName, setChapterName] = useState('');
  const [createChapter, setCreateChapter] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const inputRef = useRef(null);
  const validate = chapterName.trim().length < 2;

  useEffect(() => {
    createChapter &&
      inputRef.current.focus({
        cursor: 'end',
      });
  }, [createChapter]);

  useEffect(() => {
    setChapters(storyBoard?.chapters);
  }, [storyBoard]);

  const error = validate && onBlur && (
    <p className={styles.error}>
      Please enter a name for your chapter. You can leave it blank if you want
    </p>
  );

  const onFinish = () => {
    if (validate) {
      setOnBlur(true);
      return;
    }
    mangaStoryAPI.chapter.create(
      chapterName,
      storyBoard,
      chapters,
      setCreateChapter,
      setChapters,
      chapters?.length + 1
    );
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.selectContainer}>
        <PrimaryButton className={styles.published} isWhite={true} text={'Published'} />
        <PrimaryButton isWhite={true} text={'Last modified'} />
      </div> */}
      {
        <ChapterItems
          chapters={chapters}
          setChapters={setChapters}
          storyBoard={storyBoard}
          setStoryBoard={setStoryBoard}
        />
      }
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
                  validate
                    ? setCreateChapter(false)
                    : mangaStoryAPI.chapter.create(
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
    </div>
  );
};

Chapter.propTypes = {
  storyBoard: PropTypes.object.isRequired,
  setStoryBoard: PropTypes.func.isRequired,
};

export default Chapter;
