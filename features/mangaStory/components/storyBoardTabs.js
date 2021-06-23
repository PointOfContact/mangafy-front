import React, { useState, useEffect, useCallback } from 'react';

import { Tabs, Button, Popconfirm } from 'antd';
import client from 'api/client';
import { findStoryBoard, patchStoryBoard } from 'api/storyBoardClient';
import FindPartner from 'components/findPartner';
import Hero from 'components/Hero';
import SvgAdd2 from 'components/icon/Add2';
import SvgDelete from 'components/icon/Delete';
import DocumentsSvg from 'components/icon/Documents';
import GroupSvg from 'components/icon/Group';
import PencilCaseSvg from 'components/icon/PencilCase';
import ShareSvg from 'components/icon/Share';
import SuperHeroSvg from 'components/icon/Superhero';
import Idea from 'components/Idea';
import Imgix from 'components/imgix';
import Modal from 'components/modals/createTaskModal';
import ShowImgModal from 'components/modals/showImg';
import { ModalSuccess } from 'components/modalSuccess';
import PDFViewer from 'components/pdfViewer';
import ProjectScripts from 'components/projectScripts';
import { ShareStoryBoard } from 'components/shareStoryBoard';
import PrimaryButton from 'components/ui-elements/button';
import Upload from 'components/ui-elements/upload';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import useWindowSize from 'utils/useWindowSize';

import styles from '../styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
const { TabPane } = Tabs;

