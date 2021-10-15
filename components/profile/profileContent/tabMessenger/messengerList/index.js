import React from 'react';

import 'react-chat-elements/dist/main.css';
import { Skeleton } from 'antd';
import ChatCard from 'components/chatCard';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const MessengerList = ({
  user,
  requests,
  selectedRequest,
  setSelectedRequest,
  arcRequests,
  getConversation,
  showArchive,
  setShowMessageMobile,
}) => {
  if (!requests?.length) {
    return (
      <div className={styles.loading}>
        <Skeleton loading={true} active avatar></Skeleton>
        <Skeleton loading={true} active avatar></Skeleton>
        <Skeleton loading={true} active avatar></Skeleton>
      </div>
    );
  }

  const newRes = requests?.sort(
    (b, a) =>
      (a?.messages?.createdAt
        ? new Date(a?.messages?.createdAt)
        : new Date(a.createdAt)
      ).getTime() -
      (b?.messages?.createdAt ? new Date(b?.messages?.createdAt) : new Date(b.createdAt)).getTime()
  );

  return (
    <div className="row">
      <div className={styles.container}>
        <div className={styles.messenger}>
          {newRes?.map((r) => (
            <ChatCard
              isTeamChat={r.isTeamChat}
              mangaStoryId={r.mangaStoryId}
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
              setShowMessageMobile={setShowMessageMobile}
            />
          ))}
        </div>
      </div>
      {arcRequests && showArchive && (
        <div
          className={styles.archive}
          onClick={() => {
            getConversation(false);
          }}>
          <span className={styles.showAllMessages}>Show all messages</span>
          <span className={styles.showAll}>Show all</span>
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
  setShowMessageMobile: PropTypes.func.isRequired,
};

export default MessengerList;
