import React, { useState } from 'react';
import styles from './styles.module.scss';

import cn from 'classnames';
import Edit from 'components/icon/new/Edit';
import Box from 'components/icon/new/Box';
import Episodes from 'components/icon/new/Episodes';
import Message2 from 'components/icon/new/Message2';
import List from 'components/icon/new/List';
import Home from 'components/icon/new/Home';
import Settings from 'components/icon/new/Settings';
import Planet from 'components/icon/new/Planet';
import Link from 'next/link';

const ProjectMobileMenu = ({ tabs, activeTab, setActiveTab, routerBasePath }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className={styles.menu}>
      <Link href={routerBasePath + 'plot'}>
        <a
          // onClick={() => {
          //   setActiveTab(tabs.PLOT);
          // }}
          className={cn(
            styles.menu__element,
            activeTab === tabs.PLOT && styles.menu__element_active
          )}>
          <Edit color={activeTab === tabs.PLOT ? '#fff' : '#D01E8E'} />
        </a>
      </Link>
      <Link href={routerBasePath + 'assets'}>
        <a
          // onClick={() => {
          //   setActiveTab(tabs.ASSETS);
          // }}
          className={cn(
            styles.menu__element,
            activeTab === tabs.ASSETS && styles.menu__element_active
          )}>
          <Box color={activeTab === tabs.ASSETS ? '#fff' : '#D01E8E'} />
        </a>
      </Link>
      <Link href={routerBasePath + 'episodes'}>
        <a
          // onClick={() => {
          //   setActiveTab(tabs.EPISODES);
          // }}
          className={cn(
            styles.menu__element,
            activeTab === tabs.EPISODES && styles.menu__element_active
          )}>
          <Episodes color={activeTab === tabs.EPISODES ? '#fff' : '#D01E8E'} />
        </a>
      </Link>
      <Link href={routerBasePath + 'messages'}>
        <a
          // onClick={() => {
          //   setActiveTab(tabs.MESSAGES);
          // }}
          className={cn(
            styles.menu__element,
            activeTab === tabs.MESSAGES && styles.menu__element_active
          )}>
          <Message2 color={activeTab === tabs.MESSAGES ? '#fff' : '#D01E8E'} />
        </a>
      </Link>
      <div
        className={styles.menu__element}
        onClick={() => {
          setDropdown((old) => !old);
        }}>
        <List color={'#D01E8E'} />
        <div className={cn(styles.dropdown, dropdown && styles.dropdown_active)}>
          <Link href={routerBasePath + 'jobs'}>
            <a
              className={styles.dropdown__element}
              // onClick={() => {
              //   setActiveTab(tabs.DETAILS);
              // }}
            >
              <Home color="#D01E8E" /> Jobs
            </a>
          </Link>
          <Link href={routerBasePath + 'settings'}>
            <a
              className={styles.dropdown__element}
              // onClick={() => {
              //   setActiveTab(tabs.SETTINGS);
              // }}
            >
              <Settings color="#D01E8E" />
              Settings
            </a>
          </Link>
          <Link href={routerBasePath + 'comments'}>
            <a
              className={styles.dropdown__element}
              // onClick={() => {
              //   setActiveTab(tabs.COMMENTS);
              // }}
            >
              <Message2 color="#D01E8E" />
              Comments
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectMobileMenu;
