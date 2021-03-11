import React from 'react';

import client from 'api/client';
import PrimarySelect from 'components/ui-elements/select';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const setMailNotification = (id, type, onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');
  import('api/restClient').then((m) => {
    m.default
      .service('/api/v2/users')
      .patch(
        id,
        { mailNotification: type },
        {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
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

const MenuMailNotification = ({ user }) => {
  const mailOptions = [
    {
      key: 'always',
      value: 'always',
    },
    {
      key: 'fewDays',
      value: 'fewDays',
    },
    {
      key: 'never',
      value: 'never',
    },
  ];

  const changeMailNotification = (type) => {
    if (!user) return;
    setMailNotification(
      user._id,
      type,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      <PrimarySelect
        onChange={changeMailNotification}
        isLinear={true}
        isFullWidth={true}
        placeholder="Lenguage"
        dropdownClassName="mailNotificationSelect"
        value={user.mailNotification || undefined}
        options={mailOptions}
        className={styles.mail_not}
      />
    </>
  );
};

MenuMailNotification.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MenuMailNotification;
