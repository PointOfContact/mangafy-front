import React, { useState, useEffect } from 'react';

import { SendOutlined, BackwardOutlined } from '@ant-design/icons';
import { Input, notification } from 'antd';
import client from 'api/client';
import moment from 'moment';
import { MessageList } from 'react-chat-elements';

import SvgCheck from '../icon/Check';
import SvgClose from '../icon/Close';

const AllMessages = ({ conversationId, user }) => {
  const [messageList, setMessageList] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [value, setValue] = useState('');

  const adaptData = (data) => {
    data.forEach((item) => {
      item.position = item.senderId == user._id ? 'left' : 'right';
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
          setShowMessage(true);
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
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
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
        .then((res) => {
          getMessages(conversationId);
          setValue('');
        })
        .catch((err) => {
          openNotification('error', err.message);
          setValue('');
        });
    });
  };

  return (
    <div className="chatContainer">
      <div className="messageList" id="message-content">
        <MessageList
          className="message-list"
          lockable={false}
          toBottomHeight={'100%'}
          dataSource={messageList}
        />
      </div>
      <div className="chatBlock2">
        <Input placeholder="Type here..." value={value} onChange={handleChange} />
        <span className="sendMessage" onClick={sendMessage}>
          <SendOutlined />
        </span>
      </div>
    </div>
  );
};

export const Chat = ({ mangaStory = false, user = null, requests, isOwn }) => {
  const [conversationId, setConversationId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const showMessages = (e) => {
    const conversationId = e.currentTarget.dataset.id;
    setConversationId(conversationId);
    setShowMessage(true);
  };
  const _id = user ? user._id : null;
  if (!requests.length) {
    return <p>There is no any request</p>;
  }
  console.log(requests);
  return (
    <div>
      <div className="container">
        <div className="row">
          {!showMessage ? (
            requests.map((r) => (
              <div
                key={r._id}
                className="col-lg-12 "
                onClick={showMessages}
                data-id={r.conversations[0] && r.conversations[0]._id}>
                <div className="row message_community">
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <div className="title_block_community ">
                      <img
                        className="avatar"
                        src={
                          r.senderInfo.avatar
                            ? client.UPLOAD_URL + r.senderInfo.avatar
                            : `https://ui-avatars.com/api/?background=9A87FE&name=${r.senderInfo.name}&rounded=true&color=ffffff`
                        }
                        alt=""
                      />
                      <div className="name_special">
                        <h4>{r.senderInfo && r.senderInfo.name}</h4>
                        <p>{r.senderInfo && r.senderInfo.type}</p>
                      </div>
                    </div>
                    <p className="messages">
                      {r.messages && r.messages[0] && r.messages[0].content}
                    </p>
                  </div>
                  {r.status != 'new' ? <div className="request_status">{r.status}</div> : null}
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    {isOwn && r.status == 'new' ? (
                      <div className="div_buttons">
                        <button
                          id="mangaStoryAcceptBtnId"
                          onClick={() => {
                            this.onAccept(r._id, true);
                          }}
                          className="accepct_btn">
                          <SvgCheck width="21px" height="19px" />
                        </button>
                        <button
                          id="mangaStoryRejectBtnId"
                          onClick={() => {
                            this.onAccept(r._id, false);
                          }}
                          className="dont_accepct_btn">
                          <SvgClose width="18px" height="18px" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="chatBlock">
              <span className="goBack" onClick={() => setShowMessage(false)}>
                <BackwardOutlined />
              </span>
              <AllMessages user={user} conversationId={conversationId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
