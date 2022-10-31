import * as React from 'react';

import Avatar from 'antd/lib/avatar/avatar';
import client from 'api/client';
import cn from 'classnames';
// import Imgix from 'components/imgix';
// import Avatar from 'components/ui-elements/avatar';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const TeamAvatar = ({ users, className, onClick, size, fontSize, ...rest }) => {
  const twoUser = () => (
    <div className={cn(styles.twoUser)}>
      <div>
        {users[0].avatar ? (
          <Imgix
            width={size}
            height={size}
            src={client.UPLOAD_URL + users[0].avatar}
            alt="MangaFy avatar"
          />
        ) : (
          <Avatar text={users[0].name} className={styles.avatarName} fontSize={50} />
        )}
      </div>
      <div>
        {users[1].avatar ? (
          <Imgix
            width={size}
            height={size}
            src={client.UPLOAD_URL + users[1].avatar}
            alt="MangaFy avatar"
          />
        ) : (
          <Avatar text={users[1].name} className={styles.avatarName} fontSize={50} />
        )}
      </div>
    </div>
  );

  const oneUser = () => (
    <div>
      {users[0].avatar ? (
        <Imgix
          className="avatar"
          width={size}
          height={size}
          src={client.UPLOAD_URL + users[0].avatar}
          alt="MangaFy avatar"
        />
      ) : (
        <Avatar text={users[0].name} className={styles.avatarName} fontSize={50} />
      )}
    </div>
  );
  return (
    <div
      {...rest}
      className={cn(styles.avatar, className)}
      style={{
        fontSize: `${fontSize || size / 2 || 20}px`,
        width: size || '100%',
        height: size || '100%',
      }}
      onClick={onClick}
    >
      {users.length === 1 && oneUser()}
      {users.length === 2 && twoUser()}
      {/* {users.length === 3 && treeUser()}
      {users.length > 3 && moreUser()} */}
    </div>
  );
};

TeamAvatar.propTypes = {
  className: PropTypes.string,
  participentsInfo: PropTypes.array,
  size: PropTypes.number,
  fontSize: PropTypes.number,
  onClick: PropTypes.func,
  users: PropTypes.array,
};

TeamAvatar.defaultProps = {
  className: '',
  participentsInfo: [],
  fontSize: null,
  size: null,
  onClick: () => {},
  users: [],
};

export default TeamAvatar;
