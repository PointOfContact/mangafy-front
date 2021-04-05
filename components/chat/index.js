import React, { useState, useEffect, useRef } from 'react';

import { Input, notification, Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MessageList } from 'react-chat-elements';

import { patchRequest } from '../../api/joinMangaStoryRequestClient';
import styles from './styles.module.scss';
import 'react-chat-elements/dist/main.css';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const onAccept = (event, id, status) => {
  event.stopPropagation();
  return patchRequest(id, status);
};
const AllMessages = ({ conversationId, user, avatar }) => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');

  const messanger = useRef(null);

  const adaptData = (data) => {
    data.forEach((item) => {
      item.position = 'left';
      item.type = 'text';
      item.text = item.content;
      item.date = moment(item.createdAt).toDate();
      item.avatar =
        item.senderId === user._id
          ? user.avatar
            ? client.UPLOAD_URL + user.avatar
            : `https://ui-avatars.com/api/?background=9A87FE&name=${user.name}&rounded=true&color=ffffff`
          : avatar;
    });
    return data;
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

  const getMessages = (conversationId) => {
    if (!conversationId) {
      return;
    }
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/messages')
        .find({
          query: {
            conversationId,
          },
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setMessageList(adaptData(res.data));
          // scrollToBottom();
        })
        .catch((err) => openNotification('error', err.message));
    });
  };

  useEffect(() => {
    getMessages(conversationId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages(conversationId);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (value) {
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

  return (
    <div className={styles.chatContainer}>
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
        <span className={styles.sendMessage} onClick={sendMessage}>
          <PrimaryButton text="send" />
        </span>
      </div>
    </div>
  );
};

AllMessages.propTypes = {
  user: PropTypes.object.isRequired,
  conversationId: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

AllMessages.defaultProps = {
  avatar: '',
};

export const Chat = ({ mangaStory, user, isOwn, collabActiveTab }) => {
  const [conversationId, setConversationId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [requests, setRequests] = useState([]);
  const [av, setAv] = useState('');

  useEffect(() => {
    if (collabActiveTab === '4') {
      getRequest();
    }
  }, [collabActiveTab]);

  const getRequest = () => {
    const jwt = client.getCookie('feathers-jwt');
    const options = {
      query: {
        mangaStoryId: mangaStory._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
      headers: { Authorization: `Bearer ${jwt}` },
    };
    if (user._id !== mangaStory.authorInfo._id) {
      options.query.senderId = user._id;
    }
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/join-manga-story-requests')
        .find(options)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {
          openNotification('error', err.message);
        });
    });
  };

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const showMessages = (e, sender) => {
    if (sender.avatar) {
      setAv(client.UPLOAD_URL + sender.avatar);
    } else {
      setAv(
        `https://ui-avatars.com/api/?background=9A87FE&name=${sender.name}&rounded=true&color=ffffff`
      );
    }
    const newConversationId = e.currentTarget.dataset.id;
    setConversationId(newConversationId);
    setShowMessage(true);
  };

  if (!requests?.length) {
    return <p>There is no any request</p>;
  }
  const setRecvestStatus = (event, id, status) => {
    onAccept(event, id, status).then((res) => {
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
    });
  };

  return (
    <div>
      <div>
        <div className="row">
          {!showMessage ? (
            <div className={styles.messenger}>
              <h4 className={styles.subtitle}>New invites</h4>
              {requests.map(
                (r) =>
                  r.status === 'new' && (
                    <div
                      key={r._id}
                      className="col-lg-12 "
                      onClick={(e) => showMessages(e, r.senderInfo)}
                      data-id={r.conversations[0] && r.conversations[0]._id}>
                      <div className={cn(styles.message_community, 'row')}>
                        <div className={styles.mess_content}>
                          <div className={cn(styles.title_block)}>
                            <div className={styles.avatar}>
                              {r.senderInfo.avatar ? (
                                <Imgix
                                  className="avatar"
                                  width={104}
                                  height={104}
                                  src={client.UPLOAD_URL + r.senderInfo.avatar}
                                />
                              ) : (
                                <Avatar
                                  text={r.senderInfo.name}
                                  className={styles.avatarName}
                                  fontSize={50}
                                />
                              )}
                            </div>
                            <div className={styles.name_special}>
                              <div>
                                <h4>{r.senderInfo && r.senderInfo.name}</h4>
                                <p>{r.senderInfo && r.senderInfo.type}</p>
                              </div>
                              <p className={styles.messages}>
                                {r.messages && r.messages[0] && r.messages[0].content}
                              </p>
                            </div>
                          </div>
                        </div>
                        {isOwn && !r.isInvite && (
                          <div className={cn(styles.div_button, 'buttonsProfile_styles')}>
                            <Popconfirm
                              placement="top"
                              title="Are you sure to reject the invite?"
                              onClick={(event) => event.stopPropagation()}
                              onConfirm={(event) => {
                                setRecvestStatus(event, r._id, 'rejected');
                              }}
                              okText="Yes"
                              cancelText="No">
                              <PrimaryButton
                                className="buttonsProfile_cancel"
                                text="Cancel"
                                isDark
                                isRound
                              />
                            </Popconfirm>
                            <Popconfirm
                              placement="top"
                              title="Are you sure to accept the invite?"
                              onConfirm={(event) => {
                                setRecvestStatus(event, r._id, 'accepted');
                              }}
                              onClick={(event) => event.stopPropagation()}
                              okText="Yes"
                              cancelText="No">
                              <PrimaryButton
                                className="buttonsProfile_save"
                                text="save"
                                isActive
                                isRound
                              />
                            </Popconfirm>
                          </div>
                        )}
                      </div>
                    </div>
                  )
              )}
              <h4 className={styles.subtitle}>
                <span>Read invites</span>
                {isOwn && <span className={styles.delete}>Delete all</span>}
              </h4>
              {requests.map(
                (r) =>
                  r.status === 'accepted' && (
                    <div
                      key={r._id}
                      className="col-lg-12 "
                      onClick={(e) => showMessages(e, r.senderInfo)}
                      data-id={r.conversations[0] && r.conversations[0]._id}>
                      <div className={cn(styles.message_community, styles.accepted_message, 'row')}>
                        <div className={styles.mess_content}>
                          <div className={cn(styles.title_block)}>
                            <div className={styles.avatar}>
                              {r.senderInfo.avatar ? (
                                <Imgix
                                  className="avatar"
                                  width={104}
                                  height={104}
                                  src={client.UPLOAD_URL + r.senderInfo.avatar}
                                />
                              ) : (
                                <Avatar
                                  text={r.senderInfo.name}
                                  className={styles.avatarName}
                                  fontSize={50}
                                />
                              )}
                            </div>
                            <div className={styles.name_special}>
                              <div>
                                <h4>{r.senderInfo && r.senderInfo.name}</h4>
                                <p>{r.senderInfo && r.senderInfo.type}</p>
                              </div>
                              <p className={styles.messages}>
                                {r.messages && r.messages[0] && r.messages[0].content}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="chatBlock">
              <span className={styles.goBack} onClick={() => setShowMessage(false)}>
                ←
              </span>
              <AllMessages user={user} conversationId={conversationId} avatar={av} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  collabActiveTab: PropTypes.number.isRequired,
};
