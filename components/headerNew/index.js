import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Dropdown, Menu, Space, DownOutlined, Popover, Badge } from 'antd';
import CircleUser from 'components/icon/new/CircleUser';
import NewFile from 'components/icon/new/NewFile';
import Edit2 from 'components/icon/new/Edit2';
import List from 'components/icon/new/List';
import Logo from 'components/icon/new/Logo';
import ArrowDown2 from 'components/icon/new/ArrowDown2';
import Button from 'components/ui-new/Button';
import Link from 'next/link';
import client from 'api/client';
import CreateShotModal from 'components/CreateShotModal';
import myAmplitude from 'utils/amplitude';
import ModalCreateProject from 'components/modalCreateProject';
import { useRouter } from 'next/router';
import { EVENTS } from 'helpers/amplitudeEvents';
import Mountain from 'components/icon/new/Mountain';
import File from 'components/icon/new/File';
import Star from 'components/icon/new/Star';
import { removeAllStorage } from 'helpers/shared';
import SignOut from 'components/icon/new/SignOut';
import MenuNotificationsBox from 'components/menu-notifications-box';
import SvgBell from 'components/icon/Bell';
import MenuMobilePopover from 'components/menu-mobile-popover';
import Avatar from 'components/Avatar';
import SvgProjectIcon from 'components/icon/ProjectIcon';
import Bell from 'components/icon/new/Bell';
import { SignInModal } from 'components/modals/SignInModal';
import Imgix from 'components/imgix';

