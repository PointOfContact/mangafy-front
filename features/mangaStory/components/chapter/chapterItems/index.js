import React, { useEffect, useRef, useState } from 'react';

import SvgAdd from 'components/icon/Add';
import SvgPurplePencil from 'components/icon/PurplePencil';
import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import chapterApi from '../chapterApi';
import Pages from '../pages';
import styles from './styles.module.scss';

const ChapterItems = ({ chapters, setChapters }) => {
  const [editName, setEditName] = useState('');
  const [mouseOut, onMouseOut] = useState(false);
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

  const renameData = (item, resultId) =>
    chapters.map((value) => (value?._id === resultId ? item : value));

  const error = editName.trim().length < 2 && mouseOut && (
    <p className={styles.error}>Chapter name should be min 2 characters</p>
  );

  return chapters.map((value) => (
    <div key={value?._id} className={styles.chapterContainer}>
      <div className={styles.addPageContainer}>
        <div className={styles.titleContainer}>
          {edit === value?._id ? (
            <div className={styles.inputNameContainer}>
              <PrimaryInput
                inputRef={inputRef}
                value={editName}
                placeHolder="Chapter name"
                className={styles.chapterNameInput}
                onChange={(e) => setEditName(e.target.value)}
                onMouseOut={() => onMouseOut(true)}
                onBlur={() => {
                  validate
                    ? setEdit(false)
                    : chapterApi.patch(value?._id, setEdit, editName, renameData, setChapters);
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

        <div className={styles.addPage}>
          <h3>New Page</h3>
          <SvgAdd width={50} height={50} />
        </div>
      </div>
      <Pages pages={value?.pages} />
    </div>
  ));
};

ChapterItems.propTypes = {
  chapters: PropTypes.array.isRequired,
  setChapters: PropTypes.func.isRequired,
};

export default ChapterItems;
