import React, { useState, useEffect } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import ChatCard from 'components/chatCard';
import MessengerContent from 'components/profile/profileContent/tabMessenger/messengerContent';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import 'react-chat-elements/dist/main.css';

export const Chat = ({ mangaStory, user, isOwn, collabActiveTab }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);

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

  if (!requests?.length) {
    return <p>There is no any request</p>;
  }

  return (
    <div>
      <div>
        <div className="row">
          {!selectedRequest ? (
            <div className={styles.messenger}>
              <h4 className={styles.subtitle}>New invites</h4>
              {requests.map(
                (r) =>
                  r.status === 'new' && (
                    <ChatCard
                      key={r._id}
                      isOwn={isOwn}
                      user={user}
                      rid={r._id}
                      status={r.status}
                      isInvite={r.isInvite}
                      messages={r.messages}
                      senderInfo={r.senderInfo}
                      conversations={r.conversations}
                      selectedRequest={selectedRequest}
                      setSelectedRequest={setSelectedRequest}
                    />
                  )
              )}
              <h4 className={styles.subtitle}>
                <span>Read invites</span>
                {isOwn && <span className={styles.delete}>Delete all</span>}
              </h4>
              {requests.map(
                (r) =>
                  r.status === 'accepted' && (
                    <ChatCard
                      key={r._id}
                      isOwn={isOwn}
                      user={user}
                      rid={r._id}
                      status={r.status}
                      isInvite={r.isInvite}
                      messages={r.messages}
                      senderInfo={r.senderInfo}
                      conversations={r.conversations}
                      selectedRequest={selectedRequest}
                      setSelectedRequest={setSelectedRequest}
                    />
                  )
              )}
            </div>
          ) : (
            <div className="chatBlock">
              <span className={styles.goBack} onClick={() => setSelectedRequest(null)}>
                ←
              </span>
              <MessengerContent
                user={user}
                selectedRequest={selectedRequest}
                requests={requests}
                setRequests={setRequests}
                setSelectedRequest={setSelectedRequest}
              />
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
