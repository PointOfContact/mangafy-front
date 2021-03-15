import React, { useCallback, useEffect, useState } from 'react';

import client from 'api/client';
import MenuMailNotification from 'components/menu-mail-notifications';
import MenuNotificationsItem from 'components/menu-notifications-item/';
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

const findNotifications = (limit, onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');
  import('../../api/restClient').then((m) => {
    m.default
      .service('/api/v2/notifications')
      .find({
        query: {
          $sort: { createdAt: -1 },
          $limit: limit,
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

const MenuNotificationsBox = ({ user, unreadNotificationsId, notificationsCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [moreUpdatesCount, setMoreUpdatesCount] = useState(0);

  const getNotifications = useCallback(
    (limit = 10) => {
      if (!user) return;
      findNotifications(
        limit,
        (res) => {
          setNotifications(res?.data);
          setMoreUpdatesCount(res.total - res?.data.length);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    [user]
  );

  const patchNotification = (newUnreadNotificationsId) => {
    patchUnreadNotificationsId(
      newUnreadNotificationsId,
      () => {
        getNotifications();
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
  }, [user, getNotifications]);

  const getMore = () => {
    getNotifications(moreUpdatesCount + notifications.length);
  };

  return (
    <>
      <div className={styles.box}>
        {notificationsCount > 0 && (
          <p className={styles.make_all} onClick={() => makeAllRead()}>
            make all read
          </p>
        )}
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
              description={notification.description}
              createdAt={notification.createdAt}
              verified={notification?.read_by?.find((id) => id.readerId === user._id)}
              profileId={notification.meta.params.userId}
              patchNotification={patchNotification}
              _id={notification._id}
              navigateTo={notification.meta.navigateTo}
            />
          ))}
        </div>

        {!!moreUpdatesCount && (
          <div onClick={getMore} className={styles.box__more}>
            <a className={styles.box__more_button}>+{moreUpdatesCount} More Updates</a>
          </div>
        )}
        <div className={styles.box__more}>
          <MenuMailNotification user={user} />
        </div>
      </div>
    </>
  );
};

MenuNotificationsBox.propTypes = {
  user: PropTypes.object.isRequired,
  unreadNotificationsId: PropTypes.array.isRequired,
  notificationsCount: PropTypes.number,
};
MenuNotificationsBox.defaultProps = {
  notificationsCount: null,
};

export default MenuNotificationsBox;
