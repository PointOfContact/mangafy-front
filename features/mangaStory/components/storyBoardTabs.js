import React, { useState, useEffect } from 'react';

import { Tabs, Button } from 'antd';
import { findStoryBoard } from 'api/storyBoardClient';
import { ChooseLayout } from 'components/chooseLayout';
import Hero from 'components/Hero';
import ComicBookSvg from 'components/icon/ComicBook';
import DocumentsSvg from 'components/icon/Documents';
import EditSvg from 'components/icon/Edit';
import GroupSvg from 'components/icon/Group';
import PencilCaseSvg from 'components/icon/PencilCase';
import ShareSvg from 'components/icon/Share';
import SuperHeroSvg from 'components/icon/Superhero';
import Idea from 'components/Idea';
import { ModalSuccess } from 'components/modalSuccess';
import ProjectScripts from 'components/projectScripts';
import { ShareStoryBoard } from 'components/shareStoryBoard';
import Upload from 'components/ui-elements/upload';
import PropTypes from 'prop-types';
import useWindowSize from 'utils/useWindowSize';

import styles from '../styles.module.scss';

const { TabPane } = Tabs;

const StoryBoardTabs = ({ user, mangaStory }) => {
  const [storyBoardActiveTab, setStoryBoardActiveTab] = useState(1);
  const { width } = useWindowSize();

  const renderNavigationButtons = () => (
    <div className={styles.actionButtons}>
      {+storyBoardActiveTab > 1 && (
        <Button type="primary" onClick={clickBack}>
          Back
        </Button>
      )}
      {+storyBoardActiveTab < 7 && (
        <Button type="primary" onClick={clickNext}>
          Next
        </Button>
      )}
    </div>
  );
  const clickBack = () => {
    const nextTab = +storyBoardActiveTab - 1;
    setStoryBoardActiveTab(nextTab);
  };
  const clickNext = () => {
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

  useEffect(() => {
    getStoryBoard();
  }, []);

  const getStoryBoard = () => {
    if (!user) return;
    findStoryBoard(
      user._id,
      mangaStory._id,
      (res) => {
        setStoryBoard(res?.data[0]);
      },
      (err) => {}
    );
  };

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
          <Idea storyBoard={storyBoard} />
          {renderNavigationButtons()}
        </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <SuperHeroSvg width="25px" />
          </span>
        }
        key={2}>
        <Hero storyBoard={storyBoard} setStoryBoard={setStoryBoard} />
        {renderNavigationButtons()}
      </TabPane>
      <TabPane
        tab={
          <span>
            <DocumentsSvg width="25px" />
          </span>
        }
        key={3}>
        <div className={styles.tabContent}>
          <ProjectScripts  pages={storyBoard.pages} storyBoardId={storyBoard._id}/>
          {renderNavigationButtons()}
        </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <ComicBookSvg width="25px" />
          </span>
        }
        key={4}>
        <div className={styles.tabContent}>
          <ChooseLayout storyBoard={storyBoard}/>
          {renderNavigationButtons()}
        </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <PencilCaseSvg width="25px" />
          </span>
        }
        key={5}>
        <div className={styles.tabContent}>
          <Upload />
          {renderNavigationButtons()}
        </div>
      </TabPane>
      <TabPane
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
      </TabPane>
      <TabPane
        tab={
          <span>
            <ShareSvg height="25px" />
          </span>
        }
        key={7}>
        <div className={styles.tabContent}>
          <ShareStoryBoard />
          {renderNavigationButtons()}
        </div>
      </TabPane>
    </Tabs>
  );
};

StoryBoardTabs.propTypes = {
  user: PropTypes.object.isRequired,
  mangaStory: PropTypes.object.isRequired,
};

export default StoryBoardTabs;
