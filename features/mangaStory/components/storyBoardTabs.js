import React, { useState, useEffect } from 'react';

import { Tabs } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Hero from 'components/Hero';
import SvgChapter from 'components/icon/Chapter';
import GroupSvg from 'components/icon/Group';
import PencilCaseSvg from 'components/icon/PencilCase';
import ShareSvg from 'components/icon/Share';
import SuperHeroSvg from 'components/icon/Superhero';
import Idea from 'components/Idea';
import Modal from 'components/modals/createTaskModal';
import ShowImgModal from 'components/modals/showImg';
import Upload from 'components/ui-elements/upload';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import myAmplitude from 'utils/amplitude';
import useWindowSize from 'utils/useWindowSize';

import styles from '../styles.module.scss';
import Chapter from './chapter';
import DragDrop from './dragDrop';
import Preview from './preview';
import Publish from './publish';

const { TabPane } = Tabs;
const pageArray = ['', 'plot', 'characters', 'chapters', 'publish'];

const StoryBoardTabs = ({
  user,
  openNotification,
  originUrl,
  setStage,
  participentsInfo,
  baseData,
  setBaseData,
  storyBoard,
  getStoryBoard,
  setStoryBoard,
  setCurrentPage,
}) => {
  const [storyBoardActiveTab, setStoryBoardActiveTabSeter] = useState(1);
  const [showTaskModal, changeShowTaskModal] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [zoomImageUrl, setZoomImageUrl] = useState(null);
  const [ifUploadImg, setIfUploadImg] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chapters, setChapters] = useState(storyBoard?.chapters);
  const [isShowAnimation, setIsShowAnimation] = useState(false);
  const routerBasePath = `/project/production/${baseData?._id}?tab=create&page=`;
  const imageType = zoomImageUrl?.slice(-3) === 'pdf' || zoomImageUrl?.slice(-3) === 'PDF';

  useEffect(() => {
    setChapters(storyBoard?.chapters);
  }, [storyBoard]);

  const { width } = useWindowSize();

  const setStoryBoardActiveTab = (tab) => {
    setStoryBoardActiveTabSeter(tab);

    switch (tab.toString()) {
      case '1':
        setStage({
          tab,
        });
        break;
      case '2':
        setStage({
          tab,
        });
        break;
      case '3':
        setStage({
          tab,
        });
        break;
      case '4':
        setStage({
          tab,
        });
        break;
      case '5':
        setStage({
          tab,
        });
        break;
      default:
        setStage({
          tab,
        });
    }
  };

  useEffect(() => {
    getStoryBoard();
  }, [user, getStoryBoard]);

  const query = qs.parse(location.search);

  useEffect(() => {
    setIsShowAnimation(true);
    const pageNumber = !!storyBoard?.mangaUrls?.length ? 5 : 4;
    let myEvent = '';
    const { page } = query;

    switch (page) {
      case 'plot':
        myEvent = EVENTS.PILOT_COMPLETED;
        setStoryBoardActiveTab('1');
        break;
      case 'characters':
        myEvent = EVENTS.CHARACTERS_COMPLETED;
        setStoryBoardActiveTab('2');
        break;
      case 'chapters':
        myEvent = EVENTS.PROJECT_CHAPTER;
        setStoryBoardActiveTab('3');
        break;
      case 'upload':
        myEvent = EVENTS.PROJECT_UPLOADED;
        setStoryBoardActiveTab('4');
        break;
      case 'publish':
        myEvent = EVENTS.PROJECT_PUBLISHED;
        setStoryBoardActiveTab(pageNumber);
        break;
      default:
        break;
    }

    const data = [
      {
        event_type: myEvent,
      },
    ];

    myAmplitude(data);
    storyBoard?.mangaUrls?.length && pageArray.splice(4, 0, 'upload');
  }, []);

  const updateTasks = async () => {
    const jwt = client.getCookie('feathers-jwt');
    const { default: api } = await import('api/restClient');
    api
      .service('/api/v2/tasks')
      .find({
        query: {
          mangaStoryId: baseData?._id,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        const newBaseData = {
          ...baseData,
          tasks: response.data,
        };
        setBaseData(newBaseData);
      })
      .catch((err) => err);
  };

  const tabsOnChange = (activeKey) => {
    Router.push(`${routerBasePath}${pageArray[activeKey]}`, undefined, { shallow: true });
    setCurrentPage(pageArray[activeKey]);
    setStoryBoardActiveTab(activeKey);
  };

  return (
    <>
      <Tabs
        activeKey={storyBoardActiveTab.toString()}
        defaultActiveKey={1}
        className={`${styles.storyBoardTab} storyBoardTabs`}
        type="line"
        onChange={tabsOnChange}
        tabPosition={width < 992 ? 'bottom' : 'left'}
      >
        <TabPane
          tab={
            <span className={styles.tab}>
              <GroupSvg fill="#7b65f3" width="25px" />
              <p>Plot</p>
            </span>
          }
          key={1}
        >
          <div className={styles.tabContent}>
            <Idea storyBoard={storyBoard} user={user} />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span className={styles.tab}>
              <SuperHeroSvg width="25px" />
              <p>Characters</p>
            </span>
          }
          key={2}
        >
          <div className={styles.tabContent}>
            <Hero
              storyBoard={storyBoard}
              setStoryBoard={setStoryBoard}
              getStoryBoard={getStoryBoard}
              user={user}
            />
          </div>
        </TabPane>

        <TabPane
          tab={
            <span className={cn(styles.chapterIcon, styles.tab)}>
              <SvgChapter height="25px" />
              <p>Chapters</p>
            </span>
          }
          key={3}
        >
          <Chapter
            storyBoard={storyBoard}
            setStoryBoard={setStoryBoard}
            chapters={chapters}
            setChapters={setChapters}
            user={user}
            baseData={baseData}
          />
        </TabPane>

        {!!storyBoard?.mangaUrls?.length && (
          <TabPane
            tab={
              <span className={styles.tab}>
                <PencilCaseSvg width="25px" />
                <p>Upload</p>
              </span>
            }
            key={4}
          >
            <div className={styles.tabContent}>
              <div className={styles.uploadPhotoContainer}>
                <div className={styles.uploadListContainer}>
                  <div className={styles.card_wrap}>
                    {!!uploadImages.length && (
                      <DragDrop
                        uploadImages={uploadImages}
                        storyBoard={storyBoard}
                        setStoryBoard={setStoryBoard}
                        openNotification={openNotification}
                        setZoomImageUrl={setZoomImageUrl}
                        setIsModalVisible={setIsModalVisible}
                        ifUploadImg={ifUploadImg}
                        isModalVisible={isModalVisible}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={
                    !!uploadImages.length ? styles.uploadContainerDef : styles.uploadContainer
                  }
                >
                  {!!uploadImages.length && (
                    <Preview
                      uploadImages={uploadImages}
                      storyBoardId={storyBoard?._id}
                      mangaStoryTitle={baseData?.title}
                    />
                  )}
                  <Upload
                    storyBoardId={storyBoard?._id}
                    mangaUrl={storyBoard?.mangaUrl}
                    setStoryBoard={setStoryBoard}
                    mangaUrls={storyBoard?.mangaUrls}
                    setUploadImages={setUploadImages}
                    showText={false}
                    className={styles.upload}
                    ifUploadImg={ifUploadImg}
                    mangaStoryId={baseData._id}
                    setIfUploadImg={setIfUploadImg}
                  />
                  <ShowImgModal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    img={zoomImageUrl}
                    imageType={imageType}
                  />
                </div>
              </div>
            </div>
          </TabPane>
        )}
        <TabPane
          tab={
            <span className={styles.tab}>
              <ShareSvg height="25px" />
              <p>Publish</p>
            </span>
          }
          key={storyBoard?.mangaUrls?.length ? 5 : 4}
        >
          {isShowAnimation && <span className={styles.showAnimation}></span>}
          <div className={styles.tabContent}>
            <Publish baseData={baseData} storyBoard={storyBoard} chapters={chapters} />
          </div>
        </TabPane>
      </Tabs>
      <Modal
        user={user}
        baseData={baseData}
        changeShowModal={changeShowTaskModal}
        task={null}
        showModal={showTaskModal}
        updateTasks={updateTasks}
      />
    </>
  );
};

StoryBoardTabs.propTypes = {
  user: PropTypes.object.isRequired,
  openNotification: PropTypes.func.isRequired,
  setStage: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  setBaseData: PropTypes.func,
  originUrl: PropTypes.string,
  participentsInfo: PropTypes.array,
  getStoryBoard: PropTypes.func,
  setStoryBoard: PropTypes.func,
  storyBoard: PropTypes.object,
  setCurrentPage: PropTypes.func,
};

StoryBoardTabs.defaultProps = {
  originUrl: '',
  setBaseData: () => {},
  storyBoard: {},
  getStoryBoard: () => {},
  setStoryBoard: () => {},
  participentsInfo: [],
  setCurrentPage: () => {},
};

export default StoryBoardTabs;
