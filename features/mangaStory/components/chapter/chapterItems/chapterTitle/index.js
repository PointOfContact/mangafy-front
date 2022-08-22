import React, { useState } from 'react';

import { Form } from 'antd';
import PrimaryInput from 'components/ui-elements/input';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ChapterTitle = ({ value, chapters, storyBoard, setChapters, edit, setEdit, index }) => {
  const [mouseOut, onMouseOut] = useState(false);
  const [editName, setEditName] = useState(value?.title);
  const validate = editName?.trim()?.length < 2;

  const error = validate && mouseOut && (
    <p className={styles.error}>
      Please enter a name for your chapter. You can leave it blank if you want
    </p>
  );

  const upgradeChapterData = (item, resultId) =>
    chapters.map((val) => (val?._id === resultId ? item : val));

  const onFinish = () => {
    if (validate) {
      onMouseOut(true);
      return;
    }
    mangaStoryAPI.chapter.patch(
      value?._id,
      { title: editName, mangaStoryId: storyBoard.mangaStoryId },
      upgradeChapterData,
      setEdit,
      setChapters
    );
  };

  return (
    <div className={styles.titleContainer}>
      {edit === value?._id ? (
        <div className={styles.inputNameContainer}>
          <Form
            name="chapterTitle"
            onFinish={onFinish}
            initialValues={{
              title: value?.title,
            }}>
            <Form.Item name={'title'}>
              <PrimaryInput
                value={editName}
                maxLength={30}
                autoFocus={true}
                isFieldTouched={() => true}
                placeholder="Chapter name"
                className={styles.chapterNameInput}
                onChange={(e) => setEditName(e.target.value)}
                onMouseOut={() => {
                  onMouseOut(true);
                }}
                onBlur={() => {
                  validate
                    ? setEdit('')
                    : mangaStoryAPI.chapter.patch(
                        value?._id,
                        { title: editName, mangaStoryId: storyBoard.mangaStoryId },
                        upgradeChapterData,
                        setEdit,
                        setChapters
                      );
                }}
              />
            </Form.Item>
          </Form>
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
          <h2 className={styles.chapterTitle}>
            #{index + 1} | {value?.title}
          </h2>
        </div>
      )}
    </div>
  );
};

ChapterTitle.propTypes = {
  value: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
  setChapters: PropTypes.func.isRequired,
  storyBoard: PropTypes.object,
  edit: PropTypes.string.isRequired,
  setEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

ChapterTitle.defaultProps = {
  storyBoard: {},
};

export default ChapterTitle;
