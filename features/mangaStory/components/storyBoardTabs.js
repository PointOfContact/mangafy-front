import React, { useState, useEffect, useCallback } from 'react';

import { Tabs, Button } from 'antd';
import { findStoryBoard } from 'api/storyBoardClient';
import { ChooseLayout } from 'components/chooseLayout';
import FindPartner from 'components/findPartner';
import Hero from 'components/Hero';
import ComicBookSvg from 'components/icon/ComicBook';
import DocumentsSvg from 'components/icon/Documents';
import GroupSvg from 'components/icon/Group';
import PencilCaseSvg from 'components/icon/PencilCase';
import ShareSvg from 'components/icon/Share';
import SuperHeroSvg from 'components/icon/Superhero';
import Idea from 'components/Idea';
import { ModalSuccess } from 'components/modalSuccess';
import ProjectScripts from 'components/projectScripts';
import { ShareStoryBoard } from 'components/shareStoryBoard';
import Upload from 'components/ui-elements/upload';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import useWindowSize from 'utils/useWindowSize';

import styles from '../styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
const { TabPane } = Tabs;

const StoryBoardTabs = ({ user, mangaStory, openNotification, originUrl }) => {
  const [storyBoardActiveTab, setStoryBoardActiveTab] = useState(1);
  const { width } = useWindowSize();

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
      case '4':
        myEvent = EVENTS.TEMPLATES_COMPLETED;
        break;
      case '5':
        myEvent = EVENTS.PROJECT_UPLOADED;
        break;
      case '6':
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
      case 'choose-layout':
        setStoryBoardActiveTab('4');
        break;
      case 'upload':
        setStoryBoardActiveTab('5');
        break;
      case 'share-story-board':
        setStoryBoardActiveTab('6');
        break;
      default:
        setStoryBoardActiveTab('1');
    }
  }, []);

  return (
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
          <FindPartner />
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
          <FindPartner />
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
          <FindPartner />
          <ProjectScripts
            pages={storyBoard?.pages}
            storyBoardId={storyBoard?._id}
            storyBoard={storyBoard}
            setStoryBoard={setStoryBoard}
          />
          {renderNavigationButtons(!storyBoard?.pages?.length)}
        </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <ComicBookSvg width="25px" />
          </span>
        }
        key={4}>
        {isShowAnimation && <span className={styles.showAnimation}></span>}
        <div className={styles.tabContent}>
          <FindPartner />
          <ChooseLayout storyBoard={storyBoard} setStoryBoard={setStoryBoard} />
          {renderNavigationButtons(!storyBoard?.layoutId)}
        </div>
      </TabPane>
      <TabPane
        disabled={!storyBoard?.layoutId}
        tab={
          <span>
            <PencilCaseSvg width="25px" />
          </span>
        }
        key={5}>
        {isShowAnimation && <span className={styles.showAnimation}></span>}
        <div className={styles.tabContent}>
          <FindPartner />
          <Upload
            className={styles.upload}
            storyBoardId={storyBoard?._id}
            onUploadSuccess={onUploadSuccess}
            mangaUrl={storyBoard?.mangaUrl}
          />
          {renderNavigationButtons(!storyBoard?.mangaUrl)}
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
        key={6}>
        {isShowAnimation && <span className={styles.showAnimation}></span>}
        <div className={styles.tabContent}>
          <FindPartner />
          {isModalVisible ? (
            <ModalSuccess isModalVisible={isModalVisible} handleCancelModal={handleCancelModal} />
          ) : (
            <ShareStoryBoard shareUrl={originUrl} />
          )}
          {renderNavigationButtons()}
        </div>
      </TabPane>
    </Tabs>
  );
};

StoryBoardTabs.propTypes = {
  user: PropTypes.object.isRequired,
  mangaStory: PropTypes.object.isRequired,
  openNotification: PropTypes.func.isRequired,
  originUrl: PropTypes.string,
};

StoryBoardTabs.defaultProps = {
  originUrl: '',
};

export default StoryBoardTabs;
