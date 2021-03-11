import React, { useCallback, useEffect, useState } from 'react';

import client from 'api/client';
import MenuMailNotification from 'components/menu-mail-notifications';
import MenuNotificationsItem from 'components/menu-notifications-item/';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const patchUnreadNotificationsId = (newUnreadNotificationsId, onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');
  import('../../api/restClient').then((m) => {
    m.default
      .service('/api/v2/notifications')
      .patch(
        null,
        {},
        {
          query: {
            _id: { $in: newUnreadNotificationsId },
          },
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onFailure(err);
        return err;
      });
  });
};

const findNotifications = (onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');
  import('../../api/restClient').then((m) => {
    m.default
      .service('/api/v2/notifications')
      .find({
        query: {
          $sort: { createdAt: -1 },
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onFailure(err);
        return err;
      });
  });
};

const MenuNotificationsBox = ({ user, unreadNotificationsId }) => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = useCallback(() => {
    if (!user) return;
    findNotifications(
      (res) => {
        setNotifications(res?.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [user]);

  const patchNotification = (newUnreadNotificationsId) => {
    patchUnreadNotificationsId(
      newUnreadNotificationsId,
      () => {
        findNotifications();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const makeAllRead = () => {
    patchNotification(unreadNotificationsId);
  };

  useEffect(() => {
    getNotifications();
  }, [user]);

  return (
    <>
      <div className={styles.box}>
        <p className={styles.make_all} onClick={() => makeAllRead()}>
          make all read
        </p>
        <div className={styles.box__title}>
          <p className={styles.box__title_text}>Your notifications</p>
        </div>
        <div className={styles.box__content}>
          {notifications?.map((notification) => (
            <MenuNotificationsItem
              key={notification._id}
              image={notification.image}
              icon={notification.icon}
              title={notification.title}
              discription={notification.discription}
              createdAt={notification.createdAt}
              verified={notification?.read_by?.find((id) => id.readerId === user._id)}
              profileId={notification.meta.params.userId}
              patchNotification={patchNotification}
              _id={notification._id}
              navigateTo={notification.meta.navigateTo}
            />
          ))}
        </div>

        <div className={styles.box__more}>
          <MenuMailNotification user={user} />
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
  user: PropTypes.object.isRequired,
  unreadNotificationsId: PropTypes.array.isRequired,
};

export default MenuNotificationsBox;
