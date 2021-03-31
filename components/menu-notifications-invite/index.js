import React, { useEffect, useState } from 'react';

import { Popconfirm } from 'antd';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { patchRequest, getRequest } from '../../api/joinMangaStoryRequestClient';
import styles from './styles.module.scss';

const MenuNotificationsInvite = ({ navigateTo, requestId, addUnreadNotificationsId }) => {
  const [status, setStatus] = useState('');
  const onAccept = (event, id, newStatus) => {
    event.stopPropagation();
    return patchRequest(id, newStatus);
  };

  const setRecvestStatus = (event, id, newStatus) => {
    onAccept(event, id, newStatus).then((res) => {
      setStatus(res.status);
      addUnreadNotificationsId();
      if (status === 'accepted') Router.push(`${navigateTo}`);
    });
  };

  useEffect(() => {
    getRequest(requestId).then((res) => {
      setStatus(res.status);
    });
  });

  return (
    <>
      {status === 'new' && (
        <div className={styles.status}>
          <div className={cn(styles.div_button, 'buttonsProfile_styles')}>
            <Popconfirm
              overlayClassName={styles.popconfirm}
              placement="top"
              title="Are you sure to disapprove this invite?"
              onClick={(event) => event.stopPropagation()}
              onConfirm={(event) => {
                setRecvestStatus(event, requestId, 'rejected');
              }}
              okText="Yes"
              cancelText="No">
              <PrimaryButton className="buttonsProfile_cancel" text="Cancel" isDark isRound />
            </Popconfirm>
            <Popconfirm
              placement="top"
              overlayClassName={styles.popconfirm}
              title="Are you sure to approve this invite?"
              onConfirm={(event) => {
                setRecvestStatus(event, requestId, 'accepted');
              }}
              onClick={(event) => event.stopPropagation()}
              okText="Yes"
              cancelText="No">
              <PrimaryButton className="buttonsProfile_save" text="save" isActive isRound />
            </Popconfirm>
          </div>
        </div>
      )}
      {status === 'accepted' && (
        <div className={styles.status}>
          <span>Invite is accepted!</span>
          {/* <div className={cn(styles.div_button, 'buttonsProfile_styles')}>
            <Popconfirm
              overlayClassName={styles.popconfirm}
              placement="top"
              title="Are you sure to disapprove this invite?"
              onClick={(event) => event.stopPropagation()}
              onConfirm={(event) => {
                setRecvestStatus(event, requestId, 'rejected');
              }}
              okText="Yes"
              cancelText="No">
              <PrimaryButton className="buttonsProfile_cancel" text="Cancel" isDark isRound />
            </Popconfirm>
          </div> */}
        </div>
      )}

      {status === 'rejected' && (
        <div className={styles.status}>
          <span>Invite is rejected</span>
        </div>
      )}
    </>
  );
};

MenuNotificationsInvite.propTypes = {
  addUnreadNotificationsId: PropTypes.func.isRequired,
  navigateTo: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
};

export default MenuNotificationsInvite;
