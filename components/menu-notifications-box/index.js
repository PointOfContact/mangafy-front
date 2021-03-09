import React from 'react';

import MenuNotificationsItem from 'components/menu-notifications-item/';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MenuNotificationsBox = ({ notifications, uid }) => {
  const verified = notifications?.read_by?.find((id) => id === uid);

  return (
    <>
      <div className={styles.box}>
        <div className={styles.box__title}>
          <p className={styles.box__title_text}>Your notifications</p>
        </div>
        <div className={styles.box__content}>
          {notifications.map((notification) => (
            <MenuNotificationsItem
              key={notification._id}
              image={notification.image}
              icon={notification.icon}
              title={notification.title}
              discription={notification.discription}
              createdAt={notification.createdAt}
              verified={verified}
            />
          ))}
        </div>
        <div className={styles.box__more}>
          <Link href="#">
            <a className={styles.box__more_button}>+2 More Updates</a>
          </Link>
        </div>
      </div>
    </>
  );
};

MenuNotificationsBox.propTypes = {
  notifications: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
};

export default MenuNotificationsBox;
