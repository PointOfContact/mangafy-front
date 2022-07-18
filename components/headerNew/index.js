import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Dropdown, Menu, Space, DownOutlined } from 'antd';
import CircleUser from 'components/icon/new/CircleUser';
import NewFile from 'components/icon/new/NewFile';
import Edit2 from 'components/icon/new/Edit2';
import List from 'components/icon/new/List';
import Logo from 'components/icon/new/Logo';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Button from 'components/ui-new/Button';
import Link from 'next/link';
import client from 'api/client';
import GetFeedback from 'components/get-feedback';
import myAmplitude from 'utils/amplitude';
import ModalCreateProject from 'components/modalCreateProject';
import { useRouter } from 'next/router';
import { EVENTS } from 'helpers/amplitudeEvents';
import Mountain from 'components/icon/new/Mountain';
import File from 'components/icon/new/File';
import Star from 'components/icon/new/Star';
import { removeAllStorage } from 'helpers/shared';

const HeaderNew = ({ user }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateProjectModalVisible, setIsCreateProjectModalVisible] = useState(false);

  const sendEvent = (event_type, post = 'New') => {
    const eventData = [
      {
        event_type,
        event_properties: { post },
      },
    ];
    myAmplitude(eventData);
  };

  function createProjectHandler() {
    if (user) {
      sendEvent(EVENTS.OPEN_CREATE_NEW_PROJECT_MODAL);
      setIsCreateProjectModalVisible(true);
    } else {
      sendEvent(EVENTS.UNAUTHORIZED_CREATE_NEW_POST);
      router.push('/create-story', undefined, { scroll: false });
    }
  }
  function createPostHandler() {
    if (user) {
      sendEvent(EVENTS.OPEN_CREATE_NEW_POST_MODAL);
      setIsModalVisible(true);
    } else {
      sendEvent(EVENTS.UNAUTHORIZED_CREATE_NEW_POST);
      router.push('/sign-in?page=get-feedback', undefined, { scroll: false });
    }
  }

  const createMenuOptions = [
    {
      key: 'create-1',
      label: user ? (
        <div className={styles.nav__dropdownItem} onClick={createProjectHandler}>
          <div className={styles.nav__dropdownIcon}>
            <NewFile color="#D01E8E" bold={1} />
          </div>
          <div className={styles.nav__dropdownContent}>
            <div className={styles.nav__dropdownTitle}>Project</div>
            <div className={styles.nav__dropdownSubtitle}>Build a Complete Novel</div>
          </div>
        </div>
      ) : (
        <Link href={'/create-story'}>
          <a className={styles.nav__dropdownItem} onClick={createProjectHandler}>
            <div className={styles.nav__dropdownIcon}>
              <NewFile color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>Project</div>
              <div className={styles.nav__dropdownSubtitle}>Build a Complete Novel</div>
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'create-2',
      label: user ? (
        <div className={styles.nav__dropdownItem} onClick={createPostHandler}>
          <div className={styles.nav__dropdownIcon}>
            <Edit2 color="#D01E8E" bold={1} />
          </div>
          <div className={styles.nav__dropdownContent}>
            <div className={styles.nav__dropdownTitle}>Post</div>
            <div className={styles.nav__dropdownSubtitle}>Your Work in Progress</div>
          </div>
        </div>
      ) : (
        <Link href={'/sign-in?page=feed'}>
          <a className={styles.nav__dropdownItem} onClick={createPostHandler}>
            <div className={styles.nav__dropdownIcon}>
              <Edit2 color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>Post</div>
              <div className={styles.nav__dropdownSubtitle}>Your Work in Progress</div>
            </div>
          </a>
        </Link>
      ),
    },
  ];

  const exploreMenuOptions = [
    {
      key: 'explore-1',
      label: (
        <Link href="/feedNew?tab=people">
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <CircleUser color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>People</div>
              <div className={styles.nav__dropdownSubtitle}>It All Starts With Them.</div>
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'explore-2',
      label: (
        <Link href="/feedNew?tab=projects">
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <File color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>Projects</div>
              <div className={styles.nav__dropdownSubtitle}>Work in Progress</div>
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'explore-3',
      label: (
        <Link href="/feedNew?tab=published">
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <Mountain color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>Ongoing</div>
              <div className={styles.nav__dropdownSubtitle}>Published Projects</div>
            </div>
          </a>
        </Link>
      ),
    },
  ];

  const profileMenuOptions = [
    {
      key: 'profile-1',
      label: (
        <Link href={'/profile/' + user?._id}>
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <Star color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={cn(styles.nav__dropdownTitle, styles.nav__dropdownTitle_titleOnly)}>
                MangaFY Profile
              </div>
              {/* <div className={styles.nav__dropdownSubtitle}>subtitle</div> */}
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'profile-2',
      label: (
        <Link href={'/profile/' + user?._id + '#projects'}>
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <File color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>My Projects</div>
              <div className={styles.nav__dropdownSubtitle}>Manage your web novels</div>
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'profile-3',
      label: (
        <div className={styles.nav__dropdownItem} onClick={removeAllStorage}>
          <div className={styles.nav__dropdownIcon}>
            <Mountain color="#D01E8E" bold={1} />
          </div>
          <div className={styles.nav__dropdownContent}>
            <div className={styles.nav__dropdownTitle}>Sign Out</div>
            <div className={styles.nav__dropdownSubtitle}>Published Projects</div>
          </div>
        </div>
      ),
    },
  ];

  const loginMenuOptions = [
    {
      key: 'login-1',
      label: (
        <Link href={'/sign-up?page=feed'}>
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <NewFile color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>Join</div>
              <div className={styles.nav__dropdownSubtitle}>Become a part of the community</div>
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'login-2',
      label: (
        <Link href={'/sign-in?page=feed'}>
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <NewFile color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>Log in</div>
              <div className={styles.nav__dropdownSubtitle}>
                If you are already part of the community
              </div>
            </div>
          </a>
        </Link>
      ),
    },
  ];

  const createMenu = <Menu items={createMenuOptions} />;
  const exploreMenu = <Menu items={exploreMenuOptions} />;

  const mobileMenu = (
    <Menu
      items={[
        {
          key: '1',
          type: 'group',
          label: 'Account',
          children: user ? profileMenuOptions : loginMenuOptions,
        },
        {
          key: '2',
          type: 'group',
          label: 'Create',
          children: createMenuOptions,
        },
        {
          key: '3',
          type: 'group',
          label: 'Explore',
          children: exploreMenuOptions,
        },
      ]}
    />
  );

  const profileMenu = <Menu items={profileMenuOptions} />;

  return (
    <>
      <header className={styles.header}>
        <Link href={'/feed'}>
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <div className={styles.nav}>
          <div className={styles.nav__dropdowns}>
            <Dropdown
              arrow
              placement="bottom"
              overlay={exploreMenu}
              className={styles.nav__dropdown}
              trigger="click">
              <Space>
                <ArrowDown2 className={styles.nav__dropdownArrow} />
                Explore
              </Space>
            </Dropdown>
            <Dropdown
              arrow
              placement="bottom"
              overlay={createMenu}
              className={styles.nav__dropdown}
              trigger="click">
              <Space>
                <ArrowDown2 className={styles.nav__dropdownArrow} />
                Create
              </Space>
            </Dropdown>
          </div>
          <div className={styles.nav__buttons}>
            {user ? (
              <>
                <Link href={'/profile/' + user?._id + '#projects'}>
                  <a>
                    <Button rounded={1} outline={1} pink={1}>
                      My projects
                    </Button>
                  </a>
                </Link>
                <Dropdown
                  arrow
                  // placement="bottom"
                  overlay={profileMenu}
                  className={styles.nav__dropdown}
                  trigger="click">
                  <Space>
                    <div className={styles.nav__avatar}>
                      <img
                        src={
                          user.avatar ? client.UPLOAD_URL + user.avatar : 'img/feedTemp/avatar.png'
                        }
                        alt="Profile avatar"
                      />
                    </div>
                  </Space>
                </Dropdown>
              </>
            ) : (
              <>
                <Link href={'/sign-up?page=feed'}>
                  <a>
                    <Button rounded={1} outline={1} pink={1}>
                      Join
                    </Button>
                  </a>
                </Link>
                <Link href={'/sign-in?page=feed'}>
                  <a>
                    <Button rounded={1} pink={1}>
                      Log in
                    </Button>
                  </a>
                </Link>
              </>
            )}
          </div>
          <button className={cn(styles.nav_mobile)}>
            <Dropdown arrow placement="bottomRight" overlay={mobileMenu} trigger="click">
              <Space>
                <List className={styles.nav_mobile__icon} color="#D01E8E" />
              </Space>
            </Dropdown>
          </button>
        </div>
      </header>
      {/* Create post modal */}
      <GetFeedback
        user={user}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        sendEvent={sendEvent}
      />
      {/* Create project modal */}
      <ModalCreateProject
        createProjectModal={isCreateProjectModalVisible}
        showCreateProjectModal={setIsCreateProjectModalVisible}
        user={user}
      />
    </>
  );
};

export default HeaderNew;
