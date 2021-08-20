import React from 'react';

import SvgLeftArrow from 'components/icon/LeftArrow';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const UserName = ({ selectedRequest, mobile, setShowMessageMobile }) => {
  const ifNotImage = selectedRequest?.av?.slice(-9) === 'undefined';

  const getPath = () => {
    if (selectedRequest?.participentsInfo) {
      const userId = selectedRequest?.participentsInfo[0]
        ? selectedRequest?.participentsInfo[0]._id
        : selectedRequest?.participentsInfo[1]._id;

      const collabsId = selectedRequest.mangaStoryId;

      const url = selectedRequest.isTeamChat
        ? collabsId && `/manga-story/${collabsId}`
        : `/profile/${userId}`;
      return url;
    }
    return '';
  };

  return (
    <div className={mobile ? styles.containerMobile : styles.container}>
      <SvgLeftArrow width={24} height={24} onClick={() => setShowMessageMobile(false)} />
      {!!Object.values(selectedRequest).length && (
        <div className={styles.userName}>
          {getPath() ? (
            <>
              <Link href={getPath()}>
                <div className={styles.avatarHiderMobile}>
                  {ifNotImage ? (
                    <Avatar
                      text={selectedRequest.name}
                      className={styles.avatarName}
                      fontSize={50}
                      size={'51px'}
                    />
                  ) : (
                    <Imgix
                      layout="fixed"
                      width={50}
                      height={50}
                      src={selectedRequest.av}
                      alt="mangaFy avatar"
                    />
                  )}
                </div>
              </Link>
              <Link href={getPath()}>
                <a>{selectedRequest.name}</a>
              </Link>
            </>
          ) : (
            <a>{selectedRequest.name}</a>
          )}
        </div>
      )}
      {selectedRequest.isTeamChat && selectedRequest.rid && (
        // <Popover
        //   placement="bottomLeft"
        //   title={'Members'}
        //   content={members(selectedRequest.participentsInfo)}
        //   trigger="click">
        <p className={styles.members}>{selectedRequest?.participentsInfo?.length} members </p>
        // </Popover>
      )}
    </div>
  );
};
UserName.propTypes = {
  selectedRequest: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
  setShowMessageMobile: PropTypes.func,
};
UserName.defaultProps = {
  mobile: false,
  setShowMessageMobile: () => {},
};

export default UserName;
