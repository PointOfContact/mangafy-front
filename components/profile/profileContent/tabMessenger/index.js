import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Imgix from 'components/imgix';
import LargeButton from 'components/ui-elements/large-button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import MessengerContent from './messengerContent';
import MessengerList from './messengerList';
import styles from './styles.module.scss';

const TabMessenger = (props) => {
  const { user } = props;
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [noRequest, setNoRequest] = useState(false);

  useEffect(() => {
    getRequest();
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

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  return (
    <div>
      {/* <h2 className={cn(styles.title)}>Messenger</h2> */}
      {noRequest ? (
        <div className={styles.noRequest}>
          <Imgix
            layout="intrinsic"
            width={240}
            height={202}
            src="https://mangafy.club/img/join-ico.webp"
            alt=""
          />
          <h2>No Messages, yet.</h2>
          <p>No messages in your inbox, yet! Start collaborate with people around you.</p>
          <div>
            <Link href="/profiles">
              <a>
                <LargeButton text="Find enthusiasts" />
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className={cn(styles.messenger_tab)}>
          <div className={cn(styles.messenger_list)}>
            <MessengerList
              requests={requests}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
            />
          </div>
          <div className={cn(styles.messenger_content)}>
            <MessengerContent user={user} selectedRequest={selectedRequest} />
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
