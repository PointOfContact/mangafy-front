import React, { useState, useEffect } from 'react';

import { Input, notification, Popconfirm } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgCheck from 'components/icon/Check';
import PrimaryButton from 'components/ui-elements/button';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MessageList } from 'react-chat-elements';

import { patchRequest } from '../../api/joinMangaStoryRequestClient';
import SvgClose from '../icon/Close';
import styles from './styles.module.scss';

const onAccept = (event, id, status) => {
  event.stopPropagation();
  return patchRequest(id, status);
};
const AllMessages = ({ conversationId, user }) => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');

  const adaptData = (data) => {
    data.forEach((item) => {
      item.position = item.senderId === user._id ? 'left' : 'right';
      item.type = 'text';
      item.text = item.content;
      item.date = moment(item.createdAt).toDate();
    });
    return data;
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
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
          // setShowMessage(true);
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
          <img src="/img/send.svg" />
        </span>
      </div>
    </div>
  );
};

AllMessages.propTypes = {
  user: PropTypes.object.isRequired,
  conversationId: PropTypes.string.isRequired,
};

export const Chat = ({ user, requests: req, isOwn }) => {
  const [conversationId, setConversationId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [requests, setRequests] = useState(req);
  const showMessages = (e) => {
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
    });
  };

  return (
    <div>
      <div>
        <div className="row">
          {!showMessage ? (
            <div className={styles.messenger}>
              {requests.map((r) => (
                <div
                  key={r._id}
                  className="col-lg-12 "
                  onClick={showMessages}
                  data-id={r.conversations[0] && r.conversations[0]._id}>
                  <div className={cn(styles.message_community, 'row')}>
                    <div className={styles.mess_content}>
                      <div className={cn(styles.title_block)}>
                        <img
                          className="avatar"
                          src={
                            r.senderInfo.avatar
                              ? client.UPLOAD_URL + r.senderInfo.avatar
                              : `https://ui-avatars.com/api/?background=9A87FE&name=${r.senderInfo.name}&rounded=true&color=ffffff`
                          }
                          alt=""
                        />
                        <div className={styles.name_special}>
                          <h4>{r.senderInfo && r.senderInfo.name}</h4>
                          <p>{r.senderInfo && r.senderInfo.type}</p>
                        </div>
                      </div>
                      <p className={styles.messages}>
                        {r.messages && r.messages[0] && r.messages[0].content}
                      </p>
                    </div>
                    {r.status !== 'new' ? (
                      <div
                        className={
                          r.status === 'accepted'
                            ? styles.request_status_acp
                            : styles.request_status_rej
                        }>
                        {r.status}
                      </div>
                    ) : null}
                    {isOwn && r.status === 'new' ? (
                      <div className={styles.div_button}>
                        <Popconfirm
                          placement="top"
                          title="Are you sure to delete this task?"
                          onConfirm={(event) => {
                            setRecvestStatus(event, r._id, 'accepted');
                          }}
                          onClick={(event) => event.stopPropagation()}
                          okText="Yes"
                          cancelText="No">
                          <PrimaryButton
                            id="mangaStoryAcceptBtnId"
                            className={styles.accepct_btn}
                            text={<SvgCheck width="19px" height="19px" />}
                          />
                        </Popconfirm>

                        <Popconfirm
                          placement="top"
                          title="Are you sure to delete this task?"
                          onClick={(event) => event.stopPropagation()}
                          onConfirm={(event) => {
                            setRecvestStatus(event, r._id, 'rejected');
                          }}
                          okText="Yes"
                          cancelText="No">
                          <PrimaryButton
                            id="mangaStoryRejectBtnId"
                            isDark={true}
                            className={styles.dont_accepct_btn}
                            text={<SvgClose width="19px" height="19px" />}
                          />
                        </Popconfirm>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="chatBlock">
              <span className={styles.goBack} onClick={() => setShowMessage(false)}>
                ←
              </span>
              <AllMessages user={user} conversationId={conversationId} />
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
  requests: PropTypes.array.isRequired,
  isOwn: PropTypes.bool.isRequired,
};
