import React, { useState, useEffect } from 'react';

import { Tabs, Button } from 'antd';
import client from 'api/client';
import FindPartner from 'components/findPartner';
import Hero from 'components/Hero';
import SvgAdd2 from 'components/icon/Add2';
import DocumentsSvg from 'components/icon/Documents';
import GroupSvg from 'components/icon/Group';
import PencilCaseSvg from 'components/icon/PencilCase';
import ShareSvg from 'components/icon/Share';
import SuperHeroSvg from 'components/icon/Superhero';
import Idea from 'components/Idea';
import Modal from 'components/modals/createTaskModal';
import ShowImgModal from 'components/modals/showImg';
import { ModalSuccess } from 'components/modalSuccess';
import ProjectScripts from 'components/projectScripts';
import { ShareStoryBoard } from 'components/shareStoryBoard';
import PrimaryButton from 'components/ui-elements/button';
import Upload from 'components/ui-elements/upload';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import myAmplitude from 'utils/amplitude';
import useWindowSize from 'utils/useWindowSize';

import styles from '../styles.module.scss';
import DragDrop from './dragDrop';
import Preview from './preview';

const { TabPane } = Tabs;

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
}) => {
  const [storyBoardActiveTab, setStoryBoardActiveTabSeter] = useState(1);
  const [showTaskModal, changeShowTaskModal] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [zoomImageUrl, setZoomImageUrl] = useState(null);
  const [ifUploadImg, setIfUploadImg] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowAnimation, setIsShowAnimation] = useState(false);
  const imageType = zoomImageUrl?.slice(-3) === 'pdf' || zoomImageUrl?.slice(-3) === 'PDF';
  // const [storyBoard, setStoryBoard] = useState({
  //   idea: {
  //     title: '',
  //     text: '',
  //   },
  //   pages: [],
  //   heroes: [],
  //   author: [],
  //   layouts: [],
  // });

  const { width } = useWindowSize();

  const setStoryBoardActiveTab = (tab) => {
    setStoryBoardActiveTabSeter(tab);
    switch (tab.toString()) {
      case '1':
        setStage({
          tab,
          title: 'THE SETTING',
          description:
            "Every good story begins with an idea. This part should include your story's concept, genre, and synopsis.",
        });
        break;
      case '2':
        setStage({
          tab,
          title: 'BUILD YOUR CHARACTERS',
          description:
            'To get the reader engaged we need to build an awesome cast and world. Define your characters to kick off your tale.',
        });
        break;
      case '3':
        setStage({
          tab,
          title: 'SCRIPT',
          description:
            'Add full comic and manga script pages for an Arc, volume, or a full graphic novel',
        });
        break;
      // case '4':
      //   setStage({
      //     tab,
      //     title: 'DIGITAL ILLUSTRATION',
      //     description:
      //       'Got the story and plot down, now bring life to your characters and add visualization (characters, strips, pages, etc.)',
      //   });
      //   break;
      case '4':
        setStage({
          tab,
          title: 'UPLOAD YOUR DIGITAL WORK',
          description:
            'Upload illustration and exchange work files with your team - all in one hosting place.',
        });
        break;
      case '5':
        setStage({
          tab,
          title: 'PUBLISH',
          description:
            "Congratulations! you finalized your volume, arc or novel and now it's time to publish. Select one of MangaFY's self-publishing partners and start monetizing",
        });
        break;
      default:
        setStage({
          tab,
          title: 'THE SETTING',
          description:
            'Every good story begins with an idea. This part should include the concept, location, and synopses',
        });
    }
  };

  const showModal = () => {
    document.body.classList.add('body_remove_scroll');
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    document.body.classList.remove('body_remove_scroll');
    setIsModalVisible(false);
  };
  const renderNavigationButtons = (disableNextBtn = false) => (
    <div className={styles.actionButtons}>
      <div>
        {+storyBoardActiveTab > 1 && (
          <Button
            id="StoryBoardBacktBtnId"
            type="primary"
            className={styles.back}
            onClick={clickBack}>
            Back
          </Button>
        )}
        {+storyBoardActiveTab < 5 && (
          <Button
            id="StoryBoardNextBtnId"
            disabled={disableNextBtn}
            type="primary"
            onClick={clickNext}>
            Next {+storyBoardActiveTab + 1}
          </Button>
        )}
      </div>
      <p className={styles.see_more}>Use more features in the desktop version</p>
    </div>
  );
  const clickBack = () => {
    setIsShowAnimation(false);
    const nextTab = +storyBoardActiveTab - 1;
    setStoryBoardActiveTab(nextTab);
  };
  const clickNext = () => {
    let myEvent = '';
    switch (storyBoardActiveTab.toString()) {
      case '1':
        myEvent = EVENTS.PILOT_COMPLETED;
        break;
      case '2':
        myEvent = EVENTS.CHARACTERS_COMPLETED;
        break;
      case '3':
        myEvent = EVENTS.PAGES_COMPLETED;
        break;
      // case '4':
      //   myEvent = EVENTS.TEMPLATES_COMPLETED;
      //   break;
      case '4':
        myEvent = EVENTS.PROJECT_UPLOADED;
        break;
      case '5':
        myEvent = EVENTS.PROJECT_PUBLISHED;
        break;
      default:
    }

    const data = [
      {
        event_type: myEvent,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    myAmplitude(data);
    setIsShowAnimation(true);
    setTimeout(() => {
      setIsShowAnimation(false);
    }, 3000);
    const nextTab = +storyBoardActiveTab + 1;
    setStoryBoardActiveTab(nextTab);
  };

  useEffect(() => {
    getStoryBoard();
  }, [user, getStoryBoard]);

  const onUploadSuccess = () => {
    setTimeout(() => {
      setStoryBoardActiveTab(6);
      showModal();
    }, 2000);
  };

  useEffect(() => {
    const { storyTab } = qs.parse(location.search);
    switch (storyTab) {
      case 'idea':
        setStoryBoardActiveTab('1');
        break;
      case 'hero':
        setStoryBoardActiveTab('2');
        break;
      case 'project-scripts':
        setStoryBoardActiveTab('3');
        break;
      // case 'choose-layout':
      //   setStoryBoardActiveTab('4');
      //   break;
      case 'upload':
        setStoryBoardActiveTab('4');
        break;
      case 'share-story-board':
        setStoryBoardActiveTab('5');
        break;
      default:
        setStoryBoardActiveTab('1');
    }
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

  const addNewButtons = (
    <div className={styles.addNewButtons}>
      <FindPartner participentsInfo={participentsInfo} />
      <PrimaryButton
        onClick={() => changeShowTaskModal(true)}
        className={styles.addTask}
        text="Add a task"
        isPlump={true}
        isActive={true}
        items={[]}
        suffix={<SvgAdd2 width="25px" height="25px" />}
      />
    </div>
  );

  return (
    <>
      <Tabs
        activeKey={storyBoardActiveTab.toString()}
        defaultActiveKey={1}
        className={`${styles.storyBoardTab} storyBoardTabs`}
        type="line"
        onChange={(activeKey) => setStoryBoardActiveTab(activeKey)}
        tabPosition={width < 992 ? 'bottom' : 'left'}>
        <TabPane
          tab={
            <span>
              <GroupSvg fill="#7b65f3" width="25px" />
            </span>
          }
          key={1}>
          <div className={styles.tabContent}>
            {addNewButtons}
            <Idea storyBoard={storyBoard} setStoryBoard={setStoryBoard} user={user} />
            {renderNavigationButtons(!(storyBoard?.idea?.title && storyBoard?.idea?.text))}
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <SuperHeroSvg width="25px" />
            </span>
          }
          key={2}>
          {isShowAnimation && <span className={styles.showAnimation}></span>}
          <div className={styles.tabContent}>
            {addNewButtons}
            <Hero
              storyBoard={storyBoard}
              setStoryBoard={setStoryBoard}
              getStoryBoard={getStoryBoard}
              user={user}
            />
            {renderNavigationButtons()}
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <DocumentsSvg width="25px" />
            </span>
          }
          key={3}>
          {isShowAnimation && <span className={styles.showAnimation}></span>}
          <div className={styles.tabContent}>
            {addNewButtons}
            <ProjectScripts
              pages={storyBoard?.pages}
              storyBoardId={storyBoard?._id}
              storyBoard={storyBoard}
              setStoryBoard={setStoryBoard}
              user={user}
            />
            {renderNavigationButtons(!storyBoard?.pages?.length)}
          </div>
        </TabPane>
        {/* <TabPane
          tab={
            <span>
              <ComicBookSvg width="25px" />
            </span>
          }
          key={4}>
          {isShowAnimation && <span className={styles.showAnimation}></span>}
          <div className={styles.tabContent}>
            {addNewButtons}
            <ChooseLayout storyBoard={storyBoard} setStoryBoard={setStoryBoard} />
            {renderNavigationButtons(!storyBoard?.layoutId)}
          </div>
        </TabPane> */}
        <TabPane
          // disabled={!storyBoard?.layoutId}
          tab={
            <span>
              <PencilCaseSvg width="25px" />
            </span>
          }
          key={4}>
          {isShowAnimation && <span className={styles.showAnimation}></span>}
          <div className={styles.tabContent}>
            {addNewButtons}
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
                }>
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
            {renderNavigationButtons(!uploadImages.length)}
          </div>
        </TabPane>
        {/* <TabPane
        tab={
          <span>
            <EditSvg height="25px" />
          </span>
        }
        key={6}>
        <div className={styles.tabContent}>
          <ModalSuccess />
          {renderNavigationButtons()}
        </div>
      </TabPane> */}
        <TabPane
          tab={
            <span>
              <ShareSvg height="25px" />
            </span>
          }
          // disabled={!storyBoard?.mangaUrl}
          key={5}>
          {isShowAnimation && <span className={styles.showAnimation}></span>}
          <div className={styles.tabContent}>
            {addNewButtons}
            {isModalVisible ? (
              <ModalSuccess isModalVisible={isModalVisible} handleCancelModal={handleCancelModal} />
            ) : (
              <ShareStoryBoard user={user} shareUrl={originUrl} />
            )}
            {renderNavigationButtons()}
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
};

StoryBoardTabs.defaultProps = {
  originUrl: '',
  setBaseData: () => {},
  storyBoard: {},
  getStoryBoard: () => {},
  setStoryBoard: () => {},
  participentsInfo: [],
};

export default StoryBoardTabs;
