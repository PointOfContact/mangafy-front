import React, { useState } from 'react';

import { Popover } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgWhiteChecked from 'components/icon/WhiteChecked';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const setMailNotification = (id, type, onSuccess, onFailure = () => {}) => {
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
  const [selectedItem, setSelectedItem] = useState(user.mailNotification);
  const mailOptions = [
    {
      key: 'always',
      value: 'Always',
    },
    {
      key: 'fewDays',
      value: 'Few Days',
    },
    {
      key: 'never',
      value: 'Never',
    },
  ];

  const changeMailNotification = (type) => {
    if (!user) return;
    setMailNotification(
      user?._id,
      type,
      () => {
        setSelectedItem(type);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const content = (
    <div>
      {mailOptions.map((item) => (
        <div
          key={item.key}
          className={cn(styles.dropItem, selectedItem === item.key && styles.selectId)}
          onClick={() => {
            changeMailNotification(item.key);
          }}>
          <p>{item.value}</p>
          <span>
            <SvgWhiteChecked width="25px" height="25px" />
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* <PrimarySelect
        onChange={changeMailNotification}
        isLinear={true}
        isFullWidth={true}
        placeholder="Lenguage"
        dropdownClassName="mailNotificationSelect"
        value={user.mailNotification || undefined}
        options={mailOptions}
        className={styles.mail_not}
      /> */}
      <Popover
        placement="top"
        content={content}
        trigger="click"
        overlayClassName={'mailNotificationSettingsPopover'}>
        <div className={styles.title}>Change the frequency of email alerts</div>
      </Popover>
    </>
  );
};

MenuMailNotification.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MenuMailNotification;
