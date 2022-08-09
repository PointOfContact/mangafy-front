import React, { useState, useEffect } from 'react';

import { notification, Tooltip } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import MessengerContent from 'components/profile/profileContent/tabMessenger/messengerContent';
import Avatar from 'components/ui-elements/avatar';
import ShowSomeData from 'components/ui-elements/showSomeData';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import 'react-chat-elements/dist/main.css';

export const Chat = ({ mangaStory, user, isOwn, collabActiveTab }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [conversation, setConversation] = useState({});

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomLeft',
    });
  };

  const getConversation = () => {
    const jwt = client.getCookie('feathers-jwt');
    const options = {
      query: {
        mangaStoryId: mangaStory._id,
        isTeamChat: true,
      },
      headers: { Authorization: `Bearer ${jwt}` },
    };
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/conversations')
        .find(options)
        .then((res) => {
          setConversation(res[0] || {});
          setSelectedRequest({
            isTeamChat: true,
            conversationId: res[0]._id,
          });
        })
        .catch((err) => {
          openNotification('error', err.message);
        });
    });
  };
  useEffect(() => {
    getConversation();
  }, []);

  return (
    <div className={styles.chat}>
      <div className={styles.participents}>
        {[user].concat(conversation?.participentsInfo || []).map(
          ({ avatar, name }, index) =>
            index < 6 && (
              <Tooltip key={name} placement="topLeft" title={name} arrowPointAtCenter>
                <div className={styles.participentInfo}>
                  {avatar ? (
                    <Imgix
                      width={24}
                      height={24}
                      src={client.UPLOAD_URL + avatar}
                      alt="Picture of the user"
                    />
                  ) : (
                    <Avatar className={styles.avatar} text={name} />
                  )}
                </div>
              </Tooltip>
            )
        )}
        <ShowSomeData
          participantsData={conversation?.participentsInfo}
          size={40}
          deleteButton={false}
          isOwn={isOwn}
          user={user}
        />
      </div>

      {selectedRequest && (
        <MessengerContent
          user={user}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      )}
    </div>
  );

  //   if (!requests?.length) {
  //     return <NoRequest />;
  //   }
  //   return (
  //     <div>
  //       <div>
  //         <div className="row">
  //           {!selectedRequest ? (
  //             <div className={styles.messenger}>
  //               {user?._id === mangaStory.authorInfo._id && (
  //                 <>
  //                   <h4 className={styles.subtitle}>New invites</h4>
  //                   {requests.map(
  //                     (r) =>
  //                       r.status === 'new' && (
  //                         <ChatCard
  //                           key={r._id}
  //                           isOwn={isOwn}
  //                           user={user}
  //                           rid={r._id}
  //                           status={r.status}
  //                           isInvite={r.isInvite}
  //                           messages={r.messages}
  //                           senderInfo={r.senderInfo}
  //                           conversations={r.conversations}
  //                           selectedRequest={selectedRequest}
  //                           setSelectedRequest={setSelectedRequest}
  //                         />
  //                       )
  //                   )}
  //                 </>
  //               )}
  //               <h4 className={styles.subtitle}>
  //                 <span>Read invites</span>
  //                 {isOwn && <span className={styles.delete}>Delete all</span>}
  //               </h4>
  //               {requests.map(
  //                 (r) =>
  //                   r.status === 'accepted' && (
  //                     <ChatCard
  //                       key={r._id}
  //                       isOwn={isOwn}
  //                       user={user}
  //                       rid={r._id}
  //                       status={r.status}
  //                       isInvite={r.isInvite}
  //                       messages={r.messages}
  //                       senderInfo={r.senderInfo}
  //                       conversations={r.conversations}
  //                       selectedRequest={selectedRequest}
  //                       setSelectedRequest={setSelectedRequest}
  //                     />
  //                   )
  //               )}
  //             </div>
  //           ) : (
  //             <div className="chatBlock">
  //               <span className={styles.goBack} onClick={() => setSelectedRequest(null)}>
  //                 ←
  //               </span>
  //               <MessengerContent
  //                 user={user}
  //                 selectedRequest={selectedRequest}
  //                 requests={requests}
  //                 setRequests={setRequests}
  //                 setSelectedRequest={setSelectedRequest}
  //               />
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
};

Chat.propTypes = {
  mangaStory: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isOwn: PropTypes.bool.isRequired,
  collabActiveTab: PropTypes.string.isRequired,
};
