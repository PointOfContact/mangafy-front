import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { patchRequest, getRequest } from '../../api/joinMangaStoryRequestClient';
import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const MenuNotificationsInvite = ({
  navigateTo,
  requestId,
  addUnreadNotificationsId,
  user,
  type,
}) => {
  const [status, setStatus] = useState('');
  const onAccept = (event, id, newStatus) => {
    event.stopPropagation();
    return patchRequest(id, newStatus);
  };

  const setRecvestStatus = (event, id, newStatus) => {
    onAccept(event, id, newStatus).then((res) => {
      setStatus(res.status);
      addUnreadNotificationsId();
      let event_type = '';
      if (type === 'GET_INVITE_FOR_COLLABORATION') {
        event_type = status === 'accepted' ? EVENTS.INVITE_ACCEPTED : EVENTS.INVITE_REJECTED;
      } else {
        event_type = status === 'accepted' ? EVENTS.REQUEST_ACCEPTED : EVENTS.REQUEST_REJECTED;
      }
      const eventData = [
        {
          platform: 'WEB',
          event_type,
          event_properties: { inviteRequestId: id },
          user_id: user._id,
          user_properties: {
            ...user,
          },
        },
      ];
      amplitude.track(eventData);
      status === 'accepted' && Router.push(`${navigateTo}`);
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
            <PrimaryButton
              onClick={(event) => {
                setRecvestStatus(event, requestId, 'rejected');
              }}
              className="buttonsProfile_cancel"
              text="Cancel"
              isDark
              isRound
            />
            <PrimaryButton
              onClick={(event) => {
                setRecvestStatus(event, requestId, 'accepted');
              }}
              className="buttonsProfile_save"
              text="save"
              isActive
              isRound
            />
          </div>
        </div>
      )}
      {status === 'accepted' && (
        <div className={styles.status}>
          <span>Invite is accepted!</span>
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
  user: PropTypes.object.isRequired,
  addUnreadNotificationsId: PropTypes.func.isRequired,
  navigateTo: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MenuNotificationsInvite;
