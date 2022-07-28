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

const ProjectMobileMenu = ({ tabs, activeTab, setActiveTab }) => {
  const [dropdown, setDropdown] = useState(true);

  return (
    <div className={styles.menu}>
      <div
        onClick={() => {
          setActiveTab(tabs.PLOT);
        }}
        className={cn(
          styles.menu__element,
          activeTab === tabs.PLOT && styles.menu__element_active
        )}>
        <Edit color={activeTab === tabs.PLOT ? '#fff' : '#D01E8E'} />
      </div>
      <div
        onClick={() => {
          setActiveTab(tabs.ASSETS);
        }}
        className={cn(
          styles.menu__element,
          activeTab === tabs.ASSETS && styles.menu__element_active
        )}>
        <Box color={activeTab === tabs.ASSETS ? '#fff' : '#D01E8E'} />
      </div>
      <div
        onClick={() => {
          setActiveTab(tabs.EPISODES);
        }}
        className={cn(
          styles.menu__element,
          activeTab === tabs.EPISODES && styles.menu__element_active
        )}>
        <Episodes color={activeTab === tabs.EPISODES ? '#fff' : '#D01E8E'} />
      </div>
      <div
        onClick={() => {
          setActiveTab(tabs.MESSAGES);
        }}
        className={cn(
          styles.menu__element,
          activeTab === tabs.MESSAGES && styles.menu__element_active
        )}>
        <Message2 color={activeTab === tabs.MESSAGES ? '#fff' : '#D01E8E'} />
      </div>
      <div
        className={styles.menu__element}
        onClick={() => {
          setDropdown((old) => !old);
        }}>
        <List color={'#D01E8E'} />
        <div className={cn(styles.dropdown, dropdown && styles.dropdown_active)}>
          <div
            className={styles.dropdown__element}
            onClick={() => {
              setActiveTab(tabs.DETAILS);
            }}>
            <Home color="#D01E8E" /> Details
          </div>
          <div
            className={styles.dropdown__element}
            onClick={() => {
              setActiveTab(tabs.SETTINGS);
            }}>
            <Settings color="#D01E8E" />
            Settings
          </div>
          <div
            className={styles.dropdown__element}
            onClick={() => {
              setActiveTab(tabs.COMMENTS);
            }}>
            <Message2 color="#D01E8E" />
            Comments
          </div>
          <div
            className={styles.dropdown__element}
            onClick={() => {
              setActiveTab(tabs.PUBLISH);
            }}>
            <Planet color="#D01E8E" />
            Publish
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMobileMenu;
