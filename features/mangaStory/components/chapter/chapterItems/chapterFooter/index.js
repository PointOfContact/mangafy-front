import React, { useEffect, useRef, useState } from 'react';

import { notification, Popover, Upload } from 'antd';
import cn from 'classnames';
import SvgMobileMenu from 'components/icon/MobileMenu';
import Popconfirm from 'components/popconfirm';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import { EVENTS } from 'helpers/amplitudeEvents';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import beforeUploadFromAMZ from 'utils/upload';

import styles from './styles.module.scss';

const ChapterFooter = ({
  value,
  setChapters,
  index,
  chapters,
  setEdit,
  storyBoard,
  pages,
  user,
}) => {
  const [publish, setPublish] = useState(!!value.published);
  const [mangaUrl, setMangaUrl] = useState([]);
  const [indexChapterView, setIndexChapterView] = useState(1);
  const publishedRef = useRef(null);

  useEffect(() => {
    publishedRef.current.checked = value?.published;
  }, []);

  useEffect(() => {
    setMangaUrl(value?.pages?.some((item) => !!item.imageUrl === true));
    setPublish(value.published);
  }, [chapters]);

  const showView = value.published && (!!storyBoard?.mangaUrls?.length || mangaUrl);

  const viewClick = () => {
    const publishedChapters = chapters.filter((e) => e.published);
    const chapterIndex = publishedChapters.findIndex(({ order }) => order === value.order);
    setIndexChapterView(chapterIndex + 1);
  };

  const createPage = (e, count) => {
    const data = {
      storyBoard: storyBoard._id,
      title: 'Untitled page',
      order: count,
      imageUrl: e,
      chapterId: value._id,
    };
    mangaStoryAPI.pages.createPage(index, chapters, setChapters, () => {}, data);
  };

  function beforeUpload(pagesArray, file, fileList) {
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

      const getLastOrder = !!pagesArray.length ? pagesArray[pagesArray.length - 1].order + 1 : 20;

      const indexImage = fileList.findIndex((val) => val.uid === file.uid);

      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        notification.error({
          message: 'You can only upload JPG, JPEG, PDF or PNG file!',
          placement: 'bottomLeft',
        });
      }

      if (isLt2M && isJpgOrPng)
        beforeUploadFromAMZ(file, (e) => createPage(e, getLastOrder + indexImage), resolve);

      return isJpgOrPng && isLt2M;
    });
  }

  const content = () => (
    <div className={styles.menuChapter}>
      {showView ? (
        <Link href={`/manga-view/${storyBoard?._id}?chapter=${indexChapterView}`}>
          <a onClick={viewClick} target="_blank">
            View
          </a>
        </Link>
      ) : (
        ''
      )}
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
          beforeUpload={(file, fileList) => beforeUpload(pages, file, fileList)}>
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

    const dataEvent = [
      {
        event_properties: { chapter: value },
      },
    ];

    if (publishedValue) {
      dataEvent[0].event_type = EVENTS.PUBLISHED_CHAPTER;
    } else {
      dataEvent[0].event_type = EVENTS.DRAFT_CHAPTER;
    }

    myAmplitude(dataEvent);
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
  user: PropTypes.object,
};

ChapterFooter.defaultProps = {
  user: {},
};

export default ChapterFooter;
