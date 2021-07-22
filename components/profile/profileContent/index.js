import React, { useEffect, useState } from 'react';

import { Tabs, Layout, Row, Col } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import styles from './styles.module.scss';
import TabCommissionPricing from './tabCommissionPricing';
import TabMessenger from './tabMessenger';
import TabPortfolio from './tabPortfolio';
import TabStory from './tabStory';

const { Content } = Layout;
const { TabPane } = Tabs;

const ProfileContent = (props) => {
  const {
    storyEditMode,
    setStoryEditMode,
    cancelStoryEditMode,
    saveUserDataByKey,
    setUserData,
    user,
    userData,
    userGenres,
    profileGenres,
    handleChangeGenres,
    profile,
    mangaStories,
    mangaStoriesMyProfile,
    genresMyProfileEnums,
    genres,
    total,
    ifMyProfile,
  } = props;

  const [selectedTab, setSelectIdTab] = useState('1');
  const tabPanels = [
    {
      key: '1',
      tab: 'PROFILE',
      component: (
        <TabStory
          {...{
            storyEditMode,
            setStoryEditMode,
            cancelStoryEditMode,
            saveUserDataByKey,
            setUserData,
            userData,
            userGenres,
            profileGenres,
            handleChangeGenres,
            genresMyProfileEnums,
            genres,
            total,
            profile,
            ifMyProfile,
          }}
        />
      ),
    },
    {
      key: '2',
      tab: 'PORTFOLIO',
      component: (
        <TabPortfolio
          {...{
            user,
            profile,
            mangaStories,
            mangaStoriesMyProfile,
            ifMyProfile,
          }}
        />
      ),
    },
    {
      key: '3',
      tab: 'SERVICES',
      component: <TabCommissionPricing {...{ user, profile }} />,
    },
  ];
  useEffect(() => {
    const { tab } = qs.parse(location.search);

    switch (tab) {
      case 'story':
        setSelectIdTab('1');
        break;
      case 'gallery':
        setSelectIdTab('2');
        break;
      case 'services':
        setSelectIdTab('3');
        break;
      case 'messenger':
        setSelectIdTab('4');
        break;
      default:
        setSelectIdTab('1');
    }
  }, [user]);

  return (
    <section className={styles.prof_tabs_sec}>
      <Content
        className={cn(
          styles.my_profile_tabs,
          'profile-content mobile_full_content mobile_top_round mobile_linear'
        )}>
        <Row>
          <Col span={24}>
            <Tabs activeKey={selectedTab} onTabClick={setSelectIdTab}>
              {tabPanels.map((tabPanel) => (
                <TabPane tab={tabPanel.tab} key={tabPanel.key}>
                  {tabPanel.component}
                </TabPane>
              ))}
              {ifMyProfile && (
                <TabPane tab="MESSENGER" key={'4'}>
                  <TabMessenger {...{ user }} />
                </TabPane>
              )}
            </Tabs>
          </Col>
        </Row>
      </Content>
    </section>
  );
};

ProfileContent.propTypes = {
  storyEditMode: PropTypes.bool,
  setStoryEditMode: PropTypes.func,
  cancelStoryEditMode: PropTypes.func,
  saveUserDataByKey: PropTypes.func,
  setUserData: PropTypes.func,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object,
  userGenres: PropTypes.array,
  handleChangeGenres: PropTypes.func,
  profile: PropTypes.object,
  mangaStories: PropTypes.array,
  mangaStoriesMyProfile: PropTypes.array,
  genresMyProfileEnums: PropTypes.any,
  genres: PropTypes.array,
  total: PropTypes.number,
  profileGenres: PropTypes.array,
  ifMyProfile: PropTypes.bool,
};

ProfileContent.defaultProps = {
  setStoryEditMode: () => {},
  cancelStoryEditMode: () => {},
  saveUserDataByKey: () => {},
  setUserData: () => {},
  handleChangeGenres: () => {},
  storyEditMode: false,
  userData: null,
  userGenres: null,
  profile: null,
  mangaStoriesMyProfile: null,
  genresMyProfileEnums: null,
  genres: null,
  total: null,
  profileGenres: null,
  ifMyProfile: null,
  mangaStories: null,
};

export default ProfileContent;
