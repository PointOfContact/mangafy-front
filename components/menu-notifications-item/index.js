import React from 'react';

import client from 'api/client';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MenuNotificationsItem = ({ title, image, icon, discription, createdAt, verified }) => (
  <>
    <div className={cn(styles.box, !verified && styles.verified)}>
      <div className={styles.box__img}>
        <img src={client.UPLOAD_URL + icon} alt="" />
      </div>
      <div className={styles.box__content}>
        <div className={styles.box__title_wrap}>
          <div className={styles.box__title}>
            <p className={styles.box__title_text}>{title}</p>
          </div>
          <div className={styles.box__description}>
            <p className={styles.box__description_text}>{discription}</p>
          </div>
        </div>
        <div className={styles.box__post}>
          <img src={client.UPLOAD_URL + image} alt="" />
        </div>
        <div className={styles.box__date}>
          <p className={styles.box__date_text}>{createdAt}</p>
        </div>
      </div>
    </div>
  </>
);

MenuNotificationsItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  discription: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
};

export default MenuNotificationsItem;