const findNotificationsCount = (onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('../../api/restClient').then((m) => {
    m.default
      .service('/api/v2/notifications')
      .find({
        query: {
          $limit: 0,
          $sort: {
            createdAt: -1,
          },
          unread: true,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onFailure(err);
        return err;
      });
  });
};

const HeaderNew = ({ user }) => {
  const router = useRouter();
  const [isCreateShotModalVisible, setIsCreateShotModalVisible] = useState(false);
  const [isCreateProjectModalVisible, setIsCreateProjectModalVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showNotificationModalMobile, setShowNotificationModalMobile] = useState(false);
  const [unreadNotificationsId, setUnreadNotificationsId] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [isLoginWindowVisible, setIsLoginWindowVisible] = useState(false);
  const page = router.asPath;

  const sendEvent = (event_type, post = 'New') => {
    const eventData = [
      {
        event_type,
        event_properties: { post },
      },
    ];
    myAmplitude(eventData);
  };

  const getNotificationsCount = useCallback(() => {
    if (!user) return;
    findNotificationsCount(
      (res) => {
        setUnreadNotificationsId(res.data);
        setNotificationsCount(res.total);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [user]);

  useEffect(() => {
    getNotificationsCount();
  }, [user]);

  function createProjectHandler() {
    if (user) {
      sendEvent(EVENTS.OPEN_CREATE_NEW_PROJECT_MODAL);
      setIsCreateProjectModalVisible(true);
    } else {
      sendEvent(EVENTS.UNAUTHORIZED_CREATE_NEW_POST);
      // router.push('/create-story', undefined, { scroll: false });
      router.push('/sign-up', undefined, { scroll: false });
    }
  }
  function createPostHandler() {
    if (user) {
      sendEvent(EVENTS.OPEN_CREATE_NEW_POST_MODAL);
      setIsCreateShotModalVisible(true);
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
        // <Link href={'/create-story'}>
        <Link href={'/sign-up'}>
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
      label: (
        <div
          className={styles.nav__dropdownItem}
          onClick={user ? createPostHandler : () => setIsLoginWindowVisible(true)}>
          <div className={styles.nav__dropdownIcon}>
            <Edit2 color="#D01E8E" bold />
          </div>
          <div className={styles.nav__dropdownContent}>
            <div className={styles.nav__dropdownTitle}>Shot</div>
            <div className={styles.nav__dropdownSubtitle}>Your Work in Progress</div>
          </div>
        </div>
      ),
    },
  ];

  // const exploreMenuOptions = [
  //   {
  //     key: 'explore-1',
  //     label: (
  //       <Link href="/feed?tab=people">
  //         <a className={styles.nav__dropdownItem}>
  //           <div className={styles.nav__dropdownIcon}>
  //             <CircleUser color="#D01E8E" bold={1} />
  //           </div>
  //           <div className={styles.nav__dropdownContent}>
  //             <div className={styles.nav__dropdownTitle}>People</div>
  //             <div className={styles.nav__dropdownSubtitle}>It All Starts With Them.</div>
  //           </div>
  //         </a>
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: 'explore-2',
  //     label: (
  //       <Link href="/feed?tab=projects">
  //         <a className={styles.nav__dropdownItem}>
  //           <div className={styles.nav__dropdownIcon}>
  //             <File color="#D01E8E" bold={1} />
  //           </div>
  //           <div className={styles.nav__dropdownContent}>
  //             <div className={styles.nav__dropdownTitle}>Projects</div>
  //             <div className={styles.nav__dropdownSubtitle}>Work in Progress</div>
  //           </div>
  //         </a>
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: 'explore-3',
  //     label: (
  //       <Link href="/feed?tab=published">
  //         <a className={styles.nav__dropdownItem}>
  //           <div className={styles.nav__dropdownIcon}>
  //             <Mountain color="#D01E8E" bold={1} />
  //           </div>
  //           <div className={styles.nav__dropdownContent}>
  //             <div className={styles.nav__dropdownTitle}>Ongoing</div>
  //             <div className={styles.nav__dropdownSubtitle}>Published Projects</div>
  //           </div>
  //         </a>
  //       </Link>
  //     ),
  //   },
  // ];

  const profileMenuOptions = [
    {
      key: 'profile-4',
      label: (
        <Link href={'/subscribed/' + user?._id}>
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <Star color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__subscriptions}>Your subscriptions</div>
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'profile-1',
      label: (
        <Link href={'/profile/' + user?._id}>
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <File color="#D01E8E" bold={1} />
            </div>
            <div className={styles.nav__dropdownContent}>
              <div className={styles.nav__dropdownTitle}>MangaFY Profile</div>
              <div className={styles.nav__dropdownSubtitle}>Set up your profile</div>
            </div>
          </a>
        </Link>
      ),
    },
    {
      key: 'profile-2',
      label: (
        <Link href={'/profile/' + user?._id + '/projects'}>
          <a className={styles.nav__dropdownItem}>
            <div className={styles.nav__dropdownIcon}>
              <SvgProjectIcon color="#D01E8E" bold={1} />
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
        <div className={styles.nav__dropdownItem} onClick={() => removeAllStorage(page)}>
          <div className={styles.nav__dropdownIcon}>
            <SignOut color="#D01E8E" bold />
          </div>
          <div className={styles.nav__dropdownContent}>
            <div className={cn(styles.nav__dropdownTitle, styles.nav__dropdownTitle_titleOnly)}>
              Sign Out
            </div>
          </div>
        </div>
      ),
    },
  ];

  const loginMenuOptions = [
    {
      key: 'login-1',
      label: (
        <Link href={'/sign-up?page=' + page}>
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
        <Link href={'/sign-in?page=' + page}>
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
  // const exploreMenu = <Menu items={exploreMenuOptions} />;

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
        // {
        //   key: '3',
        //   type: 'group',
        //   label: 'Explore',
        //   children: exploreMenuOptions,
        // },
      ]}
    />
  );

  const profileMenu = <Menu items={profileMenuOptions} />;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <Link href={'/feed'}>
            <a className={styles.logo}>
              <Logo />
            </a>
          </Link>

          <div className={styles.nav}>
            {user ? (
              <>
                <div className={styles.nav__dropdowns}>
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
                  <Link href={'/profile/' + user?._id + '/projects'}>
                    <a className={styles.nav__myProjects}>
                      <Button rounded={1} outline={1} pink={1}>
                        My projects
                      </Button>
                    </a>
                  </Link>
                  <span className={styles.notification}>
                    <Popover
                      overlayClassName={styles.popover}
                      placement="bottomRight"
                      visible={showNotificationModal}
                      content={
                        <MenuNotificationsBox
                          user={user}
                          unreadNotificationsId={unreadNotificationsId}
                          notificationsCount={notificationsCount}
                          setNotificationsCount={setNotificationsCount}
                        />
                      }
                      onVisibleChange={(visible) =>
                        setShowNotificationModal(!showNotificationModal)
                      }
                      trigger="click">
                      <Badge
                        count={notificationsCount}
                        onClick={() => {
                          setShowNotificationModal(!showNotificationModal);
                        }}>
                        <Bell size={23} />
                      </Badge>
                    </Popover>
                  </span>

                  <Dropdown
                    arrow
                    overlay={profileMenu}
                    className={styles.nav__dropdown}
                    trigger="click">
                    <Space>
                      <div className={styles.nav__avatar}>
                        {user.avatar ? (
                          <Imgix
                            layout="fill"
                            src={client.UPLOAD_URL + user.avatar}
                            alt="Profile avatar"
                          />
                        ) : (
                          <Avatar
                            size={50}
                            text={user.name}
                            style={{
                              backgroundColor: '#7b65f3',
                              color: '#ffffff',
                            }}></Avatar>
                        )}
                        {/* <Avatar
                          size={50}
                          image={user?.avatar}
                          text={user?.name[0]}
                          useNoImageIcon
                        /> */}
                      </div>
                    </Space>
                  </Dropdown>
                </div>
              </>
            ) : (
              <div className={styles.nav__buttons}>
                <Link href={'/sign-in?page=' + page}>
                  <a className={styles.signIn}>Sign in</a>
                </Link>
                <Link href={'/sign-up?page=' + page}>
                  <a className={styles.join}>
                    <Button md rounded outline pink>
                      Join
                    </Button>
                  </a>
                </Link>
                {/* <Link href={'/create-story'}> */}
                {/* <Link href={'/sign-up'}>
                  <a className={styles.createStory}>
                    <Button md rounded pink>
                      Create story
                    </Button>
                  </a>
                </Link> */}
              </div>
            )}
            <button className={cn(styles.nav_mobile)}>
              <Dropdown arrow placement="bottomRight" overlay={mobileMenu} trigger="click">
                <Space>
                  <List className={styles.nav_mobile__icon} color="#D01E8E" />
                </Space>
              </Dropdown>
            </button>
          </div>
        </div>
      </header>
      <CreateShotModal
        isVisible={isCreateShotModalVisible}
        setIsVisible={setIsCreateShotModalVisible}
        onUpload={() => {
          router.reload();
        }}
      />
      <ModalCreateProject
        createProjectModal={isCreateProjectModalVisible}
        showCreateProjectModal={setIsCreateProjectModalVisible}
        user={user}
      />
      <SignInModal
        page={router.asPath}
        title="Sign in"
        visible={isLoginWindowVisible}
        setVisible={setIsLoginWindowVisible}
      />
    </>
  );
};

export default HeaderNew;
