import React, { useRef, useState } from 'react';

import SvgAdd from 'components/icon/Add';
import SvgPurplePencil from 'components/icon/PurplePencil';
import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import chapterApi from '../chapterApi';
import Pages from '../pages';
import styles from './styles.module.scss';

const ChapterItems = ({ chapters, setChapters }) => {
  const [editName, setEditName] = useState('');
  const [onBlur, setOnBlur] = useState(false);
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const validate = editName.trim().length < 2;

  const renameData = (item, resultId) =>
    chapters.map((value) => (value?._id === resultId ? item : value));

  const error = editName.trim().length < 2 && onBlur && (
    <p className={styles.error}>Chapter name should be min 2 characters</p>
  );

  return chapters.map((value) => (
    <div key={value?._id} className={styles.chapterContainer}>
      <div className={styles.addPageContainer}>
        <div className={styles.titleContainer}>
          {edit ? (
            <div className={styles.inputNameContainer}>
              <PrimaryInput
                inputRef={inputRef}
                value={editName}
                placeHolder="Chapter name"
                className={styles.chapterNameInput}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={() => {
                  validate
                    ? setEdit(false)
                    : chapterApi.patch(value?._id, setEdit, editName, renameData, setChapters);
                  setOnBlur(true);
                }}
              />
              {error}
            </div>
          ) : (
            <div onClick={() => setEdit(true)} className={styles.chapterName}>
              <h2 className={styles.chapterTitle}>{value?.title}</h2>
              <SvgPurplePencil width={30} height={30} />
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
