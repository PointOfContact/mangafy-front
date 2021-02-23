import React, { useState, useEffect } from 'react';

import { Tabs, Button } from 'antd';
import { findStoryBoard } from 'api/storyBoardClient';
import { ChooseLayout } from 'components/chooseLayout';
import Hero, { HeroTypes } from 'components/Hero';
import ComicBookSvg from 'components/icon/ComicBook';
import DocumentsSvg from 'components/icon/Documents';
import EditSvg from 'components/icon/Edit';
import GroupSvg from 'components/icon/Group';
import PencilCaseSvg from 'components/icon/PencilCase';
import ShareSvg from 'components/icon/Share';
import SuperHeroSvg from 'components/icon/Superhero';
import Idea from 'components/Idea';
import { ModalSuccess } from 'components/modalSuccess';
import { ShareStoryBoard } from 'components/shareStoryBoard';
import Upload from 'components/ui-elements/upload';
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
  const addHero = (type) => {
    const newHero = {
      newCreated: true,
      name: '',
      description: '',
      imageUrl: '',
      storyBoard: storyBoard?._id,
      type,
    };

    setStoryBoard({
      ...storyBoard,
      heroes: [...storyBoard?.heroes, newHero],
    });
  };

  const getHeroesList = () => {
    const heroes = [];
    storyBoard?.heroes?.map((hero, index) => {
      if (hero?.type === HeroTypes.personage) {
        heroes.push(<Hero hero={hero} key={hero?._id || index} />);
      }
    });
    return heroes;
  };

  const getComponentsList = () => {
    const heroes = [];
    storyBoard?.heroes?.map((hero, index) => {
      if (hero?.type === HeroTypes.component) {
        heroes.push(<Hero hero={hero} key={hero?._id || index} />);
      }
    });
    return heroes;
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
        <div className={styles.tabContent}>
          <div className={styles.heroContainer}>
            <div className={styles.heroesRow}>{getHeroesList()}</div>
            <div className={styles.heroesRow}>{getComponentsList()}</div>
          </div>
          <div className={styles.addButtonContainer}>
            <div className={styles.addbutton} onClick={() => addHero(HeroTypes.personage)}>
              <img src={`/img/Group.svg`} />
              <p className={styles.addButtonText}>Add a hero</p>
            </div>
            <div className={styles.addbutton} onClick={() => addHero(HeroTypes.component)}>
              <img src={`/img/Group.svg`} />
              <p className={styles.addButtonText}>Add components</p>
            </div>
            {renderNavigationButtons()}
          </div>
        </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <DocumentsSvg width="25px" />
          </span>
        }
        key={3}>
        <div className={styles.tabContent}>
          <div>Content of Tab Pane 3</div>
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
          <ChooseLayout />
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

export default StoryBoardTabs;
