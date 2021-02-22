import React from 'react';

import { Tabs, Layout, Row, Col } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import TabCommissionPricing from './tabCommissionPricing';
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
    handleChangeGenres,
    profile,
    mangaStories,
    genresEnums,
    genres,
    total,
    profileGenres,
  } = props;

  const tabPanels = [
    {
      key: '1',
      tab: 'STORY',
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
            handleChangeGenres,
            genresEnums,
            genres,
            total,
            profile,
            profileGenres,
          }}
        />
      ),
    },
    {
      key: '2',
      tab: 'GALLERY AND SOCIAL',
      component: (
        <TabPortfolio
          {...{
            user,
            profile,
            mangaStories,
          }}
        />
      ),
    },
    {
      key: '3',
      tab: 'COMMISSION PRICING',
      component: <TabCommissionPricing {...{ user }} />,
    },
  ];
  return (
    <section className={styles.prof_tabs_sec}>
      <Content
        className={cn(
          styles.my_profile_tabs,
          'profile-content mobile_full_content mobile_top_round mobile_linear'
        )}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              {tabPanels.map((tabPanel) => (
                <TabPane tab={tabPanel.tab} key={tabPanel.key}>
                  {tabPanel.component}
                </TabPane>
              ))}
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
  genresEnums: PropTypes.any,
  genres: PropTypes.array,
  total: PropTypes.number,
  profileGenres: PropTypes.array,
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
  mangaStories: null,
  genresEnums: null,
  genres: null,
  total: null,
  profileGenres: null,
};

export default ProfileContent;
