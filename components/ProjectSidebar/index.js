import Logo from 'components/icon/new/Logo';
import Star from 'components/icon/new/Star';
import React, { useState, useEffect, useRef } from 'react';
import SidebarTab from './SidebarTab';
import styles from './styles.module.scss';
import cn from 'classnames';
import LogoSmall from 'components/icon/new/LogoSmall';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Home from 'components/icon/new/Home';
import Edit from 'components/icon/new/Edit';
import Box from 'components/icon/new/Box';
import Episodes from 'components/icon/new/Episodes';
import Message from 'components/icon/new/Message';
import Message2 from 'components/icon/new/Message2';
import Settings from 'components/icon/new/Settings';
import Planet from 'components/icon/new/Planet';
import Link from 'next/link';

const ProjectSidebar = ({ tabs, activeTab, setActiveTab, onCollapsedChange, routerBasePath }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (typeof onCollapsedChange === 'function') {
      onCollapsedChange(isCollapsed);
    }
  }, [isCollapsed]);

  function toggleCollapsed(e) {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  }

  function handleClickOutside(event) {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsCollapsed(true);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sidebarRef} className={cn(styles.sidebar, isCollapsed && styles.sidebar_collapsed)}>
      <div className={styles.arrowButton} onClick={(e) => toggleCollapsed(e)}>
        <ArrowDown2 color="#000" bold />
      </div>
      <Link href="/feed">
        <a className={styles.logo}>
          {isCollapsed ? <LogoSmall color="#03FFC2" /> : <Logo color="#03FFC2" />}
        </a>
      </Link>
      <div className={styles.tabs}>
        <Link href={routerBasePath + 'details'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.DETAILS);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.DETAILS}
              icon={<Home color="#D01E8E" />}>
              Details
            </SidebarTab>
          </a>
        </Link>
        <Link href={routerBasePath + 'plot'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.PLOT);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.PLOT}
              icon={<Edit bold color="#D01E8E" />}>
              Plot
            </SidebarTab>
          </a>
        </Link>
        <Link href={routerBasePath + 'assets'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.ASSETS);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.ASSETS}
              icon={<Box bold color="#D01E8E" />}>
              Assets
            </SidebarTab>
          </a>
        </Link>
        <Link href={routerBasePath + 'episodes'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.EPISODES);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.EPISODES}
              icon={<Episodes color="#D01E8E" />}>
              Episodes
            </SidebarTab>
          </a>
        </Link>
        <Link href={routerBasePath + 'publish'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.PUBLISH);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.PUBLISH}
              icon={<Planet bold color="#D01E8E" />}>
              Publish
            </SidebarTab>
          </a>
        </Link>
        <Link href={routerBasePath + 'comments'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.COMMENTS);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.COMMENTS}
              icon={<Message bold color="#D01E8E" />}>
              Comments
            </SidebarTab>
          </a>
        </Link>
      </div>
      <div className={styles.additionalTabs}>
        <Link href={routerBasePath + 'messages'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.MESSAGES);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.MESSAGES}
              icon={<Message2 color="#D01E8E" />}>
              Messages
            </SidebarTab>
          </a>
        </Link>
        <Link href={routerBasePath + 'settings'}>
          <a>
            <SidebarTab
              // onClick={() => {
              //   setActiveTab(tabs.SETTINGS);
              // }}
              collapsed={isCollapsed}
              isActive={activeTab === tabs.SETTINGS}
              icon={<Settings color="#D01E8E" />}>
              Settings
            </SidebarTab>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProjectSidebar;
