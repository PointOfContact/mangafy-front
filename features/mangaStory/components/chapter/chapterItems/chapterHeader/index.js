import React, { useEffect, useRef, useState } from 'react';

import { Form } from 'antd';
import SvgDelete from 'components/icon/Delete';
import SvgPurplePencil from 'components/icon/PurplePencil';
import Popconfirm from 'components/popconfirm';
import PrimaryInput from 'components/ui-elements/input';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ChapterHeader = ({ value, setChapters, index, chapters }) => {
  const [mouseOut, onMouseOut] = useState(false);
  const [editName, setEditName] = useState('');
  const inputRef = useRef(null);
  const publishedRef = useRef();
  const [edit, setEdit] = useState('');
  const validate = editName.trim().length < 2;

  useEffect(() => {
    publishedRef.current.checked = value?.published;
  }, []);

  useEffect(() => {
    // open input get data
    !!edit &&
      inputRef.current.focus({
        cursor: 'end',
      });
  }, [edit]);

  const upgradeChapterData = (item, resultId) =>
    chapters.map((val) => (val?._id === resultId ? item : val));

  const error = editName.trim().length < 2 && mouseOut && (
    <p className={styles.error}>
      Please enter a name for your chapter. You can leave it blank if you want
    </p>
  );

  const publishedChapter = () => {
    const publishedValue = publishedRef.current.checked;
    mangaStoryAPI.chapter.patch(
      value?._id,
      { published: publishedValue },
      upgradeChapterData,
      setEdit,
      setChapters
    );
  };
  const onFinish = () => {
    setEdit('');
  };

  return (
    <div className={styles.titleContainer}>
      {edit === value?._id ? (
        <div className={styles.inputNameContainer}>
          <Form name="chapterTitle" onFinish={onFinish}>
            <Form.Item>
              <PrimaryInput
                inputRef={inputRef}
                value={editName}
                maxLength={30}
                placeholder="Chapter name"
                className={styles.chapterNameInput}
                onChange={(e) => setEditName(e.target.value)}
                onMouseOut={() => onMouseOut(true)}
                onBlur={() => {
                  validate
                    ? setEdit(false)
                    : mangaStoryAPI.chapter.patch(
                        value?._id,
                        { title: editName },
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
          <h2 className={styles.chapterTitle}>{value?.title}</h2>
          <SvgPurplePencil className={styles.editName} width={25} height={25} />
        </div>
      )}
      <div className={styles.headerAction}>
        <Popconfirm
          overlayClassName={styles.popConfirm}
          position={'right'}
          title="Are you sure to delete this chapter"
          onConfirm={() => {
            mangaStoryAPI.chapter.delete(value._id, index, chapters, setChapters);
          }}
          item={
            <span className={styles.deleteChapter}>
              <SvgDelete width={15} height={15} />
            </span>
          }
        />
        <ToggleSwitch onChange={publishedChapter} inputRef={publishedRef} />
      </div>
    </div>
  );
};

ChapterHeader.propTypes = {
  value: PropTypes.object.isRequired,
  setChapters: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  chapters: PropTypes.array.isRequired,
};

export default ChapterHeader;
