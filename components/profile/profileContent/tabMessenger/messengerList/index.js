import React from 'react';

import { Skeleton } from 'antd';
import ChatCard from 'components/chatCard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import 'react-chat-elements/dist/main.css';

const MessengerList = ({ user, requests, selectedRequest, setSelectedRequest }) => {
  if (!requests?.length) {
    return (
      <div className={styles.loding}>
        <Skeleton loading={true} active avatar></Skeleton>
        <Skeleton loading={true} active avatar></Skeleton>
        <Skeleton loading={true} active avatar></Skeleton>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="row">
          <div className={styles.messenger}>
            {requests.map((r) => (
              <ChatCard
                key={r._id}
                isSmall={true}
                isOwn={false}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MessengerList.propTypes = {
  user: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  requests: PropTypes.object.isRequired,
  selectedRequest: PropTypes.object.isRequired,
  setSelectedRequest: PropTypes.func.isRequired,
};

export default MessengerList;
