import React, { useEffect, useRef, useState } from 'react';

import { Popover } from 'antd';
import SvgMobileMenu from 'components/icon/MobileMenu';
import Popconfirm from 'components/popconfirm';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ChapterFooter = ({
  value,
  setChapters,
  index,
  chapters,
  setEdit,
  storyBoard,
  setStoryBoard,
}) => {
  const [publish, setPublish] = useState(false);
  const [mangaUrl, setMangaUrl] = useState([]);
  const publishedRef = useRef(null);

  useEffect(() => {
    publishedRef.current.checked = value?.published;
  }, []);

  useEffect(() => {
    setMangaUrl(value?.pages?.some((item) => !!item.imageUrl === true));
  }, [chapters]);

  const showView = value?.published && (!!storyBoard?.mangaUrls.length || mangaUrl);

  const content = () => (
    <div className={styles.menuChapter}>
      {showView ? <p onClick={() => Router.push(`/manga-view/${storyBoard?._id}`)}>View</p> : ''}
      <p
        onClick={() => {
          setEdit(value._id);
        }}>
        Rename
      </p>

      <Popconfirm
        overlayClassName={styles.popConfirm}
        position={'right'}
        title="Are you sure to delete this chapter"
        onConfirm={() => {
          mangaStoryAPI.chapter.delete(value._id, index, chapters, setChapters);
        }}
        item={<p>Delete</p>}
      />
    </div>
  );

  const upgradeChapterData = (item, resultId) =>
    chapters.map((val) => (val?._id === resultId ? item : val));

  const publishedChapter = () => {
    const publishedValue = publishedRef.current.checked;
    setPublish(publishedValue);

    mangaStoryAPI.chapter.patch(
      value?._id,
      { published: publishedValue },
      upgradeChapterData,
      () => {},
      setChapters
    );
  };

  return (
    <div className={styles.chapterItemFooter}>
      <div className={styles.switchContainer}>
        <ToggleSwitch
          onChange={publishedChapter}
          inputRef={publishedRef}
          className={styles.switch}
          value={value.published}
        />
        {publish ? 'Published' : 'Draft'}
      </div>
      <Popover placement="topLeft" content={content(value, index)} trigger="click">
        <SvgMobileMenu width="20px" height="20px" />
      </Popover>
    </div>
  );
};

ChapterFooter.propTypes = {
  value: PropTypes.object.isRequired,
  setChapters: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  chapters: PropTypes.array.isRequired,
  setEdit: PropTypes.func.isRequired,
  storyBoard: PropTypes.object.isRequired,
  setStoryBoard: PropTypes.func.isRequired,
};

export default ChapterFooter;
