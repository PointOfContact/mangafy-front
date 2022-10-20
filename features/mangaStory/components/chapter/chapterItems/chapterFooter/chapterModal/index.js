import React, { useState } from 'react';

import { notification, Upload } from 'antd';
import cn from 'classnames';
import Popconfirm from 'components/popconfirm';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import { EVENTS } from 'helpers/amplitudeEvents';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const ChapterModal = ({
  value,
  pages,
  index,
  setChapterListVisible,
  upgradeChapterData,
  setEdit,
  setChapters,
  chapters,
  storyBoard,
  beforeUploadFromAMZ,
  mangaUrl,
}) => {
  const [indexChapterView, setIndexChapterView] = useState(1);

  const showView = value?.published && (!!value?.pages?.length || mangaUrl);

  const viewClick = () => {
    const publishedChapters = chapters?.filter((e) => e.published);
    const chapterIndex = publishedChapters.findIndex(({ order }) => order === value?.order);
    setIndexChapterView(chapterIndex + 1);
    setChapterListVisible({ state: false, _id: value?._id });
  };

  const uploadImage = (e) => {
    const data = {
      chapterImg: e,
      mangaStoryId: storyBoard.mangaStoryId,
    };
    mangaStoryAPI.chapter.patch(value._id, data, upgradeChapterData, setEdit, setChapters);
  };

  const createPage = (e, count) => {
    setChapterListVisible({ state: false, _id: value?._id });

    const data = {
      storyBoard: storyBoard?._id,
      title: 'Untitled page',
      order: count || value?.pages?.length + 1,
      imageUrl: e,
      chapterId: value?._id,
      mangaStoryId: storyBoard.mangaStoryId,
    };

    mangaStoryAPI.pages.createPage(index, chapters, setChapters, () => {}, data);
  };

  const addChapterCover = () => {
    const data = [
      {
        event_type: EVENTS.ADD_CHAPTER_COVER,
        event_properties: { chapterId: value?._id, storyBoardId: storyBoard?._id },
      },
    ];
    myAmplitude(data);
    setChapterListVisible({ state: false, _id: value?._id });
  };

  const addPages = () => {
    const data = [
      {
        event_type: EVENTS.ADDING_PAGES,
        event_properties: { chapterId: value?._id, storyBoardId: storyBoard?._id },
      },
    ];
    myAmplitude(data);
  };

  const beforeUpload = (pagesArray, file, fileList, callback) =>
    new Promise((resolve) => {
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
      const getLastOrder = !!pagesArray.length ? pagesArray[pagesArray.length - 1].order + 1 : 1;

      const indexImage = fileList.findIndex((val) => val.uid === file.uid);

      const isLt2M = file.size / 1024 / 1024 < 50;

      if (!isLt2M) {
        notification.error({
          message: 'You can only upload JPG, JPEG, PDF or PNG file!',
          placement: 'bottomLeft',
        });
      }

      if (isLt2M && isJpgOrPng)
        beforeUploadFromAMZ(file, (e) => callback(e, getLastOrder + indexImage), resolve);

      setChapterListVisible({ state: false, _id: value?._id });

      return isJpgOrPng && isLt2M;
    });

  return (
    <div className={styles.menuChapter}>
      {!!showView && (
        <Link href={`/project/view/${storyBoard?._id}?chapter=${indexChapterView}`}>
          <a onClick={viewClick} target="_blank">
            View
          </a>
        </Link>
      )}
      <p
        onClick={() => {
          setEdit(value._id);
          setChapterListVisible({ state: false, _id: value?._id });
        }}>
        Rename
      </p>
      <p onClick={addPages}>
        <Upload
          name="avatar"
          listType="picture-card"
          className={cn('avatar-uploader', styles.upload)}
          multiple
          showUploadList={false}
          beforeUpload={(file, fileList) => beforeUpload(pages, file, fileList, createPage)}>
          Upload pages
        </Upload>
      </p>
      <p onClick={addChapterCover}>
        <Upload
          name="chapterImg"
          listType="picture-card"
          className={cn('avatar-uploader', styles.upload)}
          showUploadList={false}
          beforeUpload={(file, fileList) => beforeUpload(pages, file, fileList, uploadImage)}>
          Upload cover
        </Upload>
      </p>
      <Popconfirm
        overlayClassName={styles.popConfirm}
        position={'right'}
        title="Are you sure to delete this chapter"
        onConfirm={() => {
          mangaStoryAPI.chapter.delete(value._id, index, chapters, setChapters, storyBoard);
        }}
        item={<p>Delete</p>}
      />
    </div>
  );
};

ChapterModal.propTypes = {
  value: PropTypes.object,
  pages: PropTypes.array,
  index: PropTypes.number,
  setChapterListVisible: PropTypes.func.isRequired,
  upgradeChapterData: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  setChapters: PropTypes.func.isRequired,
  chapters: PropTypes.array,
  storyBoard: PropTypes.object,
  beforeUploadFromAMZ: PropTypes.func.isRequired,
  mangaUrl: PropTypes.string.isRequired,
};

ChapterModal.defaultProps = {
  value: {},
  pages: [],
  index: 0,
  setChapterListVisible: () => {},
  upgradeChapterData: () => {},
  setEdit: () => {},
  setChapters: () => {},
  chapters: [],
  storyBoard: {},
  beforeUploadFromAMZ: () => {},
};

export default ChapterModal;
