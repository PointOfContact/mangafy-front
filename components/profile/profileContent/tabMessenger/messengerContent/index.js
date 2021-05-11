import React, { useState, useEffect, useRef } from 'react';

import { Input, notification, Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import ModalInvites from 'components/modals/sendInvites';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MessageList } from 'react-chat-elements';

import { patchRequest } from '../../../../../api/joinMangaStoryRequestClient';
import styles from './styles.module.scss';

import 'react-chat-elements/dist/main.css';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
let interval;
const onAccept = (event, id, status) => {
  event.stopPropagation();
  return patchRequest(id, status);
};

const MessengerContent = ({ user, selectedRequest, setSelectedRequest, requests, setRequests }) => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');
  const [showModal, changeShowModal] = useState(false);

  const messanger = useRef(null);
  const { conversationId, name, profileId } = selectedRequest;
  const adaptData = (data, participants) => {
    data.forEach((item) => {
      let avatar;
      const part = participants.find((p) => p._id === item.senderId);
      if (part?.avatar) {
        avatar = client.UPLOAD_URL + part.avatar;
      } else {
        avatar = `https://ui-avatars.com/api/?background=9A87FE&name=${part?.name}&rounded=true&color=ffffff`;
      }
      // avatar = part?.avatar :
      item.position = 'left';
      item.type = 'text';
      item.text = item.joinMangaStoryRequest?.length ? (
        <div className={styles.name}>
          {item.content}
          {item.joinMangaStoryRequest[0].isInvite &&
            item.joinMangaStoryRequest[0].status === 'new' &&
            item.joinMangaStoryRequest[0].senderInfo._id === user._id && (
              <div className={cn(styles.div_button, 'buttonsProfile_styles')}>
                <Popconfirm
                  placement="top"
                  title="Are you sure to reject the invite?"
                  onClick={(event) => event.stopPropagation()}
                  onConfirm={(event) => {
                    setRecvestStatus(event, item.joinMangaStoryRequestId, 'rejected');
                  }}
                  okText="Yes"
                  cancelText="No">
                  <PrimaryButton className="buttonsProfile_cancel" text="Cancel" isDark isRound />
                </Popconfirm>
                <Popconfirm
                  placement="top"
                  title="Are you sure to accept the invite?"
                  onConfirm={(event) => {
                    setRecvestStatus(event, item.joinMangaStoryRequestId, 'accepted');
                  }}
                  onClick={(event) => event.stopPropagation()}
                  okText="Yes"
                  cancelText="No">
                  <PrimaryButton className="buttonsProfile_save" text="save" isActive isRound />
                </Popconfirm>
              </div>
            )}
          {item.joinMangaStoryRequest[0].isInvite &&
            item.joinMangaStoryRequest[0].status === 'new' && (
              <span className={styles.status}> Pending invite </span>
            )}
          {item.joinMangaStoryRequest[0].status === 'accepted' && (
            <span
              className={cn(
                styles.status,
                item.joinMangaStoryRequest[0].status === 'accepted' && styles.request_status_acp
              )}>
              Accepted
            </span>
          )}
          {item.joinMangaStoryRequest[0].status === 'rejected' && (
            <span
              className={cn(
                styles.status,
                item.joinMangaStoryRequest[0].status === 'rejected' && styles.request_status_rej
              )}>
              Rejected
            </span>
          )}
        </div>
      ) : (
        item.content
      );
      item.date = moment(item.createdAt).toDate();
      item.avatar = avatar;
    });
    return data.reverse();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };
  const scrollToBottom = () => {
    messanger.current.mlistRef.scrollIntoView(false);
  };

  const getMessages = () => {
    if (!conversationId) {
      return;
    }
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/conversations')
        .get(conversationId, {
          query: {},
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setMessageList(adaptData(res.messages, res.participentsInfo));
          // scrollToBottom();
        })
        .catch((err) => openNotification('error', err.message));
    });
  };

  useEffect(() => {
    getMessages(conversationId);
  }, [conversationId]);

  useEffect(() => {
    clearInterval(interval);
    interval = setInterval(() => {
      getMessages(conversationId);
    }, 3000);
    // return () => clearInterval(interval);
  }, [conversationId]);

  const isShowModal = () => {
    const el = document.body;
    if (showModal) {
      el.classList.add(styles.body_scrool);
    } else {
      el.classList.remove(styles.body_scrool);
    }
  };

  const sendMessage = (isInviteType = false) => {
    if (isInviteType) {
      if (user.mangaStories?.data?.length && !(user?._id === profileId)) {
        changeShowModal(true);
        isShowModal();
      } else {
        openNotification('error', "You don't have manga story");
      }
    } else if (value) {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        setValue('');
        m.default
          .service('/api/v2/messages')
          .create(
            {
              content: value,
              conversationId,
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
          .then(() => {
            getMessages(conversationId);
          })
          .catch((err) => {
            openNotification('error', err.message);
          });
      });
    }
  };

  const handleKeyPressSend = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const setRecvestStatus = (event, id, status) => {
    onAccept(event, id, status).then((res) => {
      const newRequest = [...requests];
      newRequest.map((item) => {
        if (item._id === res._id) {
          item.status = res.status;
        }
        return item;
      });
      const newSelectedRequest = { ...selectedRequest, status: res.status };
      setSelectedRequest(newSelectedRequest);
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
    });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.userName}>{name}</div>
      <div className={styles.messageList} id="message-content">
        <MessageList
          ref={messanger}
          className={styles.message_list}
          lockable={false}
          toBottomHeight={'100%'}
          dataSource={messageList}
        />
      </div>
      <div className={styles.chatBlock2}>
        <Input
          placeholder="Type here..."
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPressSend}
        />
        <span className={styles.sendMessage}>
          {!selectedRequest.isTeamChat && (
            <PrimaryButton text="send Invite" onClick={() => sendMessage(true)} />
          )}
          <PrimaryButton text="send Message" onClick={() => sendMessage(false)} />
        </span>
      </div>
      <ModalInvites
        user={user}
        profile={{ _id: profileId }}
        changeShowModal={(e) => {
          changeShowModal(e);
          isShowModal();
        }}
        showModal={showModal}
      />
    </div>
  );
};

MessengerContent.propTypes = {
  user: PropTypes.object.isRequired,
  selectedRequest: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  setRequests: PropTypes.func.isRequired,
  setSelectedRequest: PropTypes.func.isRequired,
};

MessengerContent.defaultProps = {
  avatar: '',
};

export default MessengerContent;
