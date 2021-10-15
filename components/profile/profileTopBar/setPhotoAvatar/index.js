/* eslint-disable no-nested-ternary */
import React from 'react';

import { Spin } from 'antd';
import client from 'api/client';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const SetPhotoAvatar = ({ ifMyProfile, userData, loadingImg, profile }) =>
  ifMyProfile ? (
    <>
      {userData?.avatar ? (
        loadingImg ? (
          <Spin className={styles.spin} size="large" tip="Loading..."></Spin>
        ) : (
          <Imgix
            width={500}
            height={500}
            className="avatar"
            src={client.UPLOAD_URL + userData.avatar}
            alt="MangaFy avatar"
          />
        )
      ) : (
        <Avatar text={userData?.name} fontSize={90} />
      )}
    </>
  ) : (
    <>
      {profile.avatar ? (
        <Imgix
          width={500}
          height={500}
          className="avatar"
          src={client.UPLOAD_URL + profile.avatar}
          alt="MangaFy avatar"
        />
      ) : (
        <Avatar text={profile.name} fontSize={90} />
      )}
    </>
  );

SetPhotoAvatar.propTypes = {
  ifMyProfile: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  loadingImg: PropTypes.bool.isRequired,
  profile: PropTypes.object,
};

SetPhotoAvatar.defaultProps = {
  profile: {},
};

export default SetPhotoAvatar;
