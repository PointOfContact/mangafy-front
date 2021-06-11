import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import NoRequest from 'components/noRequest';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import MessengerContent from './messengerContent';
import MessengerList from './messengerList';
import styles from './styles.module.scss';

const TabMessenger = (props) => {
  const { user } = props;
  const [requests, setRequests] = useState([]);
  const [arcRequests, setArcRequests] = useState(true);
  const [showArchive, setShowArchive] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [noRequest, setNoRequest] = useState(false);

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomLeft',
    });
  };

  const getConversation = (isArchive = true) => {
    const jwt = client.getCookie('feathers-jwt');
    const options = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/conversations')
        .find(options)
        .then((res) => {
          let newRequests;
          if (isArchive) {
            newRequests = res
              .filter((i) => !i.joinMangaStoryRequestId)
              .map((item) => ({
                _id: item._id,
                isTeamChat: !!item.mangaStoryId,
                conversations: [{ _id: item._id }],
                participents: item.participents,
                participentsInfo: [item.mangaStoryAuthor, ...item.participentsInfo],
                senderInfo:
                  (item.mangaStoryTitle && {
                    name: item.mangaStoryTitle,
                    avatar: item.mangaStoryImage,
                  }) ||
                  item.participentsInfo[0],
                messages: item.lastMessage,
              }))
              ?.reverse();
            if (newRequests.lengt === res.length && showArchive) setShowArchive(false);
          } else {
            newRequests = res
              .map((item) => ({
                _id: item._id,
                isTeamChat: !!item.mangaStoryId,
                conversations: [{ _id: item._id }],
                participents: item.participents,
                joinMangaStoryRequestId: item.joinMangaStoryRequestId,
                participentsInfo: [item.mangaStoryAuthor, ...item.participentsInfo],
                senderInfo:
                  (item.mangaStoryTitle && {
                    name: item.mangaStoryTitle,
                    avatar: item.mangaStoryImage,
                  }) ||
                  item.participentsInfo[0],
                messages: item.lastMessage,
              }))
              ?.reverse();
            setArcRequests(false);
          }
          if (newRequests.length) {
            setRequests(newRequests);
            const { conversation } = qs.parse(location.search);
            let newSelectedRequest = {};

            if (conversation) {
              const thisConv = newRequests.find((r) => r._id === conversation);
              newSelectedRequest = {
                rid: thisConv?._id,
                isTeamChat: !!thisConv?.isTeamChat,
                conversationId:
                  thisConv?.conversations[0]._id || newRequests[0].conversations[0]._id,
                name: thisConv?.senderInfo.name,
                av: client.UPLOAD_URL + thisConv?.senderInfo.avatar || '',
                profileId: thisConv?.senderInfo?._id,
                isArchive: !!thisConv?.joinMangaStoryRequestId,
                participentsInfo: thisConv?.participentsInfo,
              };
            } else {
              newSelectedRequest = {
                rid: newRequests[0]._id,
                conversationId: newRequests[0].conversations[0]._id,
                name: newRequests[0].senderInfo.name,
                av: client.UPLOAD_URL + newRequests[0].senderInfo.avatar || '',
                profileId: newRequests[0].senderInfo._id,
                isTeamChat: newRequests[0].isTeamChat,
                isArchive: !!newRequests[0].joinMangaStoryRequestId,
                participentsInfo: newRequests[0].participentsInfo,
              };
            }
            setSelectedRequest(newSelectedRequest);
          } else {
            setNoRequest(true);
          }
        })
        .catch((err) => {
          openNotification('error', err.message);
        });
    });
  };

  useEffect(() => {
    getConversation();
  }, []);

  const getRequest = () => {
    const jwt = client.getCookie('feathers-jwt');
    const options = {
      query: {
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
      headers: { Authorization: `Bearer ${jwt}` },
    };
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/join-manga-story-requests')
        .find(options)
        .then((res) => {
          setRequests(res.data);
          if (res.data?.length) {
            const data = res.data[0];
            const conversationId = data.conversations[0] && data.conversations[0]._id;
            const newSelectedRequest = {
              rid: data._id,
              status: data.status,
              conversationId,
              isInvite: data.isInvite,
              name: data.senderInfo?.name,
              av: data?.senderInfo?.avatar
                ? client.UPLOAD_URL + data.senderInfo.avatar
                : `https://ui-avatars.com/api/?background=9A87FE&name=${data.senderInfo?.name}&rounded=true&color=ffffff`,
            };
            setSelectedRequest(newSelectedRequest);
          } else {
            setNoRequest(true);
          }
        })
        .catch((err) => {
          openNotification('error', err.message);
        });
    });
  };

  return (
    <div>
      {/* <h2 className={cn(styles.title)}>Messenger</h2> */}
      {noRequest ? (
        <NoRequest />
      ) : (
        <div className={cn(styles.messenger_tab)}>
          <div className={cn(styles.messenger_list)}>
            <MessengerList
              arcRequests={arcRequests}
              getConversation={getConversation}
              showArchive={showArchive}
              requests={requests}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
            />
          </div>
          <div className={cn(styles.messenger_content)}>
            <MessengerContent
              user={user}
              selectedRequest={selectedRequest}
              requests={requests}
              setRequests={setRequests}
              setSelectedRequest={setSelectedRequest}
            />
          </div>
        </div>
      )}
    </div>
  );
};

TabMessenger.propTypes = {
  user: PropTypes.object.isRequired,
};

TabMessenger.defaultProps = {};

export default TabMessenger;
