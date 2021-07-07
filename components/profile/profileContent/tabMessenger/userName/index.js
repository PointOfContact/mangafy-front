import React from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const UserName = ({ selectedRequest, mobile }) => {
  const getPath = () => {
    const userId = selectedRequest.participentsInfo[0]
      ? selectedRequest?.participentsInfo[0]._id
      : selectedRequest?.participentsInfo[1]._id;

    // TODO
    const collabsId = selectedRequest.mangaStoryId
      ? selectedRequest.mangaStoryId
      : '60dce360b5f1ef7d20948b40';

    const url = selectedRequest.isTeamChat ? `/manga-story/${collabsId}` : `/profile/${userId}`;

    return url;
  };

  return (
    <div className={mobile ? styles.containerMobile : styles.container}>
      {Object.values(selectedRequest).length ? (
        <div className={styles.userName}>
          <Link href={getPath()}>
            <a>{selectedRequest.name}</a>
          </Link>
        </div>
      ) : (
        ''
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
};
UserName.defaultProps = {
  mobile: false,
};

export default UserName;
