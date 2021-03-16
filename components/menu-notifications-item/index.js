import React, { useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MenuNotificationsItem = ({
  _id,
  title,
  image,
  icon,
  description,
  createdAt,
  verified,
  profileId,
  patchNotification,
  navigateTo,
}) => {
  const [verify, setVerifai] = useState(null);
  const addUnreadNotificationsId = () => {
    if (!verified && !verify) {
      setVerifai(true);
      const newUnreadNotificationsId = [_id];
      patchNotification(newUnreadNotificationsId);
    }
  };

  return (
    <>
      <div className={cn(styles.box, !verified && !verify && styles.verified)}>
        <Tooltip
          overlayClassName={cn(styles.tooltip, 'tooltip')}
          placement="leftTop"
          title="Mark as read">
          <button className={styles.isVerifiedBtn} onClick={addUnreadNotificationsId}></button>
        </Tooltip>
        <Link href={navigateTo || '#'}>
          <div onClick={addUnreadNotificationsId} className={styles.flex}>
            <Link href={`/profile/${profileId}`}>
              <div className={styles.box__img}>
                <Image
                  width={52}
                  height={52}
                  src={
                    icon
                      ? `${client.UPLOAD_URL}${icon}`
                      : `https://ui-avatars.com/api/?background=9A87FE&name=${title}&rounded=true&color=ffffff`
                  }
                  alt="Notification icon img"
                />
              </div>
            </Link>
            <div className={styles.box__content}>
              <div className={styles.box__title_wrap}>
                <div className={styles.box__title}>
                  <p className={styles.box__title_text}>{title}</p>
                </div>
                <div className={styles.box__description}>
                  <p className={styles.box__description_text}>{description}</p>
                </div>
              </div>
              <div className={styles.box__post}>
                <Image
                  layout="fixed"
                  width={100}
                  height={50}
                  className={styles.box__image}
                  src={client.UPLOAD_URL + image}
                  alt=""
                />
              </div>
              <div className={styles.box__date}>
                <p className={styles.box__date_text}>{moment(createdAt).fromNow()}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
MenuNotificationsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  profileId: PropTypes.string.isRequired,
  patchNotification: PropTypes.func.isRequired,
  navigateTo: PropTypes.string.isRequired,
};

export default MenuNotificationsItem;
