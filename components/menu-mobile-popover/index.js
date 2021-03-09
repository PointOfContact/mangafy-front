import React from 'react';

import MenuNotificationsItem from 'components/menu-notifications-item/';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MenuMobilePopover = ({ removeAllStorage }) => (
  <>
    <div className={styles.box}>
      <div className={styles.box__title}>
        <p className={styles.box__title_text}>
          <Link href="/pricing">
            <span className={styles.box__go_to_pro}>
              Go to <span>PRO</span>
            </span>
          </Link>
        </p>
      </div>
      <div className={styles.box__subtitle}>
        <Link href="/my-profile">
          <a className={styles.box__libk}>Profile</a>
        </Link>
      </div>
      <div className={styles.box__subtitle}>
        {/* <Link href="/my-profile">
          <a className={styles.box__libk}>Edit collaboration availability</a>
        </Link>
        <Link href="/my-profile">
          <a className={styles.box__libk}>Account Settings</a>
        </Link> */}
        <span onClick={removeAllStorage}>
          <a className={styles.box__libk}>Sign out</a>
        </span>
      </div>
      <div className={styles.box__title}>
        <p className={styles.box__title_text}>Your notifications</p>
      </div>
      <div className={styles.box__content}>
        <MenuNotificationsItem />
        <MenuNotificationsItem />
        <MenuNotificationsItem />
      </div>
      <div className={styles.box__more}>
        <Link href="#">
          <a className={styles.box__more_button}>+2 More Updates</a>
        </Link>
      </div>
    </div>
  </>
);

MenuMobilePopover.propTypes = {
  removeAllStorage: PropTypes.func.isRequired,
};

export default MenuMobilePopover;
