import React, { useState, useEffect, useCallback } from 'react';

import { Badge, Popover } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgBell from 'components/icon/Bell';
import Imgix from 'components/imgix';
import MenuMobilePopover from 'components/menu-mobile-popover';
import MenuNotificationsBox from 'components/menu-notifications-box';
import AddButton from 'components/ui-elements/add-button';
import Avatar from 'components/ui-elements/avatar';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { removeAllStorage } from 'helpers/shared';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import MenuLinks from './menuLinks';
import ModalInviteMembers from './modalInviteMembers';
import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const findNotificationsCount = (onSuccess, onFailure) => {
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

const Header = ({ user, path }) => {
  const [isOpen, handleMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [unreadNotificationsId, setUnreadNotificationsId] = useState([]);
  const router = useRouter();
  const getNotificationsCount = useCallback(() => {
    if (!user) return;
    findNotificationsCount(
      (res) => {
        setUnreadNotificationsId(res);
        setNotificationsCount(res.length);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [user]);

  useEffect(() => {
    getNotificationsCount();
  }, [user]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, false);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('scroll', handleScroll);
    };
  });

  const openMenu = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    handleMenuOpen(!isOpen);
    const el = document.body;
    if (!isOpen) {
      el.classList.add(styles.body_scroll);
    } else {
      el.classList.remove(styles.body_scroll);
    }
  };

  const handleScroll = () => {
    const el = document.querySelector('.menubar');
    if (window.scrollY > 44) {
      el.classList.add(styles.header__fixed);
    } else {
      el.classList.remove(styles.header__fixed);
    }
  };

  const handleDocumentClick = () => {
    handleMenuOpen(false);
    const el = document.body;
    el.classList.remove(styles.body_scroll);
  };

  const addEvent = () => {
    if (!user?._id) {
      return;
    }
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.CREATE_PROJECT_START,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
  };
  return (
    <div className={styles.header_cont}>
      <header className={`${styles.header} navbar menubar`}>
        <div className={'container'}>
          <div className={styles.header__top}>
            <div onClick={openMenu} className={styles.header__mnu}>
              <div className={cn(styles.menu_icon, isOpen && styles.menu_icon_open)}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <Link href="/">
              <a className={styles.header__logo}>
                <Imgix
                  priority
                  layout="intrinsic"
                  width={185}
                  height={30}
                  quality={50}
                  src="https://mangafy.club/img/logo-new.webp"
                  alt=""
                />
              </a>
            </Link>
            <div className={styles.header__logIn}>
              {user ? (
                <Popover
                  overlayClassName={styles.popover}
                  placement="bottomRight"
                  content={<MenuMobilePopover removeAllStorage={removeAllStorage} />}
                  visible={showNotification}
                  onVisibleChange={(visible) => setShowNotification(visible)}
                  trigger="click">
                  <div className={cn(styles.img, styles.imgOnline)}>
                    <div className={styles.avatar}>
                      {user.avatar ? (
                        <Imgix
                          width={52}
                          height={52}
                          className="avatar"
                          src={client.UPLOAD_URL + user.avatar}
                        />
                      ) : (
                        <Avatar text={user.name} fontSize={20} />
                      )}
                    </div>
                  </div>
                </Popover>
              ) : (
                <Link href="/sign-in">
                  <a>
                    <img src="/img/header-log-in.svg" alt="" />
                    {/* TODO: chage to svg component */}
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.header__leftNav}>
              {/* <Link href="/collaborations?compensationModel=paid">
                <a
                  className={cn(
                    styles.header__menu,
                    router.pathname === '/collaborations' &&
                      router.query.compensationModel === 'paid' &&
                      styles.header__menu_active
                  )}>
                  Paid projects
                </a>
              </Link> */}
              <Link href="/collaborations">
                <a
                  className={cn(
                    styles.header__menu,
                    router.pathname === '/collaborations' && styles.header__menu_active
                  )}>
                  Collabs
                </a>
              </Link>
              <Link href="/profiles">
                <a
                  className={cn(
                    styles.header__menu,
                    router.pathname === '/profiles' && styles.header__menu_active
                  )}>
                  People
                </a>
              </Link>
            </div>
            <div className={styles.header__rightNav}>
              {user ? (
                <>
                  {/* <Link href="/pricing">
                    <a className={styles.header__menu}>
                      <span className={styles.go_to_pro}>
                        Go to <span>PRO</span>
                      </span>
                    </a>
                  </Link> */}
                  <span className={styles.notification}>
                    <Popover
                      overlayClassName={styles.popover}
                      placement="bottom"
                      content={
                        <MenuNotificationsBox
                          user={user}
                          unreadNotificationsId={unreadNotificationsId}
                          notificationsCount={notificationsCount}
                        />
                      }
                      trigger="click">
                      <Badge count={notificationsCount}>
                        <SvgBell width="23px" height="23px" />
                      </Badge>
                    </Popover>
                  </span>
                  {path !== 'myProfile' && (
                    <Link href="/my-profile">
                      <a className={styles.header__menu}>
                        <span className={styles.user_img}>
                          <span>Profile</span>
                          <div className={cn(styles.img, styles.imgOnline)}>
                            <div className={styles.avatar}>
                              {user.avatar ? (
                                <Imgix
                                  width={50}
                                  height={50}
                                  src={client.UPLOAD_URL + user.avatar}
                                  alt="Picture of the user"
                                />
                              ) : (
                                <Avatar text={user.name} fontSize={20} />
                              )}
                            </div>
                          </div>
                        </span>
                      </a>
                    </Link>
                  )}
                  {path === 'myProfile' && (
                    <a
                      className={cn(
                        path === 'main' ? 'whiteButton' : 'exploreBtn',
                        styles.header__menu
                      )}
                      onClick={removeAllStorage}>
                      Sign out
                    </a>
                  )}
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <a
                      className={cn(
                        styles.header__menu,
                        router.pathname === '/sign-in' && styles.header__menu_active
                      )}>
                      Log in
                    </a>
                  </Link>
                  <Link href="/sign-in">
                    <a className={styles.header__menu}>
                      <PrimaryButton className={styles.join} text="Join"></PrimaryButton>
                    </a>
                  </Link>
                </>
              )}
            </div>
            <span className={cn(styles.btn_submit)} onClick={addEvent}>
              {user && (
                <PrimaryButton
                  className={styles.inviteMembers}
                  text={
                    <div className={styles.inviteMembersButton}>
                      <AddButton
                        className={styles.addButtonInvite}
                        width="18x"
                        height="18x"
                        text={''}
                      />
                      <p className={styles.fullInviteName}>Invite members</p>
                      <p className={styles.inviteName}>Invite</p>
                    </div>
                  }
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
              )}
              <Link href="/create-a-story/start">
                <a className={cn('btn_submit')}>
                  <PrimaryButton text="Start a project" className={styles.fullStartProject} />
                  <PrimaryButton text="Start" className={styles.startProject} />
                </a>
              </Link>
            </span>
          </div>
        </div>
        {isOpen && (
          <MenuLinks
            isOpen={isOpen}
            user={user}
            setShowModal={setShowModal}
            handleMenuOpen={handleMenuOpen}
          />
        )}
      </header>
      <ModalInviteMembers showModal={showModal} setShowModal={setShowModal} user={user} />
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  path: PropTypes.string,
};

Header.defaultProps = {
  user: null,
  path: '',
};

export default Header;
