import React from 'react';

import cn from 'classnames';
import MenuNotificationsBox from 'components/menu-notifications-box';
import ButtonToggle from 'components/ui-elements/button-toggle';
import Link from 'next/link';

import styles from './styles.module.scss';

const headerNotification = ({}) => (
  <>
    <div className={cn(styles.box, styles.box_position_right, styles.box_width_273)}>
      <button className={styles.box__pro}>
        <span className={styles.box__pro_text}>Go to</span>
        <span className={cn(styles.box__pro_text, styles.box__pro_text__color)}>pro</span>
      </button>
      <div className={styles.box__nav}>
        <div className={styles.box__nav_item}>
          <Link href="#">
            <a className={styles.box__nav_item__text}>Profile</a>
          </Link>
          <Link href="#">
            <a className={styles.box__nav_item__text}>Edit Profile</a>
          </Link>
        </div>
      </div>
      <div className={styles.box__nav}>
        <div className={styles.box__nav_item}>
          <Link href="#">
            <a className={styles.box__nav_item__text}>Edit collaboration availability</a>
          </Link>
          <Link href="#">
            <a className={styles.box__nav_item__text}>Account Settings</a>
          </Link>
          <Link href="#">
            <a className={styles.box__nav_item__text}>Sign out</a>
          </Link>
        </div>
      </div>
      <div className={styles.box__toggle}>
        <ButtonToggle />
      </div>
      <div className={styles.box__notifications}>
        <MenuNotificationsBox />
      </div>
    </div>
  </>
);

export default headerNotification;
