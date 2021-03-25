import React, { useState, useEffect, useCallback } from 'react';

import { Badge, Popover } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgBell from 'components/icon/Bell';
import MenuMobilePopover from 'components/menu-mobile-popover';
import MenuNotificationsBox from 'components/menu-notifications-box';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { removeAllStorage } from 'helpers/shared';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

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
  const [isOpen, handleManuOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(false);
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
    handleManuOpen(!isOpen);
    const el = document.body;
    if (!isOpen) {
      el.classList.add(styles.body_scrool);
    } else {
      el.classList.remove(styles.body_scrool);
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
    handleManuOpen(false);
    const el = document.body;
    el.classList.remove(styles.body_scrool);
  };

  const addEvent = () => {
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.SUBMIT_IDEA,
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
                <img src="/img/logo-new.png" alt="" />
              </a>
            </Link>
            <div className={styles.header__logIn}>
              {user ? (
                <Popover
                  overlayClassName={styles.popover}
                  placement="bottomRight"
                  content={
                    <MenuMobilePopover
                      user={user}
                      unreadNotificationsId={unreadNotificationsId}
                      notificationsCount={notificationsCount}
                      removeAllStorage={removeAllStorage}
                    />
                  }
                  trigger="click">
                  <div className={cn(styles.img, styles.imgOnline)}>
                    <div className={styles.avatar}>
                      <img
                        src={
                          user.avatar
                            ? client.UPLOAD_URL + user.avatar
                            : `https://ui-avatars.com/api/?background=9A87FE&name=${user.name}&rounded=true&color=ffffff`
                        }
                        alt=""></img>
                    </div>
                  </div>
                </Popover>
              ) : (
                <Link href="/sign-in">
                  <img src="/img/header-log-in.svg" alt="" />
                </Link>
              )}
            </div>
            <div className={styles.header__leftNav}>
              <Link href="/collaborations?compensationModel=paid">
                <a
                  className={cn(
                    styles.header__menu,
                    router.pathname === '/collaborations' &&
                      router.query.compensationModel === 'paid' &&
                      styles.header__menu_active
                  )}>
                  Paid projects
                </a>
              </Link>
              <Link href="/collaborations?compensationModel=collaboration">
                <a
                  className={cn(
                    styles.header__menu,
                    router.pathname === '/collaborations' &&
                      router.query.compensationModel === 'collaboration' &&
                      styles.header__menu_active
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
                              <Image
                                width={50}
                                height={50}
                                src={
                                  user.avatar
                                    ? client.UPLOAD_URL + user.avatar
                                    : `https://ui-avatars.com/api/?background=9A87FE&name=${user.name}&rounded=true&color=ffffff`
                                }
                                alt="Picture of the user"
                              />
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
                <Link href="/sign-in">
                  <a
                    className={cn(
                      styles.header__menu,
                      router.pathname === '/sign-in' && styles.header__menu_active
                    )}>
                    Log in
                  </a>
                </Link>
              )}
            </div>
            <span className={cn(styles.btn_submit)} onClick={addEvent}>
              <Link href="/create-a-story/start">
                <span className={cn('btn_submit')}>
                  <PrimaryButton text="Submit an IDEA" />
                </span>
              </Link>
            </span>
          </div>
        </div>
        {isOpen && <MenuLinks isOpen={isOpen} user={user} />}
      </header>
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

const MenuLinks = ({ isOpen, user }) => {
  const initialLinks = [
    {
      text: 'About Us',
      link: 'about',
    },
    {
      text: 'Terms',
      link: 'terms',
    },
    {
      text: 'Privacy Policy',
      link: 'privacy',
    },
  ];

  const links = initialLinks.map((link, i) => (
    <li className={styles.menu_item} key={i}>
      <Link href={`/${link.link}`}>
        <span>{link.text}</span>
      </Link>
    </li>
  ));
  return (
    <div id="menu" className={`${styles.mobile_menu} ${isOpen && styles.isOpen}`}>
      <div className={styles.menu_inner}>
        <div className={styles.mobile_div_part1}>
          {user ? (
            <>
              <ul className={styles.main_list}>
                <li className={styles.menu_item}>
                  <Link href="/collaborations?compensationModel=paid">Paid projects</Link>
                </li>
                <li className={styles.menu_item}>
                  <Link href="/collaborations">Collabs</Link>
                </li>
                <li className={styles.menu_item}>
                  <Link href="/profiles">People</Link>
                </li>
                <li className={styles.menu_item}>
                  <Link href="/create-a-story/start">Create a collab</Link>
                </li>
                {/* <li className={styles.menu_item}>
                  <Link href="/pricing">Go Pro</Link>
                </li> */}
              </ul>
              <ul className={cn(`${styles.main_list} ${styles.ul_login}`)}>
                <li className={styles.menu_item}>
                  <Link href="/my-profile">Profile</Link>
                </li>
                {/* <li className={styles.menu_item}>
                  <Link href="/collaborations?compensationModel=paid">Work Availability</Link>
                </li> */}
                <li className={styles.menu_item}>
                  <Link href="/my-profile">My Notifications</Link>
                </li>
                {/* <li className={styles.menu_item}>
                  <Link href="/settings">Account settings</Link>
                </li> */}
                <li className={styles.menu_item} onClick={removeAllStorage}>
                  <Link href="/sign-in">Sign out</Link>
                </li>
              </ul>
            </>
          ) : (
            <ul className={styles.main_list}>
              <li className={styles.menu_item}>
                <Link href="/sign-in">Sign in</Link>
              </li>
              <li className={styles.menu_item}>
                <Link href="/collaborations?compensationModel=paid">Paid projects</Link>
              </li>
              <li className={styles.menu_item}>
                <Link href="/collaborations">Collabs</Link>
              </li>
              <li className={styles.menu_item}>
                <Link href="/create-a-story/start">Create a collab</Link>
              </li>
              <li className={styles.menu_item}>
                <Link href="/profiles">People</Link>
              </li>
              {/* <li className={styles.menu_item}>
                <Link href="/pricing">Go Pro</Link>
              </li> */}
            </ul>
          )}
        </div>
        <div className={styles.mobile_div_part2}>
          <ul className={styles.links}>{links}</ul>
          <div className={styles.image_block}>
            {user ? <img src="/img/Frame2.png"></img> : <img src="/img/Frame.png"></img>}
          </div>
        </div>
      </div>
    </div>
  );
};

MenuLinks.propTypes = {
  isOpen: PropTypes.bool,
  user: PropTypes.object,
};

MenuLinks.defaultProps = {
  isOpen: false,
  user: null,
};

export default Header;
