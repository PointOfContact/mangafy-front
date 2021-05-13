import React from 'react';

import { Skeleton } from 'antd';
import ChatCard from 'components/chatCard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import 'react-chat-elements/dist/main.css';

const MessengerList = ({
  user,
  requests,
  selectedRequest,
  setSelectedRequest,
  arcRequests,
  getConversation,
  showArchive,
}) => {
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
    <div className="row">
      <div className={styles.messenger}>
        {requests.map((r) => (
          <ChatCard
            isTeamChat={r.isTeamChat}
            key={r._id}
            isSmall={true}
            isOwn={false}
            user={user}
            rid={r._id}
            status={r.status}
            isInvite={r.isInvite}
            messages={r.messages}
            senderInfo={r.senderInfo || {}}
            conversations={r.conversations}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            profileId={r.senderInfo?._id}
            isArchive={r.joinMangaStoryRequestId}
            participentsInfo={r.participentsInfo}
          />
        ))}
      </div>
      {arcRequests && showArchive && (
        <div
          className={styles.archive}
          onClick={() => {
            getConversation(false);
          }}>
          Select Archive Messages
        </div>
      )}
    </div>
  );
};

MessengerList.propTypes = {
  user: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired,
  selectedRequest: PropTypes.object.isRequired,
  setSelectedRequest: PropTypes.func.isRequired,
  arcRequests: PropTypes.bool.isRequired,
  getConversation: PropTypes.func.isRequired,
  showArchive: PropTypes.bool.isRequired,
};

export default MessengerList;
