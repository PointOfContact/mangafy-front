import React, { useEffect, useState } from 'react';

import { Tabs, Layout, Row, Col } from 'antd';
import cn from 'classnames';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import myAmplitude from 'utils/amplitude';

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
    openLoginModal,
  } = props;

  const sendEvent = (event) => {
    let tab;
    switch (event) {
      case '1':
        tab = 'story';
        break;
      case '2':
        tab = 'gallery';
        break;
      case '3':
        tab = 'services';
        break;
      default:
        tab = 'messenger';
    }
    const data = {
      event_type: EVENTS.CHECKED_ACCOUNT_TABS,
      event_properties: { tab, profileId: profile?._id },
    };
    myAmplitude(data);
  };

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
            openLoginModal,
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
            <Tabs
              activeKey={selectedTab}
              onTabClick={(e) => {
                setSelectIdTab(e);
                sendEvent(e);
              }}>
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
  total: PropTypes.array,
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
  total: [],
  profileGenres: null,
  ifMyProfile: null,
  mangaStories: null,
};

export default ProfileContent;
