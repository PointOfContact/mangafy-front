import React, { useState, useEffect, useRef } from 'react';

import { Input, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import ModalInvites from 'components/modals/sendInvites';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import moment from 'moment';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { MessageList } from 'react-chat-elements';

import 'react-chat-elements/dist/main.css';
import { patchRequest } from '../../../../../api/joinMangaStoryRequestClient';
import UserName from '../userName';
import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
let interval;
const onAccept = (event, id, status) => {
  event.stopPropagation();
  return patchRequest(id, status);
};

const MessengerContent = ({ user, selectedRequest, setSelectedRequest, requests, setRequests }) => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');
  const [showModal, changeShowModal] = useState(false);

  const messanger = useRef(null);
  const { conversationId, name, profileId } = selectedRequest;
  const adaptData = (data, participants) => {
    data.forEach((item) => {
      let avatar;
      const part = participants.find((p) => p._id === item.senderId);
      if (part?.avatar) {
        avatar = client.UPLOAD_URL + part.avatar;
      } else {
        avatar = `https://ui-avatars.com/api/?background=9A87FE&name=${part?.name}&rounded=true&color=ffffff`;
      }
      item.position = user._id === item.senderId ? 'left' : 'right';
      item.type = 'text';
      item.text = item.joinMangaStoryRequest?.length ? (
        <div className={styles.name}>
          {item.joinMangaStoryRequest[0].mangaStory?.title && (
            <h2 className={styles.mangaTitle}>{item.joinMangaStoryRequest[0].mangaStory?.title}</h2>
          )}
          <p className={styles.messText}>{item.content}</p>
          <div className={styles.statusContainer}>
            {item.joinMangaStoryRequest[0].status === 'new' && (
              <span className={styles.status}> Pending invite </span>
            )}
            {item.joinMangaStoryRequest[0].status === 'accepted' && (
              <span
                className={cn(
                  styles.status,
                  item.joinMangaStoryRequest[0].status === 'accepted' && styles.request_status_acp
                )}>
                Accepted
              </span>
            )}
            {item.joinMangaStoryRequest[0].status === 'rejected' && (
              <span
                className={cn(
                  styles.status,
                  item.joinMangaStoryRequest[0].status === 'rejected' && styles.request_status_rej
                )}>
                Rejected
              </span>
            )}
            {item.joinMangaStoryRequest[0].status === 'new' &&
              ((user._id === item.joinMangaStoryRequest[0].mangaStory?.author &&
                !item.joinMangaStoryRequest[0].isInvite) ||
                (user._id === item.joinMangaStoryRequest[0].senderId &&
                  item.joinMangaStoryRequest[0].isInvite)) && (
                <div className={cn(styles.div_button, 'buttonsProfile_styles')}>
                  <PrimaryButton
                    onClick={(event) => {
                      setRecvestStatus(event, item.joinMangaStoryRequestId, 'rejected');
                    }}
                    className={styles.buttonsProfile_cancel}
                    text="Cancel"
                    isDark
                    isRound
                  />
                  <PrimaryButton
                    className={styles.buttonsProfile_save}
                    text="save"
                    isActive
                    isRound
                    onClick={(event) => {
                      setRecvestStatus(event, item.joinMangaStoryRequestId, 'accepted');
                    }}
                  />
                </div>
              )}
          </div>
        </div>
      ) : (
        <p className={styles.messText} style={{ marginBottom: '-5px' }}>
          {item.content}
        </p>
      );
      item.date = moment(item.createdAt).toDate();
      item.avatar = avatar;
    });
    return data.reverse();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomLeft',
    });
  };
  const scrollToBottom = () => {
    messanger.current.mlistRef.scrollIntoView(false);
  };

  const getMessages = () => {
    if (!conversationId) {
      return;
    }
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/conversations')
        .get(conversationId, {
          query: {},
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setMessageList(adaptData(res.messages, res.participentsInfo));
          // scrollToBottom();
        })
        .catch((err) => openNotification('error', err.message));
    });
  };

  useEffect(() => {
    getMessages(conversationId);
    clearInterval(interval);
    interval = setInterval(() => {
      getMessages(conversationId);
    }, 3000);
  }, [conversationId]);

  useEffect(() => () => clearInterval(interval), []);

  const isShowModal = () => {
    const el = document.body;
    if (showModal) {
      el.classList.add(styles.body_scroll);
    } else {
      el.classList.remove(styles.body_scroll);
    }
  };

  const sendMessage = (isInviteType = false) => {
    if (isInviteType) {
      if (user.mangaStories?.data?.length && !(user?._id === profileId)) {
        changeShowModal(true);
        isShowModal();
      } else {
        openNotification('error', "You don't have manga story");
      }
    } else if (value) {
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

  const setRecvestStatus = (event, id, status) => {
    onAccept(event, id, status).then((res) => {
      const newRequest = [...requests];
      newRequest.map((item) => {
        if (item._id === res._id) {
          item.status = res.status;
        }
        return item;
      });
      const newSelectedRequest = { ...selectedRequest, status: res.status };
      setSelectedRequest(newSelectedRequest);
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

  // const members = (data) => (
  //   <div className={styles.participentsContent}>
  //     {data?.map((item, index) => (
  //       <div key={index}>
  //         <Link key={item?.id} href={`/profile/${item?.id}`}>
  //           <a className={styles.participentName}>
  //             {item.avatar ? (
  //               <Imgix
  //                 width={50}
  //                 height={50}
  //                 src={client.UPLOAD_URL + item.avatar}
  //                 alt="Picture of the user"
  //               />
  //             ) : (
  //               <Avatar text={item.name} size={50} />
  //             )}
  //             <div className={styles.info}>
  //               <h2>{item.name}</h2>
  //             </div>
  //           </a>
  //         </Link>
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className={styles.chatContainer}>
      {selectedRequest.participentsInfo && <UserName selectedRequest={selectedRequest} />}
      <div className={styles.messageList} id="message-content">
        <MessageList
          ref={messanger}
          className={styles.message_list}
          lockable={false}
          toBottomHeight={'100%'}
          dataSource={messageList}
          onClick={(messData, index, e) => {
            if (e.target.classList.contains('rce-avatar')) {
              if (messData.senderId === user._id) {
                Router.push(`/my-profile`);
              } else {
                Router.push(`/profile/${messData.senderId}`);
              }
            }
          }}
        />
      </div>
      {!selectedRequest?.isArchive && (
        <div className={styles.chatBlock2}>
          <div className={styles.messageInput}>
            <Input
              maxLength={490}
              placeholder="Type your message..."
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPressSend}
            />
            {/* <img src={'/img/smileMessage.png'} alt="smile" /> */}
          </div>
          <span className={styles.sendMessage}>
            {!selectedRequest.isTeamChat && (
              <PrimaryButton
                isActive={true}
                text="INVITE"
                className={styles.inviteButton}
                onClick={() => sendMessage(true)}
              />
            )}
            <PrimaryButton
              className={styles.sendButton}
              text="SEND"
              onClick={() => sendMessage(false)}
            />
          </span>
        </div>
      )}
      <ModalInvites
        user={user}
        profile={{ _id: profileId }}
        changeShowModal={(e) => {
          changeShowModal(e);
          isShowModal();
        }}
        showModal={showModal}
      />
    </div>
  );
};

MessengerContent.propTypes = {
  user: PropTypes.object.isRequired,
  selectedRequest: PropTypes.object.isRequired,
  requests: PropTypes.object,
  setRequests: PropTypes.func,
  setSelectedRequest: PropTypes.func.isRequired,
};

MessengerContent.defaultProps = {
  avatar: '',
  requests: {},
  setRequests: () => {},
};

export default MessengerContent;
