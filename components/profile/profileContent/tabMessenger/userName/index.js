import React from 'react';

import SvgLeftArrow from 'components/icon/LeftArrow';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import client from 'api/client';

const UserName = ({ selectedRequest, mobile, setShowMessageMobile, user }) => {
  // const ifNotImage = selectedRequest?.av?.slice(-9) === 'undefined';

  const getPath = () => {
    if (selectedRequest?.participentsInfo) {
      const userId = selectedRequest?.participentsInfo[0]
        ? selectedRequest?.participentsInfo[0]?._id
        : selectedRequest?.participentsInfo[1]?._id;

      const collabsId = selectedRequest.mangaStoryId;

      const url = selectedRequest.isTeamChat
        ? collabsId && `/manga-story/${collabsId}`
        : `/profile/${userId}`;
      return url;
    }
    return '';
  };

  let participants = selectedRequest.participentsInfo?.filter((p) => !!p);
  if (participants?.length > 4) {
    participants = participants ? participants?.slice(0, 4) : [];
    participants.push({
      name: '…',
    });
  }

  const participantsElements =
    participants?.length > 1 // Change to 1
      ? participants
          // .filter((pi) => pi?._id !== user?._id)
          .map((pi, index) => (
            <div key={pi.name + index} className={styles.participants__avatar}>
              <img
                src={
                  pi?.avatar
                    ? client.UPLOAD_URL + pi?.avatar
                    : `https://ui-avatars.com/api/?background=9A87FE&name=${pi?.name}&rounded=true&color=ffffff`
                }
                alt="user avatar"
              />
            </div>
          ))
      : null;

  return (
    <div className={mobile ? styles.containerMobile : styles.container}>
      <SvgLeftArrow width={24} height={24} onClick={() => setShowMessageMobile(false)} />
      {!!Object.values(selectedRequest).length && (
        <div className={styles.userName}>
          {/* {getPath() ? (
            <>
              <Link href={getPath()}>
                <a>
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
                </a>
              </Link>
            </>
          ) : (
            <a>{selectedRequest.name}</a>
          )} */}
          <div className={styles.participants}>{participantsElements}</div>
          <div className={styles.description}>
            <Link href={getPath()}>
              <a>{selectedRequest.name}</a>
            </Link>
            {/* {selectedRequest.isTeamChat && selectedRequest.rid && (
              // <Popover
              //   placement="bottomLeft"
              //   title={'Members'}
              //   content={members(selectedRequest.participentsInfo)}
              //   trigger="click">

              <p className={styles.lastSeen}> Last seen 1 month ago </p>
              // <p className={styles.members}>{selectedRequest?.participentsInfo?.length} members </p>
              // </Popover>
            )} */}
          </div>
        </div>
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
