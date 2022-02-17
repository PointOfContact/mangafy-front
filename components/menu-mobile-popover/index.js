import React from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MenuMobilePopover = ({ removeAllStorage, user }) => (
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
        <Link href={`/profile/${user._id}`}>
          <a className={styles.box__link}>Profile</a>
        </Link>
      </div>
      <div className={styles.box__subtitle}>
        <Link href={`/profile/${user._id}?active=project`}>
          <a className={styles.box__link}>Project</a>
        </Link>
      </div>
      <div className={styles.box__subtitle}>
        {/* <Link href={`/profile/${user._id}`}>
          <a className={styles.box__link}>Edit collaboration availability</a>
        </Link>
        <Link href={`/profile/${user._id}`}>
          <a className={styles.box__link}>Account Settings</a>
        </Link> */}
        <span onClick={removeAllStorage}>
          <a className={styles.box__link}>Sign out</a>
        </span>
      </div>
    </div>
  </>
);

MenuMobilePopover.propTypes = {
  removeAllStorage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default MenuMobilePopover;
