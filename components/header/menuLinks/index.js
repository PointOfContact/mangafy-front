import React, { useState } from 'react';

import cn from 'classnames';
import ModalCreateProject from 'components/modalCreateProject';
import PrimaryButton from 'components/ui-elements/button';
import { removeAllStorage } from 'helpers/shared';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const MenuLinks = ({ isOpen, user, setShowModal, handleMenuOpen }) => {
  const [createProjectModal, showCreateProjectModal] = useState(false);
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
        <div className={cn(styles.mobile_div_part1, !user && styles.mobile_div_part1_def)}>
          {user ? (
            <>
              <ul className={styles.main_list}>
                {/* <li className={styles.menu_item}>
                    <Link href="/collaborations?compensationModel=paid">Paid projects</Link>
                  </li> */}
                <h1>MangaFY Community</h1>
                <li className={styles.menu_item}>
                  <Link href="/collaborations">
                    <a>
                      <span className={styles.iconText}>📚</span>Collabs
                    </a>
                  </Link>
                </li>
                <li className={styles.menu_item}>
                  <Link href="/profiles">
                    <a>
                      <span className={styles.iconText}>👐</span>People
                    </a>
                  </Link>
                </li>
                <li className={styles.menu_item}>
                  <a>
                    <span className={styles.iconText} onClick={() => showCreateProjectModal(true)}>
                      ✏️
                    </span>
                    Create a collab
                  </a>
                </li>
                {/* <li className={styles.menu_item}>
                    <Link href="/pricing">Go Pro</Link>
                  </li> */}
              </ul>
              <ul className={cn(`${styles.main_list} ${styles.ul_login}`)}>
                <h2>Project</h2>
                <li className={styles.menu_item}>
                  <Link href={`/profile/${user?._id}`}>
                    <a>
                      <span className={styles.iconText}>🏠</span>Profile
                    </a>
                  </Link>
                </li>
                {/* <li className={styles.menu_item}>
                    <Link href="/collaborations?compensationModel=paid">Work Availability</Link>
                  </li> */}
                <li className={styles.menu_item}>
                  <Link href={`/profile/${user?._id}`}>
                    <a>
                      <span className={styles.iconText}>💡</span>My Notifications
                    </a>
                  </Link>
                </li>
                {/* <li className={styles.menu_item}>
                    <Link href="/settings">Account settings</Link>
                  </li> */}
                <li className={styles.menu_item} onClick={removeAllStorage}>
                  <Link href="/sign-in">
                    <a>
                      <span className={styles.iconText}>🔥</span>Sign out
                    </a>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className={styles.containerDesc}>
                <h2>
                  <span>MangaFY</span> Community of amazing webcomics creators
                </h2>
                <p>
                  We&apos;re a place where all webcomics creators share, stay up-to-date and grow
                  their careers.
                </p>
                <PrimaryButton text="Create new account" onClick={() => Router.push('/sign-up')} />
                <Link href={'/sign-in'}>
                  <a>Log in</a>
                </Link>
              </div>
              <ul className={styles.main_list}>
                <h3>MangaFY Community</h3>
                <li className={styles.menu_item}>
                  <Link href="/sign-in">
                    <a>
                      <span className={styles.iconText}>🔥</span>Sign in
                    </a>
                  </Link>
                </li>
                {/* <li className={styles.menu_item}>
                  <Link href="/collaborations?compensationModel=paid">Paid projects</Link>
                </li> */}
                <li className={styles.menu_item}>
                  <Link href="/collaborations">
                    <a>
                      <span className={styles.iconText}>📚</span>Collabs
                    </a>
                  </Link>
                </li>
                <li className={styles.menu_item}>
                  <a>
                    <span className={styles.iconText} onClick={() => showCreateProjectModal(true)}>
                      ✏️
                    </span>
                    Create a collab
                  </a>
                </li>
                <li className={styles.menu_item}>
                  <Link href="/profiles">
                    <a>
                      <span className={styles.iconText}>👐</span>People
                    </a>
                  </Link>
                </li>
                {/* <li className={styles.menu_item}>
                  <Link href="/pricing">Go Pro</Link>
                </li> */}
              </ul>
            </>
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
                  <span className={styles.iconText}>👐</span>Invite friends
                </div>
              </li>
            )}
          </ul>
          {/* <div className={styles.image_block}>
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
          </div> */}
        </div>
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
        user={user}
      />
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
