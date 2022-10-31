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
  params,
}) => {
  const [verify, setVerify] = useState(null);
  const querySymbol = navigateTo.includes('?') ? '&' : '?';
  const navigate =
    title === 'New Unread Comment.' ? `${navigateTo}${querySymbol}tab=comments` : navigateTo;

  const addUnreadNotificationsId = () => {
    if (!verified && !verify) {
      setVerify(true);
      const newUnreadNotificationsId = [_id];
      patchNotification(newUnreadNotificationsId);
    }
  };

  const AvatarNotifications = () => (
    <div className={styles.box__img}>
      {icon ? (
        <Imgix
          width={52}
          height={52}
          src={`${client.UPLOAD_URL}${icon}`}
          alt="MangaFy notification icon"
        />
      ) : (
        <Avatar text={type === 'NEW_POST_LIKE' ? params.userName : title} size={52} />
      )}
    </div>
  );

  const NotificationsItem = () => (
    <div onClick={addUnreadNotificationsId} className={styles.flex}>
      {profileId && profileId.length < 25 ? (
        <Link href={`/profile/${profileId}`}>
          <a>
            <AvatarNotifications />
          </a>
        </Link>
      ) : (
        <AvatarNotifications />
      )}
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
  );

  return (
    <>
      <div className={cn(styles.box, !verified && !verify && styles.verified)}>
        <Tooltip
          overlayClassName={cn(styles.tooltip, 'tooltip')}
          placement="leftTop"
          title="Mark as read"
        >
          <button className={styles.isVerifiedBtn} onClick={addUnreadNotificationsId}></button>
        </Tooltip>
        <div>
          {navigate ? (
            <Link href={navigate || '#'}>
              <a>
                <NotificationsItem />
              </a>
            </Link>
          ) : (
            <NotificationsItem />
          )}
          {(type === 'GET_INVITE_FOR_COLLABORATION' ||
            type === 'SOMEONE_REQUEST_FOR_COLLABORATION') && (
            <MenuNotificationsInvite
              type={type}
              user={user}
              navigateTo={navigate}
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
  icon: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  verified: PropTypes.bool,
  profileId: PropTypes.string,
  patchNotification: PropTypes.func.isRequired,
  navigateTo: PropTypes.string,
  type: PropTypes.string,
  requestId: PropTypes.string,
  user: PropTypes.object.isRequired,
  params: PropTypes.object,
};

MenuNotificationsItem.defaultProps = {
  requestId: null,
  image: null,
  description: '',
  verified: false,
  navigateTo: '',
  profileId: '',
  type: null,
  icon: '',
  params: {},
};

export default MenuNotificationsItem;
