import React from 'react';

import cn from 'classnames';
import Imgix from 'components/imgix';
import { removeAllStorage } from 'helpers/shared';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const MenuLinks = ({ isOpen, user, setShowModal, handleMenuOpen }) => {
  const initialLinks = [
    // {
    //   text: 'About Us',
    //   link: 'about',
    // },
    // {
    //   text: 'Terms',
    //   link: 'terms',
    // },
    // {
    //   text: 'Privacy Policy',
    //   link: 'privacy-policy',
    // },
    // { text: 'My Projects', link: `profile/${user?._id}?tab=gallery` },
  ];

  const links = initialLinks.map((link, i) => (
    <li className={styles.menu_item} key={i}>
      <Link href={`/${link.link}`}>
        <a>{link.text}</a>
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
                {/* <li className={styles.menu_item}>
                    <Link href="/collaborations?compensationModel=paid">Paid projects</Link>
                  </li> */}
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
                  <Link href={`/profile/${user?._id}`}>Profile</Link>
                </li>
                {/* <li className={styles.menu_item}>
                    <Link href="/collaborations?compensationModel=paid">Work Availability</Link>
                  </li> */}
                <li className={styles.menu_item}>
                  <Link href={`/profile/${user?._id}`}>My Notifications</Link>
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
              {/* <li className={styles.menu_item}>
                  <Link href="/collaborations?compensationModel=paid">Paid projects</Link>
                </li> */}
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
          <ul className={styles.links}>
            {links}
            {user && (
              <li className={styles.menu_item}>
                <div
                  onClick={() => {
                    handleMenuOpen(false);
                    setShowModal(true);
                  }}>
                  Invite friends
                </div>
              </li>
            )}
          </ul>
          <div className={styles.image_block}>
            <Imgix
              width={257}
              height={236}
              layout="fixed"
              src={
                user
                  ? 'https://mangafy.club/img/Frame2.webp'
                  : 'https://mangafy.club/img/Frame.webp'
              }
              alt="MangaFy frame"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

MenuLinks.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  setShowModal: PropTypes.func,
  handleMenuOpen: PropTypes.func,
};

MenuLinks.defaultProps = {
  showModal: false,
  setShowModal: () => {},
  handleMenuOpen: () => {},
};

export default MenuLinks;
