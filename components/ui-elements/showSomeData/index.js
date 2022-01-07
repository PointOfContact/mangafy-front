import React from 'react';

import { Popover, Tooltip } from 'antd';
import client from 'api/client';
import SvgDelete from 'components/icon/Delete';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ShowSomeData = ({ participantsData, size, leaveManga, deleteButton, isOwn, user }) => {
  const allParticipantsData = () =>
    participantsData.map((value, i) => (
      <Link href={`/profile/${value._id}`} key={value + i}>
        <a>
          <div className={styles.participantItemsContainer}>
            <div className={styles.participantInfo}>
              {value.avatar ? (
                <Imgix
                  className={styles.participantImage}
                  width={size}
                  height={size}
                  src={client.UPLOAD_URL + value.avatar}
                  alt="MangaFy picture of the user"
                />
              ) : (
                <Avatar text={value.name} size={size} />
              )}
            </div>
            <div className={styles.participantData}>
              <p className={styles.participantName}>{value.name}</p>
              <p className={styles.participantType}>{value.type}</p>
            </div>
            {isOwn
              ? deleteButton && (
                  <span className={styles.participantDelete} onClick={() => leaveManga(value._id)}>
                    <SvgDelete width="15px" height="15px" />
                  </span>
                )
              : user?._id === value?._id && (
                  <span className={styles.participantDelete} onClick={() => leaveManga(value._id)}>
                    <SvgDelete width="15px" height="15px" />
                  </span>
                )}
          </div>
        </a>
      </Link>
    ));

  return (
    participantsData.length > 5 && (
      <Popover placement="topLeft" content={allParticipantsData()} trigger="click">
        <Tooltip placement="topLeft" title="All participants">
          <p className={styles.participantsCount}>+ {participantsData.length - 5}</p>
        </Tooltip>
      </Popover>
    )
  );
};

ShowSomeData.propTypes = {
  participantsData: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  leaveManga: PropTypes.func,
  deleteButton: PropTypes.bool,
  isOwn: PropTypes.bool,
  user: PropTypes.object,
};

ShowSomeData.defaultProps = {
  leaveManga: () => {},
  deleteButton: false,
  isOwn: false,
  user: {},
};

export default ShowSomeData;
