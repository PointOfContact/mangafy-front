import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import NoRequest from 'components/noRequest';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import MessengerContent from './messengerContent';
import MessengerList from './messengerList';
import styles from './styles.module.scss';
import UserName from './userName';

const TabMessenger = (props) => {
  const { user } = props;
  const [requests, setRequests] = useState([]);
  const [arcRequests, setArcRequests] = useState(true);
  const [showArchive, setShowArchive] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [noRequest, setNoRequest] = useState(false);
  const router = useRouter();
  console.log(!!router.query.conversation, 10);
  const [showMessageMobile, setShowMessageMobile] = useState();
  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomLeft',
    });
  };

  const messageData = (item) => {
    const messageData = {
      _id: item._id,
      createdAt: item.createdAt || new Date(0),
      isTeamChat: !!item.mangaStoryId,
      conversations: [{ _id: item._id }],
      participents: item.participents,
      senderInfo:
        (item.mangaStoryTitle && {
          name: item.mangaStoryTitle,
          avatar: item.mangaStoryImage,
        }) ||
        item.participentsInfo[0],
      messages: item.lastMessage,
    };

    if (item.mangaStoryId) messageData.mangaStoryId = item.mangaStoryId;
    if (item.mangaStoryAuthor)
      messageData.mangaStoryAuthor = [item.mangaStoryAuthor, ...item.participentsInfo];
    return messageData;
  };

  const getNewSelectedRequest = (item) => ({
    rid: item?._id,
    mangaStoryId: item?.mangaStoryId,
    isTeamChat: !!item?.isTeamChat,
    name: item?.senderInfo?.name,
    av: client.UPLOAD_URL + item?.senderInfo.avatar || '',
    profileId: item?.senderInfo?._id,
    isArchive: !!item?.joinMangaStoryRequestId,
    participentsInfo: item?.participentsInfo,
  });

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
              .map(messageData)
              ?.reverse();
            if (newRequests.length === res.length && showArchive) setShowArchive(false);
          } else {
            newRequests = res.map(messageData)?.reverse();
            setArcRequests(false);
          }

          if (newRequests.length) {
            const getExistData = newRequests.filter((value) => !!value.senderInfo);
            setRequests(getExistData);
            const { conversation } = qs.parse(window.location.search);
            const thisConv = newRequests.find((r) => r._id === conversation);
            let newSelectedRequest;
            if (thisConv) {
              newSelectedRequest = getNewSelectedRequest(thisConv);
              newSelectedRequest.conversationId =
                thisConv?.conversations[0]?._id || newRequests[0]?.conversations[0]?._id;
            } else {
              newSelectedRequest = getNewSelectedRequest(thisConv);
              newSelectedRequest.conversationId = newRequests[0]?.conversations[0]?._id;
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
    setShowMessageMobile(!!router.query.conversation);
  }, []);

  return (
    <div>
      <h2 className={cn(styles.title)}>Messenger</h2>
      {noRequest ? (
        <NoRequest />
      ) : (
        <div className={cn(styles.messenger_tab)}>
          {/* <SearchInput mobile={true} /> */}
          {/* {showMessageMobile && (
            <UserName
              selectedRequest={selectedRequest}
              mobile={true}
              setShowMessageMobile={setShowMessageMobile}
            />
          )} */}
          <div className={styles.content}>
            <div
              className={cn(
                showMessageMobile && styles.messenger_list_mobile,
                styles.messenger_list
              )}>
              <MessengerList
                user={user}
                arcRequests={arcRequests}
                getConversation={getConversation}
                showArchive={showArchive}
                requests={requests}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
                setShowMessageMobile={setShowMessageMobile}
              />
            </div>
            <div
              className={cn(
                showMessageMobile && styles.messenger_content_mobile,
                styles.messenger_content
              )}>
              <MessengerContent
                user={user}
                selectedRequest={selectedRequest}
                requests={requests}
                setRequests={setRequests}
                setSelectedRequest={setSelectedRequest}
              />
            </div>
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
