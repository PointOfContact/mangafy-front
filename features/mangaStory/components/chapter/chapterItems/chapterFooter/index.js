import React, { useEffect, useRef, useState } from 'react';

import { notification, Popover, Upload } from 'antd';
import cn from 'classnames';
import SvgMobileMenu from 'components/icon/MobileMenu';
import Popconfirm from 'components/popconfirm';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import Router from 'next/router';
import PropTypes from 'prop-types';
import beforeUploadFromAMZ from 'utils/upload';

import styles from './styles.module.scss';

const ChapterFooter = ({ value, setChapters, index, chapters, setEdit, storyBoard, pages }) => {
  const [publish, setPublish] = useState(false);
  const [mangaUrl, setMangaUrl] = useState([]);
  const publishedRef = useRef(null);

  useEffect(() => {
    publishedRef.current.checked = value?.published;
  }, []);

  useEffect(() => {
    setMangaUrl(value?.pages?.some((item) => !!item.imageUrl === true));
  }, [chapters]);

  const showView = value.published && (!!storyBoard?.mangaUrls?.length || mangaUrl);

  const viewClick = () => {
    const publishedChapters = chapters.filter((e) => e.published);
    const chapterIndex = publishedChapters.findIndex(({ order }) => order === value.order);
    Router.push(`/manga-view/${storyBoard?._id}?chapter=${chapterIndex + 1}`);
  };
  const setStoryBoardCallback = (e) => {
    const getLastOrder = pages[pages.length - 1].order;
    const data = {
      storyBoard: storyBoard._id,
      title: 'Untitled page',
      order: getLastOrder,
      imageUrl: e,
      chapterId: value._id,
    };
    mangaStoryAPI.pages.createPage(index, chapters, setChapters, () => {}, data);
  };

  function beforeUpload(file) {
    return new Promise((resolve) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'application/pdf';

      if (!isJpgOrPng) {
        notification.error({
          message: 'You can only upload JPG, JPEG, PDF or PNG file!',
          placement: 'bottomLeft',
        });
      }

      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        notification.error({
          message: 'You can only upload JPG, JPEG, PDF or PNG file!',
          placement: 'bottomLeft',
        });
      }

      if (isLt2M && isJpgOrPng) beforeUploadFromAMZ(file, setStoryBoardCallback, resolve);

      return isJpgOrPng && isLt2M;
    });
  }

  const content = () => (
    <div className={styles.menuChapter}>
      {showView ? <p onClick={viewClick}>View</p> : ''}
      <p
        onClick={() => {
          setEdit(value._id);
        }}>
        Rename
      </p>
      <p>
        <Upload
          name="avatar"
          listType="picture-card"
          className={cn('avatar-uploader', styles.upload)}
          multiple
          showUploadList={false}
          beforeUpload={beforeUpload}>
          Upload
        </Upload>
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
  pages: PropTypes.array.isRequired,
};

export default ChapterFooter;
