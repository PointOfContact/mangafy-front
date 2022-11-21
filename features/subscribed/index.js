import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import styles from './styles.module.scss';
import Imgix from 'components/imgix';
import client from 'api/client';
import Avatar from 'components/Avatar';
import SvgComment from 'components/icon/Comment';
import Star from 'components/icon/new/Star';
import { Eye, Heart } from 'components/icon';
import Fire from 'components/icon/new/Fire';
import Diamond from 'components/icon/new/Diamond';
import ProjectItems from './projectItems';
import HeaderNew from 'components/headerNew';

const Subscribed = ({ user, profile }) => {
  const [item, setItem] = useState(1);
  const [showingItems, setShowingItems] = useState(1);

  useEffect(() => {
    const filterItems = profile?.subscribItems?.filter((val) => val.type === 'project');
    setShowingItems(filterItems);
  }, []);

  useEffect(() => {
    setItem(1);
  }, []);

  return (
    <div className={styles.container}>
      <HeaderNew user={user} />
      <h1>Your Subscriptions</h1>
      <h3>View all your subscribed content and creators here.</h3>
      <Tabs onChange={(key) => setItem(key)} className={styles.tabs} defaultActiveKey={item}>
        <Tabs.TabPane tab="Projects" key="1">
          <ProjectItems user={user} items={showingItems} />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Ongoings" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Shots" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane> */}
      </Tabs>
    </div>
  );
};

Subscribed.propTypes = {};
Subscribed.defaultProps = {};

export default Subscribed;
