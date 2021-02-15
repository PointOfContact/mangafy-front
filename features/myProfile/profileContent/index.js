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
    fromMobile,
    genresEnums,
    genres,
    total,
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
            fromMobile,
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
          'mobile_full_content mobile_top_round mobile_linear'
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
  storyEditMode: PropTypes.bool.isRequired,
  setStoryEditMode: PropTypes.func.isRequired,
  cancelStoryEditMode: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  userGenres: PropTypes.array.isRequired,
  handleChangeGenres: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  mangaStories: PropTypes.object.isRequired,
  fromMobile: PropTypes.any.isRequired,
  genresEnums: PropTypes.any.isRequired,
  genres: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default ProfileContent;
