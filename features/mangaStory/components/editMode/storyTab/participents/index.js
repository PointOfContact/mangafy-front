import React, { useState, useEffect } from 'react';

import { Popover, Tooltip } from 'antd';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import PropTypes from 'prop-types';

import ParticipantCard from '../participantCard';
import styles from './styles.module.scss';
import client from 'api/client';

const Participents = ({ participantsData, author, user, isOwn }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const ifExistAuthor = participantsData.some((value) => value._id === author._id);

    if (ifExistAuthor) {
      setParticipants(participantsData);
    } else {
      const members = [author].concat(participantsData);
      setParticipants(members);
    }
  }, [participantsData]);

  return participants.map(({ avatar, name, _id, type, types }, index) => (
    <Popover
      key={_id}
      placement="bottomLeft"
      title={''}
      content={
        <ParticipantCard
          isOwn={isOwn}
          avatar={avatar}
          name={name}
          id={_id}
          type={type}
          types={types}
          leaveManga={() => leaveManga(_id)}
          user={user}
          author={author}
        />
      }
      trigger="click">
      {index < 6 && (
        <Tooltip placement="topLeft" title={name} arrowPointAtCenter>
          <div className={styles.participantInfo}>
            {avatar ? (
              <Imgix
                width={65}
                height={65}
                src={client.UPLOAD_URL + avatar}
                alt="MangaFy picture of the user"
              />
            ) : (
              <Avatar text={name} size={69} />
            )}
          </div>
        </Tooltip>
      )}
    </Popover>
  ));
};

Participents.postTypes = {
  participantInfo: PropTypes.array.isRequired,
  author: PropTypes.object,
  user: PropTypes.object,
  isOwn: PropTypes.bool,
};

Participents.defaultProps = {
  author: {},
  user: {},
  isOwn: false,
};

export default Participents;
