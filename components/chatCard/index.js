import React, { useState } from 'react';

import { notification, Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';
import myAmplitude from 'utils/amplitude';

import { patchRequest } from '../../api/joinMangaStoryRequestClient';
import MessageHeaderAvatar from './messageHeaderAvatar';
import styles from './styles.module.scss';
import 'react-chat-elements/dist/main.css';

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
  mangaStoryId,
  isArchive,
  participentsInfo,
  setShowMessageMobile,
}) => {
  const [requests, setRequests] = useState([]);
  const showMessages = (e, sender) => {
    const newSelectedRequest = {
      rid,
      conversationId: e.currentTarget.dataset.id,
      name: sender?.name,
      isTeamChat,
      mangaStoryId,
      profileId,
      isArchive,
      participentsInfo,
      av: sender?.avatar
        ? client.UPLOAD_URL + sender?.avatar
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
            event_type,
            event_properties: { inviteRequestId: id },
          },
        ];
        myAmplitude(eventData);
      })
      .catch((err) => {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      });
  };

  const characterType = userTypesEnums[senderInfo?.types?.length && senderInfo?.types[0]];

  return (
    <div
      key={rid}
      className={cn(
        styles.item,
        isSmall && styles.isSmall,
        selectedRequest?.rid === rid && styles.selected
      )}
      onClick={(e) => {
        showMessages(e, senderInfo);
        setShowMessageMobile(true);
      }}
      data-id={conversations[0] && conversations[0]._id}>
      <div className={cn(styles.message_community, 'row')}>
        <div className={styles.mess_content}>
          <div className={cn(styles.title_block)}>
            <MessageHeaderAvatar senderInfo={senderInfo} isTeamChat={isTeamChat} />
            <div className={styles.name_special}>
              <div>
                <h4>{senderInfo && senderInfo?.name}</h4>
                {characterType && <p>{senderInfo && characterType}</p>}
                <p className={styles.messages}>{messages && messages.content}</p>
              </div>
            </div>
          </div>
          <span className={styles.dateBar}>
            {messages?.createdAt && format(messages?.createdAt)}
          </span>
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
  mangaStory: PropTypes.object,
  user: PropTypes.object.isRequired,
  rid: PropTypes.string.isRequired,
  isInvite: PropTypes.bool,
  messages: PropTypes.object,
  senderInfo: PropTypes.object.isRequired,
  conversations: PropTypes.array,
  setAv: PropTypes.func,
  isSmall: PropTypes.bool.isRequired,
  status: PropTypes.string,
  setSelectedRequest: PropTypes.func.isRequired,
  selectedRequest: PropTypes.object.isRequired,
  isTeamChat: PropTypes.bool.isRequired,
  profileId: PropTypes.string,
  isArchive: PropTypes.bool,
  participentsInfo: PropTypes.array,
  mangaStoryId: PropTypes.string,
  setShowMessageMobile: PropTypes.func.isRequired,
};

ChatCard.defaultProps = {
  conversations: [],
  profileId: null,
  isArchive: false,
  participentsInfo: [],
  mangaStoryId: null,
  messages: {},
  status: '',
  setAv: () => {},
  isInvite: false,
  mangaStory: {},
};

export default ChatCard;
