import React, { useState } from 'react';

import { notification, Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';

import { patchRequest } from '../../api/joinMangaStoryRequestClient';
import styles from './styles.module.scss';
import 'react-chat-elements/dist/main.css';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const onAccept = (event, id, status) => {
  event.stopPropagation();
  return patchRequest(id, status);
};

const ChatCard = ({
  isOwn,
  user,
  rid,
  isInvite,
  messages,
  senderInfo,
  conversations,
  isSmall,
  status,
  profileId,
  setSelectedRequest,
  selectedRequest,
  isTeamChat,
  isArchive,
}) => {
  const [requests, setRequests] = useState([]);
  const showMessages = (e, sender) => {
    const newSelectedRequest = {
      rid,
      conversationId: e.currentTarget.dataset.id,
      name: sender.name,
      isTeamChat,
      profileId,
      isArchive,
      av: sender.avatar
        ? client.UPLOAD_URL + sender.avatar
        : `https://ui-avatars.com/api/?background=9A87FE&name=${sender?.name}&rounded=true&color=ffffff`,
    };
    setSelectedRequest(newSelectedRequest);
  };

  const setRecvestStatus = (event, id, status) => {
    onAccept(event, id, status)
      .then((res) => {
        const newRequest = [...requests];
        newRequest.map((item) => {
          if (item._id === res._id) {
            item.status = res.status;
          }
          return item;
        });
        setRequests(newRequest);

        const event_type = status === 'accepted' ? EVENTS.INVITE_ACCEPTED : EVENTS.INVITE_REJECTED;

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
      })
      .catch((err) => {
        notification.error({
          message: err.message,
        });
      });
  };
  return (
    <div
      key={rid}
      className={cn(
        styles.item,
        isSmall && styles.isSmall,
        selectedRequest?.rid === rid && styles.selected
      )}
      onClick={(e) => showMessages(e, senderInfo)}
      data-id={conversations[0] && conversations[0]._id}>
      <div className={cn(styles.message_community, 'row')}>
        <div className={styles.mess_content}>
          <div className={cn(styles.title_block)}>
            <div className={styles.avatar}>
              {senderInfo.avatar ? (
                <Imgix
                  className="avatar"
                  width={104}
                  height={104}
                  src={client.UPLOAD_URL + senderInfo.avatar}
                />
              ) : (
                (isTeamChat && (
                  <Imgix
                    className="avatar"
                    width={104}
                    height={104}
                    src={'https://mangafy.club/img/mangastory.webp'}
                  />
                )) || <Avatar text={senderInfo.name} className={styles.avatarName} fontSize={50} />
              )}
            </div>
            <div className={styles.name_special}>
              <div>
                <h4>{senderInfo && senderInfo.name}</h4>
                <p>{senderInfo && senderInfo.type}</p>
              </div>
              <p className={styles.messages}>{messages && messages.content}</p>
            </div>
          </div>
        </div>
        {isOwn && !isInvite && !isInvite && status === 'new' && (
          <div className={cn(styles.div_button, 'buttonsProfile_styles')}>
            <Popconfirm
              placement="top"
              title="Are you sure to reject the invite?"
              onClick={(event) => event.stopPropagation()}
              onConfirm={(event) => {
                setRecvestStatus(event, rid, 'rejected');
              }}
              okText="Yes"
              cancelText="No">
              <PrimaryButton className="buttonsProfile_cancel" text="Cancel" isDark isRound />
            </Popconfirm>
            <Popconfirm
              placement="top"
              title="Are you sure to accept the invite?"
              onConfirm={(event) => {
                setRecvestStatus(event, rid, 'accepted');
              }}
              onClick={(event) => event.stopPropagation()}
              okText="Yes"
              cancelText="No">
              <PrimaryButton className="buttonsProfile_save" text="save" isActive isRound />
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  );
};

ChatCard.propTypes = {
  isOwn: PropTypes.bool.isRequired,
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  rid: PropTypes.string.isRequired,
  isInvite: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  senderInfo: PropTypes.object.isRequired,
  conversations: PropTypes.array,
  setAv: PropTypes.func.isRequired,
  isSmall: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  setSelectedRequest: PropTypes.object.isRequired,
  selectedRequest: PropTypes.object.isRequired,
  isTeamChat: PropTypes.bool.isRequired,
  profileId: PropTypes.string,
  isArchive: PropTypes.bool,
};

ChatCard.defaultProps = {
  conversations: [],
  profileId: null,
  isArchive: false,
};

export default ChatCard;
