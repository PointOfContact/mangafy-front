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
import getDeviceId from 'utils/deviceId';
import beforeUploadFromAMZ from 'utils/upload';

import ModalPublishedChapter from './modalPublishedChapter';
import styles from './styles.module.scss';

const ChapterFooter = ({
  value,
  setChapters,
  index,
  chapters,
  setEdit,
  storyBoard,
  setStoryBoard,
  pages,
  user,
  baseData,
}) => {
  const [publish, setPublish] = useState(!!value.published);
  const [mangaUrl, setMangaUrl] = useState([]);
  const [indexChapterView, setIndexChapterView] = useState(1);
  const [openPublishedModal, setOpenPublishedModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const publishedRef = useRef(null);
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    publishedRef.current.checked = value?.published;
    getDeviceId(setDeviceId);
  }, []);

  useEffect(() => {
    const chapterPublished = chapters.some((item) => item.published);

    if (!chapterPublished) {
      setOpenPublishedModal(!chapterPublished);
    }
  }, [publish]);

  useEffect(() => {
    setMangaUrl(value?.pages?.some((item) => !!item.imageUrl === true));
    setPublish(value.published);
  }, [chapters]);

  const showView = value.published && (!!value?.pages.length || mangaUrl);

  const viewClick = () => {
    const publishedChapters = chapters.filter((e) => e.published);
    const chapterIndex = publishedChapters.findIndex(({ order }) => order === value.order);
    setIndexChapterView(chapterIndex + 1);
  };

  const uploadImage = (e) => {
    const data = {
      chapterImg: e,
    };
    mangaStoryAPI.chapter.patch(value._id, data, upgradeChapterData, setEdit, setChapters);
  };

  const createPage = (e, count) => {
    const data = {
      storyBoard: storyBoard._id,
      title: 'Untitled page',
      order: value.pages.length + 1,
      imageUrl: e,
      chapterId: value._id,
    };

    mangaStoryAPI.pages.createPage(index, chapters, setChapters, () => {}, data);
  };

  function beforeUpload(pagesArray, file, fileList, callback) {
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

      return isJpgOrPng && isLt2M;
    });
  }

  const addPages = () => {
    const data = [
      {
        event_type: EVENTS.ADDING_PAGES,
        event_properties: { chapterId: value._id, storyBoardId: storyBoard._id },
      },
    ];
    myAmplitude(data);
  };

  const addChapterCover = () => {
    const data = [
      {
        event_type: EVENTS.ADD_CHAPTER_COVER,
        event_properties: { chapterId: value._id, storyBoardId: storyBoard._id },
      },
    ];
    myAmplitude(data);
  };

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

  const upgradeChapterData = (item, resultId) =>
    chapters.map((val) => (val?._id === resultId ? item : val));

  const publishedChapter = async () => {
    const publishedValue = publishedRef.current.checked;
    setPublish(publishedValue);

    await mangaStoryAPI.chapter.patch(
      value?._id,
      { published: publishedValue },
      upgradeChapterData,
      () => {},
      setChapters
    );

    const dataEvent = [
      {
        event_properties: { chapter: value },
      },
    ];

    if (publishedValue) {
      setIsModalVisible(true);
      setOpenPublishedModal(false);
      dataEvent[0].event_type = EVENTS.PUBLISHED_CHAPTER;
    } else {
      dataEvent[0].event_type = EVENTS.DRAFT_CHAPTER;
    }

    myAmplitude(dataEvent);

    const updateChapter = chapters.map((val, i) => {
      if (i === index) {
        val.published = publishedValue;
        return val;
      }
      return val;
    });

    setStoryBoard({ ...storyBoard, chapters: updateChapter });
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
      {openPublishedModal && (
        <ModalPublishedChapter
          index={index}
          isModalVisible={isModalVisible}
          setOpenPublishedModal={setOpenPublishedModal}
          setIsModalVisible={setIsModalVisible}
          baseData={baseData}
        />
      )}
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
  setStoryBoard: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  user: PropTypes.object,
  baseData: PropTypes.object.isRequired,
};

ChapterFooter.defaultProps = {
  user: {},
};

export default ChapterFooter;
