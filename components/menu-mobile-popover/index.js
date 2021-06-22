import React, { useState } from 'react';

import MenuNotificationsBox from 'components/menu-notifications-box';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MenuMobilePopover = ({
  removeAllStorage,
  user,
  unreadNotificationsId,
  notificationsCount,
  showNotification,
  setShowNotification,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={styles.box}>
        {/* <div className={styles.box__title}>
        <p className={styles.box__title_text}>
          <Link href="/pricing">
            <span className={styles.box__go_to_pro}>
              Go to <span>PRO</span>
            </span>
          </Link>
        </p>
      </div> */}
        <div className={styles.box__subtitle}>
          <Link href="/my-profile">
            <a className={styles.box__libk}>Profile</a>
          </Link>
        </div>
        {user && (
          <span
            className={styles.inviteContainer}
            onClick={() => {
              setShowModal(!showModal);
              setShowNotification(!showNotification);
            }}>
            Invite members
          </span>
        )}
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
        <MenuNotificationsBox
          user={user}
          unreadNotificationsId={unreadNotificationsId}
          notificationsCount={notificationsCount}
          showModal={showModal}
          setShowModal={setShowModal}
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      </div>
    </>
  );
};

MenuMobilePopover.propTypes = {
  removeAllStorage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  unreadNotificationsId: PropTypes.array.isRequired,
  notificationsCount: PropTypes.number.isRequired,
  showNotification: PropTypes.bool,
  setShowNotification: PropTypes.func,
};

MenuMobilePopover.defaultProps = {
  showNotification: false,
  setShowNotification: () => {},
};

export default MenuMobilePopover;
