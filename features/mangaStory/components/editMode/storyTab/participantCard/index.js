import React from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import { userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ParticipantCard = ({ isOwn, avatar, name, id, type, types, leaveManga, user, author }) => (
  <div className={styles.participantsContent}>
    <Link key={id} href={`/profile/${id}`}>
      <a className={styles.participantName}>
        {avatar ? (
          <Imgix
            width={50}
            height={50}
            src={client.UPLOAD_URL + avatar}
            alt="MangaFy picture of the user"
          />
        ) : (
          <Avatar text={name} size={50} />
        )}
        <div className={styles.info}>
          <h2>{name}</h2>
          <p>{userTypesEnums[types[0]]}</p>
        </div>
      </a>
    </Link>
    <div className={styles.steps}>
      {author === id ? (
        <></>
      ) : (
        <>
          {isOwn && (
            <div>
              <p
                onClick={() => {
                  leaveManga(id);
                }}
              >
                Remove participant
              </p>
            </div>
          )}
          {id === user?._id && (
            <p
              className={styles.out}
              onClick={() => {
                leaveManga(user?._id);
              }}
            >
              Leave Manga-Story
            </p>
          )}
        </>
      )}
    </div>
  </div>
);

ParticipantCard.propTypes = {
  leaveManga: PropTypes.func.isRequired,
  isOwn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  type: PropTypes.string.isRequired,
  user: PropTypes.object,
  author: PropTypes.string.isRequired,
  types: PropTypes.array,
};

ParticipantCard.defaultProps = {
  avatar: null,
  user: null,
  types: [],
};

export default ParticipantCard;