const StoryBoardTabs = ({
  user,
  mangaStory,
  openNotification,
  originUrl,
  setStage,
  participentsInfo,
  baseData,
  setBaseData,
}) => {
  const [storyBoardActiveTab, setStoryBoardActiveTabSeter] = useState(1);
  const [showTaskModal, changeShowTaskModal] = useState(false);
  const [getUploadImages, setUploadImages] = useState([]);
  const [zoomImageUrl, setZoomImageUrl] = useState(null);
  const { width } = useWindowSize();

  const setStoryBoardActiveTab = (tab) => {
    setStoryBoardActiveTabSeter(tab);
    switch (tab.toString()) {
      case '1':
        setStage({
          tab,
          title: 'THE SETTING',
          description:
            'Every good story begins with an idea. This part should include the concept, location, and synopses',
        });
        break;
      case '2':
        setStage({
          tab,
          title: 'THE CHARACTERS',
          description:
            'To get the reader engaged, a good cast must be included. Add full bios of your characters',
        });
        break;
      case '3':
        setStage({
          tab,
          title: 'SCRIPT',
          description:
            'Add a full comic strip/5 pages/a volume/arc or full script of your comic book or novel',
        });
        break;
      case '4':
        setStage({
          tab,
          title: 'DIGITAL ILLUSTRATION',
          description:
            'Got the story and plot down, now bring life to your characters and add visualization (characters, strips, pages, etc.)',
        });
        break;
      case '5':
        setStage({
          tab,
          title: 'UPLOAD YOUR DIGITAL WORK',
          description: 'Upload your volume, arc, or novel',
        });
        break;
      case '6':
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowAnimation, setIsShowAnimation] = useState(false);

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
        {+storyBoardActiveTab < 6 && (
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
        platform: 'WEB',
        event_type: myEvent,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
    setIsShowAnimation(true);
    setTimeout(() => {
      setIsShowAnimation(false);
    }, 3000);
    const nextTab = +storyBoardActiveTab + 1;
    setStoryBoardActiveTab(nextTab);
  };
  const [storyBoard, setStoryBoard] = useState({
    idea: {
      title: '',
      text: '',
    },
    pages: [],
    heroes: [],
    author: [],
    layouts: [],
  });

  const getStoryBoard = useCallback(() => {
    if (!user) return;
    findStoryBoard(
      user._id,
      mangaStory._id,
      (res) => {
        setStoryBoard(res?.data[0]);
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  }, [user, mangaStory?._id, openNotification]);

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
          mangaStoryId: baseData._id,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        const newBaisData = {
          ...baseData,
          tasks: response.data,
        };
        setBaseData(newBaisData);
      })
      .catch((err) => err);
  };

  const addNewbuttons = (
    <div className={styles.addNewbuttons}>
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

  const ifPdf = (index) =>
    storyBoard?.mangaUrls[index]?.slice(-3) === 'pdf' ||
    storyBoard?.mangaUrls[index]?.slice(-3) === 'PDF';

  const confirmDelete = (index) => {
    storyBoard.mangaUrls.splice(index, 1);
    patchStoryBoard(
      storyBoard?._id,
      {
        mangaUrls: [...storyBoard.mangaUrls],
      },
      (response) => {
        setStoryBoard(response);
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  };
  const listUploadPhoto = getUploadImages.map((value, index) => (
    <div className={styles.uploadList} key={index}>
      <div className={styles.uploadListTitle}>Page {index + 1}</div>
      <div
        className={styles.uploadPhoto}
        onClick={() => {
          if (ifPdf(index)) {
            setZoomImageUrl(<PDFViewer url={client.UPLOAD_URL + storyBoard?.mangaUrls[index]} />);
            setIsModalVisible(!isModalVisible);
          } else {
            setZoomImageUrl(value.url);
            setIsModalVisible(!isModalVisible);
          }
        }}>
        {ifPdf(index) ? (
          <Imgix
            width={58}
            height={58}
            layout="fixed"
            src="https://mangafy.club/img/pdf.webp"
            alt="Manga story cover"
          />
        ) : (
          <img className={styles.photo} src={value.url} alt="" />
        )}
      </div>
      <Popconfirm
        overlayClassName={styles.popConfirm}
        placement="topLeft"
        title={'Are you sure to delete this page?'}
        onConfirm={() => {
          confirmDelete(index);
        }}
        okText="Yes"
        cancelText="No">
        <span className={styles.deleteCard}>
          <SvgDelete width="12px" height="12px" />
        </span>
      </Popconfirm>
    </div>
  ));

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
            {addNewbuttons}
            <Idea storyBoard={storyBoard} setStoryBoard={setStoryBoard} />
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
            {addNewbuttons}
            <Hero
              storyBoard={storyBoard}
              setStoryBoard={setStoryBoard}
              getStoryBoard={getStoryBoard}
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
            {addNewbuttons}
            <ProjectScripts
              pages={storyBoard?.pages}
              storyBoardId={storyBoard?._id}
              storyBoard={storyBoard}
              setStoryBoard={setStoryBoard}
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
            {addNewbuttons}
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
            {addNewbuttons}
            <div className={styles.uploadPhotoContainer}>
              <div className={styles.uploadListContainer}>
                <div className={styles.card_wrap}>
                  {!!getUploadImages.length && listUploadPhoto}
                </div>
              </div>
              <div
                className={
                  !!getUploadImages.length ? styles.uploadContainerDef : styles.uploadContainer
                }>
                <div className={styles.headerUpload} />
                <Upload
                  className={styles.upload}
                  storyBoardId={storyBoard?._id}
                  mangaUrl={storyBoard?.mangaUrl}
                  setStoryBoard={setStoryBoard}
                  mangaUrls={storyBoard?.mangaUrls}
                  setUploadImages={setUploadImages}
                  showText={false}
                />
                <ShowImgModal
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  img={zoomImageUrl}
                />
              </div>
            </div>
            {renderNavigationButtons(!getUploadImages.length)}
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
          disabled={!storyBoard?.mangaUrl}
          key={5}>
          {isShowAnimation && <span className={styles.showAnimation}></span>}
          <div className={styles.tabContent}>
            {addNewbuttons}
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
  mangaStory: PropTypes.object.isRequired,
  openNotification: PropTypes.func.isRequired,
  setStage: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  setBaseData: PropTypes.func,
  originUrl: PropTypes.string,
  participentsInfo: PropTypes.array,
};

StoryBoardTabs.defaultProps = {
  originUrl: '',
  setBaseData: () => {},
  participentsInfo: [],
};

export default StoryBoardTabs;
