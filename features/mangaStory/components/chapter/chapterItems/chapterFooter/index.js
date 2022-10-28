import React, { useEffect, useRef, useState, useMemo } from 'react';

import { Popover } from 'antd';
import SvgMobileMenu from 'components/icon/MobileMenu';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import getDeviceId from 'utils/deviceId';
import beforeUploadFromAMZ from 'utils/upload';

import ChapterModal from './chapterModal';
import ModalPublishedChapter from './modalPublishedChapter';
import { notification } from 'antd';
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
  chapterListVisible,
  setChapterListVisible,
}) => {
  const [publish, setPublish] = useState(!!value.published);
  const [mangaUrl, setMangaUrl] = useState([]);
  const [openPublishedModal, setOpenPublishedModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const publishedRef = useRef(null);
  const [deviceId, setDeviceId] = useState('');

  const hasPages = useMemo(() => value?.pages?.some((item) => !!item.imageUrl), [value]);

  useEffect(() => {
    publishedRef.current.checked = value?.published;
    getDeviceId(setDeviceId);
  }, []);

  useEffect(() => {
    const chapterPublished = chapters.some((item) => item.published);

    if (!chapterPublished) {
      setOpenPublishedModal(true);
    } else {
      setOpenPublishedModal(false);
    }
  }, [publish]);

  useEffect(() => {
    setMangaUrl();
    setPublish(value.published);
    if (value.published && !hasPages) {
      publishedRef.current.checked = false;
      setPublish(false);
      publishedChapter();
    }
  }, [chapters]);

  const upgradeChapterData = (item, resultId) =>
    chapters.map((val) => (val?._id === resultId ? item : val));

  const publishedChapter = async () => {
    const publishedValue = publishedRef.current.checked;
    setPublish(publishedValue);

    if (publishedValue && !hasPages) {
      publishedRef.current.checked = false;
      setPublish(false);
      return notification.error({
        message: 'Please upload at least one page before publishing',
        placement: 'bottomLeft',
      });
    }

    await mangaStoryAPI.chapter.patch(
      value?._id,
      { published: publishedValue, mangaStoryId: storyBoard.mangaStoryId },
      upgradeChapterData,
      () => {},
      setChapters,
      (res) => {
        const dataEvent = [
          {
            event_properties: { chapter: value },
          },
        ];

        if (res.published) {
          setIsModalVisible(true);
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
      }
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
      <Popover
        placement="topLeft"
        content={
          <ChapterModal
            value={value}
            pages={pages}
            index={index}
            setChapterListVisible={setChapterListVisible}
            upgradeChapterData={upgradeChapterData}
            setEdit={setEdit}
            setChapters={setChapters}
            chapters={chapters}
            storyBoard={storyBoard}
            beforeUploadFromAMZ={beforeUploadFromAMZ}
            mangaUrl={mangaUrl}
          />
        }
        visible={chapterListVisible._id === value?._id && chapterListVisible.state}
        trigger="click">
        <SvgMobileMenu
          onClick={() => setChapterListVisible({ state: true, _id: value?._id })}
          width="20px"
          height="20px"
        />
      </Popover>
      {openPublishedModal && (
        <ModalPublishedChapter
          index={index}
          isModalVisible={isModalVisible}
          setOpenPublishedModal={setOpenPublishedModal}
          setIsModalVisible={setIsModalVisible}
          baseData={baseData}
          storyBoard={storyBoard}
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
  setStoryBoard: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  user: PropTypes.object,
  baseData: PropTypes.object.isRequired,
  chapterListVisible: PropTypes.object.isRequired,
  setChapterListVisible: PropTypes.func.isRequired,
};

ChapterFooter.defaultProps = {
  user: {},
};

export default ChapterFooter;
