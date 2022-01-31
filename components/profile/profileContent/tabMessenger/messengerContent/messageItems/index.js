/* eslint-disable no-return-assign */
import React from 'react';

import client from 'api/client';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import moment from 'moment';

import 'react-chat-elements/dist/main.css';

import styles from '../styles.module.scss';

const messageItems = (data, participants, setRequestStatus, user, setMessageItem) => {
  const joinMangaStoryRequest = (item, text, type, className) =>
    item.joinMangaStoryRequest[0].status === type && (
      <span
        className={cn(styles.status, item.joinMangaStoryRequest[0].status === type && className)}>
        {text}
      </span>
    );

  const patchMessageStatus = (item) => {
    const jwt = client.getCookie('feathers-jwt');

    const dataStatus = {
      ...item.status[0],
      read: true,
    };

    const options = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    import('api/restClient').then((m) => {
      m.default.service('/api/v2/message_status').patch(item.status[0]._id, dataStatus, options);
    });
  };

  const newArrayMessage = (currentValue, choose) =>
    data.map((value) =>
      currentValue?.joinMangaStoryRequest[0]?.status === value.joinMangaStoryRequest[0]?.status
        ? {
            ...value,
            joinMangaStoryRequest: value.joinMangaStoryRequest.map((val) =>
              val.status === currentValue?.joinMangaStoryRequest[0]?.status
                ? { ...val, status: (val.status = choose) }
                : val
            ),
          }
        : value
    );

  data.forEach((item) => {
    let avatar;
    const part = participants?.find((p) => p._id === item.senderId);
    if (part?.avatar) {
      avatar = client.UPLOAD_URL + part.avatar;
    } else {
      avatar = `https://ui-avatars.com/api/?background=9A87FE&name=${part?.name}&rounded=true&color=ffffff`;
    }
    item.position = user._id === item.senderId ? 'left' : 'right';
    item.type = 'text';
    // eslint-disable-next-line no-nested-ternary
    item.text = item.joinMangaStoryRequest?.length ? (
      <div className={styles.name}>
        {item.joinMangaStoryRequest[0].mangaStory?.title && (
          <h2 className={styles.mangaTitle}>{item.joinMangaStoryRequest[0].mangaStory?.title}</h2>
        )}
        <div
          onMouseEnter={() => {
            if (item.status[0]?.read || !item.status.length) return;
            patchMessageStatus(item);
          }}
          className={cn(styles.messText, !item.status[0]?.read && styles.unreadMessage)}
          dangerouslySetInnerHTML={{
            __html: item.content,
          }}></div>
        <div className={styles.statusContainer}>
          {item.joinMangaStoryRequest[0].status === 'new' && (
            <span className={styles.status}> Pending invite </span>
          )}
          {joinMangaStoryRequest(item, 'Accepted', 'accepted', styles.request_status_acp)}
          {joinMangaStoryRequest(item, 'Rejected', 'rejected', styles.request_status_rej)}
          {item.joinMangaStoryRequest[0].status === 'new' &&
            ((user._id === item.joinMangaStoryRequest[0].mangaStory?.author &&
              !item.joinMangaStoryRequest[0].isInvite) ||
              (user._id === item.joinMangaStoryRequest[0].senderId &&
                item.joinMangaStoryRequest[0].isInvite)) && (
              <div className={cn(styles.div_button, 'buttonsProfile_styles')}>
                <PrimaryButton
                  onClick={(event) => {
                    setMessageItem(newArrayMessage(item, 'rejected'));
                    setRequestStatus(event, item.joinMangaStoryRequestId, 'rejected');
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
                    setMessageItem(newArrayMessage(item, 'accepted'));
                    setRequestStatus(event, item.joinMangaStoryRequestId, 'accepted');
                  }}
                />
              </div>
            )}
        </div>
      </div>
    ) : (
      <div
        onMouseEnter={() => {
          if (item.status[0]?.read || !item.status.length) return;
          patchMessageStatus(item);
        }}
        className={cn(styles.messText, !item.status[0]?.read && styles.unreadMessage)}
        dangerouslySetInnerHTML={{
          __html: item.content,
        }}></div>
    );
    item.date = moment(item.createdAt).toDate();
    item.avatar = avatar;
  });
  return data.reverse();
};

export default messageItems;
