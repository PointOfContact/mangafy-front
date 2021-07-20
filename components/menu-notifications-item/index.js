import React, { useState } from 'react';

import { Tooltip } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import MenuNotificationsInvite from 'components/menu-notifications-invite';
import Avatar from 'components/ui-elements/avatar';
import moment from 'moment';
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
  type,
  requestId,
  user,
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
        <div>
          <Link href={navigateTo || '#'}>
            <div onClick={addUnreadNotificationsId} className={styles.flex}>
              <Link href={`/profile/${profileId}`}>
                <div className={styles.box__img}>
                  {icon ? (
                    <Imgix
                      width={52}
                      height={52}
                      src={`${client.UPLOAD_URL}${icon}`}
                      alt="MangaFy notification icon"
                    />
                  ) : (
                    <Avatar text={title} size={52} />
                  )}
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
                {image && (
                  <div className={styles.box__post}>
                    <Imgix
                      layout="fixed"
                      width={100}
                      height={50}
                      className={styles.box__image}
                      src={client.UPLOAD_URL + image}
                      alt="MangaFy notification"
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
          {(type === 'GET_INVITE_FOR_COLLABORATION' ||
            type === 'SOMEONE_REQUEST_FOR_COLLABORATION') && (
            <MenuNotificationsInvite
              type={type}
              user={user}
              navigateTo={navigateTo}
              requestId={requestId}
              addUnreadNotificationsId={addUnreadNotificationsId}
            />
          )}
          <div className={styles.box__date}>
            <p className={styles.box__date_text}>{moment(createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </>
  );
};
MenuNotificationsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  verified: PropTypes.bool,
  profileId: PropTypes.string.isRequired,
  patchNotification: PropTypes.func.isRequired,
  navigateTo: PropTypes.string,
  type: PropTypes.string,
  requestId: PropTypes.string,
  user: PropTypes.object.isRequired,
};

MenuNotificationsItem.defaultProps = {
  requestId: null,
  image: null,
  description: '',
  verified: false,
  navigateTo: '',
  type: null,
};

export default MenuNotificationsItem;
