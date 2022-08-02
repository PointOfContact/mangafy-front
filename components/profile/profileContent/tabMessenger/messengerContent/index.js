import React, { useState, useEffect, useRef } from 'react';

import { notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import client from 'api/client';
import Imgix from 'components/imgix';
import ModalInvites from 'components/modals/sendInvites';
import PrimaryButton from 'components/ui-elements/button';
import wrapUrls from 'components/wrapUrls/wrapUrls';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router from 'next/router';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/order
import { MessageList } from 'react-chat-elements';

import 'react-chat-elements/dist/main.css';
import myAmplitude from 'utils/amplitude';

import { patchRequest } from '../../../../../api/joinMangaStoryRequestClient';
import UserName from '../userName';
import messageItems from './messageItems';
import styles from './styles.module.scss';
import Send from 'components/icon/new/Send';

let interval;
const onAccept = (event, id, status) => {
  event.stopPropagation();
  return patchRequest(id, status);
};

let convId = '';
let totalMess = 0;
const maxLength = 490;

const MessengerContent = ({ user, selectedRequest, setSelectedRequest, requests, setRequests }) => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');
  const [showModal, changeShowModal] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [messageItem, setMessageItem] = useState([]);
  const [participantsInfo, setParticipantsInfo] = useState([]);
  const messageListElement = useRef(null);
  const messenger = useRef(null);
  const { conversationId, profileId } = selectedRequest;

  const scrollToBottom = () => {
    setTimeout(() => {
      messageListElement.current.scrollTop = messageListElement.current.scrollHeight;
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList.length]);

  useEffect(() => {
    setMessageList(
      messageItems(messageItem, participantsInfo, setRequestStatus, user, setMessageItem)
    );
  }, [messageItem]);

  const handleChange = (e) => {
    // eslint-disable-next-line no-shadow
    const value = e.target.innerText;
    setValue(value);
    value.length >= maxLength
      ? setMessageError(`The character limit for a message is ${maxLength} characters.`)
      : setMessageError('');
  };

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomLeft',
    });
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
          if (
            res?.messages &&
            (totalMess !== res.messages.length ||
              res._id !== convId ||
              messageItem.length !== res.messages.length)
          ) {
            convId = res._id;
            totalMess = res.messages.length;
            const neMess = res.messages.map((item, index) => {
              const content = wrapUrls(item.content, index);
              return { ...item, content };
            });
            if (messageItem.length !== res.messages.length) {
              clearInterval(interval);
              interval = setInterval(() => {
                getMessages(conversationId);
              }, 3000);
            }
            setParticipantsInfo(res.participentsInfo);
            setMessageItem(neMess);
          }
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
    scrollToBottom();
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
    } else if (!!value.trim()) {
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

  // const handleKeyPressSend = (event) => {
  //   if (event.key === 'Enter' && !event.shiftKey && width > 780) {
  //     event.preventDefault();
  //     sendMessage();
  //   }
  // };

  const setRequestStatus = (event, id, status) => {
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
          event_type,
          event_properties: { inviteRequestId: id },
        },
      ];
      myAmplitude(eventData);
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

  useEffect(() => {
    if (messageList.length) {
      const allPhotos = document.querySelectorAll(
        '#message-content > div > div > div > div > div > div img'
      );
      // set title attribute on all message photo
      allPhotos.forEach((val, i) => {
        val.setAttribute('title', messageList[i].user[0].name);
      });
    }
  }, [messageList.length]);

  return (
    <div className={styles.chatContainer}>
      {selectedRequest.participentsInfo && (
        <UserName selectedRequest={selectedRequest} user={user} />
      )}
      {/* <Imgix
        layout="fill"
        src={'https://mangafy.club/img/messbg.png'}
        alt="MangaFy message background"
      /> */}
      <pre ref={messageListElement} className={styles.messageList} id="message-content">
        <MessageList
          referance={messenger}
          className={styles.message_list}
          lockable={false}
          toBottomHeight={'100%'}
          dataSource={messageList}
          onClick={(messData, index, e) => {
            if (e.target.classList.contains('rce-avatar')) {
              if (messData.senderId === user._id) {
                Router.push(`/profile/${user._id}`);
              } else {
                Router.push(`/profile/${messData.senderId}`);
              }
            }
          }}
        />
      </pre>
      {!selectedRequest?.isArchive && (
        <div className={styles.chatBlock2}>
          <div className={styles.messageInput}>
            {/* <TextArea
              maxLength={490}
              placeholder="Type your message..."
              value={value}
              onChange={handleChange}
              // onKeyPress={handleKeyPressSend}
              className={styles.textarea_text}
            /> */}
            {/* <textarea
              className={styles.textarea}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            /> */}
            {/* <div class={styles['chat-wrapper']}> */}
            <div class={styles['message-wrapper']}>
              <div class={styles['message-text']} contentEditable onInput={handleChange}></div>
            </div>
            {/* </div> */}
            <p className={messageError ? styles.messageError : styles.notError}>{messageError}</p>
            {/* <img src={'/img/smileMessage.png'} alt="smile" /> */}
          </div>
          {/* <span className={styles.sendMessage}> */}
          {/* {!!user?.mangaStories?.data?.length && !selectedRequest.isTeamChat && (
              <PrimaryButton
                isActive={true}
                text="INVITE"
                className={styles.inviteButton}
                onClick={() => sendMessage(true)}
              />
            )} */}
          {/* <PrimaryButton
              className={styles.sendButton}
              text="SEND"
              onClick={() => {
                sendMessage(false);
              }}
            /> */}
          {/* </span> */}
          <button
            className={styles.sendButton}
            onClick={() => {
              sendMessage(false);
            }}>
            <Send color={'#8E8E93'} />
          </button>
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
  requests: PropTypes.array,
  setRequests: PropTypes.func,
  setSelectedRequest: PropTypes.func.isRequired,
};

MessengerContent.defaultProps = {
  avatar: '',
  requests: [],
  setRequests: () => {},
};

export default MessengerContent;
