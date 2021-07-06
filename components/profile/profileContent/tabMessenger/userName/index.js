import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const UserName = ({ selectedRequest, mobile }) => (
  <div className={mobile ? styles.containerMobile : styles.container}>
    <div className={styles.userName}>{selectedRequest.name}</div>
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

UserName.propTypes = {
  selectedRequest: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
};
UserName.defaultProps = {
  mobile: false,
};

export default UserName;
