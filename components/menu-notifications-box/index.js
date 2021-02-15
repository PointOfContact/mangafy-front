import React from 'react';

import MenuNotificationsItem from 'components/menu-notifications-item/';
import Link from 'next/link';

import styles from './styles.module.scss';

const menuNotificationsBox = ({}) => (
  <>
    <div className={styles.box}>
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

export default menuNotificationsBox;
