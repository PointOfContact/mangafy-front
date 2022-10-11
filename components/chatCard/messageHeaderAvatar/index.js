import React from 'react';

import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const MessageHeaderAvatar = ({ dialogUser, isTeamChat }) => (
  <div className={styles.avatar}>
    {dialogUser.avatar ? (
      <Imgix
        className="avatar"
        layout="fixed"
        width={51}
        height={51}
        src={client.UPLOAD_URL + dialogUser.avatar}
        alt="MangaFy avatar"
      />
    ) : (
      (isTeamChat && (
        <Imgix
          className="avatar"
          layout="fixed"
          width={48}
          height={48}
          src={'https://mangafy.club/img/mangastory.webp'}
          alt="MangaFy avatar"
        />
      )) || (
        <Avatar text={dialogUser.name} className={styles.avatarName} fontSize={50} size={'51px'} />
      )
    )}
  </div>
);

MessageHeaderAvatar.propTypes = {
  dialogUser: PropTypes.object.isRequired,
  isTeamChat: PropTypes.bool.isRequired,
};

export default MessageHeaderAvatar;
