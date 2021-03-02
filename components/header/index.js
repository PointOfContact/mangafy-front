import React, { useState, useEffect } from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import { removeAllStorage } from 'helpers/shared';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Header = ({ user, path }) => {
  const [isOpen, handleManuOpen] = useState(false);

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
  };

  return (
    <div className={styles.header_cont}>
      <header className={`${styles.header} navbar menubar`}>
        <div className={'container'}>
          <div className={styles.header__top}>
            <div onClick={openMenu} className={styles.header__mnu}>
              <img src="/img/mnu.svg" alt="" />
            </div>
            <Link href="/">
              <a className={styles.header__logo}>
                <img src="/img/logo-new.png" alt="" />
              </a>
            </Link>
            <div className={styles.header__logIn}>
              <img src="/img/header-log-in.svg" alt="" />
            </div>
            <div className={styles.header__leftNav}>
              <Link href="/collaborations?compensationModel=paid">
                <a className={styles.header__menu}>Paid projects</a>
              </Link>
              <Link href="/collaborations?compensationModel=collaboration">
                <a className={styles.header__menu}>Collabas</a>
              </Link>
              <Link href="/profiles">
                <a className={styles.header__menu}>Members</a>
              </Link>
            </div>
            <div className={styles.header__rightNav}>
              {user ? (
                <>
                  {path !== 'myProfile' && (
                    <Link href="/my-profile">
                      <a className={styles.header__menu}>Profile</a>
                    </Link>
                  )}
                  {path === 'myProfile' && (
                    <Link href="/">
                      <a
                        className={cn(
                          path === 'main' ? 'whiteButton' : 'exploreBtn',
                          styles.header__menu
                        )}
                        onClick={removeAllStorage}>
                        Sign out
                      </a>
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/sign-in">
                  <a className={styles.header__menu}>Log in</a>
                </Link>
              )}
            </div>
            <Link href="/create-a-story/start">
              <span>
                <PrimaryButton
                  className={cn(styles.btn_submit, 'btn_submit')}
                  text="Submit an IDEA"
                />
              </span>
            </Link>
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
                  <Link href="/profiles">Members</Link>
                </li>
                <li className={styles.menu_item}>
                  <Link href="/create-a-story/start">Create a collab</Link>
                </li>
                <li className={styles.menu_item}>
                  <Link href="/pricing">Go Pro</Link>
                </li>
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
                <Link href="/profiles">Members</Link>
              </li>
              <li className={styles.menu_item}>
                <Link href="/pricing">Go Pro</Link>
              </li>
            </ul>
          )}
        </div>
        <div className={styles.mobile_div_part2}>
          <ul className={styles.links}>{links}</ul>
          <div className={styles.image_block}>
            {user ? <img src="img/Frame2.png"></img> : <img src="img/Frame.png"></img>}
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
