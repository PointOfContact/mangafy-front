import React from 'react';

import { Popconfirm } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import { userTypesEnums } from 'helpers/constant';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ParticipentCard = ({ isOwn, avatar, name, id, type, leaveManga, user, author }) => (
  <div className={styles.participentsContent}>
    <Link key={id} href={`/profile/${id}`}>
      <a className={styles.participentName}>
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
          <p>{userTypesEnums[type]}</p>
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
              <Popconfirm
                placement="top"
                title={
                  <div
                    style={{
                      width: '200px',
                    }}>{`Do you really want ${name} to be excluded from this manga-story?`}</div>
                }
                onConfirm={() => {
                  leaveManga(id);
                }}
                onClick={(event) => event.stopPropagation()}
                okText="Yes"
                cancelText="No">
                <p>Remove participant</p>
              </Popconfirm>
            </div>
          )}
          {id === user._id && (
            <Popconfirm
              placement="top"
              title={
                <div
                  style={{
                    width: '200px',
                  }}>
                  Do you really want to leave this collaboration?
                </div>
              }
              onConfirm={() => {
                leaveManga(user._id);
              }}
              onClick={(event) => event.stopPropagation()}
              okText="Yes"
              cancelText="No">
              <p className={styles.out}> Leave Manga-Story</p>
            </Popconfirm>
          )}
        </>
      )}
    </div>
  </div>
);

ParticipentCard.propTypes = {
  leaveManga: PropTypes.func.isRequired,
  isOwn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  type: PropTypes.string.isRequired,
  user: PropTypes.object,
  author: PropTypes.string.isRequired,
};

ParticipentCard.defaultProps = {
  avatar: null,
  user: null,
};

export default ParticipentCard;
